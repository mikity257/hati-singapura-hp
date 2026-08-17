async function postJson(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `リクエストに失敗しました (${res.status})`);
  }
  return res.json();
}

export function fetchAnalysis({ sessionId, answers, freetext }) {
  return postJson('/api/analyze', { sessionId, answers, freetext });
}

export function sendChatMessage({ sessionId, message }) {
  return postJson('/api/chat', { sessionId, message });
}

export function notifyLineClick({ sessionId }) {
  return fetch('/api/line-click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
    keepalive: true,
  }).catch(() => {});
}

export async function fetchConfig() {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}
