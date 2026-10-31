// Central configuration — edit this file to update contact details, links and locations.
// Every value marked TODO must be confirmed before going live (wrong data in structured
// data hurts both Google and AI-assistant visibility).

module.exports = {
  name: 'POINT · FACE',
  plainName: 'Point Face',
  legalName: 'PT Gratitude Wellness Bali',
  tagline: 'Expert Facials · Uluwatu, Bali',
  // TODO: replace with the final domain (no trailing slash).
  url: 'https://www.pointfacebali.com',
  locale: 'en',
  description:
    'POINT · FACE is an expert facial studio in Uluwatu, Bali, with two studios in Ungasan and Bingin. Korean Hydrafacials, HydroJelly facials, Balinese natural facials and face-sculpting massages (Kobido, Buccal, Gua Sha). Every treatment starts with a free skin analysis using AI-powered diagnostic technology. Rated 4.9/5 on Fresha, with more than 2,000 clients welcomed.',
  instagram: 'https://www.instagram.com/pointfacebali/',
  instagramHandle: '@pointfacebali',
  email: '', // TODO: add a public contact email if you want it displayed
  priceNote: 'All prices include 15% government tax & service charge. No additional fees.',
  priceRange: 'IDR 250,000 – 2,250,000',
  brands: ['COSRX', 'SKIN1004', 'Beauty of Joseon', 'Mediheal', 'Medicube', 'Utama Spice', 'Embun'],

  locations: [
    {
      id: 'ungasan',
      slug: 'uluwatu-ungasan',
      name: 'Uluwatu Ungasan',
      fullName: 'POINT · FACE Uluwatu Ungasan',
      street: 'Jl. Toya Ning II No. 99',
      locality: 'Ungasan, Kuta Selatan',
      region: 'Bali',
      postalCode: '80361',
      country: 'ID',
      // WhatsApp number in international format, digits only.
      whatsapp: '628133793880',
      phoneDisplay: '+62 813 3793 880',
      fresha: 'https://www.fresha.com/a/point-face-bali-ungasan-kec-kuta-sel-kabupaten-badung-jalan-toya-ning-ii-no-99-no6mqclf?pId=2696384',
      // Google Maps share link of the studio (used for "Directions").
      maps: 'https://share.google/cNO72dbWv5qfZQgRg',
      // Opening hours (used in Google structured data). Sunday opens at 12:00.
      hours: {
        opens: '10:00', closes: '19:00',
        label: 'Mon–Sat · 10:00 – 19:00 · Sun · 12:00 – 19:00',
        spec: [
          { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '19:00' },
          { days: ['Sunday'], opens: '12:00', closes: '19:00' },
        ],
      },
      geo: null, // e.g. { lat: -8.83, lng: 115.17 } — TODO from Google Maps
      intro:
        'Our first studio, on Jl. Toya Ning in Ungasan — ten minutes from Melasti, Pandawa and the Uluwatu clifftop villas. Calm treatment rooms, Hydrafacial technology and a complimentary skin analysis before every facial.',
      nearby: ['Melasti Beach', 'Pandawa Beach', 'Ungasan clifftop villas', 'Nusa Dua (15 min)', 'Jimbaran (15 min)'],
    },
    {
      id: 'bingin',
      slug: 'uluwatu-bingin',
      name: 'Uluwatu Bingin',
      fullName: 'POINT · FACE Uluwatu Bingin',
      street: 'Bingin Downtown Avenue, Jl. Pantai Cemongkak No. 9',
      locality: 'Pecatu, Kuta Selatan',
      region: 'Bali',
      postalCode: '80361',
      country: 'ID',
      whatsapp: '6282339078379',
      phoneDisplay: '+62 823 3907 8379',
      fresha: 'https://www.fresha.com/en/a/point-face-facial-spa-bingin-pecatu-jl-pantai-cemongkak-no-9-dnxbd6ct?pId=2696384',
      maps: 'https://share.google/bFhLCCwXIVCowcxSQ',
      hours: {
        opens: '10:00', closes: '19:00',
        label: 'Mon–Sat · 10:00 – 19:00 · Sun · 12:00 – 19:00',
        spec: [
          { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '19:00' },
          { days: ['Sunday'], opens: '12:00', closes: '19:00' },
        ],
      },
      geo: null,
      intro:
        'Our Bingin studio sits in the heart of the surf village, a few minutes from Bingin, Dreamland, Padang Padang and Uluwatu beaches — made for post-surf skin repair, sun recovery and a glow before sunset.',
      nearby: ['Bingin Beach', 'Dreamland Beach', 'Padang Padang', 'Uluwatu Temple', 'Suluban'],
    },
  ],

  nav: [
    { label: 'Treatments', href: '/treatments/' },
    { label: 'Packages', href: '/packages/' },
    { label: 'Skin Concerns', href: '/concerns/' },
    { label: 'Studios', href: '/locations/' },
    { label: 'Journal', href: '/journal/' },
    { label: 'About', href: '/about/', mobileOnly: true }, // in the mobile menu + footer; keeps the desktop menu clear of the centred line
  ],
};
