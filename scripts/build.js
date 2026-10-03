#!/usr/bin/env node
// Static site generator for POINT · FACE — zero dependencies. Run: node scripts/build.js
const fs = require('fs');
const path = require('path');

const site = require('../src/data/site');
const { categories, treatments, addOns, hydrojellyMasks, ledColours, packages, aftercare } = require('../src/data/treatments');
const concerns = require('../src/data/concerns');
const articles = require('../src/data/articles').sort((a, b) => b.date.localeCompare(a.date));
const faq = require('../src/data/faq');
const reviews = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/reviews.json'), 'utf8'));

const { esc, stripTags, idr, img, abs, waLink, waText, fmtDate } = require('./lib/utils');
const S = require('./lib/schema');
const C = require('./lib/components');
const { page, wordmark } = require('./lib/layout');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public');
const bySlug = Object.fromEntries(treatments.map((t) => [t.slug, t]));
const catById = Object.fromEntries(categories.map((c) => [c.id, c]));
const pages = []; // for sitemap

function write(urlPath, html, { priority = 0.7, lastmod } = {}) {
  const file = urlPath.endsWith('/') ? path.join(OUT, urlPath, 'index.html') : path.join(OUT, urlPath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  if (urlPath.endsWith('/')) pages.push({ loc: abs(urlPath), priority, lastmod });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

const today = new Date().toISOString().slice(0, 10);

/* ───────────────────────────── HOME ───────────────────────────── */
function home() {
  const bestSellers = [
    [bySlug['ultimate-korean-glass-skin-hydralift'], 'COSRX, SKIN1004 &amp; Beauty of Joseon', 'Discover the 17 steps'],
    [bySlug['advanced-collagen-booster'], 'COSRX, SKIN1004, Mediheal &amp; Medicube', 'Discover the treatment'],
  ];

  const body = `
<section class="hero" aria-labelledby="hero-title" data-hero>
  <div class="hero__pin">
    <div class="hero__media" data-expand>
      <div class="hero__media-inner" data-parallax="0.12">
        <picture>
          <source media="(max-width: 760px)" srcset="/assets/img/hero-glass-skin-glow-sm.webp 514w, /assets/img/hero-glass-skin-glow.webp 1029w" sizes="100vw">
          <img src="/assets/img/hero-glass-skin-glow-wide.webp" width="1920" height="1240" alt="Glowing, hydrated glass skin after a Korean Hydrafacial at POINT · FACE Uluwatu" fetchpriority="high" decoding="async">
        </picture>
      </div>
    </div>
    <div class="hero__mark" aria-hidden="true" data-hero-mark data-grow>
      <span class="hero__mark-word">.Face</span><span class="hero__mark-rule"></span><span class="hero__mark-word">Expert Facials</span>
    </div>
    <div class="hero__caption">
      <h1 id="hero-title" class="hero__title" data-split>Facials, Korean Hydrafacials and Face Massage in Uluwatu</h1>
      <div class="hero__ctas" data-reveal>
        <a href="/book/" class="btn btn--light" data-book data-magnetic>Book a facial</a>
        <a href="/treatments/" class="link link--light link--arrow">Explore treatments</a>
      </div>
    </div>
    <a href="#intro" class="hero__scroll" aria-label="Scroll to content"><span></span></a>
  </div>
</section>

<section class="intro" id="intro" aria-labelledby="intro-title">
  ${C.marquee([...treatments.map((t) => t.name.replace(/ — .*/, '')), 'HydroJelly Masks', 'LED Light Therapy', 'Free AI Skin Analysis'])}
  <div class="container intro__inner">
    <p class="eyebrow" data-reveal>Facial studio · Uluwatu, Bali</p>
    <h2 class="intro__statement" id="intro-title" data-scrub-words>POINT • FACE is a facial-only studio in Uluwatu, Bali, with two studios in Ungasan and Bingin, specialised in facials and Korean Hydrafacials: glass skin, anti-aging, acne and after-sun repair, plus face-sculpting massages. Each treatment is tailored after a free AI-powered skin analysis.</h2>
    <dl class="stats">
      <div data-reveal><dt>Average review rating</dt><dd><span data-count="4.9" data-decimals="1">4.9</span><span class="stats__star" aria-hidden="true">★</span></dd></div>
      <div data-reveal style="--d:100ms"><dt>Satisfied clients</dt><dd><span data-count="2000">2000</span>+</dd></div>
      <div data-reveal style="--d:200ms"><dt>Facial &amp; Hydrafacial studio in Uluwatu</dt><dd>Top 1</dd></div>
      <div data-reveal style="--d:300ms"><dt>Skin analysis with AI-powered diagnostic technology</dt><dd>Free</dd></div>
    </dl>
  </div>
</section>

${C.studiosSection()}

<section class="section section--tint" aria-labelledby="want-title">
  <div class="container">
    ${C.sectionHead({ eyebrow: 'Which facial is best for my skin?', title: 'Tell us what you want.<br>We have the facial.', intro: 'Every treatment answers one wish. Hover to preview, tap to discover.', link: ['Full menu & prices', '/treatments/'] }).replace('<h2 class="h-display"', '<h2 class="h-display" id="want-title"')}
    ${C.groupedTreatmentList(treatments, categories, { home: true })}
  </div>
</section>

<section class="section signature" aria-labelledby="sig-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow" data-reveal>Our guests' favourites</p>
      <h2 class="h-display" id="sig-title" data-split>Our signature best sellers</h2>
    </div>
    ${bestSellers
      .map(
        ([t, brands, more], i) => `
    <article class="signature__grid${i % 2 ? ' signature__grid--rev' : ''}">
      <div class="signature__media">
        <div class="signature__sticky">
          <div class="clip-reveal" data-reveal>${img(t.image, `${t.name} facial result`, { sizes: '(max-width: 760px) 100vw, 45vw' })}</div>
          <span class="tag tag--float">★ Best seller · 0${i + 1}</span>
        </div>
      </div>
      <div class="signature__content">
        <p class="eyebrow" data-reveal>${esc(catById[t.category].short)} · ${t.duration} min</p>
        <h3 class="h-display h-display--md signature__name" data-split>${esc(t.name)}</h3>
        <p class="signature__lede" data-reveal>${esc(t.summary)} Features ${brands}.</p>
        <div class="signature__cols">
          <div data-reveal><p class="eyebrow">Key ingredients</p>${C.list(t.ingredients.map(esc))}</div>
          <div data-reveal style="--d:100ms"><p class="eyebrow">Technologies</p>${C.list(t.technologies.map(esc))}</div>
          <div data-reveal style="--d:200ms"><p class="eyebrow">Results</p>${C.list(t.results.map(esc))}</div>
        </div>
        <p class="signature__price" data-reveal>${t.priceWas ? `<s>${idr(t.priceWas)}</s> ` : ''}<strong>${idr(t.price)}</strong>${t.priceWas ? ' <span class="tag">25% off</span>' : ''}</p>
        <div class="signature__ctas" data-reveal>
          <a href="/book/" class="btn btn--solid" data-book data-treatment="${esc(t.name)}" data-magnetic>Book this facial</a>
          <a class="link link--arrow" href="/treatments/${t.slug}/">${more}</a>
        </div>
      </div>
    </article>`
      )
      .join('')}
  </div>
</section>

<section class="section hscroll" data-hscroll aria-labelledby="menu-title">
  <div class="hscroll__sticky">
    <div class="container hscroll__head">
      <p class="eyebrow">The menu</p>
      <h2 class="h-display" id="menu-title">Facials &amp;<br>Korean Hydrafacials.</h2>
      <p class="hscroll__hint" aria-hidden="true">Scroll →</p>
    </div>
    <div class="hscroll__track" data-hscroll-track>
      ${categories
        .map((cat) => {
          const first = treatments.find((t) => t.category === cat.id);
          const count = treatments.filter((t) => t.category === cat.id).length;
          return `
      <a class="cat-card" href="/treatments/#${cat.id}" data-cursor="Explore">
        <div class="cat-card__media img-zoom">${img(first.image, cat.name, { sizes: '(max-width: 760px) 80vw, 32vw' })}</div>
        <p class="cat-card__count">${String(count).padStart(2, '0')} treatments</p>
        <h3 class="cat-card__title">${cat.name}</h3>
        <p class="cat-card__intro">${esc(cat.intro)}</p>
      </a>`;
        })
        .join('')}
      <a class="cat-card cat-card--addons" href="/treatments/#add-ons" data-cursor="Explore">
        <div class="cat-card__media img-zoom">${img('led-light-therapy', 'LED light therapy add-on', { sizes: '(max-width: 760px) 80vw, 32vw' })}</div>
        <p class="cat-card__count">From IDR 85K</p>
        <h3 class="cat-card__title">Add-ons &amp; HydroJelly masks</h3>
        <p class="cat-card__intro">LED therapy in 7 colours, 5 HydroJelly masks, collagen eye patches and Korean lip scrub.</p>
      </a>
    </div>
  </div>
</section>

<section class="section section--tint" aria-labelledby="concerns-title">
  <div class="container">
    ${C.sectionHead({ eyebrow: 'Shop by skin concern', title: 'What is your skin<br>telling you?', link: ['All skin concerns', '/concerns/'] }).replace('<h2 class="h-display"', '<h2 class="h-display" id="concerns-title"')}
    <div class="concern-grid">${concerns.map(C.concernTile).join('')}</div>
  </div>
</section>

<section class="section duo" aria-labelledby="duo-title">
  <div class="container duo__grid">
    <div class="duo__media clip-reveal" data-reveal>
      <div data-parallax="0.08">${img('duo-package-friends', 'Friends enjoying a duo facial package in Uluwatu', { sizes: '(max-width: 760px) 100vw, 50vw' })}</div>
    </div>
    <div class="duo__content">
      <p class="eyebrow" data-reveal>Packages</p>
      <h2 class="h-display" id="duo-title" data-split>Glow together</h2>
      <p data-reveal>The Duo Package: 2 × Ultimate Korean Glass Skin &amp; Hydralift (80 min each), in shared or separate cabins. Perfect for friends, partners and bridal parties.</p>
      <p class="duo__price" data-reveal><s>${idr(packages.duo.priceWas)}</s> <strong>${idr(packages.duo.price)}</strong></p>
      <p data-reveal>Living in Bali? Our 3-session packages save up to 30% on facials and 20% on face massages.</p>
      <div class="signature__ctas" data-reveal>
        <a href="/book/" class="btn btn--solid" data-book data-treatment="Duo Package" data-magnetic>Book for two</a>
        <a class="link link--arrow" href="/treatments/#packages">See all packages</a>
      </div>
    </div>
  </div>
</section>

${C.reviewsSection(reviews)}

<section class="section section--tint" aria-labelledby="journal-title">
  <div class="container">
    ${C.sectionHead({ eyebrow: 'The Journal', title: 'Skin advice from<br>our therapists', link: ['All articles', '/journal/'] }).replace('<h2 class="h-display"', '<h2 class="h-display" id="journal-title"')}
    <div class="a-grid">${articles.slice(0, 3).map(C.articleCard).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="faq-title">
  <div class="container faq-layout">
    <div>
      <p class="eyebrow" data-reveal>FAQ</p>
      <h2 class="h-display" id="faq-title" data-split>Good to know</h2>
      <a class="link link--arrow" href="/faq/" data-reveal>All questions</a>
    </div>
    ${C.faqList(faq.slice(0, 6), { open: true })}
  </div>
</section>

${C.bookingBand()}`;

  write(
    '/',
    page({
      path: '/',
      title: 'POINT · FACE — Korean Hydrafacials & Expert Facials in Uluwatu, Bali',
      description:
        'Expert facial studio in Uluwatu, Bali (Ungasan & Bingin): facials & Korean Hydrafacials for glass skin, anti-aging, acne & after-sun, PDRN, Kobido & Buccal massage. Free AI skin analysis. Book on WhatsApp or Fresha.',
      body,
      current: '/',
      bodyClass: 'is-home',
      schema: S.graph(
        S.webPage('/', 'POINT · FACE — Expert Facials in Uluwatu, Bali', site.description, { about: { '@id': abs('/#organization') } }),
        ...site.locations.map((l) => S.business(l, { treatments, reviews })),
        S.faqPage(faq, '/')
      ),
    }),
    { priority: 1.0, lastmod: today }
  );
}

/* ───────────────────────────── TREATMENTS INDEX ───────────────────────────── */
function treatmentsIndex() {
  const body = `
${C.breadcrumb([['Home', '/'], ['Treatments', '/treatments/']])}
<section class="page-hero container">
  <p class="eyebrow" data-reveal>Treatments menu · Prices</p>
  <h1 class="h-display h-display--xl" data-split>Expert facials, Hydrafacials &amp; face massages</h1>
  <p class="page-hero__lede" data-reveal>Four families of treatments at both Uluwatu studios — Ungasan and Bingin. ${site.priceNote} Every treatment includes a complimentary professional skin analysis.</p>
</section>

<nav class="cat-nav" aria-label="Treatment categories" data-scrollspy>
  <div class="container cat-nav__inner">
    ${categories.map((c) => `<a href="#${c.id}">${c.short}</a>`).join('')}
    <a href="#add-ons">Add-ons</a>
    <a href="#packages">Packages</a>
    <a href="#aftercare">Aftercare</a>
  </div>
</nav>

<section class="section section--first compare" aria-labelledby="compare-title">
  <div class="container compare__grid">
    <div data-reveal>
      <p class="eyebrow">Facial</p>
      <h2 class="h-sub" id="compare-title">A traditional facial</h2>
      <p>Cleansing, exfoliating, massaging and nourishing the skin with manual techniques and natural skincare. A gentle, sensory ritual for visible freshness and comfort.</p>
    </div>
    <div data-reveal style="--d:120ms">
      <p class="eyebrow">Hydrafacial</p>
      <h2 class="h-sub">An advanced Hydrafacial</h2>
      <p>A technology-based facial using hydrodermabrasion, oxygen infusion, ultrasonic penetration, radiofrequency and LED therapy for deep cleansing, hydration and instant, visible results.</p>
    </div>
  </div>
</section>

${categories
  .map(
    (cat, ci) => `
<section class="section cat-section${ci % 2 ? ' section--tint' : ''}" id="${cat.id}" aria-labelledby="${cat.id}-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow" data-reveal>0${ci + 1} · ${treatments.filter((t) => t.category === cat.id).length} treatments</p>
        <h2 class="h-display" id="${cat.id}-title" data-split>${cat.name}</h2>
      </div>
      <p class="section-head__intro" data-reveal>${esc(cat.intro)}</p>
    </div>
    <div class="t-grid">${treatments.filter((t) => t.category === cat.id).map((t) => C.treatmentCard(t)).join('')}</div>
  </div>
</section>`
  )
  .join('')}

<section class="section" id="add-ons" aria-labelledby="addons-title">
  <div class="container">
    ${C.sectionHead({ eyebrow: '05 · Add-ons', title: 'Personalised boosters', intro: 'Add to any treatment to target a concern or deepen the results.' }).replace('<h2 class="h-display"', '<h2 class="h-display" id="addons-title"')}
    <div class="addons">
      ${addOns
        .map(
          (a, i) => `
      <article class="addon" data-reveal style="--d:${i * 80}ms">
        <div class="addon__media img-zoom">${img(a.image, a.name, { sizes: '(max-width: 760px) 50vw, 20vw' })}</div>
        <h3 class="addon__name">${esc(a.name)}</h3>
        <p class="addon__price">${a.duration ? a.duration + ' min · ' : ''}${idr(a.price)}</p>
        <p>${esc(a.description)}</p>
      </article>`
        )
        .join('')}
    </div>
    <div class="twocol">
      <div data-reveal>
        <h3 class="h-sub">HydroJelly masks</h3>
        <dl class="def-list">${hydrojellyMasks.map(([n, d]) => `<div><dt>${n}</dt><dd>${d}</dd></div>`).join('')}</dl>
      </div>
      <div data-reveal style="--d:120ms">
        <h3 class="h-sub">LED therapy — 7 colours</h3>
        <dl class="def-list def-list--led">${ledColours.map(([n, d]) => `<div><dt><span class="led-dot led-dot--${n.toLowerCase()}"></span>${n}</dt><dd>${d}</dd></div>`).join('')}</dl>
      </div>
    </div>
  </div>
</section>

<section class="section section--tint" id="packages" aria-labelledby="packages-title">
  <div class="container">
    ${C.sectionHead({ eyebrow: '06 · Packages & offers', title: 'Packages' }).replace('<h2 class="h-display"', '<h2 class="h-display" id="packages-title"')}
    <div class="package-duo" data-reveal>
      <div>
        <p class="eyebrow">Best deal · Friends & partners</p>
        <h3 class="h-sub">${packages.duo.name}</h3>
        <p>${esc(packages.duo.description)}</p>
      </div>
      <p class="package-duo__price"><s>${idr(packages.duo.priceWas)}</s><strong>${idr(packages.duo.price)}</strong></p>
      <a href="/book/" class="btn btn--solid" data-book data-treatment="Duo Package">Book the duo</a>
    </div>
    <div class="table-wrap" data-reveal>
      <table class="price-table">
        <caption>3-session packages</caption>
        <thead><tr><th scope="col">Treatment</th><th scope="col">Normal price (3 sessions)</th><th scope="col">Package price</th></tr></thead>
        <tbody>${packages.threeSessions.map(([n, was, now, off]) => `<tr><th scope="row">${esc(n)}</th><td><s>${idr(was)}</s></td><td><strong>${idr(now)}</strong> <span class="tag">${off}</span></td></tr>`).join('')}</tbody>
      </table>
    </div>
    <p class="fine">${packages.terms} ${site.priceNote}</p>
  </div>
</section>

<section class="section" id="aftercare" aria-labelledby="aftercare-title">
  <div class="container">
    ${C.sectionHead({ eyebrow: 'Protect your glow', title: 'Aftercare' }).replace('<h2 class="h-display"', '<h2 class="h-display" id="aftercare-title"')}
    <div class="twocol">
      <div data-reveal><h3 class="h-sub">After your Hydrafacial</h3>${C.list(aftercare.hydrafacial)}</div>
      <div data-reveal style="--d:120ms"><h3 class="h-sub">After your natural facial</h3>${C.list(aftercare.balinese)}</div>
    </div>
  </div>
</section>

${C.bookingBand()}`;

  write(
    '/treatments/',
    page({
      path: '/treatments/',
      title: 'Facial Treatments & Prices — Korean Hydrafacials, Facials, Face Massages',
      description:
        'Full POINT · FACE menu & prices in Uluwatu: Korean Hydrafacials (glass skin, collagen, PDRN, acne), Korean HydroJelly Hydrafacials, natural facials, Kobido, Buccal & Gua Sha massages, add-ons and packages.',
      body,
      current: '/treatments/',
      schema: S.graph(
        S.webPage('/treatments/', 'Treatments & prices', 'POINT · FACE treatment menu', {
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: treatments.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/treatments/${t.slug}/`), name: t.name })),
          },
        }),
        S.breadcrumbs([['Home', '/'], ['Treatments', '/treatments/']])
      ),
    }),
    { priority: 0.9, lastmod: today }
  );
}

/* ───────────────────────────── TREATMENT DETAIL ───────────────────────────── */
function treatmentPage(t) {
  const cat = catById[t.category];
  const p = `/treatments/${t.slug}/`;
  const tConcerns = concerns.filter((c) => t.concerns.includes(c.slug));
  const related = treatments.filter((x) => x.slug !== t.slug && (x.category === t.category || x.concerns.some((c) => t.concerns.includes(c)))).slice(0, 3);
  const relArticles = articles.filter((a) => a.related.includes(t.slug)).slice(0, 3);
  const isMassage = t.category === 'face-massages';
  const care = t.category === 'balinese-natural-facials' ? aftercare.balinese : aftercare.hydrafacial;

  const body = `
${C.breadcrumb([['Home', '/'], ['Treatments', '/treatments/'], [t.name, p]])}
<article class="treatment">
  <div class="container treatment__grid">
    <div class="treatment__media">
      <div class="treatment__sticky clip-reveal" data-reveal>
        ${img(t.image, `${t.name} — ${cat.short} at POINT · FACE Uluwatu`, { eager: true, sizes: '(max-width: 760px) 100vw, 45vw' })}
      </div>
    </div>
    <div class="treatment__content">
      <p class="eyebrow" data-reveal>${cat.name}${t.badge ? ` · ${esc(t.badge)}` : ''}</p>
      <h1 class="h-display h-display--lg" data-split>${esc(t.name)}</h1>
      <p class="treatment__want" data-reveal>“${esc(t.want)}”</p>
      <p class="treatment__pillars" data-reveal>${t.pillars.join(' · ')}</p>
      <div class="treatment__buy" data-reveal>
        <p class="treatment__price">${C.priceLabel(t)}${t.priceWas ? ` <s>${idr(t.priceWas)}</s> <span class="tag">25% off</span>` : ''}</p>
        <a href="/book/" class="btn btn--solid" data-book data-treatment="${esc(t.name)}" data-magnetic>Book this treatment</a>
        <p class="fine">${site.priceNote} Available at Uluwatu Ungasan &amp; Uluwatu Bingin.</p>
      </div>
      <div class="answer-box" data-reveal>
        <p class="eyebrow">In short</p>
        <p>${esc(t.summary)} <strong>Recommended for:</strong> ${esc(t.recommendedFor)}</p>
      </div>
      <div class="prose" data-reveal><p>${esc(t.description)}</p></div>
      <div class="spec">
        ${t.ingredients.length ? `<div data-reveal><p class="eyebrow">Key ingredients</p>${C.list(t.ingredients.map(esc))}</div>` : ''}
        <div data-reveal style="--d:80ms"><p class="eyebrow">${isMassage ? 'Techniques' : 'Key technologies'}</p>${C.list(t.technologies.map(esc))}</div>
        <div data-reveal style="--d:160ms"><p class="eyebrow">Results</p>${C.list(t.results.map(esc))}</div>
      </div>
      <div class="best" data-reveal><p class="eyebrow">For best results</p><p>${esc(t.bestResults)}</p></div>
      ${
        tConcerns.length
          ? `<div class="chips" data-reveal><p class="eyebrow">Ideal for</p>${tConcerns.map((c) => `<a class="chip" href="/concerns/${c.slug}/">${esc(c.name)}</a>`).join('')}</div>`
          : ''
      }
      ${!isMassage ? `<div class="best" data-reveal><p class="eyebrow">Aftercare</p>${C.list(care)}</div>` : ''}
    </div>
  </div>
</article>

${
  t.faqs.length
    ? `<section class="section section--tint" aria-labelledby="t-faq"><div class="container faq-layout">
  <div><p class="eyebrow">FAQ</p><h2 class="h-display" id="t-faq" data-split>Questions about ${esc(t.name)}</h2></div>
  ${C.faqList(t.faqs, { open: true })}
</div></section>`
    : ''
}

<section class="section" aria-labelledby="rel-title">
  <div class="container">
    ${C.sectionHead({ eyebrow: 'You may also like', title: 'Related treatments', link: ['Full menu', '/treatments/'] }).replace('<h2 class="h-display"', '<h2 class="h-display" id="rel-title"')}
    <div class="t-grid">${related.map((r) => C.treatmentCard(r)).join('')}</div>
  </div>
</section>

${
  relArticles.length
    ? `<section class="section section--tint" aria-label="Related articles"><div class="container">
  ${C.sectionHead({ eyebrow: 'From the Journal', title: 'Read more' })}
  <div class="a-grid">${relArticles.map(C.articleCard).join('')}</div></div></section>`
    : ''
}

${C.bookingBand(t.name)}`;

  write(
    p,
    page({
      path: p,
      title: `${t.name} in Uluwatu, Bali — ${t.prices ? t.durations.join('/') : t.duration} min`,
      description: `${t.summary} ${t.prices ? t.durations.join('/') : t.duration} min from ${idr(t.price)} at POINT · FACE Uluwatu (Ungasan & Bingin). Free skin analysis.`.slice(0, 300),
      body,
      image: t.image,
      current: '/treatments/',
      schema: S.graph(
        S.webPage(p, t.name, t.summary, { mainEntity: { '@id': abs(p + '#service') } }),
        S.service(t, cat),
        S.breadcrumbs([['Home', '/'], ['Treatments', '/treatments/'], [t.name, p]]),
        S.faqPage(t.faqs, p)
      ),
    }),
    { priority: 0.8, lastmod: today }
  );
}

/* ───────────────────────────── CONCERNS ───────────────────────────── */
function concernsIndex() {
  const body = `
${C.breadcrumb([['Home', '/'], ['Skin concerns', '/concerns/']])}
<section class="page-hero container">
  <p class="eyebrow" data-reveal>Shop by skin concern</p>
  <h1 class="h-display h-display--xl" data-split>Skin concerns we treat in Uluwatu</h1>
  <p class="page-hero__lede" data-reveal>Sun, salt, humidity, flights and air-conditioning: Bali asks a lot of your skin. Find your concern, understand what causes it and discover the facials that help.</p>
</section>
<section class="section section--first">
  <div class="container"><div class="concern-grid concern-grid--lg">${concerns.map(C.concernTile).join('')}</div></div>
</section>
${C.bookingBand()}`;
  write(
    '/concerns/',
    page({
      path: '/concerns/',
      title: 'Skin Concerns — Facials for Acne, Wrinkles, Dehydration & Sun Damage in Bali',
      description: 'Facials matched to your skin concern in Uluwatu, Bali: fine lines, acne, dehydration, sun-stressed skin, pigmentation, dullness, sensitivity, puffiness & jaw tension.',
      body,
      current: '/concerns/',
      schema: S.graph(
        S.webPage('/concerns/', 'Skin concerns', 'Facials by skin concern', {
          mainEntity: { '@type': 'ItemList', itemListElement: concerns.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/concerns/${c.slug}/`), name: c.name })) },
        }),
        S.breadcrumbs([['Home', '/'], ['Skin concerns', '/concerns/']])
      ),
    }),
    { priority: 0.8, lastmod: today }
  );
}

