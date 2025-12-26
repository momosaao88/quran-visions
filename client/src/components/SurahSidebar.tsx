/**
 * Surah Sidebar Component
 * Displays a list of all surahs for quick navigation
 */

import { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Menu, X, Search } from 'lucide-react';
import indexData from '@/data/surahs/index.json';

interface SurahSidebarProps {
  currentSurah?: number;
  onSurahSelect?: (surahNumber: number) => void;
}

export default function SurahSidebar({ currentSurah, onSurahSelect }: SurahSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = indexData.surahs.filter(surah =>
    surah.name.includes(searchQuery) ||
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.number.toString().includes(searchQuery)
  );

  const handleSurahClick = (surahNumber: number) => {
    onSurahSelect?.(surahNumber);
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-40 p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors md:hidden"
        title="فتح قائمة السور"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-64 bg-card border-l border-border z-40 flex flex-col md:static md:translate-x-0 md:h-auto md:w-auto md:border-none md:bg-transparent md:flex-row md:flex-wrap md:justify-center md:gap-2 md:p-4"
      >
        {/* Header */}
        <div className="sticky top-0 z-50 bg-card border-b border-border p-4 md:hidden">
          <h2 className="font-tajawal text-lg font-bold text-foreground mb-3">فهرس السور</h2>
          
          {/* Search Input */}
          <div className="relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث عن سورة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 bg-muted border border-border rounded-lg text-sm font-tajawal focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Surahs List */}
        <div className="flex-1 overflow-y-auto md:flex md:flex-wrap md:justify-center md:gap-2 md:p-0">
          {filteredSurahs.map((surah) => (
            <Link key={surah.number} href={`/surah/${surah.number}`}>
              <button
                onClick={() => handleSurahClick(surah.number)}
                className={`w-full px-4 py-3 text-right border-b border-border transition-colors md:w-auto md:px-3 md:py-2 md:border-none md:rounded-lg md:text-sm ${
                  currentSurah === surah.number
                    ? 'bg-primary/20 text-primary md:bg-primary/30'
                    : 'hover:bg-muted text-foreground md:hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between md:flex-col md:items-center md:gap-1">
                  <span className="font-tajawal font-semibold">{surah.name}</span>
                  <span className="text-xs text-muted-foreground md:text-xs">{surah.number}</span>
                </div>
              </button>
            </Link>
          ))}
        </div>
      </motion.aside>
    </>
  );
}
