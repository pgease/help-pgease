import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, LifeBuoy } from 'lucide-react';
import { ownerAppUrl } from '../config/links';
import { Container, buttonClass } from './ui';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const onHome = pathname === '/' || pathname === '/tutorials';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-2 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-3 focus:py-1.5 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600" aria-label="PG Ease Help Center home">
          <img
            src="/assets/logo-transparent.png"
            alt=""
            className="h-7 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="hidden whitespace-nowrap border-l border-slate-200 pl-2.5 text-sm font-medium text-slate-600 sm:inline">Help Center</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {!onHome ? (
            <Link to="/" className={buttonClass('ghost', 'sm', 'hidden sm:inline-flex')}>
              All tutorials
            </Link>
          ) : null}
          <Link to="/contact" className={buttonClass('ghost', 'sm', 'whitespace-nowrap')}>
            <LifeBuoy className="h-4 w-4" aria-hidden /> <span className="hidden sm:inline">Contact support</span>
            <span className="sm:hidden">Support</span>
          </Link>
          <a href={ownerAppUrl('/')} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'sm', 'whitespace-nowrap')}>
            <span className="hidden sm:inline">Open PG Ease</span>
            <span className="sm:hidden">Open app</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </nav>
      </Container>
    </header>
  );
};
