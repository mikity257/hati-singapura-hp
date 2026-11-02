import { jsonResponse } from '../../_utils/http.js';
import { getSession } from '../../_utils/membersAuth.js';

export async function onRequestGet({ request, env }) {
  const session = await getSession(env, request);
  if (!session) return jsonResponse({ authenticated: false });
  return jsonResponse({
    authenticated: true,
    username: session.username,
    displayName: session.displayName,
    role: session.role,
  });
}
