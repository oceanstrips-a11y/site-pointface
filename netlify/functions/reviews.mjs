// Live Google reviews for both studios, via the official Google Places API (New).
// Google's terms do not allow storing reviews, so they are fetched on request (short cache) and
// rendered client-side on top of the build-time Fresha reviews.
//
// Environment variables (Netlify → Site configuration → Environment variables):
//   GOOGLE_PLACES_API_KEY       API key with "Places API (New)" enabled
//   GOOGLE_PLACE_ID_UNGASAN     Place ID of POINT · FACE Uluwatu Ungasan
//   GOOGLE_PLACE_ID_BINGIN      Place ID of POINT · FACE Uluwatu Bingin

const LOCATIONS = [
  { id: 'ungasan', name: 'Uluwatu Ungasan', env: 'GOOGLE_PLACE_ID_UNGASAN' },
  { id: 'bingin', name: 'Uluwatu Bingin', env: 'GOOGLE_PLACE_ID_BINGIN' },
];
const MIN_RATING = 4;

async function fetchPlace(placeId, key) {
  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`, {
    headers: {
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
    },
  });
  if (!res.ok) throw new Error(`Places API ${res.status}`);
  return res.json();
}

export default async () => {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const out = { source: 'google', summary: {}, reviews: [] };
  if (!key) return Response.json(out, { headers: { 'Cache-Control': 'no-store' } });

  await Promise.all(
    LOCATIONS.map(async (loc) => {
      const placeId = process.env[loc.env];
      if (!placeId) return;
      try {
        const p = await fetchPlace(placeId, key);
        out.summary[loc.id] = { google: { rating: p.rating, count: p.userRatingCount, url: p.googleMapsUri } };
        for (const r of p.reviews || []) {
          const text = (r.originalText || r.text || {}).text || '';
          if (!text || r.rating < MIN_RATING) continue;
          out.reviews.push({
            source: 'google',
            location: loc.id,
            locationName: loc.name,
            author: r.authorAttribution?.displayName || 'Google user',
            authorUrl: r.authorAttribution?.uri || null,
            rating: r.rating,
            text,
            date: r.publishTime || null,
            dateLabel: r.relativePublishTimeDescription || '',
            url: r.googleMapsUri || p.googleMapsUri,
          });
        }
      } catch (e) {
        console.error(loc.id, e.message);
      }
    })
  );
  out.reviews.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  // 15-minute cache at Netlify's edge keeps Google API calls (and cost) low on busy days.
  return Response.json(out, { headers: { 'Cache-Control': 'public, max-age=900', 'Netlify-CDN-Cache-Control': 'public, s-maxage=900' } });
};

export const config = { path: '/api/reviews' };
