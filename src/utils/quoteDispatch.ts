import { EnquiryFormState } from '../types';

export const OFFICIAL_WHATSAPP_NUMBER = '919425022518';
export const DISPLAY_WHATSAPP_NUMBER = '+91 9425022518';
export const OFFICIAL_EMAIL = 'info@praveenengineers.in';
export const SALES_EMAIL = 'sale@praveenengineers.in';

export interface SavedQuote {
  ticketId: string;
  timestamp: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  productRequired: string;
  message: string;
  attachmentName?: string;
  channelDispatched?: 'whatsapp' | 'email' | 'both';
}

/**
 * Generate a professional industrial ticket reference ID
 */
export const generateTicketId = (): string => {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `PE-${year}-${randomSuffix}`;
};

/**
 * Formats a clean, professional WhatsApp RFQ message for +91 9425022518
 */
export const formatQuoteWhatsAppMessage = (
  formData: EnquiryFormState,
  ticketId: string,
  industryLabel: string = ''
): string => {
  const sector = industryLabel || formData.industry || 'Industrial Sourcing';
  const lines: string[] = [
    `*NEW RFQ INQUIRY - PRAVEEN ENGINEERS*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `📋 *Ticket Ref:* ${ticketId}`,
    `👤 *Client Name:* ${formData.name}`,
    `🏢 *Company:* ${formData.company}`,
    `📱 *Phone:* ${formData.phone}`,
    `✉️ *Email:* ${formData.email}`,
    `🏭 *Sector:* ${sector}`,
    `📦 *Product Required:* ${formData.productRequired}`,
  ];

  if (formData.attachmentName) {
    lines.push(`📎 *Attachment:* ${formData.attachmentName}`);
  }

  lines.push(
    ``,
    `📝 *Technical Specifications / Message:*`,
    formData.message,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `_Sent via praveenengineers.in Request-a-Quote portal_`
  );

  return lines.join('\n');
};

/**
 * Generates direct WhatsApp URL targeting +91 9425022518
 */
export const getQuoteWhatsAppUrl = (
  formData: EnquiryFormState,
  ticketId: string,
  industryLabel: string = ''
): string => {
  const text = formatQuoteWhatsAppMessage(formData, ticketId, industryLabel);
  return `https://api.whatsapp.com/send?phone=${OFFICIAL_WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
};

/**
 * Generates clear, structured subject line for official RFQ email
 */
export const formatQuoteEmailSubject = (
  formData: EnquiryFormState,
  ticketId: string
): string => {
  return `[RFQ Inquiry #${ticketId}] ${formData.productRequired} - ${formData.company}`;
};

/**
 * Generates full professional email body text for info@praveenengineers.in
 */
export const formatQuoteEmailBody = (
  formData: EnquiryFormState,
  ticketId: string,
  industryLabel: string = ''
): string => {
  const sector = industryLabel || formData.industry || 'Industrial Sourcing';
  return `Dear Praveen Engineers Technical Sourcing Team,

Please review the following Request for Quotation (RFQ) submitted through the website portal (https://www.praveenengineers.in):

==================================================
REQUEST FOR QUOTATION (Ticket ID: ${ticketId})
==================================================
• Contact Person: ${formData.name}
• Company Name: ${formData.company}
• Corporate Email: ${formData.email}
• Phone / Mobile: ${formData.phone}
• Industry Sector: ${sector}
• Product / Requirement: ${formData.productRequired}
${formData.attachmentName ? `• Drawing / File Attached: ${formData.attachmentName}` : '• Drawing / File: No attachment (or to be shared on email/WhatsApp)'}

TECHNICAL SPECIFICATIONS & INQUIRY:
--------------------------------------------------
${formData.message}
==================================================

Please advise on availability, compliance standards, and quotation pricing.

Best regards,
${formData.name}
${formData.company}
Phone: ${formData.phone}
Email: ${formData.email}`;
};

/**
 * Direct Gmail Compose link for browser (desktop)
 */
export const getQuoteGmailComposeUrl = (
  formData: EnquiryFormState,
  ticketId: string,
  industryLabel: string = ''
): string => {
  const subject = formatQuoteEmailSubject(formData, ticketId);
  const body = formatQuoteEmailBody(formData, ticketId, industryLabel);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(OFFICIAL_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Native mailto link for mobile or standard desktop mail client
 */
export const getQuoteMailtoUrl = (
  formData: EnquiryFormState,
  ticketId: string,
  industryLabel: string = ''
): string => {
  const subject = formatQuoteEmailSubject(formData, ticketId);
  const body = formatQuoteEmailBody(formData, ticketId, industryLabel);
  return `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Save RFQ to localStorage for tracking
 */
export const saveQuoteToHistory = (quote: SavedQuote): void => {
  try {
    const existing = localStorage.getItem('pe_rfq_history');
    const list: SavedQuote[] = existing ? JSON.parse(existing) : [];
    list.unshift(quote);
    // Keep last 20 queries locally
    localStorage.setItem('pe_rfq_history', JSON.stringify(list.slice(0, 20)));
  } catch (err) {
    console.warn('Could not save quote to local storage', err);
  }
};
