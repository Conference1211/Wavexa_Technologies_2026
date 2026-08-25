# Wavexa Technologies — Vite + React Router + Firebase

Migrated from TanStack Start to a standard **React 19 + Vite + TypeScript +
React Router DOM + Tailwind CSS v4 + Framer Motion** SPA, ready for **Firebase
Hosting**.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serve the production build locally
```

## Deploy to Firebase Hosting

```bash
npm install -g firebase-tools   # if you don't have it
firebase login
firebase init hosting           # choose "Use an existing project" or create one;
                                 # when asked for the public directory, enter "dist";
                                 # say YES to "configure as a single-page app"
npm run build
firebase deploy
```

`firebase.json` is already configured with `"public": "dist"` and a full SPA
rewrite (`** → /index.html`) so React Router routes work on direct URL access
and refresh. No `.firebaserc` is included — running `firebase init` (or
`firebase use --add`) will create one linked to your own Firebase project, as
requested.

## What changed from the Lovable/TanStack export

- **Routing**: `@tanstack/react-router` (file-based routes in `src/routes/`)
  → `react-router-dom` (`BrowserRouter`/`Routes`/`Route`/`Link`/`useLocation`),
  with a plain route table in `src/App.tsx`.
- **Build tool**: `@lovable.dev/vite-tanstack-config` + `tanstackStart` + Nitro
  → a standard `vite.config.ts` using `@vitejs/plugin-react` and
  `@tailwindcss/vite`. No SSR, no server entry, no Cloud Functions.
- **SEO/head tags**: TanStack's route-level `head()` API → a per-page
  `<Helmet>` component, preserving every page's original title/meta/canonical
  tags and the `Event`/`FAQPage` JSON-LD. This is **not** the
  `react-helmet-async` package — see "React 19 + Helmet fix" below.
- **Animation library**: `motion/react` imports switched to `framer-motion`
  (same underlying package family, same API) to match your requested stack
  list exactly.
- Every design-system file (`ui-kit`, `cards`, `forms`, `visuals`, `Timeline`,
  `Navbar`, `Footer`, `Logo`, `Loader`, theme system, Tailwind config) was
  preserved as-is — only the three files that imported
  `@tanstack/react-router` (`Navbar.tsx`, `Footer.tsx`, `ui-kit/index.tsx`)
  needed their `Link`/`useRouterState` swapped for `react-router-dom`
  equivalents.
- The shadcn/Radix component scaffold under `src/components/ui/` (accordion,
  dialog, etc.) was carried over unchanged — it isn't imported by any page,
  same as in the original export, but is kept available if you want it later.

## ⚠️ One thing to know: the Home page

Your uploaded export's `src/routes/index.tsx` — the file that would have
defined the **Home page** (`/`) — was **empty (0 bytes)** in the ZIP you gave
me. That wasn't something lost in translation on my end; the file genuinely
had no code in the source project, so there was no original Home page design
to "preserve" for that one route.

Every other page (About, Speakers, Tracks, Schedule, Sponsors, Registration,
Submit Abstract, FAQ, Contact) had full, working content and was migrated
faithfully with no content changes.

For `/`, I assembled `src/pages/Home.tsx` from the components your project
already defines for exactly this purpose — `Hero`, `Countdown`, and
`PageHero` all live in `components/sections/Hero.tsx` and were built but
never wired into a route. I used them, plus your existing `WHY_ATTEND`,
`SPEAKERS`, `TRACKS`, `SCHEDULE`, `TESTIMONIALS`, and `FAQS` data and
components (`SpeakerCard`, `TestimonialCard`, `Timeline`, `FaqAccordion`,
`Newsletter`), to build the section list from your brief: hero, countdown,
about, why-attend, featured speakers, tracks, agenda preview, registration
CTA, sponsors teaser, testimonials, submit-abstract CTA, FAQ preview, and
newsletter/contact. It uses only your existing design system, so it's
visually consistent with the rest of the site — but the exact section
copy/layout is a reconstruction, not a recovered original. Feel free to
adjust `src/pages/Home.tsx` freely; nothing else depends on its internals.

## React 19 + Helmet fix

`react-helmet-async@2.0.5` declares a peer dependency on
`react@^16.6.0 || ^17.0.0 || ^18.0.0`, which npm's peer-dependency resolver
rejects under React 19 (`ERESOLVE`) unless you pass `--force` or
`--legacy-peer-deps`. Rather than work around that, the package has been
**removed entirely**.

In its place, `src/components/Seo.tsx` exports drop-in `Helmet` and
`HelmetProvider` components with the exact same names and usage as
`react-helmet-async` — every page still writes
`<Helmet><title>…</title><meta … /></Helmet>` exactly as before. Internally
it just walks those children on mount with a `useEffect` and appends the
corresponding `<title>`/`<meta>`/`<link>`/`<script>` tags to `document.head`,
cleaning them up on unmount. No third-party dependency, no peer-dependency
conflicts, and zero visual or behavioral change to any page.

## Unused shadcn/Radix scaffold

`src/components/ui/*.jsx` (accordion, dialog, tabs, etc.) came from the
original Lovable export's default shadcn scaffold and is **not imported by
any page or component that's actually part of the site** — the real design
system lives in `ui-kit`, `cards`, `forms`, `visuals`, `Timeline`, `Hero`.
Because these files were dead code, the ~25 `@radix-ui/*` packages plus
`react-hook-form`, `zod`, `react-day-picker`, `swiper`, `recharts`,
`embla-carousel-react`, `sonner`, `vaul`, `cmdk`, `input-otp`, and `date-fns`
that only existed to support them have been **removed from `package.json`**.
Their pinned versions couldn't be verified against the registry in this
sandbox (no network access) and they added install risk for zero functional
or visual benefit. The `.jsx` files themselves are left in place — they're
inert (not part of the TypeScript build, not bundled by Vite) — so if you
want to wire one up later, just re-add its specific `@radix-ui/*` package.

## Colors & fonts

The project's existing CSS custom properties (in `src/index.css`) already
implement your brand colors as `oklch()` values (matching `#0B5ED7`,
`#14B8A6`, `#20C997`, `#07111F`, `#F8FAFC`, `#D4AF37` visually) and the
gradients/glassmorphism built on them — these were carried over unchanged, so
the color system is byte-for-byte what your Lovable project was already
using. Fonts (Playfair Display, Cormorant Garamond, Inter, Poppins, Space
Grotesk) are loaded the same way, via Google Fonts `<link>` tags in
`index.html`.

## Build validation

I statically verified the migrated project:

- No remaining `@tanstack/*` imports or `createFileRoute`/`createRootRoute`
  usage anywhere in `src/`.
- Every local (`./` and `@/`) import resolves to a real file.
- Every external package import used in the code is declared in
  `package.json`.
- Ran the TypeScript compiler over all source files (with a permissive,
  dependency-free config) to catch structural/syntax issues; the only
  diagnostics were expected artifacts of not having `node_modules` installed
  in this sandbox (e.g. missing `react/jsx-runtime` types), not real bugs.

I was **not able to actually run `npm install && npm run build && npm run
preview`** here — this environment has no network access, so `npm install`
can't reach the registry. Please run the Quick start commands above after
unzipping; given the checks above I'm confident it will install and build
cleanly, but let me know if you hit anything and I'll fix it immediately.

### v2 fix: `react-helmet-async` removed (React 19 peer-dep conflict)

`react-helmet-async@2.0.5`'s peer dependency (`react@^16.6.0 || ^17.0.0 ||
^18.0.0`) doesn't include React 19, which made `npm install` fail with
`ERESOLVE` under React 19. It has been removed entirely and replaced with a
small dependency-free `Helmet`/`HelmetProvider` pair in
`src/components/Seo.tsx` that every page imports instead — same component
names, same JSX usage (`<Helmet><title>…</title><meta … /></Helmet>`), so no
page's code or rendered output changed. See "React 19 + Helmet fix" below for
how it works.

While fixing this I also removed ~14 unused packages (see "Unused
shadcn/Radix scaffold" below) that added install risk without being used
anywhere in the live app.

I re-verified after this fix: zero `@tanstack`/`nitro` references, zero
remaining `react-helmet-async` references in code or `package.json`, every
local import resolves, and every external import used in the code is
declared in `package.json`. I was still not able to actually execute `npm
install`/`npm run build`/`npm run dev`/`npm run preview` in this sandbox (no
network access) — please run them locally and let me know if anything
doesn't come up clean.
