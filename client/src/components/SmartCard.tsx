/**
 * Smart Card Component
 * Displays a single ayah with tafsir in a card-based layout
 * Design: Contemporary Islamic with visual hierarchy
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Bookmark, Share2, Copy, Check, Lightbulb } from 'lucide-react';
import SaveShareButtons from './SaveShareButtons';

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
  translations,
  isSaved = false,
  onAyahClick,
}: SmartCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'ar' | 'en' | 'fr' | 'es'>('ar');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ayahText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        {/* Tafsir/Gharib Section */}
        {(tafsir?.muyassar || tafsir?.mukhtasar || tafsir?.saadi || gharib?.muyassar || gharib?.siraj) && (
          <div className="mb-6">
            {/* Header */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Lightbulb size={18} className="text-amber-500" />
                <span className="font-tajawal font-semibold text-foreground">
                  {gharib?.muyassar || gharib?.siraj ? 'غريب القرآن' : 'التفسير'}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} className="text-muted-foreground" />
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 space-y-3"
                >
                  {/* Gharib Muyassar */}
                  {gharib?.muyassar && (
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <div className="text-sm font-tajawal font-semibold text-foreground mb-2">
                        {gharib.muyassar.word}
                      </div>
                      <p className="tafsir-text text-muted-foreground">
                        {gharib.muyassar.meaning}
                      </p>
                    </div>
                  )}

                  {/* Gharib Siraj */}
                  {gharib?.siraj && (
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <div className="text-sm font-tajawal font-semibold text-foreground mb-2">
                        {gharib.siraj.word}
                      </div>
                      <p className="tafsir-text text-muted-foreground">
                        {gharib.siraj.meaning}
                      </p>
                    </div>
                  )}

                  {/* Tafsir Muyassar */}
                  {tafsir?.muyassar && !gharib?.muyassar && (
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <p className="tafsir-text text-muted-foreground">
                        {tafsir.muyassar}
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
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />
        )}

        {/* Translations Tabs */}
        {translations && (
          <div className="mb-6">
            {/* Tab Buttons */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('ar')}
                className={`px-3 py-2 rounded-lg text-sm font-tajawal font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'ar'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                العربية
              </button>
              {translations.en && (
                <button
                  onClick={() => setActiveTab('en')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'en'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  English
                </button>
              )}
              {translations.fr && (
                <button
                  onClick={() => setActiveTab('fr')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'fr'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Français
                </button>
              )}
              {translations.es && (
                <button
                  onClick={() => setActiveTab('es')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'es'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Español
                </button>
              )}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-muted/20 rounded-lg border border-border/50"
              >
                {activeTab === 'ar' && (
                  <p className="tafsir-text text-muted-foreground text-right">
                    {ayahText}
                  </p>
                )}
                {activeTab === 'en' && translations.en && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {translations.en}
                  </p>
                )}
                {activeTab === 'fr' && translations.fr && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {translations.fr}
                  </p>
                )}
                {activeTab === 'es' && translations.es && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {translations.es}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <SaveShareButtons
            surahNumber={surahNumber}
            surahName={surahName}
            ayahNumber={ayahNumber}
            ayahText={ayahText}
            translations={translations as any}
          />
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            title="نسخ النص"
          >
            {copied ? (
              <Check size={18} className="text-green-500" />
            ) : (
              <Copy size={18} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
