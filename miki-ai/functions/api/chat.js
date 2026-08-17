import { jsonResponse } from '../_utils/http.js';
import { getSession, saveSession } from '../_utils/kv.js';
import { buildSystemPrompt } from '../_utils/systemPrompt.js';
import { callClaude } from '../_utils/anthropic.js';

const MAX_TURNS = 3;

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid json' }, 400);
  }

  const { sessionId, message } = body || {};
  if (!sessionId || !message || !message.trim()) {
    return jsonResponse({ error: 'sessionId and message are required' }, 400);
  }
  if (!env.ANTHROPIC_API_KEY) {
    return jsonResponse({ error: 'server is not configured' }, 500);
  }

  const session = await getSession(env, sessionId);
  if (!session) {
    return jsonResponse({ error: 'session not found' }, 404);
  }
  if (session.chat_turns >= MAX_TURNS) {
    return jsonResponse({ error: 'max turns reached' }, 400);
  }

  const nextTurn = session.chat_turns + 1;
  const isFinal = nextTurn >= MAX_TURNS;
  const system = buildSystemPrompt({ mode: 'chat', turn: nextTurn, isFinal });

  let messages = session.chat_history.map((m) => ({
    role: m.role === 'ai' ? 'assistant' : 'user',
    content: m.text,
  }));
  if (messages.length === 0 && session.diagnosis_summary) {
    messages = [{ role: 'assistant', content: session.diagnosis_summary }];
  }
  messages.push({ role: 'user', content: message.trim() });

  try {
    const reply = await callClaude({ apiKey: env.ANTHROPIC_API_KEY, system, messages });

    session.chat_history.push({ role: 'user', text: message.trim() });
    session.chat_history.push({ role: 'ai', text: reply });
    session.chat_turns = nextTurn;
    session.updated_at = new Date().toISOString();
    await saveSession(env, sessionId, session);

    return jsonResponse({ reply, turn: nextTurn, isFinal });
  } catch (err) {
    return jsonResponse({ error: 'chat failed' }, 500);
  }
}
