"""Generates index.html from the content below. Run once: python build.py
You can also edit index.html directly; this script only exists to keep the content in one place."""
import html

PROFILE = dict(
    name="Saidabror", full_name="Saidabror", title="Python Backend Developer",
    intro="Building modern web applications, APIs and digital products.",
    email="srsaidabror55@gmail.com", phone="+998 90 000 00 00", location="Tashkent, Uzbekistan",
    site="https://saidabrordev.netlify.app",
    about_title="Backends that stay calm under load.",
    about=["I'm a backend developer from Tashkent who likes software that is boring in the best way: predictable, documented and easy to change.",
           "I work mostly with Python and Django, design the database first, and ship with Docker so what runs on my laptop runs on the server."],
    stats=[(9, "Projects completed"), (10, "Technologies"), (3, "Years learning"), (5, "Clients")],
    roles=["Python Backend Developer", "REST API Developer", "Telegram Bot Developer", "Django Specialist"],
)
SOCIALS = [("github", "GitHub", "https://github.com/srsaidabror55-star"), ("telegram", "Telegram", "https://t.me/"), ("linkedin", "LinkedIn", "https://www.linkedin.com/")]
SKILLS = {
    "Backend": [("Python", 90), ("Django", 88), ("Django REST Framework", 85), ("Flask", 70), ("PostgreSQL", 80), ("Redis", 68), ("Celery", 65)],
    "DevOps": [("Linux", 75), ("Docker", 80), ("Nginx", 72), ("Git", 85)],
    "Frontend": [("HTML", 85), ("CSS", 78), ("JavaScript", 70)],
}
SERVICES = [
    ("Web Development", "web", "Fast, accessible websites and web apps, from landing pages to full products."),
    ("Telegram Bot Development", "bot", "Bots that take orders, send notifications and automate support."),
    ("REST API Development", "api", "Documented, versioned APIs your mobile and web clients can rely on."),
    ("Backend Development", "server", "Django back ends with clean architecture, tests and background jobs."),
    ("Database Design", "database", "PostgreSQL schemas, migrations and query tuning that scale with your data."),
    ("Deployment", "rocket", "Linux servers set up with Nginx, Gunicorn, HTTPS and automated backups."),
    ("Dockerization", "container", "Reproducible Docker and Compose setups for development and production."),
]
# image: put a file in assets/projects/ and set e.g. "assets/projects/orderly.jpg" (or None for the placeholder)
PROJECTS = [
    dict(title="boti", cat="Python", date="Aug 2026", glow="#3347ff", featured=False, image=None,
      summary="Public GitHub repository.",
      desc="View the repository for source code and project details.",
      tech=["Python"], github="https://github.com/srsaidabror55-star/boti", live=None),
    dict(title="apimarket", cat="Project", date="Aug 2026", glow="#12a38a", featured=False, image=None,
      summary="Public GitHub repository.",
      desc="View the repository for source code and project details.",
      tech=[], github="https://github.com/srsaidabror55-star/apimarket", live=None),
    dict(title="InfininiteCO_market", cat="Python", date="Aug 2026", glow="#b8326a", featured=False, image=None,
      summary="Public GitHub repository.",
      desc="View the repository for source code and project details.",
      tech=["Python"], github="https://github.com/srsaidabror55-star/InfininiteCO_market", live=None),
    dict(title="InfininiteCO_marketl", cat="Project", date="Aug 2026", glow="#d98a00", featured=False, image=None,
      summary="Public GitHub repository.",
      desc="View the repository for source code and project details.",
      tech=[], github="https://github.com/srsaidabror55-star/InfininiteCO_marketl", live=None),
    dict(title="InfininiteCO", cat="Project", date="Aug 2026", glow="#008f95", featured=False, image=None,
      summary="shunchaki",
      desc="View the repository for source code and project details.",
      tech=[], github="https://github.com/srsaidabror55-star/InfininiteCO", live=None),
    dict(title="django_admin", cat="Project", date="Jul 2026", glow="#c04c22", featured=False, image=None,
      summary="Public GitHub repository.",
      desc="View the repository for source code and project details.",
      tech=[], github="https://github.com/srsaidabror55-star/django_admin", live=None),
    dict(title="protofolio", cat="HTML", date="Jul 2026", glow="#4c6b3c", featured=False, image=None,
      summary="My first portfolio project.",
      desc="View the repository for source code and project details.",
      tech=["HTML"], github="https://github.com/srsaidabror55-star/protofolio", live=None),
    dict(title="my-first-project", cat="Project", date="Jul 2026", glow="#8c4b9e", featured=False, image=None,
      summary="My first project on GitHub - learning Git basics.",
      desc="View the repository for source code and project details.",
      tech=[], github="https://github.com/srsaidabror55-star/my-first-project", live=None),
    dict(title="bot", cat="Bot", date="Jul 2026", glow="#527caa", featured=False, image=None,
      summary="Find a taxi through this bot.",
      desc="View the repository for source code and project details.",
      tech=[], github="https://github.com/srsaidabror55-star/bot", live=None),
]
JOURNEY = [
    ("Sep 2022", "Jan 2023", "Learning", "Started Python", "Variables to OOP: scripts, small games and command line tools.", ["Python"]),
    ("Feb 2023", "Jun 2023", "Learning", "Web fundamentals", "HTML, CSS and JavaScript, then a first Flask app.", ["HTML", "CSS", "JavaScript", "Flask"]),
    ("Jul 2023", "Oct 2023", "Project", "First Django project", "A blog engine with authentication, comments and an admin workflow.", ["Django", "SQLite"]),
    ("Jan 2024", "Mar 2024", "Milestone", "First real client", "Delivered a Telegram bot for a local business.", ["Python", "PostgreSQL"]),
    ("Apr 2024", "now", "Learning", "APIs and infrastructure", "DRF, Redis, Celery, Docker and Nginx for production deployments.", ["DRF", "Redis", "Celery", "Docker", "Nginx"]),
]
SECTIONS = [("hero", "Home"), ("about", "About"), ("skills", "Skills"), ("services", "Services"), ("projects", "Projects"), ("journey", "Journey"), ("contact", "Contact")]

