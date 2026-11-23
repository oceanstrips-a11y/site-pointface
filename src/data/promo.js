// Time-limited offer: page /black-friday/ + pop-up on every page.
// start / end are dates in Bali time (UTC+8), both included. Outside these dates the pop-up never
// shows and the page tells visitors the offer has ended. Set `promo` to null to remove it entirely.
module.exports = {
  id: 'black-friday-2026',
  slug: 'black-friday',
  start: '2026-11-23',
  end: '2026-11-29',
  dates: 'November 23–29, 2026',
  title: 'Black Friday Week at POINT · FACE',
  description:
    'Black Friday in Bali: 35% off our 3 best-selling Korean Hydrafacials and bonus credit on gift cards (+15% to +25%), November 23–29, 2026 at POINT · FACE Ungasan & Bingin.',
  intro:
    'Rainy season has just started in Bali… but it doesn’t matter, because Black Friday is here at POINT · FACE Ungasan & Bingin.',
  discount: '35% OFF',
  // Applied to the full price (the struck-through price when a treatment has one).
  percent: 35,
  facials: ['ultimate-korean-glass-skin-hydralift', 'advanced-collagen-booster', 'k-balance-acne-clear'],
  // Exact prices as on Fresha (full price → Black Friday price), shown on the offer page only.
  prices: {
    'ultimate-korean-glass-skin-hydralift': [1733333, 1126667],
    'advanced-collagen-booster': [1666667, 1083333],
    'k-balance-acne-clear': [1200000, 780000],
  },
  giftCards: [
    [1500000, 1725000, '+15%'],
    [2000000, 2400000, '+20%'],
    [3000000, 3750000, '+25%'],
  ],
  giftCardText:
    'Treat yourself: buy a gift card now, enjoy extra credit and use it on any treatment over the next 3 months. Christmas is coming — pay less, give more, and spoil someone you love with a little self-care.',
  terms: [
    'Valid from November 23–29, 2026.',
    '35% discount applies to regular full prices on the 3 selected facials only.',
    'Offers cannot be combined with other promotions or discounts.',
    'Gift cards are valid for 3 months from the date of purchase.',
    'Gift cards can only be redeemed for treatments, at the studio where they were purchased (Ungasan or Bingin).',
    'Gift cards can be purchased via WhatsApp or directly in-store.',
  ],
  images: { facials: 'black-friday-35-off', giftCards: 'black-friday-gift-cards' },
  // Offer visuals for each facial on the offer page (instead of the usual treatment photo).
  facialVisuals: { 'ultimate-korean-glass-skin-hydralift': 'bf-ultimate', 'advanced-collagen-booster': 'bf-collagen', 'k-balance-acne-clear': 'bf-kbalance' },
};
