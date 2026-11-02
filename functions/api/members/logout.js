import { jsonResponse } from '../../_utils/http.js';
import { getSession, destroySession, sessionCookieHeader } from '../../_utils/membersAuth.js';

export async function onRequestPost({ request, env }) {
  const session = await getSession(env, request);
  if (session) await destroySession(env, session.token);
  const res = jsonResponse({ ok: true });
  res.headers.append('Set-Cookie', sessionCookieHeader(null, { clear: true }));
  return res;
}
