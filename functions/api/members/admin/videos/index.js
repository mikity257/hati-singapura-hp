import { jsonResponse } from '../../../../_utils/http.js';
import { requireAdmin } from '../../../../_utils/membersAuth.js';
import { listVideos, saveVideos } from '../../../../_utils/videos.js';

export async function onRequestGet({ request, env }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return jsonResponse({ error: 'forbidden' }, 403);
  const videos = await listVideos(env);
  return jsonResponse({ videos });
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

  const title = (body.title || '').trim();
  const streamUid = (body.streamUid || '').trim();
  const description = (body.description || '').trim();
  if (!title || !streamUid) {
    return jsonResponse({ error: 'missing_fields' }, 400);
  }

  const videos = await listVideos(env);
  const id = crypto.randomUUID();
  const order = videos.length ? Math.max(...videos.map((v) => v.order ?? 0)) + 1 : 1;
  videos.push({ id, title, description, streamUid, order });
  await saveVideos(env, videos);
  return jsonResponse({ ok: true, id });
}
