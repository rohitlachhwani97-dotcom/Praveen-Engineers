import { ArrowRight } from 'lucide-react';
import Counter from './Counter';

const PRODUCT_SUPPLY_ITEMS = [
  'Carbon Steel (CS), Stainless Steel (SS), Alloy Steel, and Special Steel Plates',
  'Open Die Forgings',
  'Closed Die Forgings',
  'Forged Shafts',
  'Generator Shafts',
  'Hydro Turbine Shafts',
  'Rotor Shafts',
  'Roll Shafts',
  'Crank Shafts',
  'Propeller Shafts',
  'Turbine Shafts',
  'Forged Rings, Sleeves, Discs, and Cylinders',
  'Heavy Steel Castings',
  'Heavy Precision Machined Components',
  'Pressure Vessel Components',
  'Valve Bodies and Industrial Valves',
  'Hydro Generator Components',
  'Steam Turbine Components',
  'Wind Turbine Components',
  'Industrial Fabricated Components',
  'Mining and Metallurgical Equipment Components',
  'PTFE-Lined Thrust Bearing Pads',
  'Guide Bearing Pads',
  'White Metal (Babbitt) Bearing Pads',
  'Thrust Bearings',
  'Guide Bearings',
  'Split Bearing Assemblies',
  'Cylindrical Roller Bearings',
  'Spherical Roller Bearings',
  'Tapered Roller Bearings',
  'Deep Groove Ball Bearings',
  'Rolling Mill Bearings',
  'Slewing Bearings',
  'Large Diameter Industrial Bearings',
  'Custom Engineered Bearings',
  'Industrial Spare Parts and Critical Components',
];

interface ProductsSectionProps {
  onRequestQuoteWithProduct: (productName: string) => void;
}

export default function ProductsSection({ onRequestQuoteWithProduct }: ProductsSectionProps) {
  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(244,180,0,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.25em] font-semibold">
            Certified Technical Sourcing Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight">
            Our Sourcing & Supply Portfolio
          </h1>
          <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2" />
        </div>
      </section>

      {/* Comprehensive Equipment & Component Bullet List Section */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
              Full Supply Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary tracking-tight">
              Comprehensive Equipment & Component Portfolio
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We specialize in sourcing, importing, and supplying heavy engineering equipment, forgings, castings, bearings, and precision parts for critical infrastructure sectors.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700">
                <span className="text-brand-primary font-bold mr-1">
                  <Counter value="39+" duration={1800} />
                </span>
                Critical Components
              </div>
              <div className="bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700">
                <span className="text-brand-primary font-bold mr-1">
                  <Counter value="100%" duration={2000} delay={150} />
                </span>
                MTC Certified
              </div>
            </div>
            <div className="h-1 w-16 bg-brand-accent mx-auto rounded-full mt-2" />
          </div>

          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs sm:text-sm text-slate-700 font-medium">
              {PRODUCT_SUPPLY_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs hover:border-brand-accent/40 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                  <span className="leading-snug text-slate-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Large Custom Sourcing CTA */}
      <section className="bg-brand-primary text-white py-20 px-4">
        <div className="max-w-5xl mx-auto bg-brand-secondary/60 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-left">
              <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
                Tailor-made procurement
              </span>
              <h2 className="text-3xl font-display font-bold tracking-tight">
                Need Custom Engineering Products?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                If your requirement is not listed, or if you need custom-fabricated castings, forgings, or high-tolerance components, our specialist sourcing network can find and deliver it. Send us your drawings (DWG, DXF, or PDF format) today.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <button
                onClick={() => onRequestQuoteWithProduct('Custom Sourcing RFQ')}
                className="w-full lg:w-auto inline-flex justify-center items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-display font-bold px-8 py-4 rounded-xl text-sm shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>Request a Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
