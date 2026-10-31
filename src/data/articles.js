// Journal articles. Each one answers a real search / AI-assistant question (see GEO pre-audit),
// opens with a short direct answer + key takeaways, and links only to POINT · FACE services.

const site = require('./site');

const t = (slug, label) => `<a href="/treatments/${slug}/">${label}</a>`;
const c = (slug, label) => `<a href="/concerns/${slug}/">${label}</a>`;

module.exports = [
  {
    slug: 'hydrafacial-vs-korean-facial',
    title: 'Korean Hydrafacial vs Hydrafacial vs Manual Facial: Which Is Best for You?',
    description:
      'Korean Hydrafacial vs classic Hydrafacial, and Korean Hydrafacial vs manual facial: the differences, results, comfort and who each is for — from our facial studio in Uluwatu, Bali.',
    category: 'Comparison',
    date: '2026-09-08',
    readTime: 7,
    image: 'korean-glass-skin-hydrafacial',
    answer:
      'A classic Hydrafacial is a device-led protocol: hydrodermabrasion to cleanse, extract and infuse serums. A Korean Hydrafacial uses the same technology but adds a multi-step Korean skincare ritual — layered K-beauty actives, masks and massage — for a hydrated "glass skin" finish. A manual facial uses hands and natural products only: more sensory and relaxing, with gentler, shorter-lived results. For visible glow and deep cleansing in Bali\'s climate, the Korean Hydrafacial gives the best of both.',
    takeaways: [
      'Hydrafacial = device-led deep cleansing, extraction and serum infusion.',
      'Korean Hydrafacial = the same technology + a layered K-beauty ritual for glass skin.',
      'Manual facial = hands and natural products only: relaxing, gentle, less corrective.',
      'Every POINT · FACE treatment starts with a free AI skin analysis to choose for you.',
    ],
    body: `
<h2>What is a Hydrafacial?</h2>
<p>A Hydrafacial is a non-invasive facial performed with a hydrodermabrasion device. A spiral-tipped handpiece uses water and gentle suction (a "vortex") to exfoliate dead cells, loosen and extract what clogs the pores, and infuse serums at the same time. It is fast, painless and has no downtime. A classic Hydrafacial follows a set protocol: cleanse and exfoliate, extract, hydrate.</p>

<h2>What is a Korean Hydrafacial?</h2>
<p>A Korean Hydrafacial keeps the hydrodermabrasion technology and builds a Korean skincare ritual around it: double cleansing, essences and ampoules applied in thin layers, ultrasonic infusion, a sheet or HydroJelly mask and plenty of massage. The actives are typical of K-beauty — snail mucin, centella asiatica, propolis, niacinamide, peptides, hyaluronic acid — from brands such as COSRX, SKIN1004, Beauty of Joseon, Mediheal and Medicube. The goal is the famous <em>glass skin</em>: clean, plump, luminous.</p>
<p>At POINT · FACE, our systems also include oxygen, radiofrequency, microcurrent, high frequency, a cold hammer and LED, so each Korean Hydrafacial is tailored to a concern.</p>

<h2>Korean Hydrafacial vs Hydrafacial</h2>
<table>
<thead><tr><th></th><th>Hydrafacial</th><th>Korean Hydrafacial</th></tr></thead>
<tbody>
<tr><td>Approach</td><td>Device-led protocol</td><td>Device + layered K-beauty ritual</td></tr>
<tr><td>Strength</td><td>Deep pore cleansing &amp; extraction</td><td>Deep cleansing <strong>and</strong> intense hydration &amp; radiance</td></tr>
<tr><td>Actives</td><td>Standard serums</td><td>Targeted Korean actives chosen for your skin</td></tr>
<tr><td>Feels like</td><td>Cool, slightly ticklish suction</td><td>Same, plus masks and relaxing massage</td></tr>
<tr><td>Result</td><td>Clean, fresh, smoother skin</td><td>Clean, plump, glowing "glass skin"</td></tr>
<tr><td>Downtime</td><td>None</td><td>None</td></tr>
</tbody>
</table>
<p>In short: a Hydrafacial is excellent for a deep clean; a Korean Hydrafacial adds the hydration, layering and massage that give the lasting glow. In a tropical climate, skin needs both — sweat, sunscreen and humidity clog pores, while sun, salt and air-conditioning dehydrate.</p>

<h2>What is a manual facial?</h2>
<p>A manual facial is performed with the hands and natural products only, without devices: cleansing, gentle exfoliation, extractions by hand, a mask and a long massage. Ours are Balinese — the ${t('balinese-hydrating-ritual-rose-aloe', 'Hydrating Ritual (Rose & Aloe)')} and the ${t('balinese-purifying-ritual-clay-turmeric', 'Purifying Ritual (Clay & Turmeric)')} — with botanicals from Utama Spice &amp; Embun.</p>

<h2>Korean Hydrafacial vs manual facial</h2>
<table>
<thead><tr><th></th><th>Manual facial</th><th>Korean Hydrafacial</th></tr></thead>
<tbody>
<tr><td>Approach</td><td>Hands &amp; natural products</td><td>Technology + Korean skincare</td></tr>
<tr><td>Cleansing &amp; extraction</td><td>Gentle, by hand</td><td>Deeper, by hydrodermabrasion suction</td></tr>
<tr><td>Penetration of actives</td><td>Surface</td><td>Boosted by ultrasound and infusion</td></tr>
<tr><td>Experience</td><td>Very sensory and relaxing</td><td>Relaxing, more results-driven</td></tr>
<tr><td>Results</td><td>Fresh, soft, comforted skin</td><td>Visible glow, refined pores, lasting hydration</td></tr>
<tr><td>Best for</td><td>Sensitive skin, a natural ritual, pure relaxation</td><td>Congestion, dullness, dehydration, firmness, events</td></tr>
<tr><td>Price at POINT · FACE</td><td>From IDR 790,000</td><td>From IDR 1,050,000</td></tr>
</tbody>
</table>

<h2>Which one should you choose?</h2>
<ul>
<li>For instant glass-skin glow: ${t('ultimate-korean-glass-skin-hydralift', 'Ultimate Korean Glass Skin & Hydralift')}</li>
<li>For congestion and breakouts: ${t('k-balance-acne-clear', 'K-Balance Acne Clear')}</li>
<li>For firmness: ${t('advanced-collagen-booster', 'Advanced Collagen Booster')}</li>
<li>For sensitive or stressed skin: ${t('pdrn-cellular-repair-salmon-dna', 'PDRN Cellular Repair')}</li>
<li>For a natural, deeply relaxing ritual: the ${t('balinese-hydrating-ritual-rose-aloe', 'Hydrating Ritual (Rose & Aloe)')}</li>
</ul>
<p>Not sure? Every treatment at POINT · FACE starts with a complimentary AI-powered skin analysis. Your therapist looks at hydration, oil, pores, pigmentation and sensitivity and recommends the right facial for your skin on the day.</p>`,
    faqs: [
      ['What is the difference between a Korean Hydrafacial and a Hydrafacial?', 'Both use hydrodermabrasion to cleanse, extract and infuse. A Korean Hydrafacial adds a layered K-beauty ritual — essences, ampoules, masks and massage with Korean actives — for more hydration and a glass-skin glow.'],
      ['Is a Korean Hydrafacial better than a manual facial?', 'It is more results-driven: deeper cleansing, better penetration of actives and a more visible glow. A manual facial is gentler and more sensory. Choose by your skin and your goal — or let our free skin analysis decide.'],
      ['How often can I get a Korean Hydrafacial?', 'Every 2–4 weeks. In Bali\'s climate, every 3–4 weeks is a good rhythm for most skin types.'],
    ],
    related: ['ultimate-korean-glass-skin-hydralift', 'k-balance-acne-clear', 'balinese-hydrating-ritual-rose-aloe'],
  },
  {
    slug: 'why-skin-gets-dehydrated-in-bali',
    title: 'Why Does My Skin Get Dehydrated in Bali — and Which Facial Helps?',
    description:
      'Flights, sun, salt water and air-conditioning: why skin gets dehydrated in Bali, how to tell dehydration from dryness, and the facials that restore it.',
    category: 'Skin Concerns',
    date: '2026-09-12',
    readTime: 5,
    image: 'balinese-hydrating-facial',
    answer:
      'Skin gets dehydrated in Bali because of a chain of stressors: dry cabin air on the flight, strong UV, salt water, wind and nights in air-conditioning. They pull water from the outer layers and weaken the barrier. A hydrating facial that infuses humectants and repairs the barrier — such as a Korean Hydrafacial or a PDRN repair facial — restores comfort and glow in one session.',
    takeaways: [
      'Dehydration = lack of water (any skin type). Dryness = lack of oil.',
      'Flights, UV, salt, wind and AC are the main culprits on the island.',
      'Best facials: Ultimate Glass Skin, PDRN Cellular Repair, Hydrating Ritual.',
      'At home: hydrating serum on damp skin, moisturiser, SPF 50, water.',
    ],
    body: `
<h2>Dehydrated vs dry skin</h2>
<p>Dry skin is a skin type: it produces less oil. Dehydrated skin is a temporary condition: it lacks water. Even oily skin can be dehydrated — it feels tight after cleansing, looks dull and may produce more oil to compensate. Signs include fine "crêpey" lines when you gently pinch the cheek, make-up that clings to patches and a lack of bounce.</p>

<h2>Five reasons Bali dehydrates your skin</h2>
<ol>
<li><strong>The flight.</strong> Cabin humidity is very low; after a long-haul trip your skin has already lost water before you land.</li>
<li><strong>UV.</strong> Near the equator, UV is strong all year. Sun exposure damages the barrier that keeps water in.</li>
<li><strong>Salt water and wind.</strong> Surfing, swimming and scooter rides dry the skin surface.</li>
<li><strong>Air-conditioning.</strong> Moving between humid heat and cold, dry AC day and night is tough on the barrier.</li>
<li><strong>Holiday habits.</strong> Less water, more sun, cocktails at sunset and over-cleansing after the beach.</li>
</ol>

<h2>Which facial is best for dehydrated skin?</h2>
<p>A good hydrating facial does two things: it delivers water-binding ingredients deep into the skin, and it repairs the barrier so the water stays.</p>
<ul>
<li>${t('ultimate-korean-glass-skin-hydralift', 'Ultimate Korean Glass Skin & Hydralift')} — hyaluronic acid, snail mucin and peptides infused with ultrasound; instant plump, glass-skin effect.</li>
<li>${t('pdrn-cellular-repair-salmon-dna', 'PDRN Cellular Repair (Salmon DNA)')} — for dehydrated skin that is also red, sensitive or stressed.</li>
<li>${t('cryo-skin-reset', 'Cryo Skin Reset')} — when dehydration comes with heat after a day in the sun.</li>
<li>${t('balinese-hydrating-ritual-rose-aloe', 'Hydrating Ritual — Rose & Aloe')} — a 100% natural, gentle option.</li>
</ul>
<p>Add an <a href="/treatments/#add-ons">Egyptian Rose HydroJelly mask</a> to seal in hydration.</p>

<h2>Your Bali hydration routine</h2>
<ul>
<li>Cleanse gently — skip foaming, stripping cleansers.</li>
<li>Apply a hydrating serum on damp skin, then a moisturiser to seal it.</li>
<li>SPF 50 every morning; reapply after swimming.</li>
<li>Rinse off salt water and drink water through the day.</li>
</ul>
<p>Read more in our guide to ${c('dehydrated-skin-bali', 'dehydrated skin in Bali')}.</p>`,
    faqs: [
      ['How quickly will a facial fix dehydrated skin?', 'You will feel the difference immediately: tightness goes and the glow returns. A series of 2–3 facials strengthens the barrier so hydration lasts.'],
    ],
    related: ['ultimate-korean-glass-skin-hydralift', 'pdrn-cellular-repair-salmon-dna', 'cryo-skin-reset'],
  },
  {
    slug: 'how-often-facial-bali-climate',
    title: 'How Often Should You Get a Facial in Bali\'s Climate?',
    description:
      'Expert advice on facial frequency in a tropical climate — by skin type and concern, from acne series to monthly collagen boosters and holiday facials.',
    category: 'Expert Advice',
    date: '2026-09-16',
    readTime: 4,
    image: 'dewy-skin-closeup',
    answer:
      'In Bali\'s hot, humid and sunny climate, most people benefit from a professional facial every 3–4 weeks — roughly one skin-renewal cycle. For a specific concern such as acne or pigmentation, a series of 3 sessions spaced 2–3 weeks apart works best, followed by maintenance every 4–8 weeks. If you are visiting, book one facial early in your trip and one before you fly home.',
    takeaways: [
      'Maintenance: every 3–4 weeks.',
      'Targeted concern: 3 sessions, 2–3 weeks apart, then maintenance.',
      'Visitors: one facial at the start, one before flying home.',
      'Massages (Kobido, Buccal, Gua Sha) can be weekly.',
    ],
    body: `
<h2>Why every 3–4 weeks?</h2>
<p>Skin renews itself roughly every 28 days in young adults, and more slowly with age. Booking a facial at the rhythm of that cycle clears built-up dead cells and congestion before they dull the skin. In the tropics, heat, sweat and sunscreen speed up congestion — so regular deep cleansing matters even more.</p>

<h2>Frequency by concern</h2>
<table>
<thead><tr><th>Concern</th><th>Recommended rhythm</th><th>Facial</th></tr></thead>
<tbody>
<tr><td>Active acne</td><td>3 sessions, 2–3 weeks apart, then every 2 months</td><td>${t('k-balance-acne-clear', 'K-Balance Acne Clear')}</td></tr>
<tr><td>Pigmentation</td><td>Every 2–3 weeks as a series, then every 4–6 weeks</td><td>${t('bright-pigment-correct', 'Bright & Pigment Correct')}</td></tr>
<tr><td>Firmness / fine lines</td><td>Monthly</td><td>${t('advanced-collagen-booster', 'Advanced Collagen Booster')}</td></tr>
<tr><td>Sensitive / sun-exposed</td><td>Every 2–3 weeks</td><td>${t('cryo-skin-reset', 'Cryo Skin Reset')}</td></tr>
<tr><td>Glow & hydration</td><td>Every 3–4 weeks</td><td>${t('ultimate-korean-glass-skin-hydralift', 'Ultimate Glass Skin')}</td></tr>
<tr><td>Before an event</td><td>2–5 days before</td><td>${t('caviar-luxury-anti-aging-lift', 'Caviar Luxury Anti-Aging & Lift')}</td></tr>
</tbody>
</table>

<h2>If you live in Bali</h2>
<p>Our <a href="/packages/">3-session packages</a> (up to 30% off, valid 5 months) are designed for exactly this rhythm.</p>

<h2>If you are on holiday</h2>
<p>Book a hydrating or repairing facial in your first days to undo the flight, and a glow facial before you fly home. If you surf every day, add a ${t('cryo-skin-reset', 'Cryo Skin Reset')} midway.</p>

<h2>Can you over-do facials?</h2>
<p>Yes — too much exfoliation weakens the barrier. Leave at least two weeks between exfoliating facials, and tell your therapist about retinoids or acids you use at home. Massages such as ${t('kobido-massage', 'Kobido')} or ${t('gua-sha-massage', 'Gua Sha')} are non-exfoliating and can be enjoyed weekly.</p>`,
    faqs: [
      ['Can I get two facials in one week?', 'Not two exfoliating facials. You can combine a Hydrafacial with a face massage, or add a massage to your facial.'],
    ],
    related: ['k-balance-acne-clear', 'advanced-collagen-booster', 'cryo-skin-reset'],
  },
  {
    slug: 'best-facial-uluwatu-guide',
    title: 'Best Facial in Uluwatu: How to Choose the Right Facial Studio',
    description:
      'Staying in Uluwatu, Bingin or Ungasan? What to look for in a facial studio, which treatment to book for your skin, and how to book at POINT · FACE.',
    category: 'Uluwatu Guide',
    date: '2026-09-20',
    readTime: 5,
    image: 'hero-glass-skin-glow',
    answer:
      'The best facial in Uluwatu is the one matched to your skin: look for a studio that starts with a skin analysis, offers both technology-led and natural facials, uses recognised skincare, publishes clear all-inclusive prices and has strong recent reviews. POINT · FACE has two studios — Uluwatu Ungasan and Uluwatu Bingin — specialised in Korean Hydrafacials, Balinese natural facials and sculpting face massages.',
    takeaways: [
      'Choose a studio that analyses your skin before recommending a facial.',
      'Check the brands used and the technologies available.',
      'Look for all-inclusive pricing (tax & service) and recent reviews.',
      'POINT · FACE: Ungasan and Bingin studios, book via WhatsApp or Fresha.',
    ],
    body: `
<h2>1. A skin analysis before anything else</h2>
<p>A good facial starts with understanding your skin. At POINT · FACE every treatment begins with a complimentary professional skin analysis, so your therapist can adapt actives, intensity and technology — or suggest a different facial altogether.</p>

<h2>2. A menu built around skin concerns</h2>
<p>Instead of a long list of names, look for treatments clearly matched to concerns: ${c('dehydrated-skin-bali', 'dehydration')}, ${c('acne-breakouts-bali', 'acne')}, ${c('fine-lines-wrinkles-bali', 'fine lines')}, ${c('pigmentation-dark-spots-bali', 'pigmentation')}, ${c('sun-damaged-skin-bali', 'sun-stressed skin')}.</p>

<h2>3. Technology and ingredients you can trust</h2>
<p>Our Korean Hydrafacials use hydrodermabrasion, ultrasonic infusion, radiofrequency, microcurrent, high frequency, cryo and LED with COSRX, SKIN1004, Beauty of Joseon, Mediheal and Medicube. Our Balinese facials use natural products from Utama Spice & Embun.</p>

<h2>4. Transparent pricing</h2>
<p>All our prices include the 15% government tax and service charge — no surprises. Facials start from IDR 790,000 and massages from IDR 250,000. See the full <a href="/treatments/">treatment menu</a>.</p>

<h2>5. Location and timing</h2>
<p>Uluwatu is spread out and traffic around Pecatu can be slow at sunset. Choose the studio closest to where you stay:</p>
<ul>
<li><a href="/locations/uluwatu-ungasan/">POINT · FACE Uluwatu Ungasan</a> — Jl. Toya Ning II, near Melasti, Pandawa and the Ungasan clifftop.</li>
<li><a href="/locations/uluwatu-bingin/">POINT · FACE Uluwatu Bingin</a> — in the Bingin surf village, close to Dreamland and Padang Padang.</li>
</ul>

<h2>Which facial should you book in Uluwatu?</h2>
<ul>
<li>First facial in Bali, glow & hydration: ${t('ultimate-korean-glass-skin-hydralift', 'Ultimate Korean Glass Skin & Hydralift')}</li>
<li>After surf and sun: ${t('cryo-skin-reset', 'Cryo Skin Reset')}</li>
<li>Before a wedding or event: ${t('caviar-luxury-anti-aging-lift', 'Caviar Luxury Anti-Aging & Lift')}</li>
<li>Breakouts: ${t('k-balance-acne-clear', 'K-Balance Acne Clear')}</li>
<li>With a friend: the Duo Package</li>
</ul>`,
    faqs: [
      ['How do I book a facial at POINT · FACE?', 'Message us on WhatsApp and choose Uluwatu Ungasan or Uluwatu Bingin, or book online via Fresha.'],
      ['Do I need to book in advance?', 'We recommend booking 1–3 days ahead, especially for afternoons and weekends in high season.'],
    ],
    related: ['ultimate-korean-glass-skin-hydralift', 'cryo-skin-reset', 'caviar-luxury-anti-aging-lift'],
  },
  {
    slug: 'what-is-pdrn-salmon-dna-facial',
    title: 'What Is a PDRN (Salmon DNA) Facial? Benefits, Results & Who It\'s For',
    description:
      'PDRN, the "salmon DNA" ingredient from Korean dermatology, explained: what it is, what a non-invasive PDRN facial does, results, and who should avoid it.',
    category: 'Ingredients',
    date: '2026-09-24',
    readTime: 5,
    image: 'pdrn-salmon-dna-facial',
    answer:
      'PDRN (polydeoxyribonucleotide) is a purified DNA fragment, usually extracted from salmon, used in Korean dermatology to support skin repair and regeneration. In a non-invasive PDRN facial it is applied topically in serums and masks and driven deeper with ultrasound — no needles — to calm redness, strengthen the skin barrier and help stressed skin recover.',
    takeaways: [
      'PDRN = purified salmon DNA fragments, popular in Korean skincare.',
      'Our PDRN facial is non-invasive: topical serums + ultrasound, no needles.',
      'Best for sensitive, stressed, sun-exposed or post-breakout skin.',
      'Not for people with a fish allergy — ask us for an alternative.',
    ],
    body: `
<h2>What is PDRN?</h2>
<p>PDRN stands for polydeoxyribonucleotide — short chains of DNA purified from salmon (or trout) sperm cells. It has been studied for years in wound healing and is widely used by Korean dermatologists, both injected ("skin boosters") and in topical skincare. It is often called the "salmon DNA" or "salmon sperm" facial on social media.</p>

<h2>How our PDRN facial works</h2>
<p>Our ${t('pdrn-cellular-repair-salmon-dna', 'PDRN Cellular Repair Facial')} is a non-invasive Korean Hydrafacial. There are no injections and no downtime:</p>
<ol>
<li>Gentle hydrodermabrasion to cleanse and prepare the skin.</li>
<li>Ultrasonic infusion of a PDRN pink peptide serum and hyaluronic acid.</li>
<li>Oxygen therapy, high frequency and microcurrent.</li>
<li>A Rose PDRN mask and red LED to support regeneration.</li>
</ol>

<h2>Benefits you can expect</h2>
<ul>
<li>A calmer, less reactive complexion with reduced redness</li>
<li>A stronger skin barrier that holds hydration better</li>
<li>Faster recovery after sun, travel, stress or breakouts</li>
<li>Healthier, more resilient-looking skin</li>
</ul>
<p>Topical PDRN is not the same as injectable PDRN: it is gentler and focused on the skin\'s surface layers. If you want a more intense medical treatment, ask a dermatologist.</p>

<h2>Who is it for?</h2>
<p>Ideal for ${c('sensitive-reactive-skin', 'sensitive and reactive skin')}, ${c('sun-damaged-skin-bali', 'sun-exposed skin')} and ${c('dehydrated-skin-bali', 'dehydrated skin')}, or anyone whose skin feels "stressed" after a long trip.</p>
<p><strong>Who should avoid it:</strong> anyone with a fish or salmon allergy. Tell us about pregnancy, medical treatments or reactions during your skin analysis.</p>`,
    faqs: [
      ['Is PDRN vegan?', 'No — PDRN is derived from salmon. If you prefer a vegan option, choose the Cryo Skin Reset or a Balinese natural facial.'],
      ['How many PDRN facials do I need?', 'You will see calmer, healthier skin after one session; a series of 3 sessions 2–3 weeks apart gives the most visible repair.'],
    ],
    related: ['pdrn-cellular-repair-salmon-dna', 'cryo-skin-reset', 'balinese-hydrating-ritual-rose-aloe'],
  },
  {
    slug: 'buccal-massage-what-to-expect',
    title: 'Buccal Massage in Bali: What It Is, What to Expect & Results',
    description:
      'Intra-oral buccal massage explained: how it works, what it feels like, results for jaw tension and facial contour, and who should avoid it — at POINT · FACE Uluwatu.',
    category: 'Treatments',
    date: '2026-09-28',
    readTime: 4,
    image: 'buccal-massage-jawline',
    answer:
      'Buccal massage is an intra-oral facial massage: with gloved hands, the therapist works the jaw and cheek muscles from inside the mouth as well as outside, reaching deep muscles a regular face massage cannot. It releases jaw tension from clenching, drains puffiness and gives a more sculpted contour — with no needles or filler. At POINT · FACE it takes 15 minutes and can be added to any facial.',
    takeaways: [
      'Intra-oral + external massage of the jaw and cheek muscles.',
      'Releases clenching tension, depuffs and sculpts.',
      '15 minutes · IDR 250,000 · add it to any facial.',
      'Avoid with recent dental work, mouth ulcers or oral infection.',
    ],
    body: `
<h2>How does buccal massage work?</h2>
<p>"Buccal" refers to the cheek. Your therapist, wearing medical gloves, places one hand inside the mouth and one outside, working the buccinator (cheek muscle), the masseter (the powerful chewing muscle that tightens when you clench) and the surrounding fascia. Combined with lymphatic drainage, this releases tension and lets the face look more defined.</p>

<h2>What does it feel like?</h2>
<p>Unusual at first, then deeply relieving. The pressure is intense rather than painful, especially on the masseter if you clench or grind. Your therapist checks the pressure with you throughout.</p>

<h2>Results</h2>
<ul>
<li>A relaxed jaw and less facial tightness</li>
<li>Reduced puffiness</li>
<li>A more sculpted cheek and jawline contour</li>
<li>Better circulation and a healthy glow</li>
</ul>
<p>Results are visible immediately and build with regular sessions.</p>

<h2>Who should avoid buccal massage?</h2>
<p>Skip it if you have had recent dental work or oral surgery, have mouth ulcers, an active cold sore or an oral infection. Tell us about braces, implants or a jaw condition (TMJ) before booking.</p>

<h2>Best combinations</h2>
<p>Add the ${t('buccal-massage', 'Buccal Massage')} to the ${t('advanced-collagen-booster', 'Advanced Collagen Booster')} for maximum definition, or pair it with a ${t('kobido-massage', 'Kobido Massage')} for a full natural facelift session. More in our guide to ${c('puffiness-jaw-tension', 'puffiness & jaw tension')}.</p>`,
    faqs: [
      ['How often can I have buccal massage?', 'Weekly or every two weeks for jaw tension; monthly for maintenance.'],
    ],
    related: ['buccal-massage', 'kobido-massage', 'advanced-collagen-booster'],
  },
  {
    slug: 'kobido-vs-gua-sha',
    title: 'Kobido vs Gua Sha: Which Face Massage Should You Choose?',
    description:
      'Japanese Kobido or Chinese Gua Sha? Techniques, benefits and results compared — and how to combine them with buccal massage for a natural facelift.',
    category: 'Comparison',
    date: '2026-10-01',
    readTime: 4,
    image: 'kobido-lifting-massage',
    answer:
      'Choose Kobido if you want a lifting, toning effect: it uses fast, rhythmic lifting motions and percussive tapping and is known as the "natural facelift". Choose Gua Sha if you want relaxation and gentle drainage: smooth stones glide over the face to release tension and depuff. For deep jaw tension, add a Buccal Massage.',
    takeaways: [
      'Kobido = lifting, toning, "natural facelift". 30 or 60 min.',
      'Gua Sha = relaxing, depuffing, tension release. 30 min.',
      'Buccal = deep jaw & cheek muscles, from inside the mouth. 15 min.',
      'All three are non-exfoliating — safe to combine with facials.',
    ],
    body: `
<h2>Kobido: the Japanese natural facelift</h2>
<p>Kobido is a centuries-old Japanese facial massage. Its techniques are fast and precise: deep lifting strokes, lymphatic drainage and percussive tapping that stimulate circulation and tone the facial muscles. At POINT · FACE we perform it with our collagen cream. ${t('kobido-massage', 'Kobido Massage')}: 30 min IDR 500,000 · 60 min IDR 850,000.</p>

<h2>Gua Sha: the relaxing, depuffing ritual</h2>
<p>Gua Sha comes from traditional Chinese medicine. A smooth stone is glided along the face and neck with oil to release muscle tension and encourage lymphatic drainage. We use centella oil to soothe the skin. ${t('gua-sha-massage', 'Gua Sha Massage')}: 30 min IDR 350,000.</p>

<h2>Comparison</h2>
<table>
<thead><tr><th></th><th>Kobido</th><th>Gua Sha</th></tr></thead>
<tbody>
<tr><td>Main goal</td><td>Lift & tone</td><td>Relax & depuff</td></tr>
<tr><td>Rhythm</td><td>Fast, dynamic</td><td>Slow, flowing</td></tr>
<tr><td>Tools</td><td>Hands</td><td>Gua Sha stones</td></tr>
<tr><td>Best for</td><td>Loss of firmness, tired features</td><td>Stress, puffiness, tension</td></tr>
</tbody>
</table>

<h2>The third option: buccal massage</h2>
<p>If tension sits deep in your jaw — clenching, grinding — the ${t('buccal-massage', 'Buccal Massage')} works the muscles from inside the mouth. Add it to either massage.</p>

<h2>Our recommendation</h2>
<p>Before an event: Kobido 60 min + Buccal. After a stressful week: Gua Sha or the ${t('point-face-relaxation-ritual', 'Relaxation Ritual')}. Living in Bali: a <a href="/packages/">3-session massage package</a> at 20% off.</p>`,
    faqs: [
      ['Can I do Gua Sha at home?', 'Yes, gently and with oil, always upward and outward. A professional session goes deeper and adds drainage techniques.'],
    ],
    related: ['kobido-massage', 'gua-sha-massage', 'buccal-massage'],
  },
  {
    slug: 'post-surf-skin-care-uluwatu',
    title: 'Post-Surf Skin Care in Uluwatu: Protect & Repair Your Skin',
    description:
      'Surfing Bingin, Padang Padang or Uluwatu? How sun, salt and wind affect your skin, the routine that protects it, and the after-sun facials that repair it.',
    category: 'Uluwatu Guide',
    date: '2026-10-02',
    readTime: 5,
    image: 'sun-damaged-skin',
    answer:
      'Surfers\' skin takes a triple hit in Uluwatu: intense equatorial UV amplified by reflection off the water, salt that dries the surface and wind that strips moisture. Protect it with a water-resistant SPF 50 and zinc, rinse and hydrate after every session, and book a cooling, repairing facial — such as the Cryo Skin Reset or the PDRN Cellular Repair — every 2–3 weeks.',
    takeaways: [
      'Before: water-resistant SPF 50 + zinc on nose and cheekbones.',
      'After: fresh-water rinse, soothing gel, hydrating serum, moisturiser.',
      'Facials: Cryo Skin Reset (cool & calm), PDRN Repair (barrier).',
      'Wait 24 h after a facial before surfing again.',
    ],
    body: `
<h2>What surfing does to your skin</h2>
<p>Water reflects a significant part of UV back to your face, so you get sun from above and below. Sunscreen washes and rubs off. Salt water draws moisture out, and wind accelerates evaporation. The result: redness, heat, tightness, peeling, then over time sun spots and premature lines.</p>

<h2>Before the session</h2>
<ul>
<li>Apply a water-resistant SPF 50 at least 15 minutes before paddling out.</li>
<li>Add a zinc stick on the nose, cheekbones and lips.</li>
<li>Consider a surf cap for long midday sessions.</li>
</ul>

<h2>After the session</h2>
<ul>
<li>Rinse your face with fresh water as soon as you can.</li>
<li>Cleanse gently in the evening to remove zinc and sunscreen.</li>
<li>Apply aloe or a soothing gel, then a hydrating serum and moisturiser.</li>
<li>Avoid acids and retinol while skin is red.</li>
</ul>

<h2>The best facials after surfing</h2>
<ul>
<li>${t('cryo-skin-reset', 'Cryo Skin Reset')} — cryo-globe massage and a Blue Glacier HydroJelly mask cool overheated skin instantly.</li>
<li>${t('pdrn-cellular-repair-salmon-dna', 'PDRN Cellular Repair')} — supports the barrier after repeated sun and salt.</li>
<li>${t('bright-pigment-correct', 'Bright & Pigment Correct')} — later in your stay, to fade sun spots.</li>
</ul>
<p>Our <a href="/locations/uluwatu-bingin/">Bingin studio</a> is minutes from Bingin, Dreamland and Padang Padang — easy to drop in after your session. See also ${c('sun-damaged-skin-bali', 'sun-stressed skin')}.</p>`,
    faqs: [
      ['Can I surf right after a facial?', 'Wait at least 24 hours. Your skin is freshly exfoliated and more sensitive to UV and bacteria.'],
    ],
    related: ['cryo-skin-reset', 'pdrn-cellular-repair-salmon-dna', 'bright-pigment-correct'],
  },
  {
    slug: 'what-is-glass-skin',
    title: 'What Is Glass Skin — and Can a Facial Give It to You?',
    description:
      'The Korean "glass skin" trend explained: what it really means, the 3 pillars behind it and how our signature Korean Hydrafacial gets you there.',
    category: 'K-Beauty',
    date: '2026-09-04',
    readTime: 4,
    image: 'dewy-skin-closeup',
    answer:
      'Glass skin is a Korean beauty term for skin so hydrated, smooth and clear that it looks translucent and reflects light like glass. It rests on three pillars: deep hydration, refined texture (clean pores, no build-up) and a healthy barrier. A Korean Hydrafacial delivers all three in one session — the glow is visible immediately and lasts about a week.',
    takeaways: [
      'Glass skin = hydrated, refined, luminous, clear skin.',
      'Three pillars: hydration, texture, barrier.',
      'Our Ultimate Korean Glass Skin & Hydralift: 18+ steps, 80 min.',
      'Keep it with layered hydration and daily SPF.',
    ],
    body: `
<h2>Where does "glass skin" come from?</h2>
<p>The term comes from Korea, where skincare focuses on prevention and hydration rather than coverage. Glass skin is not a filter or a make-up look — it is skin in excellent condition: plump with water, smooth, even and luminous.</p>

<h2>The 3 pillars of glass skin</h2>
<ol>
<li><strong>Hydration</strong> — humectants such as hyaluronic acid and snail mucin plump the skin so it reflects light.</li>
<li><strong>Texture</strong> — clean, refined pores and no dead-cell build-up for a smooth surface.</li>
<li><strong>Barrier</strong> — centella, peptides and propolis keep the skin calm and able to hold water.</li>
</ol>

<h2>How our glass-skin facial works</h2>
<p>The ${t('ultimate-korean-glass-skin-hydralift', 'Ultimate Korean Glass Skin & Hydralift')} is our signature 80-minute protocol with 18+ steps: double cleansing, hydrodermabrasion, extraction, ultrasonic infusion of a 6-peptide booster, snail mucin and hyaluronic acid, oxygen therapy, high frequency, cold hammer, red & green LED and a hydrogel mask. Features COSRX, SKIN1004 and Beauty of Joseon.</p>

<h2>How to keep it</h2>
<ul>
<li>Layer light hydration: toner, essence, serum, moisturiser.</li>
<li>Exfoliate gently once or twice a week.</li>
<li>SPF 50 every day — the most important anti-dullness step in Bali.</li>
</ul>
<p>More in ${c('dull-tired-skin-glass-skin', 'dull skin & glass skin')}.</p>`,
    faqs: [
      ['How long does the glass-skin effect last?', 'About 5–7 days after one session. A series of 3 facials changes texture and hydration for longer.'],
    ],
    related: ['ultimate-korean-glass-skin-hydralift', 'bright-pigment-correct', 'caviar-luxury-anti-aging-lift'],
  },
  {
    slug: 'pre-wedding-facial-timeline-bali',
    title: 'Pre-Wedding Facial Timeline for a Bali Wedding',
    description:
      'Getting married in Uluwatu? The ideal facial timeline for brides, grooms and guests — from 3 months out to the day before — with the right treatments at each step.',
    category: 'Expert Advice',
    date: '2026-08-28',
    readTime: 4,
    image: 'friends-facial-duo',
    answer:
      'For a wedding in Bali, start 2–3 months before with a series of targeted facials (acne, pigmentation or firmness), keep a monthly hydrating facial, then book your final glow facial 2–5 days before the ceremony — never the day before. In Uluwatu, our Caviar Luxury Anti-Aging & Lift or Ultimate Glass Skin plus a Buccal Massage give maximum lift and glow with no redness on the day.',
    takeaways: [
      '3 months out: skin analysis and a targeted series.',
      '1 month out: hydration and firmness.',
      '2–5 days before: final glow facial + buccal massage.',
      'Day before: only gentle massage and hydration — no new products.',
      'Groups of more than 6: special quotation, or privatise the studio for the bride and bridesmaids.',
    ],
    body: `
<h2>3 months before: analyse and target</h2>
<p>Book a skin analysis and start a series for your main concern: ${t('k-balance-acne-clear', 'K-Balance Acne Clear')} for breakouts, ${t('bright-pigment-correct', 'Bright & Pigment Correct')} for spots, ${t('advanced-collagen-booster', 'Advanced Collagen Booster')} for firmness. Three sessions spaced 2–3 weeks apart.</p>

<h2>1 month before: hydrate and firm</h2>
<p>Switch to hydration and glow with the ${t('ultimate-korean-glass-skin-hydralift', 'Ultimate Korean Glass Skin')}. Avoid trying new products or strong at-home peels from now on.</p>

<h2>2–5 days before: the final glow</h2>
<p>Book the ${t('caviar-luxury-anti-aging-lift', 'Caviar Luxury Anti-Aging & Lift')} or the Ultimate Glass Skin, plus a ${t('buccal-massage', 'Buccal Massage')} for a sculpted jawline in photos. The timing leaves your skin glowing with zero risk of residual redness.</p>

<h2>The day before</h2>
<p>Keep it simple: a ${t('kobido-massage', 'Kobido')} or ${t('gua-sha-massage', 'Gua Sha')} massage to depuff, collagen eye patches, plenty of water and an early night.</p>

<h2>Flying in for the wedding?</h2>
<p>Land at least 3 days before if you can, and book a ${t('pdrn-cellular-repair-salmon-dna', 'PDRN Cellular Repair')} or hydrating facial on day 1 or 2 to undo the flight. Coming with a friend or your partner? Our <a href="/packages/">Duo Package</a> is ideal.</p>

<h2>Bridal parties and groups</h2>
<p>Getting the whole bridal party glowing together is one of our favourite bookings.</p>
<ul>
<li><strong>Groups of more than 6 guests:</strong> request a special group quotation — we tailor the treatments, timing and price to your party.</li>
<li><strong>Privatise the studio for a day:</strong> book one of our studios exclusively for the bride and her bridesmaids — your own space, your own schedule, facials and face massages for everyone before the big day.</li>
</ul>
<p>Message us with your date, the number of guests and your preferred studio: ${site.locations.map((l) => `<a href="https://wa.me/${l.whatsapp}?text=${encodeURIComponent(`Hi POINT · FACE ${l.name}! I'd like a quotation for a bridal / group booking (more than 6 guests) or to privatise the studio for a day. Date: … Number of guests: …`)}" target="_blank" rel="noopener">WhatsApp ${l.name}</a>`).join(' · ')}.</p>`,
    faqs: [
      ['Can I get a facial the day before my wedding?', 'We advise against exfoliating facials the day before. A massage and hydrating mask are perfect.'],
      ['Can you host a bridal party?', 'Yes. For groups of more than 6 guests we prepare a special quotation, and you can privatise one of our Uluwatu studios for a day for the bride and her bridesmaids. Message us on WhatsApp with your date and number of guests.'],
    ],
    related: ['caviar-luxury-anti-aging-lift', 'ultimate-korean-glass-skin-hydralift', 'buccal-massage'],
  },
  {
    slug: 'korean-skincare-ingredients-benefits',
    title: 'Korean Skincare Ingredients: Benefits of Snail Mucin, Centella, PDRN & More',
    description:
      'The Korean skincare ingredients we use in our Uluwatu facials, what each one does for your skin, and which COSRX, SKIN1004, Mediheal and Beauty of Joseon products they come from.',
    category: 'K-Beauty',
    date: '2026-10-20',
    readTime: 7,
    image: 'serum-texture',
    answer:
      'Korean skincare is built on gentle, hydrating, barrier-friendly actives. Snail mucin and hyaluronic acid hydrate and plump, centella asiatica calms and repairs, niacinamide evens tone and regulates oil, peptides and PDRN support firmness and recovery, BHA clears pores, and vitamin C brightens. At POINT · FACE we infuse them with Hydrafacial technology, using COSRX, SKIN1004, Mediheal, Medicube and Beauty of Joseon.',
    takeaways: [
      'Hydrate: snail mucin, hyaluronic acid, propolis.',
      'Calm & repair: centella asiatica, PDRN, panthenol (vitamin B5).',
      'Clarify: BHA (salicylic acid), tea tree, niacinamide.',
      'Brighten & firm: vitamin C, peptides, collagen.',
    ],
    body: `
<h2>Why Korean skincare works so well in Bali</h2>
<p>Korean formulas favour lightweight textures, layering and barrier care over harsh actives. That suits a hot, humid, sunny climate: skin gets hydration without heaviness, and calming ingredients help it cope with sun, salt water and air-conditioning.</p>

<h2>Snail mucin</h2>
<p>Snail secretion filtrate is rich in glycoproteins and hyaluronic acid. It hydrates, softens and supports skin recovery, which gives the plump, dewy look of <a href="/journal/what-is-glass-skin/">glass skin</a>. We use COSRX Advanced Snail 96 Mucin Power Essence in our ${t('ultimate-korean-glass-skin-hydralift', 'Ultimate Korean Glass Skin & Hydralift')} and ${t('vitamin-c-sunshine-glow', 'Vitamin C Sunshine Glow')}.</p>

<h2>Centella asiatica</h2>
<p>Also called cica or tiger grass, centella is the hero of SKIN1004. It is known for calming redness, supporting the skin barrier and helping irritated skin recover, which makes it ideal after sun or breakouts. It appears in almost all of our Korean Hydrafacials.</p>

<h2>Niacinamide</h2>
<p>Vitamin B3 is a multitasker: it helps regulate oil, refine the look of pores, even skin tone and strengthen the barrier. It is a key active in ${t('k-balance-acne-clear', 'K-Balance Acne Clear')} and ${t('bright-pigment-correct', 'Bright & Pigment Correct')}.</p>

<h2>BHA and tea tree</h2>
<p>Salicylic acid (BHA) is oil-soluble, so it cleans inside the pore and helps clear blackheads. Paired with tea tree (SKIN1004 Tea-Trica), it is the base of our acne and body protocols, including the ${t('signature-back-acne-pore-clear', 'Signature Back Acne & Pore Clear')}.</p>

<h2>Peptides and collagen</h2>
<p>Peptides are short chains of amino acids that support the look of firmness and elasticity. Our ${t('advanced-collagen-booster', 'Advanced Collagen Booster')} combines a 6-peptide skin booster with a triple collagen serum, then uses microcurrent and red LED.</p>

<h2>PDRN (salmon DNA)</h2>
<p>PDRN is a regenerative ingredient popular in Korean dermatology. Applied topically and infused with ultrasound, it supports barrier repair and recovery. Read our full guide: <a href="/journal/what-is-pdrn-salmon-dna-facial/">What is a PDRN facial?</a></p>

<h2>Vitamin C</h2>
<p>Vitamin C is an antioxidant that helps brighten dull skin and even the look of dark spots. Our ${t('vitamin-c-sunshine-glow', 'Vitamin C Sunshine Glow')} uses Mediheal vitamin C with SKIN1004 Tone Brightening Capsule Cream. Always pair it with SPF 50 in Bali.</p>

<h2>How we choose for your skin</h2>
<p>Every treatment starts with a free AI-powered skin analysis. Your therapist then selects the actives and technologies your skin needs that day. Not sure where to start? See our ${c('dehydrated-skin-bali', 'skin concern guides')}.</p>`,
    faqs: [
      ['Is snail mucin suitable for sensitive skin?', 'It is generally well tolerated and soothing. If you have a known allergy or very reactive skin, tell your therapist during the skin analysis.'],
      ['Can I use these ingredients at home after my facial?', 'Yes: gentle hydrators like snail mucin, centella and hyaluronic acid are perfect after a facial. Avoid acids and retinol for 5–7 days after a Hydrafacial.'],
    ],
    related: ['ultimate-korean-glass-skin-hydralift', 'vitamin-c-sunshine-glow', 'advanced-collagen-booster'],
  },
  {
    slug: 'things-to-do-uluwatu-bali',
    title: 'Best Things to Do in Uluwatu & Bali (and Where to Get a Facial)',
    description:
      'Our local guide to Uluwatu and the Bukit peninsula: temples, beaches, surf, sunsets and day trips in Bali, plus how to fit a facial into your trip.',
    category: 'Uluwatu Guide',
    date: '2026-10-23',
    readTime: 6,
    image: 'skin-confidence',
    answer:
      'In Uluwatu, watch the sunset and Kecak fire dance at Uluwatu Temple, spend your days on the beaches of Bingin, Padang Padang, Dreamland, Suluban and Melasti, surf or watch the surfers, and have a seafood dinner on Jimbaran Bay. From the Bukit, day trips reach Ubud, Nusa Dua and the islands. Between beach days, book a facial at POINT · FACE in Ungasan or Bingin to repair sun-exposed skin.',
    takeaways: [
      'Sunset: Uluwatu Temple and the Kecak fire dance.',
      'Beaches: Bingin, Padang Padang, Dreamland, Suluban, Melasti.',
      'Food: seafood dinner on Jimbaran Bay at sunset.',
      'Our favourites: Korean Hydrafacials & face massages at POINT · FACE, Ôkeanos Boutique Hotel, Pilates at Bluvana, yoga at La Tribu, breakfast at Chela, Rumah Pasta & Melasti, sunset at Single Fin or Dreamland, dinner at Ulu Fish Market or My Dear Clara.',
      'Skin: an after-sun or glow facial in Ungasan or Bingin.',
    ],
    body: `
<h2>Uluwatu Temple and the Kecak dance</h2>
<p>Pura Luhur Uluwatu sits on a cliff high above the Indian Ocean. Come in the late afternoon for the view and stay for the Kecak fire dance at sunset. Keep sunglasses and phones close: the temple monkeys are famous for snatching them.</p>

<h2>The beaches of the Bukit</h2>
<ul>
<li><strong>Bingin</strong> — a cliffside village with stairs down to a reef beach and warungs. Our <a href="/locations/uluwatu-bingin/">Bingin studio</a> is a few minutes away.</li>
<li><strong>Padang Padang</strong> — a small, photogenic cove reached through a gap in the rocks.</li>
<li><strong>Dreamland</strong> — a wide sandy beach, one of the easier spots for a swim when the sea is calm.</li>
<li><strong>Suluban</strong> — a beach hidden in a cave below Uluwatu's famous surf break.</li>
<li><strong>Melasti</strong> — white sand framed by dramatic limestone cliffs, close to our <a href="/locations/uluwatu-ungasan/">Ungasan studio</a>.</li>
</ul>
<p>Waves and currents can be strong: check conditions, swim where locals swim and respect red flags.</p>

<h2>Our favourite spots in Uluwatu</h2>
<p>The places our team loves and recommends to clients between two treatments:</p>
<ul>
<li><strong>Korean Hydrafacials &amp; face massages at POINT · FACE</strong> — our own studios in <a href="/locations/uluwatu-ungasan/">Ungasan</a> and <a href="/locations/uluwatu-bingin/">Bingin</a>: glass-skin <a href="/treatments/#korean-hydrafacials">Korean Hydrafacials</a> and sculpting <a href="/treatments/#face-massages">face massages</a> (Kobido, Buccal, Gua Sha), with a free AI skin analysis. <a href="/book/">Book on WhatsApp or Fresha</a> · <a href="https://www.instagram.com/pointfacebali/" target="_blank" rel="noopener">Instagram @pointfacebali</a></li>
<li><strong>Sleep at Ôkeanos Boutique Hotel</strong> — an intimate, adults-only boutique hotel in Ungasan with only a handful of rooms and an infinity pool, minutes from our Ungasan studio. <a href="https://okeanosboutiquehotel.com/" target="_blank" rel="noopener">Website</a> · <a href="https://www.instagram.com/okeanosboutiquehotel/" target="_blank" rel="noopener">Instagram @okeanosboutiquehotel</a></li>
<li><strong>Pilates at Bluvana</strong> — small-group Reformer Pilates in Bingin, capped at six people per class. <a href="https://www.bluvanastudio.com/" target="_blank" rel="noopener">Website</a> · <a href="https://www.instagram.com/bluvanastudio/" target="_blank" rel="noopener">Instagram @bluvanastudio</a></li>
<li><strong>Yoga at La Tribu</strong> — a creative yoga and movement studio in Pecatu: vinyasa, yin and power classes. <a href="https://latribubali.id/" target="_blank" rel="noopener">Website</a> · <a href="https://www.instagram.com/latribubali/" target="_blank" rel="noopener">Instagram @latribubali</a></li>
<li><strong>Breakfast at Chela</strong> — a bamboo café on the road to Bingin Beach, open from early morning, known for its shakshuka. <a href="https://www.instagram.com/chela.bali/" target="_blank" rel="noopener">Instagram @chela.bali</a></li>
<li><strong>Pasta at Rumah Pasta, then Melasti Beach</strong> — a plate of pasta, then white sand and limestone cliffs at Melasti for the afternoon. <a href="https://www.instagram.com/rumahpastabali/" target="_blank" rel="noopener">Instagram @rumahpastabali</a> · <a href="https://www.google.com/maps/search/?api=1&amp;query=Melasti+Beach+Ungasan+Bali" target="_blank" rel="noopener">Melasti Beach on Google Maps</a></li>
<li><strong>Sunset at Single Fin or Dreamland Beach</strong> — drinks above the Uluwatu surf break at Single Fin, or golden hour on the sand at Dreamland. <a href="https://www.singlefinbali.com/" target="_blank" rel="noopener">Single Fin website</a> · <a href="https://www.google.com/maps/search/?api=1&amp;query=Dreamland+Beach+Pecatu+Bali" target="_blank" rel="noopener">Dreamland Beach on Google Maps</a></li>
<li><strong>Dinner at Ulu Fish Market or My Dear Clara</strong> — fresh seafood at Ulu Fish Market, or a cosy evening at My Dear Clara. <a href="https://ulufishmarket.com/" target="_blank" rel="noopener">Ulu Fish Market website</a> · <a href="https://www.instagram.com/my_dear_clara/" target="_blank" rel="noopener">Instagram @my_dear_clara</a></li>
</ul>

<h2>Surf</h2>
<p>Uluwatu, Padang Padang and Bingin are world-famous reef breaks, best left to experienced surfers. Beginners usually start with a lesson on a sandier beach. Watching the surfers from a cliff café at sunset is an Uluwatu ritual in itself. Surfers, read our <a href="/journal/post-surf-skin-care-uluwatu/">post-surf skin care guide</a>.</p>

<h2>Sunset dinners and Jimbaran</h2>
<p>Uluwatu's cliffs are lined with sunset bars and restaurants. For something classic, drive to Jimbaran Bay for grilled seafood with your feet in the sand.</p>

<h2>Day trips from Uluwatu</h2>
<ul>
<li><strong>Nusa Dua</strong> — calm beaches and the Water Blow viewpoint.</li>
<li><strong>Ubud</strong> — rice terraces, temples and Bali's cultural heart (plan a full day).</li>
<li><strong>The Nusa islands</strong> — boats leave from Sanur for Nusa Penida and Nusa Lembongan.</li>
</ul>

<h2>Fit a facial into your trip</h2>
<p>Sun, salt and long flights take a toll on the skin. Book a hydrating or repair facial in your first days, an after-sun ${t('cryo-skin-reset', 'Cryo Skin Reset')} mid-trip (Ungasan), and a glow facial such as the ${t('ultimate-korean-glass-skin-hydralift', 'Ultimate Korean Glass Skin & Hydralift')} before you fly home. Surfers in Bingin can also try our <a href="/treatments/#korean-body-hydrafacials">Korean Body Hydrafacials</a> for the back and chest.</p>`,
    faqs: [
      ['When is the best time to visit Uluwatu Temple?', 'Late afternoon, to enjoy the cliff views and stay for the Kecak dance at sunset.'],
      ['Where can I get a facial in Uluwatu?', 'POINT · FACE has two studios: Uluwatu Ungasan (Jl. Toya Ning II) and Uluwatu Bingin (Jl. Pantai Cemongkak). Book on WhatsApp or Fresha.'],
    ],
    related: ['cryo-skin-reset', 'ultimate-korean-glass-skin-hydralift', 'pdrn-cellular-repair-salmon-dna'],
  },
  {
    slug: 'best-hydrafacial-bali',
    title: 'Best Hydrafacial in Bali: What Makes a Great Hydrafacial (and Where to Book in Uluwatu)',
    description:
      'How to recognise a great Hydrafacial in Bali: skin analysis, technology, Korean actives, tailored protocols and aftercare. Plus the Korean Hydrafacials we offer in Uluwatu.',
    category: 'Comparison',
    date: '2026-10-26',
    readTime: 6,
    image: 'hydrojelly-mask-treatment',
    answer:
      'The best Hydrafacial in Bali starts with a real skin analysis, uses a multi-function Hydrafacial system (hydrodermabrasion, extraction, ultrasonic and oxygen infusion, radiofrequency, LED), infuses actives chosen for your concern, and ends with aftercare adapted to sun and sea. In Uluwatu, POINT · FACE offers five Korean Hydrafacials at both studios, three HydroJelly Hydrafacials in Ungasan and Korean Body Hydrafacials in Bingin.',
    takeaways: [
      'Look for a skin analysis before the treatment.',
      'Check the technologies and the skincare brands used.',
      'The protocol should match your concern, not be one-size-fits-all.',
      'Clear prices, tax and service included, and aftercare advice.',
    ],
    body: `
<h2>1. A skin analysis first</h2>
<p>A great Hydrafacial is tailored. At POINT · FACE every treatment begins with a free AI-powered skin analysis of hydration, oil, pores, pigmentation and sensitivity.</p>

<h2>2. Real technology, not just a water peel</h2>
<p>Hydrodermabrasion is the base, but the best results come from combining steps. Our systems cleanse (hydrodermabrasion, ultrasonic scrubber, vacuum and spot extraction), infuse (oxygen, ultrasound, eye ultrasound), lift (radiofrequency, microcurrent, multipolar lifting) and calm (high frequency, cryo, LED). See the full <a href="/treatments/#technology">technology table</a>.</p>

<h2>3. Actives chosen for your concern</h2>
<ul>
<li>Glow &amp; hydration: ${t('ultimate-korean-glass-skin-hydralift', 'Ultimate Korean Glass Skin & Hydralift')} (our best seller, 18+ steps)</li>
<li>Firmness: ${t('advanced-collagen-booster', 'Advanced Collagen Booster')}</li>
<li>Repair &amp; sensitivity: ${t('pdrn-cellular-repair-salmon-dna', 'PDRN Cellular Repair')}</li>
<li>Acne &amp; congestion: ${t('k-balance-acne-clear', 'K-Balance Acne Clear')}</li>
<li>Radiance &amp; even tone: ${t('vitamin-c-sunshine-glow', 'Vitamin C Sunshine Glow')}</li>
</ul>

<h2>4. The HydroJelly finish (Ungasan)</h2>
<p>Our ${t('caviar-luxury-anti-aging-lift', 'Caviar Luxury Anti-Aging & Lift')}, ${t('cryo-skin-reset', 'Cryo Skin Reset')} and ${t('bright-pigment-correct', 'Bright & Pigment Correct')} end with a HydroJelly mask that seals in actives. They are exclusive to our Uluwatu Ungasan studio.</p>

<h2>5. Beyond the face (Bingin)</h2>
<p>Back breakouts, chest pigmentation, bumps on the booty: our <a href="/treatments/#korean-body-hydrafacials">Korean Body Hydrafacials</a> bring the same technology to the body, exclusively at Uluwatu Bingin.</p>

<h2>6. Transparent prices and packages</h2>
<p>All prices include the 15% tax and service charge. For lasting results, our <a href="/packages/">3-session packages</a> save up to 30%.</p>`,
    faqs: [
      ['How long does a Hydrafacial last?', 'The glow is visible immediately and lasts about a week. For lasting change, plan a series of 3 sessions spaced 2–3 weeks apart.'],
      ['Is a Hydrafacial painful?', 'No. Most people find it relaxing; the suction feels cool and slightly ticklish.'],
    ],
    related: ['ultimate-korean-glass-skin-hydralift', 'vitamin-c-sunshine-glow', 'caviar-luxury-anti-aging-lift'],
  },
];
