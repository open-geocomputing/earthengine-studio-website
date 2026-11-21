# Agent instructions — Earth Engine Studio website

This repository is the public Jekyll landing site for
[www.earthengine.studio](https://www.earthengine.studio). The application lives
at `code.earthengine.studio` (source: the `earthengine-studio-editor`
repository) and the user guide at `docs.earthengine.studio` (source: the
`earthengine-studio-docs` repository).

## What belongs here

- Product positioning, the landing page, and its six translations
  (`en`, `fr`, `de`, `es`, `pt-br`, `zh-cn`). How-to content belongs in the
  documentation repository, not here; link to the matching guide instead.
- Copy is data: `_data/i18n/<lang>.yml`. The page shell is
  `_layouts/landing.html`. Never hard-code English text in the layout.

## Rules

- Every copy change lands in all six `_data/i18n/*.yml` files in the same
  commit, with identical key sets. Check with
  `ruby -ryaml -e 'k=->(h,p=""){h.flat_map{|a,b| b.is_a?(Hash) ? k.(b,"#{p}#{a}.") : ["#{p}#{a}"]}}; s=Dir["_data/i18n/*.yml"].map{|f| k.(YAML.load_file(f)).sort}.uniq; abort "key mismatch" unless s.size==1'`.
- Claims must match the current application. Verify features against the
  editor's `README.md`/`CHANGES.md` before describing them (for example, Studio
  renders maps with MapLibre only; do not advertise other renderers).
- Product images must be real, privacy-cropped Studio captures (see
  `SCREENSHOTS.md`). Keep the "independent project, not an official Google
  product" disclaimer.
- SEO contract: each landing page sets `title` (keyword first, the layout
  appends "| Earth Engine Studio"; keep the total near 70 characters),
  `description` (≤ 160 characters), `lang`, and `locale`. `hreflang`
  alternates, the sitemap, `robots.txt`, `llms.txt`, and the
  `SoftwareApplication` JSON-LD (`_includes/structured-data.html`) are
  generated; keep them building.
- Keep pages light: the Lottie renderer is loaded lazily by `assets/js/main.js`;
  do not add it back to `<head>`. Optimize new images (WebP/JPEG) and give them
  explicit `width`/`height`.

## Validate before committing

```sh
bundle exec jekyll build
bundle exec htmlproofer ./_site --disable-external   # if html-proofer is installed
```

Record user-visible changes in `CHANGES.md` and setup or workflow changes in
`README.md`.
