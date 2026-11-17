"""SEO automation for www.pointfacebali.com (run by GitHub Actions).

  python3 seo_ping.py notify <old_sitemap.xml> <new_sitemap.xml>
      New or updated URLs -> IndexNow (Bing, Yandex, Seznam...) + sitemap resubmitted
      to Google Search Console (if the GSC_SA_KEY secret is set).

  python3 seo_ping.py inspect
      Checks with the Search Console URL Inspection API whether recent Journal pages
      (sitemap lastmod in the last 30 days) are indexed by Google. Writes a report to
      report.md and exits 2 if a page older than 3 days is still not indexed.
"""
import datetime, json, os, re, sys, urllib.parse, urllib.request

HOST = 'www.pointfacebali.com'
BASE = f'https://{HOST}'
SITEMAP = f'{BASE}/sitemap.xml'
INDEXNOW_KEY = 'aa8172884e27bf25e56a6f55831e482f'


def parse_sitemap(path):
    if not path or not os.path.exists(path):
        return {}
    s = open(path, encoding='utf-8').read()
    return {m.group(1): (m.group(2) or '') for m in
            re.finditer(r'<loc>([^<]+)</loc>(?:<lastmod>([^<]+)</lastmod>)?', s)}


def http(method, url, data=None, token=None):
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(url, data=body, method=method)
    req.add_header('Content-Type', 'application/json; charset=utf-8')
    if token:
        req.add_header('Authorization', f'Bearer {token}')
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            raw = r.read().decode() or '{}'
            return r.status, (json.loads(raw) if raw.strip().startswith('{') else raw)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()


def google_token():
    key = os.environ.get('GSC_SA_KEY', '').strip()
    if not key:
        return None
    from google.oauth2 import service_account
    import google.auth.transport.requests
    creds = service_account.Credentials.from_service_account_info(
        json.loads(key), scopes=['https://www.googleapis.com/auth/webmasters'])
    creds.refresh(google.auth.transport.requests.Request())
    return creds.token


def gsc_sites():
    v = os.environ.get('GSC_SITE', '').strip()
    return [v] if v else ['sc-domain:pointfacebali.com', f'{BASE}/']


def notify(old, new):
    a, b = parse_sitemap(old), parse_sitemap(new)
    urls = [u for u, lm in b.items() if u not in a or a[u] != lm]
    print('Changed URLs:', *urls, sep='\n  ')
    if urls:
        st, res = http('POST', 'https://api.indexnow.org/IndexNow', {
            'host': HOST, 'key': INDEXNOW_KEY, 'keyLocation': f'{BASE}/{INDEXNOW_KEY}.txt', 'urlList': urls})
        print('IndexNow:', st, res if st >= 300 else 'OK')
    token = google_token()
    if not token:
        print('Google: GSC_SA_KEY secret not set, sitemap submission skipped.')
        return
    for site in gsc_sites():
        url = (f'https://www.googleapis.com/webmasters/v3/sites/{urllib.parse.quote(site, safe="")}'
               f'/sitemaps/{urllib.parse.quote(SITEMAP, safe="")}')
        st, res = http('PUT', url, token=token)
        print('Google sitemap submit', site, st, '' if st < 300 else ' '.join(str(res).split())[:300])
        if st < 300:
            break


def inspect():
    token = google_token()
    if not token:
        print('GSC_SA_KEY secret not set: nothing to inspect.')
        open('report.md', 'w').write('Google Search Console is not connected yet (GSC_SA_KEY secret missing).\n')
        return 0
    today = datetime.date.today()
    pages = {u: lm for u, lm in parse_sitemap('sitemap.xml').items()
             if '/journal/' in u and u != f'{BASE}/journal/' and lm
             and (today - datetime.date.fromisoformat(lm[:10])).days <= 30}
    rows, late = [], []
    for url, lm in sorted(pages.items(), key=lambda x: x[1], reverse=True):
        res = None
        for site in gsc_sites():
            st, res = http('POST', 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
                           {'inspectionUrl': url, 'siteUrl': site}, token=token)
            if st < 300:
                break
        if not isinstance(res, dict):
            try:
                msg = json.loads(res)['error']['message']
            except Exception:
                msg = str(res)
            rows.append((url, lm, 'erreur API', ' '.join(msg.split())[:160].replace('|', '/'))); continue
        r = res.get('inspectionResult', {}).get('indexStatusResult', {})
        verdict, state = r.get('verdict', '?'), r.get('coverageState', '?')
        rows.append((url, lm, verdict, state))
        age = (today - datetime.date.fromisoformat(lm[:10])).days
        if verdict != 'PASS' and age >= 3:
            late.append((url, lm, state))
    lines = ['| Page | Publiée | Google | Détail |', '| --- | --- | --- | --- |']
    lines += [f'| {u} | {lm} | {"✅ indexée" if v == "PASS" else "❌ " + v} | {s} |' for u, lm, v, s in rows]
    report = '\n'.join(lines) + '\n'
    if late:
        report += ('\n**À faire dans Search Console :** ouvrir « Inspection de l\'URL », coller chaque URL ❌ '
                   'publiée depuis plus de 3 jours, puis cliquer sur « Demander l\'indexation ».\n')
    open('report.md', 'w').write(report)
    print(report)
    return 2 if late else 0


if __name__ == '__main__':
    if sys.argv[1] == 'notify':
        notify(sys.argv[2] if len(sys.argv) > 2 else None, sys.argv[3] if len(sys.argv) > 3 else 'sitemap.xml')
    else:
        sys.exit(inspect())
