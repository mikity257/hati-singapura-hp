const videoGrid = document.getElementById('videoGrid');
const welcomeText = document.getElementById('welcomeText');
const adminLink = document.getElementById('adminLink');
const logoutBtn = document.getElementById('logoutBtn');
const playerModal = document.getElementById('playerModal');
const playerFrameWrap = document.getElementById('playerFrameWrap');
const playerTitle = document.getElementById('playerTitle');
const closePlayer = document.getElementById('closePlayer');

async function init() {
  const sessionRes = await fetch('/api/members/session');
  const session = await sessionRes.json();
  if (!session.authenticated) {
    location.href = '/members/';
    return;
  }
  welcomeText.textContent = `${session.displayName} さん`;
  if (session.role === 'admin') adminLink.hidden = false;

  const videosRes = await fetch('/api/members/videos');
  const data = await videosRes.json();
  renderVideos(data.videos || []);
}

function renderVideos(videos) {
  videoGrid.innerHTML = '';
  if (!videos.length) {
    videoGrid.innerHTML = '<p class="video-empty">まだ動画が登録されていません。</p>';
    return;
  }
  videos.forEach((video) => {
    const card = document.createElement('button');
    card.className = 'video-card';
    card.innerHTML = `
      <span class="video-card-title">${escapeHtml(video.title)}</span>
      ${video.description ? `<span class="video-card-desc">${escapeHtml(video.description)}</span>` : ''}
    `;
    card.addEventListener('click', () => openVideo(video));
    videoGrid.appendChild(card);
  });
}

async function openVideo(video) {
  playerTitle.textContent = video.title;
  playerFrameWrap.innerHTML = '<p class="player-loading">読み込み中...</p>';
  playerModal.hidden = false;
  try {
    const res = await fetch(`/api/members/videos/${video.id}/play`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'error');
    playerFrameWrap.innerHTML = `
      <iframe
        src="${data.iframeUrl}"
        loading="lazy"
        style="border:none;position:absolute;top:0;left:0;height:100%;width:100%;"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowfullscreen="true"
      ></iframe>`;
  } catch (err) {
    playerFrameWrap.innerHTML = '<p class="player-loading">動画の読み込みに失敗しました。</p>';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

closePlayer.addEventListener('click', () => {
  playerModal.hidden = true;
  playerFrameWrap.innerHTML = '';
});

logoutBtn.addEventListener('click', async () => {
  await fetch('/api/members/logout', { method: 'POST' });
  location.href = '/members/';
});

init();
