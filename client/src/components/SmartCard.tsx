/**
 * Smart Card Component
 * Displays a single ayah with tafsir in a card-based layout
 * Design: Contemporary Islamic with visual hierarchy
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Bookmark, Share2, Copy, Check, Lightbulb } from 'lucide-react';
import SaveShareButtons from './SaveShareButtons';
import GharibTabs from './GharibTabs';

interface ShehriVideo {
  videoId: string;
  url: string;
  title: string;
  word?: string;
}

interface SmartCardProps {
  ayahNumber: number;
  ayahText: string;
  surahNumber: number;
  surahName: string;
  tafsir?: {
    muyassar?: string;
    mukhtasar?: string;
    saadi?: string;
  };
  gharib?: {
    muyassar?: { word: string; meaning: string };
    siraj?: { word: string; meaning: string };
  };
  shehri_videos?: ShehriVideo[];
  translations?: {
    en?: string | null;
    fr?: string | null;
    es?: string | null;
  };
  isSaved?: boolean;
  onAyahClick?: () => void;
}

export default function SmartCard({
  ayahNumber,
  ayahText,
  surahNumber,
  surahName,
  tafsir,
  gharib,
  shehri_videos,
  translations,
  isSaved = false,
  onAyahClick,
}: SmartCardProps) {
  const [tafsirExpanded, setTafsirExpanded] = useState(false);
  const [gharibExpanded, setGharibExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'ar' | 'en' | 'fr' | 'es'>('ar');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ayahText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Prepare gharib entries for GharibTabs
  const gharibEntries = [];
  if (gharib) {
    const hasMuyassar = gharib.muyassar && gharib.muyassar.word && gharib.muyassar.meaning;
    const hasSiraj = gharib.siraj && gharib.siraj.word && gharib.siraj.meaning;
    
    if (hasMuyassar || hasSiraj) {
      gharibEntries.push({
        word: (hasMuyassar ? gharib.muyassar?.word : gharib.siraj?.word) || '',
        muyassar: hasMuyassar ? gharib.muyassar?.meaning || '' : '',
        siraj: hasSiraj ? gharib.siraj?.meaning || '' : '',
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-xl border transition-all duration-300 ${
        isSaved
          ? 'bg-amber-500/10 border-amber-500/30 shadow-lg shadow-amber-500/10'
          : 'bg-card/50 border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10'
      }`}
    >
      {/* Card Header - Ayah Number */}
      <div className="px-6 pt-4 pb-2 border-b border-border/50">
        <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-tajawal font-semibold">
          الآية {ayahNumber}
        </span>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Ayah Text */}
        <motion.div
          onClick={onAyahClick}
          className="mb-6 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
        >
          <p className="quran-text text-center text-quran-text leading-relaxed group-hover:text-primary transition-colors">
            ﴿{ayahText}﴾
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

        {/* Gharib Al-Quran Section with Tabs */}
        <GharibTabs
          gharibEntries={gharibEntries}
          shehriVideos={shehri_videos}
          isExpanded={gharibExpanded}
          onToggle={() => setGharibExpanded(!gharibExpanded)}
        />

        {/* Tafsir Section */}
        {(tafsir?.muyassar || tafsir?.mukhtasar || tafsir?.saadi) && (
          <div className="mb-6">
            {/* Header */}
            <button
              onClick={() => setTafsirExpanded(!tafsirExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Lightbulb size={18} className="text-amber-500" />
                <span className="font-tajawal font-semibold text-foreground">
                  التفسير
                </span>
              </div>
              <motion.div
                animate={{ rotate: tafsirExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} className="text-muted-foreground" />
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence>
              {tafsirExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 space-y-3"
                >
                  {/* Tafsir Muyassar */}
                  {tafsir?.muyassar && (
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <div className="text-xs font-tajawal font-bold text-muted-foreground mb-2 uppercase tracking-wider">
                        الميسر
                      </div>
                      <p className="tafsir-text text-muted-foreground text-sm leading-relaxed">
                        {tafsir.muyassar}
                      </p>
                    </div>
                  )}

                  {/* Tafsir Mukhtasar */}
                  {tafsir?.mukhtasar && (
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <div className="text-xs font-tajawal font-bold text-muted-foreground mb-2 uppercase tracking-wider">
                        المختصر
                      </div>
                      <p className="tafsir-text text-muted-foreground text-sm leading-relaxed">
                        {tafsir.mukhtasar}
                      </p>
                    </div>
                  )}

                  {/* Tafsir Saadi */}
                  {tafsir?.saadi && (
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <div className="text-xs font-tajawal font-bold text-muted-foreground mb-2 uppercase tracking-wider">
                        السعدي
                      </div>
                      <p className="tafsir-text text-muted-foreground text-sm leading-relaxed">
                        {tafsir.saadi}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Divider */}
        {translations && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

            {/* Translation Tabs */}
            <div className="flex gap-2 mb-4 border-b border-border/50 overflow-x-auto">
              <button
                onClick={() => setActiveTab('ar')}
                className={`px-4 py-2 font-tajawal font-semibold text-sm whitespace-nowrap transition-all ${
                  activeTab === 'ar'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                العربية
              </button>
              {translations.en && (
                <button
                  onClick={() => setActiveTab('en')}
                  className={`px-4 py-2 font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === 'en'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  English
                </button>
              )}
              {translations.fr && (
                <button
                  onClick={() => setActiveTab('fr')}
                  className={`px-4 py-2 font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === 'fr'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Français
                </button>
              )}
              {translations.es && (
                <button
                  onClick={() => setActiveTab('es')}
                  className={`px-4 py-2 font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === 'es'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Español
                </button>
              )}
            </div>

            {/* Translation Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'ar' && (
                <motion.div
                  key="ar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-muted/20 rounded-lg border border-border/50"
                >
                  <p className="quran-text text-center text-foreground leading-relaxed">
                    ﴿{ayahText}﴾
                  </p>
                </motion.div>
              )}

              {activeTab === 'en' && translations.en && (
                <motion.div
                  key="en"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-muted/20 rounded-lg border border-border/50"
                >
                  <p className="text-foreground leading-relaxed text-sm">
                    {translations.en}
                  </p>
                </motion.div>
              )}

              {activeTab === 'fr' && translations.fr && (
                <motion.div
                  key="fr"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-muted/20 rounded-lg border border-border/50"
                >
                  <p className="text-foreground leading-relaxed text-sm">
                    {translations.fr}
                  </p>
                </motion.div>
              )}

              {activeTab === 'es' && translations.es && (
                <motion.div
                  key="es"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-muted/20 rounded-lg border border-border/50"
                >
                  <p className="text-foreground leading-relaxed text-sm">
                    {translations.es}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between gap-2 border-t border-border/50 pt-4">
          <SaveShareButtons
            ayahNumber={ayahNumber}
            surahNumber={surahNumber}
            surahName={surahName}
            isSaved={isSaved}
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            title="Copy ayah"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} className="text-muted-foreground" />
            )}
            <span className="text-xs font-tajawal">
              {copied ? 'تم النسخ' : 'نسخ'}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
