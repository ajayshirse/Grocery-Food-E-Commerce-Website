const cart=()=>get('cart',[]),wl=()=>get('wish',[]);
// ---- size / quantity options (kg, g, L, ml, pcs) ----
// Every product has a base unit (e.g. "1 kg"). Loose items can also be bought in other sizes; the price scales with the size.
const NO_SIZE=new Set(['chips','cookies','bread','croissant','icecream','cheese','butter','yogurt','juice','paneer','soap','shampoo','toothpaste','dishes','laundry','peas','broccoli']);
function unitInfo(p){const m=/^([\d.]+)\s*(kg|g|L|ml|pcs|dozen)$/i.exec(p.unit);if(!m)return null;const n=+m[1],u=m[2].toLowerCase();
  if(u==='kg')return{k:'g',b:n*1000};if(u==='g')return{k:'g',b:n};if(u==='l')return{k:'ml',b:n*1000};if(u==='ml')return{k:'ml',b:n};
  return{k:'pcs',b:u==='dozen'?n*12:n,dz:u==='dozen'}}
const fmtSize=(k,n,dz)=>k==='g'?(n>=1000?(n/1000)+' kg':n+' g'):k==='ml'?(n>=1000?(n/1000)+' L':n+' ml'):(dz&&n%12===0?(n/12)+(n===12?' dozen':' dozen'):n+' pcs');
function sizeOpts(p){if(NO_SIZE.has(p.kw)||p.cat==='personal-care'||p.cat==='household')return[];const i=unitInfo(p);if(!i)return[];
  const std=i.k==='pcs'?[6,12,24,30]:i.k==='g'?[100,250,500,1000,2000,5000,10000]:[250,500,1000,2000,5000];
  let a=[...new Set([...std.filter(x=>x>=i.b/5&&x<=i.b*2.5),i.b])].sort((x,y)=>x-y);
  if(a.length>4){const k=a.indexOf(i.b),st=Math.max(0,Math.min(k-1,a.length-4));a=a.slice(st,st+4)}
  return a.length>1?a.map(n=>({n,label:fmtSize(i.k,n,i.dz)})):[]}
// price of a product at a chosen size (s = size in g/ml/pcs; 0 or missing = the base unit)
function variant(p,s){const i=unitInfo(p),f=i&&s&&sizeOpts(p).some(o=>o.n==s)?s/i.b:1;
  return{...p,price:Math.round(p.price*f),mrp:Math.round(p.mrp*f),unit:f===1?p.unit:fmtSize(i.k,+s,i.dz),s:f===1?0:+s,key:p.id+'|'+(f===1?0:+s)}}
const lineKey=l=>l.id+'|'+(l.s||0);
const cartLines=()=>cart().map(l=>{const b=P(l.id);return b&&{p:variant(b,l.s),q:l.q}}).filter(Boolean);
function addCart(id,q=1,s=0){const c=cart(),k=id+'|'+(s||0),l=c.find(x=>lineKey(x)===k),m=P(id).stock;if(l)l.q=Math.min(m,l.q+q);else c.push({id:+id,q:Math.min(m,q),s:+s||0});set('cart',c);badges()}
function totals(L){const sub=L.reduce((s,{p,q})=>s+p.mrp*q,0),pay=L.reduce((s,{p,q})=>s+p.price*q,0),ship=!pay||pay>=499?0:40;return{sub,disc:sub-pay,ship,total:pay+ship}}
const sumHTML=t=>`<div class="space-y-2 text-sm"><div class="flex justify-between"><span>Subtotal</span><b>${inr(t.sub)}</b></div><div class="flex justify-between text-brand"><span>Discount</span><b>-${inr(t.disc)}</b></div><div class="flex justify-between"><span>Delivery charges</span><b>${t.ship?inr(t.ship):'FREE'}</b></div><div class="flex justify-between border-t pt-2 text-base"><b>Grand total</b><b>${inr(t.total)}</b></div>${t.ship?'<p class="text-xs text-gray-500">Free delivery on orders above ₹499</p>':''}</div>`;
function badges(){const L=cartLines(),a=$('#cc'),b=$('#wc'),c=$('#ct');if(a)a.textContent=L.reduce((s,x)=>s+x.q,0);if(b)b.textContent=wl().length;if(c)c.textContent=inr(totals(L).total-totals(L).ship)}
