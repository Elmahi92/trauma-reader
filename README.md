# Arabic Trauma Reader

An Arabic, right-to-left reader for the translated book chapters. Features include full-text search, chapter and section navigation, saved bookmarks, reading controls, and a combined PDF download.

## Run Locally

From the repository directory:

```powershell
node server.js
```

Then open `http://localhost:4173/`.

## Deploy to GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the site when changes are pushed to the `main` branch. In repository settings, enable Pages and set the deployment source to **GitHub Actions**. After the first successful run, GitHub will show the site URL in Actions or Pages settings.

The `chapter_texts` directory contains Arabic translations only. Do not add Swedish source files or temporary build files to the published site.
