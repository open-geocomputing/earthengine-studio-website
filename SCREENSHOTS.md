# Screenshot and visual replacement guide

This guide inventories every raster screenshot used by the website, the current
reference captures, and the product views that should be recaptured when the
Studio interface changes. It also separates real image files from the
screenshot-like interface illustrations that are currently built in HTML and
CSS.

## Current image inventory

| Image | Role | Published | Required size | Replace when |
| --- | --- | --- | --- | --- |
| `assets/images/social-card.png` | Link preview for social networks and chat | Yes | `1200 × 630` PNG | Brand, headline, or primary product visual changes |
| `docs/screenshots/landing-desktop.png` | Desktop design reference | No | `1440 × 1000` PNG | Desktop layout, copy, color, or hero changes |
| `docs/screenshots/landing-mobile.png` | Mobile design reference | No | `390 × 844` PNG | Mobile layout, menu, copy, or hero changes |
| `docs/screenshots/product-sentinel-workspace.png` | Real editor, Console, and 2D map reference | No | `1600 × 940` PNG | Studio layout or map workflow changes |
| `docs/screenshots/product-innsbruck-terrain.png` | Real editor, Console, and 3D map reference | No | `1600 × 940` PNG | Studio 3D view or terrain controls change |
| `docs/screenshots/product-plotly-output.png` | Real maximized Plotly output reference | No | `1600 × 940` PNG | Figure tabs, controls, or export workflow changes |
| `assets/images/orbit-studio.svg` | Logo and favicon | Yes | Vector SVG | Brand mark changes; this is not a screenshot |

All files under `docs/screenshots/` are documentation references only. Jekyll
does not publish them because the `docs` directory is excluded in `_config.yml`.

## Current page references

### Desktop landing page

![Current desktop landing page](docs/screenshots/landing-desktop.png)

### Mobile landing page

![Current mobile landing page](docs/screenshots/landing-mobile.png)

### Social sharing card

![Current social sharing card](assets/images/social-card.png)

## Real Studio capture references

These safe reference captures were made from the running development editor at
`https://code-dev.earthengine.studio/` on July 14, 2026. They use public
built-in examples. The signed-in toolbar was cropped out and the Git repository
section was collapsed so account identity and repository names are not present.

### JavaScript, Console, and 2D map

Source example: **Sentinel-2 map layer**. This is the strongest current
candidate for the hero workspace because it shows runnable code, public imagery,
Console results, map controls, and `Map.addLayer` state together.

![Studio Sentinel-2 workspace](docs/screenshots/product-sentinel-workspace.png)

### JavaScript, Console, and 3D terrain

Source example: **Innsbruck 3D terrain**. Use this reference for the map
workspace card or a dedicated 3D capability image.

![Studio Innsbruck 3D terrain workspace](docs/screenshots/product-innsbruck-terrain.png)

### Plotly output

Source example: **Plotly and ui.Chart**. The output tab was maximized to provide
a clean reference for the charts and figures section.

![Studio Plotly output](docs/screenshots/product-plotly-output.png)

These PNGs are source references, not yet optimized production assets. Crop and
export the selected image to its target WebP dimensions only when replacing a
code-built illustration on the landing page.

## Screenshot-like visuals that are currently code

The following page visuals may look like screenshots, but they are not image
files. They are editable HTML in `index.html` and CSS in
`assets/css/main.css`.

| Surface | Current implementation | Future screenshot target | Capture status |
| --- | --- | --- | --- |
| Hero editor, map, and console | `.product-window` | `assets/images/product/hero-workspace.webp`, `1800 × 1200` | Sentinel-2 source reference ready |
| JavaScript and Python editor card | `.mini-editor` | `assets/images/product/language-workflow.webp`, `1200 × 900` | Python-specific capture still needed |
| Map renderer card | `.map-choice` | `assets/images/product/map-workspace.webp`, `1200 × 900` | 2D and 3D source references ready; drawing/inspection state still needed |
| GitHub and GitLab repository card | `.branch-visual` | `assets/images/product/repository-workflow.webp`, `1200 × 900` | Sanitized demo repository still needed |
| Console, figure, and task card | `.output-visual` | `assets/images/product/output-workflow.webp`, `1200 × 900` | Plotly source reference ready; combined Console/Tasks view still needed |
| Earth Engine foundation graphic | `.foundation-visual` | Keep code-based unless the brand direction changes | No capture needed |

The `assets/images/product/` filenames are reserved targets and are not created
until real product screenshots are ready. When a screenshot replaces a coded
illustration, keep the surrounding card copy and responsive container, add
meaningful alternative text, and remove only the HTML/CSS that the image makes
obsolete.

## Product screenshot capture checklist

Capture the real Studio at `code.earthengine.studio`, the development editor at
`code-dev.earthengine.studio`, or from a production build using a neutral
demonstration workspace. Every capture should:

- Use the Night theme and the same midnight/cyan visual family as the website.
- Show realistic public Earth Engine data and runnable JavaScript or Python.
- Use fictitious repository, project, file, task, and asset names.
- Hide personal names, email addresses, account avatars, tokens, project IDs,
  OAuth dialogs, browser extensions, and operating-system notifications.
- Keep the important UI at least 48 pixels away from every crop edge.
- Be captured at 2× density where possible, then exported as WebP at 80–88%
  quality.
- Avoid adding text or labels in the bitmap when the same content can remain
  accessible HTML.

Capture these product states:

1. **Hero workspace** — JavaScript editor, rendered thematic map, successful
   Console result, and a visible Run control.
2. **Language workflow** — one JavaScript tab and one Python tab with completion
   or documentation visible, without exposing credentials.
3. **Map workspace** — drawing or inspection active, with map tabs or renderer
   selection visible.
4. **Repository workflow** — a public or fictitious GitHub/GitLab file open in
   the editor with a clean save state; prepare a second capture showing the
   conflict-aware save message if that behavior is being documented.
5. **Output workflow** — a Console value plus either a Plotly or Matplotlib
   figure, with Tasks visible when the crop permits.
6. **Persistence check** — reopen the same demonstration workspace and confirm
   the stored layout, tabs, and map view before taking any final captures.

The repository workflow is intentionally not represented by the current live
references: the connected development account exposed real repository names.
Create a neutral public demo repository with fictitious file and branch names,
then capture it only after confirming the repository list, account controls,
and save messages contain no personal or private information.

## Updating the documentation captures

1. Start the website with `bundle exec jekyll serve`.
2. Capture the landing page at exactly `1440 × 1000` and save it as
   `docs/screenshots/landing-desktop.png`.
3. Capture the landing page at exactly `390 × 844` and save it as
   `docs/screenshots/landing-mobile.png`.
4. Scroll through the page once before longer captures so reveal animations have
   completed.
5. Verify there is no horizontal scrollbar, clipped text, empty section, or
   visible account information.
6. Rebuild with `JEKYLL_ENV=production bundle exec jekyll build` and confirm the
   production page still references the intended social card.

## Replacement acceptance criteria

- Desktop and mobile captures match the current committed page.
- The social card remains exactly `1200 × 630` and its title is readable at
  small preview sizes.
- Product screenshots are sharp at their rendered size and stay below 500 KiB
  each where practical.
- All screenshot crops remain legible at desktop, tablet, and mobile breakpoints.
- No secret, credential, personal identifier, or private repository content is
  present.
- `README.md`, `CHANGES.md`, and this inventory are updated in the same commit.
