# Journal publication queue (not served by GitHub Pages)

Branch `journal-queue` holds the scheduled Journal articles for www.pointfacebali.com.

- `queue/schedule.json` — publication dates (Tue/Fri)
- `queue/articles/*.json` — article content (title, meta, body HTML, FAQ, images, treatments)
- `queue/img/*.webp` — article photos
- `queue/publish.py` — publishes every article whose date has passed into a checkout of `main`:
  `python3 queue/publish.py --site /path/to/main/checkout --due`

A scheduled task runs this every Tuesday and Friday, commits to `main` and pushes.
