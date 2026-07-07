'use strict';

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== STAGGER CHILDREN ===== */
const staggerContainers = [
  '.features-grid',
  '.target-grid',
  '.curriculum-list',
  '.voices-text-grid',
  '.contact-cards',
];
staggerContainers.forEach(selector => {
  const container = document.querySelector(selector);
  if (!container) return;
  container.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });
});


/* ===== HERO PANELS FADE LOOP（左右同時） ===== */
(function () {
  const imgL2   = document.querySelector('.panel-left .img-l2');
  const imgR2   = document.querySelector('.panel-right .img-r2');
  const HOLD_MS = 2500; // 各画像の表示時間
  const FADE_MS = 1200; // フェード時間（CSS transition と合わせる）

  function showSecond() {
    imgL2.classList.add('visible');
    imgR2.classList.add('visible');
    setTimeout(showFirst, FADE_MS + HOLD_MS);
  }

  function showFirst() {
    imgL2.classList.remove('visible');
    imgR2.classList.remove('visible');
    setTimeout(showSecond, FADE_MS + HOLD_MS);
  }

  setTimeout(showSecond, HOLD_MS);
})();

/* ===== MOBILE NAV ===== */
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';
  });
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ===== NAVBAR SCROLL STATE ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

