/**
 * Progress Indicator Component
 * Shows reading progress through the surah
 */

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentAyah: number;
  totalAyahs: number;
  surahName: string;
}

export default function ProgressIndicator({
  currentAyah,
  totalAyahs,
  surahName,
}: ProgressIndicatorProps) {
  const progress = (currentAyah / totalAyahs) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-cosmic border-b border-white/10">
      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        className="h-1 bg-gradient-to-r from-primary via-amber-500 to-primary origin-left"
        style={{ width: `${progress}%` }}
      />

      {/* Progress Text */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-tajawal">
          الآية {currentAyah} من {totalAyahs}
        </span>
        <span className="font-tajawal">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
