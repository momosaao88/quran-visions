/**
 * Hook for managing bookmarks/collections
 * Allows users to organize saved ayahs into collections
 */

import { useState, useEffect, useCallback } from 'react';

export interface Bookmark {
  id: string;
  name: string;
  description?: string;
  color: string;
  ayahIds: string[]; // Format: "surahNumber-ayahNumber"
  createdAt: number;
  updatedAt: number;
}

const BOOKMARKS_STORAGE_KEY = 'quran-visions-bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save bookmarks to localStorage
  const saveBookmarks = useCallback((newBookmarks: Bookmark[]) => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(newBookmarks));
      setBookmarks(newBookmarks);
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  }, []);

  // Create a new bookmark/collection
  const createBookmark = useCallback((name: string, description?: string, color: string = '#c17e3a') => {
    const newBookmark: Bookmark = {
      id: `bookmark-${Date.now()}`,
      name,
      description,
      color,
      ayahIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const updated = [...bookmarks, newBookmark];
    saveBookmarks(updated);
    return newBookmark;
  }, [bookmarks, saveBookmarks]);

  // Add ayah to bookmark
  const addToBookmark = useCallback((bookmarkId: string, surahNumber: number, ayahNumber: number) => {
    const ayahId = `${surahNumber}-${ayahNumber}`;
    const updated = bookmarks.map(bookmark => {
      if (bookmark.id === bookmarkId && !bookmark.ayahIds.includes(ayahId)) {
        return {
          ...bookmark,
          ayahIds: [...bookmark.ayahIds, ayahId],
          updatedAt: Date.now(),
        };
      }
      return bookmark;
    });
    saveBookmarks(updated);
  }, [bookmarks, saveBookmarks]);

  // Remove ayah from bookmark
  const removeFromBookmark = useCallback((bookmarkId: string, surahNumber: number, ayahNumber: number) => {
    const ayahId = `${surahNumber}-${ayahNumber}`;
    const updated = bookmarks.map(bookmark => {
      if (bookmark.id === bookmarkId) {
        return {
          ...bookmark,
          ayahIds: bookmark.ayahIds.filter(id => id !== ayahId),
          updatedAt: Date.now(),
        };
      }
      return bookmark;
    });
    saveBookmarks(updated);
  }, [bookmarks, saveBookmarks]);

  // Check if ayah is in bookmark
  const isInBookmark = useCallback((bookmarkId: string, surahNumber: number, ayahNumber: number) => {
    const ayahId = `${surahNumber}-${ayahNumber}`;
    const bookmark = bookmarks.find(b => b.id === bookmarkId);
    return bookmark?.ayahIds.includes(ayahId) ?? false;
  }, [bookmarks]);

  // Update bookmark details
  const updateBookmark = useCallback((bookmarkId: string, updates: Partial<Omit<Bookmark, 'id' | 'createdAt'>>) => {
    const updated = bookmarks.map(bookmark => {
      if (bookmark.id === bookmarkId) {
        return {
          ...bookmark,
          ...updates,
          updatedAt: Date.now(),
        };
      }
      return bookmark;
    });
    saveBookmarks(updated);
  }, [bookmarks, saveBookmarks]);

  // Delete bookmark
  const deleteBookmark = useCallback((bookmarkId: string) => {
    const updated = bookmarks.filter(b => b.id !== bookmarkId);
    saveBookmarks(updated);
  }, [bookmarks, saveBookmarks]);

  // Get bookmarks containing specific ayah
  const getBookmarksForAyah = useCallback((surahNumber: number, ayahNumber: number) => {
    const ayahId = `${surahNumber}-${ayahNumber}`;
    return bookmarks.filter(b => b.ayahIds.includes(ayahId));
  }, [bookmarks]);

  return {
    bookmarks,
    isLoaded,
    createBookmark,
    addToBookmark,
    removeFromBookmark,
    isInBookmark,
    updateBookmark,
    deleteBookmark,
    getBookmarksForAyah,
  };
}
