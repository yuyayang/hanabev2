// 花日和 內頁 — 花禮推薦、花禮內頁、花海地圖、花誌訂閱（依頁面上有的區塊啟動）
(() => {
  const API = window.HB_ORDER_API || (window.HB_CONFIG || {}).api || '';
  const GIFTS_URL = 'data/gifts.json';
  const REPORTS_URL = 'data/reports.json';

  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const getJSON = url => fetch(url).then(r => r.json());
  const priceNum = g => Number(String(g.price || '').replace(/\D/g, '')) || 0;
  const priceLabel = g => g.price ? 'NT$ ' + esc(g.price) : '價格洽詢';
  const imgStyle = g => g.pos ? ` style="object-position:${esc(g.pos)}"` : '';

  async function post(payload) {
    if (!API) throw new Error('線上服務尚未啟用，請先以 LINE @hanabiyori 聯絡我們。');
    const res = await fetch(API, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify(payload)});
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || '送出失敗，請稍後再試。');
    return data;
  }

  function giftCard(g) {
    return `
      <a class="gift" href="gift.html?id=${esc(g.id)}">
        <div class="gift__stage"><img class="gift__img" src="${esc(g.photo)}" alt="${esc(g.name)}"${imgStyle(g)} loading="lazy"></div>
        <div class="gift__body">
          <span class="label gift__tag">${esc(g.tag)} · ${esc(g.style)}</span>
          <span class="gift__name">${esc(g.name)}</span>
          <span class="gift__desc">${esc(g.desc)}</span>
        </div>
        <div class="gift__foot">
          <span class="gift__price">${priceLabel(g)}</span>
          <span class="gift__order">看詳情 →</span>
        </div>
      </a>`;
  }

  // ---------- 花禮推薦：用途、造型、價格篩選 ----------
  const giftsPage = $('#gifts-page');
  if (giftsPage) {
    const FILTERS = {
      occ: ['全部','生日','開幕','告白','致意','節慶','婚禮'],
      style: ['全部','花束','花盒','盆花','花籃'],
      price: ['全部','1,500 以下','1,500–3,000','3,000 以上']
    };
    const IN_PRICE = {
      '1,500 以下': g => g.price && priceNum(g) < 1500,
      '1,500–3,000': g => g.price && priceNum(g) >= 1500 && priceNum(g) <= 3000,
      '3,000 以上': g => g.price && priceNum(g) > 3000
    };
    const pick = {occ: '全部', style: '全部', price: '全部'};
    const want = new URLSearchParams(location.search).get('occ');
    if (want && FILTERS.occ.includes(want)) pick.occ = want;
    let gifts = [];

    const renderFilters = () => Object.keys(FILTERS).forEach(k => {
      $(`[data-filter="${k}"]`).innerHTML = FILTERS[k].map(v =>
        `<button type="button" class="tag" data-k="${k}" data-v="${esc(v)}" aria-pressed="${pick[k] === v}">${esc(v)}</button>`).join('');
    });
    const render = () => {
      const list = gifts.filter(g =>
        (pick.occ === '全部' || g.occ.includes(pick.occ)) &&
        (pick.style === '全部' || g.style === pick.style) &&
        (pick.price === '全部' || IN_PRICE[pick.price](g)));
      $('#gift-count').textContent = list.length + ' 款';
      $('#gift-list').innerHTML = list.length ? list.map(giftCard).join('')
        : '<p class="report-note">沒有符合的花禮，試試其他條件，或直接<a href="order.html">送出客製化需求</a>。</p>';
    };
    giftsPage.addEventListener('click', e => {
      const t = e.target.closest('[data-k]');
      if (!t) return;
      pick[t.dataset.k] = t.dataset.v;
      renderFilters(); render();
    });
    renderFilters();
    getJSON(GIFTS_URL).then(d => { gifts = (d.gifts || []).filter(g => g.photo); render(); }).catch(() => {});
  }

  // ---------- 花禮內頁 ----------
  const giftPage = $('#gift-page');
  if (giftPage) {
    const id = new URLSearchParams(location.search).get('id');
    getJSON(GIFTS_URL).then(d => {
      const gifts = (d.gifts || []).filter(g => g.photo);
      const g = gifts.find(x => x.id === id);
      if (!g) { giftPage.innerHTML = '<p class="report-note">找不到這款花禮，回到 <a href="gifts.html">花禮推薦</a>。</p>'; return; }
      document.title = g.name + ' · 花日和 Hanabiyori';
      $('#crumb-name').textContent = g.name;
      giftPage.innerHTML = `
        <div class="detail__photo"><img src="${esc(g.photo)}" alt="${esc(g.name)}"${imgStyle(g)}></div>
        <div class="detail__info">
          <span class="label" style="color:var(--ink-3)">${esc(g.tag)} · ${esc(g.style)}</span>
          <h1 class="detail__name">${esc(g.name)}</h1>
          <p class="detail__desc">${esc(g.desc)}</p>
          <span class="detail__price">${priceLabel(g)}</span>
          <dl class="detail__meta">
            <div><dt>適合用途</dt><dd>${g.occ.map(esc).join('、')}</dd></div>
            <div><dt>造型</dt><dd>${esc(g.style)}</dd></div>
            <div><dt>備花時間</dt><dd>2–3 天</dd></div>
          </dl>
          <div class="detail__actions">
            <a class="btn btn--primary" href="order.html?gift=${esc(g.id)}">訂購這款 →</a>
            <a class="btn btn--secondary" href="order.html">我想客製化</a>
          </div>
          <p class="detail__note">送出需求後，我們會以電話或 LINE 確認花材與金額，確認後再匯款。花材依季節供貨，會以相近花色替代。</p>
        </div>`;
      const others = gifts.filter(x => x.id !== g.id).sort(() => Math.random() - .5).slice(0, 3);
      $('#related').innerHTML = others.map(giftCard).join('');
    }).catch(() => {});
  }

  // ---------- 花海地圖（Leaflet + OpenStreetMap） ----------
  const mapEl = $('#bloom-map');
  if (mapEl && window.L) {
    const map = L.map(mapEl, {scrollWheelZoom: false}).setView([23.75, 120.95], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    const pick = {kind: 'all', phase: 'all'};
    let spots = [], markers = {};
    const color = r => r.phase === 'now' ? (r.kind === 'scenery' ? '#93705C' : '#5D6E58') : '#8A8781';
    const nav = r => `https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`;
    const popup = r => `
      <div class="pop">
        <span class="pop__meta">${esc(r.kind === 'scenery' ? '季節景色' : '花海')} · ${esc(r.county)}</span>
        <b class="pop__name">${esc(r.place)}</b>
        <span>${r.kind === 'scenery' ? '景況' : '花況'}：${esc(r.status)}${r.confirmed ? '' : '（未確認）'}</span>
        <span>觀賞期：${esc(r.period)}</span>
        <span>最佳時段：${esc(r.best)}</span>
        <span>交通：${esc(r.traffic)} · ${esc(r.ticket)}</span>
        <a href="${nav(r)}" target="_blank" rel="noopener">怎麼去 → Google Map 導航</a>
      </div>`;
    const render = () => {
      const list = spots.filter(r => (pick.kind === 'all' || (r.kind || 'flower') === pick.kind) && (pick.phase === 'all' || r.phase === pick.phase));
      Object.values(markers).forEach(m => m.remove()); markers = {};
      list.forEach(r => {
        markers[r.id] = L.circleMarker([r.lat, r.lng], {radius: 9, color: '#F7F5F1', weight: 2, fillColor: color(r), fillOpacity: .95})
          .bindPopup(popup(r)).addTo(map);
      });
      $('#map-list').innerHTML = list.map(r => `
        <button type="button" class="spot" data-id="${esc(r.id)}">
          <span class="spot__dot" style="background:${color(r)}"></span>
          <span class="spot__text"><b>${esc(r.place)}</b><small>${esc(r.county)} · ${esc(r.status)} · ${esc(r.period)}</small></span>
        </button>`).join('') || '<p class="report-note">沒有符合的景點。</p>';
      if (list.length) map.fitBounds(list.map(r => [r.lat, r.lng]), {padding: [40, 40], maxZoom: 10});
    };
    document.querySelectorAll('[data-map]').forEach(group => group.addEventListener('click', e => {
      const t = e.target.closest('[data-v]');
      if (!t) return;
      pick[group.dataset.map] = t.dataset.v;
      group.querySelectorAll('[data-v]').forEach(b => b.setAttribute('aria-pressed', b === t));
      render();
    }));
    $('#map-list').addEventListener('click', e => {
      const t = e.target.closest('[data-id]');
      if (!t || !markers[t.dataset.id]) return;
      const m = markers[t.dataset.id];
      map.flyTo(m.getLatLng(), 11, {duration: .6});
      m.openPopup();
      mapEl.scrollIntoView({behavior: 'smooth', block: 'center'});
    });
    getJSON(REPORTS_URL).then(d => {
      spots = d.spots || [];
      if (d.updated) $('#map-updated').textContent = '資料更新 ' + d.updated.replace(/-/g, '.');
      render();
    }).catch(() => {});
  }

  // ---------- 花誌訂閱 / 取消（首頁花誌區與 journal.html 共用） ----------
  document.querySelectorAll('form[data-journal]').forEach(form => {
    const mode = form.dataset.journal;           // subscribe | unsubscribe
    const msg = form.querySelector('.form-msg');
    const btn = form.querySelector('button[type="submit"]');
    const label = btn.textContent;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form).entries());
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || '')) { if (msg) msg.textContent = '請填寫正確的 Email'; return; }
      btn.disabled = true; btn.textContent = '送出中…';
      try {
        await post({...d, action: mode});
        form.innerHTML = `<span class="journal__ok">${mode === 'subscribe' ? '已訂閱，每週四見。' : '已取消訂閱，隨時歡迎回來。'}</span>`;
      } catch (x) {
        if (msg) msg.textContent = x.message;
        btn.disabled = false; btn.textContent = label;
      }
    });
  });
})();
