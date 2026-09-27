export interface Tutorial {
  id: string;
  title: string;
  tutorial_key: string;
  tutorialKey?: string;
  module: string;
  action: string;
  description: string;
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

export interface ModuleCategory {
  key: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
}
