'use strict';

/* ═══════════════════════════════════════
   1. CUSTOM CURSOR
   ═══════════════════════════════════════ */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || window.matchMedia('(pointer:coarse)').matches) return;

  let mx = -100, my = -100;
  let fx = -100, fy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Follower lags behind
  function tick() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  // Hover enlargement
  const hoverEls = document.querySelectorAll('a, button, .piece__img-wrap, input, select, textarea');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();


/* ═══════════════════════════════════════
   2. NAV — SCROLL + BURGER
   ═══════════════════════════════════════ */
(function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const mobile = document.getElementById('mobileMenu');
  const links  = document.querySelectorAll('.mob');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  burger.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    burger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  function close() {
    mobile.classList.remove('open');
    burger.classList.remove('active');
    document.body.style.overflow = '';
  }

  links.forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();


/* ═══════════════════════════════════════
   3. SCROLL REVEAL
   ═══════════════════════════════════════ */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  items.forEach(el => obs.observe(el));
})();


/* ═══════════════════════════════════════
   4. HERO PARALLAX
   ═══════════════════════════════════════ */
(function initParallax() {
  const img = document.querySelector('.hero__img');
  if (!img || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        img.style.transform = `scale(1) translateY(${y * 0.22}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();


/* ═══════════════════════════════════════
   5. CONTACT FORM
   ═══════════════════════════════════════ */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    const orig = btn.textContent;
    btn.textContent = 'Enviando…';
    btn.disabled = true;

    setTimeout(() => {
      success.classList.add('show');
      form.reset();
      btn.textContent = orig;
      btn.disabled = false;
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1600);
  });
})();


/* ═══════════════════════════════════════
   6. SMOOTH ACTIVE NAV LINK
   ═══════════════════════════════════════ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
      });
    });
  }, { threshold: 0.45 });

  sections.forEach(s => obs.observe(s));
})();


/* ═══════════════════════════════════════
   7. IMAGE LAZY LOAD FADE
   ═══════════════════════════════════════ */
(function initImageFade() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  imgs.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.7s ease';
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => { img.style.opacity = '1'; });
    }
  });
})();


console.log(
  '%cArianna Camacho · Carivé',
  'color: #C8938A; font-family: Georgia, serif; font-style: italic; font-size: 15px;'
);
