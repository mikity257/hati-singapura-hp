// Video library storage: a single JSON array kept under the KV key `videos_list`.
// Each entry: { id, title, description, streamUid, order }

const KEY = 'videos_list';

export async function listVideos(env) {
  const raw = await env.MEMBERS_KV.get(KEY);
  const videos = raw ? JSON.parse(raw) : [];
  return videos.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function saveVideos(env, videos) {
  await env.MEMBERS_KV.put(KEY, JSON.stringify(videos));
}
