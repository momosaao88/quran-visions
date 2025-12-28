/**
 * Hook لحفظ وتحميل موضع القراءة
 * يحفظ آخر سورة وآية تم قراءتها
 */

import { useEffect, useCallback } from 'react';

interface ReadingPosition {
  surahNumber: number;
  ayahNumber: number;
  timestamp: number;
}

const STORAGE_KEY = 'quran-reading-position';

export function useReadingPosition() {
  // حفظ موضع القراءة
  const savePosition = useCallback((surahNumber: number, ayahNumber: number) => {
    const position: ReadingPosition = {
      surahNumber,
      ayahNumber,
      timestamp: Date.now(),
    };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
      
      // محاولة مزامنة مع السحابة (إذا كان متاحاً)
      if (navigator.onLine) {
        // يمكن إضافة API call هنا لاحقاً
        console.log('Reading position saved:', position);
      }
    } catch (error) {
      console.error('Failed to save reading position:', error);
    }
  }, []);

  // تحميل آخر موضع قراءة
  const getLastPosition = useCallback((): ReadingPosition | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load reading position:', error);
    }
    return null;
  }, []);

  // حذف موضع القراءة
  const clearPosition = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear reading position:', error);
    }
  }, []);

  // حفظ الموضع عند إغلاق الصفحة
  useEffect(() => {
    const handleBeforeUnload = () => {
      // يتم حفظ الموضع تلقائياً عند كل تغيير
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return {
    savePosition,
    getLastPosition,
    clearPosition,
  };
}
