/**
 * مكون لوحة التفسير
 * يعرض التفسيرات المختلفة للآية المحددة
 */

import { motion } from 'framer-motion';
import { X, BookOpen, Sparkles } from 'lucide-react';

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

interface TafsirSource {
  id: string;
  name: string;
  description: string;
}

interface TafsirPanelProps {
  ayah: Ayah;
  activeTafsir: string;
  setActiveTafsir: (id: string) => void;
  onClose: () => void;
  tafsirSources: TafsirSource[];
  gharibSources: TafsirSource[];
}

export default function TafsirPanel({
  ayah,
  activeTafsir,
  setActiveTafsir,
  onClose,
  tafsirSources,
  gharibSources,
}: TafsirPanelProps) {
  // Get current tafsir text
  const getTafsirText = () => {
    const tafsirMap: Record<string, string> = {
      muyassar: ayah.tafsir.muyassar,
      mukhtasar: ayah.tafsir.mukhtasar,
      saadi: ayah.tafsir.saadi,
      jalalayn: ayah.tafsir.jalalayn,
    };
    return tafsirMap[activeTafsir] || '';
  };

  // Check if gharib exists
  const hasGharib = 
    (ayah.gharib.muyassar && 'word' in ayah.gharib.muyassar) ||
    (ayah.gharib.siraj && 'word' in ayah.gharib.siraj);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Panel */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-hidden"
      >
        <div className="glass-card rounded-t-3xl border-t border-primary/20">
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-white/20 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="
                w-12 h-12 flex items-center justify-center
                bg-primary/20 text-primary font-amiri text-xl
                rounded-full border border-primary/30
              ">
                {ayah.number}
              </span>
              <div>
                <h3 className="font-amiri text-xl text-foreground">الآية {ayah.number}</h3>
                <p className="text-sm text-muted-foreground">الجزء {ayah.juz} • صفحة {ayah.page}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-muted-foreground" />
            </button>
          </div>

          {/* Ayah Text */}
          <div className="px-6 py-6 border-b border-white/10 bg-white/5">
            <p className="quran-text text-xl md:text-2xl leading-[2]">
              {ayah.text}
            </p>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[50vh] px-6 py-4">
            {/* Tafsir Tabs */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h4 className="font-tajawal font-bold text-foreground">التفسير</h4>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {tafsirSources.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => setActiveTafsir(source.id)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-tajawal transition-all
                      ${activeTafsir === source.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white/10 text-muted-foreground hover:bg-white/20'
                      }
                    `}
                  >
                    {source.name}
                  </button>
                ))}
              </div>

              {/* Tafsir Text */}
              <motion.div
                key={activeTafsir}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <p className="tafsir-text leading-relaxed">
                  {getTafsirText() || 'لا يوجد تفسير متاح'}
                </p>
              </motion.div>
            </div>

            {/* Gharib Section */}
            {hasGharib && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <h4 className="font-tajawal font-bold text-foreground">غريب القرآن</h4>
                </div>
                <div className="grid gap-3">
                  {ayah.gharib.muyassar && 'word' in ayah.gharib.muyassar && (
                    <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
                      <p className="text-sm text-muted-foreground mb-1">الميسر في غريب القرآن</p>
                      <p className="font-amiri text-lg text-primary mb-1">
                        {ayah.gharib.muyassar.word}
                      </p>
                      <p className="tafsir-text">
                        {ayah.gharib.muyassar.meaning}
                      </p>
                    </div>
                  )}
                  {ayah.gharib.siraj && 'word' in ayah.gharib.siraj && (
                    <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
                      <p className="text-sm text-muted-foreground mb-1">السراج في غريب القرآن</p>
                      <p className="font-amiri text-lg text-primary mb-1">
                        {ayah.gharib.siraj.word}
                      </p>
                      <p className="tafsir-text">
                        {ayah.gharib.siraj.meaning}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
