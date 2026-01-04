/**
 * Gharib Al-Quran Search Page
 * Advanced search interface for rare Quranic words
 */

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Home, BookOpen } from 'lucide-react';
import GharibSearch from '../components/GharibSearch';
import StarField from '../components/StarField';
import ThemeToggle from '../components/ThemeToggle';
import ScrollToTop from '../components/ScrollToTop';

export default function GharibSearchPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <StarField />

      {/* Navigation */}
      <nav className="sticky top-0 z-20 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-white transition-colors">
                <Home className="w-4 h-4" />
                <span>الرئيسية</span>
              </button>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-amiri text-lg text-gradient-gold">بحث غريب القرآن</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Decorative Element */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full pulse-glow" />
            </div>

            {/* Title */}
            <h1 className="font-amiri text-5xl md:text-6xl text-gradient-gold mb-4 gold-glow">
              غريب القرآن الكريم
            </h1>

            {/* Subtitle */}
            <p className="font-tajawal text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              ابحث عن الكلمات الغريبة والنادرة في القرآن الكريم مع شروحات موثوقة من الميسر والسراج
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 max-w-md mx-auto">
              <div className="glass-card p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">159</p>
                <p className="text-xs text-muted-foreground mt-1">كلمة غريبة</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">137</p>
                <p className="text-xs text-muted-foreground mt-1">آية</p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">114</p>
                <p className="text-xs text-muted-foreground mt-1">سورة</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Search Section */}
      <section className="relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GharibSearch />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 border-t border-white/10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-amiri text-3xl text-gradient-gold mb-12 text-center">
              مميزات البحث
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-amiri text-xl mb-3">البحث عن الكلمات</h3>
                <p className="text-muted-foreground text-sm">
                  ابحث عن أي كلمة غريبة في القرآن واحصل على تعريفاتها الموثوقة
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-amiri text-xl mb-3">البحث عن المعاني</h3>
                <p className="text-muted-foreground text-sm">
                  ابحث عن معنى معين واكتشف جميع الكلمات الغريبة ذات الصلة
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-amiri text-xl mb-3">البحث حسب السورة</h3>
                <p className="text-muted-foreground text-sm">
                  اختر سورة واكتشف جميع الكلمات الغريبة فيها
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sources Section */}
      <section className="relative z-10 py-16 border-t border-white/10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="font-amiri text-3xl text-gradient-gold mb-12 text-center">
              المصادر الموثوقة
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Muyassar */}
              <div className="glass-card p-8 rounded-xl border border-blue-500/20 bg-blue-500/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <h3 className="font-amiri text-2xl text-blue-400">الميسر في غريب القرآن</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  تعريفات مبسطة وسهلة الفهم للكلمات الغريبة من مجمع الملك فهد
                </p>
                <p className="text-sm text-muted-foreground">
                  يركز على الشرح المختصر والمباشر للمعاني
                </p>
              </div>

              {/* Siraj */}
              <div className="glass-card p-8 rounded-xl border border-green-500/20 bg-green-500/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <h3 className="font-amiri text-2xl text-green-400">السراج في غريب القرآن</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  شروحات موسعة وتفصيلية للكلمات الغريبة من محمد الخضيري
                </p>
                <p className="text-sm text-muted-foreground">
                  يوفر فهماً عميقاً وشاملاً للمعاني
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}
