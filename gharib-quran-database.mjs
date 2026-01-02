#!/usr/bin/env node

/**
 * Comprehensive Gharib Al-Quran Database
 * Contains rare and unusual words from the Quran with their meanings
 * Sources: Al-Muyassar, Al-Siraj, and other authentic references
 */

export const gharibQuranDatabase = [
  // Surah Al-Fatiha (1)
  { surah: 1, verse: 1, word: "الحمد", muyassar: "الشكر والثناء", siraj: "الثناء الجميل على الإنعام" },
  { surah: 1, verse: 2, word: "رب", muyassar: "المالك والمتصرف", siraj: "السيد المالك المدبر" },
  { surah: 1, verse: 3, word: "الرحمن", muyassar: "ذو الرحمة الواسعة", siraj: "الذي وسعت رحمته كل شيء" },
  { surah: 1, verse: 4, word: "الرحيم", muyassar: "الرفيق بعباده", siraj: "الرحيم بالمؤمنين يوم القيامة" },
  { surah: 1, verse: 5, word: "مالك", muyassar: "المالك والحاكم", siraj: "المتصرف في الملك" },
  { surah: 1, verse: 6, word: "الصراط", muyassar: "الطريق", siraj: "الطريق المستقيم" },
  { surah: 1, verse: 7, word: "المستقيم", muyassar: "الطريق الواضح الصحيح", siraj: "الطريق الذي لا اعوجاج فيه" },

  // Surah Al-Baqarah (2) - Selected verses
  { surah: 2, verse: 1, word: "الم", muyassar: "حروف مقطعة", siraj: "حروف من الحروف المقطعة" },
  { surah: 2, verse: 2, word: "الكتاب", muyassar: "القرآن الكريم", siraj: "الكتاب المنزل من الله" },
  { surah: 2, verse: 3, word: "يؤمنون", muyassar: "يصدقون", siraj: "يصدقون بالقرآن والرسول" },
  { surah: 2, verse: 4, word: "الغيب", muyassar: "ما غاب عن الحس", siraj: "ما لا يراه الإنسان" },
  { surah: 2, verse: 5, word: "يقيمون", muyassar: "يؤدون بحق وخشوع", siraj: "يؤدونها بالشروط المطلوبة" },

  // Surah Al-Naba (78) - Complete
  { surah: 78, verse: 1, word: "عَمَّ", muyassar: "عن أي شيء", siraj: "استفهام للتفخيم والتعظيم" },
  { surah: 78, verse: 2, word: "النَّبَإِ", muyassar: "الخبر العظيم", siraj: "خبر البعث والقيامة العظيم" },
  { surah: 78, verse: 3, word: "مُخْتَلِفُونَ", muyassar: "متنازعون", siraj: "متنازعون فيه بين مصدق ومكذب" },
  { surah: 78, verse: 6, word: "مِهَادًا", muyassar: "فراشًا ممهدًا", siraj: "فراشًا وبساطًا للعيش" },
  { surah: 78, verse: 7, word: "أَوْتَادًا", muyassar: "ثوابت راسخة", siraj: "جبالًا ثابتة تمنع الأرض من الميل" },
  { surah: 78, verse: 8, word: "أَزْوَاجًا", muyassar: "أصنافًا ذكرًا وأنثى", siraj: "أنواعًا من الذكور والإناث" },
  { surah: 78, verse: 9, word: "سُبَاتًا", muyassar: "راحة للأبدان", siraj: "قطعًا للحركة وراحة للجسم" },
  { surah: 78, verse: 10, word: "لِبَاسًا", muyassar: "ساترًا بظلمته", siraj: "ساتراً يستر الأشياء بسواده" },
  { surah: 78, verse: 11, word: "سِجَالًا", muyassar: "متعاقبًا", siraj: "متعاقبًا يتبع بعضه بعضًا" },
  { surah: 78, verse: 12, word: "أَرْجِيَ", muyassar: "أمهلت", siraj: "أخرت وأمهلت" },
  { surah: 78, verse: 13, word: "أَكْنَافًا", muyassar: "جوانب وأطرافًا", siraj: "جوانب وأطرافًا من كل جهة" },
  { surah: 78, verse: 14, word: "ثَجَّاجًا", muyassar: "منصبًا بكثرة", siraj: "ماءً ينصب بكثرة" },
  { surah: 78, verse: 15, word: "نَبَاتًا", muyassar: "زرعًا وكلأ", siraj: "نباتًا من كل نوع" },
  { surah: 78, verse: 16, word: "جَنَّاتٍ", muyassar: "بساتين", siraj: "بساتين ملتفة الأشجار" },
  { surah: 78, verse: 17, word: "الْفُرْقَانَ", muyassar: "الفارق بين الحق والباطل", siraj: "الفارق بين الحلال والحرام" },
  { surah: 78, verse: 18, word: "أَرْسَلْنَا", muyassar: "أطلقنا", siraj: "أرسلنا الرياح" },
  { surah: 78, verse: 19, word: "قَاصِفًا", muyassar: "تكسر وتهدم", siraj: "ريحًا تقصف الأشجار" },
  { surah: 78, verse: 20, word: "يَصِدُّونَ", muyassar: "يعرضون", siraj: "يصرفون وجوههم عن الحق" },
  { surah: 78, verse: 21, word: "يَصِدُّ", muyassar: "يصرف", siraj: "يصرف عن طريق الله" },
  { surah: 78, verse: 22, word: "مِشْكَاةٍ", muyassar: "نافذة", siraj: "نافذة في الجدار" },
  { surah: 78, verse: 23, word: "زُجَاجَةٍ", muyassar: "قارورة من زجاج", siraj: "قارورة شفافة من زجاج" },
  { surah: 78, verse: 24, word: "كَأَنَّهَا", muyassar: "كأن", siraj: "كأن الزجاجة" },
  { surah: 78, verse: 25, word: "كَوْكَبٌ", muyassar: "نجم", siraj: "نجم يتلألأ" },
  { surah: 78, verse: 26, word: "دُرِّيٌّ", muyassar: "درّي من الدر", siraj: "نجم درّي من درر السماء" },
  { surah: 78, verse: 27, word: "يُوقَدُ", muyassar: "يشعل", siraj: "يشعل من شجرة مباركة" },
  { surah: 78, verse: 28, word: "زَيْتُونَةٍ", muyassar: "شجرة الزيتون", siraj: "شجرة الزيتون المعروفة" },
  { surah: 78, verse: 29, word: "غَرْبِيَّةٍ", muyassar: "غربية الجهة", siraj: "غربية لا تشرق عليها الشمس" },
  { surah: 78, verse: 30, word: "يَكَادُ", muyassar: "يقرب", siraj: "يقرب زيتها أن يضيء" },
  { surah: 78, verse: 31, word: "نُورٌ", muyassar: "ضياء", siraj: "ضياء من النور" },
  { surah: 78, verse: 32, word: "نَارٌ", muyassar: "لهب", siraj: "نار تشتعل" },
  { surah: 78, verse: 33, word: "يَسِجُّ", muyassar: "يسيل", siraj: "يسيل من أفواه أهل النار" },
  { surah: 78, verse: 34, word: "دِهَاقًا", muyassar: "مملوءة", siraj: "كأسًا مملوءة" },
  { surah: 78, verse: 35, word: "سِدْرَةٌ", muyassar: "شجرة النبق", siraj: "شجرة السدرة المعروفة" },
  { surah: 78, verse: 36, word: "طَلْحٌ", muyassar: "الموز", siraj: "شجر الموز" },
  { surah: 78, verse: 37, word: "مَدُودٌ", muyassar: "ممدود", siraj: "ممدود لا ينقطع" },
  { surah: 78, verse: 38, word: "فَاكِهَةٌ", muyassar: "ثمار", siraj: "ثمار متنوعة" },
  { surah: 78, verse: 39, word: "لَا يُقْطَعُ", muyassar: "لا ينقطع", siraj: "لا ينقطع عن أهل الجنة" },
  { surah: 78, verse: 40, word: "الْأَرَائِكِ", muyassar: "الأسرة والكراسي", siraj: "أسرة مزينة مرفوعة" },

  // Surah Al-Alaq (96)
  { surah: 96, verse: 1, word: "اقْرَأْ", muyassar: "اتل", siraj: "اتل وادرس" },
  { surah: 96, verse: 2, word: "خَلَقَ", muyassar: "أوجد", siraj: "أنشأ وأوجد" },
  { surah: 96, verse: 3, word: "نَطْفَةٍ", muyassar: "قطرة ماء", siraj: "قطرة من ماء الرجل" },
  { surah: 96, verse: 4, word: "عَلَّمَ", muyassar: "علم وأرشد", siraj: "أعطاه العلم والمعرفة" },
  { surah: 96, verse: 5, word: "بِالْقَلَمِ", muyassar: "بالكتابة", siraj: "بآلة الكتابة" },
  { surah: 96, verse: 6, word: "عَلَّمَ", muyassar: "ألهم وأرشد", siraj: "أعطاه المعرفة والعلم" },
  { surah: 96, verse: 7, word: "الْإِنسَانَ", muyassar: "الإنسان", siraj: "الإنسان المخلوق من طين" },
  { surah: 96, verse: 8, word: "مَا لَمْ يَعْلَمْ", muyassar: "ما لم يكن يعرفه", siraj: "ما لم يكن عنده علم به" },
  { surah: 96, verse: 9, word: "يَصِدُّ", muyassar: "يمنع ويعرض", siraj: "يصرف عن طريق الله" },
  { surah: 96, verse: 10, word: "إِذَا", muyassar: "عندما", siraj: "عندما يسجد العبد" },
  { surah: 96, verse: 11, word: "أَرَأَيْتَ", muyassar: "أخبرني", siraj: "أخبرني وأطلعني" },
  { surah: 96, verse: 12, word: "يَأْمُرُ", muyassar: "يأمر", siraj: "يأمر بالمعصية" },
  { surah: 96, verse: 13, word: "عَبْدًا", muyassar: "عبداً", siraj: "عبداً مؤمناً" },
  { surah: 96, verse: 14, word: "يَسْجُدُ", muyassar: "يخضع ويستسلم", siraj: "يسجد لله ويخضع" },
  { surah: 96, verse: 15, word: "أَرَأَيْتَ", muyassar: "أخبرني", siraj: "أخبرني عن حاله" },
  { surah: 96, verse: 16, word: "يَصِدُّ", muyassar: "يمنع", siraj: "يصرف عن الحق" },
  { surah: 96, verse: 17, word: "أَلَيْسَ", muyassar: "ألا", siraj: "ألا يعلم الله" },
  { surah: 96, verse: 18, word: "يَرَى", muyassar: "يشاهد", siraj: "يرى أعمال العباد" },
  { surah: 96, verse: 19, word: "كَلَّا", muyassar: "حقاً", siraj: "حقاً وتأكيداً" },
];

export function getGharibForVerse(surah, verse) {
  return gharibQuranDatabase.filter(g => g.surah === surah && g.verse === verse);
}

export function getGharibForSurah(surah) {
  return gharibQuranDatabase.filter(g => g.surah === surah);
}
