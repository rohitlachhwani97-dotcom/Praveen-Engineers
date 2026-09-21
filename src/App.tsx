import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { ActivePage } from './types';

// Importing Page Components
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import IndustriesSection from './components/IndustriesSection';
import ClientsSection from './components/ClientsSection';
import GlobalSourcingSection from './components/GlobalSourcingSection';
import ContactSection from './components/ContactSection';
import FooterContactDesk from './components/FooterContactDesk';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [prefilledProduct, setPrefilledProduct] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  // 1. Initial Loading Animation Progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 200); // Slight delay for buttery smooth exit
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 45);

    return () => clearInterval(timer);
  }, []);

  // 2. Track scroll to show Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Global click feedback: triggers vibrant red color on click on elements with yellow/white font, buttons, links, etc.
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        '.text-white, [class*="text-white"], .text-brand-accent, [class*="text-brand-accent"], button, a, [role="button"], h1, h2, h3, h4, span, p'
      ) as HTMLElement | null;

      if (target) {
        target.setAttribute('data-clicked', 'true');
        setTimeout(() => {
          target.removeAttribute('data-clicked');
        }, 350);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  // Back to Top execution
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Switch to contact page with pre-filled product criteria
  const handleRequestQuoteWithProduct = (productName: string) => {
    setPrefilledProduct(productName);
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // General request quote action from header or floating CTA
  const handleGeneralRequestQuote = () => {
    setPrefilledProduct('General Sourcing Quotation');
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the current active view with clean animations
  const renderActiveSection = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomeSection
            onNavigate={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRequestQuote={handleGeneralRequestQuote}
          />
        );
      case 'about':
        return <AboutSection />;
      case 'products':
        return (
          <ProductsSection
            onRequestQuoteWithProduct={handleRequestQuoteWithProduct}
          />
        );
      case 'industries':
        return (
          <IndustriesSection
            onNavigate={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'clients':
        return <ClientsSection />;
      case 'sourcing':
        return (
          <GlobalSourcingSection
            onRequestQuote={handleRequestQuoteWithProduct}
          />
        );
      case 'contact':
        return <ContactSection prefilledProduct={prefilledProduct} />;
      default:
        return (
          <HomeSection
            onNavigate={setActivePage}
            onRequestQuote={handleGeneralRequestQuote}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col font-sans selection:bg-brand-accent selection:text-brand-primary">
      
      {/* A. PREMIUM LOADING SCREEN COVER */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="portal-loader"
            className="fixed inset-0 bg-brand-primary z-[9999] flex flex-col items-center justify-center p-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full max-w-sm space-y-6 text-center">
              {/* Logo Emblem animation */}
              <div className="mx-auto w-16 h-16 bg-brand-accent text-brand-primary rounded-2xl font-bold text-2xl flex items-center justify-center shadow-lg border border-white/10 animate-bounce">
                PE
              </div>
              
              <div className="space-y-2">
                <h2 className="text-white font-display font-bold text-xl tracking-wider uppercase">
                  Praveen Engineers
                </h2>
                <p className="text-brand-accent font-mono text-[10px] tracking-[0.25em] uppercase font-semibold">
                  Sourcing & Supply Network
                </p>
              </div>

              {/* Progress Bar Container */}
              <div className="space-y-1">
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-accent rounded-full transition-all duration-75"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>ESTABLISHING SECURE CONNECTION</span>
                  <span>{Math.min(loadingProgress, 100)}%</span>
                </div>
              </div>

              <div className="text-slate-400 text-xs italic pt-4">
                "Connecting World-Class Manufacturers with Indian Industry"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* B. STICKY GLOBAL HEADER */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        onRequestQuote={handleGeneralRequestQuote}
      />

      {/* C. MAIN COMPONENT CONTAINER (With Page entrance fade animations and bottom padding on mobile for sticky bar) */}
      <main className="flex-grow w-full relative pb-16 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* D. GLOBAL FOOTER */}
      <Footer
        activePage={activePage}
        setActivePage={setActivePage}
        onBackToTop={scrollToTop}
      />

      {/* E. FLOATING INTERACTIVE UTILITIES */}

      {/* 1. ALWAYS-ON QUICK CONNECT CORNER BUTTONS (Left: Call, Right: WhatsApp - visible 100% of the time from top to bottom) */}
      <FooterContactDesk isFloating={true} />

      {/* 2. STICKY BACK-TO-TOP BUTTON (Fades in dynamically above WhatsApp button) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-22 sm:bottom-24 right-4 sm:right-6 z-40 bg-brand-primary text-white hover:bg-brand-accent hover:text-brand-primary p-3 rounded-full shadow-2xl flex items-center justify-center border border-slate-700/60 hover:border-brand-accent transition-all active:scale-95"
            aria-label="Scroll back to top"
            id="back-to-top-floating"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
