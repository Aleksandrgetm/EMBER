# EMBER — Fire-led dining

An original restaurant portfolio concept: a fictional 24-seat, fire-led Nordic restaurant in Rīga. English interface, original generated imagery, custom GLSL, editorial typography, six page types and three dish pages.

## Run locally

Requires Node.js 22.18+ (or 24/26 LTS/current) and npm.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. Production build: `npm run build`. Serve that build with `npm run preview`. Run the booking-domain tests with `npm test`.

## Routes

- `/` — cinematic introduction, heat-distorted photograph, 3D ember, scroll-pinned tasting sequence, atmosphere.
- `/menu` — category filters, image previews, à la carte and six-course tasting modes.
- `/dish/celeriac`, `/dish/halibut`, `/dish/pear` — dish stories, ingredients and allergens.
- `/experience` — scene gallery, accessible fullscreen viewer, three-act evening.
- `/about` — editorial manifesto and fictional team.
- `/reservations` — two-step demonstration form, validation and confirmation.
- Unknown paths show a designed 404.

## Implementation

React 19 + TypeScript + Vite. GSAP / ScrollTrigger direct scene direction, Lenis smooth scrolling, Motion page/menu/gallery transitions, React Router, Tailwind CSS v4 plus custom design tokens. Three.js / React Three Fiber / Drei provide a lazy-loaded WebGL layer.

`src/webgl/Scene.tsx` contains original shaders: cursor-local image heat displacement, displaced icosahedral charcoal, Voronoi ember fissures, particle field and a scroll-responsive camera. GPU rendering pauses outside the viewport. DPR is capped at 1.5; no external model or environment map is required. Photography remains present if WebGL fails. Reduced motion avoids canvases and horizontal pinning; the footer motion control also disables continuous effects. The system setting always takes precedence.

`src/data/booking.ts` uses the Europe/Riga clock. It validates actual calendar dates, Wednesday–Sunday service, offered times, past times and a three-calendar-month window. Seven regression tests cover these rules.

## Content and privacy

This is a fictional portfolio, not an operating restaurant. Team, menu, pricing and availability are illustrative. The reservation form performs no network request, creates no booking, sends no email and stores no contact details. Its values only live in React memory. The motion preference uses localStorage; the once-per-session introduction uses sessionStorage. No tracking, analytics or third-party widgets.

All five photographs were generated for this concept. See `public/images/PROVENANCE.txt` for prompts and provenance. Cormorant Garamond and Manrope are self-hosted as Latin/Latin Extended WOFF2 subsets under SIL OFL; licenses are included in `public/fonts/`. No imagery or source code was copied from the reference restaurants.

## Deployment

`dist/` is the static production output. The selected Sites identity is in `.openai/hosting.json`. On other hosts, configure SPA fallback to `/index.html` for deep links. A Netlify-compatible `_redirects` is included; there is no backend. Private Sites access is preserved by default.

The WebGL vendor bundle is approximately 309 KB gzip and dynamically loaded. The initial hero photograph is approximately 283 KB. Browser validation is documented in `docs/QA.md`; no Lighthouse score or award is claimed.

## Project structure

```text
src/
  components/    Navigation, preloader, footer, motion preferences, shared UI
  data/          Typed dishes, navigation and restaurant-clock booking rules
  hooks/         GSAP orchestration and Lenis lifecycle
  pages/         Six page types, lazy-loaded after Home
  webgl/         Original GLSL and R3F scenes
  fonts.css      Self-hosted font subsets
  styles.css     Responsive art direction and accessibility modes
public/
  images/        Five original generated photographs + provenance
  fonts/         WOFF2 files + SIL OFL licenses
tests/           Booking-domain regression tests
docs/            Research, concept and QA record
```
