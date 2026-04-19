# dykespower.com — Feels Like a Ferris build

Casey Dykes, Dykes Motors Power Equipment
Collins, Mississippi
April 18, 2026

## What we're doing

We're overhauling dykespower.com to lean into the new Ferris national campaign, "Feels Like a Ferris." Ferris went live with the campaign on Friday. Gregory Nielsen, our Ferris territory rep, sent the assets over that afternoon, and Michael forwarded them to me. The package includes 15- and 30-second video spots, lifestyle photography, digital ad creatives, and a co-brand wordmark.

The site today does the job but reads flat. It's a functional dealer page with lot photos and a spec sheet. We want it to feel like something a real commercial mower buyer would stop and watch.

Important point up front: this is still a Dykes Motors website. dykespower.com is an extension of our business, not a separate brand. Whoever lands on it needs to know within a few seconds that they're on Dykes property and that we proudly carry Ferris. Our black-and-white theme and the DF logo set the frame. The Ferris campaign content fills the frame.

## How Dykes and Ferris coexist on the site

Dykes is the host. Ferris is the featured line we sell. Think about how an Apple reseller's store works: the reseller's name is on the door and business cards, and Apple's marketing covers the shelves. That's the relationship we're building digitally here.

A few rules fall out of that:

The DF logo stays exactly where it is. Top-left in the header, centered in the footer. We don't shrink it to make room for Ferris marks.

The "DYKES MOTORS Power Equipment" wordmark also stays in the header, right next to the DF logo, same as today.

Our overall palette is black and white with neutral grays, same as dykesmotors.com. Ferris yellow shows up as an accent only — small badges, a stat-tile top border, a hover state here and there. Yellow never becomes a section background or a primary button fill.

The Ferris logo appears where it makes sense (the "we carry Ferris" moments), but it stays visually subordinate to the Dykes lockup wherever both show up.

"Feels Like a Ferris" is Ferris's tagline, not ours. When it shows up on the site, it's attributed to the campaign — something like "Ferris calls it Feels Like a Ferris. We call it the real deal." It never serves as our hero headline.

The hero headline is written in our voice. Mississippi, family-built, plain. The Ferris campaign video plays in the background as atmosphere; the Ferris campaign badge appears small in a corner; but the main line belongs to Dykes.

A quick gut-check for any section: if someone who already knows Dykes Motors looked at it, would they recognize it as a Dykes property before they recognized it as Ferris marketing? If not, it needs reworking.

## What's already live — do not break

Before touching anything, you need to know what's already running on dykespower.com. This is the stuff that's been set up over weeks of work, and some of it is tied to ad spend and recovery work in progress. A careless change here costs real money.

**Meta Pixel is already installed.** Pixel ID `1199932965362268`. Verified by fetching dykespower.com — the noscript fallback image is visible in the HTML on every page. Do not install a second pixel. Do not swap the ID. This pixel is separate from the Meta Pixel on dykesmotors.com (`1533582374610733`) on purpose so mower attribution doesn't mix with truck attribution.

**Google Ads conversion tracking is working.** It lives in `app/contact/page.tsx` and was recently corrected. Do not modify the `send_to` value. The Google Ads account (299-562-7949, under Dykes Holdings manager 347-450-7962) is still mid-recovery from a March suspension, so we're being extra careful with anything that touches conversion signals.

**Google Merchant Center** (account 5679168617) had a URL claim issue for dykesmotors.com in March. That's a separate recovery workstream and is not within this project's scope. Do not make any changes that could affect the dykespower.com URL structure, meta tags, or canonical URLs — any of those could create a ripple into Merchant Center or Google Business Profile listings.

**Google Business Profile** for Dykes Motors is tied to the physical Collins location. The NAP data (name, address, phone) on the site needs to match what's in GBP exactly. Don't change the address format, the phone number, or the business name anywhere on the site. The existing footer has it correct: 3069 Hwy 49, Collins, MS 39428, (601) 641-5475.

**Monthly payment pricing is already live** on the Popular Models cards — `$141/mo`, `$227/mo`, `$208/mo` formatted the way I wanted from the Meta glasses screenshots. Preserve that format. If the design changes the card layout, carry the monthly pricing through to the new cards; don't drop it.

**The DF logo** and **"DYKES MOTORS Power Equipment" wordmark** are already in the header top-left and the footer. Don't replace them. Don't regenerate them with SVG or code. The DF logo specifically — white cross integrated with bold DF letters on black — is the family mark and it's non-negotiable.

**Vercel deployment** is linked to GitHub. Every merged PR triggers a production deploy. Vercel preview deploys run on every PR, which is how I'll review before merging.

Before any code changes, grep the repo for existing tracking integrations. Print what you find in plain English. Details in the Analytics section below.

