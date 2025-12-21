/**
 * Video Mappings for Sheikh Abdurrahman Al-Shuhri's "Ghareeb Al-Quran" Series
 * 
 * This file maps Quranic verses to their corresponding videos from the playlist:
 * https://www.youtube.com/playlist?list=PLoslTfCHb8N9D8iXwxV88DCY3Fic7kd97
 * 
 * Each entry contains:
 * - surah: Surah number (1-114)
 * - verse: Verse number
 * - word: The specific Quranic word being explained (غريب القرآن)
 * - videoTitle: Title of the YouTube video
 * - videoId: YouTube video ID for embedding
 * - episodeNumber: Episode number in the series
 */

export interface VideoMapping {
  surah: number;
  verse: number;
  word: string;
  videoTitle: string;
  videoId: string;
  episodeNumber: number;
  playlistUrl?: string;
}

export const videoMappings: VideoMapping[] = [
  // Surah Al-Abasa (80) - Verse 1
  {
    surah: 80,
    verse: 1,
    word: "عبس",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 01 - { غثاءً أحوى}",
    videoId: "b7MEB7iOSfI",
    episodeNumber: 1,
    playlistUrl: "https://www.youtube.com/playlist?list=PLoslTfCHb8N9D8iXwxV88DCY3Fic7kd97"
  },

  // Surah Al-Ikhlas (112) - Verse 2
  {
    surah: 112,
    verse: 2,
    word: "الصمد",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 02 - { الله الصمد}",
    videoId: "nMezLNQzD_4",
    episodeNumber: 2
  },

  // Surah Al-Alaq (96) - Verse 3
  {
    surah: 96,
    verse: 3,
    word: "من نطفة أمشاج",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 03 - { من نطفة أمشاج }",
    videoId: "aEczqy0hlCE",
    episodeNumber: 3
  },

  // Surah Al-Falaq (113) - Verse 4
  {
    surah: 113,
    verse: 4,
    word: "غاسق إذا وقب",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 04 - { غاسق إذا وقب }",
    videoId: "FqqopePrNYE",
    episodeNumber: 4
  },

  // Surah Al-Masad (111) - Verse 5
  {
    surah: 111,
    verse: 5,
    word: "حبل من مسد",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 05 - { حبل من مسد }",
    videoId: "LbI1Zv8Uuv8",
    episodeNumber: 5
  },

  // Surah Al-Nas (114) - Verse 5
  {
    surah: 114,
    verse: 5,
    word: "الوسواس الخناس",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 06 - { الوسواس الخناس }",
    videoId: "TwB8_ONDULM",
    episodeNumber: 6
  },

  // Surah Al-Jinn (72) - Verse 1
  {
    surah: 72,
    verse: 1,
    word: "فظن ألن نقدر عليه",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 07 - { فظن ألن نقدر عليه }",
    videoId: "WvDpMVuPxOc",
    episodeNumber: 7
  },

  // Surah Al-Fil (105) - Verse 4
  {
    surah: 105,
    verse: 4,
    word: "جابوا الصخر بالواد",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 08 - { جابوا الصخر بالواد}",
    videoId: "IMbB7JYBqyE",
    episodeNumber: 8
  },

  // Surah Al-Naba (78) - Verse 24
  {
    surah: 78,
    verse: 24,
    word: "ماءً ثجاجًا",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 09 - { ماءً ثجاجًا }",
    videoId: "7n-2DSPb8a4",
    episodeNumber: 9
  },

  // Surah Al-Naziat (79) - Verse 26
  {
    surah: 79,
    verse: 26,
    word: "نزاعة للشوى",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 10 - { نزاعة للشوى }",
    videoId: "tiJIu5x23Dw",
    episodeNumber: 10
  },

  // Surah Al-Najm (53) - Verse 6
  {
    surah: 53,
    verse: 6,
    word: "ذو مرة فاستوى",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 11 - { ذو مرة فاستوى }",
    videoId: "n-x2seY74yA",
    episodeNumber: 11
  },

  // Surah Al-Rad (13) - Verse 3
  {
    surah: 13,
    verse: 3,
    word: "وبست الجبال بسًا",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 12 - { وبست الجبال بسًا }",
    videoId: "OBcZwqeJCeA",
    episodeNumber: 12
  },

  // Surah Nooh (71) - Verse 19
  {
    surah: 71,
    verse: 19,
    word: "ذات ألواح و دسر",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 13 - { ذات ألواح و دسر }",
    videoId: "x7HbB1NHelw",
    episodeNumber: 13
  },

  // Surah Al-Najm (53) - Verse 40
  {
    surah: 53,
    verse: 40,
    word: "وأنه هو أغنى وأقنى",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 14 - { وأنه هو أغنى وأقنى }",
    videoId: "mtjzT85w4DM",
    episodeNumber: 14
  },

  // Surah Al-Insan (76) - Verse 1
  {
    surah: 76,
    verse: 1,
    word: "وإذا رأيت ثم رأيت",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 15 - { وإذا رأيت ثم رأيت }",
    videoId: "lMFS_5TsB6s",
    episodeNumber: 15
  },

  // Surah Al-Ghashiyah (88) - Verse 1
  {
    surah: 88,
    verse: 1,
    word: "وأنتم سامدون",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 16 - { وأنتم سامدون }",
    videoId: "gAjsRwUL20w",
    episodeNumber: 16
  },

  // Surah Al-Ghashiyah (88) - Verse 6
  {
    surah: 88,
    verse: 6,
    word: "جمالت صفر",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 17 - { جمالت صفر }",
    videoId: "DkWA_kA0ilA",
    episodeNumber: 17
  },

  // Surah Al-Naba (78) - Verse 34
  {
    surah: 78,
    verse: 34,
    word: "دِهَاقًا",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 18 - { و كأسًا دهاقًا }",
    videoId: "bnNG9D3hZSo",
    episodeNumber: 18
  },

  // Surah Al-Balad (90) - Verse 10
  {
    surah: 90,
    verse: 10,
    word: "و هديناه النجدين",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 19 - { و هديناه النجدين }",
    videoId: "6AeVJtZD4YA",
    episodeNumber: 19
  },

  // Surah Al-Zukhruf (43) - Verse 12
  {
    surah: 43,
    verse: 12,
    word: "و له الجوار المنشئات في البحر كالأعلام",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 20 - { و له الجوار المنشئات في البحر كالأعلام }",
    videoId: "N63ZKnHdEcw",
    episodeNumber: 20
  },

  // Surah Qaf (50) - Verse 24
  {
    surah: 50,
    verse: 24,
    word: "و لو ألقى معاذيره",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 21 - { و لو ألقى معاذيره }",
    videoId: "NouQ2RZkEug",
    episodeNumber: 21
  },

  // Surah Al-Qiyamah (75) - Verse 24
  {
    surah: 75,
    verse: 24,
    word: "وجوه يومئذ باسرة",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 22 - { وجوه يومئذ باسرة }",
    videoId: "vREEv0mjxFI",
    episodeNumber: 22
  },

  // Surah Al-Qiyamah (75) - Verse 25
  {
    surah: 75,
    verse: 25,
    word: "تظن أن يفعل بها فاقرة",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 23 - { تظن أن يفعل بها فاقرة }",
    videoId: "stXuE-tlCGI",
    episodeNumber: 23
  },

  // Surah Al-Qiyamah (75) - Verse 31
  {
    surah: 75,
    verse: 31,
    word: "و أعطى قليلاً و أكدى",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 24 - { و أعطى قليلاً و أكدى }",
    videoId: "HSgYkX1LgIM",
    episodeNumber: 24
  },

  // Surah Al-Qiyamah (75) - Verse 32
  {
    surah: 75,
    verse: 32,
    word: "كالعهن المنفوش",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 25 - { كالعهن المنفوش }",
    videoId: "NRXfL3YIwHU",
    episodeNumber: 25
  },

  // Surah Al-Adiyat (100) - Verse 1
  {
    surah: 100,
    verse: 1,
    word: "والعاديات ضبحا",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 26 - { والعاديات ضبحا }",
    videoId: "frs8zwJ_6G8",
    episodeNumber: 26
  },

  // Surah An-Nisa (4) - Verse 3
  {
    surah: 4,
    verse: 3,
    word: "قسمة ضيزى",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 27 - { قسمة ضيزى }",
    videoId: "zODfN7wICGQ",
    episodeNumber: 27
  },

  // Surah An-Nahl (16) - Verse 71
  {
    surah: 16,
    verse: 71,
    word: "أولي النعمة",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 28 - { أولي النعمة }",
    videoId: "Ut-Zkxd6MPQ",
    episodeNumber: 28
  },

  // Surah Al-Qiyamah (75) - Verse 16
  {
    surah: 75,
    verse: 16,
    word: "مهطعين",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 29 - { مهطعين } ، { عزين }",
    videoId: "zODfN7wICGQ",
    episodeNumber: 29
  },

  // Surah Yusuf (12) - Verse 80
  {
    surah: 12,
    verse: 80,
    word: "وشددنا أسرهم",
    videoTitle: "برنامج ( غريب القرآن ) || الحلقة 30 - { وشددنا أسرهم }",
    videoId: "Ut-Zkxd6MPQ",
    episodeNumber: 30
  },
];

/**
 * Helper function to get video mapping for a specific verse
 */
export function getVideoForVerse(surah: number, verse: number): VideoMapping | undefined {
  return videoMappings.find(mapping => mapping.surah === surah && mapping.verse === verse);
}

/**
 * Helper function to check if a verse has a video
 */
export function hasVideo(surah: number, verse: number): boolean {
  return videoMappings.some(mapping => mapping.surah === surah && mapping.verse === verse);
}

/**
 * Get all verses with videos for a specific surah
 */
export function getVersesByVideoInSurah(surah: number): VideoMapping[] {
  return videoMappings.filter(mapping => mapping.surah === surah);
}
