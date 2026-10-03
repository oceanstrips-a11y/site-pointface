const site = require('../../src/data/site');
const { esc, idr, idrK, img, waLink, waText, fmtDate } = require('./utils');

const breadcrumb = (items) => `
<nav class="breadcrumb container" aria-label="Breadcrumb">
  <ol>${items
    .map(([name, path], i) => (i === items.length - 1 ? `<li aria-current="page">${esc(name)}</li>` : `<li><a href="${path}">${esc(name)}</a></li>`))
    .join('')}</ol>
</nav>`;

const sectionHead = ({ eyebrow, title, intro, link, align = '' }) => `
<div class="section-head ${align}">
  ${eyebrow ? `<p class="eyebrow" data-reveal>${eyebrow}</p>` : ''}
  <h2 class="h-display" data-split>${title}</h2>
  ${intro ? `<p class="section-head__intro" data-reveal>${intro}</p>` : ''}
  ${link ? `<a class="link link--arrow" href="${link[1]}" data-reveal>${link[0]}</a>` : ''}
</div>`;

const priceLabel = (t) =>
  t.prices
    ? t.prices.map((p, i) => `${t.durations[i]} min · ${idr(p)}`).join(' / ')
    : `${t.duration} min · ${idr(t.price)}`;

// Editorial hover list row: hovering shows the treatment photo following the cursor.
const treatmentRow = (t, i) => `
<li class="hover-row" data-reveal style="--d:${(i % 6) * 60}ms">
  <a href="/treatments/${t.slug}/" data-hover-img="/assets/img/${t.image}-sm.webp" data-cursor="View">
    <span class="hover-row__num">${String(i + 1).padStart(2, '0')}</span>
    <span class="hover-row__main">
      <span class="hover-row__want">${esc(t.want)}</span>
      <span class="hover-row__name">${esc(t.name)}</span>
    </span>
    <span class="hover-row__meta">${t.prices ? t.durations.join('/') : t.duration} min</span>
    <span class="hover-row__price">${t.priceWas ? `<s>${idrK(t.priceWas)}</s> ` : ''}${t.prices ? t.prices.map(idrK).join(' / ') : idrK(t.price)}</span>
    <span class="hover-row__arrow" aria-hidden="true">→</span>
  </a>
</li>`;

const treatmentCard = (t, opts = {}) => `
<article class="t-card${opts.className ? ' ' + opts.className : ''}" data-reveal>
  <a href="/treatments/${t.slug}/" class="t-card__link" data-cursor="View">
    <div class="t-card__media img-zoom">
      ${img(t.image, `${t.name} facial at POINT · FACE Uluwatu`, { sizes: '(max-width: 760px) 85vw, 30vw' })}
      ${t.badge ? `<span class="tag">${esc(t.badge)}</span>` : ''}
    </div>
    <div class="t-card__body">
      <p class="t-card__pillars">${t.pillars.join(' · ')}</p>
      <h3 class="t-card__title">${esc(t.name)}</h3>
      <p class="t-card__summary">${esc(t.summary)}</p>
      <p class="t-card__price">${priceLabel(t)}${t.priceWas ? ` <s>${idr(t.priceWas)}</s>` : ''}</p>
    </div>
  </a>
</article>`;

const concernTile = (c, i) => `
<a class="concern-tile" href="/concerns/${c.slug}/" data-reveal style="--d:${(i % 4) * 80}ms" data-cursor="Read">
  <div class="concern-tile__media img-zoom">${img(c.image, c.name, { sizes: '(max-width: 760px) 50vw, 25vw' })}</div>
  <span class="concern-tile__num">${String(i + 1).padStart(2, '0')}</span>
  <span class="concern-tile__name">${esc(c.name)}</span>
</a>`;

const faqList = (faqs, { open = false } = {}) => `
<div class="faq">
  ${faqs
    .map(
      ([q, a], i) => `
  <details class="faq__item" data-reveal${open && i === 0 ? ' open' : ''}>
    <summary><span>${esc(q)}</span><span class="faq__icon" aria-hidden="true"></span></summary>
    <div class="faq__answer"><p>${a}</p></div>
  </details>`
    )
    .join('')}
</div>`;

