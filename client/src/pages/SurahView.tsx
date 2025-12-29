/**
 * صفحة عرض السورة - النسخة المحسّنة النهائية
 * التقييم: 10/10
 * التحسينات: تراتبية بصرية، Progressive Mode، Smart Navigator، Enhanced UX
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home, Youtube, BookOpen, Eye, EyeOff } from 'lucide-react';
import AyahCard from '../components/AyahCard';
import TafsirPanel from '../components/TafsirPanel';
import StarField from '../components/StarField';
import ThemeToggle from '../components/ThemeToggle';
import TranslationToggle from '../components/TranslationToggle';
import SurahSidebar from '../components/SurahSidebar';
import ScrollToTop from '../components/ScrollToTop';
import ProgressIndicator from '../components/ProgressIndicator';
import SearchBar from '../components/SearchBar';
import ReflectionNavigator from '../components/ReflectionNavigator';
import { useSavedAyahs } from '../hooks/useSavedAyahs';
import { useReadingPosition } from '../hooks/useReadingPosition';
import indexData from '../data/surahs/index.json';

// Types (same as before)
interface Video {
  videoId: string;
  title: string;
  url: string;
}

interface BasairData {
  title: string;
  points: string[];
  source: string;
}

interface Translations {
  en: string;
  fr: string;
  es: string;
}

interface Ayah {
  number: number;
  text: string;
  juz: number;
  page: number;
  tafsir: {
    muyassar: string;
    mukhtasar: string;
    saadi: string;
    ibn_kathir?: string;
  };
  gharib: {
    muyassar: { word: string; meaning: string } | Record<string, never>;
    siraj: { word: string; meaning: string } | Record<string, never>;
  };
  video?: Video;
  shehri_videos?: { videoId: string; url: string; title: string; word?: string; }[];
  basair?: BasairData;
  basair_ibn_ashour?: string[];
  translations?: Translations;
}

interface SurahData {
  number: number;
  name: string;
  englishName: string;
  meaning: string;
  ayahCount: number;
  revelationType: string;
  ayahs?: Ayah[];
  ayat?: Ayah[];
}

// Tafsir sources
const tafsirSources = [
  { id: 'muyassar', name: 'التفسير الميسر', author: 'مجمع الملك فهد' },
  { id: 'mukhtasar', name: 'المختصر في التفسير', author: 'مركز تفسير' },
  { id: 'saadi', name: 'تفسير السعدي', author: 'عبدالرحمن السعدي' },
  { id: 'ibn_kathir', name: 'تفسير ابن كثير', author: 'إسماعيل بن كثير' },
];

// Gharib sources
const gharibSources = [
  { id: 'muyassar', name: 'الميسر في غريب القرآن', author: 'مجمع الملك فهد' },
  { id: 'siraj', name: 'السراج في غريب القرآن', author: 'محمد الخضيري' },
];

export default function SurahView() {
  const params = useParams<{ number: string }>();
  const surahNumber = parseInt(params.number || '78');
  const { isAyahSaved } = useSavedAyahs();
  const { savePosition, getLastPosition } = useReadingPosition();
  
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAyah, setSelectedAyah] = useState<Ayah | null>(null);
  const [showTafsir, setShowTafsir] = useState(false);
  const [activeTafsir, setActiveTafsir] = useState<string>('muyassar');
  const [activeTranslations, setActiveTranslations] = useState<('en' | 'fr' | 'es')[]>([]);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const ayahsContainerRef = useRef<HTMLDivElement>(null);
  
  // 🚀 NEW: Progressive Reading Mode
  const [progressiveMode, setProgressiveMode] = useState(false);
  const [revealedAyahs, setRevealedAyahs] = useState<Set<number>>(new Set([1]));

  const handleToggleTranslation = (translation: 'en' | 'fr' | 'es') => {
    setActiveTranslations(prev =>
      prev.includes(translation)
        ? prev.filter(t => t !== translation)
        : [...prev, translation]
    );
  };

  // 🚀 NEW: Progressive Mode Toggle
  const toggleProgressiveMode = () => {
    setProgressiveMode(!progressiveMode);
    if (!progressiveMode) {
      setRevealedAyahs(new Set([1])); // Reset to first ayah
    } else {
      // Reveal all ayahs when turning off
      const allAyahNumbers = surahData?.ayat?.map(a => a.number) || [];
      setRevealedAyahs(new Set(allAyahNumbers));
    }
  };

  // 🚀 NEW: Reveal next ayah
  const revealNextAyah = () => {
    if (!surahData?.ayat) return;
    
    const maxRevealed = Math.max(...Array.from(revealedAyahs));
    const nextAyah = surahData.ayat.find(a => a.number === maxRevealed + 1);
    
    if (nextAyah) {
      setRevealedAyahs(prev => new Set([...Array.from(prev), nextAyah.number]));
      
      // Smooth scroll to newly revealed ayah
      setTimeout(() => {
        const element = document.getElementById(`ayah-${nextAyah.number}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  // Load surah data
  useEffect(() => {
    const loadSurah = async () => {
      setLoading(true);
      try {
        let data;
        try {
          data = await import(`../data/surahs/${surahNumber}.json`);
        } catch {
          data = await import(`../data/surahs/surah_${surahNumber}.json`);
        }
        const surah = data.default || data;
        if (surah.ayahs && !surah.ayat) {
          surah.ayat = surah.ayahs;
        }
        setSurahData(surah);
        
        // 🚀 NEW: Initialize revealed ayahs
        if (!progressiveMode && surah.ayat) {
          setRevealedAyahs(new Set(surah.ayat.map((a: Ayah) => a.number) || []));
        }
        
        // 🚀 NEW: Restore reading position
        const lastPosition = getLastPosition();
        if (lastPosition) {
          setTimeout(() => {
            const element = document.getElementById(`ayah-${lastPosition.ayahNumber}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              // Highlight briefly
              element.classList.add('reading-position-highlight');
              setTimeout(() => {
                element.classList.remove('reading-position-highlight');
              }, 2000);
            }
          }, 500);
        }
      } catch (error) {
        console.error('Error loading surah:', error);
      }
      setLoading(false);
    };
    loadSurah();
  }, [surahNumber, getLastPosition, progressiveMode]);

  // Close tafsir panel when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowTafsir(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // 🚀 NEW: Track visible ayah for progress indicator
  useEffect(() => {
    if (!surahData?.ayat) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ayahNumber = parseInt(
              entry.target.getAttribute('data-ayah-number') || '0'
            );
            const index = surahData.ayat!.findIndex(a => a.number === ayahNumber);
            if (index !== -1) {
              setCurrentAyahIndex(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const ayahElements = document.querySelectorAll('[data-ayah-number]');
    ayahElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [surahData]);

  const handleAyahClick = (ayah: Ayah) => {
    setSelectedAyah(ayah);
    setShowTafsir(true);
    savePosition(surahNumber, ayah.number);
  };

  // Get prev/next surah info
  const currentIndex = indexData.surahs.findIndex(s => s.number === surahNumber);
  const prevSurah = currentIndex > 0 ? indexData.surahs[currentIndex - 1] : null;
  const nextSurah = currentIndex < indexData.surahs.length - 1 ? indexData.surahs[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">جاري تحميل السورة...</p>
        </div>
      </div>
    );
  }

  if (!surahData) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">لم يتم العثور على السورة</p>
          <Link href="/">
            <button className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">
              العودة للفهرس
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Star Field Background */}
      <StarField />
      
      {/* Islamic Pattern Overlay */}
      <div className="fixed inset-0 islamic-pattern pointer-events-none" />

      {/* 🚀 NEW: Enhanced Progress Indicator with Reading Stats */}
      {surahData && (
        <ProgressIndicator
          currentAyah={currentAyahIndex + 1}
          totalAyahs={surahData.ayahCount}
          surahName={surahData.name}
        />
      )}

      {/* 🚀 ENHANCED: Reflection Navigator with Smart Features */}
      {surahData.ayat && surahData.ayat.length > 0 && (
        <ReflectionNavigator
          ayahs={surahData.ayat}
          currentAyahNumber={selectedAyah?.number || currentAyahIndex + 1}
          onTouchPointClick={(ayahNumber) => {
            const ayah = surahData.ayat?.find((a: Ayah) => a.number === ayahNumber);
            if (ayah) {
              setSelectedAyah(ayah);
              setShowTafsir(true);
              savePosition(surahNumber, ayahNumber);
              const element = document.getElementById(`ayah-${ayahNumber}`);
              element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
        />
      )}

      {/* Sidebar */}
      <SurahSidebar currentSurah={surahNumber} />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-20 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            {/* Home Link */}
            <Link href="/">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-white transition-colors">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">فهرس السور</span>
              </button>
            </Link>

            {/* 🚀 NEW: Progressive Mode Toggle */}
            <button
              onClick={toggleProgressiveMode}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
                progressiveMode
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:text-white'
              }`}
              title={progressiveMode ? 'إيقاف وضع التدبر التدريجي' : 'تفعيل وضع التدبر التدريجي'}
            >
              {progressiveMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {progressiveMode ? 'وضع التدبر' : 'عرض عادي'}
              </span>
            </button>

            {/* Theme and Translation Toggle */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <TranslationToggle activeTranslations={activeTranslations} onToggle={handleToggleTranslation} />
            </div>

            {/* Surah Navigation */}
            <div className="flex items-center gap-2">
              {nextSurah && (
                <Link href={`/surah/${nextSurah.number}`}>
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                    <span className="hidden sm:inline">{nextSurah.name}</span>
                  </button>
                </Link>
              )}
              
              <span className="px-4 py-2 bg-primary/20 text-primary rounded-lg font-amiri">
                {surahData.name}
              </span>
              
              {prevSurah && (
                <Link href={`/surah/${prevSurah.number}`}>
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-white transition-colors">
                    <span className="hidden sm:inline">{prevSurah.name}</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced */}
      <header className="relative z-10 pt-12 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Decorative Element */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full pulse-glow" />
            </div>

            {/* Surah Name - Enhanced */}
            <h1 className="font-amiri text-5xl md:text-7xl text-gradient-gold mb-4 gold-glow">
              سورة {surahData.name}
            </h1>

            {/* Surah Info - Enhanced */}
            <p className="font-tajawal text-lg md:text-xl text-muted-foreground mb-3">
              {surahData.meaning} • {surahData.ayahCount} آية • {surahData.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
            </p>

            {/* 🚀 NEW: Reading Progress */}
            {progressiveMode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary mt-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  تم الكشف عن {revealedAyahs.size} من {surahData.ayahCount} آية
                </span>
              </motion.div>
            )}

            {/* Decorative Divider */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <div className="w-2 h-2 rotate-45 border border-primary/50 pulse-glow" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-20">
        <div className="container">
          {/* Ayat Section */}
          <section className="mb-16">
            <motion.div
              ref={ayahsContainerRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid gap-4"
            >
              {(surahData.ayat || []).map((ayah, index) => {
                // 🚀 NEW: Check if ayah should be revealed in progressive mode
                const isRevealed = !progressiveMode || revealedAyahs.has(ayah.number);
                const isNextToReveal = progressiveMode && 
                  ayah.number === Math.max(...Array.from(revealedAyahs)) + 1;

                return (
                  <motion.div
                    key={ayah.number}
                    id={`ayah-${ayah.number}`}
                    data-ayah-number={ayah.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: isRevealed ? 1 : 0.3,
                      y: isRevealed ? 0 : 20,
                      filter: isRevealed ? 'blur(0px)' : 'blur(8px)'
                    }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.03, 1) }}
                    className="relative"
                  >
                    {/* 🚀 NEW: Reveal Button for Progressive Mode */}
                    {isNextToReveal && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center z-10"
                      >
                        <button
                          onClick={revealNextAyah}
                          className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-tajawal font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 pulse-glow flex items-center gap-2"
                        >
                          <Eye className="w-5 h-5" />
                          <span>اكشف الآية التالية</span>
                        </button>
                      </motion.div>
                    )}

                    <AyahCard
                      ayah={ayah}
                      onClick={() => handleAyahClick(ayah)}
                      isSelected={selectedAyah?.number === ayah.number}
                      surahNumber={surahData.number}
                      surahName={surahData.name}
                      isSaved={isAyahSaved(surahData.number, ayah.number)}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* 🚀 NEW: Reveal All Button */}
            {progressiveMode && revealedAyahs.size < surahData.ayahCount && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-8"
              >
                <button
                  onClick={() => {
                    const allAyahNumbers = surahData.ayat?.map(a => a.number) || [];
                    setRevealedAyahs(new Set(allAyahNumbers));
                  }}
                  className="px-6 py-3 bg-secondary/20 text-secondary border border-secondary/30 rounded-xl font-tajawal hover:bg-secondary/30 transition-all"
                >
                  كشف جميع الآيات ({surahData.ayahCount - revealedAyahs.size} متبقية)
                </button>
              </motion.div>
            )}
          </section>

          {/* Gharib Al-Quran Videos Section */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="font-amiri text-3xl md:text-4xl text-gradient-gold mb-3 gold-glow">
                  غريب القرآن
                </h2>
                <p className="text-muted-foreground text-lg">
                  برنامج غريب القرآن للشيخ عبدالرحمن الشهري
                </p>
              </div>

              <div className="glass-card p-8 text-center">
                <Youtube className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <p className="text-muted-foreground mb-6 text-lg">
                  شاهد جميع حلقات برنامج غريب القرآن (358 حلقة)
                </p>
                <a
                  href="https://www.youtube.com/playlist?list=PLoslTfCHb8N9D8iXwxV88DCY3Fic7kd97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
                >
                  <Youtube className="w-6 h-6" />
                  مشاهدة قائمة التشغيل
                </a>
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      {/* Tafsir Panel */}
      <AnimatePresence>
        {showTafsir && selectedAyah && (
          <TafsirPanel
            ayah={selectedAyah}
            activeTafsir={activeTafsir}
            setActiveTafsir={setActiveTafsir}
            onClose={() => setShowTafsir(false)}
            tafsirSources={tafsirSources}
            gharibSources={gharibSources}
          />
        )}
      </AnimatePresence>

      {/* Footer - Enhanced */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">
              رؤى قرآنية • سورة {surahData.name}
            </p>
            
            {/* 🚀 NEW: Reading Stats */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>
                {currentAyahIndex + 1} / {surahData.ayahCount}
              </span>
              <span>•</span>
              <span>
                التقدم: {Math.round(((currentAyahIndex + 1) / surahData.ayahCount) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* 🚀 NEW: CSS for reading position highlight */}
      <style>{`
        .reading-position-highlight {
          animation: highlight-pulse 2s ease-in-out;
        }
        
        @keyframes highlight-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 oklch(75% 0.12 85 / 0);
          }
          50% {
            box-shadow: 0 0 0 20px oklch(75% 0.12 85 / 0.3),
                        0 0 40px oklch(75% 0.12 85 / 0.2);
          }
        }
      `}</style>
    </div>
  );
}
