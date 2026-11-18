const A = $('#app');

// ---------- data for the page ----------
const HERO_FEATS = [['leaf', 'Farm Fresh', 'Quality Produce'], ['truck', 'Free Delivery', 'On orders over ₹499'], ['card', 'Secure Payment', '100% Protected'], ['refresh', 'Easy Returns', '7 Days Return']];
const WHY = [
  ['award', 'Best Quality', 'We deliver only the freshest & finest products.'],
  ['percent', 'Affordable Prices', 'Best prices & exclusive offers on all your favorite products.'],
  ['truck', 'Fast Delivery', 'Lightning fast delivery at your doorstep on time.'],
  ['lock', '100% Secure', 'Your payments and data are safe with us always.'],
  ['refresh', 'Easy Returns', 'Not satisfied? Easy returns within 7 days of delivery.']
];
const SAY = [
  ['Sarah J.', 'FreshMart has made grocery shopping so easy and convenient. The quality is always top-notch and delivery is super fast!'],
  ['Rohit K.', 'Vegetables are always fresh and prices are better than my local store. Highly recommended.'],
  ['Anita M.', 'Easy ordering, on-time delivery and great packaging. My go-to app for monthly groceries.']
];
const AVATARS = [['S', '#3f8a2c'], ['R', '#e07a1f'], ['A', '#2b6cb0'], ['P', '#9b2c6e']];

// ---------- small builders ----------
const stars5 = () => `<span class="hm-stars">${ico('star', '').repeat(5)}</span>`;
const clock = `<svg class="clk" viewBox="0 0 84 94" aria-hidden="true"><rect x="31" y="2" width="22" height="9" rx="3" fill="#2f7a1f"/><path d="M42 11v8" stroke="#2f7a1f" stroke-width="4"/><path d="m68 23 6-6" stroke="#2f7a1f" stroke-width="5" stroke-linecap="round"/><circle cx="42" cy="55" r="33" fill="#fff" stroke="#2f7a1f" stroke-width="5"/><path d="M42 27v4M42 79v-4M14 55h4M70 55h-4" stroke="#8aa57e" stroke-width="2.5" stroke-linecap="round"/><path d="M42 55V37M42 55l12 8" stroke="#17241a" stroke-width="3.5" stroke-linecap="round"/><circle cx="42" cy="55" r="3.5" fill="#17241a"/></svg>`;

const arrows = `<button class="hm-arrow l" aria-label="Previous" hidden>${ico('left', '')}</button><button class="hm-arrow" aria-label="Next">${ico('right', '')}</button>`;

let sayIdx = 0;
function drawSay() {
  const t = SAY[sayIdx];
  $('#say-body').innerHTML = `${stars5()}<q>${t[1]}</q><p class="nm">- ${t[0]}</p>`;
  $('#say-dots').innerHTML = SAY.map((_, i) => `<i class="${i === sayIdx ? 'on' : ''}"></i>`).join('');
}

function carousel(sec) {
  const tr = $('.hm-track', sec), r = $('.hm-arrow:not(.l)', sec), l = $('.hm-arrow.l', sec);
  const upd = () => { l.hidden = tr.scrollLeft < 8; r.hidden = tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 8 };
  r.onclick = () => tr.scrollBy({ left: tr.clientWidth * .8, behavior: 'smooth' });
  l.onclick = () => tr.scrollBy({ left: -tr.clientWidth * .8, behavior: 'smooth' });
  tr.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
}

