const studentsTbody = document.querySelector('#studentsTable tbody');
const videosTbody = document.querySelector('#videosTable tbody');
const addStudentForm = document.getElementById('addStudentForm');
const addVideoForm = document.getElementById('addVideoForm');
const studentFormError = document.getElementById('studentFormError');
const videoFormError = document.getElementById('videoFormError');
const logoutBtn = document.getElementById('logoutBtn');

async function init() {
  const sessionRes = await fetch('/api/members/session');
  const session = await sessionRes.json();
  if (!session.authenticated) {
    location.href = '/members/';
    return;
  }
  if (session.role !== 'admin') {
    alert('管理者権限が必要です。');
    location.href = '/members/videos/';
    return;
  }
  await Promise.all([loadStudents(), loadVideos()]);
}

async function loadStudents() {
  const res = await fetch('/api/members/admin/students');
  const data = await res.json();
  studentsTbody.innerHTML = '';
  (data.users || []).forEach((u) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(u.username)}</td>
      <td>${escapeHtml(u.displayName)}</td>
      <td>${u.role === 'admin' ? '管理者' : '受講生'}</td>
      <td>
        <button class="admin-btn-small" data-action="reset" data-username="${escapeHtml(u.username)}">パスワード再設定</button>
        <button class="admin-btn-small admin-btn-danger" data-action="delete" data-username="${escapeHtml(u.username)}">削除</button>
      </td>`;
    studentsTbody.appendChild(tr);
  });
}

async function loadVideos() {
  const res = await fetch('/api/members/admin/videos');
  const data = await res.json();
  videosTbody.innerHTML = '';
  (data.videos || []).forEach((v) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(v.title)}</td>
      <td>${escapeHtml(v.streamUid)}</td>
      <td>${v.order ?? ''}</td>
      <td><button class="admin-btn-small admin-btn-danger" data-action="delete-video" data-id="${escapeHtml(v.id)}">削除</button></td>`;
    videosTbody.appendChild(tr);
  });
}

studentsTbody.addEventListener('click', async (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const username = btn.dataset.username;
  if (btn.dataset.action === 'delete') {
    if (!confirm(`${username} を削除しますか?`)) return;
    await fetch(`/api/members/admin/students/${encodeURIComponent(username)}`, { method: 'DELETE' });
    loadStudents();
  } else if (btn.dataset.action === 'reset') {
    const newPassword = prompt(`${username} の新しいパスワード(8文字以上)を入力してください`);
    if (!newPassword) return;
    if (newPassword.length < 8) {
      alert('8文字以上で入力してください。');
      return;
    }
    await fetch(`/api/members/admin/students/${encodeURIComponent(username)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    });
    alert('パスワードを再設定しました。');
  }
});

videosTbody.addEventListener('click', async (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  if (btn.dataset.action === 'delete-video') {
    if (!confirm('この動画を削除しますか?')) return;
    await fetch(`/api/members/admin/videos/${encodeURIComponent(btn.dataset.id)}`, { method: 'DELETE' });
    loadVideos();
  }
});

addStudentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  studentFormError.hidden = true;
  const fd = new FormData(addStudentForm);
  const payload = {
    username: fd.get('username'),
    displayName: fd.get('displayName'),
    password: fd.get('password'),
    role: fd.get('role'),
  };
  const res = await fetch('/api/members/admin/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    studentFormError.textContent = describeStudentError(data.error);
    studentFormError.hidden = false;
    return;
  }
  addStudentForm.reset();
  loadStudents();
});

addVideoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  videoFormError.hidden = true;
  const fd = new FormData(addVideoForm);
  const payload = {
    title: fd.get('title'),
    description: fd.get('description'),
    streamUid: fd.get('streamUid'),
  };
  const res = await fetch('/api/members/admin/videos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    videoFormError.textContent = data.error === 'missing_fields' ? '未入力の項目があります。' : '追加に失敗しました。';
    videoFormError.hidden = false;
    return;
  }
  addVideoForm.reset();
  loadVideos();
});

logoutBtn.addEventListener('click', async () => {
  await fetch('/api/members/logout', { method: 'POST' });
  location.href = '/members/';
});

function describeStudentError(code) {
  switch (code) {
    case 'username_taken':
      return 'そのユーザー名は既に使われています。';
    case 'invalid_username':
      return 'ユーザー名は半角英数字・_・-のみ、3〜32文字で入力してください。';
    case 'weak_password':
      return 'パスワードは8文字以上で入力してください。';
    case 'missing_fields':
      return '未入力の項目があります。';
    default:
      return '追加に失敗しました。';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

init();
