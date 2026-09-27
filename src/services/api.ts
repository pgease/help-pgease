import { Tutorial } from '../types/tutorial';

const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]');

const API_BASE = isLocalhost
  ? '/api'
  : (import.meta.env.VITE_API_BASE_URL || 'https://am4eey3lmk.execute-api.ap-south-1.amazonaws.com/api');

export const FALLBACK_TUTORIALS: Tutorial[] = [
  {
    id: 'tut-1',
    title: 'How to Add & Onboard New Tenants',
    tutorial_key: 'tenant_add',
    module: 'tenant_management',
    action: 'add_tenant',
    category: 'Tenants',
    description: 'Learn how to quickly add tenants, allocate rooms and beds, set monthly rent amounts, collect security deposits, and send automated welcome notifications.',
    youtube_url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    video_url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    thumbnail_url: 'https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
    platform: 'ALL',
    status: 'ACTIVE',
    sort_order: 1,
    duration: '4:20',
    badge: 'Must Watch',
  },
  {
    id: 'tut-2',
    title: 'How to Collect Rent & Reconcile UPI Payments',
    tutorial_key: 'rent_collection',
    module: 'rent_collection',
    action: 'collect_rent',
    category: 'Payments',
    description: 'Step-by-step guide on generating automatic rent invoices, sending WhatsApp payment reminders, accepting zero-fee UPI QR payments, and approving payment receipts.',
    youtube_url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    video_url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    thumbnail_url: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
    platform: 'ALL',
    status: 'ACTIVE',
    sort_order: 2,
    duration: '5:15',
    badge: 'Core Feature',
  },
  {
    id: 'tut-3',
    title: 'Property Setup: Rooms, Floors & Bed Allocation',
    tutorial_key: 'room_management',
    module: 'property_setup',
    action: 'configure_rooms',
    category: 'Property',
    description: 'Configure your PG floors, single/double/triple sharing room types, assign bed numbers, and manage real-time occupancy and vacant bed counts.',
    youtube_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    video_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    thumbnail_url: 'https://img.youtube.com/vi/LXb3EKWsInQ/hqdefault.jpg',
    platform: 'WEB',
    status: 'ACTIVE',
    sort_order: 3,
    badge: 'Setup Guide',
  },
  {
    id: 'tut-4',
    title: 'Instant Digital Aadhaar & Police KYC Verification',
    tutorial_key: 'kyc_verification',
    module: 'kyc_verification',
    action: 'verify_aadhaar',
    category: 'Verification',
    description: 'How to securely verify tenant identities with DigiLocker Aadhaar OTP verification, store police verification documents, and ensure 100% legal compliance.',
    youtube_url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    video_url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    thumbnail_url: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
    platform: 'ALL',
    status: 'ACTIVE',
    sort_order: 4,
    badge: 'Security',
  },
  {
    id: 'tut-5',
    title: 'Managing Staff Roles & Access Permissions',
    tutorial_key: 'staff_management',
    module: 'staff_management',
    action: 'manage_staff',
    category: 'Operations',
    description: 'Add property managers, wardens, and caretakers with custom granular role permissions. Control what financial and tenant data staff can view or edit.',
    youtube_url: 'https://www.youtube.com/watch?v=RgKAFK5djSk',
    video_url: 'https://www.youtube.com/watch?v=RgKAFK5djSk',
    thumbnail_url: 'https://img.youtube.com/vi/RgKAFK5djSk/hqdefault.jpg',
    platform: 'WEB',
    status: 'ACTIVE',
    sort_order: 5,
    badge: 'Operations',
  },
  {
    id: 'tut-6',
    title: 'Recording PG Expenses & Profit Analytics',
    tutorial_key: 'expense_tracker',
    module: 'expense_management',
    action: 'record_expense',
    category: 'Finance',
    description: 'Track recurring groceries, electricity bills, maintenance, repairs, and staff salaries. Generate automatic monthly profit-and-loss reports.',
    youtube_url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
    video_url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
    thumbnail_url: 'https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg',
    platform: 'ALL',
    status: 'ACTIVE',
    sort_order: 6,
    badge: 'Finance',
  },
  {
    id: 'tut-7',
    title: 'Resolving Tenant Complaints & Service Requests',
    tutorial_key: 'complaints_resolution',
    module: 'complaint_management',
    action: 'resolve_complaint',
    category: 'Operations',
    description: 'Handle Wi-Fi, plumbing, cleaning, and electrical complaints raised by tenants. Assign tickets to staff, update resolution statuses, and keep tenants informed.',
    youtube_url: 'https://www.youtube.com/watch?v=OPf0YbXqDm0',
    video_url: 'https://www.youtube.com/watch?v=OPf0YbXqDm0',
    thumbnail_url: 'https://img.youtube.com/vi/OPf0YbXqDm0/hqdefault.jpg',
    platform: 'ALL',
    status: 'ACTIVE',
    sort_order: 7,
    badge: 'Support',
  },
  {
    id: 'tut-8',
    title: 'Publishing Your PG Online & Capturing Direct Leads',
    tutorial_key: 'public_listing',
    module: 'public_listing',
    action: 'post_pg',
    category: 'Growth',
    description: 'Create a stunning public listing for your PG with high-res photos, room pricing with/without food, amenities, rules, and Google Maps location to get zero-brokerage direct tenant inquiries.',
    youtube_url: 'https://www.youtube.com/watch?v=e-ORhEE9VVg',
    video_url: 'https://www.youtube.com/watch?v=e-ORhEE9VVg',
    thumbnail_url: 'https://img.youtube.com/vi/e-ORhEE9VVg/hqdefault.jpg',
    platform: 'ALL',
    status: 'ACTIVE',
    sort_order: 8,
    badge: 'Pro Feature',
  },
];

