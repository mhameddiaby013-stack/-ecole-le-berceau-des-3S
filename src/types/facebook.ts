/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Typages officiels pour l'intégration Facebook Graph API et Page Plugin
 */

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url: string;
  full_picture?: string;
  media_type: 'image' | 'video' | 'album' | 'link' | 'status';
  video_url?: string;
  attachment_title?: string;
  attachment_description?: string;
  shares_count?: number;
  likes_count?: number;
}

export interface FacebookApiResponse {
  status: 'ok' | 'unconfigured' | 'error';
  isConfigured: boolean;
  message?: string;
  error?: string;
  code?: number | string;
  pageUrl: string;
  pageName?: string;
  posts: FacebookPost[];
  cached?: boolean;
  lastUpdated?: string;
}

export interface FacebookPluginConfig {
  pageUrl: string;
  tabs: string; // 'timeline', 'events', 'messages'
  height: number;
  smallHeader: boolean;
  adaptContainerWidth: boolean;
  hideCover: boolean;
  showFacepile: boolean;
}