ICONS = {
 "web": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
 "bot": '<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9 16.5h6"/>',
 "api": '<path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0V8zM12 18v3"/>',
 "server": '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>',
 "database": '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
 "rocket": '<path d="M5 15c-1.5 1-2 4-2 6 2 0 5-.5 6-2M14 4c3-1 6-1 7-1 0 1 0 4-1 7l-6 6-5-5 5-7zM9 14l-3-3 3-1M14 15l1 3-3 3"/>',
 "container": '<rect x="3" y="11" width="4" height="4"/><rect x="8" y="11" width="4" height="4"/><rect x="13" y="11" width="4" height="4"/><rect x="8" y="6" width="4" height="4"/><path d="M2 17c2 3 8 5 14 3 3-1 5-3 6-6-1-1-3-1-4 0"/>',
 "github": '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
 "telegram": '<path d="M21 4L3 11l6 2.5L11 20l3-4 4.5 3.5L21 4zM9 13.5L17 8"/>',
 "linkedin": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13.5c0-1.5 1-2.5 2.5-2.5S17 12 17 13.5V17"/>',
 "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
 "up-right": '<path d="M7 17L17 7M8 7h9v9"/>',
}
def icon(name, size=20):
    return f'<svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">{ICONS[name]}</svg>'
e = html.escape
slug = lambda s: s.lower().replace(" ", "-")
p = PROFILE

def chars(text, cls): return "".join(f'<span class="{cls}">{e(c)}</span>' for c in text)

nav_links = "".join(f'<a href="#{i}" data-cursor-hover>{n}</a>' for i, n in SECTIONS[1:] if i != "journey")
menu_links = "".join(f'<a href="#{i}">{n}</a>' for i, n in SECTIONS[1:])
dots = "".join(f'<li><a href="#{i}" data-dot="{i}" data-cursor-hover aria-label="{n}"><span>{n}</span><i></i></a></li>' for i, n in SECTIONS)
socials_icons = "".join(f'<li><a href="{u}" target="_blank" rel="noopener noreferrer" aria-label="{n}" data-cursor-hover>{icon(k)}</a></li>' for k, n, u in SOCIALS)
socials_text = "".join(f'<li><a href="{u}" target="_blank" rel="noopener noreferrer" data-cursor-hover>{n}</a></li>' for k, n, u in SOCIALS)
roles = "".join(f'<span class="role__item">{e(r)}</span>' for r in p["roles"])
about = "".join(f'<p data-fade>{e(t)}</p>' for t in p["about"])
stats = "".join(f'<div class="stat" data-fade><dd class="stat__num" data-count="{n}">{n}</dd><dt>{e(l)}</dt></div>' for n, l in p["stats"])
all_skills = [n for items in SKILLS.values() for n, _ in items]
marquee = "".join(f'<span>{e(n)}</span>' for n in all_skills)
skill_cols = ""
for cat, items in SKILLS.items():
    rows = "".join(f'<li class="skill" style="--level:{lv}%"><span class="skill__name">{e(n)}</span><span class="skill__lv">{lv}</span><span class="skill__bar" role="img" aria-label="{lv} out of 100"><i></i></span></li>' for n, lv in items)
    skill_cols += f'<div class="skill-col" data-fade><h3>{cat}<small>{len(items)}</small></h3><ul>{rows}</ul></div>'
