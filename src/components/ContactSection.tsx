import { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Globe, Clock, Upload, FileText, Send, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { EnquiryFormState } from '../types';
import { INDUSTRIES } from '../data';

interface ContactSectionProps {
  prefilledProduct?: string;
}

export default function ContactSection({ prefilledProduct = '' }: ContactSectionProps) {
  const [formData, setFormData] = useState<EnquiryFormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'power-plants', // Default selected
    productRequired: prefilledProduct,
    message: '',
    attachmentName: ''
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Field change handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Drag and drop attachment handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFormData(prev => ({
        ...prev,
        attachmentName: file.name
      }));
    }
  };

  // Manual file upload handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        attachmentName: file.name
      }));
    }
  };

  // Trigger manual input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Remove attachment
  const removeAttachment = () => {
    setFormData(prev => ({
      ...prev,
      attachmentName: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API request submission
    setIsSubmitted(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      industry: 'power-plants',
      productRequired: '',
      message: '',
      attachmentName: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(244,180,0,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.25em] font-semibold">
            Get in Touch with Sourcing Engineers
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight">
            Contact Us
          </h1>
          <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2" />
        </div>
      </section>

      {/* Main Sourcing Consultation Form & Details */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Side: Office & Corporate Address Details */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-3">
                <span className="text-brand-accent font-mono text-xs uppercase tracking-[0.2em] font-semibold block">
                  Head Office Address
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-primary tracking-tight">
                  Praveen Engineers
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We look forward to partnering with your engineering and purchase departments. Reach out directly or complete the technical RFQ checklist on the right.
                </p>
              </div>

              {/* Contact Icons List */}
              <div className="space-y-6">
                {/* Physical Location */}
                <div className="flex gap-4">
                  <div className="bg-brand-primary/5 w-11 h-11 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-primary">Corporate Head Office</h4>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                      4, Hamilton Court,<br />
                      Airport Road, Lalghati,<br />
                      Bhopal, Madhya Pradesh, India
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex gap-4">
                  <div className="bg-brand-primary/5 w-11 h-11 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                    <Phone className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-primary">Technical Sourcing Phone</h4>
                    <p className="text-slate-600 text-sm mt-1 flex flex-col gap-0.5">
                      <a href="tel:+919425022518" className="hover:text-brand-accent transition-colors font-semibold">
                        +91 9425022518 (Call / WhatsApp)
                      </a>
                      <a href="tel:+917974731954" className="hover:text-brand-accent transition-colors font-medium text-slate-500">
                        +91 79747 31954
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex gap-4">
                  <div className="bg-brand-primary/5 w-11 h-11 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                    <Mail className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-primary">Official RFQ Emails</h4>
                    <div className="text-slate-600 text-sm mt-1 space-y-1 flex flex-col">
                      <a href="mailto:info@praveenengineers.in" className="hover:text-brand-accent transition-colors font-semibold">
                        info@praveenengineers.in
                      </a>
                      <a href="mailto:sale@praveenengineers.in" className="hover:text-brand-accent transition-colors font-semibold">
                        sale@praveenengineers.in
                      </a>
                    </div>
                  </div>
                </div>

                {/* Website */}
                <div className="flex gap-4">
                  <div className="bg-brand-primary/5 w-11 h-11 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                    <Globe className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-primary">Web Domain</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      <a href="https://www.praveenengineers.in" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors font-semibold">
                        www.praveenengineers.in
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-4">
                  <div className="bg-brand-primary/5 w-11 h-11 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                    <Clock className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-primary">Corporate Operating Hours</h4>
                    <div className="text-slate-600 text-sm mt-1 space-y-0.5">
                      <p><span className="font-medium text-slate-800">Monday – Saturday:</span> 8 AM to 8 PM</p>
                      <p><span className="font-medium text-slate-800">Sunday:</span> Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Professional Sourcing Enquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-xl border border-slate-200/60">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="enquiry-form"
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="border-b border-slate-100 pb-4 mb-4">
                      <h3 className="font-display font-bold text-brand-primary text-lg">Send Sourcing Enquiry</h3>
                      <p className="text-xs text-slate-400 mt-1">Fields marked with * are required for quotation drafting.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="form-name" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                          Your Name *
                        </label>
                        <input
                          id="form-name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                        />
                      </div>

                      {/* Company Field */}
                      <div>
                        <label htmlFor="form-company" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                          Company Name *
                        </label>
                        <input
                          id="form-company"
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="e.g. Larsen & Toubro"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email Field */}
                      <div>
                        <label htmlFor="form-email" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                          Corporate Email *
                        </label>
                        <input
                          id="form-email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. r.kumar@company.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                        />
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label htmlFor="form-phone" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                          Phone / Mobile *
                        </label>
                        <input
                          id="form-phone"
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Industry Dropdown */}
                      <div>
                        <label htmlFor="form-industry" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                          Sectors We Serve
                        </label>
                        <select
                          id="form-industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                        >
                          {INDUSTRIES.map(ind => (
                            <option key={ind.id} value={ind.id}>
                              {ind.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Product Required Input */}
                      <div>
                        <label htmlFor="form-product" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                          Products Required *
                        </label>
                        <input
                          id="form-product"
                          type="text"
                          name="productRequired"
                          required
                          value={formData.productRequired}
                          onChange={handleInputChange}
                          placeholder="e.g. Solenoid Valves, PTFE Bearings"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label htmlFor="form-message" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                        Message / Sourcing Requirements Details *
                      </label>
                      <textarea
                        id="form-message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please include drawing dimensions, ASTM codes, materials types, and target quantity requirements..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      />
                    </div>

                    {/* Attachment Drag & Drop Upload Block */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                        Drawings or RFQ Attachments (DWG, PDF, XLS, ZIP)
                      </label>
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".dwg,.dxf,.pdf,.xls,.xlsx,.doc,.docx,.zip,.rar"
                        id="form-file-hidden"
                      />

                      {formData.attachmentName ? (
                        /* Selected file representation */
                        <div className="bg-brand-primary/5 border-2 border-dashed border-brand-accent rounded-2xl p-5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-brand-accent/20 text-brand-accent p-2 rounded-lg">
                              <FileText className="w-5 h-5 text-brand-primary" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold text-brand-primary truncate max-w-[200px] sm:max-w-[320px]">
                                {formData.attachmentName}
                              </p>
                              <p className="text-[10px] text-slate-400">Attached successfully and ready to secure send</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeAttachment}
                            className="text-slate-400 hover:text-red-500 p-1.5 rounded-full hover:bg-slate-100 transition-all"
                            id="remove-file-attachment"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        /* Empty state dropzone */
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={triggerFileInput}
                          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
                            isDragging
                              ? 'border-brand-accent bg-brand-accent/5'
                              : 'border-slate-300 hover:border-brand-primary/50 hover:bg-slate-50'
                          }`}
                          id="attachment-dropzone"
                        >
                          <Upload className="w-8 h-8 text-slate-400" />
                          <p className="text-sm font-semibold text-slate-700">
                            Drag and drop drawings here, or <span className="text-brand-primary font-bold">browse files</span>
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Maximum file size: 25MB (PDF, DWG, DXF, ZIP, EXCEL)
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-brand-primary hover:bg-brand-accent hover:text-brand-primary text-white font-display font-bold py-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-accent/20 active:scale-[0.99]"
                      id="submit-enquiry-form"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Secure Sourcing Request</span>
                    </button>
                  </motion.form>
                ) : (
                  /* Success State Card overlay */
                  <motion.div
                    key="success-card"
                    className="py-12 text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 border-2 border-green-200">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-2xl text-brand-primary">Secure RFQ Submitted Successfully</h3>
                      <p className="text-slate-500 text-sm max-w-md mx-auto">
                        Thank you, <strong className="text-slate-700">{formData.name}</strong>. Your sourcing drawings and technical specifications have been registered.
                      </p>
                    </div>

                    {/* Summary box of details */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left max-w-md mx-auto space-y-3.5 text-xs sm:text-sm">
                      <p className="font-semibold text-slate-400 uppercase tracking-widest text-[10px] border-b border-slate-200 pb-2">Enquiry Summary</p>
                      <div><span className="text-slate-400 font-medium">Company:</span> <span className="font-semibold text-slate-800">{formData.company}</span></div>
                      <div><span className="text-slate-400 font-medium">Product Required:</span> <span className="font-semibold text-slate-800">{formData.productRequired}</span></div>
                      {formData.attachmentName && (
                        <div><span className="text-slate-400 font-medium">File Attached:</span> <span className="font-semibold text-brand-primary">{formData.attachmentName}</span></div>
                      )}
                      <div><span className="text-slate-400 font-medium">Direct Ticket Ref:</span> <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">PE-2026-{(Math.floor(Math.random() * 8999) + 1000)}</span></div>
                    </div>

                    <div className="pt-2 text-slate-500 text-xs">
                      <p>Our industrial engineering procurement desk will review your files</p>
                      <p className="font-semibold text-brand-primary mt-1">We will respond with compliance notes and quotation options within 24 business hours.</p>
                    </div>

                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-1.5 border border-slate-300 hover:border-brand-primary text-slate-600 hover:text-brand-primary text-xs font-semibold py-2.5 px-6 rounded-xl transition-all"
                      id="reset-form-btn"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Map Placeholder */}
      <section className="py-12 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h3 className="text-lg font-display font-bold text-brand-primary">Corporate Geographic Coordinate Location</h3>
            <p className="text-xs text-slate-500">Visit our head office at 4, Hamilton Court, Airport Road, Lalghati, Bhopal, Madhya Pradesh, India</p>
          </div>

          {/* Premium Google Map Component */}
          <div className="bg-white rounded-3xl p-3 shadow-lg border border-slate-300 relative overflow-hidden h-[380px]">
            <div className="absolute inset-0 z-0">
              <iframe
                title="Praveen Engineers Head Office Location Map"
                src="https://maps.google.com/maps?q=4%2C%20Hamilton%20Court%2C%20Airport%20Road%2C%20Lalghati%2C%20Bhopal%2C%20Madhya%20Pradesh%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 rounded-2xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {/* Floating marker summary card */}
            <div className="absolute bottom-6 left-6 z-10 bg-brand-primary/95 backdrop-blur text-white p-4 rounded-2xl shadow-xl border border-white/10 max-w-[300px] hidden sm:block text-left">
              <h4 className="font-display font-bold text-brand-accent text-sm">Praveen Engineers</h4>
              <p className="text-[11px] text-slate-300 mt-1">4, Hamilton Court, Airport Road, Lalghati, Bhopal, Madhya Pradesh, India</p>
              <p className="text-[10px] text-brand-accent font-mono uppercase tracking-wider mt-2.5">Sourcing Headquarters</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
