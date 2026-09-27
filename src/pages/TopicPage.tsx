import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, ExternalLink } from 'lucide-react';
import { TutorialCard } from '../components/TutorialCard';
import { SupportCta } from '../components/SupportCta';
import { Breadcrumbs, Container, EmptyState, ErrorState, buttonClass } from '../components/ui';
import { topicByKey } from '../data/topics';
import { ownerAppUrl } from '../config/links';
import { useTutorials } from '../hooks/useTutorials';
import { TutorialGridSkeleton } from './HomePage';
import { NotFoundPage } from './NotFoundPage';

/** All tutorials for one help topic, plus a link to the matching screen in the Owner app. */
export const TopicPage: React.FC = () => {
  const { topicKey = '' } = useParams<{ topicKey: string }>();
  const topic = topicByKey(topicKey);
  const { tutorials, loading, error, reload } = useTutorials();

  useEffect(() => {
    if (topic) document.title = `${topic.title} · PG Ease Help Center`;
  }, [topic]);

  const list = useMemo(() => (topic ? tutorials.filter((t) => topic.modules.includes(t.module.toLowerCase())) : []), [tutorials, topic]);

  if (!topic) return <NotFoundPage />;

  return (
    <Container className="space-y-6 py-8">
      <Breadcrumbs items={[{ label: 'Help Center', to: '/' }, { label: 'Topics', to: '/tutorials' }, { label: topic.title }]} />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{topic.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{topic.description}</p>
        </div>
        <a href={ownerAppUrl(topic.ownerAppPath)} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'md', 'shrink-0')}>
          Open in PG Ease <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>

      {loading ? (
        <TutorialGridSkeleton />
      ) : error ? (
        <div className="rounded-lg border border-slate-200 bg-white">
          <ErrorState title="Couldn't load tutorials" onRetry={reload} />
        </div>
      ) : list.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white">
          <EmptyState
            icon={<BookOpen />}
            title={`No tutorials for ${topic.title} yet`}
            description="We're still preparing guides for this area. Browse other topics or ask our team directly."
            action={
              <Link to="/tutorials" className={buttonClass('secondary', 'sm')}>
                Browse all tutorials
              </Link>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((t) => (
            <TutorialCard key={t.id} tutorial={t} />
          ))}
        </div>
      )}

      <SupportCta compact context={topic.title} />
    </Container>
  );
};
