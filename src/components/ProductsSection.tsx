import { useState, useMemo } from 'react';
import { ArrowRight, Search, CheckCircle2, ShieldCheck, Layers, FileText } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data';
import DynamicIcon from './DynamicIcon';
import Counter from './Counter';

interface ProductsSectionProps {
  onRequestQuoteWithProduct: (productName: string) => void;
}

export default function ProductsSection({ onRequestQuoteWithProduct }: ProductsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Filtered categories based on search or selected filter
  const filteredCategories = useMemo(() => {
    return PRODUCT_CATEGORIES.filter((category) => {
      const matchesFilter = activeCategoryFilter === 'all' || category.id === activeCategoryFilter;
      if (!matchesFilter) return false;

      if (!searchTerm.trim()) return true;

      const term = searchTerm.toLowerCase();
      const titleMatch = category.title.toLowerCase().includes(term);
      const descriptionMatch = category.description.toLowerCase().includes(term);
      const itemsMatch = category.items.some((item) => item.toLowerCase().includes(term));

      return titleMatch || descriptionMatch || itemsMatch;
    });
  }, [searchTerm, activeCategoryFilter]);

  // Total count of distinct products across all categories
  const totalItemCount = useMemo(() => {
    return PRODUCT_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(244,180,0,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.25em] font-semibold">
            Certified Sourcing & Supply Portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight">
            Our Products & Engineering Sourcing
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            High-integrity forgings, precision shafts, heavy castings, power components, valves, bearings, and certified steel plates sourced globally for Indian industries.
          </p>
          <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2" />
        </div>
      </section>

      {/* Main Sourcing Scope Section */}
      <section className="py-16 bg-slate-50/70 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Section Heading & Key Metrics */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
              Arranged by Scope of Supply
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary tracking-tight">
              Comprehensive Product Portfolio
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We specialize in technical sourcing, inspection coordination, import logistics, and supply of certified heavy industrial products.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="bg-white px-3.5 py-1.5 rounded-full border border-slate-200/90 text-xs font-semibold text-slate-700 shadow-xs">
                <span className="text-brand-primary font-bold mr-1">
                  <Counter value="8" duration={1200} />
                </span>
                Core Categories
              </div>
              <div className="bg-white px-3.5 py-1.5 rounded-full border border-slate-200/90 text-xs font-semibold text-slate-700 shadow-xs">
                <span className="text-brand-primary font-bold mr-1">
                  <Counter value={`${totalItemCount}+`} duration={1600} delay={100} />
                </span>
                Standard Products
              </div>
              <div className="bg-white px-3.5 py-1.5 rounded-full border border-slate-200/90 text-xs font-semibold text-slate-700 shadow-xs">
                <span className="text-brand-primary font-bold mr-1">
                  <Counter value="100%" duration={1800} delay={200} />
                </span>
                MTC Certified
              </div>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, forgings, turbine shafts, bearings, valves, plates..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-all text-slate-800"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
              <button
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategoryFilter === 'all'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Products ({PRODUCT_CATEGORIES.length})
              </button>
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategoryFilter === cat.id
                      ? 'bg-brand-primary text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Product Arrangement List / Table matching PDF structure */}
          <div className="space-y-4">
            {filteredCategories.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-xl mx-auto space-y-3">
                <Search className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-slate-700 font-semibold">No products found matching "{searchTerm}"</p>
                <p className="text-xs text-slate-500">
                  Try checking your spelling or view all categories. We also provide bespoke custom sourcing for unlisted items.
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setActiveCategoryFilter('all'); }}
                  className="text-xs text-brand-primary font-bold hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredCategories.map((cat, idx) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-brand-accent/60 transition-all duration-200 overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-7 items-center">
                    
                    {/* Left Column: Category Name, Icon & Overview */}
                    <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                          <DynamicIcon name={cat.icon} className="w-5 h-5 text-brand-primary" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-brand-accent font-bold block">
                            Category 0{idx + 1}
                          </span>
                          <h3 className="text-lg sm:text-xl font-display font-bold text-brand-primary leading-tight">
                            {cat.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed pt-1">
                        {cat.description}
                      </p>
                      <div className="pt-2">
                        <button
                          onClick={() => onRequestQuoteWithProduct(`${cat.title} (General Sourcing)`)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-accent transition-colors"
                        >
                          <span>Request Quote for {cat.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Products & Components List (Exact match to PDF) */}
                    <div className="lg:col-span-8">
                      <div className="flex flex-wrap gap-2.5">
                        {cat.items.map((item, itemIdx) => (
                          <button
                            key={itemIdx}
                            onClick={() => onRequestQuoteWithProduct(`${item} (${cat.title})`)}
                            title={`Click to inquire about ${item}`}
                            className="group inline-flex items-center gap-2 bg-slate-50 hover:bg-brand-primary hover:text-white text-slate-800 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-xl border border-slate-200/80 transition-all duration-200 active:scale-98 shadow-2xs hover:shadow-xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:bg-white shrink-0" />
                            <span>{item}</span>
                            <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                          </button>
                        ))}
                      </div>

                      {/* Quality Assurance Note per category */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>MTC, Third-Party Inspection & Technical Drawing Compliance Available</span>
                        </span>
                        <span className="font-mono text-slate-400 font-semibold hidden sm:inline">
                          {cat.items.length} items listed
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick PDF-Style Clean Table View */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mt-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-brand-accent font-mono text-xs uppercase tracking-widest font-bold block">
                  Quick Reference Sheet
                </span>
                <h3 className="text-xl font-display font-bold text-brand-primary">
                  Master Sourcing & Supply Scope Summary
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                <FileText className="w-4 h-4 text-brand-primary" />
                <span>Standard NIT / PSU Sourcing Nomenclature</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                    <th className="py-3 px-4 w-1/3">Product Category</th>
                    <th className="py-3 px-4 w-2/3">Scope of Products & Components</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PRODUCT_CATEGORIES.map((cat, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-brand-primary align-top">
                        <div className="flex items-center gap-2">
                          <DynamicIcon name={cat.icon} className="w-4 h-4 text-brand-accent shrink-0" />
                          <span>{cat.title}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {cat.items.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* Large Custom Sourcing CTA */}
      <section className="bg-brand-primary text-white py-20 px-4">
        <div className="max-w-5xl mx-auto bg-brand-secondary/60 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-left">
              <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
                Tailor-made procurement
              </span>
              <h2 className="text-3xl font-display font-bold tracking-tight">
                Need Custom Engineering Products?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                If your requirement is not listed, or if you need custom-fabricated castings, forgings, or high-tolerance components, our specialist sourcing network can find and deliver it. Send us your drawings (DWG, DXF, or PDF format) today.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <button
                onClick={() => onRequestQuoteWithProduct('Custom Engineering Sourcing RFQ')}
                className="w-full lg:w-auto inline-flex justify-center items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-display font-bold px-8 py-4 rounded-xl text-sm shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>Request a Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
