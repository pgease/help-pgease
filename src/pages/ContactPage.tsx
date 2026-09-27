import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { Breadcrumbs, Container, buttonClass } from '../components/ui';
import {
  SUPPORT_EMAIL,
  SUPPORT_HOURS,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
  ownerAppUrl,
  supportMailtoUrl,
  supportWhatsAppUrl,
} from '../config/links';

/** Real support channels only. There is no ticketing API, so we don't pretend to have one. */
export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact support · PG Ease Help Center';
  }, []);

  return (
    <Container className="space-y-8 py-8">
      <Breadcrumbs items={[{ label: 'Help Center', to: '/' }, { label: 'Contact support' }]} />

      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Contact support</h1>
        <p className="mt-1 text-sm text-slate-500">
          A real person from the PG Ease team will help you. WhatsApp is usually the fastest.
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-600">
          <Clock className="h-4 w-4 text-slate-400" aria-hidden /> {SUPPORT_HOURS}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Channel
          icon={<MessageCircle className="h-5 w-5" />}
          title="WhatsApp"
          description="Send a message and, if helpful, a screenshot of what you see."
          href={supportWhatsAppUrl('Hi PG Ease team, I need some help with PG Ease.')}
          label="Chat on WhatsApp"
          primary
          meta={SUPPORT_PHONE_DISPLAY}
          external
        />
        <Channel
          icon={<Phone className="h-5 w-5" />}
          title="Phone"
          description="Call us during support hours and we'll walk you through it."
          href={SUPPORT_PHONE_TEL}
          label={`Call ${SUPPORT_PHONE_DISPLAY}`}
          meta="Support hours only"
        />
        <Channel
          icon={<Mail className="h-5 w-5" />}
          title="Email"
          description="Best for detailed questions or when you want a written record."
          href={supportMailtoUrl('Help with PG Ease')}
          label={`Email ${SUPPORT_EMAIL}`}
          meta="We reply within one working day"
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Before you contact us</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>
            Check the <Link to="/tutorials" className="text-brand-700 hover:underline">tutorials</Link> — most setup questions are answered there.
          </li>
          <li>Have your PG name ready so we can find your account quickly.</li>
          <li>
            If something looks wrong inside PG Ease, a screenshot from the{' '}
            <a href={ownerAppUrl('/')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-700 hover:underline">
              owner app <ExternalLink className="h-3 w-3" aria-hidden />
            </a>{' '}
            helps a lot.
          </li>
        </ul>
      </div>
    </Container>
  );
};

const Channel: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  label: string;
  meta?: string;
  primary?: boolean;
  external?: boolean;
}> = ({ icon, title, description, href, label, meta, primary, external }) => (
  <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-5">
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">{icon}</span>
      <div>
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
    </div>
    <div className="mt-auto pt-4">
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={buttonClass(primary ? 'primary' : 'secondary', 'md', 'w-full')}
      >
        {label}
      </a>
      {meta ? <p className="mt-2 text-center text-xs text-slate-500">{meta}</p> : null}
    </div>
  </div>
);
