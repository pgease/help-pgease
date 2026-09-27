import React from 'react';
import { MessageCircle, Phone, Mail, Clock } from 'lucide-react';
import {
  SUPPORT_EMAIL,
  SUPPORT_HOURS,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
  supportMailtoUrl,
  supportWhatsAppUrl,
} from '../config/links';
import { buttonClass, cx } from './ui';

interface SupportCtaProps {
  title?: string;
  description?: string;
  /** Pre-filled WhatsApp / email context, e.g. the tutorial title. */
  context?: string;
  compact?: boolean;
  className?: string;
}

/** "Need more help?" block. Only real, staffed channels — no bots, no fake SLAs. */
export const SupportCta: React.FC<SupportCtaProps> = ({
  title = 'Need more help?',
  description = 'Talk to the PG Ease team. We answer on WhatsApp and phone during support hours.',
  context,
  compact,
  className,
}) => {
  const waMessage = context ? `Hi PG Ease team, I need help with: ${context}` : 'Hi PG Ease team, I need some help with PG Ease.';
  const mailSubject = context ? `Help with: ${context}` : 'Help with PG Ease';

  return (
    <section aria-labelledby="support-cta-title" className={cx('rounded-lg border border-slate-200 bg-white', compact ? 'p-4' : 'p-6', className)}>
      <div className={cx('flex flex-col gap-4', !compact && 'md:flex-row md:items-center md:justify-between')}>
        <div className="min-w-0">
          <h2 id="support-cta-title" className={cx('font-semibold text-slate-900', compact ? 'text-sm' : 'text-lg')}>
            {title}
          </h2>
          <p className={cx('mt-1 text-slate-500', compact ? 'text-xs' : 'text-sm')}>{description}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" aria-hidden /> {SUPPORT_HOURS}
          </p>
        </div>
        <div className={cx('grid gap-2', compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3 md:w-auto')}>
          <a href={supportWhatsAppUrl(waMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', compact ? 'sm' : 'md')}>
            <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
          </a>
          <a href={SUPPORT_PHONE_TEL} className={buttonClass('secondary', compact ? 'sm' : 'md', 'whitespace-nowrap')} aria-label={`Call ${SUPPORT_PHONE_DISPLAY}`}>
            <Phone className="h-4 w-4" aria-hidden /> {compact ? 'Call' : SUPPORT_PHONE_DISPLAY}
          </a>
          <a href={supportMailtoUrl(mailSubject)} className={buttonClass('secondary', compact ? 'sm' : 'md', 'whitespace-nowrap')} aria-label={`Email ${SUPPORT_EMAIL}`}>
            <Mail className="h-4 w-4" aria-hidden /> {compact ? 'Email' : SUPPORT_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
};
