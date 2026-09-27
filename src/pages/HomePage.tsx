import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  PlayCircle,
  BookOpen,
  Sparkles,
  Users,
  IndianRupee,
  ShieldCheck,
  Building2,
  Wrench,
  HelpCircle,
  PhoneCall,
  Loader2,
  Filter,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { TutorialCard } from '../components/TutorialCard';
import { fetchAllTutorials } from '../services/api';
import { Tutorial } from '../types/tutorial';

const MODULE_TABS = [
  { key: 'all', label: 'All Guides', icon: Sparkles },
  { key: 'tenant_management', label: 'Tenants', icon: Users },
  { key: 'rent_collection', label: 'Rent & UPI', icon: IndianRupee },
  { key: 'property_setup', label: 'Rooms & Beds', icon: Building2 },
  { key: 'kyc_verification', label: 'Aadhaar KYC', icon: ShieldCheck },
  { key: 'staff_management', label: 'Staff Roles', icon: Users },
  { key: 'expense_management', label: 'Expenses & P&L', icon: TrendingUp },
  { key: 'complaint_management', label: 'Complaints Desk', icon: Wrench },
  { key: 'public_listing', label: 'Public Search Listing', icon: Building2 },
];

const POPULAR_SEARCH_CHIPS = [
  { label: 'Add Tenant', query: 'tenant' },
  { label: 'UPI Rent Payment', query: 'rent' },
  { label: 'Aadhaar KYC', query: 'aadhaar' },
  { label: 'Room Configuration', query: 'room' },
  { label: 'Staff Permissions', query: 'staff' },
  { label: 'Complaints', query: 'complaint' },
];

export const HomePage: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeModule, setActiveModule] = useState('all');

  useEffect(() => {
    fetchAllTutorials().then((data) => {
      setTutorials(data);
      setLoading(false);
    });
  }, []);

  const filteredTutorials = useMemo(() => {
    return tutorials.filter((t) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.tutorial_key.toLowerCase().includes(q) ||
        t.module.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);

      const matchesModule =
        activeModule === 'all' ||
        t.module.toLowerCase() === activeModule.toLowerCase();

      return matchesSearch && matchesModule;
    });
  }, [tutorials, search, activeModule]);

  return (
    <div className="space-y-12 pb-24">
      {/* HERO SECTION — PG EASE SIGNATURE TEAL */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 shadow-md">
        {/* Subtle decorative mesh background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-200 shadow-sm">
            <PlayCircle className="w-4 h-4 text-brand-300" />
            <span>Official PG Ease Video Tutorials & Operator Guides</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            How can we help your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-teal-200 to-white">PG today?</span>
          </h1>

          <p className="text-sm sm:text-base text-brand-100 max-w-2xl mx-auto leading-relaxed">
            Search our masterclass video library or browse step-by-step feature guides. Learn how to onboard tenants, verify Aadhaar via DigiLocker, collect rent via zero-fee UPI, and manage staff.
          </p>

          {/* SEARCH INPUT BAR */}
          <div className="max-w-2xl mx-auto relative pt-2">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides: e.g. how to add tenant, rent collection, aadhaar kyc, staff..."
              className="w-full h-14 pl-12 pr-20 rounded-2xl bg-white text-slate-900 text-sm font-medium shadow-2xl placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-400/50 transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>

          {/* QUICK CHIPS */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-brand-200">
            <span className="text-brand-300/80 font-medium">Trending:</span>
            {POPULAR_SEARCH_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => setSearch(chip.query)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/10 transition-colors cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* MODULE FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MODULE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeModule === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveModule(tab.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-soft shadow-brand-600/30'
                    : 'bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-brand-600'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* RESULTS HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {activeModule === 'all'
                ? 'All Available Tutorials'
                : MODULE_TABS.find((m) => m.key === activeModule)?.label}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold font-mono">
              {filteredTutorials.length} guides
            </span>
          </div>

          {search && (
            <p className="text-xs text-slate-500">
              Filtering by: <span className="font-bold text-slate-800">&ldquo;{search}&rdquo;</span>
            </p>
          )}
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
            <p className="text-xs font-semibold text-slate-500">Loading masterclass videos...</p>
          </div>
        ) : filteredTutorials.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto border border-slate-200 shadow-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-slate-900">No tutorials match your filter</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We couldn&apos;t find any tutorial matching &ldquo;{search}&rdquo;. Try another search keyword or reset all filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setActiveModule('all');
              }}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-soft"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* TUTORIALS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id || tutorial.tutorial_key} tutorial={tutorial} />
            ))}
          </div>
        )}

        {/* BOTTOM HELP CTA BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-teal-900 text-white p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-brand-200">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>1-on-1 Operator Training Available</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Need personalized walkthrough or live setup?
            </h3>
            <p className="text-xs sm:text-sm text-brand-100 leading-relaxed">
              Our onboarding specialists help you import tenants from Excel, connect bank accounts for direct UPI, and configure room sharing in under 15 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+917701953356"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-brand-900 hover:bg-brand-50 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-brand-700" />
              <span>Call +91 77019 53356</span>
            </a>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-700 hover:bg-brand-600 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
            >
              <span>Login to PGEase</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
