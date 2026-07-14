# Earth Engine Studio website

Public Jekyll website for [Earth Engine Studio](https://www.earthengine.studio),
deployed to GitHub Pages. The main call to action opens the application at
[code.earthengine.studio](https://code.earthengine.studio/), and every language
links to the public documentation at
[docs.earthengine.studio](https://docs.earthengine.studio/).

## Local development

Requirements:

- Ruby 3.3 or newer
- Bundler

Install the locked dependencies and run the development server:

```sh
bundle install
bundle exec jekyll serve --livereload
```

Open <http://127.0.0.1:4000>. Build the production output with:

```sh
JEKYLL_ENV=production bundle exec jekyll build
```

The generated `_site/` directory is intentionally ignored.

## GitHub Pages deployment

The custom workflow in `.github/workflows/deploy-pages.yml` builds the Jekyll
site and publishes its artifact whenever `master` is pushed. In the GitHub
repository settings, open **Pages** and set **Source** to **GitHub Actions**.

The repository includes `CNAME` for `www.earthengine.studio`. Configure the DNS
provider with:

| Type | Host | Value |
| --- | --- | --- |
| `CNAME` | `www` | `open-geocomputing.github.io` |

Remove any conflicting `A`, `AAAA`, or `CNAME` records for `www`. After the
first successful deployment and DNS verification, confirm the custom domain in
GitHub Pages settings and enable **Enforce HTTPS**. For a custom GitHub Actions
workflow, the Pages custom-domain setting is authoritative; the checked-in
`CNAME` is kept as a visible copy of the intended domain but does not configure
Pages by itself. DNS and GitHub repository settings are external operations and
are not changed by the site build.

## Structure

- `_layouts/landing.html` — shared translated landing page and product demonstration
- `_data/i18n/` — complete landing-page copy for all six languages
- `_layouts/default.html` — metadata and shared document shell
- `assets/images/product/` — optimized, sanitized captures of the real Studio interface
- `assets/` — site styles, interaction code, brand assets, and social preview
- `404.html` — custom not-found page
- `_config.yml` — Jekyll and canonical-domain configuration

## Language routes

The complete English landing page remains at `/`. A shared language selector
links to complete localized landing pages:

| Language | Route | Current state |
| --- | --- | --- |
| English | `/` | Complete landing page |
| French | `/fr/` | Complete translated landing page |
| German | `/de/` | Complete translated landing page |
| Spanish | `/es/` | Complete translated landing page |
| Portuguese (Brazil) | `/pt-br/` | Complete translated landing page |
| Simplified Chinese | `/zh-cn/` | Complete translated landing page |

Language metadata is defined once in `_data/languages.yml`; the localized
copy lives in `_data/i18n/`, and the full page design is shared through
`_layouts/landing.html`. Each route sets its own document language, metadata,
navigation labels, and disclaimer. The default layout emits reciprocal
`hreflang` links plus `x-default` for `/`. Localized code-editor interfaces are
identified on each page as coming soon; the current Studio remains accessible
from every language route.

See [the screenshot and visual replacement guide](SCREENSHOTS.md) for the
current desktop/mobile references, sanitized live Studio captures, production
image inventory, remaining product capture list, dimensions, privacy rules, and
replacement checklist.

The published product visuals are exported from real sessions on the Studio
development editor. Interface-shaped mockups must not be substituted for these
captures; decorative diagrams and code samples should remain visibly abstract.

## Product relationship

Earth Engine Studio is an independent project built on top of Google Earth
Engine. It is not an official Google or Google Earth Engine product.
