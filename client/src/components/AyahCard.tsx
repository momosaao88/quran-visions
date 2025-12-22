/**
 * مكون بطاقة الآية
 * يعرض الآية القرآنية مع رقمها وإمكانية النقر للتفسير
 * الآيات المرتبطة بفيديو الشيخ الشهري تظهر بتمييز خاص
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface Video {
  videoId: string;
  title: string;
  url: string;
}

interface Ayah {
  number: number;
  text: string;
  juz: number;
  page: number;
  tafsir: {
    muyassar: string;
    mukhtasar: string;
    saadi: string;
    ibn_kathir?: string;
  };
  gharib: {
    muyassar: { word: string; meaning: string } | Record<string, never>;
    siraj: { word: string; meaning: string } | Record<string, never>;
  };
  video?: Video;
}

interface AyahCardProps {
  ayah: Ayah;
  onClick: () => void;
  isSelected: boolean;
}

export default function AyahCard({ ayah, onClick, isSelected }: AyahCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  
  // Check if ayah has gharib content
  const hasGharib = 
    (ayah.gharib?.muyassar && 'word' in ayah.gharib.muyassar) ||
    (ayah.gharib?.siraj && 'word' in ayah.gharib.siraj);

  // Check if ayah has video
  const hasVideo = ayah.video && ayah.video.videoId;

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(true);
  };

  const handleCloseVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className={`
          ayah-card cursor-pointer relative group
          ${isSelected ? 'ring-2 ring-primary/50 bg-white/10' : ''}
          ${hasVideo ? 'ring-2 ring-red-500/30 bg-red-500/5' : ''}
        `}
      >
        {/* Video Highlight Glow Effect */}
        {hasVideo && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 animate-pulse pointer-events-none" />
        )}

        {/* Ayah Number Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className={`
            w-10 h-10 flex items-center justify-center
            font-amiri text-lg rounded-full border
            ${hasVideo 
              ? 'bg-red-500/20 text-red-400 border-red-500/30' 
              : 'bg-primary/20 text-primary border-primary/30'
            }
          `}>
            {ayah.number}
          </span>
          
          {/* Gharib Indicator */}
          {hasGharib && (
            <span className="
              px-2 py-1 text-xs font-tajawal
              bg-secondary/20 text-secondary-foreground
              rounded-full border border-secondary/30
            ">
              غريب
            </span>
          )}

          {/* Video Indicator */}
          {hasVideo && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVideoClick}
              className="
                px-3 py-1 text-xs font-tajawal flex items-center gap-1
                bg-red-500/20 text-red-400
                rounded-full border border-red-500/30
                hover:bg-red-500/30 transition-colors
              "
            >
              <Play className="w-3 h-3 fill-current" />
              فيديو الشهري
            </motion.button>
          )}
        </div>

        {/* Ayah Text */}
        <div className="pt-16 pb-4">
          <p className={`quran-text text-center leading-[2.5] px-4 ${hasVideo ? 'text-red-100' : ''}`}>
            {ayah.text}
          </p>
        </div>

        {/* Hover Indicator */}
        <div className="
          absolute bottom-4 left-1/2 -translate-x-1/2
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            اضغط للتفسير
          </span>
        </div>

        {/* Page & Juz Info */}
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/50">
          الجزء {ayah.juz} • صفحة {ayah.page}
        </div>

        {/* Decorative Corner */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-xl ${hasVideo ? 'border-red-500/30' : 'border-primary/20'}`} />
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-xl ${hasVideo ? 'border-red-500/30' : 'border-primary/20'}`} />
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && hasVideo && ayah.video && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseVideo}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-black/50 rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-red-400 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-tajawal font-bold text-white text-sm md:text-base">
                      {ayah.video.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      الآية {ayah.number}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseVideo}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* YouTube Embed */}
              <div className="flex-1 bg-black rounded-b-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${ayah.video.videoId}?autoplay=1&rel=0`}
                  title={ayah.video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
