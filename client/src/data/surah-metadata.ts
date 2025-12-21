/**
 * Surah Metadata
 * Contains information about all surahs including Juz Amma
 */

export interface SurahMetadata {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  type: "مكية" | "مدنية";
  verseCount: number;
  juzNumber: number;
  description: string;
}

export const surahMetadata: Record<number, SurahMetadata> = {
  1: {
    number: 1,
    nameArabic: "الفاتحة",
    nameEnglish: "Al-Fatihah",
    type: "مكية",
    verseCount: 7,
    juzNumber: 1,
    description: "سورة الفاتحة هي أم القرآن وأعظم سوره، تحتوي على الحمد والثناء على الله والدعاء."
  },
  112: {
    number: 112,
    nameArabic: "الإخلاص",
    nameEnglish: "Al-Ikhlas",
    type: "مكية",
    verseCount: 4,
    juzNumber: 30,
    description: "سورة الإخلاص تتضمن توحيد الله الخالص وإفراده بالألوهية والربوبية دون سواه."
  },
  113: {
    number: 113,
    nameArabic: "الفلق",
    nameEnglish: "Al-Falaq",
    type: "مكية",
    verseCount: 5,
    juzNumber: 30,
    description: "سورة الفلق تتضمن الاستعاذة برب الفلق من شرور المخلوقات والسحر والحسد."
  },
  114: {
    number: 114,
    nameArabic: "الناس",
    nameEnglish: "An-Nas",
    type: "مكية",
    verseCount: 6,
    juzNumber: 30,
    description: "سورة الناس تتضمن الاستعاذة برب الناس من شر الوسواس الخناس."
  },
  78: {
    number: 78,
    nameArabic: "النبأ",
    nameEnglish: "An-Naba",
    type: "مكية",
    verseCount: 40,
    juzNumber: 30,
    description: "سورة النبأ تتحدث عن القيامة والبعث والحساب والجنة والنار."
  },
  79: {
    number: 79,
    nameArabic: "النازعات",
    nameEnglish: "An-Naziat",
    type: "مكية",
    verseCount: 46,
    juzNumber: 30,
    description: "سورة النازعات تتحدث عن الملائكة والقيامة وقصة موسى وفرعون."
  },
  80: {
    number: 80,
    nameArabic: "عبس",
    nameEnglish: "Abasa",
    type: "مكية",
    verseCount: 42,
    juzNumber: 30,
    description: "سورة عبس تتحدث عن توبيخ النبي على إعراضه عن الأعمى وخلق الإنسان."
  },
  81: {
    number: 81,
    nameArabic: "التكوير",
    nameEnglish: "At-Takwir",
    type: "مكية",
    verseCount: 29,
    juzNumber: 30,
    description: "سورة التكوير تصف أحوال يوم القيامة والملائكة والوحي."
  }
};

export const juzAmmaSurahs = [1, 112, 113, 114, 78, 79, 80, 81];

export default surahMetadata;
