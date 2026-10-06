import { Tutorial, TutorialsResult } from '../types/tutorial';

const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]');

const API_BASE = isLocalhost
  ? '/api'
  : (import.meta.env.VITE_API_BASE_URL || 'https://am4eey3lmk.execute-api.ap-south-1.amazonaws.com/api');

/**
 * The backend tutorial records currently carry no `tutorial_key`; the Owner app deep-links by key
 * (e.g. `openTutorial("tenant_add")`). This map derives a stable key + module from known titles.
 * Unknown titles fall back to a slug of the title so every tutorial still has a URL.
 */
const TUTORIAL_METADATA_MAP: Record<string, { tutorial_key: string; module: string; action: string; platform: string }> = {
  'how to add & onboard new tenants': { tutorial_key: 'tenant_add', module: 'tenant_management', action: 'add_tenant', platform: 'ALL' },
  'rent collection & direct zero-fee upi intent': { tutorial_key: 'rent_collection', module: 'rent_collection', action: 'collect_rent', platform: 'ALL' },
  'how to collect rent & reconcile upi payments': { tutorial_key: 'rent_collection', module: 'rent_collection', action: 'collect_rent', platform: 'ALL' },
  'property setup: rooms, floors & bed allocation': { tutorial_key: 'room_management', module: 'property_setup', action: 'configure_rooms', platform: 'WEB' },
  'digilocker aadhaar kyc & agreement signing': { tutorial_key: 'kyc_verification', module: 'kyc_verification', action: 'verify_aadhaar', platform: 'ALL' },
  'instant digital aadhaar & police kyc verification': { tutorial_key: 'kyc_verification', module: 'kyc_verification', action: 'verify_aadhaar', platform: 'ALL' },
  'staff management, wardens & granular roles': { tutorial_key: 'staff_management', module: 'staff_management', action: 'manage_staff', platform: 'WEB' },
  'managing staff roles & access permissions': { tutorial_key: 'staff_management', module: 'staff_management', action: 'manage_staff', platform: 'WEB' },
  'tracking pg expenses, electricity & monthly profits': { tutorial_key: 'expense_tracker', module: 'expense_management', action: 'record_expense', platform: 'ALL' },
  'recording pg expenses & profit analytics': { tutorial_key: 'expense_tracker', module: 'expense_management', action: 'record_expense', platform: 'ALL' },
  'tenant complaints & maintenance ticketing': { tutorial_key: 'complaints_resolution', module: 'complaint_management', action: 'resolve_complaint', platform: 'ALL' },
  'resolving tenant complaints & service requests': { tutorial_key: 'complaints_resolution', module: 'complaint_management', action: 'resolve_complaint', platform: 'ALL' },
  'publishing your pg online & capturing direct leads': { tutorial_key: 'public_listing', module: 'public_listing', action: 'post_pg', platform: 'ALL' },
  'how to post your pg in live': { tutorial_key: 'post_your_pg_in_live', module: 'public_listing', action: 'post_pg', platform: 'ALL' },
  'how to post your pg': { tutorial_key: 'post_your_pg_in_live', module: 'public_listing', action: 'post_pg', platform: 'ALL' },
};

/** Backend `category` → feature module (used when the title isn't in the map above). */
const CATEGORY_MODULE_MAP: Record<string, string> = {
  tenants: 'tenant_management',
  payments: 'rent_collection',
  rent: 'rent_collection',
  property: 'property_setup',
  rooms: 'property_setup',
  verification: 'kyc_verification',
  kyc: 'kyc_verification',
  operations: 'operations',
  staff: 'staff_management',
  finance: 'expense_management',
  expenses: 'expense_management',
  complaints: 'complaint_management',
  growth: 'public_listing',
  listing: 'public_listing',
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function normalizeKey(input: string): string {
  return input.trim().toLowerCase().replace(/-/g, '_');
}

export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/);
  return match && match[2].length === 11 ? match[2] : null;
}

