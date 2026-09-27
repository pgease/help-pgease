import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, ArrowRight, ShieldCheck, IndianRupee, Users, Building2, Wrench, Sparkles } from 'lucide-react';
import { Tutorial } from '../types/tutorial';

interface TutorialCardProps {
  tutorial: Tutorial;
}

const getModuleBadgeColor = (moduleName: string) => {
  const m = (moduleName || '').toLowerCase();
  if (m.includes('tenant')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (m.includes('rent') || m.includes('payment')) return 'bg-teal-50 text-brand-800 border-brand-200';
  if (m.includes('kyc') || m.includes('verification')) return 'bg-purple-50 text-purple-700 border-purple-200';
  if (m.includes('room') || m.includes('property')) return 'bg-sky-50 text-sky-700 border-sky-200';
  if (m.includes('staff')) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
  if (m.includes('expense')) return 'bg-amber-50 text-amber-700 border-amber-200';
  if (m.includes('complaint')) return 'bg-rose-50 text-rose-700 border-rose-200';
  return 'bg-brand-50 text-brand-700 border-brand-200';
};

export const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  const targetPath = `/${tutorial.tutorial_key}`;

  return (
    <Link
      to={targetPath}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Video Thumbnail with PG Ease Teal Play Badge */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
          <img
            src={tutorial.thumbnail_url || 'https://img.youtube.com/vi/kYJ5_3t4pWw/hqdefault.jpg'}
            alt={tutorial.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://img.youtube.com/vi/kYJ5_3t4pWw/hqdefault.jpg';
            }}
          />
          {/* Ambient Overlay */}
          <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/15 transition-colors flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-brand-600/90 group-hover:bg-brand-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <PlayCircle className="h-6 w-6 ml-0.5" />
            </div>
          </div>

          {/* Duration Badge */}
          {tutorial.duration && (
            <span className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
              <Clock className="w-3 h-3 text-brand-300" />
              {tutorial.duration}
            </span>
          )}

          {/* Status or Feature Badge */}
          {tutorial.badge && (
            <span className="absolute top-2.5 left-2.5 bg-brand-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
              {tutorial.badge}
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-2.5">
          <div className="flex items-center justify-between gap-1 text-[11px]">
            <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] border capitalize ${getModuleBadgeColor(tutorial.module)}`}>
              {tutorial.module.replace(/_/g, ' ')}
            </span>
            <code className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200" title="API technical key">
              {tutorial.tutorial_key}
            </code>
          </div>

          <h3 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-brand-700 transition-colors leading-snug">
            {tutorial.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {tutorial.description || 'Watch step-by-step video instructions to configure and master this feature.'}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-700 group-hover:text-brand-800 transition-colors">
        <span className="flex items-center gap-1.5">
          <PlayCircle className="w-4 h-4 text-brand-600" />
          Watch Video Guide
        </span>
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
      </div>
    </Link>
  );
};
