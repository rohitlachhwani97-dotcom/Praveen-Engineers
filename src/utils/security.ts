/**
 * Security & Anti-Spam Guard for Praveen Engineers Web Platform
 * Protects against bot spam, malicious executable file uploads, XSS, and automated form abuse.
 */

// Allowed engineering drawings and quotation document file extensions
export const ALLOWED_FILE_EXTENSIONS = [
  'dwg', 'dxf', 'step', 'stp', 'iges', 'igs',
  'pdf', 'xls', 'xlsx', 'csv', 'doc', 'docx',
  'png', 'jpg', 'jpeg', 'webp', 'zip', 'rar'
];

// Dangerous and executable extensions that must NEVER be accepted
export const BLOCKED_FILE_EXTENSIONS = [
  'exe', 'bat', 'cmd', 'sh', 'php', 'js', 'mjs', 'cjs',
  'vbs', 'msi', 'scr', 'jar', 'html', 'htm', 'py', 'pl',
  'dll', 'com', 'ps1', 'vbe', 'wsf', 'wsh', 'hta', 'cpl',
  'reg', 'jsp', 'asp', 'aspx', 'cgi', 'bin', 'elf'
];

// Maximum upload file size: 15 Megabytes
export const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

export interface FileValidationResult {
  isValid: boolean;
  sanitizedName?: string;
  errorMessage?: string;
}

/**
 * Validates drawing and RFQ file uploads against malicious extensions,
 * double extensions, size limits, and path traversal vulnerabilities.
 */
export function validateAttachment(file: File): FileValidationResult {
  if (!file) {
    return { isValid: false, errorMessage: 'No file selected.' };
  }

  // 1. File Size check (max 15MB)
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      errorMessage: `File size too large (${sizeInMB} MB). Maximum allowed size is 15 MB to prevent server spam. Please share larger CAD models via direct link.`
    };
  }

  // 2. Sanitize filename (prevent path traversal like ../ or ../../)
  const rawName = file.name || 'document';
  const cleanName = rawName.replace(/[/\\?%*:|"<>]/g, '_').trim();

  // 3. Double extension check (e.g., drawing.dwg.exe)
  const parts = cleanName.toLowerCase().split('.');
  if (parts.length < 2) {
    return {
      isValid: false,
      errorMessage: 'File must have a valid technical extension (e.g. .pdf, .dwg, .dxf).'
    };
  }

  const primaryExt = parts[parts.length - 1];
  const secondExt = parts.length > 2 ? parts[parts.length - 2] : null;

  // Check if any blocked executable extension is present
  for (const part of parts.slice(1)) {
    if (BLOCKED_FILE_EXTENSIONS.includes(part)) {
      return {
        isValid: false,
        errorMessage: `[Security Alert] Dangerous file extension detected (.${part}). Executable or script files are strictly blocked to protect system integrity.`
      };
    }
  }

  // Check allowed extensions
  if (!ALLOWED_FILE_EXTENSIONS.includes(primaryExt)) {
    return {
      isValid: false,
      errorMessage: `Unsupported file format (.${primaryExt}). Only engineering drawings (.dwg, .dxf, .step), documents (.pdf, .xls, .docx), and images (.png, .jpg) are allowed.`
    };
  }

  return {
    isValid: true,
    sanitizedName: cleanName
  };
}

/**
 * XSS & HTML injection sanitizer for user input fields
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove <script> tags
    .replace(/<[^>]+>/g, '') // Strip all HTML tags
    .replace(/javascript:/gi, '') // Strip javascript pseudo-protocol
    .replace(/on\w+=/gi, '') // Strip inline event handlers like onclick=
    .trim();
}

/**
 * Check if the submission is an automated spam bot:
 * 1. Checks hidden honeypot field (bots fill all fields; humans don't see honeypot)
 * 2. Checks time taken to fill form (< 1.5 seconds indicates headless bot)
 */
export function isSpamSubmission(honeypotValue: string, renderTimestamp: number): { isSpam: boolean; reason?: string } {
  // If honeypot has any content, it's 100% a bot
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return { isSpam: true, reason: 'Automated bot detection triggered (Honeypot trap)' };
  }

  // If submitted too fast (< 1200ms)
  const now = Date.now();
  const elapsed = now - renderTimestamp;
  if (elapsed < 1200) {
    return { isSpam: true, reason: 'Form submitted too rapidly (< 1.2s). Automated submission prevented.' };
  }

  return { isSpam: false };
}

/**
 * Generates an Anti-Spam Human Verification Challenge
 */
export interface HumanChallenge {
  question: string;
  expectedAnswer: number;
}

export function generateHumanChallenge(): HumanChallenge {
  const num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
  const num2 = Math.floor(Math.random() * 8) + 1; // 1 to 8
  return {
    question: `Anti-Spam Security Shield: What is ${num1} + ${num2}?`,
    expectedAnswer: num1 + num2
  };
}
