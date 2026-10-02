/* Dark portfolio: Lenis smooth scroll + GSAP ScrollTrigger.
   Without JS (or with reduced motion) the page is a normal, fully readable document. */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = Boolean(window.gsap && window.ScrollTrigger) && !reduce;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  let lenis = null;
  let setMenu = () => {};

  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ------------------------------------------------------------- Mobile menu */
  function initMenu() {
    const burger = $('[data-burger]'); const menu = $('[data-menu]');
    if (!burger || !menu) return;
    let open = false;
    const circle = (r) => `circle(${r}px at ${innerWidth - 40}px 34px)`;
    setMenu = (next) => {
      if (next === open) return;
      open = next;
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) {
        menu.hidden = false;
        if (lenis) lenis.stop(); else document.body.style.overflow = 'hidden';
        if (animate) {
          gsap.fromTo(menu, { clipPath: circle(0) }, { clipPath: circle(Math.hypot(innerWidth, innerHeight) + 40), duration: 0.85, ease: 'power4.inOut' });
          gsap.fromTo($$('.menu__nav a', menu), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06, delay: 0.25, ease: 'power4.out' });
          gsap.fromTo($('.menu__foot', menu), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.5 });
        } else menu.style.clipPath = 'none';
      } else {
        if (lenis) lenis.start(); else document.body.style.overflow = '';
        if (animate) gsap.to(menu, { clipPath: circle(0), duration: 0.6, ease: 'power3.inOut', onComplete: () => { menu.hidden = true; } });
        else menu.hidden = true;
      }
    };
    burger.addEventListener('click', () => setMenu(!open));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    addEventListener('resize', () => { if (innerWidth > 820) setMenu(false); });
  }

  /* ------------------------------------------------------------ Contact form */
  function initForm() {
    const form = $('[data-form]'); if (!form) return;
    const sent = $('[data-sent]'); const formErr = $('[data-form-err]');
    const button = $('button[type="submit"]', form); const label = $('[data-label]', form);
    const fields = $$('input[name], textarea', form).filter((el) => ['name', 'email', 'phone', 'message'].includes(el.name));
    const setErr = (el, msg) => {
      const wrap = el.closest('.field');
      wrap.classList.toggle('has-err', Boolean(msg));
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      $('.field__err', wrap).textContent = msg || '';
    };
    const message = (el) => {
      const v = el.validity;
      if (v.valueMissing) return 'This field is required.';
      if (v.typeMismatch) return 'Enter a valid email address.';
      if (v.tooShort) return `Use at least ${el.minLength} characters.`;
      return '';
    };
    fields.forEach((el) => el.addEventListener('input', () => setErr(el, '')));

    function showSent() {
      form.hidden = true; sent.hidden = false;
      const shapes = $$('.sent__check circle, .sent__check path', sent);
      shapes.forEach((sh) => { const l = sh.getTotalLength(); sh.style.strokeDasharray = l; sh.style.strokeDashoffset = animate ? l : 0; });
      if (animate) {
        gsap.timeline()
          .fromTo(sent, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .to(shapes[0], { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0.1)
          .to(shapes[1], { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, 0.6)
          .from($$('h3, p, button', sent), { y: 16, autoAlpha: 0, stagger: 0.08, duration: 0.5 }, 0.5);
      }
      sent.focus({ preventScroll: true });
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      fields.forEach((el) => setErr(el, '')); formErr.textContent = '';
      const bad = fields.filter((el) => !el.checkValidity());
      bad.forEach((el) => setErr(el, message(el)));
      if (bad.length) { bad[0].focus(); return; }
      button.disabled = true; label.textContent = 'Sending…';
      try {
        // Netlify Forms: urlencoded POST to the site root with the form-name field.
        const body = new URLSearchParams(new FormData(form)).toString();
        const res = await fetch(form.getAttribute('action') || '/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
        if (!res.ok) throw new Error(String(res.status));
        form.reset(); showSent();
      } catch (error) {
        formErr.textContent = 'Could not send the message. Please try again, or email me directly.';
      } finally { button.disabled = false; label.textContent = 'Send message'; }
    });
    $('[data-again]', sent).addEventListener('click', () => {
      sent.hidden = true; form.hidden = false;
      if (animate) gsap.fromTo(form, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 });
      $('input[name="name"]', form).focus();
    });
  }

  initMenu();
  initForm();

  if (!animate) {
    $('.loader')?.remove();
    root.style.scrollBehavior = 'smooth';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const finishLoader = () => { $('.loader')?.remove(); if (lenis) lenis.start(); };
  const failsafe = setTimeout(finishLoader, 7000);

  try {
    initScroll();
    initWork();          // first: the pin must exist before later triggers are measured
    initCursor();
    initHero();
    initReveals();
    initSections();
    initSkills();
    initSteps();
    initFooter();
    initAnchors();
    runIntro();
  } catch (error) {
    console.error('Animation setup failed; showing the static page.', error);
    clearTimeout(failsafe); finishLoader();
  }

  /* ----------------------------------------------------------- Smooth scroll */
  function initScroll() {
    if (!window.Lenis) return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  function initAnchors() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return;
      const target = $(a.getAttribute('href')); if (!target) return;
      e.preventDefault(); setMenu(false);
      if (lenis) { lenis.start(); lenis.scrollTo(target, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) }); }
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------ Loader, intro */
  function runIntro() {
    const loader = $('.loader');
    const heroIn = () => {
      gsap.from($$('.hero__ch'), { yPercent: 60, autoAlpha: 0, rotate: 4, duration: 1.1, stagger: 0.05, ease: 'power4.out' });
      gsap.from($$('[data-hero-in]'), { y: 28, autoAlpha: 0, duration: 0.9, stagger: 0.09, delay: 0.2, ease: 'power3.out' });
      gsap.from('.header', { yPercent: -100, duration: 0.9, delay: 0.3, ease: 'power3.out' });
      gsap.from('.dots li', { x: 20, autoAlpha: 0, stagger: 0.05, duration: 0.6, delay: 0.6 });
    };
    if (!loader) { heroIn(); finishLoader(); return; }
    const chars = $$('.loader__ch', loader).map((c) => { const inner = document.createElement('span'); inner.style.display = 'block'; inner.textContent = c.textContent; c.textContent = ''; c.appendChild(inner); return inner; });
    const num = $('.loader__num', loader); const bar = $('.loader__bar i', loader); const prog = { v: 0 };
    gsap.set(chars, { yPercent: 115 });
    const start = () => {
      gsap.timeline({ onComplete: () => { clearTimeout(failsafe); finishLoader(); } })
        .to(chars, { yPercent: 0, duration: 0.7, stagger: 0.045, ease: 'power4.out' })
        .to(prog, { v: 100, duration: 1, ease: 'power2.inOut', onUpdate: () => { num.textContent = Math.round(prog.v); } }, 0.1)
        .to(bar, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, 0.1)
        .to(chars, { yPercent: -115, duration: 0.45, stagger: 0.03, ease: 'power3.in' }, 1.2)
        .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 0.85, ease: 'power4.inOut' }, 1.4)
        .add(heroIn, 1.95);
    };
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(start);
  }

  /* -------------------------------------------------------------------- Hero */
  function initHero() {
    const hero = $('.hero'); const canvas = $('.hero__canvas'); if (!hero || !canvas) return;

    // Rotating role line
    const list = $('.role__list');
    if (list) {
      const items = $$('.role__item', list); const n = items.length;
      list.appendChild(items[0].cloneNode(true));
      const tl = gsap.timeline({ repeat: -1 });
      for (let i = 1; i <= n; i += 1) tl.to(list, { yPercent: -(100 / (n + 1)) * i, duration: 0.8, ease: 'power4.inOut' }, i === 1 ? '+=1.8' : '+=1.6');
    }

    // Recede while the next section slides over
    gsap.to('.hero__in', { scale: 0.92, yPercent: -6, autoAlpha: 0.1, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'top top', scrub: true } });
    gsap.to('.hero__side, .scroll', { autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'top 60%', scrub: true } });

    // Dot field that reacts to the pointer
    const ctx = canvas.getContext('2d'); const pointer = { x: -9999, y: -9999 };
    let w = 0; let h = 0; let dots = []; let visible = true;
    const resize = () => {
      const ratio = Math.min(devicePixelRatio || 1, 2); w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * ratio; canvas.height = h * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const gap = w < 700 ? 32 : 44; dots = [];
      for (let y = gap / 2; y < h + gap; y += gap) for (let x = gap / 2; x < w + gap; x += gap) dots.push({ x, y });
    };
    const draw = (t) => {
      requestAnimationFrame(draw); if (!visible) return;
      ctx.clearRect(0, 0, w, h); const reach = Math.min(240, w * 0.22);
      for (const d of dots) {
        const dx = pointer.x - d.x; const dy = pointer.y - d.y; const dist = Math.hypot(dx, dy);
        const inf = Math.max(0, 1 - dist / reach); const wave = Math.sin(t * 0.0007 + d.x * 0.012 + d.y * 0.01);
        const push = inf * inf * 22;
        ctx.globalAlpha = 0.14 + inf * 0.8;
        ctx.fillStyle = inf > 0.04 ? '#8b9bff' : '#ffffff';
        ctx.beginPath();
        ctx.arc(d.x - (dx / (dist || 1)) * push, d.y - (dy / (dist || 1)) * push + wave * 1.6, 1 + inf * 2.4 + (wave + 1) * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; });
    hero.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(hero);
    addEventListener('resize', resize); resize(); requestAnimationFrame(draw);

    // Variable-font wordmark: letters near the pointer thin out and lift
    if (finePointer) {
      const chars = $$('.hero__ch');
      hero.addEventListener('pointermove', (e) => {
        const reach = Math.min(innerWidth * 0.18, 300);
        chars.forEach((c) => {
          const b = c.getBoundingClientRect();
          const inf = Math.max(0, 1 - Math.hypot(e.clientX - (b.left + b.width / 2), e.clientY - (b.top + b.height / 2)) / reach);
          gsap.to(c, { fontWeight: 700 - inf * 450, y: -inf * 10, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
        });
      });
      hero.addEventListener('pointerleave', () => gsap.to(chars, { fontWeight: 700, y: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' }));
    }
  }

  /* ------------------------------------------------------------------ Cursor */
  function initCursor() {
    if (!finePointer) return;
    const cursor = $('.cursor'); const label = $('.cursor__label'); if (!cursor) return;
    root.classList.add('has-cursor'); gsap.set(cursor, { autoAlpha: 0 });
    const mx = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3' }); const my = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3' });
    let shown = false;
    addEventListener('pointermove', (e) => {
      if (!shown) { shown = true; gsap.set(cursor, { x: e.clientX, y: e.clientY }); gsap.to(cursor, { autoAlpha: 1, duration: 0.3 }); }
      mx(e.clientX); my(e.clientY);
    });
    document.addEventListener('pointerover', (e) => {
      const tagged = e.target.closest('[data-cursor]'); const hot = e.target.closest('a, button, [data-cursor-hover], input, textarea');
      cursor.classList.toggle('has-label', Boolean(tagged)); cursor.classList.toggle('is-hover', Boolean(hot) && !tagged);
      if (tagged) label.textContent = tagged.dataset.cursor;
    });
    root.addEventListener('pointerleave', () => gsap.to(cursor, { autoAlpha: 0, duration: 0.2 }));
    root.addEventListener('pointerenter', () => { if (shown) gsap.to(cursor, { autoAlpha: 1, duration: 0.2 }); });

    // Magnetic buttons
    $$('.magnetic').forEach((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }); const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); x((e.clientX - (r.left + r.width / 2)) * 0.3); y((e.clientY - (r.top + r.height / 2)) * 0.4); });
      el.addEventListener('pointerleave', () => { x(0); y(0); });
    });
  }

  /* ------------------------------------------------------------------ Reveals */
  function splitWords(el) {
    const text = el.textContent.trim(); el.setAttribute('aria-label', text); el.textContent = '';
    const words = text.split(/\s+/);
    words.forEach((word, i) => {
      const outer = document.createElement('span'); outer.className = 'w'; outer.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span'); inner.className = 'wi'; inner.textContent = word;
      outer.appendChild(inner); el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return $$('.wi', el);
  }

  function initReveals() {
    gsap.to('.progress i', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });
    $$('.h2[data-split]').forEach((h) => {
      gsap.from(splitWords(h), { yPercent: 115, rotate: 3, duration: 1.1, stagger: 0.07, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
    });
    $$('[data-fade]').forEach((el) => {
      gsap.from(el, { y: 28, autoAlpha: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });
    $$('.eyebrow').forEach((el) => gsap.from(el, { x: -16, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));

    // About portrait: mask reveal + slow parallax
    const frame = $('[data-reveal]');
    if (frame) {
      const media = frame.firstElementChild; const st = { trigger: frame, start: 'top 85%', once: true };
      gsap.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.out', scrollTrigger: st });
      gsap.fromTo(media, { scale: 1.4 }, { scale: 1.08, duration: 1.6, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(media, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } });
    }

    // Counters
    $$('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count) || 0; const o = { v: 0 }; el.textContent = '0';
      gsap.to(o, { v: target, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); }, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });

    // Services
    gsap.from('.service', { autoAlpha: 0, y: 26, duration: 0.8, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: '.service-list', start: 'top 82%', once: true } });
    gsap.from('.service__icon', { scale: 0, rotate: -40, duration: 0.8, stagger: 0.07, ease: 'back.out(2)', scrollTrigger: { trigger: '.service-list', start: 'top 82%', once: true } });

    // Marquee speeds up with scroll velocity, then eases back
    const anims = $$('.marquee__row').map((r) => r.getAnimations()[0]).filter(Boolean);
    if (anims.length) {
      const rate = { current: 1, target: 1 };
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => { rate.target = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 7); } });
      gsap.ticker.add(() => {
        rate.target += (1 - rate.target) * 0.04;
        rate.current += (rate.target - rate.current) * 0.1;
        anims.forEach((a) => { a.playbackRate = rate.current; });
      });
    }
  }

  /* ----------------------------------------------------------------- Sections */
  function initSections() {
    const header = $('.header');
    ScrollTrigger.create({ trigger: document.body, start: 'top -40', end: 'bottom bottom', onToggle: (s) => header.classList.toggle('is-scrolled', s.isActive) });
    const links = $$('.header__nav a'); const dots = $$('[data-dot]');
    const num = $('[data-where-num]'); const name = $('[data-where-name]');
    const sections = $$('[data-title]');
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section, start: 'top 55%', end: 'bottom 55%',
        onToggle: (s) => {
          if (!s.isActive) return;
          links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${section.id}`));
          dots.forEach((d) => d.classList.toggle('is-active', d.dataset.dot === section.id));
          num.textContent = String(i + 1).padStart(2, '0'); name.textContent = section.dataset.title;
        },
      });
    });
    // Sections fade as they leave, so the next one reads as a transition
    $$('.panel:not(.hero):not(.contact)').forEach((panel) => {
      gsap.to($$(':scope > .wrap, :scope > .marquee', panel), { opacity: 0.25, ease: 'none', scrollTrigger: { trigger: panel, start: 'bottom 55%', end: 'bottom top', scrub: true } });
    });
  }

  /* ------------------------------------------------------------------- Skills */
  function initSkills() {
    $$('.skill-col').forEach((col) => {
      const st = { trigger: col, start: 'top 85%', once: true };
      gsap.from($$('.skill', col), { x: -24, autoAlpha: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out', scrollTrigger: st });
      gsap.from($$('.skill__bar i', col), { scaleX: 0, duration: 1.2, stagger: 0.06, delay: 0.15, ease: 'power3.out', scrollTrigger: st });
    });
  }

  /* ----------------------------------------------------------------- Projects */
  function initWork() {
    const work = $('.work'); const track = $('[data-track]'); if (!work || !track) return;
    const viewport = $('.work__viewport'); const glow = $('[data-glow-el]'); const bar = $('.work__bar i'); const now = $('[data-work-now]');
    const cards = $$('.card', track);
    const setGlow = (c) => gsap.to(glow, { backgroundColor: c, duration: 0.9, ease: 'power2.out', overwrite: true });
    gsap.set(glow, { backgroundColor: cards[0]?.dataset.glow || '#3347ff' });

    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      work.classList.add('is-pinned');
      const dist = () => Math.max(1, track.scrollWidth - viewport.clientWidth);
      const move = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: work, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: (s) => { gsap.set(bar, { scaleX: s.progress }); } },
      });
      cards.forEach((card, i) => {
        ScrollTrigger.create({ trigger: card, containerAnimation: move, start: 'left 62%', end: 'right 38%', onToggle: (s) => { if (s.isActive) { setGlow(card.dataset.glow); now.textContent = i + 1; } } });
        gsap.fromTo($('.card__art-in', card), { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: move, start: 'left right', end: 'right left', scrub: true } });
        gsap.from($$('.card__body > *', card), { y: 24, autoAlpha: 0, stagger: 0.05, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: card, containerAnimation: move, start: 'left 85%', once: true } });
      });
      return () => work.classList.remove('is-pinned');
    });

    // Touch / small screens: native swipe, with the glow following the visible card
    mm.add('(max-width: 899px)', () => {
      const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { setGlow(en.target.dataset.glow); now.textContent = cards.indexOf(en.target) + 1; } }), { root: track, threshold: 0.6 });
      cards.forEach((c) => io.observe(c));
      gsap.from(cards, { x: 60, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: track, start: 'top 85%', once: true } });
      return () => io.disconnect();
    });
  }

  /* ------------------------------------------------------------------- Journey */
  function initSteps() {
    const steps = $('[data-steps]'); if (!steps) return;
    gsap.to($('.steps__line i', steps), { scaleY: 1, ease: 'none', scrollTrigger: { trigger: steps, start: 'top 60%', end: 'bottom 60%', scrub: 0.4 } });
    $$('[data-step]', steps).forEach((step) => {
      ScrollTrigger.create({ trigger: step, start: 'top 60%', onEnter: () => step.classList.add('is-on'), onLeaveBack: () => step.classList.remove('is-on') });
      gsap.from($$('.step__when, .step__body', step), { y: 34, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: step, start: 'top 86%', once: true } });
    });
  }

  /* -------------------------------------------------------------------- Footer */
  function initFooter() {
    const footer = $('[data-footer]'); const word = $('[data-footer-word]'); if (!footer || !word) return;
    gsap.fromTo(word, { yPercent: 50 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: footer, start: 'top bottom', end: 'bottom bottom', scrub: true } });
    gsap.from($$('.footer__top > *'), { y: 30, autoAlpha: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: footer, start: 'top 85%', once: true } });
  }

  addEventListener('load', () => ScrollTrigger.refresh());
})();
