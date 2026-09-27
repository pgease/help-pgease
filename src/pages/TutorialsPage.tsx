import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { TutorialCard } from '../components/TutorialCard';
import { SupportCta } from '../components/SupportCta';
import { Breadcrumbs, Button, Container, EmptyState, ErrorState, SearchInput, cx } from '../components/ui';
import { HELP_TOPICS } from '../data/topics';
import { matchesQuery, useTutorials } from '../hooks/useTutorials';
import { TutorialGridSkeleton } from './HomePage';

/** Full list of tutorials with topic filter chips and search. */
export const TutorialsPage: React.FC = () => {
  const { tutorials, loading, error, reload } = useTutorials();
  const [search, setSearch] = useState('');
  const [topicKey, setTopicKey] = useState<string>('all');

  useEffect(() => {
    document.title = 'All tutorials · PG Ease Help Center';
  }, []);

  const filtered = useMemo(() => {
    const topic = HELP_TOPICS.find((t) => t.key === topicKey);
    return tutorials.filter((t) => matchesQuery(t, search) && (!topic || topic.modules.includes(t.module.toLowerCase())));
  }, [tutorials, search, topicKey]);

  const hasFilters = search.trim() !== '' || topicKey !== 'all';

  return (
    <Container className="space-y-6 py-8">
      <Breadcrumbs items={[{ label: 'Help Center', to: '/' }, { label: 'All tutorials' }]} />

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">All tutorials</h1>
          <p className="mt-1 text-sm text-slate-500">Step-by-step guides and videos for every part of PG Ease.</p>
        </div>
        <SearchInput value={search} onChange={setSearch} className="md:w-80" placeholder="Filter tutorials…" id="tutorials-search" />
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by topic">
        {[{ key: 'all', title: 'All' }, ...HELP_TOPICS].map((t) => {
          const active = topicKey === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setTopicKey(t.key)}
              className={cx(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1',
                active ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-800',
              )}
            >
              {t.title}
            </button>
          );
        })}
      </div>

      {loading ? (
        <TutorialGridSkeleton count={8} />
      ) : error ? (
        <div className="rounded-lg border border-slate-200 bg-white">
          <ErrorState title="Couldn't load tutorials" onRetry={reload} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white">
          <EmptyState
            icon={hasFilters ? <Search /> : <BookOpen />}
            title={hasFilters ? 'No tutorials match' : 'No tutorials published yet'}
            description={hasFilters ? 'Try another topic or different search words.' : 'Guides are on the way. Our support team can help you right now.'}
            action={
              hasFilters ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSearch('');
                    setTopicKey('all');
                  }}
                >
                  Clear filters
                </Button>
              ) : undefined
            }
          />
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500" aria-live="polite">
            {filtered.length} tutorial{filtered.length === 1 ? '' : 's'}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((t) => (
              <TutorialCard key={t.id} tutorial={t} />
            ))}
          </div>
        </>
      )}

      <SupportCta compact />
    </Container>
  );
};
