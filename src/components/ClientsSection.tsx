import { motion } from 'motion/react';
import { ShieldCheck, Award, FileText, CheckCircle } from 'lucide-react';
import { CLIENTS } from '../data';
import ClientTestimonials from './ClientTestimonials';
import Counter from './Counter';

export default function ClientsSection() {
  const complianceHighlights = [
    {
      title: 'TUV / SGS Approved',
      desc: 'All parts are pre-inspected by independent third-party agencies at source prior to packaging.'
    },
    {
      title: 'Tender Registered',
      desc: 'Registered vendor in major Indian PSUs and public directories for swift procurement.'
    },
    {
      title: 'EN 10204 3.1 Certified',
      desc: 'Steel plates, forgings, and valves are delivered with full Mill Test Certificates (MTC).'
    }
  ];

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(244,180,0,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.25em] font-semibold">
            Supplying India's Industrial Leaders
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight">
            Our Client Relationships
          </h1>
          <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2" />
        </div>
      </section>

      {/* Intro Narrative */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
                Nurturing Trust
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary tracking-tight">
                Trusted by India's Leading Industrial Organizations
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Praveen Engineers has built an outstanding reputation as a reliable supplier and liaison agent to India's major public sector undertakings (PSUs) and multi-billion dollar private conglomerates. We participate actively in technical tender processes, clear multi-layered qualification criteria, and successfully execute long-term rate contracts.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Our team handles the complex commercial terms, custom clearance paperwork, and technical drawings approval cycles that are mandatory when working with large-scale players such as <strong>BHEL, NTPC, ONGC, SAIL, NHPC</strong>, and <strong>Larsen & Toubro</strong>.
              </p>

              {/* Animated Counters */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-brand-primary">
                    <Counter value="40+" duration={2000} />
                  </div>
                  <div className="text-xs text-slate-500 font-medium">PSUs & Corporates</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-brand-primary">
                    <Counter value="100%" duration={2200} delay={150} />
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Quality Compliance</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-brand-primary">
                    <Counter value="25+" duration={1800} delay={300} />
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Years in Business</div>
                </div>
              </div>
            </div>

            {/* Right Side visual statistic */}
            <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="font-display font-bold text-brand-primary text-base">Procurement Standards</h3>
                  <p className="text-xs text-slate-500 mt-1">We operate under a zero-deviation policy for quality, complying with the strict guidelines of India's heavy sectors.</p>
                </div>

                <div className="space-y-4">
                  {complianceHighlights.map((hl, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-5 h-5 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent mt-0.5 shrink-0">
                        <span className="text-brand-primary font-bold text-[10px]">✓</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-brand-primary">{hl.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{hl.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Logo Grid */}
      <section className="py-20 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5">
            {CLIENTS.map((client, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 hover:border-brand-accent text-center shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center h-48 group hover:-translate-y-1"
              >
                {/* Simulated Logo Emblem */}
                <div className="bg-brand-primary text-white font-display font-bold text-xl px-5 py-2.5 rounded-lg border-2 border-brand-accent/20 group-hover:bg-brand-secondary group-hover:border-brand-accent transition-all">
                  {client.logoText}
                </div>
                
                {/* Company Details */}
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-medium line-clamp-2">
                    {client.type}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Client Testimonials */}
      <ClientTestimonials />

      {/* Code of Conduct Quote */}
      <section className="bg-brand-primary text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <Award className="w-10 h-10 text-brand-accent mx-auto" />
          <h2 className="text-xl sm:text-2xl font-display font-bold">Uncompromising Quality Compliance</h2>
          <p className="text-slate-300 text-sm leading-relaxed italic">
            "Operating with public sectors requires more than just commercial readiness. It demands flawless compliance, rigorous documentation, zero-tolerance technical standards, and on-schedule logistic executions. Praveen Engineers takes absolute pride in maintaining this high standard."
          </p>
          <div className="text-brand-accent font-mono text-xs uppercase tracking-wider pt-2 font-bold">
            — Management, Praveen Engineers
          </div>
        </div>
      </section>
    </div>
  );
}
