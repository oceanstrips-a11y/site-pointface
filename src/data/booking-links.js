// Per-treatment Fresha links — paste the direct Fresha booking link of each service here.
// How to get one: on fresha.com open your studio page, click the service, then copy the URL
// from the address bar (it contains "offerItems=sv%3A…"; drop the "&cartId=…" part, it is a temporary basket). Leave '' to fall back to the studio page.
// Keys are treatment slugs (see src/data/treatments.js); ungasan / bingin are the studios.
module.exports = {
  'ultimate-korean-glass-skin-hydralift': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A25278582&pId=2696384', bingin: '' },
  'advanced-collagen-booster': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A26713717&pId=2696384', bingin: '' },
  'pdrn-cellular-repair-salmon-dna': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A26713654&pId=2696384', bingin: '' },
  'k-balance-acne-clear': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A25278614&pId=2696384', bingin: '' },
  'vitamin-c-sunshine-glow': { ungasan: '', bingin: '' },
  'caviar-luxury-anti-aging-lift': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A26713560&pId=2696384' },
  'cryo-skin-reset': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A26713403&pId=2696384' },
  'bright-pigment-correct': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A26713821&pId=2696384' },
  'balinese-hydrating-ritual-rose-aloe': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A25278505&pId=2696384', bingin: '' },
  'balinese-purifying-ritual-clay-turmeric': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A25278530&pId=2696384', bingin: '' },
  'signature-back-acne-pore-clear': { bingin: '' },
  'back-smooth-hydrating': { bingin: '' },
  'signature-chest-firm-collagen': { bingin: '' },
  'chest-hydrating': { bingin: '' },
  'chest-bright-pigment-correct': { bingin: '' },
  'chest-spot-acne-clear': { bingin: '' },
  'signature-booty-bump-clear': { bingin: '' },
  'booty-firm-smooth': { bingin: '' },
  // Several durations: one link per duration, the booking panel shows one Fresha choice each.
  'kobido-massage': {
    ungasan: {
      '30 min': 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A25287747&pId=2696384',
      '60 min': 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A25287767&pId=2696384',
    },
    bingin: '',
  },
  'buccal-massage': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A27352076&pId=2696384', bingin: '' },
  'gua-sha-massage': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A26123231&pId=2696384', bingin: '' },
  'point-face-relaxation-ritual': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=sv%3A26123251&pId=2696384', bingin: '' },
  // Packages (key = package name in lower-case with dashes).
  'duo-package': { ungasan: 'https://www.fresha.com/a/point-face-facial-spa-uluwatu-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-asjb69tt/booking?offerItems=p%3A1697418&pId=2696384', bingin: '' },
};
