/**
 * مكون لوحة التفسير
 * يعرض التفسيرات المختلفة للآية المحددة
 * التفسيرات: الميسر، المختصر، السعدي، ابن كثير
 * البصائر: السامرائي، ابن عاشور
 * الترجمات: الإنجليزية، الفرنسية، الإسبانية
 */

import { motion } from 'framer-motion';
import { X, BookOpen, Sparkles, Lightbulb, GraduationCap, Globe } from 'lucide-react';
import { useState } from 'react';

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
  juz?: number;
  page?: number;
  tafsir: {
    muyassar: string;
    mukhtasar: string;
    saadi: string;
    ibn_kathir?: string;
    kathir?: string;
  };
  gharib?: {
    muyassar?: { word: string; meaning: string } | Record<string, never>;
    siraj?: { word: string; meaning: string } | Record<string, never>;
  };
  basair?: BasairData;
  basair_ibn_ashour?: string[];
  ibn_ashour?: string;
  translations?: Translations;
}

interface TafsirSource {
  id: string;
  name: string;
  author?: string;
  description?: string;
}

interface TafsirPanelProps {
  ayah: Ayah;
  activeTafsir: string;
  setActiveTafsir: (id: string) => void;
  onClose: () => void;
  tafsirSources: TafsirSource[];
  gharibSources: TafsirSource[];
}

const translationSources = [
  { id: 'en', name: 'English', flag: '🇬🇧', fullName: 'Sahih International' },
  { id: 'fr', name: 'Français', flag: '🇫🇷', fullName: 'Muhammad Hamidullah' },
  { id: 'es', name: 'Español', flag: '🇪🇸', fullName: 'Julio Cortés' },
];

export default function TafsirPanel({
  ayah,
  activeTafsir,
  setActiveTafsir,
  onClose,
  tafsirSources,
  gharibSources,
}: TafsirPanelProps) {
  const [activeTranslation, setActiveTranslation] = useState('en');

  // Get current tafsir text
  const getTafsirText = () => {
    const tafsirMap: Record<string, string> = {
      muyassar: ayah.tafsir.muyassar,
      mukhtasar: ayah.tafsir.mukhtasar,
      saadi: ayah.tafsir.saadi,
      ibn_kathir: ayah.tafsir.ibn_kathir || ayah.tafsir.kathir || '',
    };
    return tafsirMap[activeTafsir] || '';
  };

  // Get current translation text
  const getTranslationText = () => {
    if (!ayah.translations) return '';
    return ayah.translations[activeTranslation as keyof Translations] || '';
  };

  // Check if gharib exists
  const hasGharib = ayah.gharib && (
    (ayah.gharib.muyassar && 'word' in ayah.gharib.muyassar) ||
    (ayah.gharib.siraj && 'word' in ayah.gharib.siraj)
  );

  // Check if basair exists (السامرائي)
  const hasBasairSamurai = ayah.basair && ayah.basair.points && ayah.basair.points.length > 0;

  // Check if basair ibn ashour exists
  const hasBasairIbnAshour = (ayah.basair_ibn_ashour && ayah.basair_ibn_ashour.length > 0) || (ayah.ibn_ashour && ayah.ibn_ashour.length > 0);

  // Check if translations exist
  const hasTranslations = ayah.translations && (ayah.translations.en || ayah.translations.fr || ayah.translations.es);

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
                <p className="text-sm text-muted-foreground">{ayah.juz && `الجزء ${ayah.juz}`} {ayah.page && `• صفحة ${ayah.page}`}</p>
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

            {/* Translations Section */}
            {hasTranslations && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <h4 className="font-tajawal font-bold text-foreground">الترجمات</h4>
                  <span className="text-xs text-muted-foreground">- مجمع الملك فهد</span>
                </div>
                
                {/* Translation Language Tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {translationSources.map((source) => (
                    <button
                      key={source.id}
                      onClick={() => setActiveTranslation(source.id)}
                      className={`
                        px-4 py-2 rounded-full text-sm font-tajawal transition-all flex items-center gap-2
                        ${activeTranslation === source.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-muted-foreground hover:bg-white/20'
                        }
                      `}
                    >
                      <span>{source.flag}</span>
                      <span>{source.name}</span>
                    </button>
                  ))}
                </div>

                {/* Translation Text */}
                <motion.div
                  key={activeTranslation}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 border border-blue-500/20"
                >
                  <p className="text-foreground/90 leading-relaxed text-left" dir="ltr" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    {getTranslationText() || 'Translation not available'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3 pt-2 border-t border-white/10">
                    {translationSources.find(s => s.id === activeTranslation)?.fullName}
                  </p>
                </motion.div>
              </div>
            )}

            {/* Basair Al-Bayan Section - السامرائي */}
            {hasBasairSamurai && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <h4 className="font-tajawal font-bold text-foreground">بصائر البيان</h4>
                  <span className="text-xs text-muted-foreground">- د. فاضل السامرائي</span>
                </div>
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/20">
                  <h5 className="font-tajawal font-bold text-amber-300 mb-3">
                    {ayah.basair?.title}
                  </h5>
                  <ul className="space-y-2">
                    {ayah.basair?.points.map((point, index) => (
                      <li key={index} className="flex gap-2 text-foreground/90">
                        <span className="text-amber-400 mt-1">•</span>
                        <span className="tafsir-text leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3 pt-2 border-t border-white/10">
                    المصدر: {ayah.basair?.source}
                  </p>
                </div>
              </div>
            )}

            {/* Basair Ibn Ashour Section - ابن عاشور */}
            {hasBasairIbnAshour && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-tajawal font-bold text-foreground">تفسير ابن عاشور</h4>
                  <span className="text-xs text-muted-foreground">- التحرير والتنوير</span>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border border-emerald-500/20">
                  {ayah.basair_ibn_ashour && ayah.basair_ibn_ashour.length > 0 ? (
                    <ul className="space-y-3">
                      {ayah.basair_ibn_ashour.map((point, index) => (
                        <li key={index} className="flex gap-2 text-foreground/90">
                          <span className="text-emerald-400 mt-1 flex-shrink-0">◆</span>
                          <span className="tafsir-text leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : ayah.ibn_ashour ? (
                    <p className="tafsir-text leading-relaxed text-foreground/90">
                      {ayah.ibn_ashour}
                    </p>
                  ) : null}
                  <p className="text-xs text-muted-foreground mt-3 pt-2 border-t border-white/10">
                    المصدر: التحرير والتنوير - الشيخ محمد الطاهر ابن عاشور
                  </p>
                </div>
              </div>
            )}

            {/* Gharib Section */}
            {hasGharib && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <h4 className="font-tajawal font-bold text-foreground">غريب القرآن</h4>
                </div>
                <div className="grid gap-3">
                  {ayah.gharib?.muyassar && 'word' in ayah.gharib.muyassar && (
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
                  {ayah.gharib?.siraj && 'word' in ayah.gharib.siraj && (
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
