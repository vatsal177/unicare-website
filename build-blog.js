#!/usr/bin/env node
/**
 * Regenerates blog.html and blog-<slug>.html from content/blog/*.md
 *
 * Runs automatically on Netlify on every deploy (see netlify.toml), which
 * means every time the Decap CMS admin panel commits a new, edited, or
 * deleted post, this script rebuilds the blog pages from scratch and
 * Netlify redeploys the result. No manual step required after the CMS
 * commit; the whole loop is: editor logs in at /admin -> saves/deletes a
 * post -> Git Gateway commits to the repo -> Netlify detects the commit
 * -> runs this script -> redeploys.
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const ROOT = __dirname;
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const OUT_DIR = ROOT;

const HEADER = fs.readFileSync(path.join(ROOT, "build", "_header.html"), "utf8");
const FOOTER = fs.readFileSync(path.join(ROOT, "build", "_footer.html"), "utf8");

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">`;

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function page(title, description, body, canonical) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="https://unicarewater.com/${canonical}">
${FONTS}
<link rel="stylesheet" href="styles.css">
</head>
<body>
${HEADER}
<main id="main">
${body}
</main>
${FOOTER}`;
}

function breadcrumb(trail) {
  const parts = trail.map(([label, href], i) => {
    const item = href ? `<a href="${href}">${label}</a>` : `<span aria-current="page">${label}</span>`;
    return i < trail.length - 1 ? item + '<span class="sep">/</span>' : item;
  });
  return `<nav class="breadcrumb" aria-label="Breadcrumb">${parts.join(" ")}</nav>`;
}

function pageHero(trail, badge, h1, lead) {
  return `<section class="page-hero">
  <div class="wrap">
    ${breadcrumb(trail)}
    <span class="sector-badge">${badge}</span>
    <h1>${h1}</h1>
    <p class="lead">${lead}</p>
  </div>
</section>`;
}

function ctaBand(heading = "Request a quotation", sub = "Tell us your sector and requirement — our engineering team responds directly.", ctaText = "Get a Quote") {
  return `<section class="tight">
  <div class="wrap">
    <div class="cta-band">
      <div><h3>${heading}</h3><p>${sub}</p></div>
      <a href="contact.html" class="btn btn-primary btn-lg">${ctaText} &rarr;</a>
    </div>
  </div>
</section>`;
}

function fmtDate(d) {
  const date = new Date(d);
  if (isNaN(date)) return String(d);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// ---- Load all posts ----
if (!fs.existsSync(CONTENT_DIR)) {
  console.error(`No content directory at ${CONTENT_DIR}, skipping blog build.`);
  process.exit(0);
}

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
const posts = files.map((f) => {
  const slug = f.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    html: marked.parse(content),
  };
});
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// ---- Build individual post pages ----
posts.forEach((post) => {
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 4);
  const sideLinks = others.map((p) => `<li><a href="blog-${p.slug}.html">${escapeHtml(p.title)}</a></li>`).join("");

  let body = pageHero(
    [["Home", "index.html"], ["Blog", "blog.html"], [escapeHtml(post.title), null]],
    fmtDate(post.date),
    escapeHtml(post.title),
    escapeHtml(post.excerpt)
  );

  body += `<section class="bg-white">
  <div class="wrap">
    <div class="content-grid">
      <article class="prose">${post.html}</article>
      <aside>
        <div class="side-card">
          <h4>Get a quotation</h4>
          <p style="font-size:14px;margin-bottom:16px">Have a requirement related to this article? Our team can help size the right system.</p>
          <a href="contact.html" class="btn btn-primary btn-block">Get a Quote</a>
        </div>
        <div class="side-card">
          <h4>More articles</h4>
          <ul>${sideLinks}</ul>
        </div>
      </aside>
    </div>
  </div>
</section>`;
  body += ctaBand();

  const html = page(
    `${post.title} | Unicare Technologies Blog`,
    post.excerpt.slice(0, 150),
    body,
    `blog-${post.slug}.html`
  );
  fs.writeFileSync(path.join(OUT_DIR, `blog-${post.slug}.html`), html);
});

// ---- Build blog index ----
const cards = posts.map((p) => `<article class="blog-card">
  <div class="thumb"></div>
  <div class="body">
    <div class="meta">Unicare &middot; ${fmtDate(p.date)}</div>
    <h3>${escapeHtml(p.title)}</h3>
    <p style="font-size:14px">${escapeHtml(p.excerpt)}</p>
    <a href="blog-${p.slug}.html" class="readmore">Read more &rarr;</a>
  </div>
</article>`).join("");

let indexBody = pageHero(
  [["Home", "index.html"], ["Blog", null]],
  "Resources",
  "Blog",
  "Articles from Unicare Technologies on water and wastewater treatment processes, plant design and real installation case studies."
);
indexBody += `<section class="bg-white">
  <div class="wrap">
    <div class="blog-grid" style="grid-template-columns:repeat(2,1fr)">${cards}</div>
  </div>
</section>`;
indexBody += ctaBand("Have a water treatment question?", "Our engineering team is happy to advise on your specific site and requirement.");

const indexHtml = page(
  "Blog | Unicare Technologies Pvt. Ltd.",
  "Articles from Unicare Technologies on water and wastewater treatment processes, plant design and installation case studies.",
  indexBody,
  "blog.html"
);
fs.writeFileSync(path.join(OUT_DIR, "blog.html"), indexHtml);

console.log(`Built blog.html + ${posts.length} blog post page(s) from content/blog/*.md`);