## Assets: what we have and what we still need

**Product photography is already handled.** Claude Code pulled the Ferris studio beauty shots in a prior session. They're in the repo. Confirm they cover every model in the catalog before building the Popular Models grid.

**What still needs to come in:**

Videos from the Feels Like a Ferris portal. The 15-second spots for hero background use, the 30-second spot for the film section, and any suspension-detail loops if available.

Lifestyle photography. The "day of work" feel — dawn crews, big properties, suspension in action. Some of this may live in the bascodigital.com library under outdoor photography.

Brand assets. The "Feels Like a Ferris" wordmark (SVG preferred), the campaign typography if it's licensed for web, color specs.

Advertising templates from The Power Portal. Not blocking for the homepage, but useful when we get to the about and service pages.

**Where the assets live:**

- feelslikeaferris.com/assets — the campaign page Ferris just launched
- bascomarketing.com/na/en_us/ferris/advertising-media/product-photos.html — a public signpost that routes to the dealer portal
- bascodigital.com/c/iqzdupwu — my personalized dealer portal (studio + outdoor photography)
- thepowerportal.com/nA/English/Ferris/SalesMarketing/AdvertisingMaterials.htm — the Briggs & Stratton Power Portal (login required)

Every one of these is either gated by login or blocked by robots.txt. Claude Code will hit the same walls I did trying to pull them. The reliable path is that I export ZIPs from each portal on my end (fifteen-minute job if I'm already logged in) and drop them in a local `/incoming-assets/` directory outside the repo. Add that directory to `.gitignore`. If Claude Code wants to try Playwright with stored credentials it can, but that's the backup plan, not the default.

## Where files land in the repo

```
/public/
├── videos/
│   └── ferris/
│       ├── campaign/
│       │   ├── hero-30s.mp4          # 30-sec spot, H.264, under 8MB
│       │   ├── hero-30s.webm         # VP9 fallback
│       │   ├── hero-30s-poster.jpg   # first frame, 1920x1080
│       │   ├── hero-15s.mp4          # 15-sec loop for hero background
│       │   ├── hero-15s.webm
│       │   ├── hero-15s-poster.jpg
│       │   └── hero-15s-mobile.mp4   # 720p crop for mobile, under 3MB
│       └── product/
│           └── (per-model demo loops if the portal has them)
├── images/
│   └── ferris/
│       ├── campaign/
│       │   ├── lifestyle-1.jpg ... lifestyle-N.jpg
│       │   ├── lifestyle-1.webp ... (generated)
│       │   └── lifestyle-1-mobile.webp ...
│       ├── products/
│       │   ├── is600-beauty.jpg
│       │   ├── isx2200-beauty.jpg
│       │   ├── srsz3-beauty.jpg
│       │   └── (one per model in the catalog)
│       ├── brand/
│       │   ├── feels-like-a-ferris-logo.svg
│       │   ├── feels-like-a-ferris-logo-white.svg
│       │   ├── ferris-logo.svg
│       │   └── ferris-logo-white.svg
│       └── lot/
│           └── (the existing lot photos stay put)
```

Don't delete anything in `/public/images/ferris/lot/`. Those are real photos of our actual lot in Collins. They prove we have the machines on the ground, and they belong in the Dealer Story section.

## Image and video handling

For images, convert JPG and PNG to WebP alongside the originals. Next.js Image serves the right format automatically. Generate a 640px-wide mobile variant for every lifestyle shot. Strip EXIF on the way through. Handle it with sharp in a script so the pipeline is repeatable. An `npm run optimize-images` command in package.json is fine.

For video, ffmpeg is the tool. If it's not on the shell, install it (`brew install ffmpeg` on macOS, `sudo apt-get install -y ffmpeg` on Linux, or `@ffmpeg-installer/ffmpeg` as a last resort).

H.264 baseline profile for the MP4:
```
ffmpeg -i input.mp4 -c:v libx264 -profile:v baseline -level 4.0 -pix_fmt yuv420p -movflags +faststart -crf 23 output.mp4
```

VP9 for the WebM:
```
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 output.webm
```

Poster frame at t=0.5s:
```
ffmpeg -i input.mp4 -ss 00:00:00.500 -vframes 1 -q:v 2 poster.jpg
```

Hero loop targets: under 3 MB mobile, under 8 MB desktop. Trim to fifteen seconds exactly with `-t 15` if the source runs long.

For the 30-second film embed, run this decision tree:

If the encoded file lands under 10 MB, serve it from `/public/videos/ferris/campaign/`.

If it's over 10 MB and I've provisioned Mux credentials, upload to Mux and embed with `@mux/mux-player-react`.

Otherwise, upload as an unlisted video on the Dykes Motors YouTube account and embed via `youtube-nocookie.com`. Check with me before uploading to YouTube so we use the right channel.

## Homepage walkthrough

I'll walk through each section in the order the customer will see it.

### Hero

This is the three-second impression. Full-bleed fifteen-second video loop from the campaign in the background, muted, autoplaying, looping, playing inline (that last attribute is required for iOS). A dark gradient runs over it — darker at top and bottom than in the middle, since our overlay text is white and needs contrast against the video motion.

Top-left, unchanged from today, the DF logo sits next to the "DYKES MOTORS Power Equipment" wordmark in white. Top-right, the phone number with click-to-call. The main headline, in white Oswald 700 (or whatever display face the existing Dykes sites use if one's already in play):

> **Built for Mississippi Acres.**
> **Backed by Dykes Motors.**

The sub-headline sits below, smaller and lighter: *Authorized Ferris® Dealer · Collins, Mississippi.*

Lower-left, a small treatment acknowledges the campaign without taking over:
*Now carrying the new Ferris® national campaign:*
**Feels Like a Ferris.** ▸ Watch the Film

That "Watch the Film" link scrolls to the 30-second spot further down the page.

The primary CTA button — Shop the Lineup — is white-filled with black text. Not Ferris yellow. That keeps the main call-to-action in the Dykes voice. The secondary link — Watch the Film — is a simple outlined white link, same hover behavior.

For mobile, use `hero-15s-mobile.mp4`, stack the CTAs full-width, and stack the campaign badge below the subtitle. Everything that animates respects `prefers-reduced-motion`: if the user has that set, the hero drops to a static poster frame.

Tech notes: native `<video>` element, no library. Poster image for first paint. Everything below the hero lazy-hydrates using `next/dynamic` where it makes sense.

### Why we carry Ferris

Directly below the hero. The headline is first-person plural, not a marketing line:

> **Why We Carry Ferris.**

On the left, a short paragraph in my voice:

> We've spent years in Collins picking the lines we'll put our name behind. Ferris invented the suspension mower — independent shocks on all four corners — and nobody else comes close. That's why every commercial crew we sell to goes home on a Ferris.
> *— Casey Dykes*

On the right, a short silent video loop of suspension flexing through rough terrain. The portal usually labels this clip something like "suspension detail" or "suspension hero." If the loop isn't available, a high-quality still works fine.

Below that, three stat tiles with count-up animations on scroll. Dark-gray tile backgrounds with a thin Ferris-yellow top border as the accent:

- 73% — reduction in whole-body vibration
- 4-wheel — independent suspension
- 0 — compromise on cut quality

A small attribution line underneath: *Statistics from Ferris Commercial Mowers R&D.*

### Popular models

Keep the three-card layout we have today. Swap the lot photos for the official Ferris beauty shots that are already in the repo. On desktop, add a hover interaction — three seconds of silent video playing on hover, if a per-model loop exists for that unit.

Add two badges to the cards. "In Stock in Collins" for units physically on the lot, "Available to Order" for factory-delivery units. Financing line under the price formatted the way I showed you from the Meta glasses screenshots: monthly payment next to the total.

Card style is rounded corners, a subtle shadow, a small lift and brightness increase on hover.

### Feels like a day of work

A lifestyle gallery that goes between Popular Models and Why Ferris, though we'll rearrange if the flow feels off in preview.

Six images in a responsive mosaic — three columns on desktop, two on tablet, one stacked on mobile. Each image gets a one-line caption in our voice:

- *Dawn patrol. Forty acres before the coffee cools.*
- *Crew ready. Trailer loaded. Another day on the Ferris.*
- *Suspension on. Body aches off.*
- *Big property. Small problem.*

Write two more in that same tone — short, Southern, proud of the work. Clicking an image opens a lightbox with the full-size shot and a longer caption.

### Why Ferris

The existing bullet list stays but gets a visual partner. Grid layout on desktop: the six bullets on the left, a collage of in-action photos on the right. The CTA at the bottom changes from "Shop the Lineup" to **Find Your Ferris →** and points to the quiz.

### Your Property (mow-time calculator)

This is the feature that separates us from every other Ferris dealer site. Insert it between Why Ferris and Watch the Film.

The user types their property address. Google Places Autocomplete restricts suggestions to US addresses. On submit, the Google Maps Static API renders a satellite view of their property.

Best-case flow: they draw a polygon around their actual mow area using the Google Maps Drawing Library. We calculate the enclosed area with `google.maps.geometry.spherical.computeArea()`, convert from square meters to acres, and show per-model mow-time estimates.

Fallback if polygon-drawing feels like too much friction: a slider or number input for acreage, and we run the same calculation.

The mow-time formula is the standard landscaping-industry one:

```
acres_per_hour = (speed_mph × deck_width_inches × overlap_efficiency) / 100
hours = property_acres / acres_per_hour
```

Store the per-model constants (deck width in inches, typical mow speed in mph, overlap efficiency) in `/lib/mow-calculator/ferris-specs.ts` so we can tune them later without changing the component.

Quick sanity check: a 52-inch deck at 6 mph with 80% efficiency gives `(6 × 52 × 0.80) / 100 = 2.5 acres/hour`. For a 5-acre property, that's two hours flat. That tracks with what commercial crews actually experience.

Output reads: *Your property is approximately X acres. Here's how long each Ferris model would take:* followed by the model lineup and hours. A CTA underneath reads **See these mowers in Collins →** and scrolls to the Popular Models grid.

A short privacy line sits next to the address input: *We use your address only to estimate mow time. We don't save it or share it.* Don't write the address to localStorage unless the user explicitly checks a "Remember my property" box.

Fire a GA4 custom event called `mow_calculator_submit` with `acres` and `top_recommended_model` as parameters. That's a high-intent signal worth tracking.

If the Google Maps API key isn't provisioned by the time Claude Code gets here, ship the slider-only version and leave a TODO. Don't block the whole project on one API key.

### Feel the difference (suspension comparison)

A draggable before/after slider that shows the same terrain mowed with a Ferris versus a rigid-frame competitor. Two synchronized video loops sit side by side, muted. The user drags a vertical divider left or right to see more of one side or the other. The `react-compare-slider` library works for this if you feed it video children.

Caption underneath: *Same hill. Same mower speed. Your spine can tell the difference.*

If only one side of the comparison is available in the portal, swap to two side-by-side stills — still effective, less wow.

### Watch the film

Full-width section dedicated to Ferris's 30-second national spot. Frame it as their campaign, not ours:

Eyebrow label above the player, small-caps in light gray: *FERRIS® NATIONAL CAMPAIGN*

Section headline: **Feels Like a Ferris.** — this is the tagline's proper home on the page.

Attribution line beneath: *Campaign by Ferris Commercial Mowers · Proudly shown by Dykes Motors*

Embed the video with a large play button overlay and the poster frame from the campaign. When the film ends, an overlay CTA appears: **Come feel it in Collins.** → scrolls to the contact form or opens a contact modal.

### The dealer story

This is the humanization moment and it matters more than any other section on the page.

Split layout. A photo on the left, story on the right. Headline:

> **Family Built. Family Backed.**

Body copy (this is a draft — review before deploy):

> Dykes Motors has been selling trucks out of Collins, Mississippi for years. Power Equipment is the new chapter. Same family, same handshake, same phone-answered-by-a-human promise. We carry the full Ferris lineup because when you're running a crew in Mississippi heat, your mower needs to work as hard as you do. That's the Ferris promise. And ours.

Address block below: 3069 Hwy 49, Collins, MS · Mon–Fri 9–6, Sat 9–2. CTA: **Come See Us** → Google Maps link.

Photo logic: first check for a team photo at `/public/images/team/`. If nothing's there yet, use the widest existing lot photo with a small translucent DF-logo overlay in the bottom-right. Drop a code comment — `// TODO: replace with team photo once shot` — so we remember to swap it when we get a proper team picture taken.

### Mower tips & guides

The existing three-blog-post grid stays. Add a subtle hover animation to the cards, style the "View All Posts →" link consistently with other section CTAs, and if any thumbnails are placeholders, swap them for Ferris lifestyle imagery.

### Quiz CTA

Wrap in a full-width Dykes-black section with white text. Not Ferris yellow. The quiz button goes oversized, white fill with black text. A small Ferris logo and an eyebrow line — *Find the right Ferris for your property* — sit above the headline to establish the co-brand without taking it over. A mini-preview of a quiz question underneath gives the user a sense of what they're walking into.

### Footer

The footer stays structurally the same. Same columns, same content blocks. The background watermark is the "DYKES MOTORS" wordmark oversized behind everything — not the Ferris tagline. DF logo prominent. Below a small horizontal rule, one line of co-brand text: *Proudly an Authorized Ferris® Dealer. Participating in the "Feels Like a Ferris" national campaign.* A small Ferris logo sits to the right of that line, visually subordinate to the Dykes identity above.

Add Facebook as a social icon (it's our primary social channel) linking to the Dykes Motors page. Next to the copyright, a small line: *Built in Mississippi. Backed by Dykes.*

### Sticky mobile CTA

On mobile only, a bottom bar appears after the user scrolls past the hero. Left side: phone icon with "Call." Right side: "Shop Mowers" button. An X dismisses it for the session.

### Ambient engine sound (optional)

A small speaker icon in the top-right corner of the hero. Defaults to off. If the user clicks it, the hero video's audio fades in over about a second at 60% volume. `localStorage` remembers the choice.

This only goes in if the campaign video's audio track is appropriate — engine sounds or ambient work sounds. If the audio is dialogue or licensed music, skip the feature. Nobody expects dealer-site audio to autoplay, and the point of this toggle is to reward the curious user.

## Secondary pages

### /catalog

Replace placeholder thumbnails with the Ferris beauty shots. Add a full-width hero banner — a single lifestyle image from the campaign with a headline reading "The Full Lineup." Filters stay functional but get restyled to match the new look.

### /product/[id]

Above the gallery, add a model-specific video loop if one exists. Add a small "Feels Like a Ferris" sash in the corner of the primary product image. Add an inline financing calculator with a monthly-payment slider.

### /about

Rebuild around the Family Built, Family Backed story. Team photos if we have them, the Dykes Motors → Dykes Power timeline, and an Authorized Ferris Dealer badge.

### /service

Keep all the functional content (service hours, what we work on, contact info). Add one lifestyle photo from the campaign. If the 24-Hour Parts Guarantee program applies to us, add a callout for it.

### /contact

Leave the form alone. That's conversion-critical and the Google Ads tracking in `app/contact/page.tsx` is already working correctly — do not modify the `send_to` value on the conversion event. After any layout change to the page, submit the form in dev and check the Network tab to confirm the event still fires.

Add a hero image from the campaign, a Google Map embed, and a "What to expect" section that walks through the lead flow: *Form submitted → we call within 1 business hour → you get a quote → demo scheduled if you want.*

## Hyper-local voice

For every new piece of copy across the site, write like we're in Collins — because we are. Some examples that make the point:

"Commercial-grade mowers for every property" becomes "Built for Mississippi acres, pine straw, and July heat."

"Authorized Dealer" becomes "The only authorized Ferris dealer between Jackson and the Gulf."

"Contact us today" becomes "Call Casey in Collins: (601) 641-5475."

"We offer financing" becomes "Local financing from folks who know you."

Apply this to the hero subhead, the Why Ferris bullets, the quiz CTA and results, lifestyle gallery captions, the Dealer Story section, and the footer. Existing blog copy stays as-is.

## Colors

Tailwind palette:

```js
colors: {
  dykes: {
    black: '#0A0A0A',
    white: '#FFFFFF',
    offWhite: '#F5F5F4',
    gray: {
      100: '#E7E5E4',
      300: '#A8A29E',
      500: '#57534E',
      700: '#292524',
      900: '#1C1917',
    },
  },
  ferris: {
    yellow: '#FDB913',
    yellowDark: '#E5A310',
  },
}
```

That `#FDB913` is a starting value. Sample the exact yellow from the downloaded Ferris logo and update the config if it comes back different:

```js
// scripts/extract-brand-color.mjs
import sharp from 'sharp';
const { data, info } = await sharp('public/images/ferris/brand/ferris-logo.png')
  .raw()
  .toBuffer({ resolveWithObject: true });
// sample a pixel known to be yellow in the wordmark, log the hex, update tailwind.config.ts
```

Where yellow is allowed: the top border on the three stat tiles in Why We Carry Ferris, the small Ferris campaign badge in the hero, hover states on Watch the Film links, the Ferris logo itself (left as factory spec), and a brief highlight when the mow-time calculator returns a result.

Where yellow is not allowed: primary CTA button fills (those are white or black), section backgrounds (those are Dykes black, white, or off-white), headlines, body copy, or anywhere in the footer.

If dykesmotors.com uses a specific off-white or gray that differs from the defaults here, sample those values and use them instead. The dykespower.com theme needs to feel visually continuous with dykesmotors.com.

## Typography

For display headlines, use the Ferris campaign wordmark as an SVG image whenever the exact tagline appears — custom letterforms are common for campaign logos and there's no typeface that'll match cleanly. For other large display copy (hero headline, section heads), default to Oswald 700 or Barlow Condensed 800. Both read rugged and match commercial-equipment marketing better than a cleaner tech sans-serif.

Body copy in Inter 400 and 500. If the site already uses a different body face, keep it.

Load Google Fonts through `next/font/google` with `display: 'swap'` and Latin subset only. Skip the `<link>`-tag approach — it bypasses Next.js's font optimization.

No third typeface family. Display plus body, that's it.

```ts
// app/fonts.ts
import { Oswald, Inter } from 'next/font/google';
export const oswald = Oswald({ subsets: ['latin'], weight: ['700'], variable: '--font-display' });
export const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
```

## Motion

Install `framer-motion` if it's not in package.json already. Use it sparingly — scroll reveals, hover transitions, the count-ups on stat tiles. Not every section needs animation.

Import specific components only, never the whole namespace. All animated components need the `'use client'` directive. Use the `useReducedMotion()` hook to bypass transforms and fades when the user has `prefers-reduced-motion: reduce` set at the OS level. The hero video autoplay should also gate on that same check.

## Performance

These are hard requirements, not nice-to-haves:

Mobile Lighthouse Performance of 85 or better. Measure baseline before starting work so we can see the delta in the PR.

LCP under 2.5 seconds on the Moto G4 / Slow 4G throttle profile.

CLS under 0.1. The video hero needs an explicit aspect ratio so layout doesn't shift when the video loads.

Total hero payload under 2 MB on mobile. The video streams after the first frame, not all at once.

## Accessibility

Every video gets an `aria-label` describing its content. The hero video falls back to a poster image on `prefers-reduced-motion`. Every interactive element works with keyboard navigation. Text contrast hits WCAG AA. If the 30-second film has a captions file in the portal, pull it in; if not, flag it and we'll decide whether to caption it ourselves before launch.

## SEO

Don't change the URL structure. Preserve every existing meta tag, canonical URL, and structured-data block. Add video schema for the hero video (name, description, thumbnailUrl, uploadDate, duration, contentUrl) and a LocalBusiness block for the homepage — inject it as JSON-LD in the root layout:

```json
{
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Dykes Motors Power Equipment",
  "image": "https://www.dykespower.com/df-logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3069 Hwy 49 North",
    "addressLocality": "Collins",
    "addressRegion": "MS",
    "postalCode": "39428",
    "addressCountry": "US"
  },
  "telephone": "+1-601-641-5475",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "14:00" }
  ],
  "url": "https://www.dykespower.com",
  "priceRange": "$$"
}
```

Leave sitemap.xml alone.

## Analytics

The Meta Pixel is already installed on dykespower.com. Pixel ID is `1199932965362268`. It loads on every page via the existing root layout — the `noscript` fallback image is visible in the HTML when the site is fetched. Do not add a second pixel. Do not swap it for a different ID.

The pixel on dykesmotors.com is `1533582374610733`. That's a separate pixel for the auto dealership business and it stays where it is. The two sites have their own pixels on purpose so attribution for mowers and attribution for trucks don't get mixed together.

When we add custom events in the new components (calculator submission, watch-the-film click, sound toggle, sticky CTA taps), fire them through the existing `1199932965362268` pixel using `fbq('trackCustom', ...)`. Before implementing, open the existing pixel integration in the repo and copy the same pattern already in use.

Google Ads conversion tracking on `/contact` was recently fixed and is working. Do not modify the `send_to` value in `app/contact/page.tsx`. After any layout change to that page, submit the form in dev and confirm the conversion event fires in the Network tab — look for a request to `googleadservices.com` or `google.com/pagead/conversion`.

Video-engagement tracking on the 30-second film: fire custom events at 25%, 50%, 75%, and 100% playback through the existing pixel. Use the `timeupdate` event on the native video element, or Mux Player's built-in analytics if that's the hosting path.

Other custom events to add through the same existing pixel:

- `clicked_watch_film` on the Watch the Film CTA tap
- `mow_calculator_submit` when the calculator returns a result, with `acres` and `top_model` parameters
- `sound_toggle_on` when the ambient audio is enabled
- `sticky_mobile_cta_call` and `sticky_mobile_cta_shop` on the sticky bar interactions

If Google Analytics 4 or Google Tag Manager is present in the repo, fire the same events there too. If neither is present, don't add them — that's a separate decision for another day.

### Pre-flight verification (run before any code changes)

Before the build starts, Claude Code should grep the repo and list every tracking tag, pixel, and analytics script already present. Minimum checks:

- `grep -r "fbq(" app/ components/ lib/` — find Meta Pixel integration points
- `grep -r "gtag(" app/ components/ lib/` — find Google Ads / GA4 integration points
- `grep -r "1199932965362268" .` — confirm the Meta Pixel ID matches the live site
- `grep -r "googletagmanager" .` — check for GTM container
- `grep -r "google-analytics" .` — check for direct GA snippets
- Check `app/layout.tsx` and any wrapper components for `<Script>` tags

Print the findings in plain English before making any changes. If the live pixel ID on the site doesn't match what's in the repo, stop and flag it — that would mean someone edited the deployed output outside the repo or there's a config mismatch.

## Browser support

Latest two versions of Chrome, Edge, Firefox, and Safari. iOS Safari 15 and up. Android Chrome 100 and up. IE isn't supported.

## Order of operations

This is the order Claude Code should work in. Don't parallelize.

Measure the starting state first. Run the site locally, grab a Lighthouse score on the homepage, screenshot the current hero, catalog, and product detail pages. Save those to `/docs/baseline/` so we have real before/after data for the PR.

Check out a new branch: `feat/feels-like-a-ferris-campaign-integration`.

Run the pre-flight verification described in the Analytics section. Grep the repo for every tracking tag and pixel. Confirm the Meta Pixel ID in the repo matches the live site (`1199932965362268`). Confirm the Google Ads conversion tag is still intact in `app/contact/page.tsx`. Print a plain-English summary before making any changes.

Inventory what's already in the repo. The product images Claude Code pulled in a previous session need to be located and checked against the catalog — make sure every model has a beauty shot available. Log any gaps.

Install dependencies that aren't already in package.json: framer-motion, sharp, `@mux/mux-player-react` if Mux is in play, `@turf/area` if the polygon fallback needs it.

Acquire the missing assets per the asset checklist above. If portals block access, halt and ask me to export ZIPs to `/incoming-assets/`. Add that folder to .gitignore so raw downloads never get committed.

Organize files per the tree above. Leave `/public/images/ferris/lot/*.jpg` alone — those stay.

Run the image and video optimization scripts. If the hero video can't hit the size budget at CRF 23, re-encode at a lower CRF until it fits.

Sample the Ferris yellow from the downloaded logo and update `tailwind.config.ts`.

Set up the fonts via `next/font/google`.

Build each new component in isolation on a `/preview/...` route. That way every component gets a visual check before it lands in the actual page.

Rebuild the homepage section by section in the order I walked through above. Commit each section separately with a conventional commit message (for example `feat(homepage): add video hero with reduced-motion fallback`). Small commits make the PR easier to review.

Inject the LocalBusiness schema into the root layout. Use the NAP data exactly as it already appears on the site — do not introduce new formatting.

Update the secondary pages — catalog, product detail, about, service, contact. After the contact page changes, submit the form in dev and confirm the Google Ads conversion still fires. Look for the network request to `googleadservices.com` or `google.com/pagead/conversion`.

Run Lighthouse locally on mobile throttle. If any Core Web Vital slips, iterate until they're all green again. Don't move on with a regression in place.

Test on a real phone, both iOS Safari and Android Chrome. Specifically: video autoplay muted inline, CLS on slow network, sticky CTA behavior, the suspension-comparison slider on touch, and the sound toggle.

Open a PR against `main` with before/after screenshots, the Lighthouse score delta, a checklist against the acceptance criteria below, and the Vercel preview link.

Do not merge. I review the Vercel preview, approve, and merge manually.

### When to stop and ask me

Stop and ping me at any of these moments:

- A portal blocks access and I haven't provisioned credentials yet. Wait for ZIP exports.
- The pre-flight grep turns up a Meta Pixel ID in the repo that doesn't match `1199932965362268` on the live site. Confirm before doing anything.
- The Google Ads conversion tag in `app/contact/page.tsx` is already different from what my notes describe. Confirm before touching it.
- The sampled Ferris yellow differs noticeably from `#FDB913`. Confirm the new hex before shipping.
- The 30-second film is over 10 MB and no hosting decision has been made.
- Lighthouse regresses by more than 10 points and can't be recovered without cutting a feature. Ask which feature to drop.
- Any downloaded asset looks watermarked, low-resolution, or otherwise not production-ready.

## What "done" looks like

Brand hierarchy:

- [ ] DF logo appears in the header top-left on every page, at current size or larger
- [ ] "DYKES MOTORS Power Equipment" wordmark appears in the header on every page
- [ ] DF logo appears in the footer on every page
- [ ] No section on the homepage uses Ferris yellow as a background fill
- [ ] Primary CTAs are white-on-black or black-on-white, not yellow
- [ ] "Feels Like a Ferris" never appears as a hero headline — only as an attributed campaign reference
- [ ] The hero headline is written in Dykes voice, not Ferris voice
- [ ] "Proudly an Authorized Ferris® Dealer" language appears in at least three places on the site
- [ ] The Ferris logo is visually subordinate to the Dykes lockup wherever both appear

Campaign integration:

- [ ] Hero video autoplays on iOS Safari (muted, inline)
- [ ] Hero video falls back to poster on `prefers-reduced-motion`
- [ ] All three Popular Model cards use official Ferris beauty shots
- [ ] 30-second campaign spot embedded and plays with sound when clicked, attributed to Ferris
- [ ] Lifestyle gallery shows at least six campaign photos with captions in Dykes voice

Unique features:

- [ ] "Your Property" mow-time calculator accepts an address and returns per-model estimates
- [ ] Interactive suspension comparison slider works on desktop and mobile touch
- [ ] All new microcopy reflects the Mississippi hyper-local voice
- [ ] Ambient engine sound toggle exists and defaults to OFF (or is skipped if campaign audio isn't suitable)
- [ ] Mobile sticky CTA appears on scroll and dismisses with X

Technical:

- [ ] Existing Meta Pixel (1199932965362268) continues to fire on every page load — not replaced, not duplicated
- [ ] All new custom events route through the existing pixel via `fbq('trackCustom', ...)`
- [ ] Google Ads conversion tracking still fires on `/contact` form submit (verify with Network tab)
- [ ] `send_to` value in `app/contact/page.tsx` was not modified
- [ ] NAP data (3069 Hwy 49, Collins, MS 39428, 601-641-5475) is unchanged site-wide
- [ ] URL structure unchanged, meta tags preserved, canonical URLs preserved
- [ ] Lighthouse Performance at 85 or better on mobile
- [ ] LCP under 2.5s on Moto G4 / Slow 4G
- [ ] No regressions on existing URLs (every internal link still resolves)
- [ ] All new imagery has a WebP variant
- [ ] PR opened, not merged

## What to leave alone

Don't rebuild the CMS, blog engine, or commerce layer. Don't change the domain, hosting, or DNS. Don't remove any existing legal pages — privacy, terms, shipping and returns all stay. Don't change the catalog data source or the inventory sync. Don't touch dykesmotors.com; that's a separate project on Dealer Car Search.

Don't touch the Meta Pixel. It's already installed, working, and feeding the existing Ads account. If you need to add custom events, use the existing pixel ID `1199932965362268` via `fbq('trackCustom', ...)`. Don't install a second pixel.

Don't touch the Google Ads conversion tag in `app/contact/page.tsx`. The `send_to` value was recently fixed and the account is still in recovery. Leave it alone.

Don't change the NAP data — name, address, phone — anywhere on the site. Google Business Profile and Merchant Center both depend on that data staying consistent.

Don't change URL structure, meta tags, or canonical URLs. Those feed into search ranking signals and any churn there sets us back.

Don't send any emails on my behalf. That's a hard rule across everything we build.

Don't modify any GitHub Actions workflows. The SEO content engine and the daily blog email engine are their own systems.

Don't auto-post anything to Facebook. The Smart Post System handles inventory posts, and nothing posts without my explicit approval.

## Open questions

A few decisions I haven't made yet. If I don't answer by the time Claude Code gets here, use the default listed and keep moving.

1. Ferris brand color. Default: `#FDB913`. Actual value comes from sampling the downloaded logo.

2. Campaign typeface. Default: use the Feels Like a Ferris wordmark as an SVG image, use Oswald 700 for other display copy. If the campaign package includes a licensed display font for web use, flag it to me.

3. Team photo for the Dealer Story. Default: use the widest existing lot photo with a translucent DF-logo overlay. Leave a `// TODO: team photo` comment. I'll get a proper one shot later.

4. 30-second film hosting. Default: under 10 MB, serve from `/public`; over 10 MB, upload as unlisted to the Dykes Motors YouTube and embed with `youtube-nocookie.com`. Only use Mux if I've provisioned credentials.

5. Testimonials. Default: skip for v1. We'll add them once I've collected three or more real customer quotes.

6. Google Maps Platform API key. Required for the Your Property calculator. Check whether a key already exists on the Google Cloud billing account tied to Google Ads account 299-562-7949. If not, provision a new one restricted to `dykespower.com`. The free tier covers our expected traffic. Proceed with provisioning unless I say otherwise.

7. Parcel-acreage source. Default: offer the polygon-drawing UI first (Google Maps Drawing Library), manual acreage slider as fallback. Skip Regrid for v1 — one API dependency is enough.

## Rollback

If anything goes wrong after deploy, Vercel does a one-click rollback to the previous deployment. There are no database migrations in this project so rollback is clean. Keep the pre-change homepage component in a `/legacy` folder for 30 days as a safety net in case we need to revert one section without rolling back the whole site.

## Starting the work

When I say go, paste this into Claude Code terminal:

> Read this doc top to bottom before touching any code. The "How Dykes and Ferris coexist" section and the Colors section are the brand rules — if anything you design starts leaning toward "Ferris microsite" instead of "Dykes property featuring Ferris," stop and rework it. Work the order of operations section in sequence, use the defaults in Open Questions unless I object, and halt at any of the halt points. Report back in plain English if you hit one. Don't send any emails, don't auto-post anything, don't merge the PR — I handle the merge myself.

---

Written for Claude Code, April 18, 2026. Revised after Casey's feedback to pull Dykes branding back to the front and strip the rough edges. Let me know what else needs tightening before this ships.
