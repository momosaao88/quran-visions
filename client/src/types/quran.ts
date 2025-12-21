/**
 * Quranic Data Types
 * Design Philosophy: Islamic Minimalism with Calligraphic Elegance
 * - Clean and simple structure
 * - Focus on accuracy and clarity
 * - Support for multiple tafsir sources
 */

export interface Tafsir {
  source: 'الميسر في غريب القرآن' | 'المختصر في التفسير' | 'السعدي' | 'السراج في غريب القرآن' | 'الميسر في التفسير';
  text: string;
}

export interface Verse {
  number: number;
  text: string;
  tafsirs: Tafsir[];
}

export interface Surah {
  number: number;
  name: string;
  nameArabic: string;
  type: 'مكية' | 'مدنية';
  verses: Verse[];
  verseCount: number;
}

export interface QuranData {
  surahs: Surah[];
}
