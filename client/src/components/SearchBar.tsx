/**
 * Advanced Search Bar Component
 * Allows searching for ayahs, surahs, and keywords
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchResult {
  type: 'surah' | 'ayah';
  surahNumber: number;
  surahName: string;
  ayahNumber?: number;
  text?: string;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onResultSelect?: (result: SearchResult) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  onResultSelect,
  placeholder = 'ابحث عن آية أو سورة...',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    onSearch?.(value);

    if (value.length > 2) {
      // Simulate search results - in production, this would call an API
      const mockResults: SearchResult[] = [];
      
      // Add mock results based on query
      if (value.match(/^\d+$/)) {
        mockResults.push({
          type: 'surah',
          surahNumber: parseInt(value),
          surahName: `السورة ${value}`,
        });
      }

      setResults(mockResults);
    } else {
      setResults([]);
    }
  }, [onSearch]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-2 bg-muted border border-border rounded-lg text-sm font-tajawal focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isFocused && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 left-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
          >
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => {
                  onResultSelect?.(result);
                  handleClear();
                }}
                className="w-full px-4 py-3 text-right border-b border-border last:border-b-0 hover:bg-muted transition-colors"
              >
                <div className="font-tajawal">
                  <div className="font-semibold text-foreground">{result.surahName}</div>
                  {result.ayahNumber && (
                    <div className="text-xs text-muted-foreground">الآية {result.ayahNumber}</div>
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