function concernPage(c) {
  const p = `/concerns/${c.slug}/`;
  const relArticles = articles.filter((a) => a.body.includes(`/concerns/${c.slug}/`)).slice(0, 3);
  const body = `
${C.breadcrumb([['Home', '/'], ['Skin concerns', '/concerns/'], [c.name, p]])}
<section class="concern-hero">
  <div class="container concern-hero__grid">
    <div class="concern-hero__text">
      <p class="eyebrow" data-reveal>Skin concern · Uluwatu, Bali</p>
      <h1 class="h-display h-display--xl" data-split>${esc(c.title)}</h1>
      <p class="page-hero__lede" data-reveal>${esc(c.lede)}</p>
      <div class="hero__ctas" data-reveal>
        <a href="/book/" class="btn btn--solid" data-book data-treatment="a facial for ${esc(c.name.toLowerCase())}" data-magnetic>Book a skin analysis</a>
        <a href="#treatments" class="link link--arrow">Recommended treatments</a>
      </div>
    </div>
    <div class="concern-hero__media clip-reveal" data-reveal>
      <div data-parallax="0.1">${img(c.image, c.name, { eager: true, sizes: '(max-width: 760px) 100vw, 45vw' })}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container concern-body">
    <div class="concern-body__block" data-reveal>
      <h2 class="h-sub">What is it?</h2>
      <p>${esc(c.what)}</p>
    </div>
    <div class="concern-body__block" data-reveal>
      <h2 class="h-sub">What causes it?</h2>
      ${C.list(c.causes.map(esc))}
    </div>
    <div class="concern-body__block concern-body__block--wide" data-reveal>
      <h2 class="h-sub">Why Bali makes it worse</h2>
      <p class="concern-body__big">${esc(c.whyBali)}</p>
    </div>
    <div class="concern-body__block concern-body__block--wide" data-reveal>
      <h2 class="h-sub">Our approach at POINT · FACE</h2>
      <p>${esc(c.approach)}</p>
    </div>
  </div>
</section>

<section class="section section--tint" id="treatments" aria-labelledby="ct-title">
  <div class="container">
    ${C.sectionHead({ eyebrow: 'Recommended for you', title: `Our treatments for ${c.name.toLowerCase()}` }).replace('<h2 class="h-display"', '<h2 class="h-display" id="ct-title"')}
    <ol class="rec-list">
      ${c.treatments
        .map(([slug, why], i) => {
          const t = bySlug[slug];
          return `
      <li class="rec" data-reveal style="--d:${i * 80}ms">
        <a href="/treatments/${t.slug}/" class="rec__media img-zoom" data-cursor="View">${img(t.image, t.name, { sizes: '(max-width: 760px) 30vw, 14vw' })}</a>
        <div class="rec__body">
          <p class="rec__num">${String(i + 1).padStart(2, '0')}${i === 0 ? ' · Best match' : ''}</p>
          <h3 class="rec__name"><a href="/treatments/${t.slug}/">${esc(t.name)}</a></h3>
          <p>${esc(why)}</p>
          <p class="rec__price">${C.priceLabel(t)}</p>
        </div>
        <a href="/book/" class="btn btn--ghost btn--sm" data-book data-treatment="${esc(t.name)}">Book</a>
      </li>`;
        })
        .join('')}
    </ol>
    <p class="fine" data-reveal><strong>Boost it with:</strong> ${c.addOns.map(esc).join(' · ')} — see <a class="link" href="/treatments/#add-ons">add-ons</a>.</p>
  </div>
</section>

<section class="section" aria-labelledby="tl-title">
  <div class="container twocol">
    <div>
      <p class="eyebrow" data-reveal>Results</p>
      <h2 class="h-display" id="tl-title" data-split>What to expect</h2>
      <ol class="timeline">${c.timeline.map(([when, what], i) => `<li data-reveal style="--d:${i * 100}ms"><span class="timeline__when">${esc(when)}</span><span>${esc(what)}</span></li>`).join('')}</ol>
    </div>
    <div>
      <p class="eyebrow" data-reveal>At home</p>
      <h2 class="h-display" data-split>Daily care in Bali</h2>
      <div data-reveal>${C.list(c.homeCare.map(esc))}</div>
    </div>
  </div>
</section>

<section class="section section--tint" aria-labelledby="c-faq">
  <div class="container faq-layout">
    <div><p class="eyebrow">FAQ</p><h2 class="h-display" id="c-faq" data-split>${esc(c.name)}: your questions</h2></div>
    ${C.faqList(c.faqs, { open: true })}
  </div>
</section>

${
  relArticles.length
    ? `<section class="section" aria-label="Related articles"><div class="container">
  ${C.sectionHead({ eyebrow: 'From the Journal', title: 'Read more' })}
  <div class="a-grid">${relArticles.map(C.articleCard).join('')}</div></div></section>`
    : ''
}

${C.bookingBand()}`;

  write(
    p,
    page({
      path: p,
      title: c.title,
      description: c.metaDescription,
      body,
      image: c.image,
      current: '/concerns/',
      schema: S.graph(
        S.webPage(p, c.title, c.metaDescription, {
          about: { '@type': 'Thing', name: c.name },
          mentions: c.treatments.map(([s]) => ({ '@id': abs(`/treatments/${s}/#service`) })),
        }),
        S.breadcrumbs([['Home', '/'], ['Skin concerns', '/concerns/'], [c.name, p]]),
        S.faqPage(c.faqs, p)
      ),
    }),
    { priority: 0.8, lastmod: today }
  );
}

