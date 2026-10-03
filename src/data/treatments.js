// Treatment menu — source: POINT · FACE Treatments Menu (Expert Facials, Hydrafacials, Massages, Add-ons).
// Prices in IDR, tax & service included.

const categories = [
  {
    id: 'korean-hydrafacials',
    name: 'Korean Advanced Hydrafacials',
    short: 'Korean Hydrafacials',
    intro:
      'Technology-led facials combining hydrodermabrasion, ultrasonic infusion, radiofrequency, microcurrent and LED with Korean actives from COSRX, SKIN1004, Mediheal and Medicube.',
  },
  {
    id: 'hydrojelly-hydrafacials',
    name: 'HydroJelly Hydrafacials',
    short: 'HydroJelly Hydrafacials',
    intro:
      'Our Hydrafacials finished with an electrolyte-infused HydroJelly mask that seals in actives — for heat-stressed, mature or pigmented skin.',
  },
  {
    id: 'balinese-natural-facials',
    name: 'Natural Facials',
    short: 'Facials',
    intro:
      'Gentle, sensory facials with 100% natural skincare from Utama Spice & Embun: rose, aloe, clay, turmeric, coconut and jojoba.',
  },
  {
    id: 'face-massages',
    name: 'Face Massages',
    short: 'Face Massages',
    intro:
      'Manual face-sculpting and relaxation techniques — Kobido, Buccal and Gua Sha — for lifting, depuffing and releasing deep facial tension.',
  },
];

