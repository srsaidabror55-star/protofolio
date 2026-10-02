# Saidabror portfolio (static, for Netlify)

Pure HTML/CSS/JS. No backend, no build step. GSAP, ScrollTrigger and Lenis are included in `vendor/`.

## Deploy
1. Put this folder in a GitHub repository (the files must be at the repository root) and push.
2. Netlify > Add new site > Import from Git > choose the repo. Build command: leave empty. Publish directory: `.` (already set in `netlify.toml`).
3. Or just drag the folder onto https://app.netlify.com/drop .

## Contact form (Netlify Forms)
The form is already set up (`data-netlify="true"`, honeypot field). After the first deploy, messages appear in
Netlify > your site > Forms > contact. Turn on email notifications under Forms > Settings & usage > Form notifications.
Set the notification recipient to `srsaidabror55@gmail.com` in Netlify > your site > Forms > Settings & usage > Form notifications.
The form does not work on `localhost`, only on the deployed Netlify site.

## Change your content
Edit the profile values, social links and project list in `build.py`, then run `python build.py` to regenerate the page.
The Projects section currently lists the public repositories for `srsaidabror55-star`.
Also replace `https://example.netlify.app` (canonical/Open Graph) in `index.html`, `robots.txt` and `sitemap.xml` with your real address.

Optional: `build.py` regenerates `index.html` from the lists at the top of that file (`python build.py`).
Use either way, but not both, or your direct edits will be overwritten.

### Add a project
Copy one `<article class="card">...</article>` block inside `data-track`, change the text and the colour in
`data-glow="#xxxxxx"` / `style="--tint:#xxxxxx"` (the background glow follows this colour).
Add a screenshot: save it in `assets/projects/` and replace the `<span class="card__ini">..</span>` with
`<img src="assets/projects/name.jpg" alt="Project name screenshot" loading="lazy">`.
Update the "/ 4" counter text in the Projects header.

### Add a skill / service
Copy a `<li class="skill" style="--level:80%">` (change the number in both places) or a `<li class="service">` row.

## Notes
- Dark theme only. Animations are disabled automatically for visitors who prefer reduced motion.
- `netlify.toml` adds security headers (including a strict Content-Security-Policy) and long caching for static files.
