import { Globe2, ArrowRight } from 'lucide-react';
import Counter from './Counter';

interface GlobalSourcingSectionProps {
  onRequestQuote?: (criteria: string) => void;
}

export default function GlobalSourcingSection({ onRequestQuote }: GlobalSourcingSectionProps) {
  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(244,180,0,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.25em] font-semibold">
            Connecting India to Global Manufacturers
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight">
            Global Sourcing Expertise
          </h1>
          <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2" />
        </div>
      </section>

      {/* Narrative Section explaining sourcing expertise */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
                Bridging Continents
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary tracking-tight">
                Your Direct Conduit to Certified Overseas Engineering
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  Industrial procurement is no longer restricted by local boundaries. However, language barriers, timezone disparities, varying engineering codes (DIN, ASME, JIS), and complex customs rules make direct importing extremely tedious for Indian buyers.
                </p>
                <p>
                  <strong>Praveen Engineers</strong> solves this by acting as your dedicated sourcing agent. We maintain active liaison networks and strong commercial contracts with approved, certified manufacturers across major industrial nations:
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-xs sm:text-sm text-brand-primary font-bold mt-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <li className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span>Germany</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span>Italy</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span>Japan</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span>South Korea</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span>Taiwan</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span>China</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span>Canada</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span>Slovenia</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span>USA</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                    <span>Europe</span>
                  </li>
                </ul>
                <p className="pt-2">
                  Our service takes care of the entire lifecycle: from translating local drawings to matching overseas vendor lists, coordinating third-party inspections at origin, consolidating freight in sea containers, customs clearance, and road transport directly to your assembly bays in India.
                </p>
              </div>
            </div>

            {/* Right Side Smart Global Logistics Card */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200/90 text-left space-y-4 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />
                <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-bold block">
                  Logistics Excellence
                </span>
                <h3 className="text-2xl font-display font-bold text-brand-primary tracking-tight">
                  Smart Global Logistics
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  From cost-effective freight consolidation to urgent air courier services, we deliver the right logistics solution for every project requirement.
                </p>

                {/* Animated Logistics Counters */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200/80 my-3">
                  <div>
                    <div className="text-xl font-display font-bold text-brand-primary">
                      <Counter value="12+" duration={1800} />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">Export Hubs</div>
                  </div>
                  <div>
                    <div className="text-xl font-display font-bold text-brand-primary">
                      <Counter value="100%" duration={2000} delay={150} />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">Insured Cargo</div>
                  </div>
                  <div>
                    <div className="text-xl font-display font-bold text-brand-primary">
                      <Counter value="24/7" duration={1600} delay={300} />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">Support Desk</div>
                  </div>
                </div>

                {onRequestQuote && (
                  <button
                    onClick={() => onRequestQuote('Global Sourcing General Inquiry')}
                    className="mt-4 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-semibold py-2.5 px-5 rounded-xl transition-all flex items-center gap-2"
                  >
                    <span>Inquire Sourcing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
