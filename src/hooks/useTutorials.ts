import { useCallback, useEffect, useState } from 'react';
import { fetchAllTutorials } from '../services/api';
import { Tutorial } from '../types/tutorial';

export interface UseTutorialsState {
  tutorials: Tutorial[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

/** Loads the tutorial list with explicit loading / error / empty states. */
export function useTutorials(): UseTutorialsState {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAllTutorials({ force: tick > 0 }).then((res) => {
      if (cancelled) return;
      setTutorials(res.tutorials);
      setError(res.error);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);

  return { tutorials, loading, error, reload };
}

/** Case-insensitive match across title, description, key and module. */
export function matchesQuery(t: Tutorial, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const terms = q.split(/\s+/).filter(Boolean);
  const hay = `${t.title} ${t.description} ${t.tutorial_key} ${t.module} ${t.category ?? ''}`.toLowerCase();
  return terms.every((term) => hay.includes(term));
}