export function youTubeThumbnail(url?: string): string | null {
  const id = extractYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export function youTubeEmbedUrl(url?: string): string | null {
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?rel=0` : null;
}

function normalizeTutorial(item: any): Tutorial {
  const title: string = String(item.title || '').trim();
  const titleKey = title.toLowerCase();
  const meta = TUTORIAL_METADATA_MAP[titleKey];
  const category: string = String(item.category || '').trim();

  const key = String(item.tutorial_key || item.tutorialKey || meta?.tutorial_key || slugify(title) || item.id || 'guide');
  // Only real video URLs — never a placeholder.
  const url: string = String(item.youtube_url || item.youtubeUrl || item.videoUrl || item.video_url || '').trim();
  const thumb: string | undefined = item.thumbnail_url || item.thumbnailUrl || youTubeThumbnail(url) || undefined;
  const module =
    item.module || meta?.module || CATEGORY_MODULE_MAP[category.toLowerCase()] || (category ? slugify(category) : 'general');

  const isActive = item.isActive !== false && String(item.status || 'ACTIVE').toUpperCase() !== 'INACTIVE';

  return {
    id: String(item.id || key),
    title: title || 'Untitled tutorial',
    tutorial_key: key,
    tutorialKey: key,
    module,
    action: item.action || meta?.action || 'view',
    description: String(item.description || ''),
    youtube_url: url,
    video_url: url || undefined,
    thumbnail_url: thumb,
    platform: item.platform || meta?.platform || 'ALL',
    status: isActive ? 'ACTIVE' : 'INACTIVE',
    sort_order: Number(item.sort_order ?? item.displayOrder ?? 0) || 0,
    duration: item.duration || undefined,
    badge: item.badge || undefined,
    category: category || undefined,
    created_at: item.createdAt || item.created_at,
    updated_at: item.updatedAt || item.updated_at,
  };
}

let listCache: { at: number; result: TutorialsResult } | null = null;
const CACHE_TTL_MS = 60_000;

/**
 * Loads all active tutorials. On failure returns `{ tutorials: [], error }` so the UI can show a
 * retry state — it never substitutes made-up content.
 */
export async function fetchAllTutorials(opts: { force?: boolean } = {}): Promise<TutorialsResult> {
  if (!opts.force && listCache && Date.now() - listCache.at < CACHE_TTL_MS && !listCache.result.error) {
    return listCache.result;
  }
  try {
    const res = await fetch(`${API_BASE}/tutorials`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = Array.isArray(json) ? json : json?.data;
    const list: Tutorial[] = Array.isArray(data) ? data.map(normalizeTutorial) : [];
    const active = list
      .filter((t) => t.status !== 'INACTIVE')
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    const result = { tutorials: active, error: null };
    listCache = { at: Date.now(), result };
    return result;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { tutorials: [], error: message };
  }
}

export interface TutorialLookup {
  tutorial: Tutorial | null;
  all: Tutorial[];
  error: string | null;
}

/**
 * Finds one tutorial by key, slug, or id. The dedicated `/tutorials/:key` endpoint is attempted
 * first; because backend records lack keys today, the list is the reliable source.
 */
export async function fetchTutorialByKey(tutorialKey: string): Promise<TutorialLookup> {
  const wanted = normalizeKey(tutorialKey);

  const listResult = await fetchAllTutorials();
  const all = listResult.tutorials;

  const fromList =
    all.find((t) => normalizeKey(t.tutorial_key) === wanted) ||
    all.find((t) => t.id.toLowerCase() === wanted) ||
    all.find((t) => slugify(t.title) === wanted) ||
    null;
  if (fromList) return { tutorial: fromList, all, error: null };

  try {
    const res = await fetch(`${API_BASE}/tutorials/${encodeURIComponent(wanted)}`);
    if (res.ok) {
      const json = await res.json();
      const item = json?.data ?? json;
      if (item && typeof item === 'object' && (item.title || item.id)) {
        return { tutorial: normalizeTutorial(item), all, error: null };
      }
    }
  } catch {
    /* fall through — the list already told us it isn't there */
  }

  return { tutorial: null, all, error: listResult.error };
}
