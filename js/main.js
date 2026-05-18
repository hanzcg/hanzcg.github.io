/* ============================================================
   HANZ COCCHI GUERRERO — Portfolio CV
   main.js  |  Interactions & animations
   ============================================================ */

(function () {
  'use strict';

  /* ---------- NAV: scroll state --------------------------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- NAV: mobile burger -------------------------- */
  const burger    = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
    });
  });

  /* ---------- NAV: active link on scroll ------------------ */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks  = document.querySelectorAll('.nav__links a, .nav__mobile a');

  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---------- REVEAL on scroll (IntersectionObserver) ----- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings inside same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 60}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ---------- TIMELINE: accordion ------------------------- */
  const timelineHeaders = document.querySelectorAll('.timeline__header');

  timelineHeaders.forEach(header => {
    const toggle = (h) => {
      const card = h.closest('.timeline__card');
      const isOpen = card.classList.toggle('open');
      h.setAttribute('aria-expanded', isOpen);
    };

    header.addEventListener('click', () => toggle(header));
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(header); }
    });
  });

  // Open first timeline item by default
  const firstCard = document.querySelector('.timeline__card');
  if (firstCard) {
    firstCard.classList.add('open');
    firstCard.querySelector('.timeline__header').setAttribute('aria-expanded', 'true');
  }

  /* ---------- SKILLS: filter chips ------------------------ */
  const filterBtns = document.querySelectorAll('.skills__filter');
  const skillChips = document.querySelectorAll('.skill-chip');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.cat;
      skillChips.forEach(chip => {
        if (cat === 'all' || chip.dataset.cat === cat) {
          chip.classList.remove('hidden');
        } else {
          chip.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- LANGUAGE BARS: animate on visible ----------- */
  const idiomaBars = document.querySelectorAll('.idioma__fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  idiomaBars.forEach(bar => {
    bar.style.animationPlayState = 'paused';
    barObserver.observe(bar);
  });

  /* ---------- SMOOTH SCROLL for anchor links -------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 68; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- HERO: subtle parallax on scroll ------------- */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }

  /* ---------- CERT cards: subtle entrance stagger ---------- */
  const certObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const certs = entry.target.querySelectorAll('.cert.reveal');
        certs.forEach((c, i) => {
          setTimeout(() => c.classList.add('visible'), i * 80);
        });
        certObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const certsGrid = document.querySelector('.certs__grid');
  if (certsGrid) certObserver.observe(certsGrid);

})();
