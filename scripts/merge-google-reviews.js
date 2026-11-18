#!/usr/bin/env node
// Merge Google Business Profile reviews into src/data/reviews.json.
// Usage: node scripts/merge-google-reviews.js path/to/google-reviews.json
// Input: { summary: { <studioId>: { rating, count, url } }, reviews: [{ id, location, author, date, text, rating? }] }
// (exported from Google Business Profile, e.g. through Windsor.ai). Only 5-star reviews with
// real text are kept; reviews already on the site are kept too, so the list grows over time.
const fs = require('fs');
const path = require('path');
const site = require('../src/data/site');

const FILE = path.join(__dirname, '../src/data/reviews.json');
const MIN_LENGTH = 25;

const input = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

for (const [id, g] of Object.entries(input.summary || {})) {
  data.summary[id] = data.summary[id] || {};
  data.summary[id].google = { rating: g.rating, count: g.count, url: g.url };
}

const byId = new Map(data.reviews.map((r) => [r.id, r]));
for (const r of input.reviews || []) {
  const text = String(r.text || '').replace(/\s+/g, ' ').trim();
  if ((r.rating || 5) !== 5 || text.length < MIN_LENGTH || /\(Translated by Google\)/.test(text)) continue;
  const loc = site.locations.find((l) => l.id === r.location);
  if (!loc) continue;
  byId.set(r.id, { id: r.id, source: 'google', rating: 5, author: r.author, date: r.date, text, location: loc.id, locationName: loc.fullName });
}

data.reviews = [...byId.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
data.updatedAt = new Date().toISOString().slice(0, 10);
fs.writeFileSync(FILE, JSON.stringify(data, null, 1) + '\n');
console.log(`${data.reviews.length} reviews on the site (${data.reviews.filter((r) => r.location === 'ungasan').length} Ungasan, ${data.reviews.filter((r) => r.location === 'bingin').length} Bingin)`);
