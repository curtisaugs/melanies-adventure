import { Shell, Heart } from "lucide-react";
import { Link } from "wouter";

export default function LolaFooter() {
  return (
    <footer
      className="border-t py-12"
      style={{
        background: "oklch(0.12 0.07 220)",
        borderColor: "oklch(0.62 0.18 195 / 0.15)",
      }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="glass-reef w-8 h-8 rounded-lg flex items-center justify-center">
              <Shell size={14} className="text-reef-teal" />
            </div>
            <div>
              <div className="font-lola-display text-sm font-700 text-sand">Lola's Adventure</div>
              <div className="font-lola-mono text-[0.55rem] tracking-[0.18em] uppercase text-reef-teal/60">
                Queensland · April 2026
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { label: "Home", href: "/" },
              { label: "North ↑", href: "/north" },
              { label: "South ↓", href: "/south" },
              { label: "Rainforest", href: "/wildcard-rainforest" },
              { label: "Outback", href: "/wildcard-outback" },
              { label: "Volunteer", href: "/marine-volunteer" },
              { label: "Scout AI", href: "/scout" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="font-lola-body text-xs tracking-widest uppercase text-sand/40 hover:text-reef-teal transition-colors cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 text-sand/30">
            <span className="font-lola-mono text-xs">Made with</span>
            <Heart size={11} className="text-coral-reef fill-coral-reef" />
            <span className="font-lola-mono text-xs">by Dad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
