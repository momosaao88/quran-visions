/**
 * مكون بطاقة الآية
 * يعرض الآية القرآنية مع رقمها وإمكانية النقر للتفسير
 */

import { motion } from 'framer-motion';

interface Ayah {
  number: number;
  text: string;
  juz: number;
  page: number;
  tafsir: {
    muyassar: string;
    mukhtasar: string;
    saadi: string;
    jalalayn: string;
  };
  gharib: {
    muyassar: { word: string; meaning: string } | Record<string, never>;
    siraj: { word: string; meaning: string } | Record<string, never>;
  };
}

interface AyahCardProps {
  ayah: Ayah;
  onClick: () => void;
  isSelected: boolean;
}

export default function AyahCard({ ayah, onClick, isSelected }: AyahCardProps) {
  // Check if ayah has gharib content
  const hasGharib = 
    (ayah.gharib.muyassar && 'word' in ayah.gharib.muyassar) ||
    (ayah.gharib.siraj && 'word' in ayah.gharib.siraj);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`
        ayah-card cursor-pointer relative group
        ${isSelected ? 'ring-2 ring-primary/50 bg-white/10' : ''}
      `}
    >
      {/* Ayah Number Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="
          w-10 h-10 flex items-center justify-center
          bg-primary/20 text-primary font-amiri text-lg
          rounded-full border border-primary/30
        ">
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
      </div>

      {/* Ayah Text */}
      <div className="pt-16 pb-4">
        <p className="quran-text text-center leading-[2.5] px-4">
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
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-xl" />
    </motion.div>
  );
}
