import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles, BookOpen, MessageSquare, PhoneCall } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* PG Ease Official Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group py-1" aria-label="PG Ease Help Center Home">
          <img
            src="/assets/logo-transparent.png"
            alt="PG Ease – Modern PG & Hostel Management"
            className="h-8 sm:h-9 lg:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            onError={(e) => {
              // Fallback to text logo if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="hidden sm:flex flex-col border-l border-slate-200 pl-3">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-slate-900">
                Help & Learning Hub
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-[10px] font-bold uppercase tracking-wider">
                Official
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">help.pgease.in</p>
          </div>
        </Link>

        {/* Quick links & Open App Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="https://pgease.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-brand-600 transition-colors px-2 py-1"
          >
            <span>Main Website</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>

          <a
            href="tel:+917701953356"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-brand-700 bg-slate-100/80 hover:bg-brand-50 px-3 py-1.5 rounded-xl transition-all"
          >
            <PhoneCall className="h-3.5 w-3.5 text-brand-600" />
            <span>+91 77019 53356</span>
          </a>

          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-soft transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <span>Open Owner Portal</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
