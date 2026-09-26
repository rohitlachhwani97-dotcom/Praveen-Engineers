import type { MouseEvent } from 'react';

/**
 * Generates direct Gmail compose URL and handles smart click behavior.
 * On Desktop: Opens Gmail compose in a new tab with recipient & subject pre-filled.
 * On Mobile: Seamlessly launches the Gmail / default mail app.
 */

export const getGmailComposeUrl = (
  email: string,
  subject: string = 'Industrial Sourcing Inquiry - Praveen Engineers'
): string => {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`;
};

export const handleEmailClick = (
  e: MouseEvent<HTMLAnchorElement>,
  email: string,
  subject: string = 'Industrial Sourcing Inquiry - Praveen Engineers'
) => {
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    e.preventDefault();
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  }
  // On desktop, the native <a href="https://mail.google.com/..." target="_blank"> handles opening Gmail compose in a new tab
};
