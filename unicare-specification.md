# Unicare Technologies Pvt. Ltd. — Website Reverse-Engineering & Redesign Specification

Source of truth: https://unicarewater.com/ (fetched live). All business facts below (company name, founding year, founder, address, phone, certifications, product list, treatment technologies) are taken directly from the existing site. No services, certifications, or claims have been invented.

---

## 1. Business Snapshot (extracted, not assumed)

| Fact | Value |
|---|---|
| Legal name | Unicare Technologies Pvt. Ltd. |
| Founded | 2000 |
| Founder | Mr. Anand Raval |
| HQ | Gate No. 1327, Vrindavan Park, Opp: Kamal Motors, Nagar Rd, Wagholi, Pune, Maharashtra 412207 |
| Phone | +91-982-3009-383 |
| Email | info@unicarewater.com |
| Certification (stated on site) | ISO 9001:2000 |
| Core markets | Rural water schemes, metropolitan/municipal, industrial |
| Business model | Manufacture, supply, install, commission; technology transfer; R&D on requirement; PPP-basis projects |
| Social | Facebook, Twitter/X, YouTube, LinkedIn, WhatsApp |

---

## 2. Current Sitemap (as-is, reverse-engineered)

```
/ (Home)
├── About us
│   ├── /company-overview/
│   ├── /management/
│   └── /partner/
├── Product
│   ├── Rural Application
│   │   ├── /reverse-osmosis-plant/
│   │   ├── /water-treatment-plant/
│   │   ├── /water-atm/
│   │   ├── /fluoride-removal-plant/
│   │   ├── /iron-removal-plant/
│   │   ├── /arsenic-removal-plant/
│   │   ├── /water-softener/
│   │   ├── /sand-filter/
│   │   ├── /carbon-filter/
│   │   ├── /rain-water-harvesting-filter/
│   │   └── /water-disinfection-unit/
│   ├── Metropolitan Application
│   │   ├── /mineral-water-plant/
│   │   ├── /sewerage-treatment-plant/
│   │   ├── /effluent-treatment-plant-2/
│   │   ├── /ultra-filtration-system/
│   │   ├── /unicare-700-disaster-management/
│   │   ├── /water-kiosk/
│   │   ├── /reverse-osmosis-plant-in-ppp-base/
│   │   ├── /water-cooler-with-inbuilt-purifier/
│   │   └── /dialysis-ro-system/
│   └── Industrial Application
│       ├── /electro-chlorinator/
│       ├── /package-drinking-water-plant/
│       ├── /de-mineralization-water-plant/
│       ├── /swimming-pool-filtration/
│       └── /effluent-treatment-plant/
├── /achievements/
├── /technologies/
├── /associate/
├── Media
│   ├── /news-and-updates/
│   ├── /videos/
│   └── /brochures/
├── /blogs/
└── Contact us
    ├── /our-locations/
    ├── /enquiry-form/
    └── /career/
```

### Findings on current IA
- 26 leaf pages, 3 nested product menus, no visual distinction between menu levels once inside a page.
- Products are organized by **buyer segment** (rural / metro / industrial) — this is actually a strong model and worth **keeping**, since a gram panchayat and a factory EHS manager have genuinely different needs. The failure is presentation, not structure.
- Several category names have typos surfaced in production ("Rural Aplication", "Metropolitian Application", "Industial Application").
- Effluent Treatment Plant exists as **two separate URLs** (`/effluent-treatment-plant/` and `/effluent-treatment-plant-2/`) — one under Metropolitan, one under Industrial — creating duplicate-content SEO risk and buyer confusion.
- No search, no filter by capacity/technology, no comparison capability anywhere in the catalog.

---

## 3. Redesigned Sitemap

I'm preserving the three real buyer segments and every real product — nothing added, nothing dropped — but restructuring around **findability by problem**, not just menu depth, and fixing the duplicate ETP issue by merging the two ETP pages into one page with two applications (industrial-effluent vs metropolitan-effluent) called out as tabs/sections, since the underlying product line is the same.

