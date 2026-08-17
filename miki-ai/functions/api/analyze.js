import { jsonResponse } from '../_utils/http.js';
import { saveSession, createSessionRecord } from '../_utils/kv.js';
import { buildSystemPrompt } from '../_utils/systemPrompt.js';
import { callClaude } from '../_utils/anthropic.js';
import { QUESTION_TITLES } from '../_utils/questions.js';

function buildUserMessage(answers, freetext) {
  const lines = ['【選択式の回答】'];
  for (const key of ['q1', 'q2', 'q3']) {
    const title = QUESTION_TITLES[key];
    const selected = (answers?.[key] || []).join('、') || '（未選択）';
    lines.push(`・${title}\n  → ${selected}`);
  }
  lines.push('');
  lines.push('【自由記述】');
  lines.push(freetext && freetext.trim() ? freetext.trim() : '（記入なし）');
  lines.push('');
  lines.push('上記を踏まえて、最初のメッセージを作成してください。');
  return lines.join('\n');
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid json' }, 400);
  }

  const { sessionId, answers, freetext } = body || {};
  if (!sessionId || typeof sessionId !== 'string' || !answers) {
    return jsonResponse({ error: 'sessionId and answers are required' }, 400);
  }
  if (!env.ANTHROPIC_API_KEY) {
    return jsonResponse({ error: 'server is not configured' }, 500);
  }

  try {
    const system = buildSystemPrompt({ mode: 'analyze' });
    const userMessage = buildUserMessage(answers, freetext);
    const reply = await callClaude({
      apiKey: env.ANTHROPIC_API_KEY,
      system,
      messages: [{ role: 'user', content: userMessage }],
    });

    const record = createSessionRecord(sessionId, { answers, freetext: freetext || '' });
    record.diagnosis_summary = reply;
    await saveSession(env, sessionId, record);

    return jsonResponse({ summary: reply });
  } catch (err) {
    return jsonResponse({ error: 'analysis failed' }, 500);
  }
}
