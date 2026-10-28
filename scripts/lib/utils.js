const site = require('../../src/data/site');
const images = require('../../src/data/images.json');

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const stripTags = (s = '') => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const idr = (n) => 'IDR ' + Number(n).toLocaleString('en-US');
// Short form used in compact lists: 1,300K
const idrK = (n) => (n / 1000).toLocaleString('en-US') + 'K';

const abs = (path) => site.url + path;

const waLink = (loc, text) =>
  `https://wa.me/${loc.whatsapp}?text=${encodeURIComponent(text)}`;

const bookingLinks = require('../../src/data/booking-links');

// "Ultimate Korean Glass Skin & Hydralift (80 min · IDR 1,300,000)"
const treatmentLabel = (t) =>
  `${t.name} (${(t.durations || [t.duration]).join('/')} min · ${(t.prices || [t.price]).map(idr).join(' / ')})`;

// treatment: a treatment object (personalised message) or a free label such as "Duo Package".
const waText = (loc, treatment) => {
  const what = !treatment ? 'a treatment' : typeof treatment === 'string' ? `the ${treatment}` : `the ${treatmentLabel(treatment)}`;
  return `Hi POINT · FACE ${loc.name}! I'd like to book ${what}. Could you tell me your availability?`;
};

// Fresha link(s) of a treatment (or a package name such as "Duo Package") at a studio:
// a URL, { '30 min': url, '60 min': url } for several durations, or '' when unknown.
const freshaLinks = (t, loc) => {
  const key = typeof t === 'string' ? t.toLowerCase().replace(/[^a-z0-9]+/g, '-') : t && t.slug;
  return (key && bookingLinks[key] && bookingLinks[key][loc.id]) || '';
};

// Single direct Fresha link (first duration when there are several), falling back to the studio page.
const freshaFor = (t, loc) => {
  const l = freshaLinks(t, loc);
  return (typeof l === 'object' ? Object.values(l)[0] : l) || loc.fresha;
};

// Studios offering a treatment (HydroJelly: Ungasan only, Body: Bingin only).
const locationsFor = (t) => site.locations.filter((l) => !t || !t.onlyAt || t.onlyAt === l.id);

// Attributes for any "Book" button: the booking panel reads them to personalise WhatsApp + Fresha.
const bookAttrs = (t) => {
  if (!t) return 'data-book';
  const fresha = (l) => {
    const links = freshaLinks(t, l);
    // Several durations are passed as JSON for the booking panel to list them.
    return ` data-fresha-${l.id}="${esc(typeof links === 'object' ? JSON.stringify(links) : links || l.fresha)}"`;
  };
  if (typeof t === 'string') return `data-book data-treatment="${esc(t)}"` + site.locations.map(fresha).join('');
  return (
    `data-book data-treatment="${esc(treatmentLabel(t))}"` +
    (t.onlyAt ? ` data-only="${t.onlyAt}"` : '') +
    locationsFor(t).map(fresha).join('')
  );
};

/**
 * Responsive <img> using the two generated WebP sizes.
 * opts: { sizes, eager, className, attrs }
 */
function img(name, alt, opts = {}) {
  const lg = images[name];
  const sm = images[name + '-sm'];
  if (!lg) throw new Error(`Unknown image: ${name}`);
  const sizes = opts.sizes || '(max-width: 760px) 100vw, 50vw';
  const loading = opts.eager ? 'eager" fetchpriority="high' : 'lazy';
  return (
    `<img src="/assets/img/${name}.webp" ` +
    (sm ? `srcset="/assets/img/${name}-sm.webp ${sm[0]}w, /assets/img/${name}.webp ${lg[0]}w" sizes="${sizes}" ` : '') +
    `width="${lg[0]}" height="${lg[1]}" alt="${esc(alt)}" loading="${loading}" decoding="async"` +
    (opts.className ? ` class="${opts.className}"` : '') +
    (opts.attrs ? ' ' + opts.attrs : '') +
    '>'
  );
}

const fmtDate = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

module.exports = { esc, stripTags, idr, idrK, abs, waLink, waText, img, fmtDate, treatmentLabel, freshaLinks, freshaFor, locationsFor, bookAttrs };
