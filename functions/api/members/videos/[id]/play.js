import { jsonResponse } from '../../../../_utils/http.js';
import { getSession } from '../../../../_utils/membersAuth.js';
import { listVideos } from '../../../../_utils/videos.js';
import { buildSignedIframeUrl } from '../../../../_utils/streamToken.js';

export async function onRequestGet({ request, env, params }) {
  const session = await getSession(env, request);
  if (!session) return jsonResponse({ error: 'unauthorized' }, 401);

  const videos = await listVideos(env);
  const video = videos.find((v) => v.id === params.id);
  if (!video) return jsonResponse({ error: 'not_found' }, 404);

  try {
    const iframeUrl = await buildSignedIframeUrl(env, video.streamUid);
    return jsonResponse({ iframeUrl, title: video.title });
  } catch (err) {
    return jsonResponse({ error: 'token_error', message: String(err && err.message ? err.message : err) }, 500);
  }
}
