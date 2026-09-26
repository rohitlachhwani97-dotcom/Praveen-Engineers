import { useState, useRef, useEffect, DragEvent, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Phone, Mail, Globe, Clock, Upload, FileText, Send, 
  CheckCircle2, ShieldCheck, X, Copy, Check, ExternalLink, ArrowRight, MessageSquare,
  AlertTriangle, Lock 
} from 'lucide-react';
import { EnquiryFormState } from '../types';
import { INDUSTRIES } from '../data';
import { getGmailComposeUrl, handleEmailClick } from '../utils/email';
import { 
  OFFICIAL_WHATSAPP_NUMBER, 
  DISPLAY_WHATSAPP_NUMBER, 
  OFFICIAL_EMAIL, 
  generateTicketId, 
  getQuoteWhatsAppUrl, 
  getQuoteGmailComposeUrl, 
  getQuoteMailtoUrl, 
  formatQuoteWhatsAppMessage, 
  formatQuoteEmailBody, 
  saveQuoteToHistory 
} from '../utils/quoteDispatch';
import { 
  validateAttachment, 
  sanitizeInput, 
  isSpamSubmission 
} from '../utils/security';

// WhatsApp icon SVG component
const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.32C9.37 7.32 9.12 7.38 8.9 7.62C8.68 7.86 8.07 8.43 8.07 9.6C8.07 10.77 8.92 11.89 9.04 12.05C9.16 12.21 10.7 14.58 13.06 15.6C13.62 15.84 14.06 15.99 14.4 16.1C14.96 16.28 15.48 16.25 15.88 16.19C16.33 16.12 17.26 15.62 17.45 15.08C17.65 14.54 17.65 14.08 17.59 13.98C17.53 13.88 17.37 13.82 17.13 13.7C16.89 13.58 15.7 13 15.48 12.92C15.26 12.84 15.1 12.8 14.94 13.04C14.78 13.28 14.32 13.82 14.18 13.98C14.04 14.14 13.9 14.16 13.66 14.04C13.42 13.92 12.65 13.67 11.73 12.85C11.02 12.22 10.54 11.44 10.4 11.2C10.26 10.96 10.38 10.83 10.5 10.71C10.61 10.6 10.75 10.42 10.87 10.28C10.99 10.14 11.03 10.04 11.11 9.88C11.19 9.72 11.15 9.58 11.09 9.46C11.03 9.34 10.57 8.21 10.38 7.75C10.19 7.3 10 7.36 9.86 7.35C9.73 7.34 9.58 7.32 9.53 7.32Z" />
  </svg>
);

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
  const [ticketId, setTicketId] = useState('');
  const [dispatchedChannel, setDispatchedChannel] = useState<'whatsapp' | 'email' | 'both'>('whatsapp');
  const [copied, setCopied] = useState(false);

  // Security & Anti-Spam States (Background Protection)
  const [fileError, setFileError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState<string>('');
  const [spamWarning, setSpamWarning] = useState<string | null>(null);
  const renderTimestamp = useRef<number>(Date.now());
  
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get human readable industry name
  const currentIndustryName = INDUSTRIES.find(i => i.id === formData.industry)?.name || formData.industry;

  // Field change handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (spamWarning) setSpamWarning(null);
  };

  // File validator and processor
  const processUploadedFile = (file: File) => {
    setFileError(null);
    const validation = validateAttachment(file);

    if (!validation.isValid) {
      setFileError(validation.errorMessage || 'Invalid file uploaded. Executable and dangerous files are blocked.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setFormData(prev => ({ ...prev, attachmentName: '' }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      attachmentName: validation.sanitizedName || file.name
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
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  // Manual file upload handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadedFile(e.target.files[0]);
    }
  };

  // Trigger manual input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Remove attachment
  const removeAttachment = () => {
    setFileError(null);
    setFormData(prev => ({
      ...prev,
      attachmentName: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Core submission dispatcher to WhatsApp or Email
  const handleDispatch = (channel: 'whatsapp' | 'email') => {
    setSpamWarning(null);

    // 1. Native HTML5 validation
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    // 2. Anti-Spam Bot Detection (Invisible Honeypot & Submission Speed)
    const botCheck = isSpamSubmission(honeypot, renderTimestamp.current);
    if (botCheck.isSpam) {
      setSpamWarning('Security Alert: Automated or instantaneous bot submission detected. Please submit manually.');
      return;
    }

    // 3. Strict Sanitization against XSS & script injection
    const cleanFormData: EnquiryFormState = {
      name: sanitizeInput(formData.name),
      company: sanitizeInput(formData.company),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      industry: formData.industry,
      productRequired: sanitizeInput(formData.productRequired),
      message: sanitizeInput(formData.message),
      attachmentName: formData.attachmentName ? sanitizeInput(formData.attachmentName) : ''
    };

    const currentTicket = ticketId || generateTicketId();
    setTicketId(currentTicket);
    setDispatchedChannel(channel);

    // Save sanitized record to local storage for tracking
    saveQuoteToHistory({
      ticketId: currentTicket,
      timestamp: new Date().toISOString(),
      name: cleanFormData.name,
      company: cleanFormData.company,
      email: cleanFormData.email,
      phone: cleanFormData.phone,
      industry: currentIndustryName,
      productRequired: cleanFormData.productRequired,
      message: cleanFormData.message,
      attachmentName: cleanFormData.attachmentName,
      channelDispatched: channel
    });

    // Launch preferred channel
    if (channel === 'whatsapp') {
      const waUrl = getQuoteWhatsAppUrl(cleanFormData, currentTicket, currentIndustryName);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } else {
      const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = getQuoteMailtoUrl(cleanFormData, currentTicket, currentIndustryName);
      } else {
        const emailUrl = getQuoteGmailComposeUrl(cleanFormData, currentTicket, currentIndustryName);
        window.open(emailUrl, '_blank', 'noopener,noreferrer');
      }
    }

    setIsSubmitted(true);
  };

  // Form submit handler defaults to WhatsApp
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleDispatch('whatsapp');
  };

  // Copy full inquiry to clipboard
  const handleCopyInquiry = () => {
    const formatted = formatQuoteEmailBody(formData, ticketId, currentIndustryName);
    navigator.clipboard.writeText(formatted).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(err => {
      console.warn('Clipboard write failed', err);
    });
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
    setTicketId('');
    setFileError(null);
    setSpamWarning(null);
    setHoneypot('');
    renderTimestamp.current = Date.now();
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
                      <a
                        href={getGmailComposeUrl('info@praveenengineers.in', 'Industrial Sourcing Inquiry - Praveen Engineers')}
                        onClick={(e) => handleEmailClick(e, 'info@praveenengineers.in', 'Industrial Sourcing Inquiry - Praveen Engineers')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-accent transition-colors font-semibold"
                        title="Open directly in Gmail"
                      >
                        info@praveenengineers.in
                      </a>
                      <a
                        href={getGmailComposeUrl('sale@praveenengineers.in', 'RFQ Purchase Enquiry - Praveen Engineers')}
                        onClick={(e) => handleEmailClick(e, 'sale@praveenengineers.in', 'RFQ Purchase Enquiry - Praveen Engineers')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-accent transition-colors font-semibold"
                        title="Open directly in Gmail"
                      >
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
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="border-b border-slate-100 pb-4 mb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-brand-primary text-lg">Send Sourcing Enquiry</h3>
                        <span className="text-[11px] font-mono font-medium text-brand-primary/80 bg-brand-primary/5 px-2.5 py-1 rounded-full border border-brand-primary/10">
                          Direct WhatsApp & Email Routing
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Fields marked with * are required for quotation drafting.</p>
                    </div>

                    {/* Anti-Spam Hidden Honeypot Field (Inaccessible to real users, catches automated bots) */}
                    <div
                      style={{
                        opacity: 0,
                        position: 'absolute',
                        top: 0,
                        left: '-9999px',
                        height: 0,
                        width: 0,
                        overflow: 'hidden',
                        pointerEvents: 'none'
                      }}
                      aria-hidden="true"
                    >
                      <label htmlFor="form-website-check">Leave this field blank</label>
                      <input
                        id="form-website-check"
                        type="text"
                        name="hp_website_check"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
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

                    {/* Attachment Drag & Drop Upload Block with Anti-Spam & Hack Protection */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                          Drawings or RFQ Attachments (DWG, DXF, STEP, PDF, XLS)
                        </label>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Malware & Spam Filtered</span>
                        </span>
                      </div>
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".dwg,.dxf,.step,.stp,.iges,.igs,.pdf,.xls,.xlsx,.csv,.doc,.docx,.png,.jpg,.jpeg,.webp,.zip,.rar"
                        id="form-file-hidden"
                      />

                      {/* File Security Rejection Alert */}
                      {fileError && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700 flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold block">Attachment Blocked (Security Protection)</span>
                            <p className="mt-0.5 text-[11px] text-red-600">{fileError}</p>
                          </div>
                        </div>
                      )}

                      {formData.attachmentName ? (
                        /* Selected file representation with security check badge */
                        <div className="bg-brand-primary/5 border-2 border-dashed border-emerald-500/80 rounded-2xl p-5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-emerald-100 text-emerald-700 p-2.5 rounded-xl">
                              <ShieldCheck className="w-5 h-5 text-emerald-700" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold text-brand-primary truncate max-w-[200px] sm:max-w-[320px]">
                                {formData.attachmentName}
                              </p>
                              <p className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Validated Safe CAD/Document • Ready to Dispatch
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeAttachment}
                            className="text-slate-400 hover:text-red-500 p-1.5 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
                            id="remove-file-attachment"
                            title="Remove attachment"
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
                          <p className="text-[10px] text-slate-400 max-w-sm">
                            Approved: CAD (.dwg, .dxf, .step), Documents (.pdf, .xls), Images (.png, .jpg). Max 15MB.
                            <br />
                            <span className="text-slate-400 font-medium">Executable & spam files (.exe, .bat, scripts) are strictly prohibited.</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Security Warning Notification (Honeypot or Bot Rate Triggered) */}
                    {spamWarning && (
                      <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold block">Anti-Spam Verification</span>
                          <p className="mt-0.5 text-[11px] text-amber-700">{spamWarning}</p>
                        </div>
                      </div>
                    )}

                    {/* Dual Dispatch Submit Action Buttons */}
                    <div className="space-y-3 pt-2">
                      <p className="text-xs font-semibold text-slate-600">
                        Select how you would like to send your inquiry:
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* 1. WhatsApp Button (Primary) */}
                        <button
                          type="button"
                          onClick={() => handleDispatch('whatsapp')}
                          className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-display font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
                          id="submit-rfq-whatsapp"
                          title="Instant chat with technical team on +91 9425022518"
                        >
                          <WhatsAppIcon className="w-5 h-5 shrink-0" />
                          <span>Send via WhatsApp (+91 9425022518)</span>
                        </button>

                        {/* 2. Official Email Button */}
                        <button
                          type="button"
                          onClick={() => handleDispatch('email')}
                          className="w-full bg-brand-primary hover:bg-brand-accent hover:text-brand-primary text-white font-display font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
                          id="submit-rfq-email"
                          title="Draft RFQ directly to info@praveenengineers.in"
                        >
                          <Mail className="w-4 h-4 shrink-0" />
                          <span>Send to info@praveenengineers.in</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Protected by 256-bit encryption, honeypot filters, and Praveen Engineers' official procurement desk.</span>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  /* Success State & Multi-Channel Action Hub */
                  <motion.div
                    key="success-card"
                    className="py-6 text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 border-2 border-green-200 shadow-inner">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-mono text-xs font-semibold text-brand-primary uppercase tracking-wider bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">
                        Ticket Ref: {ticketId}
                      </span>
                      <h3 className="font-display font-bold text-2xl text-brand-primary pt-2">
                        Sourcing Enquiry Ready for Dispatch
                      </h3>
                      <p className="text-slate-500 text-sm max-w-lg mx-auto">
                        Thank you, <strong className="text-slate-800">{formData.name}</strong>. Your inquiry for <strong className="text-brand-primary">{formData.productRequired}</strong> is ready. Click below to connect via WhatsApp or Email:
                      </p>
                    </div>

                    {/* Dual Action Dispatch Hub */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
                      {/* WhatsApp Dispatch Card */}
                      <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-4.5 flex flex-col justify-between space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-[#25D366] text-white p-2.5 rounded-xl shrink-0">
                            <WhatsAppIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#128C7E] uppercase tracking-wider">Instant Chat Desk</h4>
                            <p className="text-sm font-bold text-slate-800 mt-0.5">{DISPLAY_WHATSAPP_NUMBER}</p>
                            <p className="text-[11px] text-slate-500 mt-1">Pre-formatted inquiry ready to send in 1 click.</p>
                          </div>
                        </div>

                        <a
                          href={getQuoteWhatsAppUrl(formData, ticketId, currentIndustryName)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow"
                          id="confirm-open-whatsapp"
                        >
                          <WhatsAppIcon className="w-4 h-4" />
                          <span>Open in WhatsApp</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                        </a>
                      </div>

                      {/* Official Email Dispatch Card */}
                      <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-4.5 flex flex-col justify-between space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-brand-primary text-white p-2.5 rounded-xl shrink-0">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">Official RFQ Inbox</h4>
                            <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">{OFFICIAL_EMAIL}</p>
                            <p className="text-[11px] text-slate-500 mt-1">Direct Gmail compose or default mail client.</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <a
                            href={getQuoteGmailComposeUrl(formData, ticketId, currentIndustryName)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-brand-primary hover:bg-brand-accent hover:text-brand-primary text-white font-bold text-xs py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all"
                            id="confirm-open-gmail"
                            title="Open pre-filled RFQ in Gmail"
                          >
                            <span>Open Gmail</span>
                            <ExternalLink className="w-3 h-3 opacity-70" />
                          </a>
                          <a
                            href={getQuoteMailtoUrl(formData, ticketId, currentIndustryName)}
                            className="flex-1 border border-slate-300 hover:border-brand-primary text-slate-700 hover:text-brand-primary font-bold text-xs py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all bg-white"
                            id="confirm-open-mailto"
                            title="Open with Outlook, Apple Mail or phone app"
                          >
                            <span>Mail App</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Copy to Clipboard option */}
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={handleCopyInquiry}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-primary bg-slate-100 hover:bg-slate-200/80 px-4 py-2 rounded-xl transition-all"
                        id="copy-inquiry-btn"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-green-700 font-bold">Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-slate-500" />
                            <span>Copy Inquiry Summary Text</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Technical Drawings Notice */}
                    {formData.attachmentName && (
                      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-left max-w-xl mx-auto flex items-start gap-3">
                        <div className="bg-amber-100 text-amber-800 p-2 rounded-lg shrink-0 mt-0.5">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="text-xs text-amber-900 leading-relaxed">
                          <p className="font-bold">Attached Drawing: {formData.attachmentName}</p>
                          <p className="text-amber-800/90 mt-0.5">
                            Please attach this file directly in the opened WhatsApp chat or email thread so our engineering team can review the tolerances and CAD dimensions.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Summary box of details */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-xl mx-auto space-y-2.5 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <p className="font-semibold text-slate-400 uppercase tracking-widest text-[10px]">Registered Inquiry Summary</p>
                        <span className="font-mono text-slate-500">{ticketId}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                        <div><span className="text-slate-400">Company:</span> <strong className="text-slate-900">{formData.company}</strong></div>
                        <div><span className="text-slate-400">Contact:</span> <strong className="text-slate-900">{formData.name}</strong></div>
                        <div><span className="text-slate-400">Phone:</span> <span className="font-mono">{formData.phone}</span></div>
                        <div><span className="text-slate-400">Email:</span> <span className="font-mono truncate">{formData.email}</span></div>
                        <div><span className="text-slate-400">Industry:</span> <span>{currentIndustryName}</span></div>
                        <div><span className="text-slate-400">Product:</span> <strong className="text-brand-primary">{formData.productRequired}</strong></div>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-slate-400">Message / Specs:</span>
                        <p className="text-slate-800 italic mt-0.5 whitespace-pre-wrap">{formData.message}</p>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={resetForm}
                        className="inline-flex items-center gap-1.5 border border-slate-300 hover:border-brand-primary text-slate-600 hover:text-brand-primary text-xs font-semibold py-2.5 px-6 rounded-xl transition-all"
                        id="reset-form-btn"
                      >
                        <span>Submit Another Sourcing Request</span>
                      </button>
                    </div>
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
