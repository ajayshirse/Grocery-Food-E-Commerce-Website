const cart=()=>get('cart',[]),wl=()=>get('wish',[]);
const cartLines=()=>cart().map(l=>({p:P(l.id),q:l.q})).filter(l=>l.p);
function addCart(id,q=1){const c=cart(),l=c.find(x=>x.id==id),m=P(id).stock;if(l)l.q=Math.min(m,l.q+q);else c.push({id:+id,q:Math.min(m,q)});set('cart',c);badges()}
function totals(L){const sub=L.reduce((s,{p,q})=>s+p.mrp*q,0),pay=L.reduce((s,{p,q})=>s+p.price*q,0),ship=!pay||pay>=499?0:40;return{sub,disc:sub-pay,ship,total:pay+ship}}
const sumHTML=t=>`<div class="space-y-2 text-sm"><div class="flex justify-between"><span>Subtotal</span><b>${inr(t.sub)}</b></div><div class="flex justify-between text-brand"><span>Discount</span><b>-${inr(t.disc)}</b></div><div class="flex justify-between"><span>Delivery charges</span><b>${t.ship?inr(t.ship):'FREE'}</b></div><div class="flex justify-between border-t pt-2 text-base"><b>Grand total</b><b>${inr(t.total)}</b></div>${t.ship?'<p class="text-xs text-gray-500">Free delivery on orders above ₹499</p>':''}</div>`;
function badges(){const L=cartLines(),a=$('#cc'),b=$('#wc'),c=$('#ct');if(a)a.textContent=L.reduce((s,x)=>s+x.q,0);if(b)b.textContent=wl().length;if(c)c.textContent=inr(totals(L).total-totals(L).ship)}
