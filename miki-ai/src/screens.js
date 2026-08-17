import { QUESTIONS } from './questions.js';

export function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const BRAND = `<div class="brand">HATI｜美希AI</div>`;

export function renderTop() {
  return `
    <div class="screen top-screen">
      <div class="top-mark">美希</div>
      <h1 class="top-title">はじめまして。<br />美希AIです。</h1>
      <p class="top-lead">
        あなたの中にある「本当はこうなれたらいいな」を、<br />
        いくつかの質問と少しの対話で、<br />
        一緒にそっと言葉にしていきませんか。
      </p>
      <button class="btn-primary" data-action="start">はじめる</button>
    </div>
  `;
}

export function renderIntro() {
  return `
    <div class="screen">
      ${BRAND}
      <h2 class="heading">美希AIについて</h2>
      <div class="card">
        <p class="lead-text" style="margin-bottom:14px;">
          美希AIは、HATI代表・美希の考え方をもとにした、
          あなたの気持ちを整理するためのAIチャットです。
        </p>
        <p class="lead-text" style="margin-bottom:14px;">
          何かを診断したり、答えを決めつけたりすることはありません。
          いくつかの質問と自由記述、そして少しの対話を通して、
          あなた自身がまだ言葉にできていない気持ちに、そっと近づいていくためのものです。
        </p>
        <p class="lead-text" style="margin-bottom:0;">
          所要時間は3〜5分ほどです。正解はありませんので、
          今の気持ちのまま進めてみてください。
        </p>
      </div>
      <button class="btn-primary spacer-top" data-action="to-questions">次へ</button>
    </div>
  `;
}

export function renderQuestions(state) {
  const q = QUESTIONS[state.questionIndex];
  const selected = state.answers[q.key];
  const options = q.options
    .map((opt, i) => {
      const id = `${q.key}-${i}`;
      const checked = selected.includes(opt) ? 'checked' : '';
      return `
        <div class="choice-item">
          <input type="checkbox" id="${id}" ${checked} data-action="toggle-choice" data-key="${q.key}" data-value="${escapeHtml(opt)}" />
          <label for="${id}"><span class="mark">✓</span><span>${escapeHtml(opt)}</span></label>
        </div>
      `;
    })
    .join('');

  const dots = QUESTIONS.map((_, i) => {
    let cls = '';
    if (i === state.questionIndex) cls = 'is-active';
    else if (i < state.questionIndex) cls = 'is-done';
    return `<span class="${cls}"></span>`;
  }).join('');

  const isLast = state.questionIndex === QUESTIONS.length - 1;
  const canProceed = selected.length > 0;

  return `
    <div class="screen">
      ${BRAND}
      <div class="step-label">質問 ${state.questionIndex + 1} / ${QUESTIONS.length}</div>
      <h2 class="heading">${escapeHtml(q.title)}</h2>
      <p class="lead-text" style="margin-bottom:16px;">${escapeHtml(q.note)}</p>
      <div class="choice-list">${options}</div>
      <button class="btn-primary" data-action="next-question" ${canProceed ? '' : 'disabled'}>
        ${isLast ? '自由記述へ' : '次へ'}
      </button>
      <div class="progress-dots">${dots}</div>
      ${state.questionIndex > 0 ? '<button class="btn-text" data-action="prev-question">前の質問に戻る</button>' : ''}
    </div>
  `;
}

export function renderFreetext(state) {
  const len = state.freetext.length;
  const canSubmit = state.freetext.trim().length > 0;
  return `
    <div class="screen">
      ${BRAND}
      <h2 class="heading">最後に、<br />教えてください</h2>
      <p class="lead-text">
        あなたの中にある「本当はこうなれたらいいな」を教えてください。<br />
        まとまっていなくても大丈夫です。
      </p>
      <textarea class="freetext" id="freetext-input" placeholder="思いつくままで大丈夫です…" data-action="freetext-input">${escapeHtml(state.freetext)}</textarea>
      <div class="char-count">${len}文字</div>
      <button class="btn-primary spacer-top" data-action="submit-freetext" ${canSubmit ? '' : 'disabled'}>
        送信する
      </button>
      <button class="btn-text" data-action="prev-to-questions">質問に戻る</button>
    </div>
  `;
}

export function renderAnalysis(state) {
  let body;
  if (state.analysisLoading) {
    body = `
      <div class="loading">
        <div class="spinner"></div>
        <div>美希AIがあなたの言葉を<br />そっと読み込んでいます…</div>
      </div>
    `;
  } else if (state.analysisError) {
    body = `
      <div class="card">
        <p class="error-text">${escapeHtml(state.analysisError)}</p>
      </div>
      <button class="btn-primary spacer-top" data-action="retry-analysis">もう一度試す</button>
    `;
  } else {
    const paragraphs = (state.analysis || '')
      .split(/\n{1,}/)
      .filter((p) => p.trim())
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join('');
    body = `
      <div class="card analysis-body">${paragraphs}</div>
      <button class="btn-primary spacer-top" data-action="to-chat">美希AIともう少し話してみる</button>
    `;
  }

  return `
    <div class="screen">
      ${BRAND}
      <h2 class="heading">あなたの言葉から、<br />見えてきたこと</h2>
      ${body}
    </div>
  `;
}

export function renderChat(state) {
  const bubbles = state.chatHistory
    .map((m) => `<div class="bubble ${m.role === 'user' ? 'user' : 'ai'}">${escapeHtml(m.text)}</div>`)
    .join('');
  const typing = state.chatLoading
    ? `<div class="bubble ai typing"><span></span><span></span><span></span></div>`
    : '';

  const inputArea = state.chatFinal
    ? `
      <div class="chat-cta-inline">
        <button class="btn-primary" data-action="to-cta">LINEで美希に相談する</button>
      </div>
    `
    : `
      <div class="chat-turns-note">対話は残り${3 - state.chatTurns}回です</div>
      <div class="chat-input-row">
        <textarea id="chat-input" rows="1" placeholder="思ったことを書いてみてください" ${state.chatLoading ? 'disabled' : ''}></textarea>
        <button class="send-btn" data-action="send-chat" ${state.chatLoading ? 'disabled' : ''}>➤</button>
      </div>
      ${state.chatError ? `<div class="error-text">${escapeHtml(state.chatError)}</div>` : ''}
    `;

  return `
    <div class="screen chat-screen">
      ${BRAND}
      <div class="chat-log" id="chat-log">${bubbles}${typing}</div>
      ${inputArea}
    </div>
  `;
}

export function renderCta(state) {
  const href = state.lineUrl || '#';
  return `
    <div class="screen cta-screen">
      <div class="cta-icon">💬</div>
      <h2 class="heading">ここまで、<br />ありがとうございました</h2>
      <p class="cta-message">
        言葉にしてみることで、少しでも気持ちが整理できていたら嬉しいです。<br /><br />
        続きは、HATI公式LINEで美希本人に相談してみませんか。<br />
        気軽な気持ちで大丈夫です。
      </p>
      <a class="btn-line" id="line-cta-btn" href="${escapeHtml(href)}" target="_blank" rel="noopener" data-action="line-click">
        LINEで美希に相談する
      </a>
    </div>
  `;
}