services = "".join(f'<li class="service" tabindex="0" data-cursor-hover><span class="service__icon">{icon(ic, 24)}</span><h3 class="service__title">{e(t)}</h3><p class="service__desc">{e(d)}</p><span class="service__go">{icon("up-right", 22)}</span></li>' for t, ic, d in SERVICES)

cards = ""
for i, pr in enumerate(PROJECTS):
    ini = "".join(w[0] for w in pr["title"].split()[:2]).upper()
    art = (f'<img src="{e(pr["image"])}" alt="{e(pr["title"])} screenshot" loading="lazy" decoding="async">' if pr["image"]
           else f'<span class="card__ini" aria-hidden="true">{ini}</span>')
    tech = "".join(f'<li>{e(t)}</li>' for t in pr["tech"])
    links = (f'<a class="btn btn--sm btn--light" href="{pr["live"]}" target="_blank" rel="noopener noreferrer" data-cursor-hover>Live demo {icon("up-right", 16)}</a>' if pr["live"] else "")
    links += (f'<a class="btn btn--sm btn--ghost" href="{pr["github"]}" target="_blank" rel="noopener noreferrer" data-cursor-hover>{icon("github", 16)} Source</a>' if pr["github"] else "")
    feat = '<span class="badge">Featured</span>' if pr["featured"] else ""
    if pr["live"]:
        art_open = f'<a class="card__art" href="{pr["live"]}" target="_blank" rel="noopener noreferrer" aria-label="Open {e(pr["title"])} live demo" data-cursor="Open">'
        art_close = "</a>"
    else:
        art_open, art_close = '<div class="card__art">', "</div>"
    cards += f'''<article class="card" data-glow="{pr["glow"]}" style="--tint:{pr["glow"]}">
  {art_open}<div class="card__art-in">{art}</div>{art_close}
  <div class="card__body">
    <p class="card__meta"><span>{e(pr["cat"])}</span><time>{e(pr["date"])}</time>{feat}</p>
    <h3 class="card__title">{e(pr["title"])}</h3>
    <p class="card__sum">{e(pr["summary"])}</p>
    <p class="card__desc">{e(pr["desc"])}</p>
    <ul class="chips">{tech}</ul>
    <div class="card__links">{links}</div>
  </div>
</article>'''

journey = ""
for a, b, kind, title, desc, techs in JOURNEY:
    chips = "".join(f"<li>{e(t)}</li>" for t in techs)
    journey += f'<li class="step" data-step><div class="step__when"><b>{a}</b><span>{"to now" if b == "now" else "to " + b}</span></div><div class="step__body"><p class="step__kind">{kind}</p><h3>{e(title)}</h3><p>{e(desc)}</p><ul class="chips">{chips}</ul></div></li>'

contact_list = f'<li><span>Email</span><a href="mailto:{p["email"]}" data-cursor-hover>{p["email"]}</a></li><li><span>Phone</span><a href="tel:{"".join(c for c in p["phone"] if c.isdigit() or c == "+")}" data-cursor-hover>{p["phone"]}</a></li>'
contact_list += "".join(f'<li><span>{n}</span><a href="{u}" target="_blank" rel="noopener noreferrer" data-cursor-hover>{u.replace("https://", "").replace("www.", "").rstrip("/")}</a></li>' for k, n, u in SOCIALS)

def field(id_, label, extra, tag="input"):
    ctl = f'<textarea id="{id_}" name="{id_}" rows="4" {extra}></textarea>' if tag == "textarea" else f'<input id="{id_}" name="{id_}" {extra}>'
    return f'<div class="field"><label for="{id_}">{label}</label>{ctl}<p class="field__err" role="alert"></p></div>'

page = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{p["full_name"]} | {p["title"]}</title>
<meta name="description" content="{p["full_name"]}, {p["title"]}. {p["intro"]}">
<meta name="theme-color" content="#050505">
<link rel="canonical" href="{p["site"]}/">
<meta property="og:type" content="website">
<meta property="og:title" content="{p["full_name"]} | {p["title"]}">
<meta property="og:description" content="{p["intro"]}">
<meta property="og:url" content="{p["site"]}/">
<meta name="twitter:card" content="summary">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/bricolage.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="css/style.css">
<script src="js/boot.js"></script>
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"Person","name":"{p["full_name"]}","jobTitle":"{p["title"]}","url":"{p["site"]}","email":"{p["email"]}","sameAs":[{",".join('"' + u + '"' for _, _, u in SOCIALS)}]}}</script>
</head>
<body>
<div class="loader" role="status" aria-label="Loading"><div class="loader__name" aria-hidden="true">{chars(p["name"], "loader__ch")}</div><div class="loader__foot" aria-hidden="true"><span class="loader__num">0</span><div class="loader__bar"><i></i></div></div></div>
<div class="progress" aria-hidden="true"><i></i></div>
<div class="cursor" aria-hidden="true"><span class="cursor__label"></span></div>

<header class="header" data-header>
  <a class="logo" href="#hero" data-cursor-hover aria-label="{p["full_name"]}, back to top">{p["name"]}<i></i></a>
  <nav class="header__nav" aria-label="Primary">{nav_links}</nav>
  <a class="btn btn--sm btn--light header__cta magnetic" href="#contact" data-cursor-hover>Contact me</a>
  <button class="burger" type="button" data-burger aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
</header>
<div class="menu" id="menu" data-menu hidden>
  <nav class="menu__nav" aria-label="Mobile">{menu_links}</nav>
  <div class="menu__foot"><a href="mailto:{p["email"]}">{p["email"]}</a><ul class="links-row">{socials_text}</ul></div>
</div>
<nav class="dots" aria-label="Sections"><ul>{dots}</ul></nav>
<div class="where" aria-hidden="true"><b data-where-num>01</b><i></i><span data-where-name>Home</span></div>

<main>
<section class="panel hero" id="hero" data-title="Home">
  <canvas class="hero__canvas" aria-hidden="true"></canvas>
  <div class="hero__in">
    <p class="hero__hi" data-hero-in>Hi, I'm</p>
    <h1 class="hero__name" aria-label="{p["name"]}"><span aria-hidden="true">{chars(p["name"], "hero__ch")}</span></h1>
    <p class="role" data-hero-in aria-label="{p["title"]}"><span class="role__list" aria-hidden="true">{roles}</span></p>
    <p class="hero__intro" data-hero-in>{e(p["intro"])}</p>
    <div class="hero__cta" data-hero-in>
      <a class="btn btn--light magnetic" href="#projects" data-cursor-hover>View projects {icon("arrow", 18)}</a>
      <a class="btn btn--ghost magnetic" href="#contact" data-cursor-hover>Contact me</a>
    </div>
  </div>
  <div class="hero__side" data-hero-in><p class="status"><i></i>Open to new projects</p><ul class="icons">{socials_icons}</ul></div>
  <a class="scroll" href="#about" data-hero-in aria-label="Scroll to About"><span>Scroll</span><i></i></a>
</section>

<section class="panel about" id="about" data-title="About">
  <div class="wrap about__grid">
    <div class="about__media">
      <div class="about__frame" data-reveal><div class="about__ph" aria-hidden="true">{p["name"][0]}</div></div>
      <dl class="facts" data-fade><div><dt>Based in</dt><dd>{p["location"]}</dd></div><div><dt>Email</dt><dd><a href="mailto:{p["email"]}" data-cursor-hover>{p["email"]}</a></dd></div><div><dt>Phone</dt><dd><a href="tel:{"".join(c for c in p["phone"] if c.isdigit() or c == "+")}" data-cursor-hover>{p["phone"]}</a></dd></div></dl>
    </div>
    <div class="about__text">
      <p class="eyebrow" data-fade>About</p>
      <h2 class="h2" data-split>{e(p["about_title"])}</h2>
      <div class="prose">{about}</div>
      <dl class="stats">{stats}</dl>
    </div>
  </div>
</section>

