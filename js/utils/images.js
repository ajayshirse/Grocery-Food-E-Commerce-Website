// Image order: 1) local file in assets/images  2) online photo by keyword  3) neutral text tile (never blank)
const hash=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
const EMO={apple:'🍎',banana:'🍌',grapes:'🍇',oranges:'🍊',pomegranate:'🍎',tomato:'🍅',capsicum:'🫑',onion:'🧅',potato:'🥔',carrot:'🥕',spinach:'🥬',broccoli:'🥦',milk:'🥛',butter:'🧈',paneer:'🧀',yogurt:'🥣',eggs:'🥚',cheese:'🧀',bread:'🍞',croissant:'🥐',rice:'🍚',lentils:'🫘',mungbean:'🫘',chickpeas:'🫘',flour:'🌾',oats:'🥣',sunflower:'🌻',ghee:'🫙',olive:'🫒',chips:'🥔',cookies:'🍪',almonds:'🌰',juice:'🧃',tea:'🍵',coffee:'☕',spices:'🌶️',turmeric:'🟡',chili:'🌶️',peas:'🟢',icecream:'🍨',soap:'🧼',shampoo:'🧴',toothpaste:'🪥',dishes:'🍽️',laundry:'🧺',fruits:'🍎',dairy:'🥛',snacks:'🍿',cooking:'🫙',skincare:'🧴',cleaning:'🧽',frozen:'🧊',vegetables:'🥬',delivery:'🛵',market:'🧺'};
const emo=k=>EMO[String(k||'').split(',')[0]]||'🛒';
const tile=(t,k)=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#eaf5e3"/><text x="200" y="150" font-size="96" text-anchor="middle">${emo(k)}</text><text x="200" y="240" font-family="sans-serif" font-size="22" font-weight="700" fill="#2f7a1f" text-anchor="middle">${String(t).replace(/[<>&"]/g,'')}</text></svg>`);
// Remote photos get 5 s to load; if they are slow/blocked/broken the emoji tile is shown, so a card is never blank.
function useTile(el){el.onerror=null;el.dataset.done=1;el.src=tile(el.alt,el.dataset.kw)}
function remote(el,url){el.src=url;setTimeout(()=>{if(!el.dataset.ok&&!el.dataset.done)useTile(el)},5000)}
function imgOk(el){if(!el.src.startsWith('data:'))el.dataset.ok=1}
function imgFail(el){const d=el.dataset,n=+(d.r||0);if(d.done)return;d.r=n+1;const fk=`https://loremflickr.com/${d.w}/${d.h}/${d.kw}?lock=${hash(d.kw+el.alt)%900}`;if(n===0)remote(el,d.link||fk);else if(n===1&&d.link)remote(el,fk);else useTile(el)}
const img=(src,kw,alt,cls='w-full h-full object-cover',w=400,h=300)=>`<img src="${src}" data-link="${(typeof IMAGE_LINKS!=='undefined'&&IMAGE_LINKS[src.split('/').pop().replace(/\.(jpg|jpeg|png|webp)$/i,'')])||''}" alt="${alt}" data-kw="${kw}" data-w="${w}" data-h="${h}" loading="lazy" class="${cls}" onload="imgOk(this)" onerror="imgFail(this)">`;
const pimg=(p,w=400,h=300,cls)=>img(`assets/images/products/${p.folder}/${p.slug}.jpg`,p.kw,p.name,cls,w,h);
const cimg=(c,cls)=>img(`assets/images/categories/${c.id}.jpg`,c.kw,c.name,cls,300,300);
