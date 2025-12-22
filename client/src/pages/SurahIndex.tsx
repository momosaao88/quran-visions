/**
 * صفحة فهرس السور - القرآن الكريم كاملاً
 * التصميم: Contemporary Islamic with Cosmic Night Theme
 * - فهرس الأجزاء الثلاثين
 * - فهرس السور 114
 * - تصفية حسب الجزء ونوع الوحي
 */

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Play, ChevronLeft, Filter, Grid, List, Search, Moon, Sun, Video } from 'lucide-react';
import StarField from '../components/StarField';
import indexData from '../data/surahs/index.json';

interface JuzInfo {
  number: number;
  name: string;
  start_surah: number;
  start_ayah: number;
  end_surah: number;
  end_ayah: number;
}

interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  meaning: string;
  totalAyat: number;
  revelationType: string;
  juz: number;
}

type ViewMode = 'grid' | 'list';
type FilterMode = 'all' | 'meccan' | 'medinan';

export default function SurahIndex() {
  const [surahs, setSurahs] = useState<SurahInfo[]>([]);
  const [juzList, setJuzList] = useState<JuzInfo[]>([]);
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showJuzNav, setShowJuzNav] = useState(false);

  useEffect(() => {
    setSurahs(indexData.surahs);
    setJuzList(indexData.juz);
  }, []);

  // تصفية السور
  const filteredSurahs = useMemo(() => {
    let result = surahs;

    // تصفية حسب الجزء
    if (selectedJuz !== null) {
      result = result.filter(s => s.juz === selectedJuz);
    }

    // تصفية حسب نوع الوحي
    if (filterMode === 'meccan') {
      result = result.filter(s => s.revelationType === 'Meccan');
    } else if (filterMode === 'medinan') {
      result = result.filter(s => s.revelationType === 'Medinan');
    }

    // البحث
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.includes(searchQuery) ||
        s.englishName.toLowerCase().includes(query) ||
        s.meaning.includes(searchQuery) ||
        s.number.toString() === searchQuery
      );
    }

    return result;
  }, [surahs, selectedJuz, filterMode, searchQuery]);

  // إحصائيات
  const stats = useMemo(() => {
    const totalAyat = filteredSurahs.reduce((sum, s) => sum + s.totalAyat, 0);
    const meccan = filteredSurahs.filter(s => s.revelationType === 'Meccan').length;
    const medinan = filteredSurahs.filter(s => s.revelationType === 'Medinan').length;
    return { totalAyat, meccan, medinan };
  }, [filteredSurahs]);

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Star Field Background */}
      <StarField />
      
      {/* Islamic Pattern Overlay */}
      <div className="fixed inset-0 islamic-pattern pointer-events-none" />

      {/* Hero Section */}
      <header className="relative z-10 pt-8 pb-6 md:pt-12 md:pb-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Decorative Element */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>

            {/* Title */}
            <h1 className="font-amiri text-4xl md:text-6xl text-gradient-gold mb-2 gold-glow">
              رؤى قرآنية
            </h1>

            {/* Subtitle */}
            <p className="font-tajawal text-base md:text-lg text-muted-foreground mb-1">
              القرآن الكريم كاملاً مع التفسير والترجمة
            </p>
            <p className="font-tajawal text-sm text-muted-foreground/70">
              تفسير • ترجمة • بصائر • غريب القرآن
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-6 md:gap-10 mt-4">
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-amiri text-primary">{indexData.totalSurahs}</span>
                <span className="text-xs md:text-sm text-muted-foreground">سورة</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-amiri text-primary">{indexData.totalAyat.toLocaleString('ar-EG')}</span>
                <span className="text-xs md:text-sm text-muted-foreground">آية</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-amiri text-primary">{indexData.totalJuz}</span>
                <span className="text-xs md:text-sm text-muted-foreground">جزء</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Juz Navigation */}
      <section className="relative z-10 py-4 border-y border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-amiri text-lg text-primary flex items-center gap-2">
              <Book className="w-4 h-4" />
              فهرس الأجزاء
            </h2>
            <button
              onClick={() => setShowJuzNav(!showJuzNav)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {showJuzNav ? 'إخفاء' : 'عرض الكل'}
            </button>
          </div>

          <AnimatePresence>
            {showJuzNav ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-15 gap-2"
              >
                {juzList.map((juz) => (
                  <button
                    key={juz.number}
                    onClick={() => setSelectedJuz(selectedJuz === juz.number ? null : juz.number)}
                    className={`
                      p-2 rounded-lg text-center transition-all duration-200
                      ${selectedJuz === juz.number 
                        ? 'bg-primary text-primary-foreground scale-105' 
                        : 'bg-white/5 hover:bg-white/10 text-white/80'
                      }
                    `}
                  >
                    <span className="block text-lg font-amiri">{juz.number}</span>
                    <span className="block text-[10px] truncate">{juz.name}</span>
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
              >
                <button
                  onClick={() => setSelectedJuz(null)}
                  className={`
                    px-4 py-2 rounded-full whitespace-nowrap transition-all
                    ${selectedJuz === null 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-white/5 hover:bg-white/10 text-white/80'
                    }
                  `}
                >
                  الكل
                </button>
                {juzList.map((juz) => (
                  <button
                    key={juz.number}
                    onClick={() => setSelectedJuz(juz.number)}
                    className={`
                      px-4 py-2 rounded-full whitespace-nowrap transition-all
                      ${selectedJuz === juz.number 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-white/5 hover:bg-white/10 text-white/80'
                      }
                    `}
                  >
                    الجزء {juz.number}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="relative z-10 py-4">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث عن سورة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-white/5 border border-white/10 rounded-lg
                         text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              {/* Revelation Type Filter */}
              <div className="flex bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    filterMode === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setFilterMode('meccan')}
                  className={`px-3 py-1 rounded text-sm transition-all flex items-center gap-1 ${
                    filterMode === 'meccan' ? 'bg-amber-500 text-white' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  <Moon className="w-3 h-3" />
                  مكية
                </button>
                <button
                  onClick={() => setFilterMode('medinan')}
                  className={`px-3 py-1 rounded text-sm transition-all flex items-center gap-1 ${
                    filterMode === 'medinan' ? 'bg-emerald-500 text-white' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  <Sun className="w-3 h-3" />
                  مدنية
                </button>
              </div>

              {/* View Mode */}
              <div className="flex bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {filteredSurahs.length} سورة • {stats.totalAyat.toLocaleString('ar-EG')} آية
            </span>
            <span>
              {stats.meccan} مكية • {stats.medinan} مدنية
            </span>
          </div>
        </div>
      </section>

      {/* Surahs Grid/List */}
      <main className="relative z-10 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "flex flex-col gap-2"
            }
          >
            {filteredSurahs.map((surah, index) => (
              <motion.div
                key={surah.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.5) }}
              >
                <Link href={`/surah/${surah.number}`}>
                  {viewMode === 'grid' ? (
                    <div className="
                      surah-card group cursor-pointer
                      bg-white/5 backdrop-blur-sm rounded-xl p-4
                      border border-white/10 hover:border-primary/30
                      transition-all duration-300
                      hover:bg-white/10 hover:scale-[1.02]
                    ">
                      {/* Surah Number */}
                      <div className="flex items-start justify-between mb-3">
                        <span className="
                          w-10 h-10 flex items-center justify-center
                          bg-primary/20 text-primary font-amiri text-lg
                          rounded-full border border-primary/30
                        ">
                          {surah.number}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground/70">
                            جزء {surah.juz}
                          </span>
                          <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>

                      {/* Surah Name */}
                      <h2 className="font-amiri text-2xl text-white mb-1 group-hover:text-primary transition-colors">
                        {surah.name}
                      </h2>

                      {/* Surah Info */}
                      <p className="text-sm text-muted-foreground mb-2">
                        {surah.meaning || surah.englishName}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                        <span className="flex items-center gap-1">
                          <Book className="w-3 h-3" />
                          {surah.totalAyat} آية
                        </span>
                        <span className={`
                          px-2 py-0.5 rounded-full text-[10px]
                          ${surah.revelationType === 'Meccan' 
                            ? 'bg-amber-500/20 text-amber-400' 
                            : 'bg-emerald-500/20 text-emerald-400'
                          }
                        `}>
                          {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="
                      group cursor-pointer flex items-center gap-4
                      bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3
                      border border-white/10 hover:border-primary/30
                      transition-all duration-300 hover:bg-white/10
                    ">
                      {/* Surah Number */}
                      <span className="
                        w-10 h-10 flex items-center justify-center flex-shrink-0
                        bg-primary/20 text-primary font-amiri text-lg
                        rounded-full border border-primary/30
                      ">
                        {surah.number}
                      </span>

                      {/* Surah Info */}
                      <div className="flex-1 min-w-0">
                        <h2 className="font-amiri text-xl text-white group-hover:text-primary transition-colors truncate">
                          {surah.name}
                        </h2>
                        <p className="text-sm text-muted-foreground truncate">
                          {surah.meaning || surah.englishName}
                        </p>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
                        <span>جزء {surah.juz}</span>
                        <span>{surah.totalAyat} آية</span>
                        <span className={`
                          px-2 py-0.5 rounded-full
                          ${surah.revelationType === 'Meccan' 
                            ? 'bg-amber-500/20 text-amber-400' 
                            : 'bg-emerald-500/20 text-emerald-400'
                          }
                        `}>
                          {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                        </span>
                      </div>

                      <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredSurahs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">لا توجد نتائج للبحث</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            رؤى قرآنية • القرآن الكريم كاملاً
          </p>
          <p className="text-muted-foreground/50 text-xs mt-2">
            تفسير وترجمة وبصائر مع فيديوهات غريب القرآن للشيخ عبدالرحمن الشهري
          </p>
        </div>
      </footer>
    </div>
  );
}
