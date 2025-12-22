/**
 * الصفحة الرئيسية - رؤى قرآنية
 * التصميم: Contemporary Islamic with Cosmic Night Theme
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import surahData from '../data/surah_naba.json';
import AyahCard from '../components/AyahCard';
import TafsirPanel from '../components/TafsirPanel';
import VideoSection from '../components/VideoSection';
import StarField from '../components/StarField';

// Types
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
}

export default function Home() {
  const [selectedAyah, setSelectedAyah] = useState<Ayah | null>(null);
  const [showTafsir, setShowTafsir] = useState(false);
  const [activeTafsir, setActiveTafsir] = useState<string>('muyassar');

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

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Star Field Background */}
      <StarField />
      
      {/* Islamic Pattern Overlay */}
      <div className="fixed inset-0 islamic-pattern pointer-events-none" />

      {/* Hero Section */}
      <header className="relative z-10 pt-12 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Decorative Element */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>

            {/* Surah Name */}
            <h1 className="font-amiri text-5xl md:text-7xl text-gradient-gold mb-4 gold-glow">
              سورة {surahData.surah.name}
            </h1>

            {/* Surah Info */}
            <p className="font-tajawal text-lg md:text-xl text-muted-foreground mb-2">
              {surahData.surah.meaning} • {surahData.surah.totalAyat} آية • {surahData.surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
            </p>

            {/* Decorative Divider */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <div className="w-3 h-3 rotate-45 border border-primary/50" />
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid gap-6"
            >
              {surahData.ayat.map((ayah, index) => (
                <motion.div
                  key={ayah.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <AyahCard
                    ayah={ayah as Ayah}
                    onClick={() => handleAyahClick(ayah as Ayah)}
                    isSelected={selectedAyah?.number === ayah.number}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Videos Section */}
          {surahData.videos.length > 0 && (
            <VideoSection videos={surahData.videos} />
          )}
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
            tafsirSources={surahData.tafsirSources}
            gharibSources={surahData.gharibSources}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            رؤى قرآنية • تفسير سورة النبأ
          </p>
          <p className="text-muted-foreground/50 text-xs mt-2">
            مصادر التفسير: الميسر • المختصر • السعدي • الجلالين
          </p>
        </div>
      </footer>
    </div>
  );
}
