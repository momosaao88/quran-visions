/**
 * مكون بطاقة الآية - v3.1 - Fixed video highlighting
 * يعرض الآية القرآنية مع رقمها وإمكانية النقر للتفسير
 * الآيات المرتبطة بفيديو الشيخ الشهري تظهر بتمييز خاص (تظليل أحمر)
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Video } from 'lucide-react';
import SaveShareButtons from './SaveShareButtons';

interface VideoMeaning {
  ar: string;
  en: string;
  fr: string;
  es: string;
}

interface ShehriVideo {
  videoId: string;
  url: string;
  title: string;
  word?: string;
}

interface Video {
  videoId?: string;
  id?: string;
  title?: string;
  url?: string;
  word?: string;
  transliteration?: string;
  meaning?: VideoMeaning;
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
  video?: Video;
  shehri_videos?: ShehriVideo[];
  translations?: {
    en: string;
    fr: string;
    es: string;
  };
}

interface AyahCardProps {
  ayah: Ayah;
  onClick: () => void;
  isSelected: boolean;
  surahNumber?: number;
  surahName?: string;
}

export default function AyahCard({ ayah, onClick, isSelected, surahNumber = 1, surahName = 'الفاتحة' }: AyahCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  
  // Check if ayah has gharib content
  const hasGharib = 
    (ayah.gharib?.muyassar && 'word' in ayah.gharib.muyassar) ||
    (ayah.gharib?.siraj && 'word' in ayah.gharib.siraj);

  // Check if ayah has Shehri videos - memoized for performance
  const hasVideo = useMemo(() => {
    // Check new structure (shehri_videos array)
    if (ayah.shehri_videos && Array.isArray(ayah.shehri_videos) && ayah.shehri_videos.length > 0) {
      return true;
    }
    // Check old structure (video object)
    if (ayah.video && (ayah.video.videoId || ayah.video.id)) {
      return true;
    }
    return false;
  }, [ayah.shehri_videos, ayah.video]);
  
  // Get first video for display
  const firstVideo = useMemo(() => {
    if (ayah.shehri_videos && ayah.shehri_videos.length > 0) {
      return ayah.shehri_videos[0];
    }
    return ayah.video;
  }, [ayah.shehri_videos, ayah.video]);

  const videoId = useMemo(() => {
    if (ayah.shehri_videos && ayah.shehri_videos.length > 0) {
      return ayah.shehri_videos[0].videoId;
    }
    return ayah.video?.videoId || ayah.video?.id || '';
  }, [ayah.shehri_videos, ayah.video]);

  const videoCount = ayah.shehri_videos?.length || (ayah.video ? 1 : 0);

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(true);
  };

  const handleCloseVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(false);
  };

  // Build className based on state
  const cardClassName = useMemo(() => {
    // Use different base class for video vs non-video ayahs
    const baseClass = hasVideo ? 'ayah-card-video' : 'ayah-card';
    const classes = [baseClass, 'cursor-pointer', 'relative', 'group'];
    
    if (isSelected) {
      classes.push('ring-2', 'ring-primary/50', 'bg-white/10');
    }
    
    return classes.join(' ');
  }, [isSelected, hasVideo]);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className={cardClassName}
      >
        {/* Video Highlight Glow Effect */}
        {hasVideo && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/20 via-red-500/5 to-red-500/20 pointer-events-none" />
        )}

        {/* Ayah Number Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className={`
            w-10 h-10 flex items-center justify-center
            font-amiri text-lg rounded-full border
            ${hasVideo 
              ? 'bg-red-500/30 text-red-300 border-red-500/50' 
              : 'bg-primary/20 text-primary border-primary/30'
            }
          `}>
            {ayah.number}
          </span>
          
          {/* Gharib Indicator */}
          {hasGharib && !hasVideo && (
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
                px-3 py-1.5 text-xs font-tajawal flex items-center gap-1.5
                bg-red-500/30 text-red-300
                rounded-full border border-red-500/50
                hover:bg-red-500/40 transition-colors
                shadow-lg shadow-red-500/20
              "
            >
              <Video className="w-3.5 h-3.5" />
              <span>الشهري</span>
              {videoCount > 1 && (
                <span className="bg-red-500/50 px-1.5 rounded-full text-[10px]">
                  {videoCount}
                </span>
              )}
            </motion.button>
          )}
        </div>

        {/* Ayah Text */}
        <div className="pt-16 pb-4">
          <p className={`quran-text text-center leading-[2.5] px-4 ${hasVideo ? 'text-red-50' : ''}`}>
            {ayah.text}
          </p>
        </div>

        {/* Video Word Badge */}
        {hasVideo && firstVideo?.word && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <span className="text-xs text-red-400 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
              الكلمة: {firstVideo.word}
            </span>
          </div>
        )}

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
        {(ayah.juz || ayah.page) && (
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/50">
            {ayah.juz && `الجزء ${ayah.juz}`} {ayah.page && `• صفحة ${ayah.page}`}
          </div>
        )}

        {/* Save and Share Buttons */}
        <div className="absolute top-4 left-4">
          <SaveShareButtons
            surahNumber={surahNumber}
            surahName={surahName}
            ayahNumber={ayah.number}
            ayahText={ayah.text}
            translations={ayah.translations}
          />
        </div>

        {/* Decorative Corner */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-xl ${hasVideo ? 'border-red-500/40' : 'border-primary/20'}`} />
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-xl ${hasVideo ? 'border-red-500/40' : 'border-primary/20'}`} />
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && hasVideo && (
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
                      {firstVideo?.title || `غريب القرآن - ${firstVideo?.word || ''}`}
                    </h3>
                    <p className="text-xs text-gray-400">
                      الآية {ayah.number} {firstVideo?.word && `• ${firstVideo.word}`}
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
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={firstVideo?.title || 'غريب القرآن'}
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