const marquee = (items) => {
  const row = items.map((i) => `<span>${esc(i)}</span><span class="marquee__star" aria-hidden="true">✦</span>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee__track">${row}${row}</div></div>`;
};

const bookingBand = (treatment) => `
<section class="book-band" aria-labelledby="book-band-title">
  <div class="container book-band__inner">
    <div>
      <p class="eyebrow">Book · WhatsApp or Fresha</p>
      <h2 class="h-display h-display--lg" id="book-band-title" data-split>Ready for your glow?</h2>
      <p class="book-band__text">Choose your studio in Uluwatu. A complimentary skin analysis is included with every treatment.</p>
    </div>
    <div class="book-band__options">
      ${site.locations
        .map(
          (l) => `
      <div class="book-band__loc">
        <p class="book-band__loc-name">${l.name}</p>
        <a class="btn btn--solid" href="${waLink(l, waText(l, treatment))}" target="_blank" rel="noopener" data-magnetic>WhatsApp</a>
        <a class="btn btn--ghost" href="${l.fresha}" target="_blank" rel="noopener">Fresha</a>
      </div>`
        )
        .join('')}
    </div>
  </div>
</section>`;

const stars = (n) => {
  const full = Math.round(n);
  return `<span class="stars" aria-label="${n} out of 5 stars">${'★'.repeat(full)}<span class="stars__off">${'★'.repeat(5 - full)}</span></span>`;
};

const SOURCE_LABEL = { google: 'Google', fresha: 'Fresha' };

function reviewsSection(reviews, { locationId, title = 'Loved in Uluwatu' } = {}) {
  const list = (reviews.reviews || []).filter((r) => !locationId || r.location === locationId).slice(0, 12);
  const summaries = [];
  for (const l of site.locations) {
    if (locationId && l.id !== locationId) continue;
    const s = (reviews.summary || {})[l.id] || {};
    for (const src of ['google', 'fresha']) {
      if (s[src] && s[src].rating) summaries.push({ loc: l, src, ...s[src] });
    }
  }
  const summaryHtml = summaries.length
    ? summaries
        .map(
          (s) => `
    <a class="rating-chip" href="${esc(s.url || (s.src === 'google' ? s.loc.maps : s.loc.fresha))}" target="_blank" rel="noopener">
      <span class="rating-chip__score" data-count="${s.rating}" data-decimals="1">${s.rating.toFixed(1)}</span>
      <span class="rating-chip__meta">${stars(s.rating)}<span>${SOURCE_LABEL[s.src]} · ${s.loc.name}${s.count ? ` · ${s.count} reviews` : ''}</span></span>
    </a>`
        )
        .join('')
    : site.locations
        .filter((l) => !locationId || l.id === locationId)
        .map(
          (l) => `
    <div class="rating-chip rating-chip--links">
      <span class="rating-chip__meta"><strong>${l.name}</strong>
      <span><a class="link" href="${l.maps}" target="_blank" rel="noopener">Google reviews</a> · <a class="link" href="${l.fresha}" target="_blank" rel="noopener">Fresha reviews</a></span></span>
    </div>`
        )
        .join('');

  const cards = list
    .map(
      (r) => `
    <figure class="review" data-reveal>
      <div class="review__top">${stars(r.rating)}<span class="review__source">${SOURCE_LABEL[r.source] || r.source}</span></div>
      <blockquote><p>${esc(r.text.length > 420 ? r.text.slice(0, 417).trim() + '…' : r.text)}</p></blockquote>
      <figcaption><span class="review__author">${esc(r.author)}</span><span>${esc(r.dateLabel || (r.date ? fmtDate(r.date.slice(0, 10)) : ''))}${r.locationName ? ' · ' + esc(r.locationName) : ''}</span></figcaption>
    </figure>`
    )
    .join('');

  return `
<section class="section reviews" id="reviews" aria-labelledby="reviews-title" data-reviews="${locationId || ''}">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow" data-reveal>Reviews · Google & Fresha</p>
        <h2 class="h-display" id="reviews-title" data-split>${title}</h2>
      </div>
      <div class="ratings" data-reveal data-ratings>${summaryHtml}</div>
    </div>
  </div>
  <div class="reviews__rail" data-rail${cards ? '' : ' hidden'}>
    <div class="reviews__track" data-rail-track>${cards}</div>
  </div>
  <div class="container reviews__controls"${cards ? '' : ' hidden'}>
    <button class="rail-btn" type="button" data-rail-prev aria-label="Previous reviews">←</button>
    <button class="rail-btn" type="button" data-rail-next aria-label="Next reviews">→</button>
    <span class="reviews__updated">Reviews from Google &amp; Fresha${reviews.updatedAt ? ` · synced ${fmtDate(reviews.updatedAt.slice(0, 10))}` : ''}</span>
  </div>
</section>`;
}

function studiosSection({ title = 'Two studios in Uluwatu' } = {}) {
  return `
<section class="studios" id="studios" aria-labelledby="studios-title">
  <div class="studios__head">
    <p class="eyebrow" data-reveal>Our studios</p>
    <h2 class="h-display" id="studios-title" data-split>${title}</h2>
  </div>
  <div class="studios__grid">
    ${site.locations
      .map(
        (l, i) => `
    <article class="studio">
      <a href="/locations/${l.slug}/" class="studio__media" tabindex="-1" aria-hidden="true">
        <div class="studio__img" data-parallax="0.06">${img(i === 0 ? 'relaxation-ritual' : 'skin-confidence', `POINT · FACE ${l.name} facial studio`, { sizes: '(max-width: 760px) 100vw, 50vw' })}</div>
      </a>
      <div class="studio__body" data-reveal style="--d:${i * 120}ms">
        <p class="studio__index">0${i + 1}</p>
        <h3 class="studio__name"><a href="/locations/${l.slug}/">${l.name}</a></h3>
        <address>${esc(l.street)}, ${esc(l.locality)}, ${l.region}</address>
        <p class="studio__hours">${l.hours.label}</p>
        <div class="studio__actions">
          <a class="btn btn--light btn--sm" href="${waLink(l, waText(l))}" target="_blank" rel="noopener">WhatsApp</a>
          <a class="btn btn--outline-light btn--sm" href="${l.fresha}" target="_blank" rel="noopener">Fresha</a>
          <a class="link link--light" href="${l.maps}" target="_blank" rel="noopener">Directions</a>
        </div>
      </div>
    </article>`
      )
      .join('')}
  </div>
</section>`;
}

const articleCard = (a, i = 0) => `
<article class="a-card" data-reveal style="--d:${(i % 3) * 100}ms">
  <a href="/journal/${a.slug}/" data-cursor="Read">
    <div class="a-card__media img-zoom">${img(a.image, a.title, { sizes: '(max-width: 760px) 100vw, 33vw' })}</div>
    <p class="a-card__meta"><span>${esc(a.category)}</span><span>${a.readTime} min read</span></p>
    <h3 class="a-card__title">${esc(a.title)}</h3>
  </a>
</article>`;

const list = (items, cls = 'list-dash') => `<ul class="${cls}">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

module.exports = {
  breadcrumb, sectionHead, treatmentRow, treatmentCard, concernTile, faqList, marquee, bookingBand,
  reviewsSection, studiosSection, articleCard, list, priceLabel, stars,
};
