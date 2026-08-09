# How to add photos to the website

Every page now has a photo slot. You do this entirely through `/admin` — no code, no sending files to anyone.

## The rule (same for every page)

Each page looks for a photo named **exactly the same as its web address, with `.jpg` instead of `.html`**.

| Page | Upload a photo named exactly |
|---|---|
| Homepage | *(none — the homepage hero is an animated background, not a photo. There's no photo slot here by design.)* |
| Sewage Treatment Plant product page | `product-sewerage-treatment-plant.jpg` |
| Reverse Osmosis Plant product page | `product-reverse-osmosis-plant.jpg` |
| *(any other product page)* | `product-<same-name-as-the-page>.jpg` |
| Rural Solutions page | `solutions-rural.jpg` |
| Metropolitan Solutions page | `solutions-metropolitan.jpg` |
| Industrial Solutions page | `solutions-industrial.jpg` |
| Company Overview | `about-company-overview.jpg` |
| Management | `about-management.jpg` |
| Partners | `about-partner.jpg` |
| Technologies | `technologies.jpg` |
| Contact | `contact.jpg` |
| Blog listing page | `blog.jpg` |
| Achievements page | `achievements.jpg` |

(Full list: take any page's web address, e.g. `product-water-atm.html`, and just change `.html` to `.jpg` — that's the filename to use, every time.)

## Steps

1. Go to `yoursite.com/admin`, log in.
2. Click **Media** (top nav).
3. Click **Upload**.
4. **Rename your photo file to match the table above exactly** before uploading (rename it on your computer first).
5. Upload it. That's it — no Publish button to click, no further step. The photo appears on that page's header within a minute or two (however long your last deploy takes).
6. To replace a photo later, upload a new one with the same filename — it overwrites the old one.

Recommended: landscape photos, at least 1200px wide, of real installations, your facility, or your team. A dark overlay is applied automatically so white text stays readable over any photo.

## Adding a photo inside a blog post or achievement (not the header photo)

This is separate and already worked before today:
1. Open the Blog Post or Achievement you're editing.
2. Click into the description text box, click the image icon in the small toolbar above it.
3. Upload or pick a photo — it inserts directly into the text.

## What isn't covered yet

Individual sections *within* a page (e.g. a photo next to one specific paragraph on the Company Overview page) aren't self-service — only each page's top header photo is. If you want a photo somewhere more specific than that, send it to me and I'll wire that particular spot in.
