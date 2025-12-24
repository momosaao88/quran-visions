/**
 * Translation Toggle Component
 * Allows users to toggle between different translations
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

type TranslationType = 'en' | 'fr' | 'es';

interface TranslationToggleProps {
  activeTranslations: TranslationType[];
  onToggle: (translation: TranslationType) => void;
}

const translations = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function TranslationToggle({ activeTranslations, onToggle }: TranslationToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
      >
        <Globe size={18} />
        <span className="text-sm font-tajawal">الترجمات</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 min-w-max overflow-hidden"
            >
              {translations.map((translation) => {
                const isActive = activeTranslations.includes(translation.code as TranslationType);
                return (
                  <button
                    key={translation.code}
                    onClick={() => {
                      onToggle(translation.code as TranslationType);
                    }}
                    className={`w-full px-4 py-3 text-right flex items-center gap-3 transition-colors border-b border-border last:border-b-0 ${
                      isActive
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <span className="text-lg">{translation.flag}</span>
                    <div className="flex-1">
                      <div className="font-tajawal text-sm">{translation.name}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        isActive ? 'bg-primary border-primary' : 'border-border'
                      }`}
                    >
                      {isActive && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
