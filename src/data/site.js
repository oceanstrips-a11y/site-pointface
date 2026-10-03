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
    'POINT · FACE is an expert facial studio in Uluwatu, Bali, with two studios in Ungasan and Bingin. Korean Hydrafacials, HydroJelly facials, Balinese natural facials and face-sculpting massages (Kobido, Buccal, Gua Sha). Every treatment starts with a complimentary professional skin analysis.',
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
      street: 'Jl. Toya Ning II No. 11',
      locality: 'Ungasan, Kuta Selatan',
      region: 'Bali',
      postalCode: '80351',
      country: 'ID',
      // WhatsApp number in international format, digits only.
      whatsapp: '628133793880',
      phoneDisplay: '+62 813 3793 880',
      // TODO: paste the Fresha booking link of the Ungasan studio.
      fresha: 'https://www.fresha.com/',
      // TODO: paste the Google Maps share link of the studio (used for "Directions").
      maps: 'https://www.google.com/maps/search/?api=1&query=POINT%20FACE%20Jl.%20Toya%20Ning%20II%20No.%2011%20Ungasan%20Bali',
      // TODO: confirm opening hours (used in Google structured data).
      hours: { days: 'Mo-Su', opens: '10:00', closes: '19:00', label: 'Every day · 10:00 – 19:00' },
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
      // TODO: full street address of the Bingin studio.
      street: 'Bingin',
      locality: 'Pecatu, Kuta Selatan',
      region: 'Bali',
      postalCode: '80361',
      country: 'ID',
      // TODO: confirm whether Bingin uses its own WhatsApp number.
      whatsapp: '628133793880',
      phoneDisplay: '+62 813 3793 880',
      // TODO: paste the Fresha booking link of the Bingin studio.
      fresha: 'https://www.fresha.com/',
      maps: 'https://www.google.com/maps/search/?api=1&query=POINT%20FACE%20Bingin%20Uluwatu%20Bali',
      hours: { days: 'Mo-Su', opens: '10:00', closes: '19:00', label: 'Every day · 10:00 – 19:00' },
      geo: null,
      intro:
        'Our Bingin studio sits in the heart of the surf village, a few minutes from Bingin, Dreamland, Padang Padang and Uluwatu beaches — made for post-surf skin repair, sun recovery and a glow before sunset.',
      nearby: ['Bingin Beach', 'Dreamland Beach', 'Padang Padang', 'Uluwatu Temple', 'Suluban'],
    },
  ],

  nav: [
    { label: 'Treatments', href: '/treatments/' },
    { label: 'Skin Concerns', href: '/concerns/' },
    { label: 'Studios', href: '/locations/' },
    { label: 'Journal', href: '/journal/' },
    { label: 'About', href: '/about/' },
  ],
};