export async function fetchAllTutorials(): Promise<Tutorial[]> {
  try {
    const res = await fetch(`${API_BASE}/tutorials`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json?.data || json;
    if (Array.isArray(data) && data.length > 0) {
      return data.map(normalizeTutorial);
    }
    return FALLBACK_TUTORIALS;
  } catch (err) {
    console.warn('Backend fetch failed, returning fallback knowledge tutorials:', err);
    return FALLBACK_TUTORIALS;
  }
}

export async function fetchTutorialByKey(tutorialKey: string): Promise<Tutorial | null> {
  const cleanKey = tutorialKey.trim().toLowerCase();
  const cleanSlug = cleanKey.replace(/-/g, '_');

  try {
    const res = await fetch(`${API_BASE}/tutorials/${encodeURIComponent(cleanSlug)}`);
    if (res.ok) {
      const json = await res.json();
      const item = json?.data;
      if (item) return normalizeTutorial(item);
    }
  } catch (err) {
    console.warn(`Fetch tutorial for "${cleanSlug}" failed:`, err);
  }

  // Fallback search locally
  const matched = FALLBACK_TUTORIALS.find(
    (t) =>
      t.tutorial_key.toLowerCase() === cleanSlug ||
      t.tutorial_key.toLowerCase() === cleanKey ||
      t.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').includes(cleanSlug) ||
      cleanSlug.includes(t.tutorial_key.toLowerCase())
  );

  return matched || null;
}

const TUTORIAL_METADATA_MAP: Record<string, { tutorial_key: string; module: string; action: string; platform: string; status: string }> = {
  "how to add & onboard new tenants": { tutorial_key: "tenant_add", module: "tenant_management", action: "add_tenant", platform: "ALL", status: "ACTIVE" },
  "rent collection & direct zero-fee upi intent": { tutorial_key: "rent_collection", module: "rent_collection", action: "collect_rent", platform: "ALL", status: "ACTIVE" },
  "property setup: rooms, floors & bed allocation": { tutorial_key: "room_management", module: "property_setup", action: "configure_rooms", platform: "WEB", status: "ACTIVE" },
  "digilocker aadhaar kyc & agreement signing": { tutorial_key: "kyc_verification", module: "kyc_verification", action: "verify_aadhaar", platform: "ALL", status: "ACTIVE" },
  "staff management, wardens & granular roles": { tutorial_key: "staff_management", module: "staff_management", action: "manage_staff", platform: "WEB", status: "ACTIVE" },
  "tracking pg expenses, electricity & monthly profits": { tutorial_key: "expense_tracker", module: "expense_management", action: "record_expense", platform: "ALL", status: "ACTIVE" },
  "tenant complaints & maintenance ticketing": { tutorial_key: "complaints_resolution", module: "complaint_management", action: "resolve_complaint", platform: "ALL", status: "ACTIVE" },
  "publishing your pg online & capturing direct leads": { tutorial_key: "public_listing", module: "public_listing", action: "post_pg", platform: "ALL", status: "ACTIVE" },
};

function normalizeTutorial(item: any): Tutorial {
  const titleKey = (item.title || "").toLowerCase().trim();
  const meta = TUTORIAL_METADATA_MAP[titleKey];

  const key = item.tutorial_key || item.tutorialKey || meta?.tutorial_key || titleKey.replace(/[^a-z0-9]+/g, '_') || 'guide';
  const url = item.youtube_url || item.youtubeUrl || item.videoUrl || item.video_url || 'https://www.youtube.com/watch?v=kYJ5_3t4pWw';
  const thumb = item.thumbnail_url || item.thumbnailUrl || extractYouTubeThumbnail(url) || 'https://img.youtube.com/vi/kYJ5_3t4pWw/hqdefault.jpg';

  return {
    id: item.id || key,
    title: item.title || 'PG Ease Tutorial Guide',
    tutorial_key: key,
    tutorialKey: key,
    module: item.module || meta?.module || item.category || 'general_onboarding',
    action: item.action || meta?.action || 'view',
    description: item.description || '',
    youtube_url: url,
    video_url: url,
    thumbnail_url: thumb,
    platform: item.platform || meta?.platform || 'ALL',
    status: item.status || meta?.status || (item.isActive !== false ? 'ACTIVE' : 'INACTIVE'),
    sort_order: item.sort_order ?? item.displayOrder ?? 0,
    duration: item.duration || '4:00',
    badge: item.badge || 'Core Feature',
    created_at: item.createdAt || item.created_at,
    updated_at: item.updatedAt || item.updated_at,
  };
}

function extractYouTubeThumbnail(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return null;
}
