import { jsonResponse } from '../../../../_utils/http.js';
import { requireAdmin, hashPassword } from '../../../../_utils/membersAuth.js';

export async function onRequestDelete({ request, env, params }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return jsonResponse({ error: 'forbidden' }, 403);

  const username = params.username.toLowerCase();
  if (username === admin.username) {
    return jsonResponse({ error: 'cannot_delete_self' }, 400);
  }
  await env.MEMBERS_KV.delete(`user:${username}`);
  return jsonResponse({ ok: true });
}

export async function onRequestPatch({ request, env, params }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return jsonResponse({ error: 'forbidden' }, 403);

  const username = params.username.toLowerCase();
  const raw = await env.MEMBERS_KV.get(`user:${username}`);
  if (!raw) return jsonResponse({ error: 'not_found' }, 404);
  const user = JSON.parse(raw);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_request' }, 400);
  }

  if (body.password) {
    if (body.password.length < 8) return jsonResponse({ error: 'weak_password' }, 400);
    user.passwordHash = await hashPassword(body.password);
  }
  if (body.displayName) user.displayName = body.displayName.trim();
  if (body.role === 'admin' || body.role === 'student') user.role = body.role;

  await env.MEMBERS_KV.put(`user:${username}`, JSON.stringify(user));
  return jsonResponse({ ok: true });
}
