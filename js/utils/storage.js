const $=(s,e=document)=>e.querySelector(s),qs=new URLSearchParams(location.search);
const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const inr=n=>'₹'+Number(n).toLocaleString('en-IN',{maximumFractionDigits:0});
if(!get('users',[]).length)set('users',[{name:'Demo Customer',mobile:'9876543210',email:'demo@freshmart.in',pw:'demo123',addresses:[]}]);
const user=()=>get('users',[]).find(u=>u.email===get('session'));
const orders=()=>get('orders',[]);
function saveUser(fn){const us=get('users',[]),i=us.findIndex(x=>x.email===get('session'));fn(us[i]);set('users',us)}
