---
name: "update-bloom-report"
description: "每週更新花日和首頁的「花海通報」：依 seasonal-flower-finder 的方法搜尋全台即時花況，改寫 site/data/reports.json。使用者說「更新花海通報」「本週花況」或每週四排程時使用。"
---

# 更新花海通報

## 目標
- 改寫 `site/data/reports.json`，網站會讀這個檔案並依訪客位置排序
- 方法沿用 `seasonal-flower-finder` skill：先確認日期，再查花季參考表、搜尋即時花況
- 差別：沒有單一出發地，改為**全台**挑 4–8 個景點，北、中、南、東各區盡量都有

## 步驟
1. 用 `date` 取得今天日期，不憑記憶
2. 依 seasonal-flower-finder 的「台灣花季參考表」挑本月與前後半個月的花種
3. WebSearch 至少 6 次，查詢分開下：
   - 「{年份} {月份} 花海」、「{花種} {年份} 花況」
   - 「{年份} 花海 活動 日期」、各區域（北部／中部／南部／東部）花海
4. 只採信縣市政府、農會、觀光署、國家公園、近 2 週新聞
5. 依下方欄位改寫 JSON，`updated` 設為今天
6. 執行檢查：`python3 -m json.tool site/data/reports.json > /dev/null`

## 欄位
| 欄位 | 說明 |
|---|---|
| `phase` | `now` 本週可賞；`soon` 一個月內登場。已謝、活動結束的不列 |
| `lv` | 花況點數 0–4（0 未開、1 含苞、2 初開、3 盛開、4 滿開） |
| `status` | 短字：盛開／初開／含苞／將謝／「10/31 開幕」 |
| `confirmed` | 有近 2 週官方或新聞實況才 `true`；只靠花期推估為 `false`（網站顯示「花況未確認」） |
| `dataDate` | 資料日期 `YYYY-MM-DD`，只知月份時寫 `YYYY-MM` |
| `lat`、`lng` | 景點座標（小數 4 位） |
| `period`、`best`、`traffic`、`ticket`、`tip` | 短句，不憑記憶寫門票與日期 |
| `gift` | 對應花禮名稱，須是 `site/assets/main.js` 的 `GIFTS` 之一 |
| `img` | 有照片放 `assets/img/` 路徑，沒有留空字串 |
| `source` | 主要來源網址 |

## 規則
- 找不到近期資料就 `confirmed: false`，不要編造花況
- 不改網站程式碼，只改 JSON
