import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, CheckCircle, MapPin, Mail, Phone } from 'lucide-react';
import { getGmailComposeUrl, handleEmailClick } from '../utils/email';

export type LegalModalType = 'privacy' | 'terms';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LegalModalType;
  setType: (type: LegalModalType) => void;
}

export default function LegalModal({ isOpen, onClose, type, setType }: LegalModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#063D22] text-slate-100 rounded-2xl sm:rounded-3xl shadow-2xl border border-emerald-600/40 overflow-hidden flex flex-col max-h-[90vh] z-10"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#0A5230] border-b border-emerald-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="brand-red-badge p-2.5 rounded-xl font-bold text-sm shadow-md border border-red-500/40 shrink-0">
                PE
              </div>
              <div>
                <h3 id="legal-modal-title" className="text-white font-display font-bold text-lg sm:text-xl leading-tight">
                  Praveen Engineers Legal Desk
                </h3>
                <p className="text-brand-accent font-mono text-[11px] uppercase tracking-wider mt-0.5">
                  Corporate Governance &amp; Compliance (Bhopal, MP)
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:static p-2 rounded-full bg-black/20 hover:bg-red-600/80 text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-emerald-800/60 bg-[#073522] px-4 pt-2 gap-2 shrink-0">
            <button
              onClick={() => setType('privacy')}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 ${
                type === 'privacy'
                  ? 'bg-[#063D22] text-brand-accent border-brand-accent'
                  : 'text-slate-300 hover:text-white border-transparent hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => setType('terms')}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 ${
                type === 'terms'
                  ? 'bg-[#063D22] text-brand-accent border-brand-accent'
                  : 'text-slate-300 hover:text-white border-transparent hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Terms of Sourcing &amp; Procurement</span>
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-4 sm:p-6 sm:px-8 overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed text-slate-200">
            {type === 'privacy' ? (
              /* PRIVACY POLICY CONTENT */
              <div className="space-y-6">
                <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800/50">
                  <p className="text-slate-300 font-medium">
                    <strong className="text-brand-accent">Effective Date:</strong> January 2026 |{' '}
                    <strong className="text-brand-accent">Entity:</strong> Praveen Engineers, Bhopal, MP, India.
                  </p>
                  <p className="mt-1 text-slate-300 text-xs">
                    Praveen Engineers is committed to safeguarding the commercial, technical, and personal information entrusted to us by client enterprises, suppliers, and procurement engineers.
                  </p>
                </div>

                <section className="space-y-2">
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    1. Information Collection &amp; Technical Drawings
                  </h4>
                  <p className="text-slate-300">
                    We collect relevant corporate details solely for responding to Requests for Quotation (RFQs), including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
                    <li>Contact person’s name, professional email, phone number, and company name.</li>
                    <li>Technical product specifications, engineering drawings (CAD/PDF), operating pressure, temperatures, and alloy requirements.</li>
                    <li>Delivery plant location and consignee destination for accurate freight and customs estimation.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    2. Non-Disclosure &amp; Proprietary Engineering Data
                  </h4>
                  <p className="text-slate-300">
                    We respect proprietary manufacturing data. All CAD drawings, bill of materials (BOM), and custom engineering parameters shared with us are treated as strictly confidential. We share these specifications only with approved European, Japanese, or global OEM manufacturing partners strictly for the purpose of technical evaluation and quoting.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    3. Zero Third-Party Selling or Spam
                  </h4>
                  <p className="text-slate-300">
                    Praveen Engineers <strong className="text-brand-accent">NEVER sells, rents, or leases</strong> your email address, phone numbers, or corporate records to third-party marketing brokers or telemarketers. Communication from our desk is strictly restricted to ongoing quotations, order confirmations, dispatch notices, and technical support.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    4. Cookies &amp; Tracking Technology
                  </h4>
                  <p className="text-slate-300">
                    Our website does not deploy third-party advertising cookies, retargeting pixels, or intrusive tracking scripts. Only essential session technologies necessary for fast, smooth web performance are utilized.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    5. Legal Jurisdiction &amp; Inquiries
                  </h4>
                  <p className="text-slate-300">
                    This Privacy Policy is governed in accordance with the Information Technology Act of India. For privacy concerns or data access requests, contact our Bhopal head office at{' '}
                    <a
                      href={getGmailComposeUrl('info@praveenengineers.in', 'Privacy & Legal Inquiry - Praveen Engineers')}
                      onClick={(e) => handleEmailClick(e, 'info@praveenengineers.in', 'Privacy & Legal Inquiry - Praveen Engineers')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-accent underline hover:text-yellow-300 transition-colors"
                      title="Open in Gmail"
                    >
                      info@praveenengineers.in
                    </a>.
                  </p>
                </section>
              </div>
            ) : (
              /* TERMS OF SOURCING & PROCUREMENT CONTENT */
              <div className="space-y-6">
                <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-800/50">
                  <p className="text-slate-300 font-medium">
                    <strong className="text-brand-accent">Scope of Engagement:</strong> Industrial Sourcing, Importation, OEM Representation &amp; Technical Coordination.
                  </p>
                  <p className="mt-1 text-slate-300 text-xs">
                    These Terms govern all requests for quotation, procurement orders, international shipments, and technical support provided by Praveen Engineers.
                  </p>
                </div>

                <section className="space-y-2">
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    1. Quotations &amp; Validity
                  </h4>
                  <p className="text-slate-300">
                    All formal commercial quotations are provided based on current raw material indices (LME, ferroalloy indexes) and international currency exchange rates. Unless specifically noted otherwise, quotations remain valid for 30 calendar days from the date of issue.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    2. Quality Standards, MTCs &amp; Testing
                  </h4>
                  <p className="text-slate-300">
                    All imported valves, pumps, bearings, forgings, and steel materials are sourced from certified global manufacturing lines conforming to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
                    <li>EN 10204 3.1 or 3.2 Material Test Certificates (MTC) stating chemical &amp; mechanical properties.</li>
                    <li>Hydrostatic pressure testing, ultrasonic (UT), radiography (RT), and magnetic particle inspection (MPI) where required by client specifications.</li>
                    <li>Third-party inspection (TPI) by agencies such as TÜV, Lloyd’s Register, Bureau Veritas, DNV, or SGS upon mutual agreement.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    3. Delivery, Shipping Terms &amp; Customs
                  </h4>
                  <p className="text-slate-300">
                    Shipments are managed under standard Incoterms (CIF, FOB, Ex-Works, or Door Delivery DDP). Transit times for sea freight (typically 12–35 days depending on port of origin) or expedited air freight are coordinated closely with Indian customs clearing agents. Praveen Engineers is not liable for delays arising from natural calamities, global shipping line port congestion, or regulatory customs holds outside our control (Force Majeure).
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    4. Warranty &amp; OEM Guarantee
                  </h4>
                  <p className="text-slate-300">
                    All components carry standard OEM manufacturer warranties against manufacturing defects (typically 12 months from commissioning or 18 months from supply date). Praveen Engineers acts as the local liaison to facilitate warranty claims, root-cause failure analysis, and replacement parts directly with the overseas factory.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-accent shrink-0" />
                    5. Legal Jurisdiction
                  </h4>
                  <p className="text-slate-300">
                    All commercial transactions, Purchase Orders, and contracts entered with Praveen Engineers are governed strictly under the laws of the Republic of India. Any legal dispute or arbitration shall fall under the exclusive jurisdiction of the competent Courts at <strong className="text-white">Bhopal, Madhya Pradesh</strong>.
                  </p>
                </section>
              </div>
            )}
          </div>

          {/* Footer of Modal */}
          <div className="p-4 sm:p-5 bg-[#0A5230] border-t border-emerald-800/60 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                Lalghati, Bhopal (MP)
              </span>
              <a href="tel:+919425022518" className="flex items-center gap-1.5 hover:text-brand-accent transition-colors">
                <Phone className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                +91 9425022518
              </a>
              <a
                href={getGmailComposeUrl('info@praveenengineers.in', 'Industrial Sourcing Inquiry - Praveen Engineers')}
                onClick={(e) => handleEmailClick(e, 'info@praveenengineers.in', 'Industrial Sourcing Inquiry - Praveen Engineers')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-brand-accent transition-colors"
                title="Open in Gmail"
              >
                <Mail className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                info@praveenengineers.in
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 bg-brand-accent hover:bg-yellow-400 text-brand-primary font-display font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all active:scale-95"
            >
              I Understand / Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
