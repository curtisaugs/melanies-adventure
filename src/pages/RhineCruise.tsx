import { useState } from "react";
import { motion } from "framer-motion";
import { Ship, MapPin, Utensils, Star, ArrowLeft, Anchor, Clock } from "lucide-react";
import { Link } from "wouter";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const days = [
  {
    day: 1,
    date: "March 26 — Birthday!",
    port: "Basel, Switzerland",
    flag: "🇨🇭",
    title: "Embarkation Day — Happy Birthday, Melanie!",
    description: "Board the AmaLucia in Basel on your birthday. The ship departs in the evening, giving you time to explore Basel's charming Old Town — the Kunstmuseum, the Münster cathedral, and the Rhine promenade. A special birthday dinner awaits onboard.",
    highlights: ["Basel Old Town & Münster Cathedral", "Kunstmuseum Basel (world-class art)", "Rhine promenade walk", "Birthday dinner in the Chef's Table restaurant", "Welcome Champagne reception"],
    meals: "Dinner onboard",
    tip: "Basel straddles Switzerland, France, and Germany — you can walk between three countries in 20 minutes.",
  },
  {
    day: 2,
    date: "March 27",
    port: "Breisach, Germany / Colmar, France",
    flag: "🇩🇪🇫🇷",
    title: "The Alsace Wine Route",
    description: "Morning in Breisach with its hilltop Minster, then a guided excursion to Colmar — France's most fairy-tale town. Half-timbered houses, flower-lined canals, and the Unterlinden Museum (home to Grünewald's Isenheim Altarpiece). Wine tasting in the evening.",
    highlights: ["Colmar's Petite Venise (Little Venice)", "Unterlinden Museum", "Alsatian wine tasting: Riesling, Gewurztraminer", "Breisach Minster panoramic views", "Optional: Black Forest excursion"],
    meals: "Breakfast, lunch, and dinner onboard",
    tip: "Colmar is the inspiration for the village in Beauty and the Beast. It's even more magical in person.",
  },
  {
    day: 3,
    date: "March 28",
    port: "Strasbourg, France",
    flag: "🇫🇷",
    title: "The Capital of Europe",
    description: "A full day in Strasbourg — home to the European Parliament and one of France's most beautiful cities. The Grande Île is a UNESCO World Heritage Site. The Cathédrale Notre-Dame de Strasbourg has an astronomical clock that performs at 12:30pm daily.",
    highlights: ["Cathédrale Notre-Dame de Strasbourg (astronomical clock)", "La Petite France neighborhood", "European Parliament visitor tour", "Strasbourg Christmas market district (year-round shops)", "Tarte flambée (Alsatian pizza) for lunch"],
    meals: "Breakfast and dinner onboard; lunch in Strasbourg",
    tip: "Strasbourg is a serious relocation candidate — EU institutions, international community, bilingual French/German culture.",
  },
  {
    day: 4,
    date: "March 29",
    port: "Speyer / Heidelberg, Germany",
    flag: "🇩🇪",
    title: "Medieval Germany",
    description: "Morning in Speyer — one of Germany's oldest cities, with a Romanesque cathedral that has stood since 1061. Afternoon in Heidelberg, Germany's most romantic city: the ruined castle above the Neckar River, the Old Bridge, and the Philosophers' Walk.",
    highlights: ["Speyer Cathedral (UNESCO)", "Heidelberg Castle ruins", "Alte Brücke (Old Bridge)", "Philosophers' Walk (Philosophenweg)", "Heidelberg Old Town & Hauptstrasse"],
    meals: "All meals onboard",
    tip: "Heidelberg's castle is best at sunset. The walk up is steep but worth it — bring comfortable shoes.",
  },
  {
    day: 5,
    date: "March 30",
    port: "Rüdesheim, Germany",
    flag: "🇩🇪",
    title: "The Rhine Gorge & Wine Country",
    description: "The most scenic stretch of the entire cruise. The Rhine Gorge is a UNESCO World Heritage Site — dramatic cliffs, medieval castles, and terraced vineyards. Rüdesheim is the heart of the Rheingau wine region. The Drosselgasse is a narrow lane packed with wine taverns.",
    highlights: ["Rhine Gorge scenic cruising (UNESCO)", "Lorelei Rock — the legendary siren's perch", "Rüdesheim Drosselgasse wine taverns", "Niederwald Monument cable car", "Rheingau Riesling tasting"],
    meals: "All meals onboard",
    tip: "The Rhine Gorge is best experienced from the sun deck with a glass of Riesling. Don't miss it.",
  },
  {
    day: 6,
    date: "March 31",
    port: "Cologne, Germany",
    flag: "🇩🇪",
    title: "Cologne Cathedral & Kölsch Beer",
    description: "Cologne's Gothic cathedral is one of the world's great buildings — 632 years in construction, it dominates the skyline. The city has a vibrant art scene (Museum Ludwig, the Chocolate Museum) and the famous Kölsch beer culture. The old town is charming and walkable.",
    highlights: ["Cologne Cathedral (UNESCO) — climb the south tower", "Museum Ludwig (Picasso, Warhol, Lichtenstein)", "Chocolate Museum (Schokoladenmuseum)", "Kölsch beer at a traditional Brauhaus", "Hohenzollern Bridge love locks"],
    meals: "All meals onboard",
    tip: "Cologne Cathedral was the world's tallest building from 1880–1884. The view from the top is extraordinary.",
  },
  {
    day: 7,
    date: "April 1",
    port: "Kinderdijk / Rotterdam, Netherlands",
    flag: "🇳🇱",
    title: "Dutch Windmills & Modern Architecture",
    description: "Morning at Kinderdijk — 19 windmills in a row, perfectly preserved since the 18th century, a UNESCO World Heritage Site. Afternoon in Rotterdam, Europe's largest port and one of its most architecturally adventurous cities. The Cube Houses and Markthal are unmissable.",
    highlights: ["Kinderdijk windmills (UNESCO)", "Rotterdam Cube Houses (Kubuswoningen)", "Markthal Rotterdam (indoor food market)", "Erasmusbrug (Swan Bridge)", "Rotterdam's rebuilt city center (bombed in WWII, rebuilt boldly)"],
    meals: "All meals onboard",
    tip: "Rotterdam was almost completely destroyed in WWII. The city rebuilt with radical architecture — it's a fascinating contrast to the rest of the cruise.",
  },
  {
    day: 8,
    date: "April 2",
    port: "Amsterdam, Netherlands",
    flag: "🇳🇱",
    title: "Disembarkation — Amsterdam Awaits",
    description: "Disembark in Amsterdam after breakfast. The city deserves at least 2–3 extra days: the Rijksmuseum, the Anne Frank House, the canal belt, the Jordaan neighborhood, and the best stroopwafels in the world. Amsterdam is also one of Europe's top expat destinations.",
    highlights: ["Rijksmuseum (Rembrandt, Vermeer)", "Anne Frank House (book tickets in advance)", "Canal belt boat tour", "Jordaan neighborhood — galleries and cafés", "Amsterdam's expat community: 180,000+ internationals"],
    meals: "Breakfast onboard",
    tip: "Book the Anne Frank House tickets months in advance — they sell out. The Rijksmuseum is best on a weekday morning.",
  },
];

