/**
 * صفحة عرض السورة - ديناميكية
 * التصميم: Contemporary Islamic with Cosmic Night Theme
 */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home, Youtube } from 'lucide-react';
import AyahCard from '../components/AyahCard';
import TafsirPanel from '../components/TafsirPanel';
import StarField from '../components/StarField';
import indexData from '../data/surahs/index.json';

// Types
interface Video {
  videoId: string;
  title: string;
  url: string;
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
    jalalayn: string;
  };
  gharib: {
    muyassar: { word: string; meaning: string } | Record<string, never>;
    siraj: { word: string; meaning: string } | Record<string, never>;
  };
  video?: Video;
}

interface SurahData {
  number: number;
  name: string;
  englishName: string;
  meaning: string;
  ayahCount: number;
  revelationType: string;
  ayat: Ayah[];
}

// Tafsir sources
const tafsirSources = [
  { id: 'muyassar', name: 'التفسير الميسر', author: 'مجمع الملك فهد' },
  { id: 'mukhtasar', name: 'المختصر في التفسير', author: 'مركز تفسير' },
  { id: 'saadi', name: 'تفسير السعدي', author: 'عبدالرحمن السعدي' },
  { id: 'jalalayn', name: 'تفسير الجلالين', author: 'المحلي والسيوطي' },
];

// Gharib sources
const gharibSources = [
  { id: 'muyassar', name: 'الميسر في غريب القرآن', author: 'مجمع الملك فهد' },
  { id: 'siraj', name: 'السراج في غريب القرآن', author: 'محمد الخضيري' },
];

export default function SurahView() {
  const params = useParams<{ number: string }>();
  const surahNumber = parseInt(params.number || '78');
  
  const [surahData, setSurahData] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAyah, setSelectedAyah] = useState<Ayah | null>(null);
  const [showTafsir, setShowTafsir] = useState(false);
  const [activeTafsir, setActiveTafsir] = useState<string>('muyassar');

  // Load surah data
  useEffect(() => {
    const loadSurah = async () => {
      setLoading(true);
      try {
        const data = await import(`../data/surahs/surah_${surahNumber}.json`);
        setSurahData(data.default || data);
      } catch (error) {
        console.error('Error loading surah:', error);
      }
      setLoading(false);
    };
    loadSurah();
  }, [surahNumber]);

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

  const handleAyahClick = (ayah: Ayah) => {
    setSelectedAyah(ayah);
    setShowTafsir(true);
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

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-20 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            {/* Home Link */}
            <Link href="/">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-white transition-colors">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">جزء عمّ</span>
              </button>
            </Link>

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

      {/* Hero Section */}
      <header className="relative z-10 pt-8 pb-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Decorative Element */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>

            {/* Surah Name */}
            <h1 className="font-amiri text-4xl md:text-6xl text-gradient-gold mb-3 gold-glow">
              سورة {surahData.name}
            </h1>

            {/* Surah Info */}
            <p className="font-tajawal text-base md:text-lg text-muted-foreground mb-2">
              {surahData.meaning} • {surahData.ayahCount} آية • {surahData.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
            </p>

            {/* Decorative Divider */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <div className="w-2 h-2 rotate-45 border border-primary/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/50" />
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid gap-4"
            >
              {surahData.ayat.map((ayah, index) => (
                <motion.div
                  key={ayah.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.03, 1) }}
                >
                  <AyahCard
                    ayah={ayah}
                    onClick={() => handleAyahClick(ayah)}
                    isSelected={selectedAyah?.number === ayah.number}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Gharib Al-Quran Videos Section */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="font-amiri text-2xl md:text-3xl text-gradient-gold mb-2">
                  غريب القرآن
                </h2>
                <p className="text-muted-foreground">
                  برنامج غريب القرآن للشيخ عبدالرحمن الشهري
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <Youtube className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  شاهد جميع حلقات برنامج غريب القرآن (358 حلقة)
                </p>
                <a
                  href="https://www.youtube.com/playlist?list=PLoslTfCHb8N9D8iXwxV88DCY3Fic7kd97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Youtube className="w-5 h-5" />
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

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-white/10">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            رؤى قرآنية • سورة {surahData.name}
          </p>
        </div>
      </footer>
    </div>
  );
}
