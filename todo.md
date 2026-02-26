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