/* ───────────────────────────── LOCATIONS ───────────────────────────── */
function locationsIndex() {
  const body = `
${C.breadcrumb([['Home', '/'], ['Studios', '/locations/']])}
<section class="page-hero container">
  <p class="eyebrow" data-reveal>Our studios</p>
  <h1 class="h-display h-display--xl" data-split>Facial studios in Uluwatu, Bali</h1>
  <p class="page-hero__lede" data-reveal>Two POINT · FACE studios on the Bukit peninsula — Uluwatu Ungasan and Uluwatu Bingin. Same menu, same expertise, same complimentary skin analysis.</p>
</section>
${C.studiosSection()}
${C.reviewsSection(reviews)}
${C.bookingBand()}`;
  write(
    '/locations/',
    page({
      path: '/locations/',
      title: 'Facial Studios in Uluwatu — Ungasan & Bingin',
      description: 'Find POINT · FACE in Uluwatu, Bali: our Ungasan studio (Jl. Toya Ning II) and our Bingin studio. Addresses, opening hours, directions, WhatsApp & Fresha booking.',
      body,
      current: '/locations/',
      schema: S.graph(S.breadcrumbs([['Home', '/'], ['Studios', '/locations/']]), ...site.locations.map((l) => S.business(l, { reviews }))),
    }),
    { priority: 0.9, lastmod: today }
  );
}

