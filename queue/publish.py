"""Publish queued Journal articles into the POINT · FACE static site.

Usage:
  python3 publish.py --site /path/to/site --due [--today YYYY-MM-DD]
  python3 publish.py --site /path/to/site --slug <slug> --date YYYY-MM-DD

Reads articles/<slug>.json, img/*.webp and schedule.json next to this script.
Writes journal/<slug>/index.html, copies images, and updates journal/index.html,
the home page Journal section, sitemap.xml, llms.txt and llms-full.txt.
Prints the list of changed paths (relative to --site). Fails loudly if the site
markup no longer matches what the script expects.
"""
import argparse, datetime, html, json, os, re, shutil, sys

HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_ARTICLE = 'journal/best-hydrafacial-bali/index.html'
BASE = 'https://www.pointfacebali.com'


def rd(p):
    with open(p, encoding='utf-8') as f:
        return f.read()


def wr(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(s)


def sub1(pattern, repl, s, flags=re.S):
    new, n = re.subn(pattern, lambda m: repl, s, count=1, flags=flags)
    if n != 1:
        raise SystemExit(f'pattern not found: {pattern[:80]}')
    return new


def e(s):
    return html.escape(s, quote=True)


def fmt_date(d):
    dt = datetime.date.fromisoformat(d)
    return f'{dt.day} {dt.strftime("%B %Y")}'


def treatment_card(site, slug):
    idx = rd(os.path.join(site, 'treatments/index.html'))
    m = re.search(r'<article class="t-card"[^>]*>\s*<a href="/treatments/' + re.escape(slug) + r'/".*?</article>', idx, flags=re.S)
    if not m:
        raise SystemExit(f'treatment card not found: {slug}')
    card = m.group(0)
    name = html.unescape(re.search(r'<h3 class="t-card__title">(.*?)</h3>', card, flags=re.S).group(1).strip())
    price = re.search(r'<p class="t-card__price">(.*?)</p>', card, flags=re.S).group(1)
    price = re.sub(r'\s*<s>.*?</s>', '', price).strip()
    return card, name, price


def a_card_from_index(site, slug):
    idx = rd(os.path.join(site, 'journal/index.html'))
    m = re.search(r'<article class="a-card"[^>]*>\s*<a href="/journal/' + re.escape(slug) + r'/".*?</article>', idx, flags=re.S)
    if m:
        return m.group(0)
    # it may be the lead article: rebuild a card from the lead block
    lead = lead_block(idx)
    if f'href="/journal/{slug}/"' in lead:
        return lead_to_card(lead)
    raise SystemExit(f'article card not found: {slug}')


def lead_block(idx):
    m = re.search(r'<article class="lead-article".*?</article>', idx, flags=re.S)
    if not m:
        raise SystemExit('lead article not found in journal/index.html')
    return m.group(0)


def lead_to_card(lead):
    href = re.search(r'<a href="([^"]+)"', lead).group(1)
    img = re.search(r'<img [^>]*>', lead).group(0)
    img = img.replace('sizes="(max-width: 760px) 100vw, 55vw"', 'sizes="(max-width: 760px) 100vw, 33vw"')
    img = img.replace('loading="eager" fetchpriority="high"', 'loading="lazy"')
    meta = re.search(r'<p class="a-card__meta">.*?</p>', lead, flags=re.S).group(0)
    title = re.search(r'<h2 class="h-display">(.*?)</h2>', lead, flags=re.S).group(1)
    return (f'<article class="a-card" data-reveal style="--d:0ms">\n  <a href="{href}" data-cursor="Read">\n'
            f'    <div class="a-card__media img-zoom">{img}</div>\n    {meta}\n'
            f'    <h3 class="a-card__title">{title}</h3>\n  </a>\n</article>')


def new_card(a):
    h = a['hero']
    return (f'<article class="a-card" data-reveal style="--d:0ms">\n  <a href="/journal/{a["slug"]}/" data-cursor="Read">\n'
            f'    <div class="a-card__media img-zoom"><img src="/assets/img/{h["file"]}.webp" srcset="/assets/img/{h["file"]}-sm.webp {h["sw"]}w, /assets/img/{h["file"]}.webp {h["w"]}w" sizes="(max-width: 760px) 100vw, 33vw" width="{h["w"]}" height="{h["h"]}" alt="{e(h["alt"])}" loading="lazy" decoding="async"></div>\n'
            f'    <p class="a-card__meta"><span>{e(a["category"])}</span><span>{e(a["read"])} read</span></p>\n'
            f'    <h3 class="a-card__title">{e(a["h1"])}</h3>\n  </a>\n</article>')


def renumber_delays(grid):
    i = [0]
    def r(m):
        d = (i[0] % 3) * 100; i[0] += 1
        return f'style="--d:{d}ms"'
    return re.sub(r'style="--d:\d+ms"', r, grid)


def render_article(site, a, date):
    t = rd(os.path.join(site, TEMPLATE_ARTICLE))
    url = f'{BASE}/journal/{a["slug"]}/'
    h = a['hero']
    img_url = f'{BASE}/assets/img/{h["file"]}.webp'
    t = sub1(r'<title>.*?</title>', f'<title>{e(a["title_tag"])}</title>', t)
    t = sub1(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{e(a["meta"])}">', t)
    t = sub1(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">', t)
    t = sub1(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{e(a["title_tag"])}">', t)
    t = sub1(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{e(a["meta"])}">', t)
    t = sub1(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">', t)
    t = sub1(r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{img_url}">', t)
    # JSON-LD
    m = re.search(r'<script type="application/ld\+json">(.*?)</script>', t, flags=re.S)
    ld = json.loads(m.group(1))
    keep = [g for g in ld['@graph'] if g.get('@type') in ('Organization', 'WebSite')]
    posting = {"@type": "BlogPosting", "@id": url + '#article', "headline": a['h1'], "description": a['meta'],
               "abstract": a['intro'], "image": img_url, "datePublished": date, "dateModified": date,
               "inLanguage": "en", "articleSection": a['category'],
               "author": {"@type": "Organization", "name": "POINT · FACE Expert Therapists", "url": BASE + '/about/'},
               "publisher": {"@id": BASE + '/#organization'}, "mainEntityOfPage": url,
               "about": [{"@id": f'{BASE}/treatments/{s}/#service'} for s in a['treatments']]}
    crumbs = {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE + '/'},
        {"@type": "ListItem", "position": 2, "name": "Journal", "item": BASE + '/journal/'},
        {"@type": "ListItem", "position": 3, "name": a['h1'], "item": url}]}
    faq = {"@type": "FAQPage", "@id": url + '#faq', "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": ans}} for q, ans in a['faq']]}
    ld['@graph'] = keep + [posting, crumbs] + ([faq] if a['faq'] else [])
    t = t[:m.start(1)] + json.dumps(ld, ensure_ascii=False, separators=(',', ':')) + t[m.end(1):]
    # breadcrumb + header
    t = sub1(r'(<nav class="breadcrumb container".*?<li aria-current="page">).*?(</li>)', None, t) if False else t
    t = re.sub(r'(<nav class="breadcrumb container"[^>]*>\s*<ol>.*?<li aria-current="page">)(.*?)(</li>)',
               lambda mm: mm.group(1) + e(a['h1']) + mm.group(3), t, count=1, flags=re.S)
    t = sub1(r'<p class="a-card__meta" data-reveal>.*?</p>',
             f'<p class="a-card__meta" data-reveal><span>{e(a["category"])}</span><span>{e(a["read"])} read</span><time datetime="{date}">{fmt_date(date)}</time></p>', t)
    t = sub1(r'<h1 class="h-display h-display--lg" data-split>.*?</h1>',
             f'<h1 class="h-display h-display--lg" data-split>{e(a["h1"])}</h1>', t)
    t = sub1(r'<div data-parallax="0.08"><img [^>]*></div>',
             f'<div data-parallax="0.08"><img src="/assets/img/{h["file"]}.webp" srcset="/assets/img/{h["file"]}-sm.webp {h["sw"]}w, /assets/img/{h["file"]}.webp {h["w"]}w" sizes="100vw" width="{h["w"]}" height="{h["h"]}" alt="{e(h["alt"])}" loading="eager" fetchpriority="high" decoding="async"></div>', t)
    cards, mini = [], []
    for s in a['treatments']:
        card, name, price = treatment_card(site, s)
        cards.append(card)
        mini.append(f'<li><a href="/treatments/{s}/" class="link">{e(name)}</a><span>{price}</span></li>')
    t = sub1(r'<ul class="mini-list">.*?</ul>', '<ul class="mini-list">' + ''.join(mini) + '</ul>', t)
    t = sub1(r'<div class="answer-box" data-reveal>.*?</div>',
             f'<div class="answer-box" data-reveal>\n        <p class="eyebrow">In short</p>\n        <p>{e(a["intro"])}</p>\n      </div>', t)
    t = re.sub(r'\s*<div class="takeaways" data-reveal>.*?</div>', '', t, count=1, flags=re.S)
    t = sub1(r'<div class="prose">.*?</div>\s*(?=<h2 class="h-sub">FAQ</h2>)', '<div class="prose">\n' + a['body_html'] + '</div>\n      ', t)
    items = ''.join(
        f'\n  <details class="faq__item" data-reveal>\n    <summary><span>{e(q)}</span><span class="faq__icon" aria-hidden="true"></span></summary>\n'
        f'    <div class="faq__answer"><p>{e(ans)}</p></div>\n  </details>' for q, ans in a['faq'])
    t = sub1(r'<div class="faq">.*?\n</div>', '<div class="faq">\n  ' + items + '\n</div>', t)
    t = sub1(r'(<section class="section section--tint" aria-label="Recommended treatments">.*?<div class="t-grid">).*?(</div>\s*</div>\s*</section>)',
             None, t) if False else re.sub(
        r'(<section class="section section--tint" aria-label="Recommended treatments">.*?<div class="t-grid">)(.*?)(</div>\s*</div>\s*</section>)',
        lambda mm: mm.group(1) + '\n' + '\n'.join(cards) + mm.group(3), t, count=1, flags=re.S)
    rel = [a_card_from_index(site, s) for s in a['related'][:3]]
    t = re.sub(r'(<section class="section" aria-label="More articles">.*?<div class="a-grid">)(.*?)(</div>\s*</div>\s*</section>)',
               lambda mm: mm.group(1) + '\n' + renumber_delays('\n'.join(rel)) + mm.group(3), t, count=1, flags=re.S)
    for needle in ('best-hydrafacial-bali/#article', 'canonical" href="https://www.pointfacebali.com/journal/best-hydrafacial-bali/"', 'data-parallax="0.08"><img src="/assets/img/hydrojelly-mask-treatment.webp'):
        if needle in t and a['slug'] != 'best-hydrafacial-bali':
            raise SystemExit(f'template leftover: {needle}')
    return t


def update_journal_index(site, a):
    p = os.path.join(site, 'journal/index.html')
    idx = rd(p)
    old_lead = lead_block(idx)
    hh = a['hero']
    lead = (f'<article class="lead-article" data-reveal>\n      <a href="/journal/{a["slug"]}/" class="lead-article__link" data-cursor="Read">\n'
            f'        <div class="lead-article__media img-zoom"><img src="/assets/img/{hh["file"]}.webp" srcset="/assets/img/{hh["file"]}-sm.webp {hh["sw"]}w, /assets/img/{hh["file"]}.webp {hh["w"]}w" sizes="(max-width: 760px) 100vw, 55vw" width="{hh["w"]}" height="{hh["h"]}" alt="{e(hh["alt"])}" loading="eager" fetchpriority="high" decoding="async"></div>\n'
            f'        <div class="lead-article__body">\n          <p class="a-card__meta"><span>{e(a["category"])}</span><span>{e(a["read"])} read</span></p>\n'
            f'          <h2 class="h-display">{e(a["h1"])}</h2>\n          <p>{e(a["meta"])}</p>\n'
            f'          <span class="link link--arrow">Read the article</span>\n        </div>\n      </a>\n    </article>')
    idx = idx.replace(old_lead, lead, 1)
    m = re.search(r'(</article>\s*<div class="a-grid">)(.*?)(</div>\s*</div>\s*</section>)', idx, flags=re.S)
    if not m:
        raise SystemExit('journal a-grid not found')
    grid = renumber_delays(lead_to_card(old_lead) + '\n' + m.group(2).lstrip('\n'))
    idx = idx[:m.start(2)] + '\n' + grid + idx[m.end(2):]
    wr(p, idx)


def update_home(site, a):
    p = os.path.join(site, 'index.html')
    s = rd(p)
    m = re.search(r'(<section class="section section--tint" aria-labelledby="journal-title">.*?<div class="a-grid">)(.*?)(</div>\s*</div>\s*</section>)', s, flags=re.S)
    if not m:
        raise SystemExit('home journal grid not found')
    cards = re.findall(r'<article class="a-card".*?</article>', m.group(2), flags=re.S)
    cards = [new_card(a)] + cards[:2]
    s = s[:m.start(2)] + '\n' + renumber_delays('\n'.join(cards)) + s[m.end(2):]
    wr(p, s)


def update_sitemap(site, a, date):
    p = os.path.join(site, 'sitemap.xml')
    s = rd(p)
    line = f'  <url><loc>{BASE}/journal/{a["slug"]}/</loc><lastmod>{date}</lastmod><priority>0.7</priority></url>'
    if f'/journal/{a["slug"]}/<' in s:
        return
    s = sub1(r'(  <url><loc>https://www\.pointfacebali\.com/journal/</loc><lastmod>)[^<]*(</lastmod>[^\n]*\n)',
             None, s) if False else re.sub(r'(  <url><loc>https://www\.pointfacebali\.com/journal/</loc><lastmod>)[^<]*(</lastmod>[^\n]*\n)',
                                           lambda mm: mm.group(1) + date + mm.group(2) + line + '\n', s, count=1)
    if line not in s:
        raise SystemExit('sitemap journal entry not found')
    wr(p, s)


def text_of(body_html):
    t = re.sub(r'<img[^>]*>', '', body_html)
    t = re.sub(r'<[^>]+>', ' ', t)
    return re.sub(r'\s+', ' ', html.unescape(t)).strip()


def update_llms(site, a):
    url = f'{BASE}/journal/{a["slug"]}/'
    p = os.path.join(site, 'llms.txt')
    s = rd(p)
    if url not in s:
        s = sub1(r'(## Journal\n)', None, s) if False else re.sub(r'(## Journal\n)', lambda mm: mm.group(1) + f'- [{a["h1"]}]({url}): {a["intro"]}\n', s, count=1)
        if url not in s:
            raise SystemExit('llms.txt Journal section not found')
        wr(p, s)
    p = os.path.join(site, 'llms-full.txt')
    s = rd(p)
    if f'### {a["h1"]}\n' not in s:
        block = f'### {a["h1"]}\n{a["intro"]}\n\n{text_of(a["body_html"])}\n\n'
        s2 = re.sub(r'(## Articles\n)', lambda mm: mm.group(1) + block, s, count=1)
        if s2 == s:
            raise SystemExit('llms-full.txt Articles section not found')
        wr(p, s2)


EXTRA_PAGES = {
    'best-facial-bali': ['concerns/dull-tired-skin-glass-skin', 'locations/uluwatu-ungasan', 'locations/uluwatu-bingin'],
    'facial-price-bali': ['locations/uluwatu-ungasan', 'locations/uluwatu-bingin'],
    'facial-bingin-padang-padang': ['locations/uluwatu-bingin'],
    'facial-ungasan-uluwatu': ['locations/uluwatu-ungasan'],
    'back-facial-bali': ['concerns/acne-breakouts-bali', 'locations/uluwatu-bingin', 'treatments/chest-spot-acne-clear'],
    'rainy-season-skin-bali': ['concerns/acne-breakouts-bali', 'concerns/dehydrated-skin-bali'],
    'face-massage-uluwatu': ['concerns/puffiness-jaw-tension', 'treatments/point-face-relaxation-ritual'],
    'sunburned-face-bali-what-to-do': ['concerns/sun-damaged-skin-bali', 'concerns/sensitive-reactive-skin'],
    'sun-spots-pigmentation-bali': ['concerns/pigmentation-dark-spots-bali', 'concerns/sun-damaged-skin-bali'],
    'facial-jimbaran-nusa-dua': ['locations/uluwatu-ungasan'],
    'hen-party-spa-day-uluwatu': [],
    'where-to-buy-korean-skincare-bali': ['concerns/dehydrated-skin-bali'],
    'mens-facial-uluwatu': ['concerns/acne-breakouts-bali'],
    'balinese-facial-ritual': ['concerns/sensitive-reactive-skin'],
}

RELATED_SECTION = ('<section class="section" aria-label="Related articles"><div class="container">\n  \n'
                   '<div class="section-head ">\n  <p class="eyebrow" data-reveal>From the Journal</p>\n'
                   '  <h2 class="h-display" data-split>Read more</h2>\n  \n  \n</div>\n  <div class="a-grid">\n'
                   '</div></div></section>\n\n')


def add_related_card(site, page, a):
    """Put the new article first in the page's 'Related articles' grid (max 3 cards)."""
    p = os.path.join(site, page, 'index.html')
    if not os.path.exists(p):
        print('WARN missing page', page); return None
    s = rd(p)
    if f'href="/journal/{a["slug"]}/"' in s:
        return None
    if 'aria-label="Related articles"' not in s:
        anchor = '<section class="section section--tint" aria-labelledby="l-faq">'
        if anchor not in s:
            print('WARN no place for related articles on', page); return None
        s = s.replace(anchor, RELATED_SECTION + anchor, 1)
    m = re.search(r'(aria-label="Related articles">.*?<div class="a-grid">)(.*?)(</div></div></section>)', s, flags=re.S)
    if not m:
        print('WARN related grid not parsed on', page); return None
    cards = re.findall(r'<article class="a-card".*?</article>', m.group(2), flags=re.S)
    cards = [new_card(a)] + cards[:2]
    s = s[:m.start(2)] + '\n' + renumber_delays('\n'.join(cards)) + s[m.end(2):]
    wr(p, s)
    return os.path.join(page, 'index.html')


def link_from_pages(site, a):
    pages = ['treatments/' + t for t in a['treatments']] + EXTRA_PAGES.get(a['slug'], [])
    return [x for x in (add_related_card(site, pg, a) for pg in dict.fromkeys(pages)) if x]


def publish(site, slug, date):
    a = json.load(open(os.path.join(HERE, 'articles', slug + '.json'), encoding='utf-8'))
    changed = []
    imgs = [a['hero']['file']] + re.findall(r'/assets/img/([\w-]+?)\.webp"', a['body_html'])
    for f in sorted(set(imgs)):
        for suf in ('', '-sm'):
            src = os.path.join(HERE, 'img', f + suf + '.webp')
            if os.path.exists(src):
                dst = os.path.join(site, 'assets/img', f + suf + '.webp')
                shutil.copyfile(src, dst); changed.append(os.path.relpath(dst, site))
    page = render_article(site, a, date)
    out = os.path.join(site, 'journal', slug, 'index.html')
    wr(out, page); changed.append(os.path.relpath(out, site))
    update_journal_index(site, a); update_home(site, a); update_sitemap(site, a, date); update_llms(site, a)
    changed += link_from_pages(site, a)
    changed += ['journal/index.html', 'index.html', 'sitemap.xml', 'llms.txt', 'llms-full.txt']
    return changed


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--site', required=True)
    ap.add_argument('--due', action='store_true')
    ap.add_argument('--today')
    ap.add_argument('--slug'); ap.add_argument('--date')
    ap.add_argument('--link-only', action='store_true')
    args = ap.parse_args()
    site = os.path.abspath(args.site)
    if args.link_only:
        a = json.load(open(os.path.join(HERE, 'articles', args.slug + '.json'), encoding='utf-8'))
        print('CHANGED', ' '.join(link_from_pages(site, a))); return
    if args.slug:
        todo = [(args.slug, args.date)]
    else:
        today = args.today or datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).date().isoformat()
        sched = json.load(open(os.path.join(HERE, 'schedule.json')))
        todo = [(x['slug'], today) for x in sched
                if x['date'] <= today and not os.path.exists(os.path.join(site, 'journal', x['slug'], 'index.html'))]
    if not todo:
        print('NOTHING_DUE'); return
    changed = []
    for slug, date in todo:
        changed += publish(site, slug, date)
        print('PUBLISHED', slug, date)
    print('CHANGED', ' '.join(sorted(set(changed))))


if __name__ == '__main__':
    main()
