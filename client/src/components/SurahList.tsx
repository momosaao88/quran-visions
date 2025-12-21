/**
 * SurahList Component
 * Design Philosophy: Islamic Minimalism
 * - Clean list of surahs
 * - Each surah shows its verses
 * - Click on verse to see tafsir
 * - Highlight verses with videos
 */

import { Surah, Verse } from '@/types/quran';
import { ChevronDown, Play } from 'lucide-react';
import { useState } from 'react';
import { hasVideo } from '@/data/video-mappings';

interface SurahListProps {
  surahs: Surah[];
  onVerseClick: (surahNumber: number, verse: Verse) => void;
}

export default function SurahList({ surahs, onVerseClick }: SurahListProps) {
  const [expandedSurah, setExpandedSurah] = useState<number | null>(1);

  const toggleSurah = (surahNumber: number) => {
    setExpandedSurah(expandedSurah === surahNumber ? null : surahNumber);
  };

  return (
    <div className="space-y-4">
      {surahs.map((surah) => (
        <div
          key={surah.number}
          className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
        >
          {/* Surah Header */}
          <button
            onClick={() => toggleSurah(surah.number)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                {surah.number}
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'Amiri, serif' }}>
                  {surah.nameArabic}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {surah.verseCount} آية • {surah.type}
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-primary transition-transform ${
                expandedSurah === surah.number ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Verses List */}
          {expandedSurah === surah.number && (
            <div className="border-t border-border bg-background">
              <div className="space-y-2 p-4">
                {surah.verses.map((verse) => {
                  const hasVideoForVerse = hasVideo(surah.number, verse.number);
                  return (
                    <button
                      key={verse.number}
                      onClick={() => onVerseClick(surah.number, verse)}
                      className={`w-full text-right p-4 rounded-lg transition-colors border group ${
                        hasVideoForVerse
                          ? 'bg-yellow-50 hover:bg-yellow-100 border-yellow-300 hover:border-yellow-400'
                          : 'bg-card hover:bg-secondary border-transparent hover:border-accent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
                            {verse.number}
                          </span>
                          {hasVideoForVerse && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
                              <Play className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <p
                          className="text-lg leading-relaxed text-foreground group-hover:text-primary transition-colors"
                          style={{ fontFamily: 'Amiri, serif' }}
                        >
                          {verse.text}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
