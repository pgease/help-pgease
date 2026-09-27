import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  PlayCircle,
  Clock,
  Key,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Monitor,
  Smartphone,
  CheckCircle2,
  Loader2,
  Sparkles,
  PhoneCall,
  Code2,
} from 'lucide-react';
import { fetchTutorialByKey, fetchAllTutorials } from '../services/api';
import { Tutorial } from '../types/tutorial';
import { TutorialCard } from '../components/TutorialCard';

export const TutorialDetailPage: React.FC = () => {
  const { tutorialKey = '' } = useParams<{ tutorialKey: string }>();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [related, setRelated] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTutorialByKey(tutorialKey).then((data) => {
      setTutorial(data);
      setLoading(false);
    });

    fetchAllTutorials().then((all) => {
      const others = all.filter(
        (t) => t.tutorial_key.toLowerCase() !== tutorialKey.toLowerCase()
      );
      setRelated(others.slice(0, 4));
    });
  }, [tutorialKey]);

  const handleCopyKey = () => {
    if (!tutorial?.tutorial_key) return;
    navigator.clipboard.writeText(tutorial.tutorial_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const getEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
    }
    return url;
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="h-9 w-9 animate-spin text-brand-600" />
        <p className="text-xs font-semibold text-slate-500">Loading video masterclass...</p>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="h-16 w-16 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-soft">
          <BookOpen className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Tutorial Not Found</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          No video guide currently matches &ldquo;{tutorialKey}&rdquo;. You can browse all available tutorials or return to the learning hub.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-soft hover:bg-brand-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse All Tutorials
        </Link>
      </div>
    );
  }

  const vUrl = tutorial.youtube_url || tutorial.video_url || '';
  const embedSrc = getEmbedUrl(vUrl);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between gap-4 text-xs">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-bold text-brand-700 hover:text-brand-800 hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all guides
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShareUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedUrl ? 'Link Copied!' : 'Share Guide'}</span>
          </button>
        </div>
      </div>

      {/* VIDEO PLAYER THEATER */}
      <div className="space-y-4">
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-200/80">
          <iframe
            src={embedSrc}
            title={tutorial.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* METADATA BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 font-bold capitalize">
              Module: {tutorial.module.replace(/_/g, ' ')}
            </span>

            {tutorial.badge && (
              <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold uppercase tracking-wider text-[11px]">
                {tutorial.badge}
              </span>
            )}

            {tutorial.duration && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono font-medium text-[11px]">
                <Clock className="w-3 h-3 text-slate-500" />
                {tutorial.duration}
              </span>
            )}

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
              {tutorial.platform === 'APP' ? (
                <>
                  <Smartphone className="w-3 h-3 text-brand-600" />
                  Mobile App
                </>
              ) : (
                <>
                  <Monitor className="w-3 h-3 text-brand-600" />
                  Web & Mobile
                </>
              )}
            </span>
          </div>

          {/* Technical Key Copy Pill */}
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-xl font-mono text-xs shadow-xs">
            <span className="text-slate-400 text-[10px]">API Key:</span>
            <span className="font-bold text-brand-300">{tutorial.tutorial_key}</span>
            <button
              type="button"
              onClick={handleCopyKey}
              className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-300 hover:text-white cursor-pointer"
              title="Copy tutorial_key for mobile / web dev"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT DETAILS & DESCRIPTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {tutorial.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {tutorial.description}
            </p>
          </div>

          {/* Developer Technical Deep-Link Box */}
          <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-800">
              <Code2 className="w-4 h-4 text-brand-600" />
              <span>Developer Deep-Link Integration</span>
            </div>
            <p className="text-xs text-brand-900 leading-relaxed">
              PG Owner Web & Mobile App can dynamically invoke this tutorial video anywhere in the codebase using the technical key:
            </p>
            <div className="flex items-center justify-between bg-white rounded-xl p-2.5 border border-brand-200 font-mono text-xs text-slate-800">
              <code>openTutorial(&quot;{tutorial.tutorial_key}&quot;)</code>
              <button
                type="button"
                onClick={handleCopyKey}
                className="text-[11px] font-sans font-bold text-brand-700 hover:text-brand-900 cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>

          {/* Helpful Feedback Widget */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Was this video tutorial helpful?</h4>
              <p className="text-[11px] text-slate-500">Your feedback helps improve PG Ease operator training.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFeedbackGiven('yes')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  feedbackGiven === 'yes'
                    ? 'bg-emerald-600 text-white shadow-soft'
                    : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Yes, helped!</span>
              </button>

              <button
                type="button"
                onClick={() => setFeedbackGiven('no')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  feedbackGiven === 'no'
                    ? 'bg-rose-600 text-white shadow-soft'
                    : 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>Still need help</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Info & Support Card */}
        <div className="space-y-6">
          {/* Support Assist Card */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 space-y-4 shadow-xl border border-slate-800">
            <div className="flex items-center gap-2 text-brand-400">
              <PhoneCall className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">PG Ease Support</span>
            </div>
            <h3 className="text-base font-bold">Have questions regarding this step?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our operator assistance team is on standby to help you configure settings or answer tenant questions.
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <a
                href="tel:+917701953356"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition-colors shadow-soft"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call +91 77019 53356</span>
              </a>
              <a
                href="mailto:support@pgease.in"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
              >
                <span>Email Support Team</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED VIDEOS */}
      {related.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              More Recommended Masterclasses
            </h3>
            <Link to="/" className="text-xs font-bold text-brand-700 hover:underline">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((item) => (
              <TutorialCard key={item.id || item.tutorial_key} tutorial={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
