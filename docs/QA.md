# Verification record — 25 October 2026

## Executed

- TypeScript strict compilation and Vite production build passed.
- Seven booking-domain tests passed (`npm test`): restaurant timezone boundary, next open evening, closed days, valid evening, past dates/times, invalid dates/time slots, three-month cutoff.
- Browser inspection at 1440 × 900 and 375 × 812. All seven non-home page paths (including three dish variants) rendered at 375 px with document width exactly 375 and no broken completed images. Home was separately checked at both widths.
- Home WebGL photograph and the 3D ember rendered with two separate canvases; horizontal course track visibly changed its translation while scrolling through the pinned scene.
- Menu Sea filter returned only the halibut dish. Tasting mode revealed all six courses.
- Reservation UI rejected Monday 26 October 2026. A complete demo for Thursday 29 October, 19:30, four guests, chef's table, and fictional contact details showed the expected confirmation and note.
- Gallery next button moved from The room to The hearth; fullscreen dialog opened the correct image; Escape closed it.
- Fullscreen navigation was tested on mobile; explicit Shift+Tab wrapping moved from the first link to the last; Escape returned focus to the opener.
- Motion control set the reduced-motion mode. Home then contained zero canvases and no horizontal pinning, and remained usable at 375 px without overflow.
- Photos, typography, mobile gallery, desktop menu and pinned sequence were inspected visually.

## Corrections made during QA

- Delayed the hero title entrance until the introduction finishes.
- Corrected the custom photo shader's sRGB texture interpretation.
- Moved cursor tracking outside the pointer-transparent canvas so the visible interface remains clickable.
- Added input-event handling to keep native date controls synchronized in embedded browser environments.
- Added explicit dialog focus wrapping for embedded webviews.
- Replaced 668 KB of TTF fonts with approximately 109 KB of WOFF2 Latin/Latin Extended subsets.

## Limits

The browser tests use the available desktop embedded browser and emulated viewport sizes, not a physical device lab. No Lighthouse, cross-browser certification, field Core Web Vitals, or award eligibility is asserted. The lazy WebGL vendor chunk is approximately 309 KB gzip and triggers Vite's generic 500 KB uncompressed warning. It is separate from the main bundle and omitted when Home starts in reduced-motion mode. WebGL render errors leave accessible photography/static fallback available.

The project is a demonstration. Availability is illustrative; there is no reservation backend, payment flow, transactional email, analytics or third-party tracking. The user-facing result must not be described as a real confirmed reservation.