function locationPage(l) {
  const p = `/locations/${l.slug}/`;
  const other = site.locations.find((x) => x.id !== l.id);
  const mapQuery = encodeURIComponent(`POINT FACE ${l.street} ${l.locality} Bali`);
  const locFaqs = [
    [`Where is POINT · FACE ${l.name}?`, `${l.street}, ${l.locality}, ${l.region} ${l.postalCode}, Indonesia. Close to ${l.nearby.slice(0, 3).join(', ')}.`],
    [`What are the opening hours?`, `${l.hours.label}. We recommend booking 1–3 days ahead in high season.`],
    [`How do I book at ${l.name}?`, `Send us a WhatsApp message on ${l.phoneDisplay} or book online on Fresha.`],
    ['Which treatments are available?', 'The full POINT · FACE menu: Korean Hydrafacials, Korean HydroJelly Hydrafacials, natural facials, Kobido, Buccal, Gua Sha and the Relaxation Ritual, add-ons and packages.'],
  ];
  const body = `
${C.breadcrumb([['Home', '/'], ['Studios', '/locations/'], [l.name, p]])}
<section class="concern-hero">
  <div class="container concern-hero__grid">
    <div class="concern-hero__text">
      <p class="eyebrow" data-reveal>Studio · ${l.locality}</p>
      <h1 class="h-display h-display--xl" data-split>Facial studio in ${esc(l.name)}</h1>
      <p class="page-hero__lede" data-reveal>${esc(l.intro)}</p>
      <dl class="info-list" data-reveal>
        <div><dt>Address</dt><dd><address>${esc(l.street)}<br>${esc(l.locality)}, ${l.region} ${l.postalCode}</address></dd></div>
        <div><dt>Hours</dt><dd>${l.hours.label}</dd></div>
        <div><dt>WhatsApp</dt><dd><a class="link" href="${waLink(l, waText(l))}" target="_blank" rel="noopener">${l.phoneDisplay}</a></dd></div>
        <div><dt>Nearby</dt><dd>${l.nearby.join(' · ')}</dd></div>
      </dl>
      <div class="hero__ctas" data-reveal>
        <a class="btn btn--solid" href="${waLink(l, waText(l))}" target="_blank" rel="noopener" data-magnetic>Book on WhatsApp</a>
        <a class="btn btn--ghost" href="${l.fresha}" target="_blank" rel="noopener">Book on Fresha</a>
        <a class="link link--arrow" href="${l.maps}" target="_blank" rel="noopener">Directions</a>
      </div>
    </div>
    <div class="concern-hero__media clip-reveal" data-reveal>
      <div data-parallax="0.1">${img(l.id === 'ungasan' ? 'relaxation-ritual' : 'skin-confidence', `Facial at POINT · FACE ${l.name}`, { eager: true, sizes: '(max-width: 760px) 100vw, 45vw' })}</div>
    </div>
  </div>
</section>

<section class="section section--tint" aria-labelledby="menu-here">
  <div class="container">
    ${C.sectionHead({ eyebrow: `Menu · ${l.name}`, title: 'Treatments at this studio', link: ['Full menu & prices', '/treatments/'] }).replace('<h2 class="h-display"', '<h2 class="h-display" id="menu-here"')}
    ${C.groupedTreatmentList(treatments, categories)}
  </div>
</section>

<section class="section map-section" aria-label="Map">
  <div class="container">
    <div class="map" data-reveal>
      <iframe title="Map — POINT · FACE ${esc(l.name)}" src="https://www.google.com/maps?q=${mapQuery}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>

${C.reviewsSection(reviews, { locationId: l.id, title: `Reviews · ${l.name}` })}

<section class="section section--tint" aria-labelledby="l-faq">
  <div class="container faq-layout">
    <div><p class="eyebrow">FAQ</p><h2 class="h-display" id="l-faq" data-split>Visiting ${esc(l.name)}</h2>
    <p class="fine">Also in Uluwatu: <a class="link" href="/locations/${other.slug}/">POINT · FACE ${other.name}</a></p></div>
    ${C.faqList(locFaqs, { open: true })}
  </div>
</section>

${C.bookingBand()}`;

  write(
    p,
    page({
      path: p,
      title: `Facial Studio in ${l.name}, Bali — Korean Hydrafacials`,
      description: `POINT · FACE ${l.name}: expert facials, Korean Hydrafacials and face-sculpting massages at ${l.street}, ${l.locality}. ${l.hours.label}. Book on WhatsApp or Fresha.`,
      body,
      current: '/locations/',
      schema: S.graph(
        S.business(l, { treatments, reviews }),
        S.breadcrumbs([['Home', '/'], ['Studios', '/locations/'], [l.name, p]]),
        S.faqPage(locFaqs, p)
      ),
    }),
    { priority: 0.9, lastmod: today }
  );
}

