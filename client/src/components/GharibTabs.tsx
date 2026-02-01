/**
 * Gharib Tabs Component
 * Displays gharib al-quran with tabbed interface exactly like Tafsir
 * Horizontal tabs: Muyassar, Siraj, Shehri Videos
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Video, Lightbulb } from 'lucide-react';

interface GharibEntry {
  word: string;
  muyassar: string;
  siraj: string;
}

interface ShehriVideo {
  videoId: string;
  url: string;
  title: string;
  word?: string;
}

interface GharibTabsProps {
  gharibEntries?: GharibEntry[];
  shehriVideos?: ShehriVideo[];
  isExpanded: boolean;
  onToggle: () => void;
}

type TabType = 'muyassar' | 'siraj' | 'videos';

export default function GharibTabs({
  gharibEntries = [],
  shehriVideos = [],
  isExpanded,
  onToggle,
}: GharibTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('muyassar');

  const hasMuyassar = gharibEntries.some(g => g.muyassar);
  const hasSiraj = gharibEntries.some(g => g.siraj);
  const hasVideos = shehriVideos && shehriVideos.length > 0;

  if (!hasMuyassar && !hasSiraj && !hasVideos) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors group border border-amber-500/20"
      >
        <div className="flex items-center gap-2">
          <Lightbulb size={18} className="text-amber-500" />
          <span className="font-tajawal font-semibold text-foreground">
            غريب القرآن
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
            className="mt-3"
          >
            {/* Tabs Navigation - Horizontal like Tafsir */}
            <div className="flex gap-3 mb-4 border-b border-border/50 overflow-x-auto pb-0">
              {hasMuyassar && (
                <button
                  onClick={() => setActiveTab('muyassar')}
                  className={`px-4 py-3 font-tajawal font-semibold text-sm whitespace-nowrap transition-all border-b-2 ${
                    activeTab === 'muyassar'
                      ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                      : 'text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  الميسر
                </button>
              )}

              {hasSiraj && (
                <button
                  onClick={() => setActiveTab('siraj')}
                  className={`px-4 py-3 font-tajawal font-semibold text-sm whitespace-nowrap transition-all border-b-2 ${
                    activeTab === 'siraj'
                      ? 'text-green-600 dark:text-green-400 border-green-600 dark:border-green-400'
                      : 'text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  السراج
                </button>
              )}

              {hasVideos && (
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`px-4 py-3 font-tajawal font-semibold text-sm whitespace-nowrap transition-all border-b-2 ${
                    activeTab === 'videos'
                      ? 'text-red-600 dark:text-red-400 border-red-600 dark:border-red-400'
                      : 'text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  الشيخ الشهري
                </button>
              )}
            </div>

            {/* Tab Content - Space separated like Tafsir */}
            <AnimatePresence mode="wait">
              {activeTab === 'muyassar' && hasMuyassar && (
                <motion.div
                  key="muyassar"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {gharibEntries
                    .filter(g => g.muyassar)
                    .map((entry, index) => (
                      <div
                        key={index}
                        className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20"
                      >
                        <div className="text-xs font-tajawal font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">
                          الميسر في غريب القرآن
                        </div>
                        <div className="text-sm font-tajawal font-semibold text-foreground mb-2">
                          {entry.word}
                        </div>
                        <p className="tafsir-text text-muted-foreground text-sm leading-relaxed">
                          {entry.muyassar}
                        </p>
                      </div>
                    ))}
                </motion.div>
              )}

              {activeTab === 'siraj' && hasSiraj && (
                <motion.div
                  key="siraj"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {gharibEntries
                    .filter(g => g.siraj)
                    .map((entry, index) => (
                      <div
                        key={index}
                        className="p-4 bg-green-500/5 rounded-lg border border-green-500/20"
                      >
                        <div className="text-xs font-tajawal font-bold text-green-600 dark:text-green-400 mb-2 uppercase tracking-wider">
                          السراج في غريب القرآن
                        </div>
                        <div className="text-sm font-tajawal font-semibold text-foreground mb-2">
                          {entry.word}
                        </div>
                        <p className="tafsir-text text-muted-foreground text-sm leading-relaxed">
                          {entry.siraj}
                        </p>
                      </div>
                    ))}
                </motion.div>
              )}

              {activeTab === 'videos' && hasVideos && (
                <motion.div
                  key="videos"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  {shehriVideos?.map((video, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        // Handle video play
                        window.open(video.url, '_blank');
                      }}
                      className="w-full p-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/30 transition-colors flex items-center gap-2 text-left group"
                    >
                      <Video size={16} className="text-red-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-tajawal font-semibold text-foreground truncate">
                          {video.word || video.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {video.title}
                        </p>
                      </div>
                      <Play size={14} className="text-red-500 flex-shrink-0" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
