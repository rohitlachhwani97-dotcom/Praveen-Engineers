import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Award, MessageSquare } from 'lucide-react';
import Counter from './Counter';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  designation: string;
  company: string;
  sector: string;
  verifiedSourcing: string;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Praveen Engineers has been our trusted sourcing partner for critical high-temperature actuated control valves and specialized forgings. Their ability to deliver complete material traceability under EN 10204 3.1 certification has saved our procurement teams countless hours of inspection delays.",
    author: "Senior General Manager (Procurement & Contracts)",
    designation: "Power & Heavy Electricals Sector",
    company: "Leading Industrial Enterprise",
    sector: "Power & Heavy Engineering",
    verifiedSourcing: "DIN Control Valves & Actuators",
    date: "March 2026"
  },
  {
    id: 2,
    quote: "For our thermal power expansion units, we required urgent replacement of heavy-load spherical roller bearings manufactured in Japan. Praveen Engineers coordinated with the OEM, managed consolidated air cargo freight, and cleared customs within 8 days. Their responsiveness is unmatched.",
    author: "Chief General Manager (Mechanical Maintenance)",
    designation: "Thermal Power Generation Enterprise",
    company: "Public Sector Energy Enterprise",
    sector: "Power Generation",
    verifiedSourcing: "High-Load Bearings (Japan Source)",
    date: "May 2026"
  },
  {
    id: 3,
    quote: "Importing high-yield steel alloy plates for steel mill blast furnaces is a rigorous technical challenge. Praveen Engineers meticulously reviewed our design drawings, collaborated with international foundries to eliminate chemical mismatch errors, and handled the door-to-door logistics seamlessly.",
    author: "Senior Manager (Materials Management)",
    designation: "Integrated Steel & Metallurgy Enterprise",
    company: "Steel & Heavy Metallurgy",
    sector: "Steel & Metallurgy",
    verifiedSourcing: "Alloy Steel Plates",
    date: "February 2026"
  },
  {
    id: 4,
    quote: "We were looking for specialized explosion-proof electromagnetic coils matching ATEX/IECEx compliance. Not only did Praveen Engineers procure these from European manufacturers under strict timelines, but they also facilitated a third-party inspection that gave us total quality confidence.",
    author: "Executive Director (Hydro Engineering Spares)",
    designation: "Hydroelectric Energy Corporation",
    company: "Renewable Energy Sector",
    sector: "Renewable Hydro Energy",
    verifiedSourcing: "ATEX Certified Solenoid Coils",
    date: "January 2026"
  },
  {
    id: 5,
    quote: "Our heavy fabrication units require flawless execution of Rate Contract agreements with European OEMs. Praveen Engineers acts as an invaluable localized technical liaison, translating intricate customer specs, verifying Mill certificates, and ensuring zero-deviation logistics.",
    author: "Head of Global Sourcing (Heavy Engineering)",
    designation: "Heavy Infrastructure & Engineering Enterprise",
    company: "Heavy Engineering Conglomerate",
    sector: "Infrastructure & Heavy Engineering",
    verifiedSourcing: "Custom Heavy Forged Shafts & Seals",
    date: "June 2026"
  }
];

// Purely client remarks for horizontal slider (no brand/company logos)
const QUICK_QUOTES = [
  { quote: "Flawless technical alignment with complex DIN parameters and material specifications." },
  { quote: "Japan bearing air-cargo delivery in just 8 days during critical plant shutdown." },
  { quote: "High-pressure API 6D pipeline valves delivered with full MTC compliance." },
  { quote: "Pre-verified EN 10204 3.1 MTC certificates with zero metallurgical errors." },
  { quote: "Outstanding ATEX / IECEx certified coils sourcing from European OEMs." },
  { quote: "Reliable rate contract execution & seamless door-to-door port clearing." },
  { quote: "Consolidated freight containers reduced our overall landing costs by 18%." },
  { quote: "European OEM spares arrived pre-inspected, tagged, and ready for immediate assembly." }
];

