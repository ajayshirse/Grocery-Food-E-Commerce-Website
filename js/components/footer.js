(function () {
  const I = t => `<li><a href="#" data-info="${t}">${t}</a></li>`, L = (h, t) => `<li><a href="${h}">${t}</a></li>`;
  const logo = `<svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9h6l5 24h22l4-17H11"/><circle cx="19" cy="41" r="2.6" fill="#fff"/><circle cx="33" cy="41" r="2.6" fill="#fff"/><path d="M24 15c-4-1-6-5-5-9 4 0 6 3 5 9zM25 15c3-1 6-4 5-8-4 0-6 3-5 8zM24.5 15c3-2 8-2 10 0"/></svg>`;
  const soc = [['fb', 'Facebook'], ['ig', 'Instagram'], ['tw', 'Twitter'], ['pt', 'Pinterest']]
    .map(s => `<a href="#" data-info="${s[1]}" aria-label="${s[1]}">${ico(s[0], '')}</a>`).join('');
  $('#site-footer').innerHTML = `<footer class="fm-footer">
  <div class="fm-wrap fm-foot">
    <div><div class="brand">${logo}<span>FreshMart<small>Fresh. Quality. Everyday.</small></span></div>
      <div class="soc">${soc}</div><p class="cp">© 2026 FreshMart. All Rights Reserved. Demo project.</p></div>
    <div><h4>Categories</h4><ul class="fm-ql fm-cat2">${CATEGORIES.slice(0, 8).map(c => L('products.html?cat=' + c.id, c.name)).join('')}</ul></div>
    <div><h4>Contact Us</h4><ul class="fm-ct">
      <li>${ico('pin', '')}<span>123 Green Street, Pune, Maharashtra 411001</span></li>
      <li>${ico('phone', '')}<span>+91 98765 43210</span></li>
      <li>${ico('mail2', '')}<span>support@freshmart.in</span></li></ul></div>
    <div><h4>Quick Links</h4><ul class="fm-ql">${L('index.html', 'Home')}${L('products.html', 'Shop')}${L('products.html?offers=1', 'Deals')}${L('contact.html#about', 'About Us')}${L('contact.html#faq', 'FAQs')}${L('my-account.html', 'My Account')}${L('order-tracking.html', 'Order Tracking')}${L('my-account.html#wishlist', 'Wishlist')}${I('Returns & Refunds')}${I('Shipping Policy')}${I('Privacy Policy')}${I('Terms & Conditions')}</ul></div>
  </div>
</footer>
<dialog id="dlg" class="rounded-2xl p-6 max-w-md backdrop:bg-black/40"><h3 id="dt" class="font-bold text-lg"></h3><p class="mt-2 text-sm text-gray-600">This section is a demo. The store would publish the full content here.</p><form method="dialog"><button class="btn btn-p btn-s mt-4">Close</button></form></dialog>`;
  document.addEventListener('click', e => { const t = e.target.closest('[data-info]'); if (!t) return; e.preventDefault(); $('#dt').textContent = t.dataset.info; $('#dlg').showModal() });
})();