/* ───────────────────────────── JOURNAL ───────────────────────────── */
function journalIndex() {
  const [lead, ...rest] = articles;
  const body = `
${C.breadcrumb([['Home', '/'], ['Journal', '/journal/']])}
<section class="page-hero container">
  <p class="eyebrow" data-reveal>The Journal</p>
  <h1 class="h-display h-display--xl" data-split>Skin advice from Uluwatu</h1>
  <p class="page-hero__lede" data-reveal>Honest, expert answers from our therapists — Korean skincare, Hydrafacials, face massage and how to look after your skin in Bali\'s sun.</p>
</section>
<section class="section section--first">
  <div class="container">
    <article class="lead-article" data-reveal>
      <a href="/journal/${lead.slug}/" class="lead-article__link" data-cursor="Read">
        <div class="lead-article__media img-zoom">${img(lead.image, lead.title, { eager: true, sizes: '(max-width: 760px) 100vw, 55vw' })}</div>
        <div class="lead-article__body">
          <p class="a-card__meta"><span>${esc(lead.category)}</span><span>${lead.readTime} min read</span></p>
          <h2 class="h-display">${esc(lead.title)}</h2>
          <p>${esc(lead.description)}</p>
          <span class="link link--arrow">Read the article</span>
        </div>
      </a>
    </article>
    <div class="a-grid">${rest.map(C.articleCard).join('')}</div>
  </div>
</section>
${C.bookingBand()}`;
  write(
    '/journal/',
    page({
      path: '/journal/',
      title: 'Journal — Skincare Advice, Korean Facials & Bali Skin Tips',
      description: 'Expert skincare articles by POINT · FACE Uluwatu: Hydrafacial vs Korean facial, dehydrated skin in Bali, PDRN, buccal massage, glass skin, post-surf care and more.',
      body,
      current: '/journal/',
      schema: S.graph(
        { '@type': 'Blog', '@id': abs('/journal/#blog'), name: 'POINT · FACE Journal', url: abs('/journal/'), publisher: { '@id': abs('/#organization') }, blogPost: articles.map((a) => ({ '@id': abs(`/journal/${a.slug}/#article`) })) },
        S.breadcrumbs([['Home', '/'], ['Journal', '/journal/']])
      ),
    }),
    { priority: 0.8, lastmod: today }
  );
}

