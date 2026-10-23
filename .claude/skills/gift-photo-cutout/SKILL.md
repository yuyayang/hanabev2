---
name: "gift-photo-cutout"
description: "使用者上傳或指定花禮照片時使用：自動去背、調亮，輸出透明 WebP 到 site/assets/img/gifts/，並接到首頁花禮推薦卡片。觸發語：「花禮照片」「去背」「換花禮圖」，或使用者直接傳花束／花籃／盆花照片。"
---

# 花禮照片去背調亮

## 目標
- 每張花禮照片：去背 → 調亮 → 依主體裁切 → 透明背景 WebP
- 輸出到 `site/assets/img/gifts/{禮品 id}.webp`，接到 `site/assets/main.js` 的 `GIFTS`

## 步驟
1. **準備環境**（每個新容器做一次）
   ```bash
   python3 -c "import rembg" 2>/dev/null || pip install --quiet --break-system-packages "rembg[cpu]"
   ```
   - 第一次執行會下載約 180 MB 模型，約 20 秒

2. **確認每張照片對應哪個花禮**
   - 對照 `main.js` 的 `GIFTS`（g1 竹青晨霧、g2 櫻與海、g3 一片楓葉、g4 暮色玫瑰、g5 秋日小盆、g6 白日長亭）
   - 使用者沒說 → 先看照片內容與 `desc` 花材比對，提出對應表請使用者確認，不要自己猜定
   - 新花禮 → 請使用者提供名稱、場合、花材、價格，再新增一筆 `GIFTS`

3. **執行去背**
   ```bash
   python3 scripts/cutout_gift.py 照片.jpg --name g1
   ```
   - 多張且檔名已是 id：`python3 scripts/cutout_gift.py g1.jpg g2.jpg`
   - 可調參數：`--brightness`（預設 1.12）、`--contrast`（1.03）、`--saturation`（1.04）
   - 去背效果不好 → 換 `--model u2net` 再試

4. **檢查結果**（必做）
   - 用 Read 看輸出圖，確認：主體完整、沒有殘留背景、花瓣邊緣沒被切掉、亮度自然不過曝
   - 合成到網站底色預覽：
     ```bash
     python3 -c "from PIL import Image; im=Image.open('site/assets/img/gifts/g1.webp'); bg=Image.new('RGBA',im.size,(223,226,218,255)); bg.alpha_composite(im); bg.save('/tmp/preview.png')"
     ```
   - 不理想就調參數重跑；過曝降 `--brightness`，偏暗升到 1.2

5. **接到網站**
   - 在 `GIFTS` 對應項目加 `photo:'assets/img/gifts/g1.webp'`
   - `img`（Drive ID）保留當備援

6. **回報**
   - 列出：原檔 → 輸出檔 → 對應花禮
   - 把去背後的圖用 SendUserFile 給使用者看

## 規則
- 原始照片不放進 repo，只留輸出的 WebP
- 不改照片構圖、不加濾鏡風格，只做去背與亮度微調
- 一次處理多張時，每張都要看過結果再回報
