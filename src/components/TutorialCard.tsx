import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, FileText, Clock } from 'lucide-react';
import { Tutorial } from '../types/tutorial';
import { topicForModule } from '../data/topics';

interface TutorialCardProps {
  tutorial: Tutorial;
  compact?: boolean;
}

/**
 * One tutorial in a grid. Shows a real thumbnail when the backend has a video; otherwise a
 * neutral "guide" tile. Never shows placeholder videos or technical keys to owners.
 */
export const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, compact }) => {
  const hasVideo = Boolean(tutorial.youtube_url);
  const topic = topicForModule(tutorial.module);

  if (compact) {
    return (
      <Link
        to={`/${tutorial.tutorial_key}`}
        className="group flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
          {hasVideo ? <PlayCircle className="h-5 w-5" aria-hidden /> : <FileText className="h-5 w-5" aria-hidden />}
        </span>
        <span className="min-w-0">
          <span className="block text-xs text-slate-500">
            {topic?.title ?? humanize(tutorial.module)}
            {hasVideo && tutorial.duration ? ` · ${tutorial.duration}` : ''}
          </span>
          <span className="mt-0.5 block text-sm font-medium leading-snug text-slate-900 group-hover:text-brand-700 line-clamp-2">{tutorial.title}</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={`/${tutorial.tutorial_key}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:border-slate-300 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {hasVideo && tutorial.thumbnail_url ? (
          <img
            src={tutorial.thumbnail_url}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <FileText className="h-10 w-10" aria-hidden />
          </div>
        )}
        {hasVideo ? (
          <span className="absolute inset-0 flex items-center justify-center bg-slate-900/10 transition-colors group-hover:bg-slate-900/20">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-brand-700 shadow-md">
              <PlayCircle className="h-6 w-6" aria-hidden />
            </span>
          </span>
        ) : null}
        {hasVideo && tutorial.duration ? (
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-slate-900/80 px-1.5 py-0.5 text-[11px] font-medium text-white tabular-nums">
            <Clock className="h-3 w-3" aria-hidden /> {tutorial.duration}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-brand-700">{topic?.title ?? humanize(tutorial.module)}</span>
          <span aria-hidden>·</span>
          <span>{hasVideo ? 'Video' : 'Guide'}</span>
        </div>
        <h3 className="text-sm font-semibold leading-snug text-slate-900 group-hover:text-brand-700 line-clamp-2">{tutorial.title}</h3>
        {tutorial.description ? <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">{tutorial.description}</p> : null}
      </div>
    </Link>
  );
};

export function humanize(key: string): string {
  return key.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
