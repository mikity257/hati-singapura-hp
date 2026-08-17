export async function getSession(env, sessionId) {
  const raw = await env.MIKI_AI_SESSIONS.get(sessionId);
  return raw ? JSON.parse(raw) : null;
}

export async function saveSession(env, sessionId, data) {
  await env.MIKI_AI_SESSIONS.put(sessionId, JSON.stringify(data));
}

export function createSessionRecord(sessionId, { answers, freetext }) {
  const now = new Date().toISOString();
  return {
    session_id: sessionId,
    answers,
    freetext,
    chat_history: [],
    chat_turns: 0,
    diagnosis_summary: '',
    line_click: false,
    created_at: now,
    updated_at: now,
  };
}