```
/ (Home)
/about/
  /about/company-overview/
  /about/management/
  /about/partner/
/solutions/                         ← NEW: segment landing pages (replaces bare dropdown)
  /solutions/rural/                 ← lists all 11 rural products with filters
  /solutions/metropolitan/          ← lists all 9 metro products
  /solutions/industrial/            ← lists all 5 industrial products
/products/[slug]/                   ← one URL pattern for all 24 unique products
  (all 24 original slugs preserved as-is for SEO equity; /effluent-treatment-plant-2/
   301-redirects into /products/effluent-treatment-plant/ with an on-page
   "Industrial vs Metropolitan use" toggle)
/technologies/                      ← kept, expanded with the 5 real named processes
                                       (EA, SAFF, SBR, MBBR, MBR) pulled from the STP page
/achievements/
/associate/
/media/
  /media/news/
  /media/videos/
  /media/brochures/
/blog/
/contact/
  /contact/locations/
  /contact/enquiry/                 ← form becomes primary CTA, not a footer afterthought
/careers/
```

**Structural changes explained:**
1. **Add `/solutions/` segment pages** — each is a short, scannable landing page ("Rural", "Metropolitan", "Industrial") with a one-line description of that buyer's problem, a filterable grid of only the relevant products, and a segment-specific CTA ("Request a scheme quotation" for rural/government buyers vs. "Request an industrial site survey" for industrial buyers). This directly addresses the "flat catalog" problem without inventing new products.
2. **Flatten product URLs to one pattern** (`/products/[slug]/`) with segment shown as a tag/breadcrumb rather than baked into the URL hierarchy — simpler sitemap, and a product like RO Plant can be tagged as relevant to more than one segment without a duplicate page.
3. **Merge the two ETP pages** — same product line, same technology, two audiences. One page, one canonical URL, segment context handled with an on-page toggle. Removes duplicate-content SEO risk.
4. **Every product page gets a consistent template** (see §6) instead of ad hoc long-form content mixed with FAQs of inconsistent depth.

---

## 4. Navigation

### Current (as-is)
Home · About us▾ · Product▾▾▾ (3-level nested flyout) · Achievements · Technologies · Associate · Media▾ · Blogs · Contact us▾

Problems: "Product" flyout requires hover-precision across 3 levels on desktop and is unusable as a tap-menu on mobile (confirmed pattern in Elementor nested menus). No CTA button in the header at all — just a phone number and email as plain text.

### Redesigned primary navigation
```
[Logo]   Solutions ▾   Products ▾   Company ▾   Resources ▾   Contact   [Call +91-982-3009-383]  [Get a Quote →]
```
- **Solutions ▾** → Rural / Metropolitan / Industrial (3 items, flat, one level — matches the real segment model)
- **Products ▾** → mega-menu, 3 labeled columns (Rural / Metropolitan / Industrial), each listing its real products, opened as a single mega-panel (not nested flyouts) so it works identically as a tap-accordion on mobile
- **Company ▾** → Overview, Management, Partners, Achievements, Associate, Careers
- **Resources ▾** → Technologies, Blog, Brochures, Videos, News
- **Contact** → direct link to `/contact/` (locations + enquiry form live there, not buried three clicks deep)
- Persistent header CTA button **"Get a Quote"** — currently the site has zero header CTA
- Sticky on scroll, condenses to logo + hamburger + call button below 960px

### Mobile navigation
Full-screen slide-in drawer, single-level accordions (no nested flyouts), with **Call** and **WhatsApp** as fixed-bottom action buttons — since the current site already treats WhatsApp/phone as primary contact channels in the header, this preserves that intent but makes it thumb-reachable throughout the whole session, not just when scrolled to top.

---

## 5. Homepage — Section-by-Section Redesign

