import { HelpTopic } from '../types/tutorial';

/**
 * Help topics mirror the real feature groups in the Owner app sidebar. Each links to the
 * screen where the feature lives so owners can jump straight from "how" to "do".
 */
export const HELP_TOPICS: HelpTopic[] = [
  {
    key: 'getting-started',
    title: 'Getting started',
    description: 'Set up your PG, add rooms and beds, and bring in your first tenants.',
    modules: ['general', 'general_onboarding', 'property_setup'],
    ownerAppPath: '/dashboard',
  },
  {
    key: 'tenants',
    title: 'Tenants',
    description: 'Add tenants, manage notice periods, and keep tenant records up to date.',
    modules: ['tenant_management'],
    ownerAppPath: '/tenants',
  },
  {
    key: 'rent',
    title: 'Rent & payments',
    description: 'Collect rent, record payments, send reminders and track dues.',
    modules: ['rent_collection', 'expense_management'],
    ownerAppPath: '/rent-payments',
  },
  {
    key: 'kyc',
    title: 'KYC & agreements',
    description: 'Verify tenant identity with Aadhaar and manage rental agreements.',
    modules: ['kyc_verification'],
    ownerAppPath: '/tenants/kyc',
  },
  {
    key: 'rooms',
    title: 'Rooms & property',
    description: 'Blocks, floors, rooms, beds, amenities, house rules and your public listing.',
    modules: ['property_setup', 'public_listing'],
    ownerAppPath: '/my-pgs/structure',
  },
  {
    key: 'operations',
    title: 'Complaints & operations',
    description: 'Resolve complaints, handle guest and night-out requests, and manage meals.',
    modules: ['complaint_management', 'operations'],
    ownerAppPath: '/complaints',
  },
  {
    key: 'staff',
    title: 'Staff & permissions',
    description: 'Add team members and control exactly what each person can see or do.',
    modules: ['staff_management'],
    ownerAppPath: '/team',
  },
  {
    key: 'billing',
    title: 'Plans & billing',
    description: 'Understand your trial, choose a plan, and manage your subscription.',
    modules: ['billing'],
    ownerAppPath: '/plans',
  },
];

/** Most specific topic for a module ("Getting started" is a catch-all, so it's tried last). */
export function topicForModule(module: string): HelpTopic | undefined {
  const m = module.toLowerCase();
  return HELP_TOPICS.find((t) => t.key !== 'getting-started' && t.modules.includes(m)) ?? HELP_TOPICS.find((t) => t.modules.includes(m));
}

export function topicByKey(key: string): HelpTopic | undefined {
  return HELP_TOPICS.find((t) => t.key === key);
}

/** Owner-app screen most relevant to a tutorial key (used for "Open in PG Ease"). */
export const TUTORIAL_OWNER_PATHS: Record<string, string> = {
  tenant_add: '/tenants/add',
  rent_collection: '/rent-payments',
  room_management: '/my-pgs/structure',
  kyc_verification: '/tenants/kyc',
  staff_management: '/team',
  expense_tracker: '/expenses',
  complaints_resolution: '/complaints',
  public_listing: '/post-pg',
  post_your_pg_in_live: '/post-pg',
  post_pg: '/post-pg',
  onboarding_guide: '/dashboard',
};
