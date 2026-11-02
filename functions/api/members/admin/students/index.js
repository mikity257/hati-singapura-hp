import { jsonResponse } from '../../../../_utils/http.js';
import { requireAdmin, hashPassword } from '../../../../_utils/membersAuth.js';

export async function onRequestGet({ request, env }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return jsonResponse({ error: 'forbidden' }, 403);

  const list = await env.MEMBERS_KV.list({ prefix: 'user:' });
  const users = await Promise.all(
    list.keys.map(async (k) => {
      const raw = await env.MEMBERS_KV.get(k.name);
      const u = JSON.parse(raw);
      return { username: u.username, displayName: u.displayName, role: u.role, createdAt: u.createdAt };
    })
  );
  users.sort((a, b) => a.username.localeCompare(b.username));
  return jsonResponse({ users });
}

export async function onRequestPost({ request, env }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return jsonResponse({ error: 'forbidden' }, 403);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_request' }, 400);
  }

  const username = (body.username || '').trim().toLowerCase();
  const displayName = (body.displayName || '').trim();
  const password = body.password || '';
  const role = body.role === 'admin' ? 'admin' : 'student';

  if (!username || !displayName || !password) {
    return jsonResponse({ error: 'missing_fields' }, 400);
  }
  if (!/^[a-z0-9_.-]{3,32}$/.test(username)) {
    return jsonResponse({ error: 'invalid_username' }, 400);
  }
  if (password.length < 8) {
    return jsonResponse({ error: 'weak_password' }, 400);
  }

  const existing = await env.MEMBERS_KV.get(`user:${username}`);
  if (existing) {
    return jsonResponse({ error: 'username_taken' }, 409);
  }

  const passwordHash = await hashPassword(password);
  const record = {
    username,
    displayName,
    role,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  await env.MEMBERS_KV.put(`user:${username}`, JSON.stringify(record));
  return jsonResponse({ ok: true, username, displayName, role });
}
