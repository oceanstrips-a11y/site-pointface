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

const waText = (loc, treatment) =>
  `Hi POINT · FACE ${loc.name}! I'd like to book ${treatment ? 'the ' + treatment : 'a treatment'}. ` +
  'Could you tell me your availability?';

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

module.exports = { esc, stripTags, idr, idrK, abs, waLink, waText, img, fmtDate };
