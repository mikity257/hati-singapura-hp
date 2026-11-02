// Builds short-lived signed Cloudflare Stream playback URLs.
// Requires these bindings (set via `wrangler pages secret put` for the Pages project):
//   MEMBERS_STREAM_SIGNING_KEY_ID  - the signing key id from Cloudflare Stream
//   MEMBERS_STREAM_SIGNING_KEY_PEM - the PEM private key (PKCS8) for that signing key
//   MEMBERS_STREAM_CUSTOMER_CODE   - the "customer-XXXX" code for the account's Stream subdomain

const TOKEN_TTL_SECONDS = 60 * 60 * 6; // 6 hours - enough for one viewing session

function base64UrlEncodeBytes(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlEncodeString(str) {
  return base64UrlEncodeBytes(new TextEncoder().encode(str));
}

function pemToArrayBuffer(pem) {
  const b64 = pem
    .replace(/-----BEGIN [^-]+-----/, '')
    .replace(/-----END [^-]+-----/, '')
    .replace(/\s+/g, '');
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

let cachedKey = null;
let cachedKeyPem = null;

async function importSigningKey(pem) {
  if (cachedKey && cachedKeyPem === pem) return cachedKey;
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(pem),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  cachedKey = key;
  cachedKeyPem = pem;
  return key;
}

export async function buildSignedIframeUrl(env, videoUid) {
  const keyId = env.MEMBERS_STREAM_SIGNING_KEY_ID;
  const pem = env.MEMBERS_STREAM_SIGNING_KEY_PEM;
  const customerCode = env.MEMBERS_STREAM_CUSTOMER_CODE;
  if (!keyId || !pem || !customerCode) {
    throw new Error('Stream signing is not configured (missing env vars)');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', kid: keyId };
  const payload = {
    sub: videoUid,
    kid: keyId,
    exp: now + TOKEN_TTL_SECONDS,
    nbf: now - 30,
  };

  const headerB64 = base64UrlEncodeString(JSON.stringify(header));
  const payloadB64 = base64UrlEncodeString(JSON.stringify(payload));
  const toSign = `${headerB64}.${payloadB64}`;

  const key = await importSigningKey(pem);
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(toSign)
  );

  const token = `${toSign}.${base64UrlEncodeBytes(new Uint8Array(signature))}`;
  return `https://customer-${customerCode}.cloudflarestream.com/${token}/iframe`;
}