function articlePage(a) {
  const p = `/journal/${a.slug}/`;
  const rel = a.related.map((s) => bySlug[s]).filter(Boolean);
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const body = `
<div class="read-progress" data-read-progress aria-hidden="true"></div>
${C.breadcrumb([['Home', '/'], ['Journal', '/journal/'], [a.title, p]])}
<article class="article">
  <header class="article__header container">
    <p class="a-card__meta" data-reveal><span>${esc(a.category)}</span><span>${a.readTime} min read</span><time datetime="${a.date}">${fmtDate(a.date)}</time></p>
    <h1 class="h-display h-display--lg" data-split>${esc(a.title)}</h1>
    <p class="article__by" data-reveal>By the POINT · FACE expert therapists · Uluwatu, Bali</p>
  </header>
  <div class="article__hero container clip-reveal" data-reveal>
    <div data-parallax="0.08">${img(a.image, a.title, { eager: true, sizes: '100vw' })}</div>
  </div>
  <div class="container article__layout">
    <aside class="article__aside">
      <div class="article__sticky">
        <p class="eyebrow">Treatments in this article</p>
        <ul class="mini-list">${rel.map((t) => `<li><a href="/treatments/${t.slug}/" class="link">${esc(t.name)}</a><span>${C.priceLabel(t)}</span></li>`).join('')}</ul>
        <a href="/book/" class="btn btn--solid btn--sm" data-book>Book a treatment</a>
      </div>
    </aside>
    <div class="article__main">
      <div class="answer-box" data-reveal>
        <p class="eyebrow">The short answer</p>
        <p>${esc(a.answer)}</p>
      </div>
      <div class="takeaways" data-reveal>
        <p class="eyebrow">Key takeaways</p>
        ${C.list(a.takeaways.map(esc))}
      </div>
      <div class="prose">${a.body}</div>
      ${a.faqs.length ? `<h2 class="h-sub">FAQ</h2>${C.faqList(a.faqs)}` : ''}
    </div>
  </div>
</article>

<section class="section section--tint" aria-label="Recommended treatments">
  <div class="container">
    ${C.sectionHead({ eyebrow: 'Try it at POINT · FACE', title: 'Recommended treatments' })}
    <div class="t-grid">${rel.map((t) => C.treatmentCard(t)).join('')}</div>
  </div>
</section>

<section class="section" aria-label="More articles">
  <div class="container">
    ${C.sectionHead({ eyebrow: 'The Journal', title: 'Keep reading', link: ['All articles', '/journal/'] })}
    <div class="a-grid">${more.map(C.articleCard).join('')}</div>
  </div>
</section>

${C.bookingBand()}`;

  write(
    p,
    page({
      path: p,
      title: a.title,
      description: a.description,
      body,
      image: a.image,
      current: '/journal/',
      type: 'article',
      bodyClass: 'is-article',
      schema: S.graph(
        S.article(a),
        S.breadcrumbs([['Home', '/'], ['Journal', '/journal/'], [a.title, p]]),
        S.faqPage(a.faqs, p)
      ),
    }),
    { priority: 0.7, lastmod: a.updated || a.date }
  );
}

