# Melanie's European Adventure — TODO

## Core Site
- [x] Home page with hero, countdown, overview cards, Rhine teaser, quick links
- [x] Itineraries page with 3 packages + comparison table
- [x] Destinations page with 6 city guides
- [x] Relocation page with 4 visa pathways + cost of living comparison
- [x] Graduate Schools page with 5 EMBA programs
- [x] Flights & Logistics page (LAX departures)
- [x] Rhine Cruise day-by-day detail page (/rhine-cruise)
- [x] Navigation with Build My Trip CTA button
- [x] Footer with 60th→50th strikethrough gag

## Design & Polish
- [x] Midnight navy + champagne gold theme
- [x] Cormorant Garamond display font
- [x] Montserrat body font
- [x] 60th strikethrough with handwritten 50th (hero badge)
- [x] 60th strikethrough in footer subtitle
- [x] Nav bar opacity increased for legibility
- [x] Cost comparison table fixed (USD-equivalent values)
- [x] All flights corrected to LAX (Los Angeles)

## AI Trip Builder (Margaux)
- [x] Full-stack upgrade (db, server, user)
- [x] saved_itineraries database table
- [x] tripBuilder tRPC router (generate, save, getByShareId)
- [x] Margaux AI concierge persona + LLM prompt
- [x] Multi-step wizard UI (8 questions with clickable chips)
- [x] AI itinerary generation with day-by-day output
- [x] Save & shareable link feature
- [x] SharedItinerary page (/trip/:shareId)
- [x] Build My Trip section on homepage
- [x] Vitest tests for trip builder (7 tests passing)

## Future Ideas
- [ ] "From Curtis" personal letter section on homepage
- [ ] Paris with Annie dedicated mini-guide section
- [ ] Iberian Explorer day-by-day detail page
- [ ] French Art de Vivre day-by-day detail page
- [ ] Interactive neighborhood deep-dive (Lisbon, Nice, Paris)
- [ ] Printable PDF summary of all itineraries

## Phase 3 — Margaux Upgrade
- [x] Test and fix save/share end-to-end flow
- [x] Upgrade Margaux personality (European travel wisdom, Bergamo/Positano energy)
- [x] Add Curtis gift budget framing (~$5k base covered, Melanie upgrades on top)
- [x] Elevate Margaux to homepage centerpiece (moved above overview cards, two-column layout)
- [x] Add cheeky distance/driving warnings in wizard and itinerary output
- [x] Budget wizard step rewritten with Curtis gift framing + upgrade tiers
- [x] Curtis Gift Breakdown card in generated itinerary output

## Phase 4 — Spring Color Treatment (All Pages)
- [x] Destinations page: city-specific accent colors (amber/orange/coral/rose/cyan/lavender per city)
- [x] Itineraries page: teal for Rhine, coral for Iberian, lavender for French Art de Vivre
- [x] Graduate Schools page: per-school accent colors, colorful CTA buttons, lavender comparison header
- [x] Relocation page: teal for visa section, coral for cost comparison, lavender for expat community
- [x] Flights page: coral for flights, teal for open-jaw, lavender for miles, rose for packing

## Phase 5 — Margaux Section Polish
- [x] Replace brown/gold badge and day-chips with spring rose/teal palette
- [x] Rewrite Margaux intro copy in Curtis's voice ("no pre-built tour would work for someone as discerning as you... I've been asked to help")
- [x] Section background gradient updated to rose → teal (no more brown)

## Phase 6 — Margaux Persona Rewrite
- [x] Homepage: Rewrite Margaux section — she's already here, Curtis introduced you, peer energy not concierge
- [x] Homepage: Chat preview bubble rewrites to match peer/empathetic voice
- [x] Trip builder: Update AI system prompt — Margaux understands ADHD decision style, curated taste, adapts to Melanie's responses

## Phase 7 — Margaux OR + Em-Dash Purge
- [x] Homepage: Add cheeky "or" pre-built trips section below Margaux with self-aware humor
- [x] Home.tsx: Replace all em-dashes with natural punctuation
- [x] All other pages: Replace all em-dashes with natural punctuation (142 total across 7 files)

## Phase 8 — Hero Glass Morphism
- [x] Hero section: Wrap welcome text in glass morphism panel for legibility

## Phase 9 — Image Fixes
- [x] Destinations: Replace Tower Bridge image on Nice card with correct French Riviera photo

## Phase 10 — Cost Accuracy
- [x] Itineraries: Fix negative numbers in Quick Comparison table (confirmed no negative numbers in static table; issue was in AI-generated output)
- [x] Margaux: Upgrade AI prompt with real 2026 cost benchmarks and line-by-line calculation instructions