| # | Current section | Issues found | Redesigned section |
|---|---|---|---|
| 1 | 5-image auto-slider, no headline overlay hierarchy | Pure image slider with plain-text taglines underneath, not on top; 3 stacked paragraph blocks read as filler before any product is shown | **Hero**: single headline ("Water & wastewater treatment plants, engineered in Pune since 2000"), one-line subhead, dual CTA ("Get a Quote" / "View Solutions by Sector"), trust strip (25 yrs, ISO 9001:2000, 3 sectors served) — real facts only |
| 2 | "OUR RANGE OF WASTEWATER TREATMENT PRODUCTS" — 3 paragraphs of dense SEO text before any visual | Wall of text, no scannability | Condensed to one short intro paragraph + the **3 solution-segment cards** (Rural / Metropolitan / Industrial) as the real navigational anchor |
| 3 | "Explore Our Product" — 9-card grid, several "Read More" links broken (`#`) | 4 of 9 links are dead | All 9 (now correctly linked) product highlight cards, each with a one-line capacity/spec teaser pulled from the actual product page content |
| 4 | "Services" — 4 unstyled text rows | No icons, no hierarchy, easy to miss entirely | 4-item icon feature row: Supply/Install/Test/Commission · Technology Transfer · R&D on Requirement · PPP-Basis Projects |
| 5 | "Our satisfied clients" — 34 logo images, no captions | Logos unlabeled, unclear if current or historic clients | Logo strip kept (real social proof), capped to a curated set, with an "and 30+ more across India" caption instead of dumping all 34 |
| 6 | Blog — 2 posts shown | Fine as-is, just needs restyling | Kept, restyled as card row, linking to real posts |
| 7 | Testimonials — 3 quotes, 1 mismatched company name ("Integra") | Credibility risk: quote references a different company | Recommend re-collecting or removing the mismatched testimonial; keep the two that are internally consistent |
| 8 | Google Map embed | Fine, low-visual-weight | Kept, paired with address + directions link in the same section as the contact CTA |
| 9 | Footer — quick links, contact, social, copyright naming a different company as site credit | "©...All Rights Reserved" credits an agency (xplint.com) in the client-facing footer | Footer restructured with clear columns (Sitemap / Solutions / Company / Contact), Unicare's own copyright line |
| — | Bottom of page: unlabeled enquiry form (First Name / Email / Phone / Message, 180-char limit) is the *only* lead-capture element on the entire homepage | Buried, unlabeled fields ("First Name *" with no visible label styling), arbitrary 180-character cap on the one message field | Promoted: short enquiry form duplicated near the hero *and* kept at page end; fields properly labeled, message limit raised to a reasonable length, added a "preferred sector" dropdown (Rural/Metro/Industrial) to route enquiries correctly |

---

## 6. Standard Product Page Template (applies to all 24 products)

Reverse-engineered from the Sewage Treatment Plant page, which is the most complete example on the site:

