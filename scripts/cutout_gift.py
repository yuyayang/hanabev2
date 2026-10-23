#!/usr/bin/env python3
"""花禮照片去背 + 調亮，輸出透明背景 WebP 到 site/assets/img/gifts/。

用法：
  python3 scripts/cutout_gift.py 照片.jpg [照片2.heic ...] [--name g1] [--brightness 1.12]
"""
import argparse
import io
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

OUT_DIR = Path(__file__).resolve().parent.parent / "site" / "assets" / "img" / "gifts"
MAX_SIDE = 1600   # 輸出最長邊
PAD = 0.04        # 裁切後四周留白比例


def cutout(src: Path, name: str, brightness: float, contrast: float, saturation: float, model: str) -> Path:
    from rembg import new_session, remove

    img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
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
    ap.add_argument("--model", default="isnet-general-use", help="rembg 模型：isnet-general-use、u2net …")
    args = ap.parse_args()

    if args.name and len(args.files) > 1:
        sys.exit("--name 只能搭配單張照片")
    for f in args.files:
        dest = cutout(f, args.name or f.stem, args.brightness, args.contrast, args.saturation, args.model)
        print(f"{f.name} → {dest.relative_to(OUT_DIR.parents[3])}")


if __name__ == "__main__":
    main()
