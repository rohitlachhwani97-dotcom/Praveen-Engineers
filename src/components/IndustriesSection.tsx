import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Factory } from 'lucide-react';
import { INDUSTRIES } from '../data';
import DynamicIcon from './DynamicIcon';
import { ActivePage } from '../types';
import Counter from './Counter';

interface IndustriesSectionProps {
  onNavigate: (page: ActivePage) => void;
}

const INDUSTRIAL_APPLICATIONS = [
  'Hydroelectric Power Projects (up to 800 MW generating units)',
  'Thermal Power Plants',
  'Nuclear Power Plants',
  'Steel Plants',
  'Cement Plants',
  'Mining and Mineral Processing',
  'Oil & Gas Industry',
  'Marine and Shipbuilding',
  'Wind Energy Projects',
  'Heavy Engineering Industries',
  'EPC Contractors',
  'Industrial OEMs and Equipment Manufacturers',
];

export default function IndustriesSection({ onNavigate }: IndustriesSectionProps) {
  // Map industry keys to common specific parts sourced for quick details on cards
  const industrySourcedSpares: { [key: string]: string[] } = {
    'power-plants': ['Turbine blades & rotor parts', 'Boiler pressure tubes (ASTM A213)', 'High-temperature mechanical seals'],
    'steel': ['Heavy-duty roller bearings', 'Forged ring gears', 'Chute liners & wear plates'],
    'oil-gas': ['Double-acting actuated ball valves', 'Stainless steel instrument manifolds', 'Explosion-proof safety valves'],
    'petrochemical': ['PTFE lined globe valves', 'Chemical transfer gear pumps', 'Nickel alloy piping bundles'],
    'mining': ['High-capacity vacuum pumps', 'Carbon steel wear castings', 'Alloy steel rods & pins'],
    'cement': ['Heavy structural plates', 'Thrust bearings for rotating kilns', 'Diaphragm pumps for slurry handling'],
    'heavy-engineering': ['Custom CNC shafts (up to 6m)', 'Heavy forged discs & bushings', 'Pneumatic cylinders & control blocks'],
    'infrastructure': ['Alloy steel structural plates', 'Boiler quality plates', 'Custom forged anchor rods'],
    'government': ['Full tender package assistance', 'OEM-certified replacement components', 'Strict third-party inspections (SGS, TUV)'],
    'epc': ['Consolidated valve bulk shipments', 'Custom fabrication drawings verification', 'Coordinated sea & air customs clearance'],
    'manufacturing': ['Automation proximity sensors', 'Solenoid coils (24VDC, 110VAC)', 'Precision pressure switches']
  };

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(244,180,0,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.25em] font-semibold">
            Supplying Heavy Sectors Across India
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight">
            Industries We Serve
          </h1>
          <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2" />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary tracking-tight">
              A Trusted Sourcing Pipeline
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We deliver heavy-duty components and specialized international equipment package solutions to India's most demanding primary industrial sectors.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700">
                <span className="text-brand-primary font-bold mr-1">
                  <Counter value="12+" duration={1800} />
                </span>
                Core Industrial Sectors
              </div>
              <div className="bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700">
                <span className="text-brand-primary font-bold mr-1">
                  <Counter value="800" duration={2000} delay={150} /> MW
                </span>
                Unit Generating Scale
              </div>
            </div>
          </div>

          {/* Industrial Applications Bullet List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-sm mb-16">
            <h3 className="text-base sm:text-lg font-display font-bold text-brand-primary mb-4 flex items-center gap-2">
              <Factory className="w-5 h-5 text-brand-accent shrink-0" />
              <span>Our products are supplied for a wide range of industrial applications, including:</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-700 font-medium">
              {INDUSTRIAL_APPLICATIONS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-slate-50/80 p-3 rounded-xl border border-slate-200/50">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                  <span className="leading-snug text-slate-800">
                    {item.includes('800 MW') ? (
                      <>
                        Hydroelectric Power Projects (up to <strong className="text-brand-primary font-semibold">800 MW</strong> generating units)
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES.map((ind, idx) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:border-brand-primary/10 border border-slate-200/50 overflow-hidden flex flex-col group transition-all duration-300"
              >
                {/* Image header with icon badge */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    src={ind.image}
                    alt={`${ind.name} Sourced Engineering Components`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 left-4 bg-brand-accent text-brand-primary p-2.5 rounded-xl shadow-lg flex items-center justify-center">
                    <DynamicIcon name={ind.icon} className="w-5 h-5 text-brand-primary" />
                  </div>

                  {/* Industry Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-display font-bold text-white tracking-wide">
                      {ind.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                    {ind.description}
                  </p>

                  {/* Sourced Items list */}
                  {industrySourcedSpares[ind.id] && (
                    <div className="border-t border-slate-100 pt-4 mt-auto">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                        Key Sourced Materials:
                      </h4>
                      <ul className="space-y-1.5 mb-5">
                        {industrySourcedSpares[ind.id].map((spare, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5 text-slate-600 text-xs font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                            <span>{spare}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Request Quote Button specifically for Industry */}
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full bg-slate-50 hover:bg-brand-primary hover:text-white text-brand-primary font-display font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all mt-auto border border-slate-200/50"
                  >
                    <span>Inquire for {ind.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="bg-brand-primary text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">Supporting India's Infrastructure Growth</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            By supplying premium, certified components directly from top global manufacturers, we reduce production downtime, extend equipment lifecycles, and help India's primary sectors run at full-capacity efficiency.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-display font-bold px-8 py-3.5 rounded-lg text-sm transition-all hover:shadow-lg active:scale-95"
            >
              Consult Our Sourcing Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
