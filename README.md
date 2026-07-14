# Earth Engine Studio website

Public Jekyll website for [Earth Engine Studio](https://www.earthengine.studio),
deployed to GitHub Pages. The main call to action opens the application at
[code.earthengine.studio](https://code.earthengine.studio/).

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

- `index.html` — landing-page content and product demonstration
- `_layouts/default.html` — metadata and shared document shell
- `assets/` — site styles, interaction code, brand assets, and social preview
- `404.html` — custom not-found page
- `_config.yml` — Jekyll and canonical-domain configuration

See [the screenshot and visual replacement guide](SCREENSHOTS.md) for the
current desktop/mobile references, sanitized live Studio captures, production
image inventory, remaining product capture list, dimensions, privacy rules, and
replacement checklist.

## Product relationship

Earth Engine Studio is an independent project built on top of Google Earth
Engine. It is not an official Google or Google Earth Engine product.
