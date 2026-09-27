import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Mail, Phone, Clock } from 'lucide-react';
import { HELP_TOPICS } from '../data/topics';
import { MARKETING_SITE_URL, SUPPORT_EMAIL, SUPPORT_HOURS, SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL, ownerAppUrl, supportMailtoUrl } from '../config/links';
import { Container } from './ui';

export const Footer: React.FC = () => (
  <footer className="mt-16 border-t border-slate-200 bg-white text-sm text-slate-600">
    <Container className="py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-3 md:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <img
              src="/assets/logo-transparent.png"
              alt=""
              className="h-7 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="whitespace-nowrap border-l border-slate-200 pl-2.5 text-sm font-medium text-slate-600">Help Center</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-slate-500">
            Guides and video tutorials for PG owners and managers using PG Ease to run their property day to day.
          </p>
          <div className="flex flex-wrap gap-4 pt-1 text-sm">
            <a href={ownerAppUrl('/')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-600 hover:text-brand-700">
              Owner app <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
            <a href={MARKETING_SITE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-600 hover:text-brand-700">
              pgease.in <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </div>
        </div>

        <nav aria-label="Help topics">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Topics</h2>
          <ul className="space-y-2">
            {HELP_TOPICS.slice(0, 6).map((t) => (
              <li key={t.key}>
                <Link to={`/topics/${t.key}`} className="hover:text-brand-700">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Support</h2>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
              <a href={SUPPORT_PHONE_TEL} className="hover:text-brand-700">
                {SUPPORT_PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
              <a href={supportMailtoUrl()} className="hover:text-brand-700">
                {SUPPORT_EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-2 text-slate-500">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>{SUPPORT_HOURS}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6 text-xs text-slate-500">© {new Date().getFullYear()} PG Ease. All rights reserved.</div>
    </Container>
  </footer>
);
