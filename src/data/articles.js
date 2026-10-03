// Journal articles. Each one answers a real search / AI-assistant question (see GEO pre-audit),
// opens with a short direct answer + key takeaways, and links only to POINT · FACE services.

const t = (slug, label) => `<a href="/treatments/${slug}/">${label}</a>`;
const c = (slug, label) => `<a href="/concerns/${slug}/">${label}</a>`;

module.exports = [
  {
    slug: 'hydrafacial-vs-korean-facial',
    title: 'Hydrafacial vs Korean Facial: Which Is Best for Glowing Skin?',
    description:
      'Hydrafacial or Korean facial? The difference, the results, who each is for — and why our Korean Hydrafacials in Uluwatu combine both.',
    category: 'Comparison',
    date: '2026-09-08',
    readTime: 6,
    image: 'korean-glass-skin-hydrafacial',
    answer:
      'A Hydrafacial is a technology: a hydrodermabrasion device that cleanses, extracts and infuses serums in one pass. A Korean facial is a philosophy: many gentle layered steps focused on hydration and a "glass skin" finish. You do not have to choose — a Korean Hydrafacial uses the device to deliver Korean actives, giving the deep clean of a Hydrafacial with the glow of a Korean routine.',
    takeaways: [
      'Hydrafacial = device-led deep cleansing, extraction and serum infusion.',
      'Korean facial = multi-step, hydration-first ritual with K-beauty actives.',
      'For instant glow in Bali, a Korean Hydrafacial combines both.',
      'Every POINT · FACE facial starts with a free skin analysis to choose for you.',
    ],
    body: `
<h2>What is a Hydrafacial?</h2>
<p>A Hydrafacial is a non-invasive facial performed with a hydrodermabrasion machine. A spiral-tipped handpiece uses water and gentle suction (a "vortex") to exfoliate dead cells, loosen and extract what is clogging the pores, and infuse serums at the same time. It is fast, painless and has no downtime — you can go to dinner straight after.</p>
<p>At POINT · FACE, our Hydrafacial systems also include ultrasonic infusion, oxygen, radiofrequency, microcurrent, high frequency, a cold hammer and LED, so each treatment can be tailored to a concern.</p>

<h2>What is a Korean facial?</h2>
<p>A Korean facial follows the K-beauty philosophy: many thin, gentle layers rather than one aggressive step. Double cleansing, soft exfoliation, essences and ampoules, sheet or jelly masks and a lot of massage. The goal is hydrated, refined, luminous skin — the famous <em>glass skin</em>. Ingredients are typical of Korean skincare: snail mucin, centella asiatica, propolis, niacinamide, peptides, hyaluronic acid.</p>

<h2>Hydrafacial vs Korean facial: the key differences</h2>
<table>
<thead><tr><th></th><th>Hydrafacial</th><th>Korean facial</th></tr></thead>
<tbody>
<tr><td>Approach</td><td>Technology-led</td><td>Ritual, layering</td></tr>
<tr><td>Strength</td><td>Deep pore cleansing & extraction</td><td>Hydration & radiance</td></tr>
<tr><td>Feels like</td><td>Cool, slightly ticklish suction</td><td>Very relaxing, lots of massage</td></tr>
<tr><td>Best for</td><td>Congestion, blackheads, dull texture</td><td>Dehydration, sensitivity, glow</td></tr>
<tr><td>Downtime</td><td>None</td><td>None</td></tr>
</tbody>
</table>

<h2>Why we combine both: the Korean Hydrafacial</h2>
<p>In a tropical climate, skin needs both: a real deep clean (sweat, sunscreen and humidity clog pores) and serious hydration (sun, salt and AC dehydrate). Our Korean Hydrafacials use the device to cleanse and extract, then infuse Korean actives from COSRX, SKIN1004, Beauty of Joseon, Mediheal and Medicube.</p>
<ul>
<li>For instant glass-skin glow: ${t('ultimate-korean-glass-skin-hydralift', 'Ultimate Korean Glass Skin & Hydralift')}</li>
<li>For congestion and breakouts: ${t('k-balance-acne-clear', 'K-Balance Acne Clear')}</li>
<li>For firmness: ${t('advanced-collagen-booster', 'Advanced Collagen Booster')}</li>
<li>For sensitive or stressed skin: ${t('pdrn-cellular-repair-salmon-dna', 'PDRN Cellular Repair')}</li>
</ul>

<h2>And if you prefer something 100% natural?</h2>
<p>Our Balinese natural facials — the ${t('balinese-hydrating-ritual-rose-aloe', 'Hydrating Ritual (Rose & Aloe)')} and the ${t('balinese-purifying-ritual-clay-turmeric', 'Purifying Ritual (Clay & Turmeric)')} — use manual techniques and Balinese botanicals from Utama Spice & Embun. They are gentler and more sensory, with visible freshness rather than device-level results.</p>

<h2>How to choose</h2>
<p>Not sure? Every treatment at POINT · FACE starts with a complimentary professional skin analysis. Your therapist looks at hydration, oil, pores, pigmentation and sensitivity and recommends the right facial — or a combination — for your skin on the day.</p>`,
    faqs: [
      ['Is a Hydrafacial better than a regular facial?', 'It is more results-driven for cleansing, extraction and serum penetration. A regular facial is gentler and more relaxing. The best option depends on your skin and goals.'],
      ['How often can I get a Hydrafacial?', 'Every 2–4 weeks. In Bali\'s climate, every 3–4 weeks is a good rhythm for most skin types.'],
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
<p>Our <a href="/treatments/#packages">3-session packages</a> (up to 30% off, valid 5 months) are designed for exactly this rhythm.</p>

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
<p>Before an event: Kobido 60 min + Buccal. After a stressful week: Gua Sha or the ${t('point-face-relaxation-ritual', 'Relaxation Ritual')}. Living in Bali: a <a href="/treatments/#packages">3-session massage package</a> at 20% off.</p>`,
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
      'Our Ultimate Korean Glass Skin & Hydralift: 17+ steps, 80 min.',
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
<p>The ${t('ultimate-korean-glass-skin-hydralift', 'Ultimate Korean Glass Skin & Hydralift')} is our signature 80-minute protocol with 17+ steps: double cleansing, hydrodermabrasion, extraction, ultrasonic infusion of a 6-peptide booster, snail mucin and hyaluronic acid, oxygen therapy, high frequency, cold hammer, red & green LED and a hydrogel mask. Features COSRX, SKIN1004 and Beauty of Joseon.</p>

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
<p>Land at least 3 days before if you can, and book a ${t('pdrn-cellular-repair-salmon-dna', 'PDRN Cellular Repair')} or hydrating facial on day 1 or 2 to undo the flight. Bridesmaids and friends? Our Duo Package is ideal — and we can host small groups across our <a href="/locations/">two Uluwatu studios</a>.</p>`,
    faqs: [
      ['Can I get a facial the day before my wedding?', 'We advise against exfoliating facials the day before. A massage and hydrating mask are perfect.'],
    ],
    related: ['caviar-luxury-anti-aging-lift', 'ultimate-korean-glass-skin-hydralift', 'buccal-massage'],
  },
];
