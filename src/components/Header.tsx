import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onRequestQuote: () => void;
}

export default function Header({ activePage, setActivePage, onRequestQuote }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActivePage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'industries', label: 'Industries' },
    { id: 'clients', label: 'Clients' },
    { id: 'sourcing', label: 'Global Sourcing' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: ActivePage) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main navigation header */}
      <header
        id="main-header"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A5230]/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-[#0A5230] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group"
            id="logo-btn"
          >
            <div className="brand-red-badge p-2 rounded-lg font-bold text-lg leading-none flex items-center justify-center transition-transform group-hover:scale-105 shadow-md shadow-red-900/40 border border-red-500/40 shrink-0">
              PE
            </div>
            <div>
              <span className="block brand-red-text font-display font-bold text-lg sm:text-xl tracking-tight leading-none">
                PRAVEEN ENGINEERS
              </span>
              <span className="block brand-red-text font-mono text-[10px] uppercase tracking-[0.22em] leading-none mt-1 font-bold">
                Industrial Sourcing &amp; OEM Partner
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all relative ${
                  activePage === item.id
                    ? 'text-white bg-[#063D22] font-semibold border-b-2 border-[#2BB375]'
                    : 'text-slate-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Call to Action & Quick Connect */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Quick Call Button */}
            <a
              href="tel:+919425022518"
              className="p-2 rounded-lg bg-[#063D22] hover:bg-[#063D22]/80 text-[#2BB375] hover:text-white border border-[#2BB375]/40 transition-all flex items-center justify-center relative group"
              title="Call +91 9425022518"
              aria-label="Direct Phone Call"
              id="header-call-btn"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#2BB375] rounded-full border border-slate-900 animate-pulse" />
            </a>

            {/* Quick WhatsApp Button */}
            <a
              href="https://wa.me/919425022518?text=Hello%20Praveen%20Engineers,%20I%20would%20like%20to%20inquire%20about%20industrial%20sourcing%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 transition-all flex items-center justify-center relative group"
              title="Chat on WhatsApp"
              aria-label="WhatsApp Chat"
              id="header-whatsapp-btn"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#25D366] rounded-full border border-slate-900 animate-pulse" />
            </a>

            <button
              onClick={onRequestQuote}
              className="bg-[#2BB375] hover:bg-[#239C65] text-white font-display font-semibold px-5 py-2.5 rounded-lg text-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/30 flex items-center gap-1.5 active:scale-95 ml-1 border border-emerald-400/30"
              id="header-quote-btn"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Controls: Call + WhatsApp + Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Quick Call Button Mobile */}
            <a
              href="tel:+919425022518"
              className="p-2 rounded-full bg-[#0B462D] text-white shadow-md active:scale-90 transition-transform relative flex items-center justify-center border border-emerald-400/30"
              title="Call +91 9425022518"
              aria-label="Direct Phone Call"
              id="mobile-header-call-btn"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-[#FF5722] rounded-full border border-white" />
            </a>

            {/* Quick WhatsApp Button Mobile */}
            <a
              href="https://wa.me/919425022518?text=Hello%20Praveen%20Engineers,%20I%20would%20like%20to%20inquire%20about%20industrial%20sourcing%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#25D366] text-white shadow-md active:scale-90 transition-transform relative flex items-center justify-center"
              title="Chat on WhatsApp"
              aria-label="WhatsApp Chat"
              id="mobile-header-whatsapp-btn"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF5722] rounded-full border border-white" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-100 hover:text-brand-accent p-1.5 rounded-md focus:outline-none transition-colors ml-1"
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-primary/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-drawer"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-brand-secondary shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header of Drawer */}
          <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-brand-primary">
            <div className="flex items-center gap-2.5">
              <div className="brand-red-badge px-2 py-1.5 rounded font-bold text-sm shadow-sm border border-red-500/40">
                PE
              </div>
              <div>
                <span className="block brand-red-text font-display font-bold text-base leading-none">
                  PRAVEEN ENGINEERS
                </span>
                <span className="block brand-red-text font-mono text-[9px] uppercase tracking-wider leading-none mt-1 font-bold">
                  Global Sourcing Partner
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-brand-accent p-1"
              id="close-mobile-drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links inside Drawer */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors flex justify-between items-center active:text-[#DC2626] ${
                  activePage === item.id
                    ? 'bg-brand-primary text-brand-accent font-semibold border-l-4 border-brand-accent active:text-[#DC2626]'
                    : 'text-white hover:bg-slate-800 hover:text-brand-accent active:text-[#DC2626]'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-slate-500">→</span>
              </button>
            ))}
          </div>

          {/* Quick Connect Actions in Drawer */}
          <div className="px-4 py-3 bg-slate-900/60 border-t border-slate-700/60 grid grid-cols-2 gap-2.5">
            <a
              href="tel:+919425022518"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#0B462D] hover:bg-[#073522] text-white text-xs font-semibold shadow-md active:scale-95 transition-all border border-emerald-500/30"
              id="drawer-call-btn"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Call Direct</span>
            </a>
            <a
              href="https://wa.me/919425022518?text=Hello%20Praveen%20Engineers,%20I%20would%20like%20to%20inquire%20about%20industrial%20sourcing%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
              id="drawer-whatsapp-btn"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>

          {/* CTA & Contact in Drawer */}
          <div className="p-4 border-t border-slate-700 bg-brand-primary space-y-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-display font-semibold py-3 px-4 rounded-lg text-sm text-center block transition-all"
              id="drawer-quote-btn"
            >
              Request a Quote
            </button>
            <div className="text-center text-xs text-slate-400 space-y-1">
              <p>info@praveenengineers.in | sale@praveenengineers.in</p>
              <p>+91 9425022518 | +91 79747 31954</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