/* ───────────────────────────── ABOUT / FAQ / BOOK / 404 ───────────────────────────── */
function about() {
  const body = `
${C.breadcrumb([['Home', '/'], ['About', '/about/']])}
<section class="page-hero container">
  <p class="eyebrow" data-reveal>About POINT · FACE</p>
  <h1 class="h-display h-display--xl" data-split>Experts in advanced facial care for every skin type</h1>
</section>
<section class="section section--first">
  <div class="container duo__grid">
    <div class="duo__media clip-reveal" data-reveal><div data-parallax="0.08">${img('happy-glowing-skin', 'Happy client with glowing skin after a facial', { sizes: '(max-width: 760px) 100vw, 50vw' })}</div></div>
    <div class="prose">
      <p class="intro__statement intro__statement--sm" data-scrub-words>At POINT · FACE, we specialise in expert facials that restore, rejuvenate and enhance your skin's natural beauty.</p>
      <p data-reveal>From 100% natural Balinese rituals to advanced Korean Hydrafacials, we combine science, precision and expertise to deliver visible, lasting results. We focus on dry, dehydrated, mature, aging and acne-prone skin — and on the specific stress that Bali's sun, salt and humidity put on it.</p>
      <p data-reveal>We are a facial-only studio, with two locations in Uluwatu: <a class="link" href="/locations/uluwatu-ungasan/">Ungasan</a> and <a class="link" href="/locations/uluwatu-bingin/">Bingin</a>.</p>
    </div>
  </div>
</section>
<section class="section section--tint">
  <div class="container">
    ${C.sectionHead({ eyebrow: 'Our method', title: 'Analyse. Adapt. Reveal.' })}
    <ol class="steps">
      <li data-reveal><span class="steps__num">01</span><h3 class="h-sub">Skin analysis</h3><p>Every treatment begins with a complimentary professional skin analysis: hydration, oil, pores, pigmentation and sensitivity.</p></li>
      <li data-reveal style="--d:100ms"><span class="steps__num">02</span><h3 class="h-sub">A tailored protocol</h3><p>Your therapist adapts actives, intensity and technology on the day — or recommends a different treatment altogether.</p></li>
      <li data-reveal style="--d:200ms"><span class="steps__num">03</span><h3 class="h-sub">Visible results & aftercare</h3><p>You leave with visible results and clear aftercare advice adapted to life in Bali.</p></li>
    </ol>
  </div>
</section>
<section class="section">
  <div class="container twocol">
    <div data-reveal>
      <p class="eyebrow">Our technology</p>
      <h2 class="h-display" data-split>Advanced skin technology</h2>
      <p>Our Hydrafacial systems combine hydrodermabrasion, ultrasonic infusion, oxygen therapy, radiofrequency, microcurrent sculpting, high frequency, cold hammer, cryo globes and 7-colour LED therapy. Non-invasive, multi-step and fully customisable.</p>
    </div>
    <div data-reveal style="--d:120ms">
      <p class="eyebrow">Our skincare</p>
      <h2 class="h-display" data-split>Korean &amp; Balinese</h2>
      <p>Korean dermocosmetics from ${site.brands.slice(0, 5).join(', ')}; HydroJelly masks; and 100% natural Balinese skincare from Utama Spice &amp; Embun for our rituals.</p>
      <ul class="brand-row">${site.brands.map((b) => `<li>${b}</li>`).join('')}</ul>
    </div>
  </div>
</section>
${C.studiosSection()}
${C.bookingBand()}`;
  write(
    '/about/',
    page({
      path: '/about/',
      title: 'About — Facial Experts in Uluwatu, Bali',
      description: 'POINT · FACE is a facial-only studio in Uluwatu, Bali: complimentary skin analysis, Korean Hydrafacial technology, COSRX & SKIN1004, Balinese natural skincare. Studios in Ungasan & Bingin.',
      body,
      current: '/about/',
      schema: S.graph(S.webPage('/about/', 'About POINT · FACE', site.description, { '@type': 'AboutPage' }), S.breadcrumbs([['Home', '/'], ['About', '/about/']])),
    }),
    { priority: 0.6, lastmod: today }
  );
}

function faqPage() {
  const all = [...faq];
  const body = `
${C.breadcrumb([['Home', '/'], ['FAQ', '/faq/']])}
<section class="page-hero container">
  <p class="eyebrow" data-reveal>FAQ</p>
  <h1 class="h-display h-display--xl" data-split>Frequently asked questions</h1>
</section>
<section class="section section--first"><div class="container faq-layout">
  <div><p class="fine">Can't find your answer? <a class="link" href="/book/" data-book>Message us on WhatsApp</a>.</p></div>
  ${C.faqList(all, { open: true })}
</div></section>
${C.bookingBand()}`;
  write(
    '/faq/',
    page({
      path: '/faq/',
      title: 'FAQ — Facials, Hydrafacials & Booking in Uluwatu',
      description: 'Answers about POINT · FACE Uluwatu: locations, booking via WhatsApp or Fresha, prices, skin analysis, Hydrafacial vs facial, brands, downtime and packages.',
      body,
      schema: S.graph(S.faqPage(all, '/faq/'), S.breadcrumbs([['Home', '/'], ['FAQ', '/faq/']])),
    }),
    { priority: 0.6, lastmod: today }
  );
}

function bookPage() {
  const body = `
${C.breadcrumb([['Home', '/'], ['Book', '/book/']])}
<section class="page-hero container">
  <p class="eyebrow" data-reveal>Book a treatment</p>
  <h1 class="h-display h-display--xl" data-split>Book your facial in Uluwatu</h1>
  <p class="page-hero__lede" data-reveal>1 · Choose WhatsApp or Fresha. 2 · Choose your studio. A complimentary skin analysis is included. ${site.priceNote}</p>
</section>
<section class="section section--first">
  <div class="container book-page">
    <div class="book-page__col" data-reveal>
      <p class="eyebrow">WhatsApp</p>
      <h2 class="h-sub">Message the studio</h2>
      ${site.locations.map((l) => `<a class="book-option" href="${waLink(l, waText(l))}" target="_blank" rel="noopener"><span>${l.name}<small>${esc(l.street)}</small></span><span class="book-option__arrow" aria-hidden="true">→</span></a>`).join('')}
    </div>
    <div class="book-page__col" data-reveal style="--d:120ms">
      <p class="eyebrow">Fresha</p>
      <h2 class="h-sub">Book online, 24/7</h2>
      ${site.locations.map((l) => `<a class="book-option" href="${l.fresha}" target="_blank" rel="noopener"><span>${l.name}<small>Instant confirmation</small></span><span class="book-option__arrow" aria-hidden="true">→</span></a>`).join('')}
    </div>
  </div>
</section>
${C.studiosSection()}`;
  write('/book/', page({ path: '/book/', title: 'Book a Facial — WhatsApp or Fresha', description: 'Book your POINT · FACE facial in Uluwatu via WhatsApp or Fresha: choose Uluwatu Ungasan or Uluwatu Bingin.', body, schema: S.graph(S.breadcrumbs([['Home', '/'], ['Book', '/book/']])) }), { priority: 0.7, lastmod: today });
}

