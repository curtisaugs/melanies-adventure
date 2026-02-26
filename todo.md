# Melanie's European Adventure — Project TODO

## Core Pages
- [x] Home page — hero with Provençal birthday dinner image, countdown timer, "50th!" gag, Margaux intro, overview cards
- [x] Itineraries page — three packages (Rhine Cruise, Iberian Explorer, French Art de Vivre) with comparison table
- [x] Rhine Cruise detail page — day-by-day itinerary (Basel to Amsterdam), AmaLucia ship details, pricing
- [x] Destinations page — 10 cities (Lisbon, Porto, Seville, Madrid, Nice, Paris, Florence, Amalfi Coast, Athens, Santorini), tabbed by region
- [x] Relocation Guide page — 4 visa pathways (Portugal D8, Spain NLV, France Passeport Talent, Greece Digital Nomad), cost-of-living comparison
- [x] Graduate Schools page — 5 EMBA programs (INSEAD, HEC Paris, IE Business School, The Lisbon MBA, ESADE)
- [x] Flights & Logistics page — LAX departure options, train connections, full budget breakdown
- [x] Trip Builder (Margaux AI) page — 6-step wizard + chat mode with AI itinerary generation

## Design & Infrastructure
- [x] Dark luxury editorial design (Cormorant Garamond display, Playfair Display, glass morphism cards)
- [x] Gold/ivory color palette with CSS custom properties
- [x] Navigation with birthday countdown badge
- [x] Footer with all page links
- [x] Framer Motion animations throughout
- [x] React Router (wouter) for all routes
- [x] vite.config.ts with allowedHosts: true for proxy access
- [x] Hero images from CDN (Provençal dinner, Rhine river)

## Margaux AI Trip Builder
- [x] 6-step wizard (duration, regions, travel style, budget, special requests, confirmation)
- [x] Chat mode with streaming LLM responses
- [x] Frontend LLM API integration via VITE_FRONTEND_FORGE_API_KEY
- [x] Itinerary display with copy/share functionality
- [x] Curtis gift budget callout

## Future Enhancements (not yet implemented)
- [ ] Save itinerary to user account (requires backend)
- [ ] Share itinerary via unique URL (requires backend)
- [ ] Real-time flight price lookup (requires flight API)
- [ ] Interactive map on Destinations page
