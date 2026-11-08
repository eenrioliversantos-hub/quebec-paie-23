'use client';

import React from 'react';
import { AdSlotConfig } from '@/lib/admin-store';

export interface AdBannerProps {
  slotId?: string;
  format?: 'top-leaderboard' | 'bottom-wide' | 'rectangle' | 'sidebar' | string;
  section?: 'home-top' | 'salary-results' | 'blog-article' | 'footer-wide' | 'tools-section' | 'sidebar' | string;
  fallbackSection?: string;
  label?: string;
  className?: string;
  previewSlot?: AdSlotConfig;
  isPreviewMode?: boolean;
  onNavigateToMediaKit?: () => void;
  lang?: string;
}

export const AdBanner: React.FC<AdBannerProps> = () => {
  // All ads and banners removed for a clean, ad-free experience
  return null;
};
