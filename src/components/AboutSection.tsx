import { motion } from 'motion/react';
import { Target, Compass, ShieldAlert, CheckCircle, Handshake, ShieldCheck, Factory, HeartHandshake } from 'lucide-react';
import { CORE_VALUES, VALUE_LIST } from '../data';
import DynamicIcon from './DynamicIcon';
import Counter from './Counter';

const CAPABILITIES = [
  'Global sourcing of heavy engineering products and critical industrial components',
  'Import and supply of custom-manufactured products',
  'Procurement as per customer drawings, specifications, and international standards',
  'Supply of large forgings, castings, shafts, bearings, and precision-machined components',
  'Reverse engineering and manufacturing support',
  'Third-Party Inspection (TPI) coordination',
  'Material Test Certificates (EN 10204 3.1 / 3.2) and complete quality documentation',
  'Export-standard packaging and international logistics',
  'Import customs clearance and delivery coordination',
  'Technical support throughout procurement and project execution',
  'Reliable sourcing solutions for greenfield, expansion, modernization, and refurbishment projects.',
];

export default function AboutSection() {
  const businessFacets = [
    {
      title: 'For Indian Buyers',
      icon: 'Factory',
      description: 'End-to-end technical sourcing, raw material certification check, drawings compliance audit, commercial negotiations, customs handling, and last-mile logistics routing.'
    },
    {
      title: 'For Overseas Manufacturers',
      icon: 'HeartHandshake',
      description: 'Local business development, technical marketing, B2B tender participation support, local regulatory and import coordination, warehousing liaison, and first-line technical after-sales support.'
    }
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-brand-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(244,180,0,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-brand-accent font-mono text-xs uppercase tracking-[0.25em] font-semibold"
          >
            Trusted Procurement Partner
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight"
          >
            About Praveen Engineers
          </motion.h1>
          <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-4" />
        </div>
      </section>

      {/* Main Narrative Block */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image with badges */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-brand-accent rounded-3xl transform translate-x-4 translate-y-4 -z-10 opacity-20" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                  alt="Industrial Machinery Manufacturing and Engineering Solutions"
                  className="w-full h-[450px] object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Floating trust badge */}
                <div className="absolute top-6 left-6 bg-brand-primary/95 backdrop-blur-md text-white p-4 rounded-xl shadow-lg border border-white/10 max-w-[200px]">
                  <p className="text-2xl font-bold font-display text-brand-accent">
                    <Counter value="100%" duration={2000} />
                  </p>
                  <p className="text-xs text-slate-200 mt-1">Material Compliance & Testing Guarantee</p>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
                  Corporate History & Expertise
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary tracking-tight">
                  India's Dedicated Technical Liaison & Sourcing Firm
                </h2>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  <strong>Praveen Engineers</strong> specializes in the global sourcing, import, and supply of heavy engineering equipment, forgings, castings, bearings, precision-machined components, and industrial materials for hydroelectric, thermal, nuclear, steel, mining, cement, oil & gas, marine, and other critical infrastructure sectors.
                </p>
                <p>
                  Leveraging an extensive international sourcing network, we supply products manufactured in accordance with customer specifications and internationally recognized quality standards.
                </p>
                <p>
                  Praveen Engineers is committed to delivering reliable, cost-effective, and high-quality engineering solutions through a robust global sourcing network, ensuring timely delivery and dependable performance for mission-critical industrial applications.
                </p>

                {/* Our Capabilities List */}
                <div className="pt-6 border-t border-slate-200/80 space-y-4">
                  <h3 className="text-lg font-display font-bold text-brand-primary flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-accent shrink-0" />
                    <span>Our Capabilities</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    {CAPABILITIES.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 hover:bg-white transition-colors">
                        <span className="w-2 h-2 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                        <span className="leading-snug text-slate-800">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Strategy (Facets) */}
      <section className="py-20 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary tracking-tight">
              Dual-Direction Business Model
            </h2>
            <p className="text-slate-500 text-sm">
              We streamline operations for both domestic purchasers and international manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {businessFacets.map((facet, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/60 flex flex-col group"
              >
                <div className="bg-brand-primary/5 group-hover:bg-brand-accent/15 w-14 h-14 rounded-xl flex items-center justify-center text-brand-primary group-hover:text-brand-primary mb-6 transition-all">
                  {facet.title === 'For Indian Buyers' ? (
                    <Factory className="w-7 h-7 text-brand-primary" />
                  ) : (
                    <HeartHandshake className="w-7 h-7 text-brand-primary" />
                  )}
                </div>
                <h3 className="text-xl font-display font-bold text-brand-primary mb-3">
                  {facet.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {facet.description}
                </p>
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center text-brand-primary text-xs font-semibold uppercase tracking-wider gap-1 group-hover:text-brand-accent transition-colors">
                  <span>Standard Operating Protocol</span>
                  <span>✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Vision Values Cards */}
      <section className="py-24 bg-white border-t border-slate-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
              Core Direction
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary tracking-tight">
              Mission, Vision & Our Foundation Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200/50 flex flex-col"
              >
                <div className="bg-brand-primary/5 w-12 h-12 rounded-lg flex items-center justify-center text-brand-primary mb-6">
                  <DynamicIcon name={val.icon} className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-primary mb-3">
                  {val.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {val.text}
                </p>
              </div>
            ))}
          </div>

          {/* Core Values Bullet Grid */}
          <div className="mt-16 bg-brand-primary text-white rounded-2xl p-8 lg:p-12 shadow-xl border border-white/10">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-center mb-8">
              Pillars of Our Corporate Operations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {VALUE_LIST.map((val, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl text-center space-y-2 group hover:border-brand-accent/50 transition-colors">
                  <div className="mx-auto w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                    <span className="font-mono text-xs font-bold">
                      <Counter value={`0${idx+1}`} duration={1200} delay={idx * 100} />
                    </span>
                  </div>
                  <p className="text-sm font-semibold tracking-wide text-slate-100 group-hover:text-brand-accent transition-colors">
                    {val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
