#!/usr/bin/env node
// Pulls the public rating and latest reviews from each studio's Fresha page into
// src/data/reviews.json (Fresha has no public API). Run daily by .github/workflows/sync-reviews.yml.
//
// Fresha venue pages embed schema.org JSON-LD (aggregateRating + review) and a Next.js data blob.
// We read both, best-effort: if a page cannot be parsed, the previous data for that studio is kept.
//
// Override URLs with env FRESHA_URL_UNGASAN / FRESHA_URL_BINGIN, otherwise src/data/site.js is used.
const fs = require('fs');
const path = require('path');
const site = require('../src/data/site');

const FILE = path.join(__dirname, '../src/data/reviews.json');
const MIN_RATING = 4;
const MAX_PER_LOCATION = 12;

const prev = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : { summary: {}, reviews: [] };

function jsonLdBlocks(html) {
  const out = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try { out.push(JSON.parse(m[1].trim())); } catch (e) { /* ignore malformed block */ }
  }
  return out;
}

function nextData(html) {
  const m = html.match(/<script[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch (e) { return null; }
}

// Walk any JSON value, calling fn on every object.
function walk(v, fn) {
  if (Array.isArray(v)) v.forEach((x) => walk(x, fn));
  else if (v && typeof v === 'object') { fn(v); Object.values(v).forEach((x) => walk(x, fn)); }
}

const num = (x) => (x == null ? NaN : parseFloat(x));

function parse(html) {
  let rating = NaN, count = NaN;
  const reviews = [];

  walk(jsonLdBlocks(html), (o) => {
    if (o.aggregateRating && isNaN(rating)) {
      rating = num(o.aggregateRating.ratingValue);
      count = num(o.aggregateRating.reviewCount || o.aggregateRating.ratingCount);
    }
    if (o['@type'] === 'Review' && o.reviewBody) {
      reviews.push({
        author: (o.author && (o.author.name || o.author)) || 'Fresha client',
        rating: num(o.reviewRating && o.reviewRating.ratingValue) || 5,
        text: String(o.reviewBody).trim(),
        date: o.datePublished || null,
      });
    }
  });

  // Fallback: review-like objects in the Next.js payload ({ rating, text|comment, ... }).
  if (!reviews.length) {
    walk(nextData(html), (o) => {
      const r = num(o.rating ?? o.score);
      const text = o.text || o.comment || o.content || o.reviewText;
      if (r >= 1 && r <= 5 && typeof text === 'string' && text.length > 15) {
        const author = o.authorName || o.customerName || o.name || (o.author && (o.author.name || o.author.firstName)) || 'Fresha client';
        reviews.push({ author: String(author), rating: r, text: text.trim(), date: o.createdAt || o.date || o.publishedAt || null });
      }
    });
  }
  return { rating, count, reviews };
}

(async () => {
  const summary = { ...(prev.summary || {}) };
  let reviews = (prev.reviews || []).filter((r) => r.source !== 'fresha');
  let changed = false;

  for (const loc of site.locations) {
    const url = process.env[`FRESHA_URL_${loc.id.toUpperCase()}`] || loc.fresha;
    const previous = (prev.reviews || []).filter((r) => r.source === 'fresha' && r.location === loc.id);
    if (!url || /fresha\.com\/?$/.test(url)) {
      console.warn(`[${loc.id}] no Fresha venue URL configured — skipped`);
      reviews.push(...previous);
      continue;
    }
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PointFaceReviewSync/1.0)', 'Accept-Language': 'en' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = parse(await res.text());
      if (isNaN(data.rating) && !data.reviews.length) throw new Error('no rating or reviews found in page');

      if (!isNaN(data.rating)) {
        summary[loc.id] = { ...(summary[loc.id] || {}), fresha: { rating: data.rating, count: isNaN(data.count) ? null : data.count, url } };
      }
      const seen = new Set();
      const fresh = data.reviews
        .filter((r) => r.rating >= MIN_RATING && r.text)
        .filter((r) => { const k = r.author + r.text.slice(0, 40); if (seen.has(k)) return false; seen.add(k); return true; })
        .slice(0, MAX_PER_LOCATION)
        .map((r) => ({ source: 'fresha', location: loc.id, locationName: loc.name, url, ...r }));
      reviews.push(...(fresh.length ? fresh : previous));
      changed = true;
      console.log(`[${loc.id}] Fresha ${data.rating} (${data.count}) · ${fresh.length} reviews`);
    } catch (e) {
      console.warn(`[${loc.id}] Fresha sync failed: ${e.message} — keeping previous data`);
      reviews.push(...previous);
    }
  }

  if (!changed) return console.log('Nothing updated.');
  reviews.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  fs.writeFileSync(FILE, JSON.stringify({ updatedAt: new Date().toISOString(), summary, reviews }, null, 2) + '\n');
  console.log(`Wrote ${reviews.length} reviews → src/data/reviews.json`);
})();
