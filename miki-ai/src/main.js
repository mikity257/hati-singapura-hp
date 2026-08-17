import './style.css';
import { createInitialState, createSessionId } from './state.js';
import { QUESTIONS } from './questions.js';
import {
  renderTop,
  renderIntro,
  renderQuestions,
  renderFreetext,
  renderAnalysis,
  renderChat,
  renderCta,
} from './screens.js';
import { fetchAnalysis, sendChatMessage, notifyLineClick, fetchConfig } from './api.js';

const app = document.getElementById('app');
const state = createInitialState();

const MAX_CHAT_TURNS = 3;

function render() {
  switch (state.screen) {
    case 'top':
      app.innerHTML = renderTop();
      break;
    case 'intro':
      app.innerHTML = renderIntro();
      break;
    case 'questions':
      app.innerHTML = renderQuestions(state);
      break;
    case 'freetext':
      app.innerHTML = renderFreetext(state);
      break;
    case 'analysis':
      app.innerHTML = renderAnalysis(state);
      break;
    case 'chat':
      app.innerHTML = renderChat(state);
      focusChatInput();
      scrollChatToBottom();
      break;
    case 'cta':
      app.innerHTML = renderCta(state);
      break;
    default:
      app.innerHTML = renderTop();
  }
  window.scrollTo(0, 0);
}

function focusChatInput() {
  const el = document.getElementById('chat-input');
  if (el && !state.chatFinal) el.focus({ preventScroll: true });
}

function scrollChatToBottom() {
  const log = document.getElementById('chat-log');
  if (log) log.scrollTop = log.scrollHeight;
}

function goTo(screen) {
  state.screen = screen;
  render();
}

async function ensureLineUrl() {
  if (state.lineUrl) return;
  const cfg = await fetchConfig();
  if (cfg && cfg.lineOfficialAccountUrl) {
    state.lineUrl = cfg.lineOfficialAccountUrl;
    if (state.screen === 'cta') render();
  }
}
ensureLineUrl();

async function submitFreetext() {
  state.sessionId = state.sessionId || createSessionId();
  state.screen = 'analysis';
  state.analysisLoading = true;
  state.analysisError = null;
  render();
  try {
    const data = await fetchAnalysis({
      sessionId: state.sessionId,
      answers: state.answers,
      freetext: state.freetext,
    });
    state.analysis = data.summary;
    state.analysisLoading = false;
  } catch (err) {
    state.analysisLoading = false;
    state.analysisError = 'うまく読み込めませんでした。もう一度お試しください。';
  }
  render();
}

function enterChatFromAnalysis() {
  if (state.chatHistory.length === 0 && state.analysis) {
    state.chatHistory.push({ role: 'ai', text: state.analysis });
  }
  goTo('chat');
}

async function submitChatMessage(text) {
  const trimmed = text.trim();
  if (!trimmed || state.chatLoading || state.chatFinal) return;

  state.chatHistory.push({ role: 'user', text: trimmed });
  state.chatLoading = true;
  state.chatError = null;
  render();

  try {
    const data = await sendChatMessage({ sessionId: state.sessionId, message: trimmed });
    state.chatHistory.push({ role: 'ai', text: data.reply });
    state.chatTurns = data.turn;
    state.chatFinal = data.turn >= MAX_CHAT_TURNS || data.isFinal;
  } catch (err) {
    state.chatError = 'うまく送信できませんでした。もう一度お試しください。';
  }
  state.chatLoading = false;
  render();
}

async function handleLineClick() {
  state.lineClicked = true;
  await notifyLineClick({ sessionId: state.sessionId });
}

app.addEventListener('click', (e) => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  switch (action) {
    case 'start':
      goTo('intro');
      break;
    case 'to-questions':
      state.questionIndex = 0;
      goTo('questions');
      break;
    case 'next-question': {
      const q = QUESTIONS[state.questionIndex];
      if (state.answers[q.key].length === 0) return;
      if (state.questionIndex < QUESTIONS.length - 1) {
        state.questionIndex += 1;
        render();
      } else {
        goTo('freetext');
      }
      break;
    }
    case 'prev-question':
      if (state.questionIndex > 0) {
        state.questionIndex -= 1;
        render();
      }
      break;
    case 'prev-to-questions':
      state.questionIndex = QUESTIONS.length - 1;
      goTo('questions');
      break;
    case 'submit-freetext':
      submitFreetext();
      break;
    case 'retry-analysis':
      submitFreetext();
      break;
    case 'to-chat':
      enterChatFromAnalysis();
      break;
    case 'send-chat': {
      const el = document.getElementById('chat-input');
      if (!el) return;
      const text = el.value;
      el.value = '';
      submitChatMessage(text);
      break;
    }
    case 'to-cta':
      ensureLineUrl();
      goTo('cta');
      break;
    case 'line-click':
      handleLineClick();
      break;
  }
});

app.addEventListener('change', (e) => {
  const target = e.target.closest('[data-action="toggle-choice"]');
  if (!target) return;
  const { key, value } = target.dataset;
  const list = state.answers[key];
  const idx = list.indexOf(value);
  if (target.checked && idx === -1) list.push(value);
  if (!target.checked && idx !== -1) list.splice(idx, 1);

  const nextBtn = document.querySelector('[data-action="next-question"]');
  if (nextBtn) nextBtn.disabled = list.length === 0;
});

app.addEventListener('input', (e) => {
  if (e.target.id === 'freetext-input') {
    state.freetext = e.target.value;
    const counter = document.querySelector('.char-count');
    if (counter) counter.textContent = `${state.freetext.length}文字`;
    const submitBtn = document.querySelector('[data-action="submit-freetext"]');
    if (submitBtn) submitBtn.disabled = state.freetext.trim().length === 0;
  }
  if (e.target.id === 'chat-input') {
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  }
});

app.addEventListener('keydown', (e) => {
  if (e.target.id === 'chat-input' && e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const text = e.target.value;
    e.target.value = '';
    submitChatMessage(text);
  }
});

render();
