import { jsonResponse } from '../../../../_utils/http.js';
import { requireAdmin } from '../../../../_utils/membersAuth.js';
import { listVideos, saveVideos } from '../../../../_utils/videos.js';

export async function onRequestPatch({ request, env, params }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return jsonResponse({ error: 'forbidden' }, 403);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_request' }, 400);
  }

  const videos = await listVideos(env);
  const idx = videos.findIndex((v) => v.id === params.id);
  if (idx === -1) return jsonResponse({ error: 'not_found' }, 404);

  const v = videos[idx];
  if (body.title) v.title = body.title.trim();
  if (body.description !== undefined) v.description = body.description.trim();
  if (body.streamUid) v.streamUid = body.streamUid.trim();
  if (typeof body.order === 'number') v.order = body.order;

  await saveVideos(env, videos);
  return jsonResponse({ ok: true });
}

export async function onRequestDelete({ request, env, params }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return jsonResponse({ error: 'forbidden' }, 403);

  const videos = await listVideos(env);
  const next = videos.filter((v) => v.id !== params.id);
  await saveVideos(env, next);
  return jsonResponse({ ok: true });
}
