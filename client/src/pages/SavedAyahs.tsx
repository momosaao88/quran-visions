/**
 * صفحة الآيات المحفوظة
 * عرض جميع الآيات التي قام المستخدم بحفظها
 */

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Trash2, Home, BookmarkX } from 'lucide-react';
import { useSavedAyahs } from '@/hooks/useSavedAyahs';
import StarField from '@/components/StarField';
import ExportShareOptions from '@/components/ExportShareOptions';

export default function SavedAyahs() {
  const { savedAyahs, removeAyah, clearAll, isLoaded } = useSavedAyahs();
  const [sortBy, setSortBy] = useState<'date' | 'surah'>('date');

  const sortedAyahs = [...savedAyahs].sort((a, b) => {
    if (sortBy === 'date') {
      return b.savedAt - a.savedAt;
    } else {
      return a.surahNumber - b.surahNumber;
    }
  });

  const groupedByDate = sortBy === 'date'
    ? sortedAyahs.reduce((acc, ayah) => {
        const date = new Date(ayah.savedAt).toLocaleDateString('ar-SA');
        if (!acc[date]) acc[date] = [];
        acc[date].push(ayah);
        return acc;
      }, {} as Record<string, typeof savedAyahs>)
    : null;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-cosmic">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      <StarField />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50 backdrop-blur-md bg-black/30">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <button className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-white transition-colors">
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">الرئيسية</span>
            </button>
          </Link>
          <h1 className="font-amiri text-2xl md:text-3xl text-gradient-gold">الآيات المحفوظة</h1>
          <div className="w-12" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-12">
        <div className="container max-w-4xl">
          {savedAyahs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <BookmarkX className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="font-amiri text-2xl text-muted-foreground mb-2">لا توجد آيات محفوظة</h2>
              <p className="text-muted-foreground mb-6">ابدأ بحفظ الآيات المفضلة لديك</p>
              <Link href="/">
                <button className="px-6 py-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">
                  استعرض السور
                </button>
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Controls */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'surah')}
                    className="px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="date">الأحدث أولاً</option>
                    <option value="surah">حسب السورة</option>
                  </select>
                  <span className="text-muted-foreground">
                    {savedAyahs.length} آية
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {savedAyahs.length > 0 && (
                    <>
                      <ExportShareOptions ayahs={savedAyahs} />
                      <button
                        onClick={() => {
                          if (confirm('هل أنت متأكد من حذف جميع الآيات المحفوظة؟')) {
                            clearAll();
                          }
                        }}
                        className="px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        حذف الكل
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Ayahs List */}
              <AnimatePresence mode="popLayout">
                {sortBy === 'date' && groupedByDate
                  ? Object.entries(groupedByDate).map(([date, ayahs]) => (
                      <div key={date} className="mb-8">
                        <h3 className="text-sm font-tajawal text-muted-foreground mb-4 px-4 py-2 bg-muted/30 rounded-lg">
                          {date}
                        </h3>
                        <div className="space-y-3">
                          {ayahs.map((ayah) => (
                            <motion.div
                              key={`${ayah.surahNumber}-${ayah.ayahNumber}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="glass-card p-6 hover:bg-white/10 transition-colors group"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  {/* Surah and Ayah Info */}
                                  <div className="flex items-center gap-3 mb-3">
                                    <Link href={`/surah/${ayah.surahNumber}`}>
                                      <button className="text-sm font-tajawal text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                                        {ayah.surahName} {ayah.ayahNumber}
                                        <ChevronRight className="w-4 h-4" />
                                      </button>
                                    </Link>
                                  </div>

                                  {/* Ayah Text */}
                                  <p className="quran-text text-lg leading-relaxed mb-3">
                                    {ayah.text}
                                  </p>

                                  {/* Translations */}
                                  {ayah.translations && (
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                      {ayah.translations.en && (
                                        <p><span className="text-primary">EN:</span> {ayah.translations.en}</p>
                                      )}
                                      {ayah.translations.fr && (
                                        <p><span className="text-primary">FR:</span> {ayah.translations.fr}</p>
                                      )}
                                      {ayah.translations.es && (
                                        <p><span className="text-primary">ES:</span> {ayah.translations.es}</p>
                                      )}
                                    </div>
                                  )}

                                  {/* Notes */}
                                  {ayah.notes && (
                                    <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                                      <p className="text-sm text-primary">{ayah.notes}</p>
                                    </div>
                                  )}
                                </div>

                                {/* Delete Button */}
                                <button
                                  onClick={() => removeAyah(ayah.surahNumber, ayah.ayahNumber)}
                                  className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                  title="حذف"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))
                  : sortedAyahs.map((ayah) => (
                      <motion.div
                        key={`${ayah.surahNumber}-${ayah.ayahNumber}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="glass-card p-6 hover:bg-white/10 transition-colors group mb-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            {/* Surah and Ayah Info */}
                            <div className="flex items-center gap-3 mb-3">
                              <Link href={`/surah/${ayah.surahNumber}`}>
                                <button className="text-sm font-tajawal text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                                  {ayah.surahName} {ayah.ayahNumber}
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </Link>
                            </div>

                            {/* Ayah Text */}
                            <p className="quran-text text-lg leading-relaxed mb-3">
                              {ayah.text}
                            </p>

                            {/* Translations */}
                            {ayah.translations && (
                              <div className="space-y-2 text-sm text-muted-foreground">
                                {ayah.translations.en && (
                                  <p><span className="text-primary">EN:</span> {ayah.translations.en}</p>
                                )}
                                {ayah.translations.fr && (
                                  <p><span className="text-primary">FR:</span> {ayah.translations.fr}</p>
                                )}
                                {ayah.translations.es && (
                                  <p><span className="text-primary">ES:</span> {ayah.translations.es}</p>
                                )}
                              </div>
                            )}

                            {/* Notes */}
                            {ayah.notes && (
                              <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                                <p className="text-sm text-primary">{ayah.notes}</p>
                              </div>
                            )}
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => removeAyah(ayah.surahNumber, ayah.ayahNumber)}
                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            title="حذف"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
              </AnimatePresence>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
