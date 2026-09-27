/**
 * Single source of truth for external URLs and support contacts in the Help Center.
 * Override via Vite env for local development (see .env.example).
 */
const env = import.meta.env as Record<string, string | undefined>;

/** PG Ease Owner web app. */
export const OWNER_APP_URL = (env.VITE_OWNER_APP_URL || 'https://app.pgease.in').replace(/\/+$/, '');

/** Public marketing website. */
export const MARKETING_SITE_URL = 'https://pgease.in';

/** Real support channels (same values as the Owner app). */
export const SUPPORT_PHONE_DISPLAY = '+91 77019 53356';
export const SUPPORT_PHONE_TEL = 'tel:+917701953356';
export const SUPPORT_WHATSAPP_NUMBER = '917701953356';
export const SUPPORT_EMAIL = 'support@pgease.in';
export const SUPPORT_HOURS = 'Mon – Sat, 9:30 AM – 7:00 PM IST';

export function supportWhatsAppUrl(message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}${text}`;
}

export function supportMailtoUrl(subject?: string): string {
  return subject ? `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}` : `mailto:${SUPPORT_EMAIL}`;
}

/** Deep link into a screen of the Owner app. */
export function ownerAppUrl(path = '/'): string {
  return `${OWNER_APP_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
