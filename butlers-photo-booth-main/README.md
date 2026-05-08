# Butler's Photobooth

The static site for [butlersbooth.ca](https://butlersbooth.ca) — a premium portrait photo booth experience for events across the GTA.

Built and maintained by [Plandaro](https://plandaro.com). Pure HTML / CSS / vanilla JS, no build step. Deploys directly from this repo.

---

## Site map

| Path | What lives here |
|---|---|
| `/` (root) | Splash entry page (centered logo, tagline, social links, CTA) |
| `/home/` | Editorial split hero, intro, service marquee, featured portraits, closing CTA |
| `/about/` | Brand story + "What sets us apart" differentiators |
| `/services/` | Six services + three packages (Butler's Classic, Black Label, White Glove) |
| `/portfolio/` | Asymmetric mosaic gallery + click-to-enlarge lightbox |
| `/reviews/` | Plandaro reviews widget (vendor: `butlers-photobooth`) |
| `/faq/` | Accordion-style Q&A + FAQPage JSON-LD for rich snippets |
| `/contact/` | FormSubmit-powered inquiry form with auto-reply, plus direct email |

---

## Folder structure

```
ButlersPhotobooth/
├── index.html              ← splash entry page
├── home/index.html         ← editorial home page
├── about/, services/, portfolio/, reviews/, faq/, contact/
├── assets/
│   ├── logo/               ← butlers-logo-dark.png + butlers-logo-white.png
│   ├── favicon/            ← full favicon set generated from the logo
│   ├── og/                 ← og-image.png, twitter-image.png, og-square.png
│   └── portfolio/          ← 16 compressed portraits (~470KB each, 2000×3000)
├── css/
│   └── main.css            ← editorial design system (B&W, Playfair Display + DM Sans)
├── js/
│   ├── nav.js              ← mobile drawer, scroll header state, IntersectionObserver
│   └── gallery.js          ← portfolio lightbox (click thumbnail → fullscreen)
├── sitemap.xml
├── robots.txt
└── README.md
```

No `sources/` folder. Per workflow rule, raw originals are deleted after compression — re-export source lives with the client, not in the repo.

---

## Common tasks

### Add a new portfolio photo
1. Drop the raw image at the workspace root (`/Users/.../DigitalFusionPro/<filename>`)
2. Run the compression pipeline (Pillow, max width 2000px, JPEG q82) → output to `assets/portfolio/portfolio-NN-{slug}.jpg`
3. **Delete the raw** — don't archive
4. Add a `<button class="portfolio-item" data-full="..." data-index="N">` row in `portfolio/index.html`

### Update the home hero image
Edit [home/index.html](home/index.html) — swap the `<img class="editorial-hero__media" src="...">` to point at any image in `assets/portfolio/`.

### Add an FAQ
Edit [faq/index.html](faq/index.html), add a new `<details class="faq-item">` row. Also update the `mainEntity` array in the FAQPage JSON-LD `<script>` block at the top of the file so the new question gets indexed by Google.

### Update CSS
Edit [css/main.css](css/main.css). After saving, **bump `?v=N`** on the `<link rel="stylesheet" href="../css/main.css?v=N">` across all 8 page templates so visitors fetch the new CSS:

```bash
find . -maxdepth 2 -name "index.html" -exec sed -i '' 's|main.css?v=OLD|main.css?v=NEW|g' {} \;
```

### Deploy
Hostinger auto-deploys from this Git repo. Push to `main` and the live site updates within a minute or two.

```bash
git add -A
git commit -m "<your message>"
git push
```

---

## Brand system

| Token | Value | Use |
|---|---|---|
| `--white` | `#ffffff` | Default page background |
| `--paper` | `#f4f4f4` | Section backgrounds (e.g., featured portraits, packages) |
| `--rule` | `#e0e0e0` | Hairline dividers (between sections, in lists) |
| `--ink` | `#0a0a0a` | Body text, headings, hero copy |
| `--muted` | `#666666` | Secondary text |
| `--font-display` | `"Playfair Display"` | All H1/H2/H3, ledes, italic emphasis |
| `--font-body` | `"DM Sans"` | Body, eyebrows, nav, buttons |

Pure B&W with a small gray ramp. No color tints, no warm tones. The brand reads modern + editorial + elegant.

---

## Third-party integrations

| What | Where | How it's wired |
|---|---|---|
| **FormSubmit** (contact form) | `/contact/` | Form posts to `https://formsubmit.co/info@butlersbooth.ca`. Configured with custom subject, box template, reCAPTCHA, honeypot, auto-reply, and redirect to `?sent=1` for the success banner. **First-time activation:** submit a test inquiry from the live site → click the confirmation link in the email FormSubmit sends to `info@butlersbooth.ca`. |
| **Plandaro reviews** | `/reviews/` | Widget script `plandaro.com/widgets/reviews.js`, vendor identifier `butlers-photobooth`. Reviews managed in Plandaro admin. |

---

## Documentation

The shared workspace [PLAYBOOK.md](../PLAYBOOK.md) at the workspace root captures every reusable pattern across all client builds. Section 15 is the per-client extensions catalog.