export default function ClientTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay intervals for active testimonial slider
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="py-20 bg-white text-slate-800 border-t border-slate-200 relative overflow-hidden" id="client-testimonials-section">
      {/* Decorative background gradients */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
            <span>Partner Testimonials</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-brand-primary">
            What Industrial Leaders Say
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Honest feedback from senior procurement officers and engineering heads representing India's heavy sectors.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              <span className="text-amber-500 font-bold font-display text-sm">
                <Counter value="4.9" duration={1800} />/5
              </span>
              <span className="text-slate-500">PSU Rating</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              <span className="text-brand-primary font-bold font-display text-sm">
                <Counter value="98%" duration={2000} delay={150} />
              </span>
              <span className="text-slate-500">On-Time Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              <span className="text-emerald-700 font-bold font-display text-sm">
                <Counter value="100%" duration={2200} delay={300} />
              </span>
              <span className="text-slate-500">MTC Pass Rate</span>
            </div>
          </div>
        </div>

        {/* 1. SEAMLESS HORIZONTAL SCROLLING QUICK-QUOTES TICKER */}
        <div className="mb-14 overflow-hidden py-3.5 bg-slate-50 border-y border-slate-200 relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-6 animate-infinite-scroll w-max hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {/* Double the array for seamless endless looping */}
            {[...QUICK_QUOTES, ...QUICK_QUOTES].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2.5 bg-white border border-slate-200/90 px-4 py-2.5 rounded-xl text-left shadow-2xs"
              >
                <div className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                  <Quote className="w-2.5 h-2.5 text-brand-primary" />
                </div>
                <p className="text-xs text-slate-700 italic font-medium leading-normal whitespace-nowrap">
                  "{item.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. DYNAMIC MAIN TESTIMONIAL CARD CAROUSEL */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12 mt-4">
          <div className="relative bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden min-h-[360px] sm:min-h-[290px] flex flex-col justify-between">
            {/* Giant quote mark behind the card */}
            <Quote className="absolute -top-6 -left-6 w-36 h-36 text-slate-100 rotate-180 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="space-y-6 text-left relative z-10"
              >
                {/* Meta details (Sector and Sourced Spec Badge) */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-[10px] tracking-wide font-bold uppercase px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified: {current.verifiedSourcing}</span>
                  </span>
                  
                  <span className="bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px] px-2.5 py-1 rounded-md">
                    {current.sector}
                  </span>
                </div>

                {/* Testimonial Quote paragraph */}
                <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-medium">
                  "{current.quote}"
                </p>

                {/* Author profile and compliance credentials */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-slate-100 pt-5">
                  <div>
                    <h4 className="text-brand-primary font-display font-bold text-sm sm:text-base tracking-wide">
                      {current.author}
                    </h4>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {current.designation}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-slate-500 text-[10px] sm:text-xs font-mono self-end sm:self-center">
                    <span className="bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[10px] flex items-center gap-1">
                      <Award className="w-3 h-3 text-brand-primary" />
                      <span>Verified Industry Remark</span>
                    </span>
                    <span>{current.date}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider visual progress line */}
            <div className="absolute bottom-0 inset-x-0 h-[3px] bg-slate-100 overflow-hidden">
              <motion.div 
                key={`progress-${activeIndex}`}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: autoplay ? 8.0 : 0.1, ease: 'linear' }}
                className="h-full bg-brand-primary"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center sm:justify-between items-center mt-6 gap-4 sm:absolute sm:-inset-x-6 sm:top-1/2 sm:-translate-y-1/2 sm:mt-0 sm:pointer-events-none">
            <button
              onClick={handlePrev}
              className="bg-white hover:bg-brand-primary hover:text-white text-slate-600 p-2.5 rounded-full border border-slate-200 shadow-md transition-all hover:scale-110 active:scale-95 sm:pointer-events-auto"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Mobile dots indicators */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAutoplay(false);
                    setActiveIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-6 bg-brand-primary' : 'w-2 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-white hover:bg-brand-primary hover:text-white text-slate-600 p-2.5 rounded-full border border-slate-200 shadow-md transition-all hover:scale-110 active:scale-95 sm:pointer-events-auto"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer client alignment trust note */}
        <div className="mt-14 max-w-lg mx-auto bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-3.5 text-left">
          <div className="bg-brand-primary/10 p-2 rounded-lg shrink-0">
            <ShieldCheck className="w-5 h-5 text-brand-primary" />
          </div>
          <p className="text-[11px] text-slate-600 leading-normal font-mono uppercase tracking-wider">
            All feedback is verified under active purchase orders & third-party pre-inspection protocols.
          </p>
        </div>

      </div>

      {/* Global CSS Inject for seamless marquee marquee effect */}
      <style>{`
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .animate-infinite-scroll {
          animation: infiniteScroll 45s linear infinite;
        }
      `}</style>
    </section>
  );
}