const treatments = [
  {
    slug: 'ultimate-korean-glass-skin-hydralift',
    name: 'Ultimate Korean Glass Skin & Hydralift',
    category: 'korean-hydrafacials',
    badge: 'Signature · Bestseller',
    want: 'I want instant glow, deep hydration & glass skin',
    pillars: ['Lift', 'Hydrate', 'Glass skin'],
    duration: 80,
    price: 1300000,
    priceWas: 1732500,
    image: 'korean-glass-skin-hydrafacial',
    recommendedFor: 'Dull, dehydrated or tired skin needing instant radiance.',
    summary:
      'Our signature Korean Hydrafacial: 17+ advanced steps to deeply cleanse, hydrate, lift and refine the skin for a true glass-skin finish.',
    description:
      'The signature POINT · FACE experience. We combine Hydrafacial hydrodermabrasion with Korean actives — peptides, snail mucin, propolis, niacinamide and centella — infused with ultrasound, then finish with oxygen, high-frequency, cold hammer and dual red & green LED. Skin is decongested, plumped with water and visibly lifted, with that luminous "glass skin" reflection Korean skincare is known for. Features COSRX, SKIN1004 and Beauty of Joseon.',
    ingredients: ['6 Peptide Skin Booster', 'Snail Mucin', 'Hyaluronic Acid', 'Propolis + Niacinamide', 'BHA', 'Centella Asiatica'],
    technologies: ['Hydrodermabrasion', 'Ultrasonic infusion', 'Oxygen therapy', 'LED light therapy (red & green)', 'High Frequency therapy', 'Cold Hammer'],
    results: ['Immediate glow & plump effect', 'Refined, decongested pores', 'Glass-like skin texture', 'Deep, lasting hydration'],
    bestResults: '1 session for instant glow · 3 sessions for long-term skin transformation.',
    concerns: ['dehydrated-skin-bali', 'dull-tired-skin-glass-skin', 'fine-lines-wrinkles-bali'],
    faqs: [
      ['How long does the glass-skin glow last?', 'The glow and plumpness are visible immediately and usually last 5–7 days. For lasting change in texture and hydration, we recommend a series of 3 sessions spaced 2–3 weeks apart.'],
      ['Is it suitable for sensitive skin?', 'Yes. Your therapist adapts the exfoliation and actives after the complimentary skin analysis. Let us know about any reactivity, retinoid use or recent sunburn before your session.'],
      ['Can I book it with a friend?', 'Yes — the Duo Package includes two Ultimate Korean Glass Skin treatments for IDR 2,250,000, in shared or separate cabins.'],
    ],
  },
  {
    slug: 'advanced-collagen-booster',
    name: 'Advanced Collagen Booster',
    category: 'korean-hydrafacials',
    badge: 'Most Loved',
    want: 'I want firmer, lifted & younger-looking skin',
    pillars: ['Firmness', 'Collagen', 'Lift'],
    duration: 70,
    price: 1250000,
    priceWas: 1617000,
    image: 'collagen-booster-facial',
    recommendedFor: 'Anyone looking to boost firmness and elasticity and keep a plump complexion.',
    summary:
      'A collagen-stimulating Korean Hydrafacial combining peptide infusion, radiofrequency lifting and microcurrent sculpting.',
    description:
      'Designed as a monthly "skin gym" session. After hydrodermabrasion we infuse a triple collagen serum and peptides, then work the facial contours with microcurrent sculpting and radiofrequency to support firmness and elasticity. Red LED finishes the treatment to support collagen production. Features COSRX, SKIN1004, Mediheal and Medicube.',
    ingredients: ['Triple Collagen Serum', 'Collagen Mask', 'Collagen Cream', '6 Peptide Skin Booster', 'Snail Mucin & Retinol', 'Centella Asiatica'],
    technologies: ['Hydrodermabrasion', 'Ultrasonic infusion', 'Oxygen therapy', 'LED light therapy (red)', 'High Frequency therapy', 'Microcurrent sculpting'],
    results: ['Immediate glow & plump effect', 'Reduced look of fine lines', 'Improved elasticity', 'Sculpted jawline & cheekbones'],
    bestResults: 'Recommended as a monthly collagen-booster treatment.',
    concerns: ['fine-lines-wrinkles-bali', 'puffiness-jaw-tension'],
    faqs: [
      ['Does microcurrent hurt?', 'No. Most clients feel a light tingling or nothing at all. The current is very low and the session is relaxing.'],
      ['How is it different from the Caviar facial?', 'The Collagen Booster focuses on firmness with microcurrent and peptides and is ideal as a monthly routine. The Caviar Luxury facial is more indulgent, with caviar infusion, RF lifting, an eye ultrasonic step and a HydroJelly mask — perfect before an event.'],
    ],
  },
  {
    slug: 'pdrn-cellular-repair-salmon-dna',
    name: 'PDRN Cellular Repair (Salmon DNA)',
    category: 'korean-hydrafacials',
    badge: 'New generation',
    want: 'I want calmer, stronger & regenerated skin',
    pillars: ['Repair', 'Regenerate', 'Restore'],
    duration: 60,
    price: 1300000,
    priceWas: null,
    image: 'pdrn-salmon-dna-facial',
    recommendedFor: 'Sensitive, dehydrated or stressed skin; skin recovering from sun, travel or breakouts.',
    summary:
      'An advanced regenerative Korean Hydrafacial powered by PDRN (salmon DNA) to repair the skin barrier and accelerate recovery.',
    description:
      'PDRN (polydeoxyribonucleotide) is a DNA fragment derived from salmon, widely used in Korean dermatology for its skin-repairing properties. In this facial we use topical PDRN serums and a Rose PDRN mask — no needles — combined with gentle hydrodermabrasion, ultrasonic infusion, oxygen and red LED to calm redness, strengthen the barrier and help skin bounce back. Features COSRX, SKIN1004, Mediheal and Medicube.',
    ingredients: ['PDRN — Salmon DNA', 'PDRN Pink Peptide Serum', 'Rose PDRN Mask', 'Hyaluronic Acid', '6 Peptide Skin Booster', 'Centella Asiatica'],
    technologies: ['Hydrodermabrasion', 'Ultrasonic infusion', 'Oxygen therapy', 'LED light therapy (red)', 'High Frequency therapy', 'Microcurrent sculpting'],
    results: ['Stronger skin barrier', 'Reduced sensitivity & redness', 'Deep skin recovery', 'Healthier, resilient skin'],
    bestResults: 'Ideal after sun exposure, stress, long-haul travel or skin damage.',
    concerns: ['sensitive-reactive-skin', 'sun-damaged-skin-bali', 'dehydrated-skin-bali'],
    faqs: [
      ['Is the PDRN facial an injection?', 'No. This is a non-invasive facial: PDRN is applied topically in serums and masks and pushed deeper with ultrasound. There are no needles and no downtime.'],
      ['Is PDRN safe if I am allergic to fish?', 'Please tell us before booking. If you have a fish or salmon allergy we will recommend an alternative such as the Cryo Skin Reset or the Hydrating Ritual.'],
    ],
  },
  {
    slug: 'k-balance-acne-clear',
    name: 'K-Balance Acne Clear',
    category: 'korean-hydrafacials',
    badge: null,
    want: 'I want clearer, calmer & balanced skin',
    pillars: ['Purify', 'Balance', 'Clear'],
    duration: 60,
    price: 1200000,
    priceWas: null,
    image: 'acne-clear-facial',
    recommendedFor: 'Oily, acne-prone or congested skin; blackheads and active breakouts.',
    summary:
      'A targeted Korean Hydrafacial with tea tree, niacinamide and BHA to deep-clean pores, regulate sebum and calm inflammation.',
    description:
      'A deep pore-cleansing protocol for humid-climate skin. Double cleansing, AHA/BHA exfoliation and Hydrafacial vortex extraction decongest pores, followed by careful manual extraction where needed. Ultrasonic infusion of niacinamide and tea tree, antibacterial high frequency, cold hammer and red & blue LED calm breakouts and rebalance oil. Features COSRX, SKIN1004 and Mediheal.',
    ingredients: ['BHA (Salicylic Acid)', 'AHA/BHA', 'Niacinamide 15', 'Tea-Trica (Tea Tree)', 'Centella Asiatica', 'Hyaluronic Acid'],
    technologies: ['Hydrodermabrasion', 'Ultrasonic infusion', 'Manual extraction', 'LED light therapy (red & blue)', 'High Frequency therapy', 'Cold Hammer'],
    results: ['Deep pore cleansing', 'Regulated sebum', 'Clearer skin & fewer breakouts', 'Less inflammation'],
    bestResults: 'For active acne: a series of 3 sessions spaced 2–3 weeks apart, then one session every 2 months as maintenance.',
    concerns: ['acne-breakouts-bali'],
    faqs: [
      ['Will my skin purge after the facial?', 'Some clients notice a few small spots surfacing in the 48 hours after a deep-cleansing facial — it is congestion leaving the pores. It settles quickly when you follow the aftercare.'],
      ['Can I go in the sea after an acne facial?', 'We recommend waiting 24–48 hours before surfing, swimming or intense sun exposure, and always using SPF 50.'],
    ],
  },
  {
    slug: 'caviar-luxury-anti-aging-lift',
    name: 'Caviar Luxury Anti-Aging & Lift',
    category: 'hydrojelly-hydrafacials',
    badge: 'Most Loved',
    want: 'I want lifted, plump & youthful skin',
    pillars: ['Lift', 'Firm', 'Anti-aging'],
    duration: 70,
    price: 1500000,
    priceWas: 2070000,
    image: 'caviar-anti-aging-facial',
    recommendedFor: 'Mature or tired skin needing lifting and glow; before a special event.',
    summary:
      'A luxurious Hydrafacial combining caviar infusion, radiofrequency lifting and a sculpting massage to restore firmness and glow.',
    description:
      'Our most indulgent facial. Caviar extract, rich in omega-3, omega-6 and amino acids, is infused with ultrasound; radiofrequency and a sculpting & contouring massage lift the features; an eye ultrasonic step smooths the eye area; red & yellow LED and a Caviar Resilience HydroJelly mask seal everything in. Features COSRX, SKIN1004 and HydroJelly Mask.',
    ingredients: ['Caviar mask & infusion', 'Omega-3 & Omega-6', 'Amino acids', '6 Peptide Skin Booster', 'Snail Mucin', 'Collagen'],
    technologies: ['Hydrodermabrasion', 'Ultrasonic caviar infusion', 'Radiofrequency lifting', 'LED light therapy (red & yellow)', 'Sculpting & contouring massage', 'Eye ultrasonic'],
    results: ['Lifted skin & redefined contours', 'Collagen stimulation', 'Smoother, brighter eye area', 'Plumper, firmer texture'],
    bestResults: 'Ideal before special events or every 4–6 weeks as part of a regular routine.',
    concerns: ['fine-lines-wrinkles-bali', 'dull-tired-skin-glass-skin'],
    faqs: [
      ['When should I book it before a wedding or event?', 'Book it 2–5 days before the event for maximum lift and glow with zero risk of redness on the day.'],
      ['Is radiofrequency safe for all skin?', 'RF is not suitable during pregnancy or with metal implants or a pacemaker in the treated area. Your therapist checks this during the skin analysis.'],
    ],
  },
  {
    slug: 'cryo-skin-reset',
    name: 'Cryo Skin Reset',
    category: 'hydrojelly-hydrafacials',
    badge: 'After-sun',
    want: 'I want cooler, calmer & refreshed skin',
    pillars: ['Cool', 'Soothe', 'Recover'],
    duration: 60,
    price: 1050000,
    priceWas: null,
    image: 'hydrojelly-mask-treatment',
    recommendedFor: 'Sun-exposed, overheated, sensitive or reactive skin.',
    summary:
      'A refreshing Hydrafacial with cryo-globe massage and a cooling HydroJelly mask to calm overheated, sun-stressed skin.',
    description:
      'Made for Bali days. Gentle hydrodermabrasion and ultrasonic infusion of vitamin C & E, centella and hyaluronic acid, then a cryo-globe massage that instantly cools the skin and reduces the look of redness. A glacial clay & aloe step and a Blue Glacier Cryo HydroJelly mask restore comfort, finished with red & yellow LED. Features COSRX and SKIN1004.',
    ingredients: ['Cryo HydroJelly Mask', 'Vitamin C & E', 'Centella Asiatica', 'Glacial Clay & Aloe Vera', 'Hyaluronic Acid', 'Snail Mucin'],
    technologies: ['Hydrodermabrasion', 'Ultrasonic infusion', 'Oxygen infusion', 'LED light therapy (red & yellow)', 'High Frequency therapy', 'Cryo globe massage'],
    results: ['Calms overheated skin instantly', 'Tightened-looking pores', 'Reduced redness', 'Restored hydration'],
    bestResults: 'Ideal for sensitive or reactive skin every 2–3 weeks.',
    concerns: ['sun-damaged-skin-bali', 'sensitive-reactive-skin', 'dehydrated-skin-bali'],
    faqs: [
      ['Can I have it if I am sunburnt?', 'For mild redness and heat after a day in the sun, yes — it was designed for that. For blistering or peeling sunburn, wait until the skin has healed and ask us for advice.'],
    ],
  },
  {
    slug: 'bright-pigment-correct',
    name: 'Bright & Pigment Correct',
    category: 'hydrojelly-hydrafacials',
    badge: null,
    want: 'I want brighter, even & more radiant skin',
    pillars: ['Brighten', 'Even tone', 'Pigmentation'],
    duration: 60,
    price: 1100000,
    priceWas: null,
    image: 'brightening-pigmentation-facial',
    recommendedFor: 'Dullness, dark spots, uneven tone, sun spots and post-acne marks.',
    summary:
      'A brightening Korean Hydrafacial with vitamin C, niacinamide and an Illuminating Orange HydroJelly mask to even the tone.',
    description:
      'A Korean pigment-correction protocol: hydrodermabrasion lifts dull surface cells, then ultrasonic vitamin C infusion, niacinamide and green tea target uneven tone and post-acne marks. Radiofrequency, oxygen infusion, cold hammer and yellow & green LED refine and calm, and an Illuminating Orange HydroJelly mask locks in brightness. Features COSRX, SKIN1004 and HydroJelly Mask.',
    ingredients: ['Niacinamide', 'Vitamin C & B5', '6 Peptide Skin Booster', 'Snail Mucin', 'Centella Asiatica', 'Hyaluronic Acid & Green Tea'],
    technologies: ['Hydrodermabrasion', 'Ultrasonic vitamin C infusion', 'Radiofrequency lifting', 'LED light therapy (yellow & green)', 'Oxygen infusion', 'Cold Hammer'],
    results: ['Brighter, more even skin tone', 'Reduced look of dark spots & post-acne marks', 'Refined texture', 'Restored luminosity'],
    bestResults: 'Every 2–3 weeks as a series, then every 4–6 weeks for maintenance. Daily SPF 50 is essential.',
    concerns: ['pigmentation-dark-spots-bali', 'dull-tired-skin-glass-skin'],
    faqs: [
      ['How many sessions do I need for dark spots?', 'Most clients see a brighter, more even tone after one session. Pigmentation fades progressively over a series of 3–6 sessions, combined with strict daily sun protection.'],
    ],
  },
  {
    slug: 'balinese-hydrating-ritual-rose-aloe',
    name: 'Hydrating Ritual — Rose & Aloe',
    category: 'balinese-natural-facials',
    badge: '100% natural',
    want: 'I want soft, hydrated & glowing skin',
    pillars: ['Hydration', 'Comfort', 'Radiance'],
    duration: 45,
    price: 790000,
    priceWas: null,
    image: 'balinese-hydrating-facial',
    recommendedFor: 'Dry, sensitive or dehydrated skin needing comfort and glow.',
    summary:
      'A deeply hydrating and calming Balinese facial with aloe, rose and coconut oil from Utama Spice & Embun.',
    description:
      'A gentle, sensory ritual built on Balinese botanicals. Soft cleansing and exfoliation, an aloe hydrating mask with rose serum, and a slow relaxing massage with Balinese coconut oil. Perfect after a long flight or a few days of sun and sea.',
    ingredients: ['Aloe vera', 'Rose extract', 'Coconut oil (Utama Spice & Embun)'],
    technologies: ['Manual techniques', 'Aloe mask + rose serum', 'Relaxing coconut oil massage'],
    results: ['Soft & hydrated skin', 'Comfort restored', 'Natural radiant glow'],
    bestResults: 'A lovely first facial in Bali, or a monthly comfort ritual.',
    concerns: ['dehydrated-skin-bali', 'sensitive-reactive-skin'],
    faqs: [
      ['What is the difference between a facial and a Hydrafacial?', 'A traditional facial relies on manual techniques and natural products — a gentle, sensory ritual. A Hydrafacial adds technology (hydrodermabrasion, ultrasound, RF, LED) for deeper cleansing and more visible, measurable results.'],
    ],
  },
  {
    slug: 'balinese-purifying-ritual-clay-turmeric',
    name: 'Purifying Ritual — Clay & Turmeric',
    category: 'balinese-natural-facials',
    badge: '100% natural',
    want: 'I want clean, balanced & fresh skin',
    pillars: ['Detox', 'Purify', 'Balance'],
    duration: 60,
    price: 980000,
    priceWas: null,
    image: 'purifying-facial-texture',
    recommendedFor: 'Normal to combination skin requiring regular deep cleansing; blackheads.',
    summary:
      'A purifying Balinese facial with clay, turmeric and jojoba to deep-clean pores and rebalance oil.',
    description:
      'Balinese clay and turmeric detox the skin while deep cleansing and gentle extractions clear blackheads. A balancing jojoba massage finishes the ritual, leaving pores clean and the complexion fresh and matte-luminous. Uses natural skincare from Utama Spice & Embun.',
    ingredients: ['Clay', 'Turmeric', 'Jojoba oil (Utama Spice & Embun)'],
    technologies: ['Deep cleansing', 'Gentle extractions', 'Clay & turmeric detox mask', 'Jojoba balancing massage'],
    results: ['Clean, purified pores', 'Balanced oil levels', 'Fresh, healthy complexion'],
    bestResults: 'Every 4–6 weeks for regular deep cleansing.',
    concerns: ['acne-breakouts-bali'],
    faqs: [
      ['Will turmeric stain my skin?', 'No. We use a cosmetic turmeric formulation that is fully removed at the end of the treatment.'],
    ],
  },
  {
    slug: 'kobido-massage',
    name: 'Kobido Massage — Collagen Cream',
    category: 'face-massages',
    badge: 'Natural facelift',
    want: 'I want a natural, non-invasive lift',
    pillars: ['Lifting', 'Sculpting', 'Drainage'],
    duration: 60,
    durations: [30, 60],
    price: 500000,
    prices: [500000, 850000],
    priceWas: null,
    image: 'kobido-lifting-massage',
    recommendedFor: 'Puffiness, loss of firmness, tired features — anyone wanting a natural lift.',
    summary:
      'The Japanese facelift massage: deep lifting motions, lymphatic drainage and precise tapping with our collagen cream.',
    description:
      'Kobido is a traditional Japanese facial massage known as the "natural facelift". Fast, rhythmic lifting motions, lymphatic drainage and precise percussive tapping boost circulation, drain puffiness and tone the facial muscles. Paired with our collagen cream for a firmer, illuminated complexion.',
    ingredients: ['Collagen cream'],
    technologies: ['Deep lifting motions', 'Lymphatic drainage', 'Percussive tapping'],
    results: ['Natural, non-invasive lifting effect', 'Reduced puffiness & congestion', 'Firmer, illuminated complexion'],
    bestResults: '30 min as a quick depuff, 60 min for a full sculpting effect. A 3-session package is available.',
    concerns: ['puffiness-jaw-tension', 'fine-lines-wrinkles-bali'],
    faqs: [
      ['Kobido or Gua Sha — which should I choose?', 'Choose Kobido for a lifting, sculpting effect and Gua Sha for relaxation and gentle drainage. Read our full comparison in the Journal.'],
    ],
  },
  {
    slug: 'buccal-massage',
    name: 'Buccal Massage',
    category: 'face-massages',
    badge: 'Add to any facial',
    want: 'I want a sculpted jawline & a relaxed face',
    pillars: ['Sculpting', 'Deep tissue', 'Jaw release'],
    duration: 15,
    price: 250000,
    priceWas: null,
    image: 'buccal-massage-jawline',
    recommendedFor: 'Jaw clenching, facial tension, puffiness, lack of definition.',
    summary:
      'A deep intra-oral facial massage: we work the jaw and cheek muscles from inside the mouth to release tension and redefine contours.',
    description:
      'Buccal massage reaches the deep muscles that a regular face massage cannot. Wearing gloves, your therapist works the masseter, buccinator and cheek muscles from inside the mouth as well as outside, releasing jaw tension from clenching and stress, draining lymph and redefining facial contours — no needles, no filler. Add it to any facial or Hydrafacial.',
    ingredients: [],
    technologies: ['Intra-oral massage (gloved)', 'External sculpting', 'Lymphatic drainage'],
    results: ['Releases jaw tension & facial tightness', 'Enhanced natural contour', 'Improved circulation & glow', 'Reduced puffiness & muscle stiffness'],
    bestResults: 'Add 15 minutes to any facial; ideal for jaw clenchers and before events.',
    concerns: ['puffiness-jaw-tension'],
    faqs: [
      ['Does buccal massage hurt?', 'It is intense rather than painful — you feel deep pressure in the jaw and cheek muscles. Your therapist adapts the pressure to you throughout.'],
      ['Who should avoid buccal massage?', 'Avoid it with recent dental work or surgery, mouth ulcers, active cold sores or an infection in the mouth. Let us know about braces or jaw conditions before booking.'],
    ],
  },
  {
    slug: 'gua-sha-massage',
    name: 'Gua Sha Massage',
    category: 'face-massages',
    badge: null,
    want: 'I want to release tension & feel refreshed',
    pillars: ['Relax', 'Drain', 'Refresh'],
    duration: 30,
    price: 350000,
    priceWas: null,
    image: 'gua-sha-massage',
    recommendedFor: 'Stress, facial tension, mild puffiness — a relaxing reset.',
    summary:
      'A relaxing facial massage with centella oil and traditional Gua Sha tools to release tension and improve circulation.',
    description:
      'Traditional Gua Sha stones glide over the face with soothing centella oil, releasing tension held in the jaw, brow and neck and encouraging lymphatic drainage. You leave calm, depuffed and refreshed.',
    ingredients: ['Centella oil'],
    technologies: ['Gua Sha stones', 'Lymphatic drainage'],
    results: ['Releases facial tension & stress', 'Improved lymphatic drainage', 'Calm, refreshed skin'],
    bestResults: 'A 3-session package is available.',
    concerns: ['puffiness-jaw-tension'],
    faqs: [],
  },
  {
    slug: 'point-face-relaxation-ritual',
    name: 'POINT · FACE Relaxation Ritual',
    category: 'face-massages',
    badge: null,
    want: 'I want to fully switch off',
    pillars: ['Face', 'Head', 'Arms'],
    duration: 45,
    price: 550000,
    priceWas: null,
    image: 'relaxation-ritual',
    recommendedFor: 'Anyone needing deep relaxation — jet lag, stress, a slow afternoon.',
    summary:
      'A deeply relaxing ritual: face, head and arm massage, with LED therapy and a nourishing mask.',
    description:
      'A full switch-off: face massage, head massage and arm massage, with LED therapy for cellular regeneration and a nourishing mask that works while your arms are massaged.',
    ingredients: ['Nourishing mask'],
    technologies: ['Face, head & arm massage', 'LED therapy'],
    results: ['Deep relaxation for face, head & arms', 'LED support for regeneration', 'Nourished, glowing skin'],
    bestResults: 'A 3-session package is available.',
    concerns: ['dull-tired-skin-glass-skin'],
    faqs: [],
  },
];

