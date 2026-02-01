/**
 * Gharib Tabs Component
 * Displays gharib al-quran with tabbed interface
 * Similar to tafsir tabs: Muyassar, Siraj, Shehri Videos
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Video } from 'lucide-react';

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
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const hasMuyassar = gharibEntries.some(g => g.muyassar);
  const hasSiraj = gharibEntries.some(g => g.siraj);
  const hasVideos = shehriVideos && shehriVideos.length > 0;

  const tabs: { id: TabType; label: string; color: string; bgColor: string }[] = [
    { id: 'muyassar', label: 'الميسر', color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-500/10 border-blue-500/20' },
    { id: 'siraj', label: 'السراج', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-500/10 border-green-500/20' },
    { id: 'videos', label: 'الشيخ الشهري', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-500/10 border-red-500/20' },
  ].filter(tab => {
    if (tab.id === 'muyassar') return hasMuyassar;
    if (tab.id === 'siraj') return hasSiraj;
    if (tab.id === 'videos') return hasVideos;
    return false;
  });

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
            {/* Tabs Navigation */}
            <div className="flex gap-2 mb-4 border-b border-border/50 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-tajawal font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? `${tab.color} border-b-2 border-current`
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
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
                        setSelectedVideoIndex(index);
                        setShowVideoPlayer(true);
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
