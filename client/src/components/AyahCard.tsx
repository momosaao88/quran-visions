/**
 * مكون بطاقة الآية - v4.0 - Smart Card Design
 * يعرض الآية القرآنية مع رقمها وإمكانية النقر للتفسير
 * الآيات المرتبطة بفيديو الشيخ الشهري تظهر بتمييز خاص (تظليل أحمر)
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Video } from 'lucide-react';
import SmartCard from './SmartCard';

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
  shehri_videos?: ShehriVideo[];
  video?: Video;
  translations?: {
    en?: string;
    fr?: string;
    es?: string;
  };
}

interface AyahCardProps {
  ayah: Ayah;
  onClick?: () => void;
  isSelected?: boolean;
  surahNumber: number;
  surahName: string;
  isSaved?: boolean;
}

export default function AyahCard({
  ayah,
  onClick,
  isSelected = false,
  surahNumber,
  surahName,
  isSaved = false,
}: AyahCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const hasVideo = useMemo(() => {
    return (ayah.shehri_videos && ayah.shehri_videos.length > 0) || !!ayah.video;
  }, [ayah.shehri_videos, ayah.video]);

  const videoId = useMemo(() => {
    if (ayah.shehri_videos && ayah.shehri_videos.length > 0) {
      return ayah.shehri_videos[selectedVideoIndex]?.videoId || ayah.shehri_videos[0].videoId;
    }
    return ayah.video?.videoId || ayah.video?.id || '';
  }, [ayah.shehri_videos, ayah.video, selectedVideoIndex]);

  const videoCount = ayah.shehri_videos?.length || (ayah.video ? 1 : 0);

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(true);
  };

  const handleCloseVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(false);
  };

  // Prepare tafsir data
  const tafsirData = {
    muyassar: ayah.tafsir?.muyassar,
    mukhtasar: ayah.tafsir?.mukhtasar,
    saadi: ayah.tafsir?.saadi,
  };

  // Prepare gharib data
  const gharibData = {
    muyassar: ayah.gharib?.muyassar && Object.keys(ayah.gharib.muyassar).length > 0 
      ? ayah.gharib.muyassar as { word: string; meaning: string }
      : undefined,
    siraj: ayah.gharib?.siraj && Object.keys(ayah.gharib.siraj).length > 0
      ? ayah.gharib.siraj as { word: string; meaning: string }
      : undefined,
  };

  return (
    <>
      {/* Smart Card */}
      <SmartCard
        ayahNumber={ayah.number}
        ayahText={ayah.text}
        surahNumber={surahNumber}
        surahName={surahName}
        tafsir={tafsirData}
        gharib={gharibData}
        shehri_videos={ayah.shehri_videos}
        translations={ayah.translations}
        isSaved={isSaved}
        onAyahClick={onClick}
      />

      {/* Video Section */}
      {hasVideo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Video size={18} className="text-red-500" />
              <span className="font-tajawal font-semibold text-foreground">
                غريب القرآن
              </span>
              {videoCount > 1 && (
                <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded">
                  {videoCount} فيديو
                </span>
              )}
            </div>
            <button
              onClick={handleVideoClick}
              className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              <Play size={16} />
              تشغيل
            </button>
          </div>

          {/* Video Selector */}
          {videoCount > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {ayah.shehri_videos?.map((video, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVideoIndex(index)}
                  className={`px-3 py-1 rounded text-sm font-tajawal whitespace-nowrap transition-colors ${
                    selectedVideoIndex === index
                      ? 'bg-red-500 text-white'
                      : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                  }`}
                >
                  {video.word || `الفيديو ${index + 1}`}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Video Player Modal */}
      <AnimatePresence>
        {showVideo && videoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseVideo}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-black rounded-lg overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseVideo}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>

              {/* Video Player */}
              <div className="aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={`غريب القرآن - الآية ${ayah.number}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
