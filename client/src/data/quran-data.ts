/**
 * Quranic Data
 * This file contains the Quranic text and tafsirs
 * Includes all Juz Amma surahs with complete tafsirs
 */

import { juzAmmaVerses } from './juz-amma-verses';
import { juzAmmaTafsirs } from './juz-amma-tafsirs';
import { surahMetadata } from './surah-metadata';
import type { Tafsir, Verse, Surah, QuranData } from '@/types/quran';

// Helper function to build surahs from data
function buildSurah(surahNumber: number): Surah {
  const metadata = surahMetadata[surahNumber];
  const verses = juzAmmaVerses[surahNumber as keyof typeof juzAmmaVerses] || [];
  const tafsirs = juzAmmaTafsirs[surahNumber as keyof typeof juzAmmaTafsirs] || {};

  const tafsirSources: Array<'الميسر في غريب القرآن' | 'المختصر في التفسير' | 'السعدي' | 'السراج في غريب القرآن' | 'الميسر في التفسير'> = [
    'الميسر في غريب القرآن',
    'المختصر في التفسير',
    'السعدي',
    'السراج في غريب القرآن',
    'الميسر في التفسير'
  ];

  return {
    number: surahNumber,
    name: metadata.nameEnglish,
    nameArabic: metadata.nameArabic,
    type: metadata.type,
    verseCount: metadata.verseCount,
    verses: verses.map((text, index) => {
      const verseNumber = (index + 1) as keyof typeof tafsirs;
      const verseTafsirs = tafsirs[verseNumber] || {};
      
      const verseData: Verse = {
        number: index + 1,
        text,
        tafsirs: tafsirSources
          .filter(source => source in verseTafsirs)
          .map(source => {
            const tafsirText = verseTafsirs[source as keyof typeof verseTafsirs];
            return {
              source,
              text: typeof tafsirText === 'string' ? tafsirText : ''
            } as Tafsir;
          })
      };
      
      return verseData;
    })
  };
}

// Build all Juz Amma surahs
const allSurahs = [1, 112, 113, 114, 78, 79, 80, 81].map(buildSurah);

export const quranData: QuranData = {
  surahs: allSurahs
};

// Export individual surahs for convenience
export const surahAlFatihah = allSurahs[0];
export const surahAlIkhlas = allSurahs[1];
export const surahAlFalaq = allSurahs[2];
export const surahAnNas = allSurahs[3];
export const surahAnNaba = allSurahs[4];
export const surahAnNaziat = allSurahs[5];
export const surahAbasa = allSurahs[6];
export const surahAtTakwir = allSurahs[7];

export default quranData;