// ---------- page ----------
function renderHome() {
  const deals = [...PRODUCTS].sort((a, b) => off(b) - off(a) || b.pop - a.pop).slice(0, 10);
  A.innerHTML = `
<section class="hm-hero"><div class="fm-wrap">
  <div>
    <p class="hm-eyebrow">Freshness you can trust</p>
    <h1>Fresh Groceries, <span>Better Living</span></h1>
    <p class="hm-lead">Get the freshest fruits, vegetables, and daily essentials delivered to your doorstep. Use code <b>FRESH20</b> for 20% off your first order.</p>
    <div class="hm-cta"><a href="products.html" class="fm-btn fm-btn-p">Shop Now ${ico('arrow', '')}</a><a href="products.html?offers=1" class="fm-btn fm-btn-o">Explore Deals</a></div>
    <div class="hm-feats">${HERO_FEATS.map(f => `<div class="hm-feat">${ico(f[0], '')}<span><b>${f[1]}</b>${f[2]}</span></div>`).join('')}</div>
  </div>
  <div class="hm-art"><div class="hm-vid"><video autoplay muted loop playsinline preload="auto" poster="assets/videos/hero-poster.jpg" aria-label="Fresh vegetables at the store"><source src="assets/videos/hero.mp4" type="video/mp4"></video></div><span class="hm-off"><span>UP TO<b>30%</b>OFF</span></span></div>
</div></section>

<div class="fm-wrap">
<section class="hm-promos" style="margin-top:-40px;position:relative;z-index:2">
  <div class="hm-saver"><div class="tx"><p class="tag">Limited time offer</p><h3>Weekend <span>Super Saver</span></h3><p>Enjoy up to 30% off on selected products. Hurry! Offer valid till Sunday.</p><a href="products.html?offers=1" class="fm-btn">Shop Now</a></div>
    <div class="ph">${img('assets/images/banners/weekend-saver.jpg', 'vegetables,market', 'Weekend super saver vegetables', '', 700, 500)}<span class="bd"><span>UP TO<b>30%</b>OFF</span></span></div></div>
  <div class="hm-fast"><div class="tx"><h3>Get Delivery in <span>30 Minutes!</span></h3><p>Fast delivery at your doorstep</p><a href="products.html" class="fm-btn fm-btn-p">Order Now</a></div>
    <div class="ph">${clock}${img('assets/images/banners/fast-delivery.jpg', 'delivery', 'Fast grocery delivery', '', 400, 400)}</div></div>
</section>

<section id="deals" class="hm-sec" style="scroll-margin-top:150px"><div class="hm-head"><h2>Deal of the Day</h2><a href="products.html?offers=1">View All Deals ${ico('arrow', '')}</a></div>
  <div class="hm-track deals">${deals.map(card).join('')}</div>${arrows}</section>

<section class="hm-sec"><h2 class="hm-title">Why Choose FreshMart?</h2>
  <div class="hm-why">${WHY.map(w => `<div><span class="ic">${ico(w[0], '')}</span><span><b>${w[1]}</b><p>${w[2]}</p></span></div>`).join('')}</div></section>

<section class="hm-sec hm-trio">
  <div><h2>What Our Customers Say</h2><div class="hm-say"><button class="ar" id="say-prev" aria-label="Previous review">${ico('left', '')}</button><div class="bd"><div id="say-body"></div><div class="hm-dots" id="say-dots"></div></div><button class="ar" id="say-next" aria-label="Next review">${ico('right', '')}</button></div></div>
  <div class="hm-trust"><h2>Trusted by <em>50,000+ Happy Customers</em></h2>
    <div class="row"><div class="hm-av">${AVATARS.map(a => `<span style="background:${a[1]}">${a[0]}</span>`).join('')}</div><div class="big"><b>50K+</b><small>Happy Customers</small></div></div>
    <div class="rt">${stars5()}<b>4.8/5</b>Average Rating</div></div>
  <div class="hm-news"><h2>Get Exclusive Offers</h2><p class="s">Subscribe to get the best offers &amp; updates.</p>
    <form id="nl" novalidate><input id="nle" placeholder="Enter your email" aria-label="Email"><button>SUBSCRIBE</button></form><p id="nlm"></p><p class="pv">We respect your privacy. Unsubscribe anytime.</p></div>
</section>
</div>`;

  document.querySelectorAll('#app .hm-sec').forEach(s => { if ($('.hm-track', s)) carousel(s) });
  drawSay();
  $('#say-prev').onclick = () => { sayIdx = (sayIdx + SAY.length - 1) % SAY.length; drawSay() };
  $('#say-next').onclick = () => { sayIdx = (sayIdx + 1) % SAY.length; drawSay() };

  $('#nl').onsubmit = e => {
    e.preventDefault(); const v = $('#nle').value.trim(), m = $('#nlm');
    if (!/^\S+@\S+\.\S+$/.test(v)) { m.style.color = '#dc2626'; m.textContent = 'Please enter a valid email address'; return toast('Invalid email', 'err') }
    set('newsletter', [...new Set([...get('newsletter', []), v])]); m.style.color = 'var(--fm-green)'; m.textContent = 'Thanks for subscribing!'; $('#nle').value = ''; toast('Subscribed successfully')
  };
}
renderHome();
