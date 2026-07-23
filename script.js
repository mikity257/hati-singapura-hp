// ===== LANGUAGE DATA =====
const translations = {
  ja: {
    // NAV
    nav_home:     "トップ",
    nav_services: "サービス",
    nav_faq:      "よくある質問",
    nav_contact:  "お問い合わせ",
    nav_menu_contact: "予約・お問い合わせ",
    lang_label:   "EN",

    // HERO
    hero_desc: "マレー式伝統ケアで心と身体を整える。<br>シンガポール在住の日本人ママへ、ご自宅に出張いたします。",
    hero_btn1: "サービスを見る",
    hero_btn2: "お問い合わせ",

    // ABOUT / CONCEPT
    about_sub:   "HATI SINGAPURAについて",
    about_title: "「心」に寄り添う<br>マレー式の知恵",
    about_p1: "「Hati（ハティ）」はマレー語で「心」を意味します。HATI SINGAPURAは、シンガポールに暮らす日本人のお母さんが、出産後の大切な回復期を安心して過ごせるよう生まれたサービスです。",
    about_p2: '"マレー伝統 × 現代ケア × 日本人女性"をコンセプトに、マレーシアやシンガポールに古くから伝わる産後ケアの知恵—ウルッ・ムラユ（伝統マッサージ）、ベンクン（腹部バインディング）の伝統技術を、現代の日本人女性に寄り添うかたちでお届けします。',
    about_p3: "HATI SINGAPURAでは、一時的なリラクゼーションだけでなく、ご自身でも変化を実感していただける結果にこだわったケアをご提供しています。また、産後ならではの揺らぎやすい心にもそっと寄り添いながら、心身の回復をサポートいたします。",
    about_p4: "お腹だけでなく、全身が少しずつ整い、本来の軽やかさを取り戻していく。その変化の過程も楽しみながら、一人ひとりに寄り添い伴走いたします。",
    stat1_label: "施術人数",
    stat2_label: "日本人セラピスト",
    stat3_num:   "6<small>ヶ月</small>",
    stat3_label: "先まで予約殺到",

    // SERVICES
    services_sub:  "MENU",
    services_title: "サービス内容",
    services_desc: "マレー伝統の技法と現代の知識を組み合わせた<br>女性のためのトータルケアメニュー",

    svc1_name_en: "HATI MALAY POSTNATAL CARE",
    svc1_name:    "HATIマレー式産褥ケア",
    svc1_tagline: "産後ママのための全身＆骨盤ケア",
    svc1_package: "《パッケージプラン》<br>５日間・７日間・１０日間",
    svc1_time:    "対象: 産後1年未満の方",

    svc2_name_en: "HATI MALAY OIL CARE",
    svc2_name:    "HATIマレー式オイルケア",
    svc2_tagline: "身体の不調改善＆リラクゼーション",
    svc2_desc:    "滞ったリンパをしっかり流す。疲れたときに受けるとやみつきに。",
    svc2_time:    "全身マッサージ 60分（ヘッドマッサージ込み）",

    svc3_name_en: "HATI SLIMMING CARE",
    svc3_name:    "HATIスリミングケア",
    svc3_tagline: "デトックス＆引き締め",
    svc3_desc:    "足やおなかなど気になる箇所のセルライトケア。産後こそキレイになりたい方に。",
    svc3_time:    "全身マッサージ 90分（ヘッドマッサージ込み）",

    services_note: "※ 全てのサービスはご自宅への出張対応です。<br class=\"sp-only\">シンガポール島内全域に伺います。<br class=\"sp-only\">料金はお問い合わせください。",

    // FLOW
    flow_eyebrow:   "FLOW",
    flow_title:     "HATIマレー式産褥ケア<br class=\"sp-md-only\"> 施術の流れ",
    flow_lead:      "初めての方も安心してお受けいただけるよう、<br>丁寧にご説明しながら進めます。",
    flow_times:     "初日：約2時間　／　2日目以降：約1時間半",
    flow_c1_title:  "カウンセリング",
    flow_c1_desc:   "現在のお身体の状態やお悩みを丁寧に確認し、その日の体調や回復状況に合わせて、最適な施術内容をご提案します。",
    flow_c2_title:  "全身オイルマッサージ",
    flow_c2_desc:   "４種類のオイルからご自身に合わせたオイルで全身トリートメント。疲労回復・血行促進をサポートします。",
    flow_c3_title:  "腹部バインディング",
    flow_c3_desc:   "インナーバインディング＋さらしの2段階で、骨盤から肋骨まで引き締め体を安定させます。",
    flow_c4_title:  "そのまま安静・リラックス",
    flow_c4_desc:   "バインディングを装着したまま最低6時間（可能なら翌日まで）安静にお過ごしいただき、体をしっかり安定させます。",
    flow_d2_label:  "■ 2日目以降（約1時間半）",
    flow_d2_note:   "到着前までにさらしを外し、シャワーと授乳（または搾乳）をお済ませください。→ 全身オイルマッサージ＋腹部バインディング",
    flow_last_label:"■ 最終日",
    flow_last_note: "全身オイルマッサージのみ → ビフォーアフター確認",

    // CONTACT CTA (before voices)
    cta_btn_desc: "空き状況の確認や料金に関するご質問など、<br>お気軽にお問い合わせください。",
    cta_btn_text: "ご予約・お問い合わせは<br class=\"sp-only\">こちら",

    // VOICES
    test_sub:   "VOICE",
    test_title: "ご利用いただいた<br class=\"sp-only\">お母さんから",

    // FAQ
    faq_title: "よくあるご質問",

    faq_q1: "いつから産褥ケアを受けられますか？",
    faq_a1: "日程調整はご出産報告をいただいてから行っています。産後の状況は変動しやすいため、ご家庭の状況を伺いながら一緒に組ませていただきます。早い方で産後1週間前後、多くの方は産後2〜3週間からのスタートが多いです。帝王切開の場合は、産後3〜4週目頃からとなります。",

    faq_q2: "赤ちゃんと一緒でも大丈夫ですか？",
    faq_a2: "もちろんです！途中での授乳やおむつ替えもOKです。赤ちゃんがぐずった際は、寝かしつけのお手伝いもできますよ。",

    faq_q3: "所要時間はどのくらいですか？",
    faq_a3: "初日は約120分、2日目以降は約90分です。",

    faq_q4: "産後どのくらいまで受けられますか？",
    faq_a4: "おすすめは産後半年頃までですが、腰痛や骨盤まわりの不安定さが気になる場合は半年を過ぎていてもお受けいただけます。産後半年以降は、肩こりや産後太りなど別のお悩みに合わせたメニューを選ばれる方も多いです。気になることはお気軽にご相談ください。",

    faq_q5: "おっぱいマッサージはありますか？",
    faq_a5: "必要に応じてケアしています。赤ちゃんが飲みやすくなるよう乳首・乳輪を整えたり、張りを和らげたりと状態に合わせて対応します。乳腺炎の疑いがある場合は母乳外来の受診をおすすめすることがあります。",

    faq_q6: "出産予定日がずれた場合はどうなりますか？",
    faq_a6: "ご出産報告をいただいた時点で最短の日程でご案内します。キャンセルにはなりませんのでご安心ください。",
    faq_q7: "日本国内でも施術を受けられますか？",
    faq_a7: "日本国内での施術をご希望の方には、HATI認定セラピストをご紹介しております。お気軽にお問い合わせください。",
    faq_q8: "マレー式とはどんなケアですか？",
    faq_a8: "マレーシア・シンガポールに古くから伝わる伝統的な産後マッサージです。全身をほぐし、産後の疲労回復・血行促進をサポートします。",
    faq_q9: "ベンクンとはなんですか？",
    faq_a9: "産後の腹部を伝統的な布で包むバインディング技術です。骨盤の緩み、お腹のたるみ、内臓の位置を整えることを目的としています。",
    faq_q10: "シンガポールのどのエリアに出張してもらえますか？",
    faq_a10: "シンガポール全域に出張対応しています。",

    // THERAPIST
    therapist_sub:     "セラピスト紹介",
    therapist_name:    "牧浦 美希",
    therapist_name_en: "Miki Makiura",
    therapist_bio1: "はじめまして、牧浦美希です。日本人として、シンガポールでHATIマレー式産後ケアセラピスト・スクール講師として活動しています。",
    therapist_bio2: "「産後ケアを自分のために」と思えるお母さんを一人でも増やしたい。そんな思いで活動を続けてきた結果、おかげさまで日本人人気No.1のセラピストとして多くのお母さんにご利用いただいています。",
    therapist_bio3: "私自身も３児の母として、産後の身体のつらさも、言葉にならない不安も体験してきました。技術はもちろん、心に寄り添ったケアで回復のお手伝いをさせていただきます。",
    therapist_cert0: "シンガポール公認国際資格保持",
    therapist_cert1: "HATIマレー式産後ボディケアセラピスト",
    therapist_cert2: "HATIスクール講師",
    therapist_cert3: "シンガポール人気No.1 日本人セラピスト",
    therapist_cert4: "３児の母",
    therapist_tag1: "国際資格保持",
    therapist_tag2: "HATI代表",
    therapist_tag3: "スクール講師",

    // CONTACT
    contact_title: "まずはお気軽に<br>ご連絡ください",
    contact_desc:  "初めてのご利用でも大丈夫です。ご質問やご不安なことがあれば、何でもお気軽にお問い合わせください。日本語でお答えします。",

    // FOOTER
    footer_desc:          "マレー伝統の産後ケアで、回復の時間を大切に。",
    footer_nav_title:     "ナビゲーション",
    footer_service_title: "サービス",
    footer_copy:          "© 2026 HATI SINGAPURA. All rights reserved.",
  },

  en: {
    // NAV
    nav_home:     "Home",
    nav_services: "Services",
    nav_faq:      "FAQ",
    nav_contact:  "Contact",
    nav_menu_contact: "Contact",
    lang_label:   "JP",

    // HERO
    hero_desc: "Healing mothers through Malay traditional care.<br>Home visits across Singapore, in Japanese.",
    hero_btn1: "Our Services",
    hero_btn2: "Get in Touch",

    // ABOUT / CONCEPT
    about_sub:   "ABOUT HATI SINGAPURA",
    about_title: "Ancient wisdom,<br>for modern mothers",
    about_p1: "\"Hati\" means heart and soul in Malay. HATI SINGAPURA was born so that Japanese mothers in Singapore can spend their precious postnatal recovery with confidence and peace of mind.",
    about_p2: "Urut Melayu (traditional massage), Bengkung (abdominal binding), and Jamu (herbal drinks) — time-honoured Malay postnatal wisdom, delivered to your home in Japanese.",
    about_p3: "At HATI SINGAPURA, we focus on care that delivers results you can truly feel — not just temporary relaxation. We gently support your mind and body through the emotional ups and downs unique to the postnatal period.",
    about_p4: "Little by little, your whole body — not just your abdomen — begins to realign and regain its natural lightness. We walk alongside you throughout that process, savouring each change together.",
    stat1_label: "Treatments Performed",
    stat2_label: "Japanese Therapists",
    stat3_num:   "&nbsp;",
    stat3_label: "Booked 6 Months Ahead",

    // SERVICES
    services_sub:   "OUR SERVICES",
    services_title: "Services",
    services_desc:  "A complete care menu combining traditional Malay techniques with modern knowledge, designed for women.",

    svc1_name_en: "HATI MALAY POSTNATAL CARE",
    svc1_name:    "HATI Malay Postnatal Care",
    svc1_tagline: "Full-body & pelvic care for new mothers",
    svc1_package: "Package Plans: 5 / 7 / 10 days",
    svc1_time:    "For: women within 1 year postpartum",

    svc2_name_en: "HATI MALAY OIL CARE",
    svc2_name:    "HATI Malay Oil Care",
    svc2_tagline: "Body recovery & deep relaxation",
    svc2_desc:    "Flush out stagnant lymph and melt away fatigue. Once you try it, you'll be hooked.",
    svc2_time:    "Full-body massage 60 min (head massage included)",

    svc3_name_en: "HATI SLIMMING CARE",
    svc3_name:    "HATI Slimming Care",
    svc3_tagline: "Detox & firming",
    svc3_desc:    "Cellulite care for legs, abdomen, and more. Perfect for mothers who want to feel beautiful postpartum.",
    svc3_time:    "Full-body massage 90 min (head massage included)",

    services_note: "※ All services are provided at your home. We cover all areas of Singapore Island. Please enquire for pricing.",

    // FLOW
    flow_eyebrow:   "FLOW",
    flow_title:     "HATI Malay Postnatal Care — Treatment Flow",
    flow_lead:      "So that first-time clients feel completely at ease,<br>we guide you through every step.",
    flow_times:     "Day 1: approx. 2 hrs　／　Day 2 onwards: approx. 1.5 hrs",
    flow_c1_title:  "Consultation & Measurements",
    flow_c1_desc:   "We discuss your postpartum condition and take body measurements to track changes throughout your treatment.",
    flow_c2_title:  "Full-Body Oil Massage",
    flow_c2_desc:   "Choose from 4 oils suited to your body. A full-body treatment to aid recovery and improve circulation.",
    flow_c3_title:  "Abdominal Binding",
    flow_c3_desc:   "A two-layer binding using an inner wrap and sarashi, firming from the pelvis to the ribs to stabilise your body.",
    flow_c4_title:  "Rest & Relax",
    flow_c4_desc:   "Stay in the binding for at least 6 hours (ideally until the next day) to let your body fully settle and stabilise.",
    flow_d2_label:  "■ Day 2 onwards (approx. 1.5 hrs)",
    flow_d2_note:   "Before your therapist arrives, please remove your sarashi, shower, and finish nursing or pumping. → Full-body oil massage + abdominal binding",
    flow_last_label:"■ Final day",
    flow_last_note: "Full-body oil massage only → Measurements & before/after check",

    // CONTACT CTA (before voices)
    cta_btn_desc: "For questions about availability or pricing, feel free to reach out anytime.",
    cta_btn_text: "Book / Contact Us",

    // VOICES
    test_sub:   "VOICES",
    test_title: "Words from our mothers",

    // FAQ
    faq_title: "Frequently Asked Questions",

    faq_q1: "When can I start postnatal care?",
    faq_a1: "From 24 hours after birth. For C-section deliveries, we assess the wound condition first and discuss the best approach. Every session is tailored to your body's recovery stage.",

    faq_q2: "Can I receive care after a C-section?",
    faq_a2: "Yes. Abdominal work begins once the wound has settled, but back, legs, and head massage can start early. Please feel free to ask about any concerns.",

    faq_q3: "Is it okay if my baby is with me?",
    faq_a3: "Absolutely. Your baby can stay right beside you throughout the session. We can pause anytime for feeding or baby care — no need to worry.",

    faq_q4: "How long does a session take?",
    faq_a4: "Postnatal care (massage + Bengkung binding) takes around 3–4 hours. Oil care is approximately 60 minutes, and Slimming Care about 90 minutes. First sessions may run a little longer due to the initial consultation.",

    faq_q5: "How long after birth can I receive postnatal care?",
    faq_a5: "Postnatal care is available for women within 1 year of giving birth. Oil Care and Slimming Care are available from 6 months postpartum (not available during pregnancy).",

    faq_q6: "How much does it cost?",
    faq_a6: "Pricing varies by service and package. Please enquire via LINE or Instagram — we're happy to share details.",

    faq_q7: "Do you offer services in Japan?",
    faq_a7: "For those wishing to receive care in Japan, we can introduce a HATI-certified therapist. Please feel free to contact us.",
    faq_q8: "What is Urut Melayu?",
    faq_a8: "Urut Melayu is a traditional postnatal massage that has been passed down in Malaysia and Singapore for generations. It relaxes the whole body and supports postnatal recovery and circulation.",
    faq_q9: "What is Bengkung?",
    faq_a9: "Bengkung is a traditional abdominal binding technique using cloth. It aims to firm the pelvis and stomach and help reposition internal organs after birth.",
    faq_q10: "Which areas of Singapore do you cover?",
    faq_a10: "We cover all areas of Singapore.",

    // THERAPIST
    therapist_sub:     "MEET YOUR THERAPIST",
    therapist_name:    "Miki Makiura",
    therapist_name_en: "Miki Makiura / 牧浦美希",
    therapist_bio1: "Hi, I'm Miki Makiura — a Japanese HATI-certified postnatal therapist and school instructor based in Singapore.",
    therapist_bio2: "Thanks to the support of so many wonderful mothers, I've grown to become Singapore's No.1 HATI therapist — and I also train the next generation of practitioners.",
    therapist_bio3: "As a Japanese woman, I truly understand the anxieties of giving birth far from home. Talk to me about anything — your body, your worries, your hopes. I'm here for you.",
    therapist_cert0: "Singapore Internationally Certified",
    therapist_cert1: "HATI Malay Postnatal Care Certified Therapist",
    therapist_cert2: "HATI School Certified Instructor",
    therapist_cert3: "Singapore's No.1 HATI Postnatal Therapist",
    therapist_cert4: "Instagram: @malay_massage_miki",
    therapist_tag1: "Int'l Certified",
    therapist_tag2: "HATI Certified",
    therapist_tag3: "School Instructor",

    // CONTACT
    contact_title: "We'd love to<br>hear from you",
    contact_desc:  "First-timers are very welcome. Whether you have questions or just want to chat, reach out anytime — we respond in Japanese and English.",

    // FOOTER
    footer_desc:          "HATI Malay postnatal care by Japanese therapist Miki Makiura. Singapore's No.1 — here for you, in Japanese.",
    footer_nav_title:     "Navigation",
    footer_service_title: "Services",
    footer_copy:          "© 2026 HATI SINGAPURA. All rights reserved.",
  }
};

