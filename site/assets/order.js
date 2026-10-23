// 花日和 訂購需求 / 匯款回報 — 送到 Google Apps Script（apps-script/Code.gs）
(() => {
  // Apps Script 網址設在 assets/config.js（HB_ORDER_API 供測試注入）
  const ORDER_API = window.HB_ORDER_API || (window.HB_CONFIG || {}).api || '';
  const GIFTS_URL = 'data/gifts.json';

  const $ = (s, r = document) => r.querySelector(s);
  const formData = form => Object.fromEntries(new FormData(form).entries());

  async function send(payload) {
    if (!ORDER_API) throw new Error('線上訂購尚未啟用，請先以 LINE @hanabiyori 聯絡我們。');
    // text/plain 避免 CORS 預檢，Apps Script 以 e.postData.contents 讀取
    const res = await fetch(ORDER_API, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify(payload)});
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || '送出失敗，請稍後再試。');
    return data;
  }

  function bind(form, done, build, validate) {
    const msg = $('.form-msg', form), btn = $('button[type="submit"]', form);
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const d = formData(form);
      const err = validate(d);
      msg.textContent = err || '';
      if (err) return;
      btn.disabled = true; btn.textContent = '送出中…';
      try {
        const res = await send(build(d));
        $('.done__id', done).textContent = res.id;
        if (form.id === 'order-form' && $('#pay-form')) $('#pay-form').elements.id.value = res.id;
        form.hidden = true; done.hidden = false;
        done.scrollIntoView({behavior: 'smooth', block: 'center'});
      } catch (x) {
        msg.textContent = x.message;
      } finally {
        btn.disabled = false; btn.textContent = btn.dataset.label;
      }
    });
    btn.dataset.label = btn.textContent;
  }

  // ---------- 分頁：送出訂購需求 / 匯款回報（網址 #request、#pay） ----------
  const tabs = document.querySelectorAll('[data-tab]');
  if (tabs.length) {
    const show = name => {
      if (!document.querySelector(`[data-panel="${name}"]`)) name = 'request';
      document.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== name; });
      tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.tab === name));
    };
    tabs.forEach(t => t.addEventListener('click', e => { e.preventDefault(); history.replaceState(null, '', '#' + t.dataset.tab); show(t.dataset.tab); }));
    document.addEventListener('click', e => {
      if (!e.target.closest('[data-goto-pay]')) return;
      e.preventDefault(); history.replaceState(null, '', '#pay'); show('pay');
      document.querySelector('.tabs').scrollIntoView({behavior: 'smooth'});
    });
    window.addEventListener('hashchange', () => show(location.hash.slice(1)));
    show(location.hash.slice(1) || (new URLSearchParams(location.search).get('id') ? 'pay' : 'request'));
  }

  // ---------- 訂購需求 ----------
  const orderForm = $('#order-form');
  if (orderForm) {
    const select = $('#gift-select');
    let gifts = [];
    const showPick = () => {
      const g = gifts.find(x => x.id === select.value);
      $('#pick').hidden = !g;
      if (!g) return;
      $('#pick-img').src = g.photo || '';
      $('#pick-img').alt = g.name;
      $('#pick-tag').textContent = g.tag;
      $('#pick-name').textContent = g.name;
      $('#pick-desc').textContent = g.desc;
      $('#pick-price').textContent = g.price ? 'NT$ ' + g.price : '價格洽詢';
      const p = orderForm.querySelector(`input[name="purpose"][value="${g.tag}"]`);
      if (p && !orderForm.querySelector('input[name="purpose"]:checked')) p.checked = true;
    };
    fetch(GIFTS_URL).then(r => r.json()).then(d => {
      gifts = (d.gifts || []).filter(g => g.photo);
      gifts.forEach(g => select.insertAdjacentHTML('beforeend', `<option value="${g.id}">${g.name}${g.price ? '（NT$ ' + g.price + '）' : ''}</option>`));
      const want = new URLSearchParams(location.search).get('gift');
      if (want && gifts.some(g => g.id === want)) select.value = want;
      showPick();
    }).catch(() => {});
    select.addEventListener('change', showPick);

    // 最早可選 2 天後
    const min = new Date(); min.setDate(min.getDate() + 2);
    orderForm.date.min = min.toISOString().slice(0, 10);

    const toggleAddress = () => { $('#address-field').hidden = orderForm.delivery.value === '門市自取'; };
    orderForm.addEventListener('change', e => { if (e.target.name === 'delivery') toggleAddress(); });
    toggleAddress();

    bind(orderForm, $('#order-done'),
      d => ({...d, action: 'order', gift: gifts.find(g => g.id === d.gift)?.name || '客製化'}),
      d => {
        if (!d.name?.trim()) return '請填寫姓名';
        if (!/\d{8,}/.test((d.phone || '').replace(/\D/g, ''))) return '請填寫正確的電話';
        if (!d.date) return '請選擇到貨日期';
        if (d.delivery !== '門市自取' && !d.address?.trim()) return '外送或宅配請填寫地址';
        return '';
      });
  }

  // ---------- 匯款回報 ----------
  const payForm = $('#pay-form');
  if (payForm) {
    const id = new URLSearchParams(location.search).get('id');
    if (id) payForm.elements.id.value = id;
    bind(payForm, $('#pay-done'),
      d => ({...d, action: 'payment'}),
      d => {
        if (!/^HB-\d{6}-\d{2,}$/i.test((d.id || '').trim())) return '訂單編號格式為 HB-YYMMDD-01';
        if (!(d.phone || '').replace(/\D/g, '')) return '請填寫訂購人電話';
        if (!/^\d{5}$/.test(d.last5 || '')) return '匯款帳號後五碼需為 5 位數字';
        return '';
      });
  }
})();
