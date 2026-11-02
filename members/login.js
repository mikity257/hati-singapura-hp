const form = document.getElementById('loginForm');
const errorEl = document.getElementById('loginError');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.hidden = true;
  const username = form.username.value.trim();
  const password = form.password.value;
  const btn = form.querySelector('button');
  btn.disabled = true;
  try {
    const res = await fetch('/api/members/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      errorEl.textContent = 'ユーザー名またはパスワードが正しくありません。';
      errorEl.hidden = false;
      return;
    }
    location.href = '/members/videos/';
  } catch (err) {
    errorEl.textContent = '通信エラーが発生しました。しばらくしてから再度お試しください。';
    errorEl.hidden = false;
  } finally {
    btn.disabled = false;
  }
});

// Already logged in? skip straight to the video library.
fetch('/api/members/session')
  .then((r) => r.json())
  .then((data) => {
    if (data.authenticated) location.href = '/members/videos/';
  })
  .catch(() => {});