function notFound() {
  const body = `
<section class="page-hero container notfound">
  <p class="eyebrow">404</p>
  <h1 class="h-display h-display--xl">This page has gone for a facial.</h1>
  <p class="page-hero__lede">Let's get you back to glowing.</p>
  <div class="hero__ctas"><a class="btn btn--solid" href="/">Home</a><a class="link link--arrow" href="/treatments/">Treatments</a></div>
</section>`;
  write('/404.html', page({ path: '/404.html', title: 'Page not found', description: 'Page not found', body, noindex: true, schema: S.graph() }));
}

/* ───────────────────────────── GEO / SEO FILES ───────────────────────────── */
function seoFiles() {
  // robots.txt — explicitly welcome search and AI assistants' crawlers (GEO audit).
  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot'];
  fs.writeFileSync(
    path.join(OUT, 'robots.txt'),
    `User-agent: *\nAllow: /\n\n${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}\n\nSitemap: ${abs('/sitemap.xml')}\n`
  );

  fs.writeFileSync(
    path.join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
      .map((p) => `  <url><loc>${p.loc}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}<priority>${p.priority.toFixed(1)}</priority></url>`)
      .join('\n')}\n</urlset>\n`
  );

  // llms.txt — concise, factual brand summary for LLMs (https://llmstxt.org).
  const tLine = (t) => `- [${t.name}](${abs(`/treatments/${t.slug}/`)}): ${t.prices ? t.prices.map((p, i) => `${t.durations[i]} min ${idr(p)}`).join(' / ') : `${t.duration} min, ${idr(t.price)}`}. ${t.summary} Recommended for: ${t.recommendedFor}`;
  const llms = `# POINT · FACE — Expert Facials in Uluwatu, Bali

> ${site.description}

Key facts:
- Two studios in Uluwatu, Bali: ${site.locations.map((l) => `${l.fullName} (${l.street}, ${l.locality}, ${l.region} ${l.postalCode})`).join('; ')}.
- Hours: ${site.locations[0].hours.label}.
- Booking: WhatsApp (${site.locations.map((l) => `${l.name}: +${l.whatsapp}`).join(', ')}) or online on Fresha.
- Every treatment includes a free skin analysis using AI-powered diagnostic technology.
- 4.9 average review rating; more than 2,000 satisfied clients.
- ${site.priceNote}
- Skincare brands: ${site.brands.join(', ')}.
- Technologies: hydrodermabrasion (Hydrafacial), ultrasonic infusion, oxygen therapy, radiofrequency, microcurrent, high frequency, cold hammer, cryo globes, 7-colour LED.
- Specialities: Korean glass-skin facials, Korean Hydrafacials, HydroJelly masks, PDRN (salmon DNA) repair facial, acne facials, anti-aging & lifting facials, after-sun / post-surf facials, Balinese natural facials, Kobido, Buccal (intra-oral) and Gua Sha face massage.
- Instagram: ${site.instagramHandle}

## Treatments
${categories.map((c) => `\n### ${c.name}\n${treatments.filter((t) => t.category === c.id).map(tLine).join('\n')}`).join('\n')}

### Add-ons
${addOns.map((a) => `- ${a.name}: ${idr(a.price)}. ${a.description}`).join('\n')}

### Packages
- ${packages.duo.name}: ${idr(packages.duo.price)} (instead of ${idr(packages.duo.priceWas)}). ${packages.duo.description}
- 3-session packages: 20–30% off facials, Hydrafacials and face massages, valid 5 months.

## Which facial should I book?
- Instant glow, hydration, glass skin: Ultimate Korean Glass Skin & Hydralift (signature).
- Fine lines, firmness: Advanced Collagen Booster or Caviar Luxury Anti-Aging & Lift.
- Acne, congestion: K-Balance Acne Clear.
- Sunburn, after surf, sensitive skin: Cryo Skin Reset or PDRN Cellular Repair.
- Pigmentation, dark spots: Bright & Pigment Correct.
- Dry or sensitive skin, natural products: Hydrating Ritual (Rose & Aloe).
- Jaw tension, puffiness, contour: Buccal Massage, Kobido.

## Studios
${site.locations.map((l) => `- [${l.fullName}](${abs(`/locations/${l.slug}/`)}): ${l.intro}`).join('\n')}

## Skin concerns
${concerns.map((c) => `- [${c.title}](${abs(`/concerns/${c.slug}/`)}): ${c.lede}`).join('\n')}

## Journal
${articles.map((a) => `- [${a.title}](${abs(`/journal/${a.slug}/`)}): ${a.answer}`).join('\n')}

## Optional
- [Full content for LLMs](${abs('/llms-full.txt')})
- [FAQ](${abs('/faq/')})
- [About](${abs('/about/')})
`;
  fs.writeFileSync(path.join(OUT, 'llms.txt'), llms);

  const full =
    llms +
    '\n\n# FULL CONTENT\n\n## FAQ\n' +
    faq.map(([q, a]) => `**${q}**\n${a}\n`).join('\n') +
    '\n## Treatment details\n' +
    treatments
      .map((t) => `### ${t.name}\n${t.description}\n- Ingredients: ${t.ingredients.join(', ') || '—'}\n- Technologies: ${t.technologies.join(', ')}\n- Results: ${t.results.join(', ')}\n- For best results: ${t.bestResults}\n${t.faqs.map(([q, a]) => `- Q: ${q} A: ${a}`).join('\n')}`)
      .join('\n\n') +
    '\n\n## Articles\n' +
    articles.map((a) => `### ${a.title}\n${a.answer}\n\n${stripTags(a.body.replace(/<\/(p|li|h2|tr)>/g, '\n'))}`).join('\n\n');
  fs.writeFileSync(path.join(OUT, 'llms-full.txt'), full);

  fs.writeFileSync(
    path.join(OUT, 'site.webmanifest'),
    JSON.stringify({ name: 'POINT · FACE', short_name: 'Point Face', start_url: '/', display: 'standalone', background_color: '#F6F4F0', theme_color: '#F6F4F0', icons: [{ src: '/assets/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }] }, null, 2)
  );
}

/* ───────────────────────────── RUN ───────────────────────────── */
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
copyDir(path.join(ROOT, 'assets'), path.join(OUT, 'assets'));
copyDir(path.join(ROOT, 'static'), OUT);
// Kenao is a licensed font: if assets/fonts/Kenao.woff2 is added, it is wired in automatically.
if (fs.existsSync(path.join(ROOT, 'assets/fonts/Kenao.woff2'))) {
  const css = path.join(OUT, 'assets/css/main.css');
  fs.writeFileSync(css, "@font-face { font-family: 'Kenao'; src: url('/assets/fonts/Kenao.woff2') format('woff2'); font-weight: 100 900; font-display: swap; }\n" + fs.readFileSync(css, 'utf8'));
}
fs.mkdirSync(path.join(OUT, 'data'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'data', 'reviews.json'), JSON.stringify(reviews));

home();
treatmentsIndex();
treatments.forEach(treatmentPage);
concernsIndex();
concerns.forEach(concernPage);
locationsIndex();
site.locations.forEach(locationPage);
journalIndex();
articles.forEach(articlePage);
about();
faqPage();
bookPage();
notFound();
seoFiles();

console.log(`Built ${pages.length} pages → ${path.relative(ROOT, OUT)}/`);
