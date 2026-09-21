import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Phone } from 'lucide-react';

interface FooterContactDeskProps {
  isFloating?: boolean;
}

export default function FooterContactDesk({ isFloating = false }: FooterContactDeskProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. FLOATING QUICK CONNECT BUTTONS: ALWAYS-ON TOP TO BOTTOM OF PAGE
  // Mounted directly to document.body via Portal to bypass any parent relative/overflow/transform container
  if (isFloating) {
    if (!mounted || typeof document === 'undefined') {
      return null;
    }

    const floatingElements = (
      <>
        {/* Left Side: Direct Call Button with Halo and Alert Badge */}
        <div
          id="floating-call-container"
          className="always-on-floating-call group"
          style={{
            position: 'fixed',
            bottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
            left: '16px',
            zIndex: 2147483647,
            WebkitTransform: 'translate3d(0, 0, 0)',
            transform: 'translate3d(0, 0, 0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
            pointerEvents: 'auto',
          }}
        >
          {/* Halo background */}
          <div className="absolute -inset-2 bg-emerald-500/25 group-hover:bg-emerald-500/40 rounded-full blur-[2px] transition-all pointer-events-none" />
          
          <a
            href="tel:+919425022518"
            className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0A5230] hover:bg-[#063D22] text-white shadow-2xl active:scale-90 transition-all border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
            aria-label="Call +91 9425022518"
            id="floating-call-btn"
            title="Call +91 9425022518"
          >
            {/* Phone Icon */}
            <Phone className="w-6 h-6 text-white fill-white" />
            
            {/* Orange Alert Indicator Dot at Top-Left */}
            <span
              className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-[#FF5722] rounded-full border-2 border-white shadow-md animate-pulse"
              title="Online now"
            />
          </a>
        </div>

        {/* Right Side: Direct WhatsApp Button with Halo and Alert Badge */}
        <div
          id="floating-whatsapp-container"
          className="always-on-floating-whatsapp group"
          style={{
            position: 'fixed',
            bottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
            right: '16px',
            zIndex: 2147483647,
            WebkitTransform: 'translate3d(0, 0, 0)',
            transform: 'translate3d(0, 0, 0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
            pointerEvents: 'auto',
          }}
        >
          {/* Halo background */}
          <div className="absolute -inset-2 bg-[#25D366]/25 group-hover:bg-[#25D366]/40 rounded-full blur-[2px] transition-all pointer-events-none" />
          
          <a
            href="https://wa.me/919425022518?text=Hello%20Praveen%20Engineers,%20I%20would%20like%20to%20inquire%20about%20industrial%20sourcing%20solutions."
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl active:scale-90 transition-all border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-green-400/50"
            aria-label="Chat on WhatsApp"
            id="floating-whatsapp-btn"
            title="Chat on WhatsApp"
          >
            {/* WhatsApp SVG Icon */}
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            
            {/* Orange Alert Indicator Dot at Top-Right */}
            <span
              className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF5722] rounded-full border-2 border-white shadow-md animate-pulse"
              title="Online now"
            />
          </a>
        </div>
      </>
    );

    return createPortal(floatingElements, document.body);
  }

  // 2. STATIC FOOTER INLINE BAR VERSION: Icons at Left End and Right End
  return (
    <div className="w-full pt-6 border-t border-slate-800/80 mt-6 pb-2" id="footer-contact-desk">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-4">
        {/* LEFT END: Green Call Button with Halo and Orange Dot */}
        <div className="relative group">
          <div className="p-2 bg-emerald-500/20 group-hover:bg-emerald-500/30 rounded-full transition-all">
            <a
              href="tel:+919425022518"
              className="w-12 h-12 rounded-full bg-[#0B462D] hover:bg-[#073522] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform relative"
              aria-label="Call +91 9425022518"
              id="footer-desk-call-btn"
              title="Call +91 9425022518"
            >
              <Phone className="w-5 h-5 text-white fill-white" />
              <span className="absolute -top-0.5 -left-0.5 w-3 h-3 bg-[#FF5722] rounded-full border-2 border-slate-900 shadow-sm" />
            </a>
          </div>
        </div>

        {/* RIGHT END: Green WhatsApp Button with Halo and Orange Dot */}
        <div className="relative group">
          <div className="p-2 bg-[#25D366]/20 group-hover:bg-[#25D366]/30 rounded-full transition-all">
            <a
              href="https://wa.me/919425022518?text=Hello%20Praveen%20Engineers,%20I%20would%20like%20to%20inquire%20about%20industrial%20sourcing%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform relative"
              aria-label="WhatsApp +91 9425022518"
              id="footer-desk-whatsapp-btn"
              title="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#FF5722] rounded-full border-2 border-slate-900 shadow-sm" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
