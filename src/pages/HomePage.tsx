import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search, BookOpen } from 'lucide-react';
import { TutorialCard } from '../components/TutorialCard';
import { SupportCta } from '../components/SupportCta';
import { Button, CardSkeleton, Container, EmptyState, ErrorState, SearchInput, SectionHeading } from '../components/ui';
import { HELP_TOPICS } from '../data/topics';
import { matchesQuery, useTutorials } from '../hooks/useTutorials';

const QUICK_SEARCHES = ['add tenant', 'collect rent', 'KYC', 'rooms and beds', 'staff permissions', 'complaints'];

export const HomePage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const initialQuery = params.get('q') ?? '';
  const [search, setSearch] = useState(initialQuery);
  const { tutorials, loading, error, reload } = useTutorials();

  // Keep ?q= in the URL so deep links from the Owner app and shared searches work.
  useEffect(() => {
    const q = search.trim();
    const current = params.get('q') ?? '';
    if (q === current) return;
    const next = new URLSearchParams(params);
    if (q) next.set('q', q);
    else next.delete('q');
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    document.title = 'PG Ease Help Center';
  }, []);

  const isSearching = search.trim().length > 0;
  const results = useMemo(() => tutorials.filter((t) => matchesQuery(t, search)), [tutorials, search]);
  const popular = useMemo(() => tutorials.slice(0, 4), [tutorials]);

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const topic of HELP_TOPICS) {
      counts[topic.key] = tutorials.filter((t) => topic.modules.includes(t.module.toLowerCase())).length;
    }
    return counts;
  }, [tutorials]);

  return (
    <div className="pb-8">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">How can we help you?</h1>
            <p className="mt-3 text-base text-slate-500">Guides and videos for running your PG with PG Ease — adding tenants, collecting rent, KYC, rooms and more.</p>
            <SearchInput value={search} onChange={setSearch} size="lg" className="mt-6" placeholder="Search PG Ease help… e.g. add tenant, collect rent" />
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-slate-500">Try:</span>
              {QUICK_SEARCHES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setSearch(q)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="space-y-12 pt-10">
        {isSearching ? (
          /* Search results */
          <section aria-live="polite" className="space-y-5">
            <SectionHeading
              title={loading ? 'Searching…' : `${results.length} result${results.length === 1 ? '' : 's'} for “${search.trim()}”`}
              action={
                <Button variant="ghost" size="sm" onClick={() => setSearch('')}>
                  Clear search
                </Button>
              }
            />
            {loading ? (
              <TutorialGridSkeleton />
            ) : error ? (
              <div className="rounded-lg border border-slate-200 bg-white">
                <ErrorState title="Couldn't search tutorials" onRetry={reload} />
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white">
                <EmptyState
                  icon={<Search />}
                  title="No results found"
                  description="Try different words — for example “rent”, “tenant” or “KYC” — or browse the topics below."
                  action={
                    <Button variant="secondary" size="sm" onClick={() => setSearch('')}>
                      Browse all topics
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((t) => (
                  <TutorialCard key={t.id} tutorial={t} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Topics */}
            <section aria-labelledby="topics-title" className="space-y-5">
              <SectionHeading title="Browse by topic" description="Pick the part of PG Ease you need help with." />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {HELP_TOPICS.map((topic) => (
                  <Link
                    key={topic.key}
                    to={`/topics/${topic.key}`}
                    className="group flex flex-col rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:border-slate-300 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                  >
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-brand-700">{topic.title}</h3>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-500">{topic.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-700">
                      {loading ? 'Loading…' : `${topicCounts[topic.key] ?? 0} tutorial${topicCounts[topic.key] === 1 ? '' : 's'}`}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Popular tutorials */}
            <section aria-labelledby="popular-title" className="space-y-5">
              <SectionHeading
                title="Popular tutorials"
                description="Start here if you're new to PG Ease."
                action={
                  tutorials.length > 4 ? (
                    <Link to="/tutorials" className="text-sm font-medium text-brand-700 hover:underline">
                      View all {tutorials.length}
                    </Link>
                  ) : undefined
                }
              />
              {loading ? (
                <TutorialGridSkeleton />
              ) : error ? (
                <div className="rounded-lg border border-slate-200 bg-white">
                  <ErrorState title="Couldn't load tutorials" description="We couldn't reach the server. Please check your connection and try again." onRetry={reload} />
                </div>
              ) : tutorials.length === 0 ? (
                <div className="rounded-lg border border-slate-200 bg-white">
                  <EmptyState icon={<BookOpen />} title="No tutorials published yet" description="We're preparing guides for every feature. In the meantime our support team is happy to walk you through anything." />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {popular.map((t) => (
                    <TutorialCard key={t.id} tutorial={t} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        <SupportCta />
      </Container>
    </div>
  );
};

export const TutorialGridSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true" aria-label="Loading tutorials">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);
