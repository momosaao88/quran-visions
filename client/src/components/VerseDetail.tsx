/**
 * VerseDetail Component
 * Design Philosophy: Islamic Minimalism
 * - Bottom Sheet modal for tafsir display
 * - Tabs for different tafsir sources
 * - Gold borders and clean design
 */

import { Verse } from '@/types/quran';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VerseDetailProps {
  surahName: string;
  verse: Verse;
  onClose: () => void;
}

export default function VerseDetail({ surahName, verse, onClose }: VerseDetailProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border rounded-t-2xl p-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Amiri, serif' }}>
              {surahName}
            </h2>
            <p className="text-sm text-muted-foreground">
              الآية {verse.number}
            </p>
          </div>
          <div className="w-10" />
        </div>

        {/* Verse Text */}
        <div className="px-6 py-6 border-b border-border bg-secondary/30">
          <p
            className="text-3xl leading-relaxed text-center text-foreground"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            {verse.text}
          </p>
        </div>

        {/* Tafsir Tabs */}
        <div className="p-6">
          <Tabs value={activeTab.toString()} onValueChange={(val) => setActiveTab(parseInt(val))}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 bg-secondary p-1 rounded-lg">
              {verse.tafsirs.map((tafsir, index) => (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  className="text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-white rounded"
                >
                  <span className="hidden sm:inline">{tafsir.source.split(' ')[0]}</span>
                  <span className="sm:hidden">{index + 1}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {verse.tafsirs.map((tafsir, index) => (
              <TabsContent key={index} value={index.toString()} className="mt-6">
                <div className="bg-card border border-accent/30 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-primary mb-4" style={{ fontFamily: 'Amiri, serif' }}>
                    {tafsir.source}
                  </h3>
                  <p
                    className="text-lg leading-relaxed text-foreground"
                    style={{ fontFamily: 'Amiri, serif' }}
                  >
                    {tafsir.text}
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
}
