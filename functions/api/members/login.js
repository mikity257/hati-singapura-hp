import { jsonResponse } from '../../_utils/http.js';
import { verifyPassword, createSession, sessionCookieHeader } from '../../_utils/membersAuth.js';

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_request' }, 400);
  }

  const username = (body.username || '').trim().toLowerCase();
  const password = body.password || '';
  if (!username || !password) {
    return jsonResponse({ error: 'missing_credentials' }, 400);
  }

  const raw = await env.MEMBERS_KV.get(`user:${username}`);
  if (!raw) {
    return jsonResponse({ error: 'invalid_credentials' }, 401);
  }

  const user = JSON.parse(raw);
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return jsonResponse({ error: 'invalid_credentials' }, 401);
  }

  const { token } = await createSession(env, user);
  const res = jsonResponse({ ok: true, displayName: user.displayName, role: user.role });
  res.headers.append('Set-Cookie', sessionCookieHeader(token));
  return res;
}
