/**
 * 花日和｜訂單 — 接收網站的訂購需求與匯款回報
 *
 * 安裝：試算表「花日和｜訂單」→ 擴充功能 → Apps Script → 貼上本檔 → 部署為網頁應用程式
 *   執行身分：我　／　存取權：所有人
 * 部署後的網址填到 site/assets/order.js 的 ORDER_API。
 *
 * 流程（兩步驟）：
 *   1. 客人送出需求（action: order）→ 新增一列、狀態「待確認」，寄信通知店家與客人
 *   2. 店家聯絡客人確認花材與金額，在「確認金額」欄填入金額、狀態改「待付款」
 *   3. 客人匯款後回報（action: payment）→ 寫入匯款後五碼，狀態改「已回報匯款」，寄信通知店家
 *
 * 花誌訂閱（action: subscribe / unsubscribe）→ 寫入「subscribers」分頁（沒有會自動建立）
 */

const OWNER_EMAIL = 'yuyayoung@gmail.com';
const SHEET_NAME = 'orders';
const SITE_NAME = '花日和';
const STATUS = {NEW: '待確認', AWAIT_PAY: '待付款', PAID_REPORTED: '已回報匯款'};

// 欄位順序需與試算表第一列一致
const COLS = ['訂單編號','建立時間','狀態','花禮','用途','造型','預算','指定花材','到貨日期','時段','交付方式',
  '收件人','收件人電話','地址','卡片留言','訂購人','訂購人電話','Email','LINE ID','需求備註',
  '確認金額','匯款後五碼','匯款日期','匯款回報時間','店家備註'];
const FIELD = {gift:'花禮', purpose:'用途', style:'造型', budget:'預算', flowers:'指定花材', date:'到貨日期',
  slot:'時段', delivery:'交付方式', recipient:'收件人', recipientPhone:'收件人電話', address:'地址',
  cardMessage:'卡片留言', name:'訂購人', phone:'訂購人電話', email:'Email', line:'LINE ID', note:'需求備註'};

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.website) return json({ok: true});          // 防機器人欄位，有填就靜默略過
    if (body.action === 'order') return json(createOrder(body));
    if (body.action === 'payment') return json(reportPayment(body));
    if (body.action === 'subscribe' || body.action === 'unsubscribe') return json(setSubscription(body, body.action === 'subscribe'));
    return json({ok: false, error: '未知的動作'});
  } catch (err) {
    return json({ok: false, error: '系統忙碌，請稍後再試或改用 LINE 聯絡'});
  }
}

function doGet() {
  return json({ok: true, service: SITE_NAME + ' 訂單'});
}

function createOrder(b) {
  const required = ['name', 'phone', 'date', 'delivery'];
  for (const k of required) if (!clean(b[k])) return {ok: false, error: '請填寫「' + FIELD[k] + '」'};
  if (b.delivery !== '門市自取' && !clean(b.address)) return {ok: false, error: '外送或宅配請填寫地址'};

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet();
    const id = nextId(sheet);
    const row = COLS.map(c => '');
    row[COLS.indexOf('訂單編號')] = id;
    row[COLS.indexOf('建立時間')] = now();
    row[COLS.indexOf('狀態')] = STATUS.NEW;
    Object.keys(FIELD).forEach(k => { row[COLS.indexOf(FIELD[k])] = clean(b[k]); });
    sheet.appendRow(row);

    const summary = Object.keys(FIELD).filter(k => clean(b[k]))
      .map(k => FIELD[k] + '：' + clean(b[k])).join('\n');
    MailApp.sendEmail(OWNER_EMAIL, '【' + SITE_NAME + '】新訂購需求 ' + id,
      '訂單編號：' + id + '\n\n' + summary + '\n\n請確認花材與金額後，在試算表填「確認金額」並將狀態改為「' + STATUS.AWAIT_PAY + '」，再聯絡客人匯款。\n' +
      SpreadsheetApp.getActiveSpreadsheet().getUrl());
    if (isEmail(b.email)) {
      MailApp.sendEmail(clean(b.email), '【' + SITE_NAME + '】已收到你的訂購需求 ' + id,
        clean(b.name) + ' 你好：\n\n已收到你的訂購需求，訂單編號 ' + id + '。\n' +
        '我們會在 1 個工作天內透過電話或 LINE 與你確認花材與金額。確認後請匯款，並到網站「匯款回報」頁填寫訂單編號與匯款帳號後五碼。\n\n' +
        summary + '\n\n' + SITE_NAME, {name: SITE_NAME});
    }
    return {ok: true, id: id};
  } finally {
    lock.releaseLock();
  }
}

