/**
 * صفحة فهرس السور - جزء عم
 * التصميم: Contemporary Islamic with Cosmic Night Theme
 */

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Book, Play, ChevronLeft } from 'lucide-react';
import StarField from '../components/StarField';
import indexData from '../data/surahs/index.json';

interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  meaning: string;
  totalAyat: number;
  revelationType: string;
}

export default function SurahIndex() {
  const [surahs, setSurahs] = useState<SurahInfo[]>([]);

  useEffect(() => {
    setSurahs(indexData.surahs);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Star Field Background */}
      <StarField />
      
      {/* Islamic Pattern Overlay */}
      <div className="fixed inset-0 islamic-pattern pointer-events-none" />

      {/* Hero Section */}
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
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>

            {/* Title */}
            <h1 className="font-amiri text-5xl md:text-7xl text-gradient-gold mb-4 gold-glow">
              جزء عمّ
            </h1>

            {/* Subtitle */}
            <p className="font-tajawal text-lg md:text-xl text-muted-foreground mb-2">
              الجزء الثلاثون من القرآن الكريم
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <span className="block text-3xl font-amiri text-primary">{indexData.totalSurahs}</span>
                <span className="text-sm text-muted-foreground">سورة</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-amiri text-primary">{indexData.totalAyat}</span>
                <span className="text-sm text-muted-foreground">آية</span>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <div className="w-3 h-3 rotate-45 border border-primary/50" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Surahs Grid */}
      <main className="relative z-10 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {surahs.map((surah, index) => (
              <motion.div
                key={surah.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <Link href={`/surah/${surah.number}`}>
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
                      <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    {/* Surah Name */}
                    <h2 className="font-amiri text-2xl text-white mb-1 group-hover:text-primary transition-colors">
                      {surah.name}
                    </h2>

                    {/* Surah Info */}
                    <p className="text-sm text-muted-foreground mb-2">
                      {surah.meaning}
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
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            رؤى قرآنية • جزء عمّ
          </p>
          <p className="text-muted-foreground/50 text-xs mt-2">
            تفسير وغريب القرآن مع فيديوهات الشيخ عبدالرحمن الشهري
          </p>
        </div>
      </footer>
    </div>
  );
}
