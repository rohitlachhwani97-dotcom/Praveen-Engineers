import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, ChevronDown, Search, Globe, Ship, ShieldCheck, 
  ArrowRight, Mail, Phone, RefreshCw, CheckCircle, HelpCircle as HelpIcon 
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'sourcing' | 'logistics' | 'quality';
  icon: any;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'sourcing',
    icon: Globe,
    question: "How does Praveen Engineers select and certify overseas manufacturers?",
    answer: "We strictly partner with premium foundries, forging mills, and specialized OEMs that hold top-tier international accreditations, including ISO 9001, API, CE, and TÜV. Before any factory is onboarded, our technical team or local liaisons conduct rigorous quality capability audits, verifying machinery accuracy, furnace calibration, heat-treatment compliance, and past supply pedigree."
  },
  {
    category: 'sourcing',
    icon: Globe,
    question: "Can you procure customized industrial parts from proprietary drawings?",
    answer: "Absolutely. Drawing-to-specification sourcing is our core expertise. You can provide AutoCAD, STEP, or PDF files. Our in-house engineers review all tolerances, dimensions, material grades, and surface finishes, translating or matching standards (e.g., converting Indian IS or Japanese JIS parameters into European DIN or American ASME equivalents) to ensure absolute compliance at the overseas foundry."
  },
  {
    category: 'logistics',
    icon: Ship,
    question: "What is the typical lead time for sourcing and door-to-door delivery?",
    answer: "For standard sea freight consolidation from our central hubs in Germany (Hamburg) and Italy (Genoa) to Indian ports (Nhava Sheva/Chennai), the typical lead time is 40 to 50 days, including transit, customs clearance, and inland trucking. For critical breakdown requirements, we coordinate priority air-freight deliveries that reach your site in India in 5 to 10 working days."
  },
  {
    category: 'logistics',
    icon: Ship,
    question: "Who manages the customs clearance, port handling, and inland duties?",
    answer: "Praveen Engineers handles 100% of the logistics chain. We manage the overseas export declarations, marine freight contracts, Indian customs filing, duty payments, and coordinate final mile container-trailer delivery directly to your plant doors. You receive a unified domestic INR invoice, turning a highly complex import process into a simple local transaction."
  },
  {
    category: 'quality',
    icon: ShieldCheck,
    question: "What quality certification standards do you guarantee with shipments?",
    answer: "We ensure absolute material authenticity and traceability. All shipments of industrial valves, bearings, castings, and steel components are delivered with original Mill Test Certificates (MTC) conforming strictly to EN 10204 Type 3.1. For critical infrastructure components, we can arrange Type 3.2 certifications, requiring independent third-party witness testing."
  },
  {
    category: 'quality',
    icon: ShieldCheck,
    question: "Do you arrange third-party inspections (TPI) prior to overseas dispatch?",
    answer: "Yes. To guarantee zero defects upon arrival in India, we regularly coordinate pre-shipment inspections (PSI) with globally recognized third-party agencies, including SGS, TÜV, Lloyds Register, Bureau Veritas, and DNV, directly at the manufacturer's facility before the cargo is loaded into maritime containers."
  },
  {
    category: 'sourcing',
    icon: Globe,
    question: "Which specific countries are part of your active manufacturer network?",
    answer: "We maintain highly reliable contracts and daily communication channels with approved partner centers across Germany, Italy, Japan, Slovenia, Taiwan, South Korea, and Canada. This geographic diversity allows us to match specific component requests with the country that excels in that exact engineering specialty."
  },
  {
    category: 'quality',
    icon: ShieldCheck,
    question: "How do you handle technical deviation or material mismatch claims?",
    answer: "Due to our multi-stage drawing review and pre-dispatch inspection protocols, technical deviations are extremely rare. However, if any material fails incoming inspection at your plant, we act immediately under our OEM commercial warranty. We manage the entire communication, dispatching replacement parts via express air freight or arranging full financial credit at no extra cost to you."
  }
];

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'sourcing' | 'logistics' | 'quality'>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First item expanded by default

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFAQs = FAQ_ITEMS.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-200/60" id="faq-section">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-brand-primary" />
            <span>Customer Knowledge Base</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm">
            Everything you need to know about our global technical sourcing, custom importing process, and quality assurance protocols.
          </p>
        </div>

        {/* Search and Category Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {(['all', 'sourcing', 'logistics', 'quality'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedIndex(null); // Reset expansion to avoid confusion
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide capitalize transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10'
                    : 'text-slate-600 hover:text-brand-primary hover:bg-slate-50'
                }`}
              >
                {cat === 'all' ? 'All Queries' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setExpandedIndex(null);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-primary bg-slate-50/50"
            />
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-4 text-left">
          <AnimatePresence initial={false}>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, idx) => {
                const isExpanded = expandedIndex === idx;
                const IconComponent = faq.icon;
                
                return (
                  <motion.div
                    key={faq.question}
                    layout
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded 
                        ? 'border-brand-accent shadow-md shadow-brand-accent/5 ring-1 ring-brand-accent/20' 
                        : 'border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    {/* Header Button */}
                    <button
                      onClick={() => handleToggle(idx)}
                      className="w-full py-5 px-6 flex items-start gap-4 text-left focus:outline-none"
                      aria-expanded={isExpanded}
                    >
                      {/* Icon container */}
                      <div className={`p-2.5 rounded-xl transition-colors shrink-0 mt-0.5 ${
                        isExpanded ? 'bg-brand-accent/15 text-brand-primary font-semibold' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>

                      {/* Question Text */}
                      <div className="flex-grow pr-4">
                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mb-1">
                          {faq.category} QA
                        </span>
                        <h3 className={`text-base font-display font-bold leading-snug transition-colors ${
                          isExpanded ? 'text-brand-primary' : 'text-slate-800'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>

                      {/* Expand/Collapse Chevron */}
                      <div className="shrink-0 mt-1.5">
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                          isExpanded ? 'transform rotate-180 text-brand-primary' : ''
                        }`} />
                      </div>
                    </button>

                    {/* Answer Collapsible Area */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-6 pt-1 border-t border-slate-100 pl-16">
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 flex flex-col items-center justify-center gap-3"
              >
                <HelpIcon className="w-10 h-10 text-slate-300 animate-bounce" />
                <p className="text-sm font-medium">No questions matched your search criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="text-brand-primary text-xs font-semibold flex items-center gap-1 hover:underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset filters</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FAQ Footer Support Callout */}
        <div className="mt-14 p-6 sm:p-8 bg-brand-primary rounded-3xl text-white relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6 text-left">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(244,180,0,0.05),transparent_40%)] pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <h4 className="text-lg font-display font-bold">Have a technical project drawing or specific custom RFQ?</h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Our engineering team is ready to analyze your tolerances and connect you with certified overseas partners. Let's discuss your requirements.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              // Smooth scroll to contact or direct query action
              const contactSec = document.getElementById('contact-form');
              if (contactSec) {
                e.preventDefault();
                contactSec.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-display font-semibold py-3 px-6 rounded-xl text-xs uppercase tracking-wider shrink-0 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-brand-accent/10 relative z-10"
          >
            <span>Talk to an Engineer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
