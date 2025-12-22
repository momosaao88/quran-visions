/**
 * Save and Share Buttons Component
 * Allows users to save ayahs and share them on social media
 */

import { useState } from 'react';
import { Bookmark, Share2, Copy, Check } from 'lucide-react';
import { useSavedAyahs } from '@/hooks/useSavedAyahs';

interface SaveShareButtonsProps {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  translations?: {
    en: string;
    fr: string;
    es: string;
  };
}

export default function SaveShareButtons({
  surahNumber,
  surahName,
  ayahNumber,
  ayahText,
  translations,
}: SaveShareButtonsProps) {
  const { saveAyah, removeAyah, isAyahSaved } = useSavedAyahs();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(isAyahSaved(surahNumber, ayahNumber));

  const handleSave = () => {
    if (saved) {
      removeAyah(surahNumber, ayahNumber);
      setSaved(false);
    } else {
      saveAyah({
        surahNumber,
        surahName,
        ayahNumber,
        text: ayahText,
        translations,
        savedAt: Date.now(),
      });
      setSaved(true);
    }
  };

  const shareText = `${surahName} ${ayahNumber}:\n${ayahText}`;
  const shareUrl = `${window.location.origin}/surah/${surahNumber}`;

  const handleShare = (platform: string) => {
    let url = '';

    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`p-2 rounded-lg transition-all duration-200 ${
          saved
            ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
        title={saved ? 'إزالة من المحفوظات' : 'حفظ الآية'}
      >
        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
      </button>

      {/* Share Button */}
      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all duration-200"
          title="مشاركة الآية"
        >
          <Share2 size={18} />
        </button>

        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 min-w-max">
            <button
              onClick={() => handleShare('whatsapp')}
              className="w-full px-4 py-2 text-right hover:bg-muted transition-colors flex items-center gap-2 text-sm"
            >
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="w-full px-4 py-2 text-right hover:bg-muted transition-colors flex items-center gap-2 text-sm border-t border-border"
            >
              <span>Twitter</span>
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="w-full px-4 py-2 text-right hover:bg-muted transition-colors flex items-center gap-2 text-sm border-t border-border"
            >
              <span>Facebook</span>
            </button>
            <button
              onClick={() => handleShare('telegram')}
              className="w-full px-4 py-2 text-right hover:bg-muted transition-colors flex items-center gap-2 text-sm border-t border-border"
            >
              <span>Telegram</span>
            </button>
            <button
              onClick={handleCopy}
              className="w-full px-4 py-2 text-right hover:bg-muted transition-colors flex items-center gap-2 text-sm border-t border-border"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>نسخ النص</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
