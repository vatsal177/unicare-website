# Unicare Technologies — Website

Static site for Unicare Technologies Pvt. Ltd. (water & wastewater treatment plant manufacturer, Pune). Deploys on Netlify. Blog is managed through a Decap CMS admin panel at `/admin`, secured by GitHub login (OAuth).

## Structure

- `index.html`, `product-*.html`, `solutions-*.html`, `about-*.html`, `technologies.html`, `achievements.html`, `contact.html` — the site's pages (static HTML, no build step needed for these)
- `styles.css` — single shared stylesheet for the whole site
- `content/blog/*.md` — blog posts (source of truth; edited via `/admin` or directly)
- `build-blog.js` + `build/_header.html` + `build/_footer.html` — regenerates `blog.html` and each `blog-*.html` page from `content/blog/*.md` on every deploy
- `admin/` — the Decap CMS editor UI (login handled by GitHub OAuth — no credentials are stored in this repo)
- `netlify.toml` — tells Netlify to run `npm install && npm run build` and publish the repo root

## First-time setup

See [`README-DEPLOY-AND-CMS.md`](./README-DEPLOY-AND-CMS.md) for the full step-by-step: connecting this repo to Netlify, creating the GitHub OAuth App, and giving a team member repo access to manage the blog.

## Local development

No build step is required to preview the static pages — just open `index.html` in a browser. To test the blog build script locally:

```bash
npm install
npm run build
```

This regenerates `blog.html` and every `blog-*.html` page from the current contents of `content/blog/`.
# unicare-website