const addOns = [
  { name: 'Skin Booster HydroJelly Mask', duration: 15, price: 200000, image: 'hydrojelly-mask-treatment', description: 'The viral electrolyte-infused jelly mask that deeply hydrates, calms and boosts the penetration of actives. Choose Caviar Resilience, Illuminating Orange, Blue Glacier Cryo, Vampire PLLA Infusion or Egyptian Rose.' },
  { name: 'LED Therapy — 7 colours', duration: 10, price: 100000, image: 'led-light-therapy', description: 'Blue purifies, green calms, yellow brightens, red boosts collagen, cyan refines, orange revitalises and violet regenerates.' },
  { name: 'Collagen Eye Patch', duration: null, price: 100000, image: 'eye-collagen-patch', description: 'Cooling hydrogel patches with peptides and collagen to de-puff and hydrate the eye area.' },
  { name: 'Lip Scrub', duration: null, price: 85000, image: 'lip-scrub', description: 'A creamy Korean lip scrub that buffs away dry, flaky skin while your mask develops.' },
];

const hydrojellyMasks = [
  ['Caviar Resilience', 'Firming · Anti-aging · Elasticity'],
  ['Illuminating Orange', 'Brightening · Pigmentation · Glow'],
  ['Blue Glacier Cryo', 'Cooling · Pore refining · Recovery'],
  ['Vampire PLLA Infusion', 'Collagen boost · Firming · Wrinkles'],
  ['Egyptian Rose', 'Hydration · Softening · Radiance'],
];

