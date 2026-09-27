import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, ExternalLink, Link2, PlayCircle, ThumbsDown, ThumbsUp, VideoOff } from 'lucide-react';
import { fetchTutorialByKey, youTubeEmbedUrl } from '../services/api';
import { Tutorial } from '../types/tutorial';
import { TutorialCard } from '../components/TutorialCard';
import { SupportCta } from '../components/SupportCta';
import { Breadcrumbs, Button, Container, EmptyState, ErrorState, Skeleton, buttonClass, cx } from '../components/ui';
import { TUTORIAL_OWNER_PATHS, topicForModule } from '../data/topics';
import { ownerAppUrl } from '../config/links';

type LoadState = 'loading' | 'ready' | 'missing' | 'error';

export const TutorialDetailPage: React.FC = () => {
  const { tutorialKey = '' } = useParams<{ tutorialKey: string }>();
  const [state, setState] = useState<LoadState>('loading');
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [all, setAll] = useState<Tutorial[]>([]);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState('loading');
    setFeedback(null);
    fetchTutorialByKey(tutorialKey).then((res) => {
      if (cancelled) return;
      setAll(res.all);
      if (res.tutorial) {
        setTutorial(res.tutorial);
        setState('ready');
      } else {
        setTutorial(null);
        setState(res.error ? 'error' : 'missing');
      }
    });
    return () => {
      cancelled = true;
    };
  }, [tutorialKey, attempt]);

  useEffect(() => {
    document.title = tutorial ? `${tutorial.title} · PG Ease Help Center` : 'PG Ease Help Center';
  }, [tutorial]);

  const topic = tutorial ? topicForModule(tutorial.module) : undefined;
  const embedSrc = tutorial ? youTubeEmbedUrl(tutorial.youtube_url) : null;
  const ownerPath = tutorial ? TUTORIAL_OWNER_PATHS[tutorial.tutorial_key] ?? topic?.ownerAppPath : undefined;

  const related = useMemo(() => {
    if (!tutorial) return [];
    const sameTopic = all.filter((t) => t.id !== tutorial.id && topicForModule(t.module)?.key === topic?.key);
    const others = all.filter((t) => t.id !== tutorial.id && !sameTopic.includes(t));
    return [...sameTopic, ...others].slice(0, 4);
  }, [all, tutorial, topic]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — nothing to do */
    }
  };

  if (state === 'loading') {
    return (
      <Container className="space-y-6 py-8" aria-busy="true">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-8 w-3/4 max-w-xl" />
        <Skeleton className="aspect-video w-full max-w-3xl rounded-lg" />
        <div className="max-w-3xl space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </Container>
    );
  }

  if (state === 'error') {
    return (
      <Container className="py-12">
        <div className="mx-auto max-w-lg rounded-lg border border-slate-200 bg-white">
          <ErrorState title="Couldn't load this tutorial" description="We couldn't reach the server. Please check your connection and try again." onRetry={() => setAttempt((a) => a + 1)} />
        </div>
      </Container>
    );
  }

  if (state === 'missing' || !tutorial) {
    return (
      <Container className="space-y-8 py-12">
        <div className="mx-auto max-w-lg rounded-lg border border-slate-200 bg-white">
          <EmptyState
            icon={<VideoOff />}
            title="No tutorial for this yet"
            description={`We don't have a guide for “${tutorialKey.replace(/[_-]+/g, ' ')}” right now. Browse the other tutorials or ask our team directly.`}
            action={
              <Link to="/tutorials" className={buttonClass('primary', 'sm')}>
                Browse all tutorials
              </Link>
            }
          />
        </div>
        <div className="mx-auto max-w-lg">
          <SupportCta compact context={tutorialKey.replace(/[_-]+/g, ' ')} />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: 'Help Center', to: '/' },
          ...(topic ? [{ label: topic.title, to: `/topics/${topic.key}` }] : [{ label: 'Tutorials', to: '/tutorials' }]),
          { label: tutorial.title },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Article */}
        <article className="lg:col-span-8">
          <header>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              {topic ? (
                <Link to={`/topics/${topic.key}`} className="font-medium text-brand-700 hover:underline">
                  {topic.title}
                </Link>
              ) : null}
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                {embedSrc ? <PlayCircle className="h-3.5 w-3.5" aria-hidden /> : null}
                {embedSrc ? `Video${tutorial.duration ? ` · ${tutorial.duration}` : ''}` : 'Guide'}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl">{tutorial.title}</h1>
          </header>

          {embedSrc ? (
            <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-black">
              <div className="aspect-video w-full">
                <iframe
                  src={embedSrc}
                  title={tutorial.title}
                  className="h-full w-full border-0"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <VideoOff className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              <p>A video for this guide isn't available yet. The written steps below cover the same process.</p>
            </div>
          )}

          {tutorial.description ? (
            <div className="prose-help mt-6 max-w-none">
              {tutorial.description.split(/\n{2,}/).map((para, i) => (
                <p key={i} className="text-base leading-7 text-slate-700">
                  {para}
                </p>
              ))}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {ownerPath ? (
              <a href={ownerAppUrl(ownerPath)} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'md')}>
                Open this in PG Ease <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            ) : null}
            <Button variant="secondary" onClick={copyLink}>
              {copied ? <Check className="h-4 w-4 text-brand-700" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
              {copied ? 'Link copied' : 'Copy link'}
            </Button>
          </div>

          {/* Feedback — stored locally only; there is no feedback API yet. */}
          <div className="mt-10 rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-900">Was this helpful?</p>
              <div className="flex items-center gap-2" role="group" aria-label="Was this helpful?">
                <Button variant="secondary" size="sm" aria-pressed={feedback === 'yes'} onClick={() => setFeedback('yes')} className={cx(feedback === 'yes' && 'border-brand-600 bg-brand-50 text-brand-800')}>
                  <ThumbsUp className="h-3.5 w-3.5" aria-hidden /> Yes
                </Button>
                <Button variant="secondary" size="sm" aria-pressed={feedback === 'no'} onClick={() => setFeedback('no')} className={cx(feedback === 'no' && 'border-brand-600 bg-brand-50 text-brand-800')}>
                  <ThumbsDown className="h-3.5 w-3.5" aria-hidden /> No
                </Button>
              </div>
            </div>
            {feedback === 'yes' ? <p className="mt-3 text-sm text-slate-600">Glad it helped.</p> : null}
            {feedback === 'no' ? (
              <p className="mt-3 text-sm text-slate-600">Sorry about that — the team below can help you with this directly.</p>
            ) : null}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-4">
          <SupportCta compact title="Still need help?" description="Ask us about this step — we'll walk you through it." context={tutorial.title} />
          {related.length > 0 ? (
            <section aria-labelledby="related-title" className="space-y-3">
              <h2 id="related-title" className="text-sm font-semibold text-slate-900">
                Related tutorials
              </h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {related.map((t) => (
                  <TutorialCard key={t.id} tutorial={t} compact />
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </Container>
  );
};
