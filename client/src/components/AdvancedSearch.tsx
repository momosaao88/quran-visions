/**
 * Advanced Search Component
 * Allows searching across all Quran verses with multiple filters
 */

import { useState, useMemo } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  translations?: {
    en: string;
    fr: string;
    es: string;
  };
}

interface AdvancedSearchProps {
  onResultSelect?: (result: SearchResult) => void;
  allAyahs: SearchResult[];
}

type SearchType = 'text' | 'word' | 'surah';

export default function AdvancedSearch({ onResultSelect, allAyahs }: AdvancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('text');
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);

  // Get unique surahs
  const uniqueSurahs = useMemo(() => {
    const surahs = new Map<number, string>();
    allAyahs.forEach((ayah) => {
      if (!surahs.has(ayah.surahNumber)) {
        surahs.set(ayah.surahNumber, ayah.surahName);
      }
    });
    return Array.from(surahs.entries()).sort((a, b) => a[0] - b[0]);
  }, [allAyahs]);

  // Perform search
  const performSearch = (query: string, type: SearchType, surah: number | null) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    let filtered = allAyahs;

    // Filter by surah if selected
    if (surah !== null) {
      filtered = filtered.filter((ayah) => ayah.surahNumber === surah);
    }

    // Search based on type
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter((ayah) => {
      switch (type) {
        case 'text':
          return ayah.text.includes(query);
        case 'word':
          const words = ayah.text.split(/\s+/);
          return words.some((word) => word.includes(query));
        case 'surah':
          return ayah.surahName.includes(query);
        default:
          return false;
      }
    });

    setResults(filtered.slice(0, 50)); // Limit to 50 results
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query, searchType, selectedSurah);
  };

  const handleTypeChange = (type: SearchType) => {
    setSearchType(type);
    performSearch(searchQuery, type, selectedSurah);
  };

  const handleSurahChange = (surah: number | null) => {
    setSelectedSurah(surah);
    performSearch(searchQuery, searchType, surah);
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
    setIsOpen(false);
    setSearchQuery('');
    setResults([]);
  };

  return (
    <div className="relative">
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all duration-200"
        title="بحث متقدم"
      >
        <Search size={18} />
      </button>

      {/* Search Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50 p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X size={18} />
            </button>

            {/* Search Input */}
            <div className="mb-4 pt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="ابحث عن آية أو كلمة..."
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>

            {/* Search Type Filter */}
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-2 block">نوع البحث</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleTypeChange('text')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    searchType === 'text'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  النص الكامل
                </button>
                <button
                  onClick={() => handleTypeChange('word')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    searchType === 'word'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  كلمة
                </button>
                <button
                  onClick={() => handleTypeChange('surah')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    searchType === 'surah'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  السورة
                </button>
              </div>
            </div>

            {/* Surah Filter */}
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-2 block">تصفية حسب السورة</label>
              <select
                value={selectedSurah ?? ''}
                onChange={(e) => handleSurahChange(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">جميع السور</option>
                {uniqueSurahs.map(([number, name]) => (
                  <option key={number} value={number}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {results.length === 0 && searchQuery ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>لم يتم العثور على نتائج</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground mb-3">
                    {results.length} نتيجة
                  </p>
                  {results.map((result, index) => (
                    <motion.button
                      key={`${result.surahNumber}-${result.ayahNumber}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-right p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-primary font-tajawal text-xs">
                          {result.surahName} {result.ayahNumber}
                        </span>
                      </div>
                      <p className="quran-text text-sm leading-relaxed line-clamp-2">
                        {result.text}
                      </p>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Filter size={24} className="mx-auto mb-2 opacity-50" />
                  <p>ابدأ الكتابة للبحث</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
