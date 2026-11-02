#!/usr/bin/env node
// Uploads local video files to Cloudflare Stream via the TUS resumable-upload
// protocol, and marks each one as requiring a signed playback URL (so they
// can only be watched through the /members/ site's signed iframe tokens).
//
// Requires Node 18+ (for global fetch) and two environment variables:
//   CLOUDFLARE_ACCOUNT_ID  - your Cloudflare account id
//   CLOUDFLARE_API_TOKEN   - an API token with "Stream: Edit" permission
//
// Usage:
//   CLOUDFLARE_ACCOUNT_ID=xxx CLOUDFLARE_API_TOKEN=yyy \
//     node scripts/members-upload-videos.mjs ["/path/to/video/folder"]
//
// Default folder: /Users/mikim/Documents/養成講座/テクニカルマニュアル動画
//
// After it finishes, copy the printed title / Stream UID pairs into the
// admin panel at https://hati-sg.com/members/admin/ ("新しい動画を追加").

import fs from 'node:fs/promises';
import path from 'node:path';

const CHUNK_SIZE = 50 * 1024 * 1024; // 50MiB, multiple of 256KiB as required by the API

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const folder = process.argv[2] || '/Users/mikim/Documents/養成講座/テクニカルマニュアル動画';

if (!accountId || !apiToken) {
  console.error('Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN environment variables first.');
  process.exit(1);
}

const VIDEO_EXTENSIONS = new Set(['.mov', '.mp4', '.m4v']);

function toBase64(str) {
  return Buffer.from(str, 'utf-8').toString('base64');
}

async function createUpload(filePath, size, title) {
  const metadata = [`name ${toBase64(title)}`, `requiresignedurls ${toBase64('true')}`].join(',');

  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Tus-Resumable': '1.0.0',
      'Upload-Length': String(size),
      'Upload-Metadata': metadata,
    },
  });

  if (!res.ok && res.status !== 201) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to create upload for ${title}: ${res.status} ${text}`);
  }

  const location = res.headers.get('location');
  const uid = res.headers.get('stream-media-id');
  if (!location || !uid) {
    throw new Error(`Unexpected response creating upload for ${title} (missing location/stream-media-id)`);
  }
  return { uploadUrl: location, uid };
}

async function uploadChunks(uploadUrl, filePath, size) {
  const fh = await fs.open(filePath, 'r');
  try {
    let offset = 0;
    while (offset < size) {
      const length = Math.min(CHUNK_SIZE, size - offset);
      const buffer = Buffer.alloc(length);
      await fh.read(buffer, 0, length, offset);

      const res = await fetch(uploadUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Tus-Resumable': '1.0.0',
          'Upload-Offset': String(offset),
          'Content-Type': 'application/offset+octet-stream',
        },
        body: buffer,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Chunk upload failed at offset ${offset}: ${res.status} ${text}`);
      }

      offset += length;
      const pct = ((offset / size) * 100).toFixed(1);
      process.stdout.write(`\r  uploading... ${pct}% (${offset}/${size} bytes)`);
    }
    process.stdout.write('\n');
  } finally {
    await fh.close();
  }
}

async function main() {
  const entries = await fs.readdir(folder, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && VIDEO_EXTENSIONS.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort();

  if (!files.length) {
    console.error(`No video files found in ${folder}`);
    process.exit(1);
  }

  console.log(`Found ${files.length} video(s) in ${folder}\n`);
  const results = [];

  for (const file of files) {
    const filePath = path.join(folder, file);
    const title = path.basename(file, path.extname(file));
    const { size } = await fs.stat(filePath);

    console.log(`Uploading "${title}" (${(size / 1024 / 1024).toFixed(1)} MB)...`);
    const { uploadUrl, uid } = await createUpload(filePath, size, title);
    await uploadChunks(uploadUrl, filePath, size);
    console.log(`  done -> uid: ${uid}\n`);
    results.push({ title, uid });
  }

  console.log('All uploads complete. Add these in the admin panel (/members/admin/):\n');
  console.log('title\tstreamUid');
  results.forEach((r) => console.log(`${r.title}\t${r.uid}`));
}

main().catch((err) => {
  console.error('\n' + (err && err.message ? err.message : err));
  process.exit(1);
});