## Phase 11 — Cost Breakdown Fix
- [x] Trip builder: Fix Curtis Gift Breakdown / cost estimate not rendering in itinerary output (verified: real numbers confirmed in API test)

## Phase 12 — PDF Download
- [x] SharedItinerary: Add print CSS for beautiful travel document output
- [x] SharedItinerary: Add Download as PDF button that triggers window.print()

## Phase 13 — Print Preview Test
- [x] Generate itinerary and test print layout for page break issues
- [x] Fix any awkward breaks in day cards, cost table, or Margaux note (hooks error fixed, accordion expands on print, print CSS updated)

## Phase 14 — Punctuation Polish
- [x] Destinations: Fix Porto tagline punctuation for consistency with Nice

## Phase 15 — Tagline Consistency
- [x] Destinations: Fix Seville tagline punctuation
- [x] Destinations: Fix Paris tagline punctuation

## Phase 16 — Margaux Wizard Opening
- [x] TripBuilder: Rewrite Margaux's first screen with peer voice — direct, warm, no preamble

## Phase 17 — Extended Stay Through Study + 21 Day Mind Body
- [x] Create new ExtendedStay.tsx page with student visa pathways and low-cost program options
- [x] Add route /extended-stay to App.tsx navigation
- [x] Add "Extended Stay" nav link to Navigation component
- [x] Build three visa pathway cards (Portugal D4, Spain Type D, France VLS-TS) with real costs
- [x] Build low-cost program cards: Cervantes EI (Spain), CIAL (Portugal), Alliance Française (France)
- [x] Add "21 Day Mind Body" section with Margaux conversation mode
- [x] Margaux on this page: asks about Melanie's program concept and suggests European launch venues
- [x] Add wellness ecosystem section: Algarve retreat hub, Barcelona wellness scene, Paris corporate wellness

## Phase 18 — Local Adventure: Big Sur RV Birthday Weekend
- [x] Create new RVAdventure.tsx page with Margaux intro, route, campsites, and two weekend options
- [x] Add route/stop cards: Malibu, Cambria Farmers Market, Carmel, Garrapata Calla Lily Valley, Bixby Bridge, Pfeiffer Beach, McWay Falls
- [x] Add campsite comparison: Fernwood Resort vs Big Sur Campground & Cabins
- [x] Add RV rental guidance section (Outdoorsy recommendation)
- [x] Add weekend option toggle: March 27-29 vs April 3-5
- [x] Add Curtis-only cost breakdown section (styled as "behind the curtain")
- [x] Add /rv-adventure route to App.tsx
- [x] Add "Big Sur RV" nav link to Navigation component
- [ ] Add "Local Adventure" card to homepage overview section (optional enhancement)
- [x] Write vitest tests for new page (27 tests passing)

## Phase 19 — Bring Big Sur to the Forefront
- [x] Move "Big Sur RV" to first position in nav with pulsing teal dot, rename site logo to "Adventure"
- [x] Redesign homepage hero to lead with Big Sur (new subhead: "The Dogs. The Coast. This Weekend.")
- [x] Add Big Sur feature card as primary section below hero
- [x] Collapse European options into a secondary "Future Adventures" section on homepage
- [x] Update countdown border to teal to match Big Sur theme
- [x] Clean up nav: 3 items only (Big Sur RV, Europe dropdown, Talk to Margaux CTA)
- [x] Europe dropdown labeled "Future Adventures" with all 6 sub-links preserved
- [x] Updated Margaux section copy to reflect Big Sur is the current plan

## Phase 20 — Margaux Big Sur Update
- [ ] Update chatWithMargaux system prompt from Europe focus to Big Sur RV focus
- [ ] Update TripBuilder page welcome screen, suggested questions, and context for Big Sur
- [ ] Add embedded Margaux conversation window to RV Adventure page
- [ ] Keep Europe context available as a secondary topic Margaux can discuss

## Phase 22 — Airbnb Weekend Getaway Modality
- [x] Visit the 3 Airbnb listings Curtis shared and capture key details
- [x] Research dog-friendly Airbnb options: Big Bear, Lake Arrowhead, Big Sur, Santa Barbara
- [x] Create new AirbnbGetaway.tsx page with Margaux intro, 4 destination cards, curated listings
- [x] Add /airbnb-getaway route to App.tsx
- [x] Add "Cabin Airbnb" nav item alongside Big Sur RV (desktop + mobile)
- [x] Each listing card: name, location, price/night, dog-friendly notes, fenced yard indicator, direct Airbnb link
- [x] Add destination comparison section (drive time from LA, vibe, dog-friendliness)
- [x] Add Airbnb Cabin feature card to homepage (Mountain Cabin Weekend section)
- [x] Write vitest tests for new page (11 tests passing)

