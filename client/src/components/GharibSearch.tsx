/**
 * Gharib Al-Quran Advanced Search Component
 * Search for rare Quranic words by surah, word, or meaning
 */

import { useState, useEffect } from 'react';
import { Search, X, BookOpen } from 'lucide-react';

interface GharibEntry {
  surah: number;
  verse: number;
  word: string;
  muyassar: string;
  siraj: string;
}

interface SearchResult {
  surah: number;
  verse: number;
  word: string;
  muyassar: string;
  siraj: string;
}

export default function GharibSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'word' | 'meaning' | 'surah'>('word');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [gharibData, setGharibData] = useState<GharibEntry[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load gharib data on component mount
  useEffect(() => {
    const loadGharibData = async () => {
      try {
        const { gharibQuranExtended } = await import('../data/gharib-quran-extended');
        setGharibData(gharibQuranExtended);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error loading gharib data:', error);
        setDataLoaded(false);
      }
    };

    loadGharibData();
  }, []);

  // Perform search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim() || !dataLoaded) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Convert to lowercase for case-insensitive search
    const lowerQuery = query.toLowerCase();

    try {
      const filtered = gharibData.filter((item: GharibEntry) => {
        switch (searchType) {
          case 'word':
            return item.word.toLowerCase().includes(lowerQuery);
          case 'meaning':
            return (
              item.muyassar.toLowerCase().includes(lowerQuery) ||
              item.siraj.toLowerCase().includes(lowerQuery)
            );
          case 'surah':
            const surahNum = parseInt(query);
            return !isNaN(surahNum) && item.surah === surahNum;
          default:
            return false;
        }
      });

      setResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }

    setIsSearching(false);
  };

  // Get surah name
  const getSurahName = (surahNum: number) => {
    const surahNames: Record<number, string> = {
      1: 'الفاتحة',
      2: 'البقرة',
      3: 'آل عمران',
      4: 'النساء',
      5: 'المائدة',
      6: 'الأنعام',
      7: 'الأعراف',
      8: 'الأنفال',
      9: 'التوبة',
      10: 'يونس',
      11: 'هود',
      12: 'يوسف',
      13: 'الرعد',
      14: 'إبراهيم',
      15: 'الحجر',
      16: 'النحل',
      17: 'الإسراء',
      18: 'الكهف',
      19: 'مريم',
      20: 'طه',
      21: 'الأنبياء',
      22: 'الحج',
      23: 'المؤمنون',
      24: 'النور',
      25: 'الفرقان',
      26: 'الشعراء',
      27: 'النمل',
      28: 'القصص',
      29: 'العنكبوت',
      30: 'الروم',
      31: 'لقمان',
      32: 'السجدة',
      33: 'الأحزاب',
      34: 'سبأ',
      35: 'فاطر',
      36: 'يس',
      37: 'الصافات',
      38: 'ص',
      39: 'الزمر',
      40: 'غافر',
      41: 'فصلت',
      42: 'الشورى',
      43: 'الزخرف',
      44: 'الدخان',
      45: 'الجاثية',
      46: 'الأحقاف',
      47: 'محمد',
      48: 'الفتح',
      49: 'الحجرات',
      50: 'ق',
      51: 'الذاريات',
      52: 'الطور',
      53: 'النجم',
      54: 'القمر',
      55: 'الرحمن',
      56: 'الواقعة',
      57: 'الحديد',
      58: 'المجادلة',
      59: 'الحشر',
      60: 'الممتحنة',
      61: 'الصف',
      62: 'الجمعة',
      63: 'المنافقون',
      64: 'التغابن',
      65: 'الطلاق',
      66: 'التحريم',
      67: 'الملك',
      68: 'القلم',
      69: 'الحاقة',
      70: 'المعارج',
      71: 'نوح',
      72: 'الجن',
      73: 'المزمل',
      74: 'المدثر',
      75: 'القيامة',
      76: 'الإنسان',
      77: 'المرسلات',
      78: 'النبأ',
      79: 'النازعات',
      80: 'عبس',
      81: 'التكوير',
      82: 'الإنفطار',
      83: 'المطففين',
      84: 'الإنشقاق',
      85: 'البروج',
      86: 'الطارق',
      87: 'الأعلى',
      88: 'الغاشية',
      89: 'الفجر',
      90: 'البلد',
      91: 'الشمس',
      92: 'الليل',
      93: 'الضحى',
      94: 'الشرح',
      95: 'التين',
      96: 'العلق',
      97: 'القدر',
      98: 'البينة',
      99: 'الزلزلة',
      100: 'العاديات',
      101: 'القارعة',
      102: 'التكاثر',
      103: 'العصر',
      104: 'الهمزة',
      105: 'الفيل',
      106: 'قريش',
      107: 'الماعون',
      108: 'الكوثر',
      109: 'الكافرون',
      110: 'النصر',
      111: 'المسد',
      112: 'الإخلاص',
      113: 'الفلق',
      114: 'الناس',
    };
    return surahNames[surahNum] || `السورة ${surahNum}`;
  };

  if (!dataLoaded) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="glass-card p-8 rounded-2xl backdrop-blur-xl border border-white/10 text-center">
          <p className="text-muted-foreground">جاري تحميل قاعدة البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="glass-card p-8 rounded-2xl backdrop-blur-xl border border-white/10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="font-amiri text-3xl text-gradient-gold">بحث غريب القرآن</h2>
        </div>

        {/* Search Type Tabs */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {(['word', 'meaning', 'surah'] as const).map(type => (
            <button
              key={type}
              onClick={() => {
                setSearchType(type);
                setResults([]);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-lg font-tajawal transition-all ${
                searchType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/20 text-secondary hover:bg-secondary/30'
              }`}
            >
              {type === 'word' && 'البحث عن كلمة'}
              {type === 'meaning' && 'البحث عن معنى'}
              {type === 'surah' && 'البحث عن سورة'}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <div className="flex items-center gap-3 bg-background/50 border border-white/10 rounded-xl px-4 py-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={
                searchType === 'word'
                  ? 'ابحث عن كلمة غريبة...'
                  : searchType === 'meaning'
                  ? 'ابحث عن معنى...'
                  : 'أدخل رقم السورة...'
              }
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setResults([]);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div>
          {isSearching && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <p className="text-muted-foreground mt-2">جاري البحث...</p>
            </div>
          )}

          {!isSearching && results.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">لم يتم العثور على نتائج</p>
            </div>
          )}

          {!isSearching && results.length === 0 && !searchQuery && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">ابدأ البحث عن الكلمات الغريبة</p>
            </div>
          )}

          {/* Results Grid */}
          {results.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                تم العثور على <span className="text-primary font-semibold">{results.length}</span> نتيجة
              </p>

              <div className="grid gap-4">
                {results.map((result, idx) => (
                  <div
                    key={idx}
                    className="bg-background/30 border border-white/10 rounded-xl p-5 hover:border-primary/30 transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-amiri text-2xl text-primary mb-1">
                          {result.word}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getSurahName(result.surah)} • الآية {result.verse}
                        </p>
                      </div>
                    </div>

                    {/* Meanings */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Muyassar */}
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <p className="text-xs font-semibold text-blue-400 mb-2 uppercase">
                          الميسر في غريب القرآن
                        </p>
                        <p className="text-foreground text-sm leading-relaxed">
                          {result.muyassar}
                        </p>
                      </div>

                      {/* Siraj */}
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <p className="text-xs font-semibold text-green-400 mb-2 uppercase">
                          السراج في غريب القرآن
                        </p>
                        <p className="text-foreground text-sm leading-relaxed">
                          {result.siraj}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
