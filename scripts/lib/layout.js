const site = require('../../src/data/site');
const { esc, abs, waLink, waText } = require('./utils');

const logo = (cls = '') => `<span class="logo ${cls}" role="img" aria-label="POINT · FACE"></span>`;

const wordmark = (cls = '') =>
  `<span class="wordmark ${cls}" aria-label="POINT FACE"><span>POINT</span><span class="wordmark__dot">·</span><span>FACE</span></span>`;

function header(current) {
  const links = site.nav
    .map((n) => `<a href="${n.href}" class="nav__link${current === n.href ? ' is-current' : ''}"${current === n.href ? ' aria-current="page"' : ''}>${n.label}</a>`)
    .join('');
  return `
<a class="skip" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="site-header__inner">
    <nav class="nav nav--primary" aria-label="Main">${links}</nav>
    <a href="/" class="site-header__logo" aria-label="POINT · FACE — home">${logo()}</a>
    <div class="site-header__actions">
      <span class="site-header__loc">Ungasan · Bingin</span>
      <a href="/book/" class="btn btn--solid btn--sm" data-book data-magnetic>Book now</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
        <span class="sr-only">Menu</span><span class="menu-toggle__bar"></span><span class="menu-toggle__bar"></span>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
    <nav aria-label="Mobile">
      ${site.nav.map((n, i) => `<a href="${n.href}" style="--i:${i}">${n.label}</a>`).join('')}
      <a href="/faq/" style="--i:${site.nav.length}">FAQ</a>
    </nav>
    <div class="mobile-menu__foot">
      <a href="/book/" class="btn btn--solid" data-book>Book a treatment</a>
      <a href="${site.instagram}" class="link" rel="noopener" target="_blank">${site.instagramHandle}</a>
    </div>
  </div>
</header>`;
}

function footer() {
  const locs = site.locations
    .map(
      (l) => `
      <div class="footer__col">
        <p class="eyebrow">${l.name}</p>
        <address>${esc(l.street)}<br>${esc(l.locality)}, ${l.region} ${l.postalCode}</address>
        <p>${l.hours.label}</p>
        <p><a class="link" href="${waLink(l, waText(l))}" rel="noopener" target="_blank">WhatsApp ${l.phoneDisplay}</a></p>
        <p><a class="link" href="${l.maps}" rel="noopener" target="_blank">Directions</a> · <a class="link" href="/locations/${l.slug}/">Studio page</a></p>
      </div>`
    )
    .join('');
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__col footer__col--intro">
        <p class="footer__claim">Expert facials, Korean Hydrafacials & face sculpting in Uluwatu, Bali.</p>
        <a href="/book/" class="btn btn--solid" data-book data-magnetic>Book your glow</a>
      </div>
      ${locs}
      <div class="footer__col">
        <p class="eyebrow">Explore</p>
        <ul class="footer__list">
          <li><a class="link" href="/treatments/">Treatments & prices</a></li>
          <li><a class="link" href="/concerns/">Skin concerns</a></li>
          <li><a class="link" href="/journal/">Journal</a></li>
          <li><a class="link" href="/about/">About</a></li>
          <li><a class="link" href="/faq/">FAQ</a></li>
          <li><a class="link" href="${site.instagram}" rel="noopener" target="_blank">Instagram ${site.instagramHandle}</a></li>
        </ul>
      </div>
    </div>
    <p class="footer__note">${site.priceNote} Every treatment includes a complimentary professional skin analysis.</p>
  </div>
  <div class="footer__mark" aria-hidden="true">
    <div class="hero__mark footer__line" data-hero-mark><span class="hero__mark-word">.Face</span><span class="hero__mark-rule"></span><span class="hero__mark-word">Expert Facials</span></div>
  </div>
  <div class="container footer__legal">
    <span>© ${new Date().getFullYear()} ${site.name} · ${site.legalName}</span>
    <a href="/" class="footer__logo" aria-label="POINT · FACE — home">${logo()}</a>
    <span class="footer__legal-right">Uluwatu Ungasan · Uluwatu Bingin · Bali, Indonesia</span>
  </div>
</footer>`;
}

function bookingDialog() {
  const locs = site.locations;
  return `
<dialog class="book-dialog" data-book-dialog aria-labelledby="book-title">
  <div class="book-dialog__inner">
    <button class="book-dialog__close" type="button" data-book-close aria-label="Close">×</button>
    <p class="eyebrow">Book a treatment</p>
    <h2 id="book-title" class="h-display h-display--md">Choose your studio</h2>
    <p class="book-dialog__treatment" data-book-treatment hidden></p>
    <div class="book-dialog__group">
      <p class="book-dialog__label"><span class="icon-wa" aria-hidden="true"></span>WhatsApp</p>
      ${locs.map((l) => `<a class="book-option" data-wa="${l.id}" href="${waLink(l, waText(l))}" target="_blank" rel="noopener"><span>${l.name}</span><span class="book-option__arrow" aria-hidden="true">→</span></a>`).join('')}
    </div>
    <div class="book-dialog__group">
      <p class="book-dialog__label">Online booking · Fresha</p>
      ${locs.map((l) => `<a class="book-option" href="${l.fresha}" target="_blank" rel="noopener"><span>${l.name}</span><span class="book-option__arrow" aria-hidden="true">→</span></a>`).join('')}
    </div>
    <p class="book-dialog__note">Complimentary skin analysis included · ${site.priceNote}</p>
  </div>
</dialog>`;
}

function page({ path, title, description, body, schema, image, current, bodyClass = '', type = 'website', noindex = false }) {
  const fullTitle = path === '/' ? title : `${title} | POINT · FACE Uluwatu`;
  const ogImage = abs(image ? `/assets/img/${image}.webp` : '/assets/img/og-default.jpg');
  const pfData = JSON.stringify({
    locations: site.locations.map((l) => ({ id: l.id, name: l.name, whatsapp: l.whatsapp, fresha: l.fresha })),
  });
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(path)}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#F6F4F0">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="POINT · FACE">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(path)}">
<meta property="og:image" content="${ogImage}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="geo.region" content="ID-BA">
<meta name="geo.placename" content="Uluwatu, Bali">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt">
<link rel="preload" href="/assets/fonts/archivo-black-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/open-sauce-sans-latin-300-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/main.css">
<script>document.documentElement.classList.add('js')</script>
<script type="application/ld+json">${schema}</script>
</head>
<body class="${bodyClass}">
${header(current)}
<main id="main">
${body}
</main>
${footer()}
${bookingDialog()}
<a href="/book/" class="book-fab" data-book>Book now</a>
<div class="cursor" aria-hidden="true" data-cursor-el><span class="cursor__label" data-cursor-label></span></div>
<div class="hover-float" aria-hidden="true" data-hover-float><div class="hover-float__inner"></div></div>
<script type="application/json" id="pf-data">${pfData}</script>
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

module.exports = { page, wordmark, logo };
