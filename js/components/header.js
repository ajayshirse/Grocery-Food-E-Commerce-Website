(function () {
  const u = user(), here = location.pathname.split('/').pop() || 'index.html', cur = here + location.search + location.hash;
  // [link, label, extra]  (extra: 'dd' = shows a small chevron, 'info' = demo dialog because the page does not exist yet)
  const NAV = [
    ['index.html', 'Home'],
    ['products.html', 'Categories', 'dd'],
    ['products.html?offers=1', 'Deals'],
    ['products.html?sort=new', 'New Arrivals'],
    ['contact.html#about', 'About Us'],
    ['contact.html', 'Contact Us']
  ];
  const isOn = h => h === cur || (h === 'index.html' && here === 'index.html' && !location.hash) || (h === 'products.html?offers=1' && cur === h);
  const soc = [['fb', 'Facebook'], ['ig', 'Instagram'], ['tw', 'Twitter'], ['pt', 'Pinterest']]
    .map(s => `<a href="#" data-info="${s[1]}" aria-label="${s[1]}">${ico(s[0], '')}</a>`).join('');
  const logo = `<svg viewBox="0 0 48 48" fill="none" stroke="#3f8a2c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9h6l5 24h22l4-17H11"/><circle cx="19" cy="41" r="2.6" fill="#3f8a2c"/><circle cx="33" cy="41" r="2.6" fill="#3f8a2c"/><path d="M24 15c-4-1-6-5-5-9 4 0 6 3 5 9zM25 15c3-1 6-4 5-8-4 0-6 3-5 8zM24.5 15c3-2 8-2 10 0"/></svg>`;

  $('#site-header').innerHTML = `
<div class="topbar"><div class="fm-wrap fm-top">
  <span>${ico('pin', '')}123 Green Street, Pune, Maharashtra 411001</span>
  <span>${ico('truck', '')}Free Delivery on orders over ₹499</span>
  <span>${ico('phone', '')}+91 98765 43210</span>
  <span>${ico('clock', '')}Mon - Sun: 8:00 AM - 10:00 PM</span>
  <span class="fm-soc">${soc}</span>
</div></div>
<header class="fm-header">
  <div class="fm-wrap fm-main">
    <a href="index.html" class="fm-logo" aria-label="FreshMart home">${logo}<span><b>FreshMart</b><small>Fresh. Quality. Everyday.</small></span></a>
    <form id="sf" class="fm-search" role="search">
      <input id="sq" placeholder="Search for products, categories..." aria-label="Search">
      <select id="sc" aria-label="Category"><option value="">All Categories</option>${CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}</select>
      <button aria-label="Search">${ico('search', '')}</button>
    </form>
    <a href="${u ? 'my-account.html' : 'login.html'}" class="fm-act fm-acct">${ico('user', '')}<span>${u ? 'Hello, ' + u.name.split(' ')[0] : 'Sign In / Register'}<b>My Account</b></span></a>
    <a href="${u ? 'my-account.html#wishlist' : 'login.html'}" class="fm-act fm-wish" aria-label="Wishlist"><span class="fm-ico">${ico('heart', '')}<i id="wc" class="fm-badge">0</i></span></a>
    <a href="cart.html" class="fm-act" aria-label="Cart"><span class="fm-ico">${ico('cart', '')}<i id="cc" class="fm-badge">0</i></span><span>My Cart<b id="ct">₹0</b></span></a>
  </div>
  <div class="fm-nav"><div class="fm-wrap">
    <nav class="fm-links" aria-label="Main">${NAV.map(n => n[2] === 'dd'
      ? `<div class="fm-dd"><a href="${n[0]}" class="${here === 'products.html' && qs.get('cat') ? 'on' : ''}" aria-haspopup="true">${n[1]}${ico('down', '')}</a><div class="fm-ddm">${CATEGORIES.map(c => `<a href="products.html?cat=${c.id}">${c.name}</a>`).join('')}</div></div>`
      : `<a href="${n[0]}" ${n[2] === 'info' ? 'data-info="' + n[1] + '"' : ''} class="${isOn(n[0]) ? 'on' : ''}">${n[1]}</a>`).join('')}</nav>
    <a href="products.html?offers=1" class="fm-flash">${ico('bolt', '')}FLASH DEALS</a>
  </div></div>
</header>`;

  $('#sq').value = qs.get('q') || '';
  $('#sc').value = qs.get('cat') && CAT(qs.get('cat')) ? qs.get('cat') : '';
  $('#sf').onsubmit = e => { e.preventDefault(); const c = $('#sc').value; location.href = 'products.html?q=' + encodeURIComponent($('#sq').value) + (c ? '&cat=' + c : '') };
  badges();
})();
