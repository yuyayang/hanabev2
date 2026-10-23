// 花日和 首頁 — 每日一花小卡、花禮篩選、花海通報
(() => {
  // ---------- 設定（對應設計稿右側的可調參數） ----------
  const CONFIG = {
    heroLayout: 'corner',   // 'corner' | 'center'
    giftCount: 4,           // 3–6
    showSubscribe: true,
    orderUrl: '#order',     // 訂購系統網址，待提供
    subscribeUrl: ''        // 花誌訂閱表單送出網址，待提供
  };

  // 有實體照片的每日一花（其餘顯示霧面漸層底）
  const DAILY_PHOTOS = { osmanthus: 'assets/img/daily-osmanthus.webp' };

  const FLOWERS = [
    {key:'susuki',name:'芒草',en:'Silver Grass',term:'霜降 · Late Autumn',meaning:'活力、堅韌',note:'十月底的山坡被芒花染成銀白，風一吹，整片山都在呼吸。插一把在玻璃瓶裡，秋天就留在桌上了。',quote:'風經過的地方，草會先知道。'},
    {key:'cosmos',name:'波斯菊',en:'Cosmos',term:'寒露 · Autumn',meaning:'少女的純情',note:'花瓣薄得透光，開成一片時像粉色的霧。秋天的田裡最溫柔的一種顏色。',quote:'不必開得很大，開得很久就好。'},
    {key:'osmanthus',name:'桂花',en:'Osmanthus',term:'秋分 · Autumn',meaning:'吉祥、思念',note:'還沒看見就先聞到。小小的金色花藏在葉間，香氣卻走得很遠。',quote:'有些想念，是先被聞到的。'},
    {key:'chrysanthemum',name:'杭菊',en:'Hangzhou Chrysanthemum',term:'立冬 · Early Winter',meaning:'清雅、長壽',note:'銅鑼的山丘在十一月一片雪白，摘下曬乾，冬天就有一杯花茶。',quote:'慢下來的日子，也在開花。'},
    {key:'cotton',name:'棉花',en:'Cotton Boll',term:'小雪 · Winter',meaning:'珍惜身邊的人',note:'柔軟、蓬鬆，像把雲朵剪下來。乾燥後能放很久，適合放進冬天的花束。',quote:'溫暖不用說出口，摸得到就好。'},
    {key:'eucalyptus',name:'尤加利',en:'Eucalyptus',term:'大雪 · Winter',meaning:'恩賜、守護',note:'灰綠的圓葉帶著清涼的香氣，是一整年都在的配角，安靜地讓花更好看。',quote:'當個好配角，也是一種開花。'},
    {key:'camellia',name:'山茶',en:'Camellia',term:'冬至 · Midwinter',meaning:'理想的愛',note:'在最冷的時候開，花落時整朵落下，乾淨俐落。',quote:'冷的季節，也有人在認真地美。'}
  ];
  const GIFTS = [
    {id:'g1',name:'竹青晨霧',tag:'生日',occ:['生日','致意'],desc:'尤加利、白色桔梗、芒草',price:'1,880',img:'1WpZGzahLpMLoEOdix8ukW04q4LB4bFF2'},
    {id:'g2',name:'櫻與海',tag:'告白',occ:['告白','生日'],desc:'粉玫瑰、藍星花、雪柳',price:'2,280',img:'1HhAxLmSYU1ch8PvvPqIOBRbWvMbf5N6M'},
    {id:'g3',name:'一片楓葉',tag:'開幕',occ:['開幕','節慶'],desc:'橘色海芋、楓葉、乾燥麥穗 · 花籃',price:'3,600',img:'1NooH9OCVwS-GRkO5T6Y-efEwuO8aTW--'},
    {id:'g4',name:'暮色玫瑰',tag:'婚禮',occ:['婚禮','告白'],desc:'奶茶玫瑰、康乃馨、銀葉菊',price:'2,680',img:'1Fcwy11nDDRw2aCyihbD46vdQehbo4po7'},
    {id:'g5',name:'秋日小盆',tag:'致意',occ:['致意','節慶'],desc:'多肉、苔球 · 盆花',price:'1,280',img:'1U432ic3aT-VVZbOtEP5R3i_J2yzMtsM6'},
    {id:'g6',name:'白日長亭',tag:'節慶',occ:['節慶','開幕'],desc:'白色杭菊、棉花、松果 · 花盒',price:'1,580',img:'1Bim1yFWUHp1C4S3Fb1oKMc2gK1zcQqZq'}
  ];
  const REPORTS = [
    {id:'r1',place:'桃園 · 波斯菊花海',region:'北部',period:'10–12月 · 本週更新',lv:3,status:'盛開',best:'平日上午',traffic:'公車 · 停車資訊',gift:'櫻與海',img:'assets/img/report-r1.webp'},
    {id:'r2',place:'苗栗銅鑼 · 杭菊',region:'中部',period:'11月 · 本週更新',lv:2,status:'初開',best:'清晨',traffic:'台鐵銅鑼站',gift:'白日長亭',img:'assets/img/report-r2.webp'},
    {id:'r3',place:'台中新社 · 花海節',region:'中部',period:'11–12月 · 本週更新',lv:1,status:'含苞',best:'週末午後',traffic:'接駁車',gift:'一片楓葉',img:'assets/img/report-r3.webp'}
  ];
  const OCC = ['全部','生日','開幕','告白','致意','節慶','婚禮'];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const state = {offset: 0, occ: '全部'};

  // ---------- 每日一花 ----------
  function flowerFor(offset) {
    const d = new Date(); d.setDate(d.getDate() + offset);
    const doy = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
    const f = FLOWERS[((doy % FLOWERS.length) + FLOWERS.length) % FLOWERS.length];
    const wk = ['日','一','二','三','四','五','六'][d.getDay()];
    const dateLabel = d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0') + ' · 週' + wk;
    return {...f, no: String(doy).padStart(3, '0'), dateLabel, short: dateLabel.slice(5, 10), photo: DAILY_PHOTOS[f.key] || ''};
  }

  function renderDaily() {
    const f = flowerFor(state.offset);
    $$('[data-bind]').forEach(el => {
      const k = el.dataset.bind;
      if (k === 'todayLabel') return;
      el.textContent = f[k];
    });
    $$('[data-bind-img="flower"]').forEach(img => {
      if (f.photo) { img.src = f.photo; img.alt = f.name; } else { img.removeAttribute('src'); img.alt = ''; }
    });
    $('#daily').setAttribute('aria-label', '點開每日小卡：' + f.name);
  }

  const modal = $('#card-modal');
  const msg = $('.card-modal__msg');
  let lastFocus = null, msgTimer = 0;

  function openCard() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('[data-action="download"]', modal).focus();
  }
  function closeCard() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function flash(text) {
    msg.textContent = text;
    clearTimeout(msgTimer);
    msgTimer = setTimeout(() => { msg.textContent = ''; }, 2400);
  }

  async function downloadCard() {
    const f = flowerFor(state.offset);
    const W = 1080, H = 1620, P = 56, c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
    const cs = getComputedStyle(document.documentElement), v = k => cs.getPropertyValue(k).trim();
    try { await document.fonts.ready; } catch (e) {}
    const serif = '"GenWanMin2","Noto Serif TC",serif', mono = '"DM Mono",monospace', disp = '"Italiana",serif';
    g.fillStyle = v('--paper-0') || '#F7F5F1'; g.fillRect(0, 0, W, H);
    const iw = W - P * 2, ih = Math.round(iw * 5 / 4);
    const gr = g.createLinearGradient(0, P, 0, P + ih);
    gr.addColorStop(0, v('--bamboo-300') || '#B4BDAD'); gr.addColorStop(.6, v('--bamboo-100') || '#DFE2DA'); gr.addColorStop(1, v('--paper-1') || '#EFECE7');
    g.fillStyle = gr; g.fillRect(P, P, iw, ih);
    const img = $('.card__photo img', modal);
    if (f.photo && img.complete && img.naturalWidth) {
      const s = Math.max(iw / img.naturalWidth, ih / img.naturalHeight), dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      g.save(); g.beginPath(); g.rect(P, P, iw, ih); g.clip(); g.drawImage(img, P + (iw - dw) / 2, P + (ih - dh) / 2, dw, dh); g.restore();
    }
    g.fillStyle = 'rgba(239,236,231,.8)'; g.font = '26px ' + mono;
    const tag = f.term.toUpperCase(), tw = g.measureText(tag).width;
    g.fillRect(P + 28, P + 28, tw + 36, 52); g.fillStyle = v('--ink-1') || '#33322F'; g.textBaseline = 'middle'; g.fillText(tag, P + 46, P + 55);
    g.textBaseline = 'alphabetic'; let y = P + ih + 110;
    g.font = '300 76px ' + serif; g.fillText(f.name, P, y); const nw = g.measureText(f.name).width;
    g.fillStyle = v('--ink-2') || '#5C5A55'; g.font = '40px ' + disp; g.fillText(f.en, P + nw + 28, y);
    g.font = '26px ' + mono; g.fillStyle = v('--ink-3') || '#8A8781'; g.textAlign = 'right'; g.fillText('花語 ' + f.meaning, W - P, y); g.textAlign = 'left';
    y += 90; g.fillStyle = v('--ink-1') || '#33322F'; g.font = '300 46px ' + serif;
    let line = '';
    for (const ch of f.quote) { if (g.measureText(line + ch).width > iw) { g.fillText(line, P, y); y += 78; line = ch; } else line += ch; }
    g.fillText(line, P, y);
    g.fillStyle = 'rgba(42,41,38,.14)'; g.fillRect(P, H - P - 70, iw, 2);
    g.fillStyle = v('--ink-3') || '#8A8781'; g.font = '24px ' + mono; g.fillText(f.dateLabel, P, H - P - 20);
    g.textAlign = 'right'; g.fillText('HANABIYORI · NO.' + f.no, W - P, H - P - 20);
    const a = document.createElement('a');
    a.download = '花日和-' + f.name + '-' + f.dateLabel.slice(0, 10) + '.png';
    try { a.href = c.toDataURL('image/png'); a.click(); flash('已下載「' + f.name + '」小卡'); }
    catch (e) { flash('照片無法匯出，請改用本站上傳的照片'); }
  }

  // ---------- 花禮推薦 ----------
  function renderOccasions() {
    $('#occasions').innerHTML = OCC.map(o =>
      `<button type="button" class="tag" data-occ="${esc(o)}" aria-pressed="${o === state.occ}">${esc(o)}</button>`).join('');
  }
  function renderGifts() {
    const n = Math.min(6, Math.max(3, CONFIG.giftCount));
    const list = GIFTS.filter(g => state.occ === '全部' || g.occ.includes(state.occ)).slice(0, n);
    $('#gift-grid').innerHTML = list.map(g => `
      <a class="gift" href="${esc(CONFIG.orderUrl)}" data-gift="${esc(g.id)}">
        <div class="gift__stage">
          <div class="gift__grain"></div>
          <div class="gift__shadow"></div>
          <img class="gift__img" src="https://drive.google.com/thumbnail?id=${esc(g.img)}&amp;sz=w1000" alt="${esc(g.name)}" loading="lazy" onerror="this.hidden=true">
        </div>
        <div class="gift__body">
          <span class="label gift__tag">${esc(g.tag)}</span>
          <span class="gift__name">${esc(g.name)}</span>
          <span class="gift__desc">${esc(g.desc)}</span>
        </div>
        <div class="gift__foot">
          <span class="gift__price">NT$ ${esc(g.price)}</span>
          <span class="gift__order">訂購 →</span>
        </div>
      </a>`).join('');
  }

  // ---------- 花海通報 ----------
  function renderReports() {
    $('#report-grid').innerHTML = REPORTS.map(r => `
      <article class="report">
        <div class="report__head">
          <div class="report__thumb"><img src="${esc(r.img)}" alt="${esc(r.place)}" loading="lazy"></div>
          <div class="report__titles">
            <span class="label report__meta">${esc(r.region)} · ${esc(r.period)}</span>
            <span class="report__place">${esc(r.place)}</span>
          </div>
        </div>
        <div class="report__rows">
          <div class="report__row"><span>花況</span>
            <span class="report__status" aria-label="花況 ${r.lv}/4 ${esc(r.status)}">
              ${[0,1,2,3].map(i => `<span class="report__dot${i < r.lv ? ' is-on' : ''}"></span>`).join('')}
              <span class="report__status-text">${esc(r.status)}</span>
            </span>
          </div>
          <div class="report__row"><span>最佳時段</span><span>${esc(r.best)}</span></div>
          <div class="report__row"><span>交通</span><span>${esc(r.traffic)}</span></div>
        </div>
        <div class="report__foot">
          <a class="report__map" href="#map">怎麼去 → Google Map</a>
          <a class="report__gift" href="#gifts">對應花禮：${esc(r.gift)}</a>
        </div>
      </article>`).join('');
  }

  // ---------- 初始化 ----------
  $('.hero').dataset.layout = CONFIG.heroLayout === 'center' ? 'center' : 'corner';
  $('#journal').hidden = !CONFIG.showSubscribe;
  $$('[data-order-link]').forEach(a => { a.href = CONFIG.orderUrl; });
  $('[data-bind="todayLabel"]').textContent = flowerFor(0).dateLabel;

  renderDaily();
  renderOccasions();
  renderGifts();
  renderReports();

  $('#daily').addEventListener('click', openCard);
  modal.addEventListener('click', e => { if (e.target === modal) closeCard(); });
  modal.addEventListener('click', e => {
    const act = e.target.closest('[data-action]');
    if (!act) return;
    const a = act.dataset.action;
    if (a === 'close') closeCard();
    else if (a === 'prev') { state.offset--; renderDaily(); }
    else if (a === 'next') { state.offset++; renderDaily(); }
    else if (a === 'download') downloadCard();
  });
  document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeCard();
    else if (e.key === 'ArrowLeft') { state.offset--; renderDaily(); }
    else if (e.key === 'ArrowRight') { state.offset++; renderDaily(); }
  });

  $('#occasions').addEventListener('click', e => {
    const t = e.target.closest('[data-occ]');
    if (!t) return;
    state.occ = t.dataset.occ;
    renderOccasions();
    renderGifts();
  });

  $('#journal-form').addEventListener('submit', e => {
    if (CONFIG.subscribeUrl) { e.target.action = CONFIG.subscribeUrl; e.target.method = 'post'; return; }
    e.preventDefault();
  });
})();
