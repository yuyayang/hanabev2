#!/usr/bin/env python3
"""花禮照片去背 + 調亮，輸出透明背景 WebP 到 site/assets/img/gifts/。

用法：
  python3 scripts/cutout_gift.py 照片.jpg [照片2.heic ...] [--name g1] [--brightness 1.12]
  python3 scripts/cutout_gift.py 照片.jpg --keep-bg [--crop L,T,R,B]   # 背景乾淨：只轉檔縮圖
"""
import argparse
import io
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

try:  # iPhone HEIC 照片（pip install pillow-heif）
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    pass

OUT_DIR = Path(__file__).resolve().parent.parent / "site" / "assets" / "img" / "gifts"
MAX_SIDE = 1600   # 輸出最長邊
PAD = 0.04        # 裁切後四周留白比例


def load(src: Path, crop) -> Image.Image:
    img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    if crop:  # 比例 0–1：左,上,右,下
        l, t, r, b = crop
        img = img.crop((int(l * img.width), int(t * img.height), int(r * img.width), int(b * img.height)))
    return img


def keep_bg(src: Path, name: str, crop) -> Path:
    img = load(src, crop)
    img.thumbnail((MAX_SIDE, MAX_SIDE))
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    dest = OUT_DIR / f"{name}.webp"
    img.save(dest, "WEBP", quality=88, method=6)
    return dest


def cutout(src: Path, name: str, brightness: float, contrast: float, saturation: float, model: str, crop=None) -> Path:
    from rembg import new_session, remove

    img = load(src, crop)
    img.thumbnail((MAX_SIDE * 2, MAX_SIDE * 2))

    # 1. 去背
    buf = io.BytesIO()
    img.save(buf, "PNG")
    rgba = Image.open(io.BytesIO(remove(buf.getvalue(), session=new_session(model)))).convert("RGBA")

    # 2. 調亮：只調 RGB，保留透明度
    rgb, alpha = rgba.convert("RGB"), rgba.getchannel("A")
    rgb = ImageEnhance.Brightness(rgb).enhance(brightness)
    rgb = ImageEnhance.Contrast(rgb).enhance(contrast)
    rgb = ImageEnhance.Color(rgb).enhance(saturation)
    out = rgb.convert("RGBA")
    out.putalpha(alpha)

    # 3. 依主體裁切、留白
    box = alpha.point(lambda a: 255 if a > 16 else 0).getbbox()
    if not box:
        raise SystemExit(f"{src.name}: 找不到主體，去背失敗")
    out = out.crop(box)
    pad = int(max(out.size) * PAD)
    canvas = Image.new("RGBA", (out.width + pad * 2, out.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(out, (pad, pad))
    canvas.thumbnail((MAX_SIDE, MAX_SIDE))

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    dest = OUT_DIR / f"{name}.webp"
    canvas.save(dest, "WEBP", quality=90, method=6)
    return dest


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("files", nargs="+", type=Path)
    ap.add_argument("--name", help="輸出檔名（單張時使用，例如 g1）；預設沿用原檔名")
    ap.add_argument("--brightness", type=float, default=1.12)
    ap.add_argument("--contrast", type=float, default=1.03)
    ap.add_argument("--saturation", type=float, default=1.04)
    ap.add_argument("--model", default="birefnet-general", help="rembg 模型：birefnet-general、isnet-general-use、u2net …")
    ap.add_argument("--keep-bg", action="store_true", help="背景乾淨時使用：不去背、不調色，只轉檔縮圖")
    ap.add_argument("--crop", help="先裁切，比例 0–1：左,上,右,下（例：0.2,0.3,0.8,1）")
    args = ap.parse_args()

    if args.name and len(args.files) > 1:
        sys.exit("--name 只能搭配單張照片")
    crop = tuple(float(v) for v in args.crop.split(",")) if args.crop else None
    for f in args.files:
        name = args.name or f.stem
        dest = keep_bg(f, name, crop) if args.keep_bg else \
            cutout(f, name, args.brightness, args.contrast, args.saturation, args.model, crop)
        print(f"{f.name} → {dest.relative_to(OUT_DIR.parents[3])}")


if __name__ == "__main__":
    main()
