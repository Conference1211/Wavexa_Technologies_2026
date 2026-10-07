# Wavexa Data Organization

The project now keeps reusable content in `src/data/` instead of scattering the same business information across page components.

## Data files

- `src/data/business.ts`
  - company name, email, phone and address
  - business navigation/services
  - industries
  - home-page services
  - reasons to choose Wavexa
  - expertise
  - technology stack

- `src/data/businessServices.ts`
  - Web Designing
  - Mobile App Development
  - Digital Marketing
  - service descriptions, statistics, feature cards and process steps

- `src/data/conference.ts`
  - conference identity/contact information
  - navigation
  - speakers
  - tracks
  - schedule
  - FAQ
  - tickets
  - abstract information
  - sponsors and other conference content

- `src/data/legal.ts`
  - Privacy Policy content
  - Terms & Conditions content

- `src/data/index.ts`
  - single entry point that re-exports the data modules

## How to update common information

For example, update the company phone in `src/data/business.ts`:

```ts
phone: "+91-NEW-NUMBER",
phoneRaw: "NEW-NUMBER",
```

Pages such as the business footer, contact page, floating contact buttons and conference contact data read from this central value.

## Important

The project still keeps UI/layout code inside page and component files. This is intentional: content/data is centralized, while presentation remains in the components so the project stays maintainable.

The existing routes are preserved; this reorganization does not change the page URLs.
