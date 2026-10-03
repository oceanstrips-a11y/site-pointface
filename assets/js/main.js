/* POINT · FACE — interactions & scroll animations (vanilla, no dependencies). */
(() => {
  const doc = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  let data = { locations: [] };
  try { data = JSON.parse($('#pf-data').textContent); } catch (e) { /* keep defaults */ }

  /* ---------- Fit the hero line (.FACE —— EXPERT FACIALS) to the screen width ---------- */
  const fitHeroMark = () => $$('[data-hero-mark]').forEach((heroMark) => {
    const words = $$('.hero__mark-word', heroMark);
    heroMark.style.setProperty('--mark-size', '100px');
    const textW = words.reduce((w, el) => w + el.offsetWidth, 0); // layout width, ignores the grow scale
    const avail = heroMark.clientWidth * (window.innerWidth < 760 ? 0.84 : 0.8); // leave ~20% for the rule
    heroMark.style.setProperty('--mark-size', `${Math.floor((avail / textW) * 1000) / 10}px`);
  });
  fitHeroMark();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHeroMark);
  window.addEventListener('resize', fitHeroMark);

  /* ---------- Load-in ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    doc.classList.add('is-loaded');
    // Above-the-fold hero content animates on load, not on scroll.
    $$('.hero [data-reveal], .hero [data-split]').forEach((el) => el.classList.add('is-in'));
  }));

  /* ---------- Split headings into words ---------- */
  $$('[data-split]').forEach((el) => {
    let i = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'split-word';
            const inner = document.createElement('span');
            inner.style.setProperty('--wi', i++);
            inner.textContent = part;
            w.appendChild(inner);
            frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
    $$('.split-word', el).forEach((w) => w.setAttribute('aria-hidden', 'true'));
  });

  /* ---------- Scroll-scrubbed word opacity ---------- */
  const scrubEls = $$('[data-scrub-words]').map((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map((w) => `<span class="w" aria-hidden="true">${w.replace(/</g, '&lt;')}</span>`).join(' ');
    return { el, words: $$('.w', el) };
  });

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = $$('[data-reveal], [data-split], .footer__mark');
  if ('IntersectionObserver' in window && !reduce) {
    // Clipped elements report no intersection (and lazy images inside never load),
    // so we watch their parent box instead.
    const proxy = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        (proxy.get(e.target) || [e.target]).forEach((t) => t.classList.add('is-in'));
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealTargets.forEach((el) => {
      if (!el.classList.contains('clip-reveal')) return io.observe(el);
      const box = el.parentElement;
      proxy.set(box, [...(proxy.get(box) || []), el]);
      io.observe(box);
    });
  } else {
    revealTargets.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Header: solid on scroll, hide on scroll down ---------- */
  const header = $('[data-header]');
  const fab = $('.book-fab');
  let lastY = window.scrollY;

  /* ---------- Count-up ---------- */
  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window && !reduce) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const dec = parseInt(el.dataset.decimals || '0', 10);
        const start = performance.now();
        const dur = 1400;
        const tick = (now) => {
          const p = clamp((now - start) / dur, 0, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(dec);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- Parallax, hero expand, horizontal scroll, scrub words, progress ---------- */
  const parallax = $$('[data-parallax]');
  const expand = $('[data-expand]');
  const heroEl = $('[data-hero]');
  const dock = $('[data-dock-mark]');
  let dockBase = null;
  // Measure the docked (small) line, then the transform that blows it up across the hero.
  function measureDock() {
    if (!dock || !heroEl) return;
    dock.style.transform = 'none';
    const r = dock.getBoundingClientRect();
    const inner = dock.closest('.site-header__inner');
    const gutter = parseFloat(getComputedStyle(inner).paddingLeft) || 16;
    const targetW = window.innerWidth - gutter * 2;
    const headerH = header.offsetHeight;
    dockBase = { s: targetW / r.width, dx: gutter - r.left, dy: headerH + Math.min(24, window.innerWidth * 0.012) - r.top };
  }
  const hscroll = $('[data-hscroll]');
  const hTrack = hscroll && $('[data-hscroll-track]', hscroll);
  const progress = $('[data-read-progress]');
  const article = $('.article__main');
  const desktop = window.matchMedia('(min-width: 900px)');

  function setupHScroll() {
    if (!hscroll) return;
    const pin = desktop.matches && !reduce;
    hscroll.classList.toggle('is-pinned', pin);
    if (pin) {
      const distance = hTrack.scrollWidth - window.innerWidth;
      hscroll.style.height = `${window.innerHeight + Math.max(0, distance)}px`;
      hscroll.dataset.distance = Math.max(0, distance);
    } else {
      hscroll.style.height = '';
      hTrack.style.transform = '';
    }
  }

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const vh = window.innerHeight;

    if (header) {
      // Home: the big .FACE —— EXPERT FACIALS line shrinks into the centre of the header while
      // the header is transparent; once docked the header turns beige with black text. It never hides.
      const dist = heroEl ? vh * 0.5 : 0;
      header.classList.toggle('is-scrolled', heroEl ? y >= dist - 1 : y > 0);
      if (heroEl && dock && dockBase) {
        const p = reduce ? 1 : clamp(y / dist, 0, 1);
        const k = 1 - (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2); // 1 → 0, ease-in-out
        const scale = 1 + (dockBase.s - 1) * k;
        dock.style.transform = `translate(${(dockBase.dx * k).toFixed(1)}px, ${(dockBase.dy * k).toFixed(1)}px) scale(${scale.toFixed(4)})`;
      }
    }
    if (fab) fab.classList.toggle('is-on', y > vh * 0.6);
    lastY = y;

    if (reduce) { ticking = false; return; }

    parallax.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const offset = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });

    if (expand) {
      const r = expand.getBoundingClientRect();
      // Inset shrinks the image slightly as it scrolls away for an editorial "page turn" feel.
      const p = clamp(-r.top / (r.height * 0.9), 0, 1);
      expand.style.setProperty('--expand', (p * Math.min(80, window.innerWidth * 0.06)).toFixed(1));
    }

    if (hscroll && hscroll.classList.contains('is-pinned')) {
      const r = hscroll.getBoundingClientRect();
      const distance = parseFloat(hscroll.dataset.distance) || 0;
      const p = clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
      hTrack.style.transform = `translate3d(${(-distance * p).toFixed(1)}px, 0, 0)`;
    }

    scrubEls.forEach(({ el, words }) => {
      const r = el.getBoundingClientRect();
      const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
      const lit = p * words.length;
      words.forEach((w, i) => w.style.setProperty('--o', clamp(lit - i, 0.16, 1).toFixed(2)));
    });

    if (progress && article) {
      const r = article.getBoundingClientRect();
      progress.style.setProperty('--p', clamp(-r.top / Math.max(1, r.height - vh), 0, 1).toFixed(3));
    }
    ticking = false;
  }
  const requestTick = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', () => { setupHScroll(); measureDock(); requestTick(); });
  window.addEventListener('load', () => { setupHScroll(); measureDock(); requestTick(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measureDock(); requestTick(); });
  setupHScroll();
  measureDock();
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-mobile-menu]');
  if (toggle && menu) {
    const setMenu = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      document.body.classList.toggle('menu-open', open);
      header.classList.toggle('is-scrolled', open || window.scrollY > 24);
    };
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- Booking dialog ---------- */
  const dialog = $('[data-book-dialog]');
  const treatmentEl = dialog && $('[data-book-treatment]', dialog);
  const waText = (loc, t) => `Hi POINT · FACE ${loc.name}! I'd like to book ${t ? 'the ' + t : 'a treatment'}. Could you tell me your availability?`;

  if (dialog && typeof dialog.showModal === 'function') {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-book]');
      if (!trigger) return;
      e.preventDefault();
      const t = trigger.dataset.treatment || '';
      treatmentEl.hidden = !t;
      treatmentEl.textContent = t ? `Treatment: ${t}` : '';
      $$('[data-wa]', dialog).forEach((a) => {
        const loc = data.locations.find((l) => l.id === a.dataset.wa);
        if (loc) a.href = `https://wa.me/${loc.whatsapp}?text=${encodeURIComponent(waText(loc, t))}`;
      });
      dialog.showModal();
      document.body.classList.add('menu-open');
    });
    const close = () => dialog.close();
    $('[data-book-close]', dialog).addEventListener('click', close);
    dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
    dialog.addEventListener('close', () => {
      if (toggle && toggle.getAttribute('aria-expanded') === 'true') return;
      document.body.classList.remove('menu-open');
    });
  }

  /* ---------- Cursor label & hover image (desktop only) ---------- */
  if (finePointer && !reduce) {
    const cursor = $('[data-cursor-el]');
    const label = $('[data-cursor-label]');
    const float = $('[data-hover-float]');
    const floatInner = float && $('.hover-float__inner', float);
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, fx = mx, fy = my;

    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });

    const loop = () => {
      cx += (mx - cx) * 0.22; cy += (my - cy) * 0.22;
      fx += (mx - fx) * 0.1; fy += (my - fy) * 0.1;
      cursor.style.left = `${cx}px`; cursor.style.top = `${cy}px`;
      if (float) {
        const tilt = clamp((mx - fx) * 0.08, -8, 8);
        float.style.transform = `translate3d(${fx - 120}px, ${fy - 160}px, 0) rotate(${tilt}deg) scale(${float.classList.contains('is-on') ? 1 : 0.6})`;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    document.addEventListener('mouseover', (e) => {
      const c = e.target.closest('[data-cursor]');
      const h = e.target.closest('[data-hover-img]');
      if (h && float) {
        floatInner.style.backgroundImage = `url("${h.dataset.hoverImg}")`;
        float.classList.add('is-on');
        cursor.classList.remove('is-on');
        return;
      }
      if (float && !h) float.classList.remove('is-on');
      if (c) { label.textContent = c.dataset.cursor; cursor.classList.add('is-on'); }
      else cursor.classList.remove('is-on');
    });
    document.addEventListener('mouseleave', () => { cursor.classList.remove('is-on'); float && float.classList.remove('is-on'); });

    /* Magnetic buttons */
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.32;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
      el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1), color .5s, border-color .5s';
    });
  }

  /* ---------- Live Google reviews (Netlify function /api/reviews) ---------- */
  const reviewSections = $$('[data-reviews]');
  if (reviewSections.length && 'fetch' in window) {
    const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const stars = (n) => { const f = Math.round(n); return `<span class="stars" aria-label="${n} out of 5 stars">${'★'.repeat(f)}<span class="stars__off">${'★'.repeat(5 - f)}</span></span>`; };
    const locName = (id) => (data.locations.find((l) => l.id === id) || {}).name || '';
    fetch('/api/reviews', { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((g) => {
        if (!g || !g.reviews) return;
        reviewSections.forEach((sec) => {
          const only = sec.dataset.reviews;
          const ratings = $('[data-ratings]', sec);
          const chips = Object.entries(g.summary || {})
            .filter(([id, s]) => (!only || id === only) && s.google && s.google.rating)
            .map(([id, s]) => `<a class="rating-chip" href="${esc(s.google.url || '#')}" target="_blank" rel="noopener"><span class="rating-chip__score">${s.google.rating.toFixed(1)}</span><span class="rating-chip__meta">${stars(s.google.rating)}<span>Google · ${esc(locName(id))}${s.google.count ? ` · ${s.google.count} reviews` : ''}</span></span></a>`);
          if (chips.length && ratings) {
            $$('.rating-chip--links', ratings).forEach((c) => c.remove());
            ratings.insertAdjacentHTML('afterbegin', chips.join(''));
          }
          const cards = g.reviews
            .filter((r) => !only || r.location === only)
            .slice(0, 8)
            .map((r) => `<figure class="review is-in"><div class="review__top">${stars(r.rating)}<span class="review__source">Google</span></div><blockquote><p>${esc(r.text.length > 420 ? r.text.slice(0, 417).trim() + '…' : r.text)}</p></blockquote><figcaption><span class="review__author">${esc(r.author)}</span><span>${esc(r.dateLabel || '')}${r.locationName ? ' · ' + esc(r.locationName) : ''}</span></figcaption></figure>`);
          if (cards.length) {
            $('[data-rail-track]', sec).insertAdjacentHTML('afterbegin', cards.join(''));
            $('[data-rail]', sec).hidden = false;
            $('.reviews__controls', sec).hidden = false;
          }
        });
      })
      .catch(() => { /* static Fresha reviews stay in place */ });
  }

  /* ---------- Reviews rail ---------- */
  $$('[data-rail]').forEach((rail) => {
    const section = rail.closest('section');
    const step = () => (rail.querySelector('.review')?.offsetWidth || 360) + 20;
    $('[data-rail-prev]', section)?.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
    $('[data-rail-next]', section)?.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
  });

  /* ---------- Scroll-spy for category nav ---------- */
  const spy = $('[data-scrollspy]');
  if (spy && 'IntersectionObserver' in window) {
    const links = $$('a', spy);
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.remove('is-active'));
        const a = map.get(e.target.id);
        if (a) {
          a.classList.add('is-active');
          // Scroll only the category bar sideways — never the page itself.
          const bar = a.parentElement;
          bar.scrollTo({ left: a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) sio.observe(s); });
  }

  /* ---------- FAQ: one open at a time per list ---------- */
  $$('.faq').forEach((faq) => {
    faq.addEventListener('toggle', (e) => {
      if (!e.target.open) return;
      $$('details[open]', faq).forEach((d) => { if (d !== e.target) d.open = false; });
    }, true);
  });
})();
