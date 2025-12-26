/**
 * Reflection Navigator Component
 * يعرض نقاط اللمسات التفاعلية للآيات مع حالات مختلفة (مكتملة، حالية، معلقة)
 */

import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useMemo } from 'react';

interface TouchPoint {
  id: string;
  ayahNumber: number;
  word: string;
  status: 'completed' | 'current' | 'pending';
}

interface ReflectionNavigatorProps {
  ayahs: any[];
  currentAyahNumber: number;
  onTouchPointClick: (ayahNumber: number) => void;
}

export default function ReflectionNavigator({
  ayahs,
  currentAyahNumber,
  onTouchPointClick,
}: ReflectionNavigatorProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Generate touch points from ayahs with gharib data
  const touchPoints = useMemo(() => {
    return ayahs
      .filter((ayah) => ayah.gharib?.muyassar || ayah.shehri_videos?.length > 0)
      .map((ayah, index) => ({
        id: `touch-${ayah.number}`,
        ayahNumber: ayah.number,
        word: ayah.gharib?.muyassar?.word || ayah.shehri_videos?.[0]?.word || `الآية ${ayah.number}`,
        status:
          ayah.number < currentAyahNumber
            ? 'completed'
            : ayah.number === currentAyahNumber
              ? 'current'
              : 'pending',
      }));
  }, [ayahs, currentAyahNumber]);

  const completedCount = touchPoints.filter((p) => p.status === 'completed').length;
  const totalCount = touchPoints.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="reflection-navigator"
    >
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-tajawal font-semibold text-slate-700">
                اللمسات البيانية
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-cairo">
                {completedCount} / {totalCount}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-slate-200 rounded transition-colors"
            title={isExpanded ? 'إخفاء' : 'عرض'}
          >
            {isExpanded ? (
              <ChevronUp size={20} className="text-slate-600" />
            ) : (
              <ChevronDown size={20} className="text-slate-600" />
            )}
          </button>
        </div>

        {/* Touch Points */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 overflow-x-auto pb-2"
          >
            {touchPoints.map((point, index) => (
              <motion.button
                key={point.id}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTouchPointClick(point.ayahNumber)}
                className={`touch-point touch-point-${point.status} flex-shrink-0 group relative`}
                title={`${point.word} - الآية ${point.ayahNumber}`}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {point.word}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="mt-4 bg-slate-200 rounded-full h-1 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / totalCount) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-green-400 to-blue-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