// ===== STATE =====
let currentLang = 'ja';

// ===== APPLY TRANSLATIONS =====
function applyTranslations(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });
  const langLabel = document.getElementById('lang-label');
  if (langLabel) langLabel.textContent = t.lang_label;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
}

function setLang(lang) {
  currentLang = lang;
  applyTranslations(lang);
}

// ===== NAVBAR SCROLL =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ===== ACTIVE NAV LINK =====
function initNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn   = document.querySelector('.mobile-menu-close');

  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  closeBtn?.addEventListener('click', closeMobile);
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

  function closeMobile() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

// ===== FAQ ACCORDION =====
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ===== HERO ANIMATION =====
function initHeroAnimation() {
  const phase1  = document.getElementById('heroPhase1');
  const phase2  = document.getElementById('heroPhase2');
  const vlines  = document.querySelectorAll('.hero-vline');
  const cta     = document.getElementById('heroPhase2Cta');
  const scroll  = document.getElementById('heroScroll');

  if (!phase1 || !phase2) return;

  // ① Phase 1 フェードイン
  setTimeout(() => phase1.classList.add('visible'), 200);

  // ② Phase 1 フェードアウト
  setTimeout(() => phase1.classList.remove('visible'), 3000);

  // ③ Phase 2 コンテナを表示（Phase 1 が消えきった後）
  setTimeout(() => phase2.classList.add('visible'), 4100);

  // ④ 縦書きラインを右から順に表示
  // DOM順 ①②③④⑤ + flex-direction:row-reverse で ① が右端
  // → i=0(①)が最初、i=4(⑤)が最後
  const lineDelay = 700;
  vlines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), 4300 + i * lineDelay);
  });

  // ⑤ CTA ボタン表示（全ライン表示後）
  const ctaStart = 4300 + vlines.length * lineDelay + 400;
  setTimeout(() => cta.classList.add('visible'), ctaStart);

  // ⑥ スクロールインジケーター表示
  setTimeout(() => scroll.classList.add('visible'), ctaStart + 700);
}

// ===== CHATBOT HELPER (keep existing) =====
function hatiOpenWithQ(q) {
  const toggle = document.getElementById('hati-chat-toggle');
  if (toggle) toggle.click();
  setTimeout(() => {
    const input = document.querySelector('#hati-chat-input, .hati-chat-input');
    if (input) {
      input.value = q;
      input.dispatchEvent(new Event('input'));
    }
  }, 400);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations('ja');
  initNavbar();
  initNavLinks();
  initMobileMenu();
  initReveal();
  initFAQ();
  initHeroAnimation();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });
});
