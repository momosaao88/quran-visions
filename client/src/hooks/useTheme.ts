/**
 * Hook for managing dark/light theme
 */

import { useState, useEffect, useCallback } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'quran-visions-theme';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (stored) {
        setTheme(stored);
        applyTheme(stored);
      } else {
        // Default to dark theme
        setTheme('dark');
        applyTheme('dark');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
      applyTheme('dark');
    }
    setIsLoaded(true);
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, [theme]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setTheme(mode);
    applyTheme(mode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, []);

  return {
    theme,
    isLoaded,
    toggleTheme,
    setThemeMode,
  };
}
