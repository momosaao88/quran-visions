/**
 * QuranVisions - Home Page
 * Design Philosophy: Islamic Minimalism with Calligraphic Elegance
 * - Clean white background with gold accents
 * - Amiri font for Arabic text
 * - Simple and focused interface
 * - Bottom Sheet for tafsir display
 */

import { useState } from 'react';
import { Verse } from '@/types/quran';
import SurahList from '@/components/SurahList';
import VerseDetail from '@/components/VerseDetail';
import { quranData } from '@/data/quran-data';

export default function Home() {
  const [selectedVerse, setSelectedVerse] = useState<{
    surahNumber: number;
    verse: Verse;
  } | null>(null);

  const handleVerseClick = (surahNumber: number, verse: Verse) => {
    setSelectedVerse({ surahNumber, verse });
  };

  const getSurahByNumber = (surahNumber: number) => {
    return quranData.surahs.find(s => s.number === surahNumber);
  };

  const handleClose = () => {
    setSelectedVerse(null);
  };

  return (
    <div className="min-h-screen bg-white text-foreground" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center text-primary" style={{ fontFamily: 'Amiri, serif' }}>
            المصحف الشريف
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            مع التفسيرات الموثوقة
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <SurahList 
          surahs={quranData.surahs}
          onVerseClick={handleVerseClick}
        />
      </main>

      {/* Verse Detail Bottom Sheet */}
      {selectedVerse && getSurahByNumber(selectedVerse.surahNumber) && (
        <VerseDetail
          surahName={getSurahByNumber(selectedVerse.surahNumber)!.nameArabic}
          verse={selectedVerse.verse}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
