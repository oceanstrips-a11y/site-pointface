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
  const floatMark = $('[data-float-mark]');
  let dockT = null;
  // The big line is sized with real font-size (like before); scrolling only scales it DOWN
  // into the header slot, so it can never overflow. When it arrives, the header copy takes over.
  // Switch to the menu button whenever the inline menu would touch the centred line.
  const navEl = $('.nav--primary');
  function fitNav() {
    if (!navEl || !dock || window.innerWidth <= 1100) { header && header.classList.remove('is-compact'); return; }
    header.classList.remove('is-compact');
    const gap = dock.getBoundingClientRect().left - navEl.getBoundingClientRect().right;
    header.classList.toggle('is-compact', gap < 32);
  }
  function measureDock() {
    fitNav();
    if (!dock || !floatMark || !heroEl) return;
    floatMark.style.transform = 'none';
    const b = floatMark.getBoundingClientRect();
    const d = dock.getBoundingClientRect();
    const s = d.width / b.width;
    dockT = { s, dx: d.left - b.left, dy: d.top + d.height / 2 - b.height * s / 2 - b.top };
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
      if (heroEl) {
        const dist = vh * 0.5;
        const p = reduce ? (y > 0 ? 1 : 0) : clamp(y / dist, 0, 1);
        const docked = p >= 0.999;
        header.classList.toggle('is-scrolled', docked);
        document.body.classList.toggle('is-docked', docked);
        if (floatMark && dockT && !reduce) {
          // Shrink and centre first (ease-out), rise into the header last (ease-in), so the
          // line is already small and centred when it reaches the menu row — no overlap.
          const es = 1 - Math.pow(1 - p, 3);
          const ey = Math.pow(p, 2.4);
          floatMark.style.transform = `translate(${(dockT.dx * es).toFixed(1)}px, ${(dockT.dy * ey).toFixed(1)}px) scale(${(1 + (dockT.s - 1) * es).toFixed(4)})`;
        }
      } else {
        header.classList.toggle('is-scrolled', y > 0);
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
  // Re-measure whenever the docked line changes size (web font swap, viewport change).
  if (floatMark && 'ResizeObserver' in window) {
    const ro = new ResizeObserver(() => { measureDock(); requestTick(); });
    ro.observe(floatMark);
    ro.observe(dock);
  }
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

  /* ---------- Time-limited offer (src/data/promo.js): pop-up + page, by Bali date ---------- */
  const baliToday = new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
  const promoPop = $('[data-promo-pop]');
  const promoActive = !!promoPop && baliToday >= promoPop.dataset.promoStart && baliToday <= promoPop.dataset.promoEnd;
  if (promoPop && promoActive && !document.body.classList.contains('is-promo-page')) {
    const PROMO_KEY = `pf-promo-${promoPop.dataset.promoId}`;
    let seenPromo = false;
    try { seenPromo = !!localStorage.getItem(PROMO_KEY); } catch (e) { /* storage blocked */ }
    const closePromo = () => {
      try { localStorage.setItem(PROMO_KEY, '1'); } catch (e) { /* storage blocked */ }
      promoPop.classList.remove('is-open');
      setTimeout(() => { promoPop.hidden = true; }, 500);
    };
    if (!seenPromo) {
      setTimeout(() => {
        if (document.body.classList.contains('menu-open')) return;
        promoPop.hidden = false;
        requestAnimationFrame(() => requestAnimationFrame(() => promoPop.classList.add('is-open')));
      }, 2500);
    }
    $('[data-promo-close]', promoPop).addEventListener('click', closePromo);
    $('[data-promo-go]', promoPop).addEventListener('click', closePromo);
  }
  // On the offer page itself, say so once the offer is over.
  const promoPage = $('[data-promo-page]');
  if (promoPage && baliToday > promoPage.dataset.promoEnd) {
    const ended = $('[data-promo-ended]', promoPage);
    if (ended) ended.hidden = false;
    document.body.classList.add('is-promo-ended');
  }

  /* ---------- Instagram pop-up (after 4 s, then not again for 14 days) ---------- */
  const igPop = $('[data-ig-pop]');
  if (igPop) {
    const IG_KEY = 'pf-ig-pop';
    const IG_PAUSE = 14 * 24 * 3600 * 1000;
    let lastSeen = 0;
    try { lastSeen = Number(localStorage.getItem(IG_KEY)) || 0; } catch (e) { /* storage blocked */ }
    const dismiss = () => {
      try { localStorage.setItem(IG_KEY, String(Date.now())); } catch (e) { /* storage blocked */ }
      igPop.classList.remove('is-open');
      setTimeout(() => { igPop.hidden = true; }, 500);
    };
    // The offer pop-up takes priority while it runs.
    if (!promoActive && Date.now() - lastSeen > IG_PAUSE) {
      setTimeout(() => {
        // Never on top of the open menu or booking panel.
        if (document.body.classList.contains('menu-open')) return;
        igPop.hidden = false;
        requestAnimationFrame(() => requestAnimationFrame(() => igPop.classList.add('is-open')));
      }, 4000);
    }
    $('[data-ig-close]', igPop).addEventListener('click', dismiss);
    $('[data-ig-follow]', igPop).addEventListener('click', dismiss);
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
      const only = trigger.dataset.only || '';
      treatmentEl.hidden = !t;
      treatmentEl.textContent = t ? `Treatment: ${t}${only ? ` · only at ${(data.locations.find((l) => l.id === only) || {}).name}` : ''}` : '';
      // Personalised WhatsApp message per treatment and studio.
      $$('[data-wa]', dialog).forEach((a) => {
        const loc = data.locations.find((l) => l.id === a.dataset.wa);
        if (loc) a.href = `https://wa.me/${loc.whatsapp}?text=${encodeURIComponent(waText(loc, t))}`;
      });
      // Direct Fresha link of the treatment when known, otherwise the studio page.
      // A JSON value lists one link per duration: each gets its own choice in the panel.
      $$('[data-fresha-variant]', dialog).forEach((a) => a.remove());
      const split = [];
      $$('[data-fresha]', dialog).forEach((a) => {
        const loc = data.locations.find((l) => l.id === a.dataset.fresha);
        const value = trigger.getAttribute(`data-fresha-${a.dataset.fresha}`) || '';
        a.href = (loc && loc.fresha) || a.href;
        if (value.charAt(0) !== '{') { if (value) a.href = value; return; }
        Object.entries(JSON.parse(value)).forEach(([label, url]) => {
          const v = a.cloneNode(true);
          v.removeAttribute('data-fresha');
          v.setAttribute('data-fresha-variant', '');
          v.href = url;
          v.firstElementChild.textContent = `${loc ? loc.name : ''} · ${label}`;
          a.before(v);
        });
        split.push(a);
      });
      // Studio-exclusive treatments only show the studio that offers them.
      $$('[data-loc]', dialog).forEach((a) => { a.hidden = (!!only && a.dataset.loc !== only) || split.includes(a); });
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
        float.style.transform = `translate3d(${fx - 110}px, ${fy - 110}px, 0) rotate(${tilt}deg) scale(${float.classList.contains('is-on') ? 1 : 0.6})`;
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

  /* ---------- Live Google reviews (Maps JavaScript API, 5-star reviews only) ---------- */
  const reviewSections = $$('[data-reviews]');
  if (reviewSections.length && data.googleKey) {
    const esc = (t) => String(t || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const stars = (n) => { const f = Math.round(n); return `<span class="stars" aria-label="${n} out of 5 stars">${'★'.repeat(f)}<span class="stars__off">${'★'.repeat(5 - f)}</span></span>`; };
    const reviewText = (r) => (r.text && typeof r.text === 'object' ? r.text.text : r.text) || '';

    // Load Google only when a reviews section comes near the screen.
    let googleReady;
    const loadGoogle = () => googleReady || (googleReady = new Promise((resolve, reject) => {
      window.__pfGoogle = resolve;
      const sc = document.createElement('script');
      sc.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(data.googleKey)}&loading=async&libraries=places&callback=__pfGoogle`;
      sc.async = true;
      sc.onerror = reject;
      document.head.appendChild(sc);
    }).then(() => google.maps.importLibrary('places')));

    const placeFor = async (lib, loc) => {
      if (loc.placeId) return new lib.Place({ id: loc.placeId });
      const { places } = await lib.Place.searchByText({ textQuery: `${loc.fullName}, ${loc.street}, Bali`, fields: ['id'], maxResultCount: 1 });
      return places && places[0];
    };
    const studioData = {};
    const loadStudio = (lib, loc) => studioData[loc.id] || (studioData[loc.id] = (async () => {
      const place = await placeFor(lib, loc);
      if (!place) return null;
      await place.fetchFields({ fields: ['rating', 'userRatingCount', 'reviews', 'googleMapsURI'] });
      return place;
    })().catch(() => null));

    const fill = async (sec) => {
      const lib = await loadGoogle();
      const only = sec.dataset.reviews;
      const locs = data.locations.filter((l) => !only || l.id === only);
      const places = await Promise.all(locs.map((l) => loadStudio(lib, l)));
      const ratings = $('[data-ratings]', sec);
      const chips = [];
      const cards = [];
      places.forEach((pl, i) => {
        if (!pl) return;
        const loc = locs[i];
        if (pl.rating) chips.push(`<a class="rating-chip" href="${esc(pl.googleMapsURI)}" target="_blank" rel="noopener"><span class="rating-chip__score">${pl.rating.toFixed(1)}</span><span class="rating-chip__meta">${stars(pl.rating)}<span>Google · ${esc(loc.fullName)}${pl.userRatingCount ? ` · ${pl.userRatingCount} reviews` : ''}</span></span></a>`);
        (pl.reviews || []).filter((r) => r.rating === 5 && reviewText(r)).forEach((r) => {
          const t = reviewText(r);
          const au = r.authorAttribution || {};
          const name = au.uri ? `<a href="${esc(au.uri)}" target="_blank" rel="noopener">${esc(au.displayName)}</a>` : esc(au.displayName);
          cards.push(`<figure class="review is-in"><div class="review__top">${stars(5)}<span class="review__source">Google</span></div><blockquote><p>${esc(t.length > 420 ? t.slice(0, 417).trim() + '…' : t)}</p></blockquote><figcaption><span class="review__author">${name}</span><span>${esc(r.relativePublishTimeDescription || '')} · ${esc(loc.fullName)}</span></figcaption></figure>`);
        });
      });
      if (chips.length && ratings) {
        $$('.rating-chip--links', ratings).forEach((c) => { c.hidden = true; });
        ratings.insertAdjacentHTML('afterbegin', chips.join(''));
      }
      if (cards.length) {
        $('[data-rail-track]', sec).insertAdjacentHTML('afterbegin', cards.join(''));
        $('[data-rail]', sec).hidden = false;
        $('.reviews__controls', sec).hidden = false;
        sec.insertAdjacentHTML('beforeend', '<p class="container reviews__credit">5-star reviews from Google</p>');
      }
    };
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      fill(e.target).catch(() => { /* Fresha ratings stay in place */ });
    }), { rootMargin: '600px 0px' });
    reviewSections.forEach((sec) => io.observe(sec));
  }

  /* ---------- Instagram feed (behold.so JSON), at the bottom of every page ---------- */
  const igGrid = $('[data-ig-grid]');
  if (igGrid && data.igFeed && 'fetch' in window) {
    const escA = (t) => String(t || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    fetch(data.igFeed)
      .then((r) => (r.ok ? r.json() : null))
      .then((feed) => {
        const posts = (Array.isArray(feed) ? feed : (feed && feed.posts) || []).slice(0, 6);
        if (!posts.length) return;
        igGrid.innerHTML = posts.map((post) => {
          const src = (post.sizes && post.sizes.medium && post.sizes.medium.mediaUrl) || post.thumbnailUrl || post.mediaUrl;
          const alt = (post.prunedCaption || post.caption || 'POINT · FACE on Instagram').slice(0, 120);
          return `<a class="ig-feed__tile" href="${escA(post.permalink)}" target="_blank" rel="noopener"><img src="${escA(src)}" alt="${escA(alt)}" loading="lazy" decoding="async"></a>`;
        }).join('');
      })
      .catch(() => { /* keep the follow grid */ });
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
