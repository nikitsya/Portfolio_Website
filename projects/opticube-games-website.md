# OptiCube Games Website

Live links:
- Home: https://opticubestudio.com
- LUCKROT: https://opticubestudio.com/luckrot.html
- Press kit: https://opticubestudio.com/presskit.html

Tech: HTML, CSS, Vanilla JavaScript; GitHub Pages (GitHub Actions) + custom domain.

## One-liner (Project Grid)

Production static marketing site with reusable partials, accessible navigation, and a resilient, data-driven press kit.

## Summary (2-4 sentences)

OptiCube Games Website is a production static marketing site for a game studio, including a dedicated game page and a full press kit. I built it with plain HTML/CSS/Vanilla JavaScript to keep the system understandable, maintainable, and easy to ship on GitHub Pages. The site focuses on UX clarity (especially on mobile), accessible interaction patterns, and resilient loading for media-heavy content.

## Resume Bullets (5-8)

- Built a production static marketing website (studio + game page + press kit) using HTML/CSS/Vanilla JavaScript, deployed via GitHub Pages with GitHub Actions and a custom domain.
- Implemented runtime HTML partial loading for shared header/footer to eliminate duplication and reduce the risk of inconsistent navigation across pages.
- Shipped a mobile navigation system with correct ARIA state, close-on-outside-click behavior, and Escape key support.
- Designed and implemented a press kit "media hub" with a factsheet, trailer embed, and screenshot carousel with thumbnail navigation.
- Developed a JSON-backed visual library with category tabs and a lightbox viewer to browse press-ready assets.
- Hardened client-side rendering by validating media JSON and providing graceful fallbacks when data is missing or invalid.
- Added a scroll-based visual effect by updating a CSS custom property via requestAnimationFrame for smooth, controllable motion.

## Full Case Study

### Problem/Goals

- Build a production marketing site for a studio and a game, with a press kit that is easy for media to use.
- Keep the codebase simple enough to maintain without a framework, while still supporting interactive UI.
- Ensure mobile-first usability and accessible interactions (keyboard support and ARIA state).
- Make media content resilient: validate data inputs and degrade gracefully rather than failing hard.

### My Role

I owned the frontend implementation and the engineering decisions behind the site's structure, interactions, and deployment. I built the reusable layout system (partials), mobile navigation interaction, and the press kit experiences (carousel, data-driven library, and lightbox).

### Architecture

- Static-first HTML/CSS/JS to keep hosting predictable and debugging straightforward.
- Runtime partial loading for shared header/footer so global layout changes ship once, not N times.
- Data-driven rendering for the press kit visual library using JSON-backed categories.
- Input validation and fallback UI so missing/invalid media data doesn't break the page.

### Key Implementations

- Shared header/footer loaded from partials (runtime partial loading) to avoid duplication.
- Responsive layout across desktop/tablet/mobile with clear content hierarchy.
- Mobile navigation interaction with proper ARIA expanded state, close on outside click, and Escape key support.
- Press kit media hub: factsheet + trailer embed + screenshots carousel with thumbnail navigation.
- JSON-backed visual library: categories + tabs + lightbox viewer.
- Resilient loading: validate media JSON and fall back gracefully if data fails.
- Smooth scroll-based visual effect using a CSS custom property updated via requestAnimationFrame.

### Accessibility & UX

- Treat interactive UI as a contract: ARIA state stays accurate, keyboard escape patterns work, and controls remain discoverable.
- Prioritize clarity over novelty: press kit layout supports quick scanning and direct access to media assets.
- Keep layouts stable across breakpoints and maintain readable typography and spacing.

### Performance

I avoided writing performance "wins" without measurement.

What to measure (good portfolio numbers to add later):
- Lighthouse scores for Home, LUCKROT, and Press kit pages (Perf/A11y/SEO/Best Practices).
- Core Web Vitals-style signals: LCP, CLS, and INP.
- Total bytes (HTML/CSS/JS) and image/media sizes per page.

If you share results, I can add a short measured-results block to this case study without guessing.

### Deployment

- Deployed via GitHub Pages with a GitHub Actions workflow.
- Custom domain configuration to serve the site at opticubestudio.com.
- Static deploy pipeline for safe, repeatable releases with minimal production surface area.

### Tradeoffs

- Runtime partial loading trades an extra request + client-side logic for strong maintainability and consistency.
- JSON-driven UI requires validation and fallback states; the benefit is faster content changes with less duplication.
- GitHub Pages keeps infrastructure simple, but limits server-side features, so all interactivity must be client-side.

### What I'd do next

- Add Playwright smoke tests for navigation, carousel, tabs, and lightbox.
- Introduce lightweight schema validation helpers for JSON data (and structured error reporting).
- Establish performance budgets and track regressions with Lighthouse CI.
- Add an optional build step for asset optimization (image resizing/formatting and cache-friendly filenames).

### Stripe alignment (reliability + product thinking)

I treat a static site like a production system: reliability comes from small, clean abstractions and boring failure modes. On OptiCube, I focused on maintainable shared layout, resilient data-driven rendering (validation + graceful fallback), accessible interaction patterns (ARIA + keyboard support), and performance work grounded in measurement rather than claims. The end result is a site that's easy to ship, easy to change, and hard to break.
