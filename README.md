# Manahil Shahid portfolio website

Plain HTML, CSS and JavaScript. No build step, no frameworks, nothing to install.

## Files (23): keep them all together, at the same level

| File | What it is |
|---|---|
| `index.html` | The page |
| `styles.css` | All styling |
| `script.js` | Globe, gallery, case studies, animations |
| `Manahil-Shahid-CV.pdf` | The CV behind every "Download CV" button |
| `cv-page-1.jpg`, `cv-page-2.jpg` | The two CV pages shown in the "View CV" preview |
| `manahil-portrait.jpg` | Portrait in the first screen |
| `food-burger.jpg` | Burger on the kiosk mock-up |
| `art-weightless.jpg` | Astronaut drawing in About |
| `art-*.jpg` (10 files) | The ten gallery pieces |
| `og-image.jpg` | Preview image when the link is shared |
| `favicon.svg` | Browser tab icon |
| `robots.txt` | Lets search engines index the site |
| `README.md` | This guide |

## Put it online (GitHub + Cloudflare, free)

1. **GitHub:** create a new repository (for example `manahil-portfolio`).
   Click **Add file → Upload files**, drag in **all the files from this folder**
   (not the folder itself), then click **Commit changes**.
2. **Check the names:** every file must sit at the top level of the repository, with
   exactly the names above. If your browser renamed anything during download
   (for example `index (2).html`), rename it back before uploading.
3. **Cloudflare:** go to **Workers & Pages → Create → Import a repository**, choose the
   repository, leave the build settings empty, and click **Deploy**.
4. Open the address Cloudflare gives you and press **Ctrl + Shift + R**.

Every later change: upload the changed file to GitHub with the same name.
Cloudflare redeploys automatically within a minute or two.

## After it's live (one small edit)

LinkedIn and WhatsApp previews need the full address of the preview image.
In `index.html`, find:

    <meta property="og:image" content="og-image.jpg">

and change it to your live address, for example:

    <meta property="og:image" content="https://manahil-portfolio.pages.dev/og-image.jpg">

## Common updates

- **New CV:** replace `Manahil-Shahid-CV.pdf` with a file of the same name, and replace
  `cv-page-1.jpg` and `cv-page-2.jpg` with images of the new pages (or send the new CV
  over and the page images can be made for you), so the preview matches the download.
- **New painting:** save it as a JPG in this folder, then in `index.html` copy one
  `<li><button class="thumb" …>` line in the gallery list, and change its image
  file name, title (`data-title`) and description (`alt`).
- **Custom domain (optional):** in Cloudflare, open the project → **Custom domains**.

## Built-in features

- **Quick view:** one screen with role, key numbers, skills, experience and contact,
  for recruiters in a hurry (menu bar, and the bottom bar on phones).
- **View CV:** an in-page preview of the CV that works on every device, with a
  Download CV button.
- **Dark mode:** the round button in the menu bar. The choice is remembered on
  that visitor's device.
- **Colour codes:** in the gallery, selecting a colour copies its code.
- **Slideshow, case studies, skills globe:** all work with a mouse, touch or keyboard,
  and animations switch off for visitors who turn off motion in their device settings.

## Visitor analytics (free, no cookie banner needed)

In Cloudflare, open **Analytics & Logs → Web Analytics**, click **Add a site**, choose
this site, and follow the prompt to enable it. Visits, top pages and countries then
appear in the Cloudflare dashboard. Nothing in the website files needs to change.
