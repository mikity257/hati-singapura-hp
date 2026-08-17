import { verifyLineSignature } from '../_utils/lineVerify.js';

export async function onRequestPost({ request, env }) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-line-signature');

  const isValid = await verifyLineSignature(rawBody, signature, env.LINE_CHANNEL_SECRET);
  if (!isValid) {
    return new Response('invalid signature', { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response('bad request', { status: 400 });
  }

  const events = payload.events || [];
  for (const event of events) {
    // MVPでは署名検証つきの受信のみを行う。
    // フォロー/メッセージイベントへの自動応答などは後続フェーズで追加する。
    console.log('LINE webhook event received:', event.type);
  }

  return new Response('OK', { status: 200 });
}
