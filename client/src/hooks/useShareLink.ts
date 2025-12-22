/**
 * Hook for managing advanced share links
 * Generates and manages shareable links for collections of ayahs
 */

import { useSavedAyahs, SavedAyah } from './useSavedAyahs';

const SHARE_STORAGE_KEY = 'quran-visions-share-links';

export interface ShareLink {
  id: string;
  title: string;
  description?: string;
  ayahs: SavedAyah[];
  createdAt: number;
  expiresAt?: number;
}

export function useShareLink() {
  const { savedAyahs } = useSavedAyahs();

  // Generate unique ID
  const generateId = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Create share link
  const createShareLink = (
    title: string,
    ayahs: SavedAyah[],
    description?: string,
    expiresIn?: number
  ): ShareLink => {
    const shareLink: ShareLink = {
      id: generateId(),
      title,
      description,
      ayahs,
      createdAt: Date.now(),
      expiresAt: expiresIn ? Date.now() + expiresIn : undefined,
    };

    // Save to localStorage
    try {
      const links = JSON.parse(localStorage.getItem(SHARE_STORAGE_KEY) || '[]') as ShareLink[];
      links.push(shareLink);
      localStorage.setItem(SHARE_STORAGE_KEY, JSON.stringify(links));
    } catch (error) {
      console.error('Error saving share link:', error);
    }

    return shareLink;
  };

  // Get share link
  const getShareLink = (id: string): ShareLink | null => {
    try {
      const links = JSON.parse(localStorage.getItem(SHARE_STORAGE_KEY) || '[]') as ShareLink[];
      const link = links.find((l) => l.id === id);

      if (link && link.expiresAt && link.expiresAt < Date.now()) {
        deleteShareLink(id);
        return null;
      }

      return link || null;
    } catch (error) {
      console.error('Error getting share link:', error);
      return null;
    }
  };

  // Get all share links
  const getAllShareLinks = (): ShareLink[] => {
    try {
      const links = JSON.parse(localStorage.getItem(SHARE_STORAGE_KEY) || '[]') as ShareLink[];
      // Filter out expired links
      return links.filter((l) => !l.expiresAt || l.expiresAt >= Date.now());
    } catch (error) {
      console.error('Error getting share links:', error);
      return [];
    }
  };

  // Delete share link
  const deleteShareLink = (id: string): void => {
    try {
      const links = JSON.parse(localStorage.getItem(SHARE_STORAGE_KEY) || '[]') as ShareLink[];
      const filtered = links.filter((l) => l.id !== id);
      localStorage.setItem(SHARE_STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting share link:', error);
    }
  };

  // Generate share URL
  const generateShareUrl = (id: string): string => {
    return `${window.location.origin}/share/${id}`;
  };

  // Create share link from saved ayahs
  const createShareLinkFromSaved = (
    title: string,
    description?: string,
    expiresIn?: number
  ): ShareLink | null => {
    if (savedAyahs.length === 0) {
      return null;
    }

    return createShareLink(title, savedAyahs, description, expiresIn);
  };

  return {
    createShareLink,
    getShareLink,
    getAllShareLinks,
    deleteShareLink,
    generateShareUrl,
    createShareLinkFromSaved,
  };
}