const shipDetails = [
  { label: "Ship", value: "AmaLucia" },
  { label: "Guests", value: "156 maximum" },
  { label: "Cabins", value: "78 staterooms" },
  { label: "Length", value: "135 meters" },
  { label: "Launched", value: "2019" },
  { label: "Crew", value: "51 crew members" },
];

const inclusions = [
  "All meals onboard (breakfast, lunch, dinner)",
  "Premium beverages (wine, beer, spirits, soft drinks)",
  "Daily guided shore excursions",
  "Port charges and gratuities",
  "Wi-Fi throughout the ship",
  "Complimentary bicycles for independent exploration",
  "Onboard entertainment and lectures",
  "Airport transfers (Basel and Amsterdam)",
];

const departures = [
  { date: "March 26, 2026", notes: "Birthday departure — Basel embarkation", price: "$4,349 pp", availability: "Limited" },
  { date: "April 2, 2026", notes: "Post-birthday option", price: "$4,199 pp", availability: "Available" },
  { date: "April 9, 2026", notes: "Spring peak season", price: "$4,549 pp", availability: "Available" },
  { date: "April 23, 2026", notes: "Late April — tulip season in Netherlands", price: "$4,699 pp", availability: "Available" },
];

export default function RhineCruise() {
  const [activeDay, setActiveDay] = useState(1);
  const selectedDay = days.find(d => d.day === activeDay) || days[0];

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/118915275/dspOjTQxYYonioWF.png')` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,8,20,0.9) 0%, rgba(6,8,20,0.6) 100%)" }} />
        <div className="relative z-10 container">
          <Link href="/itineraries">
            <button className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full font-body text-sm text-ivory mb-8 hover:border-gold/30 transition-all">
              <ArrowLeft size={14} /> Back to Itineraries
            </button>
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="glass-card-gold px-3 py-1.5 rounded-full font-accent text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
                AmaWaterways
              </span>
              <span className="glass-card px-3 py-1.5 rounded-full font-accent text-xs tracking-widest uppercase text-ivory">
                7 Nights / 8 Days
              </span>
              <span className="glass-card px-3 py-1.5 rounded-full font-accent text-xs tracking-widest uppercase text-ivory">
                All-Inclusive
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-ivory mb-4 leading-none">
              Enchanting<br /><span style={{ color: "var(--gold)", fontStyle: "italic" }}>Rhine</span>
            </h1>
            <p className="font-body text-base max-w-xl leading-relaxed mb-8" style={{ color: "rgba(240,235,220,0.7)" }}>
              Basel, Switzerland to Amsterdam, Netherlands. Eight days through medieval castles, Alsatian wine villages, the Rhine Gorge, and Dutch windmills. Unpack once. Experience everything.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="glass-card-gold rounded-xl px-5 py-3">
                <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "rgba(180,150,80,0.7)" }}>Price From</div>
                <div className="font-display text-2xl font-light" style={{ color: "var(--gold)" }}>$4,349 <span className="text-sm">per person</span></div>
              </div>
              <div className="glass-card rounded-xl px-5 py-3">
                <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "rgba(240,235,220,0.4)" }}>Birthday Departure</div>
                <div className="font-body text-base text-ivory">March 26, 2026</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Day-by-Day */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-4xl font-light text-ivory mb-8">
            Day-by-Day <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Itinerary</span>
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Day Selector */}
            <div className="space-y-2">
              {days.map((d) => (
                <button key={d.day} onClick={() => setActiveDay(d.day)}
                  className="w-full text-left px-5 py-4 rounded-xl transition-all"
                  style={{
                    background: activeDay === d.day ? "rgba(180,150,80,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${activeDay === d.day ? "rgba(180,150,80,0.4)" : "rgba(255,255,255,0.06)"}`,
                  }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold flex-shrink-0"
                      style={{
                        background: activeDay === d.day ? "var(--gold)" : "rgba(255,255,255,0.06)",
                        color: activeDay === d.day ? "var(--navy)" : "rgba(240,235,220,0.5)",
                      }}>
                      {d.day}
                    </div>
                    <div>
                      <div className="font-body text-xs font-medium text-ivory">{d.port.split(",")[0]}</div>
                      <div className="font-body text-xs" style={{ color: "rgba(240,235,220,0.4)" }}>{d.date}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Day Detail */}
            <div className="lg:col-span-2">
              <motion.div key={selectedDay.day} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}>
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="glass-card-gold p-3 rounded-xl flex-shrink-0">
                      <Anchor size={20} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <div className="font-accent text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>
                        Day {selectedDay.day} — {selectedDay.date}
                      </div>
                      <h3 className="font-display text-2xl font-light text-ivory mb-1">{selectedDay.title}</h3>
                      <div className="flex items-center gap-2">
                        <MapPin size={12} style={{ color: "var(--gold)" }} />
                        <span className="font-body text-sm" style={{ color: "var(--muted)" }}>
                          {selectedDay.flag} {selectedDay.port}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                    {selectedDay.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-accent text-xs tracking-widest uppercase mb-3" style={{ color: "var(--gold)" }}>Highlights</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {selectedDay.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Star size={10} className="mt-1 flex-shrink-0" style={{ color: "var(--gold)" }} />
                          <span className="font-body text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="glass-card rounded-xl p-4">
                      <Utensils size={13} className="mb-2" style={{ color: "var(--gold)" }} />
                      <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "rgba(180,150,80,0.7)" }}>Meals</div>
                      <div className="font-body text-xs text-ivory">{selectedDay.meals}</div>
                    </div>
                    <div className="glass-card rounded-xl p-4" style={{ borderColor: "rgba(180,150,80,0.2)" }}>
                      <Clock size={13} className="mb-2" style={{ color: "var(--gold)" }} />
                      <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "rgba(180,150,80,0.7)" }}>Margaux's Tip</div>
                      <div className="font-body text-xs" style={{ color: "var(--muted)" }}>{selectedDay.tip}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Ship Details */}
      <section className="py-16" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl font-light text-ivory mb-6">
                The <span style={{ color: "var(--gold)", fontStyle: "italic" }}>AmaLucia</span>
              </h2>
              <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                AmaWaterways' AmaLucia is one of the newest ships on the Rhine, launched in 2019. With just 156 guests, it offers an intimate experience that large ocean cruise ships cannot match. The twin balcony staterooms — with both a French balcony and a full step-out balcony — are among the finest on European rivers.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {shipDetails.map(({ label, value }) => (
                  <div key={label} className="glass-card rounded-xl p-3">
                    <div className="font-accent text-[0.6rem] tracking-widest uppercase mb-1" style={{ color: "rgba(180,150,80,0.7)" }}>{label}</div>
                    <div className="font-body text-sm text-ivory">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl font-light text-ivory mb-6">
                What's <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Included</span>
              </h2>
              <ul className="space-y-3">
                {inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Ship size={13} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                    <span className="font-body text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Departures */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-3xl font-light text-ivory mb-8">
            Available <span style={{ color: "var(--gold)", fontStyle: "italic" }}>Departures</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departures.map((dep) => (
              <div key={dep.date} className="glass-card rounded-2xl p-6"
                style={{ border: dep.date.includes("March 26") ? "1px solid rgba(180,150,80,0.4)" : "1px solid rgba(255,255,255,0.08)" }}>
                {dep.date.includes("March 26") && (
                  <div className="glass-card-gold px-2 py-1 rounded-full font-accent text-[0.55rem] tracking-widest uppercase mb-3 inline-block"
                    style={{ color: "var(--gold)" }}>
                    ★ Birthday Departure
                  </div>
                )}
                <div className="font-display text-lg font-light text-ivory mb-1">{dep.date}</div>
                <div className="font-body text-xs mb-3" style={{ color: "var(--muted)" }}>{dep.notes}</div>
                <div className="font-display text-xl font-light mb-2" style={{ color: "var(--gold)" }}>{dep.price}</div>
                <div className="font-body text-xs" style={{ color: dep.availability === "Limited" ? "#f87171" : "#4ade80" }}>
                  {dep.availability}
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-xs mt-6" style={{ color: "rgba(240,235,220,0.3)" }}>
            * Prices are per person, double occupancy, in a standard stateroom. Twin balcony suites add ~$800/person. Book directly at AmaWaterways.com or through a travel agent.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
