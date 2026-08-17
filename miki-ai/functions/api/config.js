import { jsonResponse } from '../_utils/http.js';

export async function onRequestGet({ env }) {
  return jsonResponse({
    lineOfficialAccountUrl: env.LINE_OFFICIAL_ACCOUNT_URL || '',
  });
}
