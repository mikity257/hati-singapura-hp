import { jsonResponse } from '../_utils/http.js';
import { getSession, saveSession } from '../_utils/kv.js';

export async function onRequestPost({ request, env }) {
  try {
    const { sessionId } = await request.json();
    if (sessionId) {
      const session = await getSession(env, sessionId);
      if (session) {
        session.line_click = true;
        session.updated_at = new Date().toISOString();
        await saveSession(env, sessionId, session);
      }
    }
  } catch {
    // best-effort logging endpoint; ignore malformed requests
  }
  return jsonResponse({ ok: true });
}
