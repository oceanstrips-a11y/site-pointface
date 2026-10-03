// JSON-LD structured data (schema.org) — the backbone of the GEO / AI-visibility audit actions.
const site = require('../../src/data/site');
const { abs, stripTags } = require('./utils');

const ORG_ID = abs('/#organization');
const SITE_ID = abs('/#website');
const bizId = (loc) => abs(`/locations/${loc.slug}/#business`);

function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    alternateName: [site.plainName, 'Point.Face', 'Point Face Bali', 'POINT FACE Uluwatu'],
    legalName: site.legalName,
    url: abs('/'),
    logo: abs('/assets/img/logo.png'),
    image: abs('/assets/img/og-default.jpg'),
    description: site.description,
    sameAs: [site.instagram, ...site.locations.map((l) => l.fresha).filter((u) => u && u !== 'https://www.fresha.com/')],
    knowsAbout: [
      'Korean facials', 'Hydrafacial', 'HydroJelly mask', 'Glass skin', 'PDRN salmon DNA facial',
      'Acne facial', 'Anti-aging facial', 'Kobido massage', 'Buccal massage', 'Gua Sha', 'LED light therapy',
      'Skin analysis', 'Balinese natural facials',
    ],
    areaServed: { '@type': 'Place', name: 'Uluwatu, Bali, Indonesia' },
    subOrganization: site.locations.map((l) => ({ '@id': bizId(l) })),
  };
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: abs('/'),
    name: site.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

function aggregateFor(locId, reviews) {
  const s = reviews && reviews.summary && reviews.summary[locId];
  if (!s) return null;
  // Combine Google + Fresha counts into one weighted rating.
  const parts = Object.values(s).filter((x) => x && x.rating && x.count);
  if (!parts.length) return null;
  const count = parts.reduce((a, p) => a + p.count, 0);
  const rating = parts.reduce((a, p) => a + p.rating * p.count, 0) / count;
  return { '@type': 'AggregateRating', ratingValue: rating.toFixed(1), reviewCount: count, bestRating: 5, worstRating: 1 };
}

function business(loc, { treatments, reviews } = {}) {
  const b = {
    '@type': ['BeautySalon', 'DaySpa'],
    '@id': bizId(loc),
    name: loc.fullName,
    parentOrganization: { '@id': ORG_ID },
    url: abs(`/locations/${loc.slug}/`),
    image: abs('/assets/img/og-default.jpg'),
    telephone: '+' + loc.whatsapp,
    priceRange: site.priceRange,
    currenciesAccepted: 'IDR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.street,
      addressLocality: loc.locality,
      addressRegion: loc.region,
      postalCode: loc.postalCode,
      addressCountry: loc.country,
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: loc.hours.opens,
      closes: loc.hours.closes,
    }],
    hasMap: loc.maps,
    areaServed: ['Uluwatu', 'Ungasan', 'Bingin', 'Pecatu', 'Jimbaran', 'Nusa Dua'].map((n) => ({ '@type': 'Place', name: `${n}, Bali` })),
    potentialAction: {
      '@type': 'ReserveAction',
      target: [`https://wa.me/${loc.whatsapp}`, loc.fresha].filter(Boolean),
    },
  };
  if (loc.geo) b.geo = { '@type': 'GeoCoordinates', latitude: loc.geo.lat, longitude: loc.geo.lng };
  if (treatments) {
    b.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Facial treatments',
      itemListElement: treatments.map((t) => ({
        '@type': 'Offer',
        price: t.price,
        priceCurrency: 'IDR',
        itemOffered: { '@type': 'Service', name: t.name, url: abs(`/treatments/${t.slug}/`) },
      })),
    };
  }
  const agg = aggregateFor(loc.id, reviews);
  if (agg) b.aggregateRating = agg;
  return b;
}

function service(t, category) {
  return {
    '@type': 'Service',
    '@id': abs(`/treatments/${t.slug}/#service`),
    name: t.name,
    serviceType: category.name,
    description: t.summary,
    url: abs(`/treatments/${t.slug}/`),
    image: abs(`/assets/img/${t.image}.webp`),
    provider: site.locations.map((l) => ({ '@id': bizId(l) })),
    areaServed: { '@type': 'Place', name: 'Uluwatu, Bali' },
    offers: (t.prices || [t.price]).map((p, i) => ({
      '@type': 'Offer',
      price: p,
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      description: `${(t.durations || [t.duration])[i]} min — tax & service included`,
      url: abs(`/treatments/${t.slug}/`),
    })),
  };
}

function faqPage(faqs, path) {
  if (!faqs || !faqs.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': abs(path + '#faq'),
    mainEntity: faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: stripTags(a) },
    })),
  };
}

function breadcrumbs(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: abs(path),
    })),
  };
}

function article(a) {
  return {
    '@type': 'BlogPosting',
    '@id': abs(`/journal/${a.slug}/#article`),
    headline: a.title,
    description: a.description,
    abstract: a.answer,
    image: abs(`/assets/img/${a.image}.webp`),
    datePublished: a.date,
    dateModified: a.updated || a.date,
    inLanguage: 'en',
    articleSection: a.category,
    author: { '@type': 'Organization', name: 'POINT · FACE Expert Therapists', url: abs('/about/') },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: abs(`/journal/${a.slug}/`),
    about: a.related.map((s) => ({ '@id': abs(`/treatments/${s}/#service`) })),
  };
}

function webPage(path, title, description, extra = {}) {
  return {
    '@type': 'WebPage',
    '@id': abs(path),
    url: abs(path),
    name: title,
    description,
    isPartOf: { '@id': SITE_ID },
    inLanguage: 'en',
    ...extra,
  };
}

const graph = (...nodes) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': [organization(), website(), ...nodes.filter(Boolean)] });

module.exports = { graph, business, service, faqPage, breadcrumbs, article, webPage, aggregateFor, bizId };
