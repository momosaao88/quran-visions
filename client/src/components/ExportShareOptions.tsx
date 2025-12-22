/**
 * Export and Share Options Component
 * Provides options to export and share saved ayahs
 */

import { useState } from 'react';
import { Download, Share2, Copy, Check, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSavedAyahs, SavedAyah } from '@/hooks/useSavedAyahs';
import { useExportAyahs } from '@/hooks/useExportAyahs';
import { useShareLink } from '@/hooks/useShareLink';

interface ExportShareOptionsProps {
  ayahs: SavedAyah[];
}

export default function ExportShareOptions({ ayahs }: ExportShareOptionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareTitle, setShareTitle] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const { exportToCSV, exportToJSON, exportToTXT, exportToHTML } = useExportAyahs();
  const { createShareLink, generateShareUrl } = useShareLink();

  const handleExport = (format: 'csv' | 'json' | 'txt' | 'html') => {
    const filename = `ayahs-${new Date().toISOString().split('T')[0]}`;
    
    switch (format) {
      case 'csv':
        exportToCSV(ayahs, `${filename}.csv`);
        break;
      case 'json':
        exportToJSON(ayahs, `${filename}.json`);
        break;
      case 'txt':
        exportToTXT(ayahs, `${filename}.txt`);
        break;
      case 'html':
        exportToHTML(ayahs, `${filename}.html`);
        break;
    }
    setShowMenu(false);
  };

  const handleCreateShareLink = () => {
    if (!shareTitle.trim()) return;

    const link = createShareLink(shareTitle, ayahs);
    if (link) {
      const shareUrl = generateShareUrl(link.id);
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShareTitle('');
      setShowShareDialog(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Export Button */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
          title="تصدير ومشاركة"
        >
          <Download size={18} />
          <span className="hidden sm:inline">تصدير</span>
        </button>

        {/* Export Menu */}
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 min-w-max"
          >
            <button
              onClick={() => handleExport('csv')}
              className="w-full px-4 py-2 text-right hover:bg-muted transition-colors flex items-center gap-2 text-sm"
            >
              <span>CSV</span>
            </button>
            <button
              onClick={() => handleExport('json')}
              className="w-full px-4 py-2 text-right hover:bg-muted transition-colors flex items-center gap-2 text-sm border-t border-border"
            >
              <span>JSON</span>
            </button>
            <button
              onClick={() => handleExport('txt')}
              className="w-full px-4 py-2 text-right hover:bg-muted transition-colors flex items-center gap-2 text-sm border-t border-border"
            >
              <span>Text</span>
            </button>
            <button
              onClick={() => handleExport('html')}
              className="w-full px-4 py-2 text-right hover:bg-muted transition-colors flex items-center gap-2 text-sm border-t border-border"
            >
              <span>HTML</span>
            </button>
            <button
              onClick={() => {
                setShowShareDialog(true);
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-right hover:bg-muted transition-colors flex items-center gap-2 text-sm border-t border-border"
            >
              <LinkIcon size={16} />
              <span>رابط مشاركة</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Share Dialog */}
      <AnimatePresence>
        {showShareDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareDialog(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg shadow-lg z-50 p-6 max-w-md w-full mx-4"
            >
              <h3 className="font-tajawal font-bold text-lg mb-4">إنشاء رابط مشاركة</h3>

              <input
                type="text"
                value={shareTitle}
                onChange={(e) => setShareTitle(e.target.value)}
                placeholder="اسم المجموعة (مثال: الآيات المفضلة)"
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              />

              <p className="text-sm text-muted-foreground mb-4">
                سيتم إنشاء رابط فريد يمكنك مشاركته مع الآخرين
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowShareDialog(false)}
                  className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleCreateShareLink}
                  disabled={!shareTitle.trim()}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copied ? 'تم النسخ!' : 'إنشاء ومشاركة'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