function reportPayment(b) {
  const id = clean(b.id).toUpperCase();
  const last5 = clean(b.last5);
  if (!id) return {ok: false, error: '請填寫訂單編號'};
  if (!/^\d{5}$/.test(last5)) return {ok: false, error: '匯款帳號後五碼需為 5 位數字'};

  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  const c = name => COLS.indexOf(name);
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][c('訂單編號')]).toUpperCase() !== id) continue;
    // 以訂購人電話末 3 碼驗證，避免他人亂填
    const phone = String(values[i][c('訂購人電話')]).replace(/\D/g, '');
    if (phone.slice(-3) !== clean(b.phone).replace(/\D/g, '').slice(-3)) return {ok: false, error: '訂單編號與電話不符'};
    const r = i + 1;
    sheet.getRange(r, c('匯款後五碼') + 1).setValue(last5);
    sheet.getRange(r, c('匯款日期') + 1).setValue(clean(b.payDate));
    sheet.getRange(r, c('匯款回報時間') + 1).setValue(now());
    sheet.getRange(r, c('狀態') + 1).setValue(STATUS.PAID_REPORTED);
    MailApp.sendEmail(OWNER_EMAIL, '【' + SITE_NAME + '】匯款回報 ' + id,
      '訂單編號：' + id + '\n訂購人：' + values[i][c('訂購人')] + '\n確認金額：' + values[i][c('確認金額')] +
      '\n匯款後五碼：' + last5 + '\n匯款日期：' + clean(b.payDate) + '\n\n請對帳後將狀態改為「已確認收款」。\n' +
      SpreadsheetApp.getActiveSpreadsheet().getUrl());
    return {ok: true, id: id};
  }
  return {ok: false, error: '找不到這個訂單編號'};
}

// 花誌訂閱：同一 Email 只留一列，以「狀態」欄記錄訂閱中 / 已取消
function setSubscription(b, on) {
  const email = clean(b.email).toLowerCase();
  if (!isEmail(email)) return {ok: false, error: '請填寫正確的 Email'};
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('subscribers') || ss.insertSheet('subscribers');
  if (sheet.getLastRow() === 0) sheet.appendRow(['Email', '狀態', '訂閱時間', '取消時間']);
  const emails = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues().flat().map(v => String(v).toLowerCase());
  const i = emails.indexOf(email);
  if (i < 1) {
    if (!on) return {ok: true};
    sheet.appendRow([email, '訂閱中', now(), '']);
  } else {
    sheet.getRange(i + 1, 2).setValue(on ? '訂閱中' : '已取消');
    sheet.getRange(i + 1, on ? 3 : 4).setValue(now());
  }
  return {ok: true};
}

// 訂單編號：HB-YYMMDD-01（同日流水號）
function nextId(sheet) {
  const prefix = 'HB-' + Utilities.formatDate(new Date(), 'Asia/Taipei', 'yyMMdd') + '-';
  const ids = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1).getValues().flat()
    .map(String).filter(v => v.indexOf(prefix) === 0);
  return prefix + String(ids.length + 1).padStart(2, '0');
}

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}
function now() {
  return Utilities.formatDate(new Date(), 'Asia/Taipei', 'yyyy-MM-dd HH:mm');
}
function clean(v) {
  return String(v == null ? '' : v).trim().slice(0, 500);
}
function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(v));
}
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