1. **Breadcrumb** — Home / Solutions / [Sector] / [Product]
2. **H1** — Product name + one-line positioning (e.g., "Sewage Treatment Plant (STP) — manufactured in Pune for domestic, commercial & industrial use")
3. **Intro** (2–3 sentences max, not 4 paragraphs) — what it is, who it's for
4. **"What is a [Product]?"** — plain-language definition
5. **Benefits** — bullet list (kept exactly as substantiated on-site, e.g. "removes 97% of suspended solids," "ISO 9001:2000 certified," "customizable per requirement" — no unverified numbers added)
6. **Process/stages diagram** — for STP specifically, the real 3-stage process (Primary → Secondary → Tertiary treatment); this pattern is reused as a visual component wherever a product has real stages
7. **Treatment technologies offered** (for STP: EA, SAFF, SBR, MBBR, MBR — shown as a technology-selector grid, each with a one-line description, not just a bare list)
8. **Why Unicare** — manufacturing capability, compliance know-how
9. **FAQs** — accordion (kept; the current FAQ content is genuinely useful and ranks well, just needs collapsing so the page isn't a 3,000-word scroll by default)
10. **CTA block** — "Request a quotation for [Product]" with the sector pre-filled
11. Footer (shared)

---

## 7. Design Language

### Brand read
An engineering-led, 25-year-old Indian industrial manufacturer — not a consumer water-bottle brand. The redesign should feel like precision equipment documentation crossed with credible institutional trust: closer to a process-engineering firm's site than a lifestyle brand.

### Color palette
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0B2B30` | Header/footer background, primary headings on light |
| `--teal-700` | `#0E6E76` | Primary brand color — links, active nav, icons |
| `--aqua-500` | `#1FB8C9` | Primary CTA buttons, key highlights, hover states |
| `--steel-600` | `#4B5B60` | Body text, secondary UI |
| `--paper-50` | `#F4F8F8` | Page background |
| `--paper-0` | `#FFFFFF` | Card surfaces |
| `--amber-500` | `#E2932F` | Sparing use only — capacity numbers, one stat callout per section, never for primary CTAs |
| `--line` | `#D9E4E4` | Hairline borders/dividers |

Rationale: teal/aqua reads as water without tipping into generic "clean-tech gradient" cliché; steel gray keeps it grounded in industrial hardware rather than consumer wellness. Amber is used only as a rare accent (e.g., "since 2000," "97% solids removed") so it retains impact.

### Typography
| Role | Typeface | Notes |
|---|---|---|
| Display / H1–H2 | **Space Grotesk** (600/700) | Technical, geometric, distinct character without being a display-serif cliché |
| Body | **IBM Plex Sans** (400/500) | Built for technical/engineering documentation, excellent at small sizes |
| Data / specs / capacity figures | **IBM Plex Mono** (500) | Used specifically for capacity numbers (LPH, KLD, %), so specs are visually distinct from prose |

Type scale: 12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64px, 1.5 line-height for body, 1.15 for display.

### Imagery requirements
- Replace stock-looking generic banner slider with **real plant/installation photography** (site already has some — `sewage-water.jpg`, `Stp-Plant` thumbnails — these should be professionally re-shot or at minimum color-corrected and consistently cropped 16:9 / 4:3).
- Every product page needs at minimum one **schematic/process diagram** (SVG, not photo) — currently zero technical diagrams exist despite this being an engineering product.
- Client logos: request current high-res logos with permission on file; do not reuse unlabeled low-res thumbnails.
- Team/management photos for the Management page (currently text-only per the fetched nav).

### Signature element
A single continuous **flow-line motif**: a thin SVG line representing water/process flow that visually threads from the hero through the "3 sectors" cards down to the product grid — literal to the subject (this *is* a flow business) and doubles as a scroll-progress indicator. Used once, with restraint, not repeated as decoration on every page.

---

## 8. Component Inventory

- Header: logo, mega-menu nav, phone/WhatsApp quick links, primary CTA button, mobile drawer
- Hero: headline, subhead, dual CTA, trust-stat strip
- Segment card (×3): icon, title, one-line description, product count, link
- Product card: image, name, one-line spec teaser, sector tag, link
- Feature/service row: icon + label (4 items)
- Logo marquee/grid (clients)
- Stat callout: big number (mono type) + label
- Process/stage diagram: numbered stages with connecting line (used only where a real sequential process exists — STP, water treatment)
- Technology selector grid: for multi-technology products (EA/SAFF/SBR/MBBR/MBR)
- FAQ accordion
- Testimonial card
- Blog card
- Enquiry form (short, header-adjacent) + full enquiry form (contact page)
- Map embed block
- Footer: 4-column link groups, contact block, social icons, copyright
- Breadcrumb
- Sticky mobile call/WhatsApp bar

---

## 9. Responsive Behavior

- **Mobile-first breakpoints**: 360 / 480 / 768 / 1024 / 1280 / 1440
- Header collapses to logo + hamburger + call icon under 768px; mega-menu becomes single-column accordion
- Product grids: 1-col (mobile) → 2-col (tablet) → 3-col (desktop)
- Hero CTA buttons stack full-width under 480px
- Sticky bottom call/WhatsApp bar appears only on mobile viewports
- Tables (technology comparison, spec sheets) convert to stacked key-value cards under 640px rather than horizontal-scroll tables
- All tap targets ≥ 44×44px

---

## 10. SEO Structure

- One `<h1>` per page (current site has ambiguous heading hierarchy with multiple same-weight headings)
- Title tag pattern: `{Product Name} Manufacturer in Pune, India | Unicare Technologies` (matches the intent already proven to work — current STP page title already ranks on this pattern)
- Meta description per page, unique, ≤160 characters (several current meta descriptions are reused/generic)
- Canonical tags on every page (site already sets these — keep)
- Fix duplicate ETP content via canonical merge (§3)
- Structured data:
  - `Organization` schema on homepage (name, logo, address, phone, sameAs social links — all real data already present)
  - `Product` schema per product page
  - `FAQPage` schema on product pages that carry the existing FAQ content (currently unmarked-up rich FAQ content is a missed rich-snippet opportunity)
  - `BreadcrumbList` schema
- Fix internal linking: several homepage product cards link to `#` — every card must resolve to a real URL
- XML sitemap + robots.txt reviewed for the flattened `/products/` structure with 301s from old paths preserved
- Image `alt` text: current site serves many images with empty/filename-based alt text (e.g., `home-page-banner-clean-water.png` used as literal alt in places) — every image needs descriptive alt text

---

## 11. Accessibility (WCAG 2.2 AA)

- Color contrast: verify `--teal-700` on `--paper-50` and `--aqua-500` on white both meet 4.5:1 for body text; use `--ink` for small text, reserve `--aqua-500` for large text/buttons only
- All form fields (currently unlabeled placeholder-only fields) get associated `<label>` elements, not placeholder-as-label
- Visible focus states on all interactive elements (nav items, cards, buttons)
- Skip-to-content link (site already has one — keep and make it visibly focusable, not just in the DOM)
- Mega-menu and mobile drawer fully operable by keyboard, with `aria-expanded`/`aria-controls`
- Reduced-motion media query respected for the slider/flow-line animation
- Alt text for all logo/photo content; decorative SVGs `aria-hidden`
- Map embed gets an accessible text alternative (address + directions link) — already partially present, needs to be programmatically associated
- Heading order corrected site-wide (no skipped levels)

---

## 12. Performance Optimizations

- Current site is Elementor-generated (confirmed via meta tags) — implies render-blocking CSS bundles, webfont FOUT/FOIT, and unoptimized PNG banner images served at full resolution
- Recommended stack: static-generated pages (Next.js/Astro) rather than a page-builder runtime, since content changes (new products, blog posts) are infrequent relative to traffic
- Serve all imagery as responsive `srcset` WebP/AVIF with defined `width`/`height` to prevent layout shift (current banner images are large PNG/JPG served at fixed size regardless of viewport)
- Self-host and subset the two typefaces (Space Grotesk, IBM Plex Sans/Mono), `font-display: swap`
- Lazy-load below-the-fold images (client logos, blog thumbnails)
- Replace the 5-image auto-slider (multiple full-size images loaded on every visit whether seen or not) with a single hero image/SVG + lazy-loaded carousel only if a multi-image hero is still wanted
- Inline critical CSS for hero/above-the-fold; defer the rest
- Target Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

---

## 13. Frontend Architecture (production-ready)

```
/app or /src
  /components
    Header, MegaMenu, MobileDrawer, Hero, SegmentCard, ProductCard,
    ProcessDiagram, TechSelector, StatCallout, FAQAccordion,
    Testimonial, EnquiryForm, Footer, Breadcrumb
  /content
    products/*.mdx   (24 files, one per real product, frontmatter: sector[], capacityRange, technologies[])
    blog/*.mdx
  /lib
    schema.ts (JSON-LD generators: Organization, Product, FAQPage, BreadcrumbList)
  /pages or /app routes
    /, /about/*, /solutions/[sector], /products/[slug], /technologies,
    /achievements, /associate, /media/*, /blog, /contact/*, /careers
```

- Content-driven: each product is a data/content file (name, sector tags, capacity range, technologies, benefits, FAQs) rendered through the **one** template in §6 — this is what eliminates the current inconsistency between product pages and makes adding/editing a product a content change, not a design change.
- Form submission via a serverless endpoint with server-side validation + spam protection (honeypot/rate-limit), emailing to `info@unicarewater.com` and logging sector selection for routing.
- Analytics + Core Web Vitals monitoring wired in from day one.

---

## 14. What I deliberately preserved

- Company name, founding year, founder, address, phone, email — unchanged
- ISO 9001:2000 claim — kept exactly as stated on-site (not upgraded to a newer ISO revision, since that would be inventing a certification)
- All 24 real product names and their real sector groupings
- The real 3-stage sewage treatment process description and the five real treatment technologies (EA, SAFF, SBR, MBBR, MBR)
- The four real service lines (supply/install/test/commission; technology transfer; R&D on requirement; PPP-basis)
- Existing blog posts and their URLs
- Social channels and WhatsApp contact pattern
