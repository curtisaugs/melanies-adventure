/*
  Lola's Adventure — Marine Volunteer & Conservation Programs
  North Queensland opportunities for April–May 2026
*/
import { motion } from "framer-motion";
import { Fish, Heart, MapPin, Clock, ArrowLeft, ExternalLink, Star, AlertTriangle, Waves } from "lucide-react";
import { Link } from "wouter";
import LolaNavigation from "@/components/LolaNavigation";
import LolaFooter from "@/components/LolaFooter";

const programs = [
  {
    name: "Great Barrier Reef Legacy",
    location: "Cairns / Outer Reef",
    duration: "Weekend to multi-week",
    type: "Coral Reef Monitoring",
    description:
      "GBR Legacy runs citizen science expeditions to the outer reef, training volunteers in coral health surveys, bleaching assessments, and species identification. Volunteers work alongside marine biologists and contribute data directly to reef management decisions. No dive certification required — snorkel surveys are a core part of the program.",
    skills: ["Coral health assessment", "Species ID", "Underwater photography", "Data collection"],
    cost: "Varies — some expeditions are fully funded for students",
    contact: "gbrlegacy.com.au",
    highlight: "Work directly with scientists on active reef research. Your data goes into the national reef monitoring database.",
    lolaFit: "This is the closest thing to your Malibu Marine Mammal work — real conservation impact, real science, real team.",
    stormy: "Cairns-based. Stormy stays at City Oasis Inn (pet-friendly) while you're on the water.",
    available: true,
  },
  {
    name: "Reef Check Australia",
    location: "Townsville / Cairns",
    duration: "Weekend training + surveys",
    type: "Reef Health Monitoring",
    description:
      "Reef Check trains volunteers to conduct standardised reef health surveys using a globally recognised protocol. The EcoDiver program is for certified divers, but the EcoSnorkeller program is specifically designed for non-certified participants. Surveys typically run on weekends and can be done as a day trip from Townsville.",
    skills: ["Standardised survey protocols", "Fish and invertebrate ID", "Reef health scoring"],
    cost: "Training course ~$150–250 AUD, surveys are volunteer",
    contact: "reefcheckaustralia.org",
    highlight: "The EcoSnorkeller protocol is used worldwide — this is a credential that means something in marine biology.",
    lolaFit: "Directly relevant to your JCU coursework. The survey methodology is the same used in academic research.",
    stormy: "Townsville-based surveys — Stormy stays home. Cairns surveys require an overnight.",
    available: true,
  },
  {
    name: "Coral Nurture Program",
    location: "Cairns / Port Douglas",
    duration: "Day to multi-day",
    type: "Coral Restoration",
    description:
      "The Coral Nurture Program (run by Wavelength Reef Cruises and partners) trains volunteers to plant coral fragments on degraded reef sections using a technique developed in collaboration with JCU researchers. Volunteers learn coral biology, fragmentation, and planting technique. No dive certification required.",
    skills: ["Coral fragmentation", "Planting technique", "Reef ecology", "Monitoring"],
    cost: "Some programs are free for students with university ID",
    contact: "coralnurtureprogram.org",
    highlight: "You literally put coral back on the reef. The technique was developed partly at JCU — you may recognise the researchers.",
    lolaFit: "Hands-on restoration work. This is the marine equivalent of releasing a rehabbed seal back into the ocean.",
    stormy: "Port Douglas-based. Cat-friendly accommodation available in Port Douglas.",
    available: true,
  },
  {
    name: "Australian Seabird Rescue",
    location: "Various QLD coastal towns",
    duration: "Flexible — drop-in volunteering",
    type: "Wildlife Rehabilitation",
    description:
      "Australian Seabird Rescue rehabilitates injured seabirds and marine wildlife — pelicans, shearwaters, gannets, and sea turtles. The organisation operates across coastal Queensland and welcomes experienced wildlife handlers. Given your Malibu Marine Mammal Centre background, you'd be fast-tracked past the basic training.",
    skills: ["Wildlife handling", "Triage", "Rehabilitation protocols", "Release preparation"],
    cost: "Free — volunteer organisation",
    contact: "australianseabirdrescue.org.au",
    highlight: "This is the closest Australian equivalent to the Malibu Marine Mammal Centre. Your experience is directly transferable.",
    lolaFit: "You've done this. You know how to hold a pelican, how to assess a bird in distress, how to prepare for release. They need people like you.",
    stormy: "Operates from various locations — check the nearest active chapter to your route.",
    available: true,
  },
  {
    name: "Turtle Rescue Network (AMCS)",
    location: "Townsville / Magnetic Island",
    duration: "Flexible",
    type: "Sea Turtle Monitoring & Rescue",
    description:
      "The Australian Marine Conservation Society's Turtle Rescue Network trains volunteers to respond to stranded or injured sea turtles along the North Queensland coast. Townsville is a hub — the Great Barrier Reef Marine Park Authority and JCU both have active turtle research programs that use trained volunteers.",
    skills: ["Turtle handling", "Stranding response", "Health assessment", "Tagging assistance"],
    cost: "Free — training provided",
    contact: "marineconservation.org.au/turtles",
    highlight: "Townsville is one of the most important sea turtle research hubs in the world. You're already in the right place.",
    lolaFit: "Sea turtles are your neighbours. The JCU Marine Biology department has direct links to this program — ask your lecturers.",
    stormy: "Townsville-based. Stormy stays home for callouts.",
    available: true,
  },
  {
    name: "GBRMPA Citizen Science",
    location: "Townsville (GBRMPA HQ)",
    duration: "Ongoing",
    type: "Reef Data Collection",
    description:
      "The Great Barrier Reef Marine Park Authority is headquartered in Townsville and runs multiple citizen science programs including CoralWatch (coral bleaching monitoring), Eye on the Reef (reef health reporting), and the Reef Health Impact Survey. These can be done on any reef visit — you don't need to travel far.",
    skills: ["CoralWatch colour chart methodology", "Species reporting", "Bleaching assessment"],
    cost: "Free — download the app",
    contact: "gbrmpa.gov.au/our-work/reef-programs",
    highlight: "You can contribute data from every snorkel trip on any route in this guide. Every data point matters.",
    lolaFit: "This is the background hum of reef science. Every time you're in the water, you can be contributing. Download CoralWatch before you leave.",
    stormy: "Stormy doesn't snorkel, but she supports the mission.",
    available: true,
  },
];