const ledColours = [
  ['Blue', 'Purifies and balances oily skin by reducing sebum and acne-causing bacteria.'],
  ['Green', 'Calms sensitive or irritated skin and evens out redness.'],
  ['Yellow', 'Boosts microcirculation and brightens dull complexions.'],
  ['Red', 'Stimulates collagen and cell regeneration; smooths fine lines.'],
  ['Cyan', 'Refines skin texture and smooths fine lines.'],
  ['Orange', 'Revitalises tired skin with oxygenation and energy.'],
  ['Violet', 'Combines blue purifying and red regenerating effects.'],
];

const packages = {
  duo: { name: 'Duo Package', price: 2250000, priceWas: 3465000, description: '2 × Ultimate Korean Glass Skin & Hydralift (80 min each), in shared or separate cabins. Ideal for friends & partners.' },
  threeSessions: [
    ['Hydrating Ritual', 2370000, 1780000, '-20%'],
    ['Purifying Ritual', 2940000, 2200000, '-20%'],
    ['Ultimate Glass Skin Hydralift', 5197500, 3150000, '-30%'],
    ['Advanced Collagen Booster', 4851000, 2940000, '-30%'],
    ['K-Balance Acne Clear', 3600000, 2600000, '-30%'],
    ['PDRN Cellular Repair', 3900000, 2730000, '-30%'],
    ['Caviar Luxury Anti-Aging & Lift', 6237000, 3780000, '-30%'],
    ['Bright & Pigment Correct', 3300000, 2300000, '-30%'],
    ['Cryo Skin Reset', 3150000, 2200000, '-30%'],
    ['Relaxing Gua Sha Massage', 1050000, 840000, '-20%'],
    ['Kobido Massage 30 min', 1500000, 1200000, '-20%'],
    ['Kobido Massage 60 min', 2550000, 2040000, '-20%'],
    ['POINT · FACE Relaxation Ritual', 1650000, 1320000, '-20%'],
  ],
  terms: 'Not combinable with other promotions. Valid for 5 months. Excludes add-ons.',
};

const aftercare = {
  hydrafacial: [
    'Avoid touching or picking the treated area',
    'No sun exposure for 24–48 h — SPF 50 is essential',
    'Avoid sweating, sauna & intense workouts (and surfing) for 24 h',
    'Use only gentle, hydrating skincare',
    'No acids, retinol or harsh products for 5–7 days',
  ],
  balinese: [
    'Avoid touching or picking the skin',
    'No harsh exfoliation for 48 h',
    'Use gentle, hydrating skincare only',
    'Apply SPF 50 daily',
  ],
};

module.exports = { categories, treatments, addOns, hydrojellyMasks, ledColours, packages, aftercare };
