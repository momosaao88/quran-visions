/**
 * Hook for managing saved ayahs
 * Handles localStorage operations for bookmarking verses
 */

import { useState, useEffect } from 'react';

export interface SavedAyah {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  translations?: {
    en: string;
    fr: string;
    es: string;
  };
  savedAt: number;
  notes?: string;
}

const STORAGE_KEY = 'quran-visions-saved-ayahs';

export function useSavedAyahs() {
  const [savedAyahs, setSavedAyahs] = useState<SavedAyah[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved ayahs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedAyahs(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading saved ayahs:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save ayah
  const saveAyah = (ayah: SavedAyah) => {
    setSavedAyahs((prev) => {
      // Check if already saved
      const exists = prev.some(
        (a) => a.surahNumber === ayah.surahNumber && a.ayahNumber === ayah.ayahNumber
      );
      
      if (exists) {
        return prev;
      }

      const updated = [...prev, { ...ayah, savedAt: Date.now() }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Remove saved ayah
  const removeAyah = (surahNumber: number, ayahNumber: number) => {
    setSavedAyahs((prev) => {
      const updated = prev.filter(
        (a) => !(a.surahNumber === surahNumber && a.ayahNumber === ayahNumber)
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Check if ayah is saved
  const isAyahSaved = (surahNumber: number, ayahNumber: number): boolean => {
    return savedAyahs.some(
      (a) => a.surahNumber === surahNumber && a.ayahNumber === ayahNumber
    );
  };

  // Add note to saved ayah
  const addNote = (surahNumber: number, ayahNumber: number, note: string) => {
    setSavedAyahs((prev) => {
      const updated = prev.map((a) =>
        a.surahNumber === surahNumber && a.ayahNumber === ayahNumber
          ? { ...a, notes: note }
          : a
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Clear all saved ayahs
  const clearAll = () => {
    setSavedAyahs([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    savedAyahs,
    isLoaded,
    saveAyah,
    removeAyah,
    isAyahSaved,
    addNote,
    clearAll,
  };
}
