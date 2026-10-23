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
  // 花海通報資料由 seasonal-flower-finder 每週更新至 data/reports.json
  const REPORTS_URL = 'data/reports.json';
  // 出發縣市（縣市政府所在地座標）
  const COUNTIES = [
    ['基隆市',25.1276,121.7392],['台北市',25.0375,121.5637],['新北市',25.0120,121.4657],['桃園市',24.9937,121.3010],
    ['新竹市',24.8138,120.9675],['新竹縣',24.8270,121.0129],['苗栗縣',24.5602,120.8214],['台中市',24.1618,120.6469],
    ['彰化縣',24.0758,120.5449],['南投縣',23.9022,120.6859],['雲林縣',23.6992,120.5265],['嘉義市',23.4801,120.4491],
    ['嘉義縣',23.4588,120.2932],['台南市',22.9927,120.1848],['高雄市',22.6203,120.3121],['屏東縣',22.6828,120.4879],
    ['宜蘭縣',24.7303,121.7631],['花蓮縣',23.9911,121.6114],['台東縣',22.7558,121.1504],['澎湖縣',23.5655,119.5663],
    ['金門縣',24.4370,118.3186],['連江縣',26.1607,119.9512]
  ];
  const OCC = ['全部','生日','開幕','告白','致意','節慶','婚禮'];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const KINDS = [['all','全部'],['flower','花海'],['scenery','季節景色']];
  const state = {offset: 0, occ: '全部', spots: [], origin: null, kind: 'all'};

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

  // ---------- 花海通報 · 當季最近花海 ----------
  function distanceKm(a, b) {
    const R = 6371, rad = x => x * Math.PI / 180;
    const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  // 直線距離 × 1.25 繞行係數；前 25 km 以市區 30 km/h、之後以國道 95 km/h 估算車程
  function driveLabel(km) {
    const road = km * 1.25;
    const min = Math.round(road <= 25 ? road / 30 * 60 : 50 + (road - 25) / 95 * 60);
    if (min < 55) return '約 ' + Math.max(5, Math.round(min / 5) * 5) + ' 分鐘車程';
    return '約 ' + (Math.round(min / 30) / 2) + ' 小時車程';
  }
  function mapUrl(r) {
    const u = 'https://www.google.com/maps/dir/?api=1&destination=' + r.lat + ',' + r.lng;
    return state.origin ? u + '&origin=' + state.origin.lat + ',' + state.origin.lng : u;
  }

  function reportCard(r) {
    const meta = [r.kind === 'scenery' ? '季節景色' : r.region, r.county, r.km != null ? `<span class="report__dist">${esc(driveLabel(r.km))}</span>` : ''].filter(Boolean);
    return `
      <article class="report">
        <div class="report__head">
          <div class="report__thumb photo-slot">${r.img ? `<img src="${esc(r.img)}" alt="${esc(r.place)}" loading="lazy">` : ''}</div>
          <div class="report__titles">
            <span class="label report__meta">${meta.map((m, i) => i < 2 ? esc(m) : m).join(' · ')}</span>
            <span class="report__place">${esc(r.place)}</span>
          </div>
        </div>
        <div class="report__rows">
          <div class="report__row"><span>${r.kind === 'scenery' ? '景況' : '花況'}</span>
            <span class="report__status" aria-label="花況 ${r.lv}/4 ${esc(r.status)}">
              ${[0,1,2,3].map(i => `<span class="report__dot${i < r.lv ? ' is-on' : ''}"></span>`).join('')}
              <span class="report__status-text">${esc(r.status)}</span>
            </span>
          </div>
          <div class="report__row"><span>觀賞期</span><span>${esc(r.period)}</span></div>
          <div class="report__row"><span>最佳時段</span><span>${esc(r.best)}</span></div>
          <div class="report__row"><span>交通</span><span>${esc(r.traffic)} · ${esc(r.ticket)}</span></div>
        </div>
        ${r.tip ? `<p class="report__tip">${esc(r.tip)}</p>` : ''}
        <div class="report__src">
          ${r.confirmed ? '' : '<span class="report__badge">花況未確認</span> '}資料 ${esc(r.dataDate)} · <a href="${esc(r.source)}" target="_blank" rel="noopener">來源</a>
        </div>
        <div class="report__foot">
          <a class="report__map" href="${esc(mapUrl(r))}" target="_blank" rel="noopener">怎麼去 → Google Map</a>
          <a class="report__gift" href="#gifts">對應花禮：${esc(r.gift)}</a>
        </div>
      </article>`;
  }

  function renderKinds() {
    $('#report-kinds').innerHTML = KINDS.map(([k, label]) =>
      `<button type="button" class="tag" data-kind="${k}" aria-pressed="${k === state.kind}">${label}</button>`).join('');
  }

  function renderReports() {
    const list = state.spots.filter(r => state.kind === 'all' || (r.kind || 'flower') === state.kind).map(r => ({...r, km: state.origin ? distanceKm(state.origin, r) : null}));
    if (state.origin) list.sort((a, b) => a.km - b.km);
    const now = list.filter(r => r.phase === 'now'), soon = list.filter(r => r.phase !== 'now');
    $('#report-grid').innerHTML = now.length ? now.map(reportCard).join('') : '<p class="report-note">本週沒有確認可賞的景點。</p>';
    $('#report-soon').innerHTML = soon.map(reportCard).join('');
    $('#report-soon-group').hidden = !soon.length;
  }

  async function loadReports() {
    try {
      const res = await fetch(REPORTS_URL, {cache: 'no-cache'});
      const data = await res.json();
      state.spots = data.spots || [];
      if (data.updated) $('#report-updated').textContent = '資料更新 ' + data.updated.replace(/-/g, '.');
    } catch (e) {
      $('#finder-status').textContent = '花海資料暫時讀取不到，請稍後再試。';
    }
    renderReports();
  }

  function setOrigin(origin, label) {
    state.origin = origin;
    const near = phase => state.spots.filter(r => (r.phase === 'now') === (phase === 'now'))
      .map(r => ({...r, km: distanceKm(origin, r)})).sort((a, b) => a.km - b.km)[0];
    const now = near('now'), soon = near('soon');
    let text = '從' + label + '出發';
    if (now) text += '，本週可賞最近的是' + now.place + '（' + driveLabel(now.km) + '）';
    if (soon && (!now || soon.km < now.km)) text += '；更近的' + soon.place + '即將登場（' + soon.status + '，' + driveLabel(soon.km) + '）';
    $('#finder-status').textContent = text + '。';
    renderReports();
  }

  function initFinder() {
    renderKinds();
    $('#report-kinds').addEventListener('click', e => {
      const t = e.target.closest('[data-kind]');
      if (!t) return;
      state.kind = t.dataset.kind;
      renderKinds();
      renderReports();
    });
    const sel = $('#finder-county');
    sel.insertAdjacentHTML('beforeend', COUNTIES.map(([n]) => `<option value="${esc(n)}">${esc(n)}</option>`).join(''));
    sel.addEventListener('change', () => {
      const c = COUNTIES.find(([n]) => n === sel.value);
      if (c) setOrigin({lat: c[1], lng: c[2]}, c[0]);
    });
    const btn = $('#finder-locate');
    if (!navigator.geolocation) { btn.hidden = true; return; }
    btn.addEventListener('click', () => {
      $('#finder-status').textContent = '定位中…';
      navigator.geolocation.getCurrentPosition(
        p => { sel.value = ''; setOrigin({lat: p.coords.latitude, lng: p.coords.longitude}, '你的位置'); },
        () => { $('#finder-status').textContent = '無法取得位置，請改選出發縣市。'; },
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 600000}
      );
    });
  }

  // ---------- 初始化 ----------
  $('.hero').dataset.layout = CONFIG.heroLayout === 'center' ? 'center' : 'corner';
  $('#journal').hidden = !CONFIG.showSubscribe;
  $$('[data-order-link]').forEach(a => { a.href = CONFIG.orderUrl; });
  $('[data-bind="todayLabel"]').textContent = flowerFor(0).dateLabel;

  renderDaily();
  renderOccasions();
  renderGifts();
  initFinder();
  loadReports();

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
