/**
 * Bookmark Manager Component
 * Allows users to create and manage bookmarks/collections
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

interface BookmarkManagerProps {
  surahNumber: number;
  ayahNumber: number;
  onClose?: () => void;
}

export default function BookmarkManager({ surahNumber, ayahNumber, onClose }: BookmarkManagerProps) {
  const { bookmarks, createBookmark, addToBookmark, removeFromBookmark, isInBookmark, updateBookmark, deleteBookmark } = useBookmarks();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBookmarkName, setNewBookmarkName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreateBookmark = () => {
    if (newBookmarkName.trim()) {
      createBookmark(newBookmarkName);
      setNewBookmarkName('');
      setShowCreateForm(false);
    }
  };

  const handleToggleAyah = (bookmarkId: string) => {
    if (isInBookmark(bookmarkId, surahNumber, ayahNumber)) {
      removeFromBookmark(bookmarkId, surahNumber, ayahNumber);
    } else {
      addToBookmark(bookmarkId, surahNumber, ayahNumber);
    }
  };

  const handleUpdateBookmark = (bookmarkId: string) => {
    if (editingName.trim()) {
      updateBookmark(bookmarkId, { name: editingName });
      setEditingId(null);
      setEditingName('');
    }
  };

  return (
    <div className="space-y-3">
      {/* Create New Bookmark */}
      <AnimatePresence>
        {showCreateForm ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={newBookmarkName}
              onChange={(e) => setNewBookmarkName(e.target.value)}
              placeholder="اسم الإشارة..."
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/70"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateBookmark()}
            />
            <button
              onClick={handleCreateBookmark}
              className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Check size={18} />
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setNewBookmarkName('');
              }}
              className="px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowCreateForm(true)}
            className="w-full flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-primary hover:bg-white/10 transition-colors"
          >
            <Plus size={18} />
            <span className="text-sm">إنشاء إشارة جديدة</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bookmarks List */}
      {bookmarks.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-tajawal">الإشارات المرجعية:</p>
          {bookmarks.map((bookmark) => {
            const isInThisBookmark = isInBookmark(bookmark.id, surahNumber, ayahNumber);
            return (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                {editingId === bookmark.id ? (
                  <>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-primary/70"
                      onKeyPress={(e) => e.key === 'Enter' && handleUpdateBookmark(bookmark.id)}
                    />
                    <button
                      onClick={() => handleUpdateBookmark(bookmark.id)}
                      className="p-1 text-primary hover:bg-primary/20 rounded transition-colors"
                    >
                      <Check size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleToggleAyah(bookmark.id)}
                      className={`flex items-center gap-2 flex-1 text-left transition-colors ${
                        isInThisBookmark ? 'text-primary' : 'text-muted-foreground hover:text-white'
                      }`}
                    >
                      <Bookmark size={16} fill={isInThisBookmark ? 'currentColor' : 'none'} />
                      <span className="text-sm">{bookmark.name}</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(bookmark.id);
                        setEditingName(bookmark.name);
                      }}
                      className="p-1 text-muted-foreground hover:text-white hover:bg-white/10 rounded transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => deleteBookmark(bookmark.id)}
                      className="p-1 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
