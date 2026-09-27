export interface Tutorial {
  id: string;
  title: string;
  /** Stable key used for URLs and deep links from the Owner app (e.g. `tenant_add`). */
  tutorial_key: string;
  tutorialKey?: string;
  /** Feature module, e.g. `tenant_management`. Derived from the backend category when missing. */
  module: string;
  action: string;
  description: string;
  /** Empty string when the backend has no video for this tutorial yet. */
  youtube_url: string;
  video_url?: string;
  videoUrl?: string;
  thumbnail_url?: string;
  thumbnailUrl?: string;
  platform?: 'ALL' | 'WEB' | 'APP' | string;
  status?: 'ACTIVE' | 'INACTIVE' | string;
  sort_order?: number;
  displayOrder?: number;
  category?: string;
  badge?: string;
  duration?: string;
  created_at?: string;
  updated_at?: string;
}

/** Result of loading the tutorial list — distinguishes "empty" from "failed". */
export interface TutorialsResult {
  tutorials: Tutorial[];
  error: string | null;
}

/** A help topic groups tutorials by feature and links to the matching Owner-app screen. */
export interface HelpTopic {
  key: string;
  title: string;
  description: string;
  /** Module keys (Tutorial.module) that belong to this topic. */
  modules: string[];
  /** Path inside the Owner app where the feature lives. */
  ownerAppPath: string;
}
