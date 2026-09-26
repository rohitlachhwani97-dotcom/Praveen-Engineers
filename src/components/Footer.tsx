import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { ActivePage } from '../types';
import FooterContactDesk from './FooterContactDesk';
import { getGmailComposeUrl, handleEmailClick } from '../utils/email';

interface FooterProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onBackToTop: () => void;
  onOpenLegalModal: (type: 'privacy' | 'terms') => void;
}

export default function Footer({ activePage, setActivePage, onBackToTop, onOpenLegalModal }: FooterProps) {
  const quickLinks: { id: ActivePage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Our Products' },
    { id: 'industries', label: 'Industries We Serve' },
    { id: 'clients', label: 'Our Clients' },
    { id: 'sourcing', label: 'Global Sourcing' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (pageId: ActivePage) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A5230] text-slate-300 border-t border-emerald-900/60 pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative z-10 text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-700/50">
        
        {/* Brand Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="flex items-center gap-2">
            <div className="bg-brand-accent text-brand-primary px-2.5 py-1.5 rounded-lg font-bold text-base leading-none">
              PE
            </div>
            <span className="text-white font-display font-bold text-lg tracking-tight">
              Praveen Engineers
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Commitment to delivering world-class engineering sourcing, raw materials import, and localized technical liaison support for India's leading power, steel, chemical, and heavy sectors.
          </p>
        </div>

        {/* Quick Links Column (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`hover:text-brand-accent transition-colors block text-left ${
                    activePage === link.id ? 'text-brand-accent font-semibold' : 'text-slate-400 hover:text-brand-accent'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">
            Our Products
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><button onClick={() => handleNavClick('products')} className="hover:text-brand-accent">Industrial Valves</button></li>
            <li><button onClick={() => handleNavClick('products')} className="hover:text-brand-accent">Heavy Pumps</button></li>
            <li><button onClick={() => handleNavClick('products')} className="hover:text-brand-accent">Industrial Bearings</button></li>
            <li><button onClick={() => handleNavClick('products')} className="hover:text-brand-accent">Forgings & Castings</button></li>
            <li><button onClick={() => handleNavClick('products')} className="hover:text-brand-accent">Steel Plates</button></li>
            <li><button onClick={() => handleNavClick('products')} className="hover:text-brand-accent">PTFE Lined Bearing Pads</button></li>
            <li><button onClick={() => handleNavClick('products')} className="hover:text-brand-accent">Cooling Tubes</button></li>
          </ul>
        </div>

        {/* Contact Info Column (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">
            Contact Information
          </h4>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <span>
                4, Hamilton Court, Airport Road,<br />
                Lalghati, Bhopal, Madhya Pradesh, India
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-brand-accent shrink-0 mt-1" />
              <div className="flex flex-col gap-1.5">
                <a
                  href="https://wa.me/919425022518?text=Hello%20Praveen%20Engineers,%20I%20would%20like%20to%20inquire%20about%20industrial%20sourcing%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-brand-accent transition-colors font-medium text-xs sm:text-sm text-slate-300"
                  title="WhatsApp & Call: +91 9425022518"
                >
                  {/* WhatsApp SVG Icon */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-[#25D366] fill-current shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>+91 9425022518</span>
                </a>
                <a
                  href="tel:+917974731954"
                  className="hover:text-brand-accent transition-colors font-medium text-xs sm:text-sm text-slate-300"
                >
                  +91 79747 31954
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <a
                  href={getGmailComposeUrl('info@praveenengineers.in', 'Industrial Sourcing Inquiry - Praveen Engineers')}
                  onClick={(e) => handleEmailClick(e, 'info@praveenengineers.in', 'Industrial Sourcing Inquiry - Praveen Engineers')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent transition-colors"
                  title="Open directly in Gmail"
                >
                  info@praveenengineers.in
                </a>
                <a
                  href={getGmailComposeUrl('sale@praveenengineers.in', 'RFQ Purchase Enquiry - Praveen Engineers')}
                  onClick={(e) => handleEmailClick(e, 'sale@praveenengineers.in', 'RFQ Purchase Enquiry - Praveen Engineers')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent transition-colors"
                  title="Open directly in Gmail"
                >
                  sale@praveenengineers.in
                </a>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>
          © 2026 Praveen Engineers. All rights reserved under legal copyright act.
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => onOpenLegalModal('privacy')}
            className="hover:text-brand-accent transition-colors cursor-pointer text-xs focus:outline-none"
            id="footer-privacy-btn"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onOpenLegalModal('terms')}
            className="hover:text-brand-accent transition-colors cursor-pointer text-xs focus:outline-none"
            id="footer-terms-btn"
          >
            Terms of Sourcing
          </button>
          <button
            onClick={onBackToTop}
            className="flex items-center gap-1 bg-slate-800 hover:bg-brand-accent hover:text-brand-primary px-3 py-1.5 rounded-lg text-[10px] text-slate-400 uppercase tracking-widest font-semibold font-mono border border-slate-700/60 transition-colors"
            id="back-to-top-footer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* QUICK CONNECT ICONS AT LEFT AND RIGHT ENDS */}
      <FooterContactDesk isFloating={false} />
    </footer>
  );
}
