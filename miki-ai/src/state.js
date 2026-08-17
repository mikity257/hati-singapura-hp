export function createInitialState() {
  return {
    screen: 'top',
    questionIndex: 0,
    answers: { q1: [], q2: [], q3: [] },
    freetext: '',
    sessionId: null,
    analysis: null,
    analysisLoading: false,
    analysisError: null,
    chatHistory: [],
    chatTurns: 0,
    chatLoading: false,
    chatError: null,
    chatFinal: false,
    lineUrl: null,
    lineClicked: false,
  };
}

export function createSessionId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `sess-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
