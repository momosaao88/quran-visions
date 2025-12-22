/**
 * مكون قسم الفيديوهات
 * يعرض فيديوهات غريب القرآن للشيخ الشهري
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Video } from 'lucide-react';

interface VideoItem {
  videoId: string;
  title: string;
  url: string;
}

interface VideoSectionProps {
  videos: VideoItem[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  if (videos.length === 0) return null;

  return (
    <section className="mt-16">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/20 rounded-xl">
          <Video className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="font-amiri text-2xl text-foreground">غريب القرآن</h2>
          <p className="text-sm text-muted-foreground">
            برنامج غريب القرآن - الشيخ عبدالرحمن الشهري
          </p>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <motion.div
            key={video.videoId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="video-card group"
            onClick={() => setSelectedVideo(video)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-navy-light overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary-foreground fill-current mr-[-4px]" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-tajawal text-sm text-foreground line-clamp-2 leading-relaxed">
                {video.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* All Videos Link */}
      <div className="mt-8 text-center">
        <a
          href="https://www.youtube.com/playlist?list=PLoslTfCHb8N9D8iXwxV88DCY3Fic7kd97"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2 px-6 py-3
            bg-white/10 hover:bg-white/20 rounded-full
            text-muted-foreground hover:text-foreground
            transition-all duration-300
          "
        >
          <span>مشاهدة جميع الحلقات (358 حلقة)</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
              title={selectedVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
