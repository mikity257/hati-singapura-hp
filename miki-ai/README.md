# 美希AI｜本音発見チャットボット（MVP）

HATI公式LINE登録者向けの、選択式質問・自由記述・AIとの短い対話を通じて
「本当はどうしたいか」を一緒に整理していくWebチャットボットです。

- フロントエンド: Vite + Vanilla JS（`src/`）
- バックエンド: Cloudflare Pages Functions（`functions/`）
- データ保存: Cloudflare KV

## 画面構成

1. トップ画面
2. 説明画面
3. 選択式質問画面（質問1〜3、複数選択可）
4. 自由記述画面
5. AI分析結果画面
6. AIチャット画面（最大3往復）
7. 最終CTA画面（LINE誘導）

## セットアップ

```bash
cd miki-ai
npm install
cp .env.example .env       # 参考用（実際に読まれるのは Cloudflare の環境変数 / .dev.vars）
cp .dev.vars.example .dev.vars
```

`.dev.vars` に実際のAPIキー・LINEチャンネル情報を入力してください。

### KVネームスペースの作成（初回のみ）

```bash
npx wrangler kv namespace create MIKI_AI_SESSIONS
```

出力された `id` を `wrangler.jsonc` の `kv_namespaces[0].id` に設定してください。
（プレビュー用に `--preview` オプションで作成した場合は `preview_id` も追記します）

### ローカル開発

フロントエンドのみ（API呼び出しは `vite.config.js` のproxy経由で `:8788` に転送）:

```bash
npm run dev
```

API（Pages Functions）も含めて動かす場合は、先にビルドしてから:

```bash
npm run build
npm run pages:dev
```

## デプロイ（Cloudflare Pages）

1. Cloudflare Pages で新規プロジェクトを作成し、GitHubリポジトリ
   `mikity257/hati-singapura-hp` を接続する
2. ビルド設定
   - Root directory: `miki-ai`
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Settings → Functions → KV namespace bindings で
   `MIKI_AI_SESSIONS` を作成済みのKVネームスペースに紐付ける
4. Settings → Environment variables で以下を設定する
   - `ANTHROPIC_API_KEY`
   - `LINE_CHANNEL_ACCESS_TOKEN`
   - `LINE_CHANNEL_SECRET`
   - `LINE_OFFICIAL_ACCOUNT_URL`
5. デプロイ完了後、LINE Developers コンソールの
   Messaging API設定で Webhook URL を
   `https://<デプロイ先ドメイン>/api/line-webhook` に設定し、有効化する

## KVに保存されるセッションデータ

キー: `session_id`

```json
{
  "session_id": "...",
  "answers": { "q1": [], "q2": [], "q3": [] },
  "freetext": "...",
  "chat_history": [{ "role": "user" | "ai", "text": "..." }],
  "chat_turns": 0,
  "diagnosis_summary": "...",
  "line_click": false,
  "created_at": "...",
  "updated_at": "..."
}
```

## 今回のMVPスコープ外

- データ分析・集計ダッシュボード
- 管理画面
- コンバージョン計測の高度化
- LINE webhookでのメッセージ自動応答（署名検証つきの受信のみ実装済み）
