import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { ActivePage } from '../types';
import { CORE_VALUES, WHY_CHOOSE_US, PRODUCT_CATEGORIES } from '../data';
import DynamicIcon from './DynamicIcon';
import FAQSection from './FAQSection';
import Counter from './Counter';

interface HomeSectionProps {
  onNavigate: (page: ActivePage) => void;
  onRequestQuote: () => void;
}

export default function HomeSection({ onNavigate, onRequestQuote }: HomeSectionProps) {
  // Stats data
  const stats = [
    { value: '20+', label: 'Countries Connected', desc: 'Direct sourcing network' },
    { value: '100+', label: 'Industrial Products', desc: 'Valves, pumps, forgings & steel' },
    { value: '30+', label: 'Years Combined Expertise', desc: 'In heavy engineering' },
    { value: '100%', label: 'Technical Compliance', desc: 'Rigorous drawing-level inspection' }
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[85vh] flex items-center bg-[#E6F6ED] border-b border-brand-primary/15 overflow-hidden">
        {/* Subtle Background Image with light green overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513828583848-c25090110b82?auto=format&fit=crop&q=80&w=1600"
            alt="Industrial Sourcing Sourcing Valves & Power Plants"
            className="w-full h-full object-cover opacity-10 mix-blend-multiply"
            referrerPolicy="no-referrer"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#E6F6ED] via-[#F0FAF3]/95 to-[#E1F4EA]/90" />
          
          {/* Subtle technical background grid accent */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle, #0B462D 1.5px, transparent 1.5px)`,
            backgroundSize: '28px 28px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8 text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1.5 rounded-full text-brand-primary text-xs font-semibold tracking-wider uppercase font-mono shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <span>India's Premium Sourcing Specialists</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brand-primary tracking-tight leading-tight"
              >
                Industrial Sourcing &amp; <span className="text-brand-secondary underline decoration-brand-accent decoration-4 underline-offset-4">Global OEM Representation</span> in India
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-700 text-lg sm:text-xl max-w-2xl leading-relaxed font-sans font-medium"
              >
                Praveen Engineers connects international manufacturers with Indian industrial and government-sector opportunities through industrial sourcing, OEM representation, tender support, technical coordination and local liaison.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button
                  onClick={onRequestQuote}
                  className="bg-brand-primary hover:bg-brand-secondary text-white font-display font-semibold px-8 py-3.5 rounded-lg text-sm transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/20 flex items-center gap-2 active:scale-95 shadow-md"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('products')}
                  className="border border-brand-primary/30 bg-white/80 hover:bg-white text-slate-800 hover:text-brand-primary font-display font-semibold px-8 py-3.5 rounded-lg text-sm transition-all duration-300 flex items-center gap-2 active:scale-95 shadow-xs"
                >
                  <span>Explore Products</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

            {/* Right decorative badge column */}
            <div className="lg:col-span-4 w-full block mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/95 backdrop-blur-sm border border-brand-primary/20 p-6 sm:p-7 lg:p-8 rounded-2xl shadow-xl relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl pointer-events-none" />
                <h3 className="font-display font-bold text-brand-primary text-lg mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                  Technical Auditing
                </h3>
                <ul className="space-y-3.5 text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <span>Drawing-to-sample verification</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <span>ASTM/ASME/BIS/DIN/EN/JIS/AFNOR Grades at home</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800 block">Third-Party Inspection & Certification</span>
                      <span className="text-[11px] sm:text-xs text-slate-500 font-mono block mt-0.5 leading-snug">
                        TÜV SÜD | SGS | Lloyd’s Register | Other Accredited Agencies
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <span>Complete import logistics & clearance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <span>Tender participation & support</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANIMATED STATISTICS SECTION */}
      <section className="relative z-20 bg-white border-y border-slate-200 shadow-sm py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-2 p-5 rounded-2xl border border-slate-200/80 bg-slate-50/70 hover:bg-white active:bg-white border-b-4 border-b-brand-accent/70 hover:border-brand-accent active:border-brand-accent hover:shadow-xl active:shadow-lg transition-all duration-300 group cursor-pointer select-none touch-manipulation"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-primary group-hover:text-brand-accent group-active:text-brand-accent transition-all duration-300">
                <Counter value={stat.value} delay={idx * 150} duration={2000} />
              </div>
              <div className="text-slate-800 text-sm font-bold tracking-wide group-hover:text-brand-primary transition-colors">
                {stat.label}
              </div>
              <div className="text-slate-500 text-xs group-hover:text-slate-700 transition-colors">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT SECTION TEASER */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
                  Established in India
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-primary tracking-tight">
                  About Praveen Engineers
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed text-base">
                Praveen Engineers is an India-based engineering sourcing, import, and business development company committed to providing high-quality industrial products and engineering solutions to customers across the power, steel, oil & gas, petrochemical, cement, mining, and heavy engineering sectors.
              </p>
              
              <p className="text-slate-600 leading-relaxed text-base">
                We specialize in sourcing technically advanced products from reputed manufacturers in <strong className="text-brand-primary">Germany, Italy, Slovenia, Japan, South Korea, Taiwan, China, Canada</strong>, and other European countries. Our extensive international network enables us to provide reliable, cost-effective, and technically compliant solutions.
              </p>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="bg-brand-primary hover:bg-brand-secondary text-white font-display font-semibold px-6 py-3 rounded-lg text-sm transition-all duration-300 hover:shadow-lg active:scale-95"
                >
                  Learn More About Us
                </button>
                <button
                  onClick={() => onNavigate('sourcing')}
                  className="border border-slate-300 hover:border-brand-primary text-slate-700 font-display font-semibold px-6 py-3 rounded-lg text-sm transition-all hover:bg-slate-50 active:scale-95"
                >
                  Global Network
                </button>
              </div>
            </div>

            {/* Right Side Professional Image */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-brand-accent rounded-2xl transform translate-x-3 translate-y-3 -z-10 opacity-30" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800"
                  alt="Professional Engineering Drawing Analysis"
                  className="w-full h-[380px] object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <p className="font-mono text-xs text-brand-accent tracking-widest uppercase">Praveen Engineers</p>
                  <p className="text-sm font-semibold mt-1">Rigorous Quality Verification at Sourcing Point</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION VISION VALUES SECTION */}
      <section className="py-20 bg-white border-t border-slate-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
              Core Pillars
            </span>
            <h2 className="text-3xl font-display font-bold text-brand-primary tracking-tight">
              Mission, Vision & Core Values
            </h2>
            <p className="text-slate-500 text-sm">
              The foundational values that drive our global operations and foster domestic trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_VALUES.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group hover:-translate-y-1"
              >
                <div className="bg-brand-primary/5 group-hover:bg-brand-accent/10 w-14 h-14 rounded-lg flex items-center justify-center text-brand-primary group-hover:text-brand-primary transition-colors mb-6">
                  <DynamicIcon name={val.icon} className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-primary mb-3">
                  {val.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {val.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUICK PRODUCTS HIGHLIGHTS */}
      <section className="py-24 bg-white border-t border-slate-200/60 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-16">
            <div className="space-y-2 text-left">
              <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
                Portfolio Preview
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-brand-primary">
                High-Quality Industrial Products
              </h2>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-brand-primary hover:text-brand-accent flex items-center gap-1.5 text-sm font-semibold group self-start lg:self-end transition-colors"
            >
              <span>View Full Sourcing Catalog</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCT_CATEGORIES.slice(0, 3).map((cat) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('products')}
                className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-brand-accent/60 active:border-brand-accent/80 active:shadow-md transition-all duration-300 group cursor-pointer select-none touch-manipulation"
              >
                <div className="bg-brand-primary/10 group-hover:bg-brand-accent/20 group-active:bg-brand-accent/20 w-12 h-12 rounded-xl flex items-center justify-center text-brand-primary mb-6 transition-colors">
                  <DynamicIcon name={cat.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-primary mb-3 group-hover:text-brand-secondary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
                <ul className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                  {cat.items.slice(0, 4).map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {cat.items.length > 4 && (
                    <li className="text-brand-primary italic text-[11px] font-semibold pt-1">
                      + {cat.items.length - 4} more specialized types
                    </li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <section className="py-24 bg-white border-t border-slate-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-2">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
              Value Proposition
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-primary tracking-tight">
              Why Indian Industries Choose Us
            </h2>
            <p className="text-slate-500 text-sm">
              We operate as a technical, fully aligned international bridge, not just a procurement broker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl hover:border-brand-primary/10 transition-all duration-300 border border-slate-100/80 flex flex-col group hover:-translate-y-1"
              >
                <div className="bg-brand-primary/5 group-hover:bg-brand-accent/10 w-12 h-12 rounded-lg flex items-center justify-center text-brand-primary transition-colors mb-6">
                  <DynamicIcon name={feat.icon} className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-primary mb-3">
                  {feat.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FAQSection onNavigate={onNavigate} onRequestQuote={onRequestQuote} />

      {/* 7. COLLABORATIVE FOOTER CTA */}
      <section className="bg-gradient-to-br from-brand-secondary to-brand-primary text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-display font-bold tracking-tight">
            Ready to Connect with Premium Global Sourcing?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Send us your drawings, engineering specifications, or equipment lists. Our technical engineers will review your files and connect you directly with approved, certified overseas manufacturers.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-display font-semibold px-8 py-3.5 rounded-lg text-sm transition-all hover:shadow-xl flex items-center gap-1.5 active:scale-95"
            >
              Contact Our Engineers
            </button>
            <button
              onClick={() => onNavigate('sourcing')}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-display font-semibold px-8 py-3.5 rounded-lg text-sm transition-all active:scale-95"
            >
              Our Global Network
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
