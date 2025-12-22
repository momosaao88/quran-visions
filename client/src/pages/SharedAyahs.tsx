/**
 * صفحة عرض الآيات المشتركة
 * عرض الآيات التي تم مشاركتها عبر رابط فريد
 */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight, Home, AlertCircle } from 'lucide-react';
import { useShareLink, ShareLink } from '@/hooks/useShareLink';
import StarField from '@/components/StarField';

export default function SharedAyahs() {
  const params = useParams<{ id: string }>();
  const shareId = params.id || '';
  const { getShareLink } = useShareLink();
  const [shareLink, setShareLink] = useState<ShareLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (shareId) {
      const link = getShareLink(shareId);
      if (link) {
        setShareLink(link);
      } else {
        setError(true);
      }
      setLoading(false);
    }
  }, [shareId, getShareLink]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-cosmic">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error || !shareLink) {
    return (
      <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
        <StarField />

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="font-amiri text-2xl text-muted-foreground mb-2">الرابط غير صحيح أو منتهي الصلاحية</h1>
            <p className="text-muted-foreground mb-6">
              قد يكون الرابط قد انتهت صلاحيته أو تم حذفه
            </p>
            <Link href="/">
              <button className="px-6 py-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">
                العودة للرئيسية
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      <StarField />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50 backdrop-blur-md bg-black/30">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <button className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-white transition-colors">
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">الرئيسية</span>
            </button>
          </Link>
          <h1 className="font-amiri text-2xl md:text-3xl text-gradient-gold">الآيات المشتركة</h1>
          <div className="w-12" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-12">
        <div className="container max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="font-amiri text-3xl md:text-4xl text-gradient-gold mb-2">
              {shareLink.title}
            </h2>
            {shareLink.description && (
              <p className="text-muted-foreground text-lg">{shareLink.description}</p>
            )}
            <p className="text-sm text-muted-foreground/70 mt-4">
              {shareLink.ayahs.length} آية
            </p>
          </motion.div>

          {/* Ayahs List */}
          <div className="space-y-4">
            {shareLink.ayahs.map((ayah, index) => (
              <motion.div
                key={`${ayah.surahNumber}-${ayah.ayahNumber}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Surah and Ayah Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <Link href={`/surah/${ayah.surahNumber}`}>
                        <button className="text-sm font-tajawal text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                          {ayah.surahName} {ayah.ayahNumber}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>

                    {/* Ayah Text */}
                    <p className="quran-text text-lg leading-relaxed mb-3">
                      {ayah.text}
                    </p>

                    {/* Translations */}
                    {ayah.translations && (
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {ayah.translations.en && (
                          <p><span className="text-primary">EN:</span> {ayah.translations.en}</p>
                        )}
                        {ayah.translations.fr && (
                          <p><span className="text-primary">FR:</span> {ayah.translations.fr}</p>
                        )}
                        {ayah.translations.es && (
                          <p><span className="text-primary">ES:</span> {ayah.translations.es}</p>
                        )}
                      </div>
                    )}

                    {/* Notes */}
                    {ayah.notes && (
                      <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-sm text-primary">{ayah.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              هل تريد حفظ هذه الآيات؟
            </p>
            <Link href="/">
              <button className="px-6 py-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">
                استعرض التطبيق
              </button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
