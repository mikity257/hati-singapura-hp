import { jsonResponse } from '../../_utils/http.js';
import { getSession } from '../../_utils/membersAuth.js';
import { listVideos } from '../../_utils/videos.js';

// Metadata only - no playback tokens here. Tokens are minted per-video on demand
// via /api/members/videos/:id/play so they stay short-lived.
export async function onRequestGet({ request, env }) {
  const session = await getSession(env, request);
  if (!session) return jsonResponse({ error: 'unauthorized' }, 401);

  const videos = await listVideos(env);
  return jsonResponse({
    videos: videos.map(({ id, title, description }) => ({ id, title, description })),
  });
}