export default function LolaMarineVolunteer() {
  return (
    <div className="min-h-screen font-lola-body" style={{ background: "oklch(0.12 0.07 220)", color: "oklch(0.92 0.02 80)" }}>
      <LolaNavigation />

      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.18 0.12 220) 0%, oklch(0.12 0.07 220) 100%)" }} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, oklch(0.62 0.18 195 / 0.3) 0%, transparent 60%), radial-gradient(circle at 70% 30%, oklch(0.65 0.22 30 / 0.2) 0%, transparent 50%)" }} />
        <div className="relative z-10 container">
          <Link href="/">
            <button className="glass-ocean inline-flex items-center gap-2 px-4 py-2 rounded-full font-lola-mono text-xs tracking-widest uppercase text-reef-teal mb-10 hover:text-sand transition-colors">
              <ArrowLeft size={12} /> Back to Home
            </button>
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass-reef px-4 py-2 rounded-full mb-6">
              <Heart size={13} className="text-coral-reef fill-coral-reef" />
              <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-coral-reef">Give Something Back</span>
            </div>
            <h1 className="font-lola-display font-800 text-sand leading-none mb-4" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
              Marine Volunteer{" "}
              <span className="text-reef-teal" style={{ textShadow: "0 0 30px oklch(0.62 0.18 195 / 0.5)" }}>
                Programs
              </span>
            </h1>
            <p className="font-lola-body text-base text-sand/60 leading-relaxed max-w-2xl">
              You spent a year and a half rehabbing seals, pelicans, and marine wildlife at the Malibu Marine Mammal Centre. You know what it feels like to hold an animal that wouldn't survive without you, and to watch it go back to the ocean. North Queensland has programs that need exactly that kind of person.
            </p>
          </div>
        </div>
      </section>

      {/* Dad's Note */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto glass-ocean rounded-2xl p-8 border" style={{ borderColor: "oklch(0.62 0.18 195 / 0.2)" }}>
            <div className="flex items-start gap-4">
              <div className="glass-reef w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart size={16} className="text-coral-reef fill-coral-reef" />
              </div>
              <div>
                <div className="font-lola-display font-700 text-sand text-lg mb-3">A Note from Dad</div>
                <p className="font-lola-body text-sm text-sand/60 leading-relaxed mb-3">
                  The work you did at the Malibu Marine Mammal Centre was one of the most impressive things I've ever watched you do. You were 20 years old, getting up before dawn, handling animals that could hurt you, doing the unglamorous work — the feeding, the cleaning, the waiting — because you believed it mattered.
                </p>
                <p className="font-lola-body text-sm text-sand/60 leading-relaxed">
                  You're now studying marine biology at one of the best marine research universities in the world, living 20 minutes from the Great Barrier Reef. The programs on this page are waiting for someone exactly like you. The break window is 18 days. You could road trip <em>and</em> volunteer. You could do both.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 pb-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="font-lola-mono text-xs tracking-[0.18em] uppercase text-reef-teal">6 Programs</span>
            <h2 className="font-lola-display font-700 text-sand mt-2" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}>
              Where You Could Help
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {programs.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-ocean rounded-2xl overflow-hidden"
              >
                <div className="p-5 border-b" style={{ borderColor: "oklch(0.62 0.18 195 / 0.15)" }}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="font-lola-display font-700 text-sand text-xl mb-1">{p.name}</div>
                      <div className="flex flex-wrap gap-3 text-xs">
                        <span className="flex items-center gap-1 text-reef-teal/70 font-lola-mono">
                          <MapPin size={10} /> {p.location}
                        </span>
                        <span className="flex items-center gap-1 text-reef-teal/70 font-lola-mono">
                          <Clock size={10} /> {p.duration}
                        </span>
                      </div>
                    </div>
                    <div className="glass-reef px-3 py-1 rounded-full">
                      <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-reef-teal">{p.type}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <p className="font-lola-body text-sm text-sand/60 leading-relaxed">{p.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Star size={11} className="text-reef-teal" />
                        <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-reef-teal/70">Skills You'll Build</span>
                      </div>
                      <ul className="space-y-1">
                        {p.skills.map((s) => (
                          <li key={s} className="flex items-center gap-2">
                            <span className="text-reef-teal/40 flex-shrink-0">·</span>
                            <span className="font-lola-body text-xs text-sand/60">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-sand/40 mb-1">Cost</div>
                        <p className="font-lola-body text-xs text-sand/60">{p.cost}</p>
                      </div>
                      <div>
                        <div className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-sand/40 mb-1">Contact</div>
                        <a href={`https://${p.contact}`} target="_blank" rel="noopener noreferrer" className="font-lola-body text-xs text-reef-teal hover:text-sand transition-colors flex items-center gap-1">
                          {p.contact} <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Highlight */}
                  <div className="glass-reef rounded-lg p-3 border-l-2" style={{ borderColor: "oklch(0.62 0.18 195 / 0.6)" }}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Waves size={11} className="text-reef-teal" />
                      <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-reef-teal/70">Why It Matters</span>
                    </div>
                    <p className="font-lola-body text-xs text-sand/70 leading-relaxed">{p.highlight}</p>
                  </div>

                  {/* Lola Fit */}
                  <div className="glass-reef rounded-lg p-3 border-l-2" style={{ borderColor: "oklch(0.65 0.22 30 / 0.6)" }}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Heart size={11} className="text-coral-reef" />
                      <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-coral-reef/70">Why It's Right for You</span>
                    </div>
                    <p className="font-lola-body text-xs text-sand/70 leading-relaxed">{p.lolaFit}</p>
                  </div>

                  {/* Stormy */}
                  <div className="flex items-start gap-2 opacity-60">
                    <span className="font-lola-mono text-[0.6rem] tracking-widest uppercase text-sand/40 mt-0.5 flex-shrink-0">Stormy:</span>
                    <span className="font-lola-body text-xs text-sand/50 italic">{p.stormy}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JCU Connection Note */}
      <section className="py-12 border-t" style={{ borderColor: "oklch(0.62 0.18 195 / 0.12)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto glass-ocean rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={18} className="text-coral-reef" />
              <h3 className="font-lola-display font-700 text-sand text-xl">The JCU Advantage</h3>
            </div>
            <p className="font-lola-body text-sm text-sand/60 leading-relaxed mb-4">
              You're not just a volunteer — you're a JCU Marine Biology student. That changes everything. The Coral Nurture Program was developed with JCU researchers. Reef Check Australia has a formal partnership with JCU. The GBRMPA is headquartered in Townsville and has active relationships with JCU students.
            </p>
            <p className="font-lola-body text-sm text-sand/60 leading-relaxed">
              Before you leave on any trip, email your lecturers and ask: "Are there any volunteer programs you'd recommend for the April break?" You may find that one of these programs has a direct JCU contact who can fast-track your involvement — or that your participation could count toward a research unit.
            </p>
          </div>
        </div>
      </section>

      {/* Back to routes */}
      <section className="py-16">
        <div className="container text-center">
          <p className="font-lola-mono text-xs tracking-widest uppercase text-reef-teal/60 mb-4">Ready to hit the road?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/north">
              <button className="btn-reef inline-flex items-center gap-2 px-6 py-3 rounded-full font-lola-body text-sm">
                North ↑ Cairns & Daintree
              </button>
            </Link>
            <Link href="/south">
              <button className="glass-ocean inline-flex items-center gap-2 px-6 py-3 rounded-full font-lola-body text-sm text-sand/70 hover:text-reef-teal transition-colors">
                South ↓ Whitsundays
              </button>
            </Link>
            <Link href="/wildcard-rainforest">
              <button className="glass-ocean inline-flex items-center gap-2 px-6 py-3 rounded-full font-lola-body text-sm text-sand/70 hover:text-reef-teal transition-colors">
                Wild Card 1 · Hidden Gems
              </button>
            </Link>
            <Link href="/wildcard-outback">
              <button className="glass-ocean inline-flex items-center gap-2 px-6 py-3 rounded-full font-lola-body text-sm text-sand/70 hover:text-reef-teal transition-colors">
                Wild Card 2 · Lava Tubes
              </button>
            </Link>
          </div>
        </div>
      </section>

      <LolaFooter />
    </div>
  );
}