## Phase 23 — Confirmed VRBO Booking
- [x] Add confirmed booking banner/section to Airbnb Getaway page (Alpen Lodge, Lake Arrowhead)
- [x] Add confirmed booking highlight to homepage Mountain Cabin Weekend card
- [x] Mark Alpen Lodge as "CONFIRMED" with reservation details (Res ID: 56518539, Mar 27-30, 3 nights, 3 adults + 1 pet)
- [x] Update Margaux text and availability note to reflect confirmed status
- [x] Update homepage stats to show Mar 27-30 dates and Alpen Lodge highlights

## Phase 24 — Homepage Hero: Confirmed Booking Lead
- [x] Update hero subtitle from Big Sur/RV framing to Alpen Lodge confirmed booking
- [x] Change "Plan the Big Sur Trip" CTA to "View Our Booking" linking to /airbnb-getaway
- [x] Update hero body copy to reflect the confirmed Alpen Lodge trip
- [x] Keep countdown to March 26 birthday, updated surrounding context

## Phase 26 — Homepage Reorder: Confirmed Booking First
- [x] Move Alpen Lodge confirmed booking section to appear first after the hero
- [x] Move Big Sur RV section below as a "Next Adventure" / future trip idea
- [x] Update section labels: "✓ This Weekend — Confirmed" for Alpen Lodge, "Next Up — Big Sur RV Trip" for Big Sur
- [x] Update Margaux quote in Big Sur section to reflect it's a future plan, not this weekend
- [x] Update Margaux section body copy to reflect Alpen Lodge is this weekend, Big Sur is next

## Phase 27 — Real Alpen Lodge Photos
- [x] Upload 4 real Alpen Lodge photos to CDN
- [x] Swap homepage hero background to deck/lake view photo (alpen-deck-lake)
- [x] Add 4-photo gallery grid to Cabin Airbnb page with hover captions and "Hero View" badge

## Phase 28 — Lake Arrowhead Hero Images
- [x] Search for picturesque real Lake Arrowhead photos (lake, mountains, village, sunset)
- [x] Upload 3 photos to CDN: fiery sunset, pink sunset, lakefront cabins
- [x] Swap Cabin Airbnb page hero background (both hero + full-bleed teaser) to real fiery sunset photo

## Phase 29 — Local Adventure Guide (Lake Arrowhead)
- [x] Research dog-friendly hikes near Lake Arrowhead (6 hikes curated)
- [x] Research dog-friendly restaurants in Lake Arrowhead Village and Blue Jay (6 restaurants)
- [x] Research gift shops, bookstores, and local village shopping (6 shops + 4 books/coffee)
- [x] Research grocery stores near the Alpen Lodge (4 options with hours/addresses)
- [x] Build interactive checklist section on Cabin Airbnb page with 5 categories, icons, and external links

## Phase 30 — Treasure Map + Accordion Other Options
- [x] Add interactive Google Map section with pins for Alpen Lodge (home base) + all adventure highlights
- [x] Category-colored pins: gold (home base), teal (hikes), rose (restaurants), amber (shops), blue (groceries)
- [x] Info windows on pin click (name, category, short description)
- [x] Collapse "Other Options" listings + comparison table into an accordion (collapsed by default)
- [x] Fix marker click listener (gmp-click for AdvancedMarkerElement)
- [x] Remove conflicting map styles (mapId present, styles controlled via cloud console)

## Phase 31 — Margaux Context Update (Confirmed Alpen Lodge)
- [x] Update MargauxChatEmbed system prompt to focus on confirmed March 27-30 Alpen Lodge booking
- [x] Remove references to April 3-5 and speculative cabin search
- [x] Add full Alpen Lodge details: 5BR, 3 decks, BBQ, firepit, pool table, fenced yard, lake rights, VRBO #5089227
- [x] Add all Lake Arrowhead adventure context: hikes, restaurants, shops, groceries, activities
- [x] Update Margaux section header: "Ask Margaux About the Trip"
- [x] Update section subtext, input placeholder, and empty state prompt

## Phase 32 — Page Layout Fixes
- [x] Fix auto-scroll-to-bottom bug (isFirstRender guard on useEffect)
- [x] A-Frame of Mind already in listings array — confirmed it shows in accordion with all 4 listings
- [x] Moved Margaux chat section to appear right after the treasure map and before Other Options accordion

## Phase 33 — Remove Standalone A-Frame Teaser
- [x] Remove the full-bleed "A-Frame of Mind" teaser section that appears below the Other Options accordion