<section class="panel skills" id="skills" data-title="Skills">
  <div class="wrap"><p class="eyebrow" data-fade>Skills</p><h2 class="h2" data-split>What I work with</h2></div>
  <div class="marquee" aria-hidden="true"><div class="marquee__row"><div>{marquee}</div><div>{marquee}</div></div><div class="marquee__row marquee__row--rev"><div>{marquee}</div><div>{marquee}</div></div></div>
  <div class="wrap skill-grid">{skill_cols}</div>
</section>

<section class="panel services" id="services" data-title="Services">
  <div class="wrap"><p class="eyebrow" data-fade>Services</p><h2 class="h2" data-split>How I can help</h2><ul class="service-list">{services}</ul></div>
</section>

<section class="work" id="projects" data-title="Projects">
  <div class="work__glow" data-glow-el></div>
  <div class="work__head wrap"><div><p class="eyebrow" data-fade>Projects</p><h2 class="h2" data-split>Selected work</h2></div><p class="work__hint" data-fade><span class="work__count"><span data-work-now>1</span> / {len(PROJECTS)}</span><em>Keep scrolling</em></p></div>
  <div class="work__viewport"><div class="work__track" data-track>{cards}</div></div>
  <div class="work__bar" aria-hidden="true"><i></i></div>
</section>

<section class="panel journey" id="journey" data-title="Journey">
  <div class="wrap"><p class="eyebrow" data-fade>Journey</p><h2 class="h2" data-split>The road so far</h2>
  <ol class="steps" data-steps><li class="steps__line" aria-hidden="true"><i></i></li>{journey}</ol></div>
</section>

<section class="panel contact" id="contact" data-title="Contact">
  <div class="wrap contact__grid">
    <div class="contact__lead">
      <p class="eyebrow" data-fade>Contact</p>
      <h2 class="h2" data-split>Have something to build?</h2>
      <p class="muted" data-fade>Tell me about the project, the deadline and what success looks like. I reply within a day.</p>
      <ul class="clist" data-fade>{contact_list}</ul>
    </div>
    <div class="contact__box" data-fade>
      <form class="form" name="contact" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field" novalidate data-form>
        <input type="hidden" name="form-name" value="contact">
        <p class="trap" aria-hidden="true"><label>Do not fill this in <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        {field("name", "Name", 'type="text" autocomplete="name" required minlength="2" maxlength="120"')}
        {field("email", "Email", 'type="email" autocomplete="email" required')}
        {field("phone", 'Phone <small>(optional)</small>', 'type="tel" autocomplete="tel" maxlength="30"')}
        {field("message", "Message", 'required minlength="10" maxlength="4000"', "textarea")}
        <p class="form__err" role="alert" data-form-err></p>
        <button class="btn btn--light btn--block" type="submit" data-cursor-hover><span data-label>Send message</span> {icon("arrow", 18)}</button>
      </form>
      <div class="sent" data-sent hidden tabindex="-1"><svg class="sent__check" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29"/><path d="M19 33l9 9 17-19"/></svg><h3>Message sent</h3><p>Thanks, I'll reply to your email within a day.</p><button class="btn btn--ghost" type="button" data-again data-cursor-hover>Send another</button></div>
    </div>
  </div>
</section>
</main>

<footer class="footer" data-footer>
  <div class="wrap footer__top">
    <nav class="footer__nav" aria-label="Footer">{"".join(f'<a href="#{i}" data-cursor-hover>{n}</a>' for i, n in SECTIONS[1:])}</nav>
    <ul class="footer__soc">{socials_text}</ul>
    <a class="footer__mail" href="mailto:{p["email"]}" data-cursor-hover>{p["email"]}</a>
  </div>
  <p class="footer__word" aria-hidden="true" data-footer-word>{p["name"]}</p>
  <div class="wrap footer__bot"><p>&copy; <span data-year>2026</span> {p["full_name"]}. All rights reserved.</p><a href="#hero" data-cursor-hover>Back to top</a></div>
</footer>

<script src="vendor/gsap.min.js" defer></script>
<script src="vendor/ScrollTrigger.min.js" defer></script>
<script src="vendor/lenis.min.js" defer></script>
<script src="js/main.js" defer></script>
</body>
</html>
'''
open("index.html", "w", encoding="utf-8").write(page)
open("robots.txt", "w").write(f"User-agent: *\nAllow: /\nSitemap: {p['site']}/sitemap.xml\n")
open("sitemap.xml", "w").write(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{p["site"]}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>\n')
print("index.html", len(page))
