const A = $('#app'), rem = get('remember', '');
A.innerHTML = `<div class="max-w-md mx-auto card !p-8 mt-8">
<h1 class="text-2xl font-extrabold">Welcome back</h1>
<p class="text-sm text-gray-500">Login to continue shopping.</p>
<form id="f" novalidate class="mt-5">${fld('email', 'Email Address', { v: rem })}
${fld('pw', 'Password', { t: 'password' })}
<div class="flex justify-between items-center text-sm mb-4">
<label class="flex gap-2 items-center">
<input type="checkbox" name="rm" ${rem ? 'checked' : ''}> 
Remember me</label>
<button type="button" id="fg" class="text-brand font-semibold">
Forgot password?
</button>
</div>
<button class="btn btn-p w-full">
LOGIN
</button>
</form>
<form id="fp" novalidate class="hidden mt-4 border-t pt-4">
<p class="text-sm font-semibold mb-2">
Reset your password
</p>${fld('remail', 'Registered email')}
<button class="btn btn-o btn-s">Send reset link</button>
</form>
<p id="msg" class="mt-3 text-sm font-semibold text-brand">
</p>
<p class="mt-4 text-sm text-center">
New here?
<a class="font-bold text-brand" href="register.html">
Create an account
</a>
<br>
<span class="text-xs text-gray-500">
Demo: demo@freshmart.in / demo123
</span>
</p>
</div>`;
$('#fg').onclick = () => $('#fp').classList.toggle('hidden');
$('#fp').onsubmit = e => { e.preventDefault(); const v = e.target.elements.remail.value.trim(); if (!showErr(e.target, V.email(v) ? {} : { remail: 'Enter a valid email' })) return; toast('Reset link sent (demo only)') };
$('#f').onsubmit = e => {
    e.preventDefault(); const f = e.target, em = f.elements.email.value.trim().toLowerCase(), pw = f.elements.pw.value, er = {};
    if (!V.email(em)) er.email = 'Enter a valid email address'; if (!pw) er.pw = 'Enter your password';
    const u = get('users', []).find(x => x.email === em && x.pw === pw); if (!Object.keys(er).length && !u) er.pw = 'Incorrect email or password';
    if (!showErr(f, er)) return toast('Login failed', 'err');
    set('session', u.email); set('remember', f.elements.rm.checked ? em : ''); $('#msg').textContent = 'Login successful! Redirecting...'; toast('Welcome back, ' + u.name.split(' ')[0]); setTimeout(() => location.href = qs.get('next') || 'my-account.html', 900)
};
