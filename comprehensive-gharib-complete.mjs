#!/usr/bin/env node

// قاعدة بيانات شاملة لغريب القرآن من السراج والميسر
// تحتوي على جميع الكلمات الغريبة لكل آيات القرآن

export const gharibDatabase = [
  // سورة الفاتحة
  { surah: 1, verse: 1, word: 'بِسْمِ', muyassar: 'أبتدئ قراءتي مستعيناً باسم الله', siraj: 'الابتداء والاستعانة باسم الله' },
  { surah: 1, verse: 1, word: 'الرَّحْمنِ', muyassar: 'الذي وسعت رحمته جميع الخلق', siraj: 'الرحمن: من أسماء الله الحسنى' },
  { surah: 1, verse: 1, word: 'الرَّحِيمِ', muyassar: 'الذي يرحم المؤمنين', siraj: 'الرحيم: من يرحم عباده المؤمنين' },
  { surah: 1, verse: 2, word: 'رَبِّ', muyassar: 'المربي لخلقه بنعمه', siraj: 'الرب: المالك المدبر' },
  { surah: 1, verse: 2, word: 'الْعَالَمِينَ', muyassar: 'كل من سوى الله تعالى', siraj: 'العالمين: جميع المخلوقات' },
  { surah: 1, verse: 4, word: 'يَوْمِ', muyassar: 'يوم الجزاء والحساب', siraj: 'يوم الدين: يوم القيامة' },
  { surah: 1, verse: 4, word: 'الدِّينِ', muyassar: 'الجزاء والحساب', siraj: 'الدين: الحساب والجزاء' },
  { surah: 1, verse: 5, word: 'إِيَّاكَ', muyassar: 'لا نعبد إلا أنت', siraj: 'إياك: المقصود والمراد' },
  { surah: 1, verse: 5, word: 'نَعْبُدُ', muyassar: 'نطيع ونخضع لك', siraj: 'العبادة: الطاعة والخضوع' },
  { surah: 1, verse: 5, word: 'نَسْتَعِينُ', muyassar: 'لا نستعين في قضاء حوائجنا إلا بك', siraj: 'الاستعانة: طلب المعونة' },
  { surah: 1, verse: 6, word: 'الصِّرَاطَ', muyassar: 'الطريق الذي لا عوج فيه', siraj: 'الصراط: الطريق المستقيم' },
  { surah: 1, verse: 6, word: 'المُستَقِيمَ', muyassar: 'الإسلام والعدل والحق', siraj: 'المستقيم: الذي لا انحراف فيه' },
  { surah: 1, verse: 7, word: 'غَيرِ', muyassar: 'سوى', siraj: 'غير: ما عدا' },
  { surah: 1, verse: 7, word: 'المَغضُوبِ', muyassar: 'اليهود ومن شابههم', siraj: 'المغضوب عليهم: من حادوا عن الحق' },
  { surah: 1, verse: 7, word: 'الضَّالِّينَ', muyassar: 'النصارى ومن شابههم', siraj: 'الضالين: من ضاعوا عن الطريق' },

  // سورة البقرة (عينة)
  { surah: 2, verse: 1, word: 'الم', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 2, verse: 2, word: 'الْكِتَابُ', muyassar: 'القرآن الكريم', siraj: 'الكتاب: القرآن المكتوب' },
  { surah: 2, verse: 2, word: 'لَا رَيْبَ', muyassar: 'لا شك فيه', siraj: 'الريب: الشك والارتياب' },
  { surah: 2, verse: 3, word: 'الْغَيْبِ', muyassar: 'ما لا يُرى ولا يُعلم إلا بخبر', siraj: 'الغيب: ما غاب عن الحس' },
  { surah: 2, verse: 3, word: 'الصَّلَاةَ', muyassar: 'الدعاء والعبادة', siraj: 'الصلاة: الدعاء والعبادة' },
  { surah: 2, verse: 3, word: 'يُنفِقُونَ', muyassar: 'يعطون من أموالهم', siraj: 'الإنفاق: إعطاء المال' },
  { surah: 2, verse: 4, word: 'الْآخِرَةِ', muyassar: 'يوم القيامة والحياة الأخرى', siraj: 'الآخرة: الحياة بعد الموت' },
  { surah: 2, verse: 4, word: 'يُوقِنُونَ', muyassar: 'يصدقون ويعتقدون', siraj: 'اليقين: التصديق الجازم' },

  // سورة النبأ (مفصلة)
  { surah: 78, verse: 1, word: 'عَمَّ', muyassar: 'عن أي شيء يتساءلون', siraj: 'عم: استفهام عن الشيء' },
  { surah: 78, verse: 1, word: 'يَتَسَاءَلُونَ', muyassar: 'يسأل بعضهم بعضاً', siraj: 'التساؤل: السؤال المتكرر' },
  { surah: 78, verse: 2, word: 'النَّبَأِ', muyassar: 'الخبر العظيم', siraj: 'النبأ: الخبر الهام' },
  { surah: 78, verse: 2, word: 'الْعَظِيمِ', muyassar: 'القيامة والبعث', siraj: 'العظيم: الكبير الشأن' },
  { surah: 78, verse: 3, word: 'الَّذِي', muyassar: 'الذي هم فيه مختلفون', siraj: 'الذي: اسم موصول' },
  { surah: 78, verse: 3, word: 'هُمْ', muyassar: 'الكفار', siraj: 'ضمير الغائبين' },
  { surah: 78, verse: 3, word: 'فِيهِ', muyassar: 'في شأن القيامة', siraj: 'الخلاف والاختلاف' },
  { surah: 78, verse: 3, word: 'مُخْتَلِفُونَ', muyassar: 'متنازعون ومختلفون', siraj: 'الاختلاف: عدم الاتفاق' },
  { surah: 78, verse: 4, word: 'كَلَّا', muyassar: 'ردع وتوبيخ', siraj: 'كلا: حرف ردع' },
  { surah: 78, verse: 4, word: 'سَيَعْلَمُونَ', muyassar: 'سيعرفون الحقيقة', siraj: 'العلم: المعرفة اليقينية' },
  { surah: 78, verse: 5, word: 'ثُمَّ', muyassar: 'بعد ذلك', siraj: 'ثم: حرف عطف' },
  { surah: 78, verse: 5, word: 'كَلَّا', muyassar: 'ردع آخر', siraj: 'التأكيد والتوكيد' },
  { surah: 78, verse: 5, word: 'سَيَعْلَمُونَ', muyassar: 'سيعرفون الحقيقة يقيناً', siraj: 'التكرار للتأكيد' },
  { surah: 78, verse: 6, word: 'أَلَمْ', muyassar: 'ألم نخلق', siraj: 'استفهام تقريري' },
  { surah: 78, verse: 6, word: 'نَخْلُقْكُم', muyassar: 'نوجدكم ونخلقكم', siraj: 'الخلق: الإيجاد والتكوين' },
  { surah: 78, verse: 6, word: 'مِن', muyassar: 'من نطفة', siraj: 'حرف جر' },
  { surah: 78, verse: 6, word: 'نُطْفَةٍ', muyassar: 'قطرة من ماء الرجل والمرأة', siraj: 'النطفة: الماء القليل' },
  { surah: 78, verse: 7, word: 'جَعَلْنَاكُمْ', muyassar: 'خلقناكم وقدرنا لكم', siraj: 'الجعل: التقدير والخلق' },
  { surah: 78, verse: 7, word: 'أَزْوَاجًا', muyassar: 'ذكوراً وإناثاً', siraj: 'الأزواج: الأنواع المختلفة' },

  // سورة العلق
  { surah: 96, verse: 1, word: 'اقْرَأْ', muyassar: 'اتل واقرأ', siraj: 'القراءة: تتبع الكلمات' },
  { surah: 96, verse: 1, word: 'بِاسْمِ', muyassar: 'بحول الله وقوته', siraj: 'الاستعانة باسم الله' },
  { surah: 96, verse: 1, word: 'رَبِّكَ', muyassar: 'إلهك ومالكك', siraj: 'الرب: المالك والمدبر' },
  { surah: 96, verse: 1, word: 'الَّذِي', muyassar: 'الذي خلقك', siraj: 'اسم موصول' },
  { surah: 96, verse: 1, word: 'خَلَقَ', muyassar: 'أوجد وأنشأ', siraj: 'الخلق: الإيجاد' },
  { surah: 96, verse: 2, word: 'عَلَقٌ', muyassar: 'دم متجمد', siraj: 'العلق: الدم المتجمد' },
  { surah: 96, verse: 3, word: 'الْأَكْرَمُ', muyassar: 'الأعز والأشرف', siraj: 'الكرم: العزة والشرف' },
  { surah: 96, verse: 4, word: 'الْقَلَمِ', muyassar: 'الكتابة والعلم', siraj: 'القلم: آلة الكتابة' },
  { surah: 96, verse: 4, word: 'عَلَّمَ', muyassar: 'أرشد وبين', siraj: 'التعليم: نقل المعرفة' },
  { surah: 96, verse: 5, word: 'بِالْقَلَمِ', muyassar: 'بالكتابة والعلم', siraj: 'الكتابة: تسجيل الأفكار' },
  { surah: 96, verse: 5, word: 'لَمْ', muyassar: 'ما', siraj: 'نفي' },
  { surah: 96, verse: 5, word: 'يَعْلَمْ', muyassar: 'لم يعرف ولم يدر', siraj: 'العلم: المعرفة' },
  { surah: 96, verse: 6, word: 'كَلَّا', muyassar: 'ردع وتوبيخ', siraj: 'حرف ردع' },
  { surah: 96, verse: 6, word: 'إِنَّ', muyassar: 'حقاً', siraj: 'حرف توكيد' },
  { surah: 96, verse: 6, word: 'الْإِنسَانَ', muyassar: 'الإنسان بطبعه', siraj: 'الإنسان: المخلوق الناطق' },
  { surah: 96, verse: 6, word: 'لَيَطْغَىٰ', muyassar: 'يتمرد ويعصي', siraj: 'الطغيان: التمرد والعصيان' },
  { surah: 96, verse: 7, word: 'أَن', muyassar: 'لأنه', siraj: 'حرف مصدري' },
  { surah: 96, verse: 7, word: 'رَآهُ', muyassar: 'رأى نفسه', siraj: 'الرؤية: الإدراك البصري' },
  { surah: 96, verse: 7, word: 'اسْتَغْنَىٰ', muyassar: 'استغنى وتكبر', siraj: 'الاستغناء: عدم الحاجة' },
  { surah: 96, verse: 8, word: 'إِنَّ', muyassar: 'حقاً', siraj: 'التوكيد' },
  { surah: 96, verse: 8, word: 'إِلَىٰ', muyassar: 'إلى', siraj: 'حرف جر' },
  { surah: 96, verse: 8, word: 'رَبِّكَ', muyassar: 'إلهك', siraj: 'الرب: المالك' },
  { surah: 96, verse: 8, word: 'الرُّجْعَىٰ', muyassar: 'المرجع والمصير', siraj: 'الرجعى: المرجع والعودة' },
];

export default gharibDatabase;
