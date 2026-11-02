#!/usr/bin/env node
// Generates a user record for the /members/ students-only site and prints the
// exact `wrangler kv key put` command to register it in the MEMBERS_KV namespace.
//
// Usage:
//   node scripts/members-create-user.mjs <username> <displayName> <password> [role]
//
// Example (first admin account):
//   node scripts/members-create-user.mjs miki "三木 美希" "ChangeThisPassword123" admin
//
// The hashing here (PBKDF2-SHA256, 100000 iterations, 16-byte salt, 32-byte key)
// must match functions/_utils/membersAuth.js exactly.

import crypto from 'node:crypto';

const PBKDF2_ITERATIONS = 100000;

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const derived = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 32, 'sha256');
  return `pbkdf2$${PBKDF2_ITERATIONS}$${salt.toString('hex')}$${derived.toString('hex')}`;
}

const [username, displayName, password, role = 'student'] = process.argv.slice(2);

if (!username || !displayName || !password) {
  console.error('Usage: node scripts/members-create-user.mjs <username> <displayName> <password> [role=student|admin]');
  process.exit(1);
}

if (!/^[a-z0-9_.-]{3,32}$/.test(username)) {
  console.error('username must be lowercase alphanumeric / _ . - , 3-32 chars');
  process.exit(1);
}

if (password.length < 8) {
  console.error('password must be at least 8 characters');
  process.exit(1);
}

if (role !== 'student' && role !== 'admin') {
  console.error('role must be "student" or "admin"');
  process.exit(1);
}

const record = {
  username: username.toLowerCase(),
  displayName,
  role,
  passwordHash: hashPassword(password),
  createdAt: new Date().toISOString(),
};

const key = `user:${record.username}`;
const value = JSON.stringify(record);

console.log('Generated record:');
console.log(JSON.stringify(record, null, 2));
console.log('\nRun this to register it (requires `wrangler login` against the Cloudflare account first):\n');
console.log(`npx wrangler kv key put --config wrangler.jsonc --binding MEMBERS_KV --remote "${key}" '${value}'`);
