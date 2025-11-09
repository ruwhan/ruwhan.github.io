# Essentials MCP: Ruby, Jekyll, Clean Code, and SEO

This document captures the practical essentials to keep this site healthy, fast, and maintainable. It focuses on Ruby/Jekyll setup, clean code conventions, and SEO best practices tailored to this portfolio.

## Ruby & Tooling
- Use `bundler` for dependency management; run `bundle install` after Gemfile changes.
- Pin gem versions when stability matters; prefer semantic ranges for minor updates.
- Keep Ruby version consistent (e.g., `.ruby-version` with the target version).
- Useful commands:
  - `bundle exec jekyll build` — production build to `_site`
  - `bundle exec jekyll serve --livereload` — local dev with auto-reload
  - `JEKYLL_ENV=production bundle exec jekyll build` — optimize output for deploy
- Consider `bundle audit` (add `bundler-audit`) for basic security checks.
- Address current warnings by adding gems:
  - `csv` — silence Ruby 3.4+ default-gem change warning
  - `faraday-retry` — enable retry middleware for Faraday v2+

## Jekyll Essentials
- Set canonical site data in `_config.yml`:
  - `title`, `description`, `url`, `baseurl` (empty for root), and `author` info.
- Keep plugins minimal and focused:
  - `jekyll-seo-tag` — meta tags and structured data
  - `jekyll-sitemap` — `sitemap.xml` generation
  - `jekyll-feed` — Atom feed for posts
- Use clean permalinks: `permalink: /:title/` or `/:categories/:title/` if needed.
- Place assets under `assets/` (`css`, `js`, `images`, `files`) and keep names descriptive.
- Favor data-driven content with `_data/*.yml` for lists (skills, projects) to avoid duplication.
- Keep `_includes/` for reusable HTML (header, footer, cards) and `_layouts/` for page templates.

## Clean Code Conventions
- CSS/SCSS
  - Centralize variables in `assets/css/style.scss` (colors, spacing, fonts).
  - Prefer solid colors over gradients for a cleaner aesthetic and simpler theming.
  - Group styles by component/section; avoid deeply nested selectors.
  - Keep transitions subtle (duration ≤ 300ms) and reduce motion for accessibility.
- JavaScript
  - Keep `assets/js/main.js` focused on progressive enhancements (animations, parallax, fade-ins).
  - Avoid duplicate logic; encapsulate behaviors into small functions.
  - Defer non-critical work to `requestAnimationFrame` or `setTimeout` to keep first paint fast.
  - Fail gracefully if elements are missing; guard queries before use.
- HTML/Content
  - Use semantic tags (`header`, `main`, `section`, `article`, `footer`).
  - Ensure headings are hierarchical (`h1` once per page, then `h2`/`h3`).
  - Keep copy concise and scannable; avoid jargon.

## SEO & Accessibility
- Meta & Tags
  - Add `{% seo %}` in layouts (already present via `jekyll-seo-tag`).
  - Ensure `title`, `description`, `image`, `author`, social handles in `_config.yml` are accurate.
- Sitemap & Robots
  - `jekyll-sitemap` generates `/sitemap.xml`; verify on builds.
  - Maintain `robots.txt` to allow crawling; block only private paths.
- Open Graph & Twitter Cards
  - Provide `image` (og:image) with good dimensions (at least 1200×630).
  - Add social previews to improve sharing.
- Content Hygiene
  - Use descriptive `alt` text for images.
  - Keep URLs short, lowercase, and hyphenated.
  - Link to `assets/files/resume-RULLY_W_H-v6.9.pdf` for a downloadable resume.
- Performance
  - Optimize images (compress, modern formats where possible).
  - Load scripts at the end or with `defer`.
  - Avoid layout thrashing; batch DOM reads/writes.
- Accessibility
  - Maintain color contrast (WCAG AA minimum).
  - Provide focus states for interactive elements.
  - Respect users’ reduced motion preferences (prefers-reduced-motion).

## Deployment & CI
- Build with `JEKYLL_ENV=production` to generate optimized output.
- Use GitHub Actions (`.github/workflows/jekyll.yml`) to build on push.
- Keep `_site/` excluded from Git; it’s generated.
- After significant style/content changes, verify:
  - No broken links
  - `sitemap.xml` exists
  - `robots.txt` is correct
  - Pages render correctly on mobile and desktop

## Quick Checklists

### Pre-Commit
- Build locally without errors: `bundle exec jekyll build`
- Run local preview: `cd _site && python3 -m http.server 4000`
- Scan for console errors and broken links
- Verify key pages: `/`, `/resume/`, social links, resume download

### Content Update
- Update `_config.yml` with new social/author details
- Add new items via `_data/` for repeatable sections
- Keep headings, meta descriptions, and hero copy crisp

### SEO Refresh
- Confirm `{% seo %}` present in layout(s)
- Check `sitemap.xml` and `robots.txt`
- Validate Open Graph/Twitter images and metadata

---

This MCP aims to stay concise and practical. If needs evolve (new sections, tooling, or deployment targets), extend this document with focused, actionable notes.