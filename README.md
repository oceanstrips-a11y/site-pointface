# POINT · FACE — site web

Site vitrine animé du studio de soins du visage POINT · FACE (Uluwatu Ungasan & Uluwatu Bingin).
Le site est statique et multi-pages, sans framework. Un script Node (`scripts/build.js`, sans dépendance) génère le HTML à partir des fichiers de données.

```
npm run build        # génère le site dans public/
npm run dev          # build + serveur local
```

## Où modifier quoi

| Fichier | Contenu |
|---|---|
| `src/data/site.js` | Contacts, WhatsApp, liens Fresha, adresses, horaires, Instagram, domaine |
| `src/data/treatments.js` | Soins, prix, ingrédients, technologies, add-ons, packages, aftercare |
| `src/data/concerns.js` | Pages « problématiques de peau » (rides, acné, déshydratation, soleil…) |
| `src/data/articles.js` | Articles du Journal (blog) |
| `src/data/faq.js` | FAQ générale |
| `src/data/reviews.json` | Avis Fresha (mis à jour automatiquement, ne pas éditer à la main) |
| `assets/css/main.css` · `assets/js/main.js` | Design et animations |
| `assets/img/logo.svg` | Logo POINT • FACE vectorisé (couleur pilotée en CSS) |

## À compléter avant la mise en ligne (`TODO` dans `src/data/site.js`)

1. **Domaine final** (`url`) — utilisé pour les canonicals, le sitemap, `llms.txt` et les données structurées.
2. **Lien Fresha** du studio de Bingin (`fresha`) — celui d'Ungasan est en place.
3. **Adresse complète du studio de Bingin** et son numéro WhatsApp s'il est différent.
4. **Horaires** réels de chaque studio, et les **coordonnées GPS** (`geo`) depuis Google Maps.
5. **Police Kenao** : déposer `assets/fonts/Kenao.woff2` (police sous licence). Elle est branchée automatiquement au build ; en attendant, Open Sauce Sans la remplace.

## Hébergement (Netlify recommandé)

`netlify.toml` est prêt : build `node scripts/build.js`, publication de `public/`, fonction `netlify/functions/reviews.mjs` servie sur `/api/reviews`.

## Avis Google & Fresha

- **Google** (en direct) : la fonction `/api/reviews` appelle l'API officielle Google Places (New) pour les deux studios. Les CGU de Google interdisent de stocker ces avis : ils sont donc chargés à chaque visite (cache de 15 min).
  Variables d'environnement Netlify : `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID_UNGASAN`, `GOOGLE_PLACE_ID_BINGIN`.
  L'API renvoie au maximum 5 avis par lieu, plus la note et le nombre total d'avis.
  Configuration pas à pas :
  1. Sur https://console.cloud.google.com, crée un projet (ex. « Point Face site »). Ajoute un compte de facturation : Google l'exige, même si l'usage du site reste en général dans le crédit gratuit mensuel.
  2. Menu **APIs & Services → Library** : active **Places API (New)**.
  3. **APIs & Services → Credentials → Create credentials → API key**. Dans « Edit API key », section **API restrictions**, choisis « Restrict key » et coche uniquement **Places API (New)**. Ne mets pas de restriction « Websites » : la clé est utilisée côté serveur (fonction Netlify), jamais dans le navigateur.
  4. Trouve le **Place ID** de chaque studio sur https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder (cherche « Point Face Ungasan », puis « Point Face Bingin »). Il commence souvent par `ChIJ…`.
  5. Sur Netlify : **Site configuration → Environment variables → Add a variable**, crée `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID_UNGASAN` et `GOOGLE_PLACE_ID_BINGIN`, puis **Deploys → Trigger deploy**.
  6. Vérifie en ouvrant `https://ton-domaine/api/reviews` : tu dois voir la note et les avis au format JSON.
  Ne partage jamais la clé par message ou dans le code : elle se saisit uniquement dans Netlify.
- **Fresha** (quotidien) : Fresha n'a pas d'API publique. `.github/workflows/sync-reviews.yml` lance chaque matin `scripts/sync-fresha-reviews.js`, qui lit la note et les avis publics de chaque page Fresha, met à jour `src/data/reviews.json` et le commit. Netlify redéploie alors le site.
  Les URLs Fresha se règlent dans `site.js` ou dans les variables GitHub `FRESHA_URL_UNGASAN` / `FRESHA_URL_BINGIN`. Si une page ne peut pas être lue, les données précédentes sont conservées.
- Seuls les avis 4★ et 5★ avec un texte sont affichés. Sans données, la section affiche des liens vers les avis Google et Fresha.

## Réservation

Chaque bouton « Book » ouvre un panneau avec deux options : **WhatsApp** (Uluwatu Ungasan ou Uluwatu Bingin, message pré-rempli avec le nom du soin) ou **Fresha** (Ungasan ou Bingin). Sans JavaScript, le bouton mène à la page `/book/`.

## Actions du pré-audit GEO (Allrank) intégrées

- **Actif web propriétaire** : 42 pages indexables, au lieu de dépendre uniquement de Fresha, Instagram et Linktree.
- **Données structurées JSON-LD** : Organization, BeautySalon/DaySpa pour chaque studio (adresse, horaires, catalogue de prix, note agrégée), Service + Offer pour chaque soin, FAQPage, BlogPosting, BreadcrumbList.
- **Pages par intention de recherche** :
  - pages studio (« facial Uluwatu / Ungasan / Bingin ») ;
  - 13 pages soin ;
  - 8 pages problématique de peau, sur le modèle des pages « concerns » de SÕMA ;
  - 10 articles sur le modèle du blog de Korean Face Bar, qui répondent aux requêtes testées dans l'audit : « Hydrafacial vs Korean facial », « Why does my skin get dehydrated in Bali », « How often should you get a facial in Bali's climate », « Which facial spa should I book in Uluwatu »…
- **Format citable par les IA** : chaque article commence par une réponse courte (« The short answer ») et des points clés, suivis de titres H2 et d'une FAQ.
- **`/llms.txt` et `/llms-full.txt`** : un résumé factuel de la marque (soins, prix, studios, réservation) destiné aux assistants IA.
- **`robots.txt`** autorise explicitement GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, etc. Un `sitemap.xml` est généré.
- **E-E-A-T** : page À propos (méthode, technologies, marques), prix transparents, avis Google et Fresha.
- Le volet « mentions externes » de l'audit (Finns Beach Club, Sejati, The Honeycombers…) se fait hors du site : relations presse, demandes d'inclusion dans ces listes.

## Accessibilité & performance

Images WebP en deux tailles, polices hébergées sur le site, aucune librairie JS, animations désactivées si l'appareil est réglé sur « réduire les animations », navigation clavier et lien d'évitement.
