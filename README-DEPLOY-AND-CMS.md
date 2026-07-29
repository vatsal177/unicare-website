# Deploying this site + turning on secure blog editing (GitHub login)

You have a GitHub account and a Netlify account already. Here's the exact path from "zip file on my computer" to logging in at `/admin` with your GitHub account.

## Step 1 — Push this folder to a GitHub repo

1. Unzip `unicare-website.zip` — you'll have a folder with `index.html`, `styles.css`, `admin/`, `content/`, `build-blog.js`, etc. at the top level.
2. Go to github.com → **New repository** → name it (e.g. `unicare-website`) → **Private** is fine → Create.
3. On the new repo's page, click **"uploading an existing file"** and drag in everything from the unzipped folder (or, if you're comfortable with git: `git init`, `git add .`, `git commit -m "initial site"`, `git remote add origin <your repo URL>`, `git push -u origin main`).
4. Confirm the repo's default branch is named `main`. If it's `master` instead, open `admin/config.yml` and change `branch: main` to `branch: master`.
5. **Important:** open `admin/config.yml` in the repo and edit this line:
   ```yaml
   repo: OWNER/REPO
   ```
   Replace it with your actual GitHub username and repo name, e.g. `repo: vatsalraval/unicare-website`. The CMS will not work until this is a real repo path.

## Step 2 — Connect Netlify to that repo

1. In Netlify: **Add new site → Import an existing project → GitHub** → authorize → select your repo.
2. Netlify reads `netlify.toml` automatically and pre-fills:
   - Build command: `npm install && npm run build`
   - Publish directory: `.`
3. Click **Deploy**. First deploy takes a minute or two. You'll get a live URL like `random-name-123.netlify.app`.
4. (Optional, do this later) Site configuration → Domain management → add `unicarewater.com` and follow Netlify's DNS instructions.

## Step 3 — Create a GitHub OAuth App (this is the actual login system)

This is the one part that happens on GitHub's side, not Netlify's.

1. On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App** (direct link: github.com/settings/developers).
2. Fill in:
   - **Application name:** `Unicare Website CMS` (or anything you like)
   - **Homepage URL:** your Netlify site URL, e.g. `https://random-name-123.netlify.app`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
3. Click **Register application**. GitHub gives you a **Client ID** and lets you generate a **Client Secret** — copy both, you'll need them once.

## Step 4 — Connect that OAuth App to your Netlify site

1. In your Netlify site dashboard: **Site configuration → General → Access control** (the exact label may read slightly differently — look for a section about "OAuth" or "external Git providers"; Netlify's own docs at `docs.netlify.com` have the current click-path if the menu has moved by the time you're doing this).
2. Choose **GitHub** as the provider and paste in the **Client ID** and **Client Secret** from Step 3.
3. Save.

## Step 5 — Give editors repo access

Because login is now tied to real GitHub accounts, anyone who needs to add or delete blog posts needs **write access to the GitHub repo**:

- If it's just you, you already have it as the repo owner — skip this step.
- For anyone else: GitHub repo → **Settings → Collaborators → Add people** → enter their GitHub username or email → give them **Write** access. They'll get an invite email from GitHub to accept.

## Step 6 — Start editing

1. Go to `yoursite.netlify.app/admin` (or `unicarewater.com/admin` once your domain is connected).
2. Click **Login with GitHub**, authorize the app on GitHub's screen (first time only), and you're in.
3. Click **Blog Posts** → **New Blog Posts** to add one, or open any existing post to edit or delete it.
4. Hit **Publish**. That commits the change to GitHub, which triggers Netlify to rebuild (`build-blog.js` regenerates `blog.html` and the post pages) and redeploy — live in about a minute, automatically.

## Why this is secure

- No password, of any form, exists anywhere in this site's code — view-source shows nothing to steal.
- Login is GitHub's own authentication (2FA, security alerts, everything GitHub already gives your account) — Netlify only brokers the OAuth handshake, it never sees or stores a password.
- Only GitHub accounts you've explicitly added as collaborators can log in at all — there's no signup form, no invite-by-email flow that could be intercepted.
- To revoke someone's access, remove them from the repo's Collaborators list on GitHub. Takes effect immediately.

**One trade-off worth knowing:** because access is tied to full repo collaborator permission (not a scoped "blog editor" role), anyone with blog-editing access technically also has push access to the rest of the site's code. For a single in-house editor this is normal and fine; if you later want a stricter separation (e.g. an outside contractor who should *only* touch blog posts), that needs a different setup — worth a separate conversation if it comes up.

## If you'd rather skip GitHub/Netlify entirely

That's a fair call. Without this setup, there's no way to offer secure login-gated editing — the alternative is that whoever wants a post added sends you the text, and you (or I) edit the markdown file directly and redeploy. Slower, but zero moving parts.
