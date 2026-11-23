// Page for the time-limited offer in src/data/promo.js (e.g. /black-friday/).
const site = require('../../src/data/site');
const { treatments } = require('../../src/data/treatments');
const { esc, idr, img, abs, waLink, freshaFor, locationsFor } = require('./utils');
const S = require('./schema');
const C = require('./components');

// Booking button for an offer: the booking panel shows the offer in the WhatsApp message
// and keeps each studio's direct Fresha link for the treatment.
const offerBookAttrs = (label, t) =>
  `data-book data-treatment="${esc(label)}"` + (t ? locationsFor(t).map((l) => ` data-fresha-${l.id}="${esc(freshaFor(t, l))}"`).join('') : '');

const waOffer = (l, what) => waLink(l, `Hi Point Face ${l.name.replace('Uluwatu ', '')}! I'd like ${what} (Black Friday offer). Could you tell me your availability?`);

function promoPage(promo) {
  const p = `/${promo.slug}/`;
  const facials = promo.facials.map((slug) => treatments.find((t) => t.slug === slug));
  const body = `
${C.breadcrumb([['Home', '/'], [promo.title, p]])}
<section class="promo-hero container" data-promo-page data-promo-end="${promo.end}">
  <div class="promo-hero__text">
    <p class="eyebrow" data-reveal>${esc(promo.dates)} · Ungasan &amp; Bingin</p>
    <h1 class="h-display h-display--xl" data-split>Black Friday Week</h1>
    <p class="page-hero__lede" data-reveal>${esc(promo.intro)}</p>
    <ul class="promo-hero__points" data-reveal>
      <li><strong>${esc(promo.discount)}</strong> our 3 best-selling Korean Hydrafacials</li>
      <li><strong>Up to +25%</strong> bonus credit on gift cards</li>
    </ul>
    <div class="promo-ended" data-promo-ended hidden><p><strong>This offer has ended.</strong> Discover our current <a class="link" href="/packages/">packages</a> and <a class="link" href="/treatments/">treatments</a>.</p></div>
    <div class="hero__ctas" data-reveal>
      <a class="btn btn--solid" href="#bf-facials">See the 35% offer</a>
      <a class="link link--arrow" href="#bf-gift-cards">Gift card bonuses</a>
    </div>
  </div>
  <div class="promo-hero__media" data-reveal>${img(promo.images.facials, `Black Friday Week at POINT · FACE: ${promo.discount} our 3 best-selling Korean Hydrafacials, ${promo.dates}`, { eager: true, sizes: '(max-width: 760px) 100vw, 45vw' })}</div>
</section>

<section class="section" id="bf-facials" aria-labelledby="bf-facials-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow" data-reveal>${esc(promo.discount)} · ${esc(promo.dates)}</p>
      <h2 class="h-display" id="bf-facials-title" data-split>Our 3 best-selling Korean Hydrafacials</h2>
    </div>
    <div class="bf-facials">
      ${facials
        .map(
          (t) => `
      <article class="bf-facial" data-reveal>
        <a class="bf-facial__media" href="/treatments/${t.slug}/" tabindex="-1" aria-hidden="true">${(promo.facialVisuals || {})[t.slug] ? img(promo.facialVisuals[t.slug], `${t.name}: Black Friday ${promo.discount}`, { sizes: '(max-width: 760px) 120px, 30vw' }) : `${img(t.image, t.name, { sizes: '(max-width: 760px) 100vw, 30vw' })}<span class="tag tag--float">${esc(promo.discount)}</span>`}</a>
        <p class="eyebrow">Korean Hydrafacial · ${t.duration} min</p>
        <h3 class="bf-facial__name"><a href="/treatments/${t.slug}/">${esc(t.name)}</a></h3>
        <p class="bf-facial__text">${esc(t.summary)}</p>
        <p class="bf-facial__price"><s>${idr(t.priceWas || t.price)}</s> <strong>${idr(Math.round((t.priceWas || t.price) * (1 - promo.percent / 100)))}</strong></p>
        <a href="/book/" class="btn btn--solid btn--sm" ${offerBookAttrs(`Black Friday ${promo.discount} — ${t.name}`, t)}>Book with ${esc(promo.discount.toLowerCase())}</a>
      </article>`
        )
        .join('')}
    </div>
    <p class="fine bf-note" data-reveal>Secure your spot by booking online or via WhatsApp and mention the Black Friday offer. Available at both studios.</p>
  </div>
</section>

<section class="section section--tint" id="bf-gift-cards" aria-labelledby="bf-gift-title">
  <div class="container bf-gift">
    <div class="bf-gift__media" data-reveal>${img(promo.images.giftCards, `Black Friday gift card special at POINT · FACE: pay ${idr(promo.giftCards[0][0])}, receive ${idr(promo.giftCards[0][1])}`, { sizes: '(max-width: 760px) 100vw, 45vw' })}</div>
    <div>
      <p class="eyebrow" data-reveal>Exclusive Black Friday bonuses</p>
      <h2 class="h-display" id="bf-gift-title" data-split>Gift card special</h2>
      <p data-reveal>${esc(promo.giftCardText)}</p>
      <ul class="bf-gift__tiers" data-reveal>
        ${promo.giftCards
          .map(([pay, get, bonus]) => `<li><span><small>Pay</small>${idr(pay)}</span><span><small>Receive</small>${idr(get)}</span><strong>${bonus}</strong></li>`)
          .join('')}
      </ul>
      <p class="fine" data-reveal>Buy your gift card on WhatsApp or in-store:</p>
      <div class="bf-gift__ctas" data-reveal>
        ${site.locations.map((l) => `<a class="btn btn--ghost btn--sm" href="${waOffer(l, 'to buy a gift card')}" target="_blank" rel="noopener">WhatsApp ${esc(l.fullName)}</a>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="bf-terms-title">
  <div class="container bf-terms">
    <h2 class="eyebrow" id="bf-terms-title">Black Friday offer — terms &amp; conditions</h2>
    ${C.list(promo.terms.map(esc))}
  </div>
</section>

${C.bookingBand()}`;

  const validFrom = `${promo.start}T00:00:00+08:00`;
  const validThrough = `${promo.end}T23:59:59+08:00`;
  return {
    path: p,
    html: {
      path: p,
      title: `${promo.title} — ${promo.discount} Korean Hydrafacials in Uluwatu`,
      description: promo.description,
      body,
      image: promo.images.facials,
      bodyClass: 'is-promo-page',
      schema: S.graph(
        S.webPage(p, promo.title, promo.description, {
          mainEntity: {
            '@type': 'OfferCatalog',
            name: `${promo.title} (${promo.dates})`,
            itemListElement: [
              ...facials.map((t) => ({ '@type': 'Offer', name: `${t.name} — ${promo.discount}`, price: Math.round((t.priceWas || t.price) * (1 - promo.percent / 100)), priceCurrency: 'IDR', url: abs(`/treatments/${t.slug}/`), validFrom, validThrough, seller: { '@id': abs('/#organization') } })),
              ...promo.giftCards.map(([pay, get]) => ({ '@type': 'Offer', name: `Gift card: pay ${idr(pay)}, receive ${idr(get)}`, price: pay, priceCurrency: 'IDR', validFrom, validThrough, seller: { '@id': abs('/#organization') } })),
            ],
          },
        }),
        S.breadcrumbs([['Home', '/'], [promo.title, p]])
      ),
    },
  };
}

module.exports = { promoPage };
