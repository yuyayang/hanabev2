---
name: "gift-photo-cutout"
description: "使用者上傳或指定花禮照片時使用：把原圖轉成網頁用 WebP 放到 site/assets/img/gifts/，並接到首頁花禮推薦卡片；使用者明確要求時才去背。觸發語：「花禮照片」「換花禮圖」「去背」，或使用者直接傳花束／花籃／盆花照片。"
---

# 花禮照片上架

## 目標
- 預設**用原圖**：不去背、不調色，只轉成 WebP 並縮到最長邊 1600px
- 輸出到 `site/assets/img/gifts/{禮品 id}.webp`，接到 `site/assets/main.js` 的 `GIFTS`
- 卡片照片框是 1:1 正方形、填滿裁切（`object-fit: cover`）

## 步驟
1. **準備環境**（每個新容器做一次）
   ```bash
   python3 -c "import pillow_heif" 2>/dev/null || pip install --quiet --break-system-packages pillow-heif
   ```

2. **確認每張照片對應哪個花禮**
   - 對照 `main.js` 的 `GIFTS`
   - 使用者說「隨機配」→ 用 `random.shuffle` 分配到現有花禮，並依照片內容改寫 `desc` 花材
   - 新花禮 → 請使用者提供名稱、場合、花材、價格；沒提供的價格留空（卡片顯示「價格洽詢」）

3. **轉檔**
   ```bash
   python3 scripts/cutout_gift.py 照片.HEIC --name g8 --keep-bg
   ```
   - 旁邊有別的作品或雜物 → 加 `--crop 左,上,右,下`（比例 0–1）裁掉

4. **檢查取景**（必做）
   - 啟動網站截圖花禮區，確認每張主體都在正方形框內
   - 主體偏下或偏上 → 在 `GIFTS` 加 `pos:'center 85%'`（調整 `object-position`）

5. **接到網站**
   - `GIFTS` 對應項目加 `photo:'assets/img/gifts/g8.webp'`
   - 首頁只顯示有 `photo` 的花禮，每次載入隨機排序，最多 `CONFIG.giftCount` 張；不加「看更多」

6. **回報**：列出 原檔 → 輸出檔 → 對應花禮，並附花禮區截圖

## 去背（僅在使用者明確要求時）
- 使用者已表示去背效果「太怪」，**不要主動去背**
- 需要時：先 `pip install --quiet --break-system-packages "rembg[cpu]"`，再執行不加 `--keep-bg` 的指令
  - 預設模型 birefnet-general（約 900 MB）；底座被去掉時換 `--model u2net`
  - 去背後會調亮（`--brightness` 預設 1.12），務必用 Read 看結果再上架

## 規則
- 原始照片不放進 repo，只留輸出的 WebP
- 照片不是完成品（例如空花器）→ 不上架，回報使用者
- 使用者要求移除的照片，連同 WebP 一起刪掉
