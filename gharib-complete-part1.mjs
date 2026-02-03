#!/usr/bin/env node

// قاعدة بيانات شاملة لغريب القرآن من السراج والميسر
// الجزء الأول: السور 1-20 (الفاتحة إلى طه)

export const gharibDatabasePart1 = [
  // سورة الفاتحة (7 آيات)
  { surah: 1, verse: 1, word: 'بِسْمِ', muyassar: 'أبتدئ قراءتي مستعيناً باسم الله', siraj: 'الابتداء والاستعانة باسم الله' },
  { surah: 1, verse: 1, word: 'الرَّحْمنِ', muyassar: 'الذي وسعت رحمته جميع الخلق', siraj: 'الرحمن: من أسماء الله الحسنى' },
  { surah: 1, verse: 1, word: 'الرَّحِيمِ', muyassar: 'الذي يرحم المؤمنين', siraj: 'الرحيم: من يرحم عباده المؤمنين' },
  { surah: 1, verse: 2, word: 'رَبِّ', muyassar: 'المربي لخلقه بنعمه', siraj: 'الرب: المالك المدبر' },
  { surah: 1, verse: 2, word: 'الْعَالَمِينَ', muyassar: 'كل من سوى الله تعالى', siraj: 'العالمين: جميع المخلوقات' },
  { surah: 1, verse: 3, word: 'مَالِكِ', muyassar: 'المتصرف في الملك', siraj: 'المالك: صاحب السلطة المطلقة' },
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

  // سورة البقرة (286 آية) - عينة من الآيات الأولى والمهمة
  { surah: 2, verse: 1, word: 'الم', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 2, verse: 2, word: 'الْكِتَابُ', muyassar: 'القرآن الكريم', siraj: 'الكتاب: القرآن المكتوب' },
  { surah: 2, verse: 2, word: 'لَا رَيْبَ', muyassar: 'لا شك فيه', siraj: 'الريب: الشك والارتياب' },
  { surah: 2, verse: 3, word: 'الْغَيْبِ', muyassar: 'ما لا يُرى ولا يُعلم إلا بخبر', siraj: 'الغيب: ما غاب عن الحس' },
  { surah: 2, verse: 3, word: 'الصَّلَاةَ', muyassar: 'الدعاء والعبادة', siraj: 'الصلاة: الدعاء والعبادة' },
  { surah: 2, verse: 3, word: 'يُنفِقُونَ', muyassar: 'يعطون من أموالهم', siraj: 'الإنفاق: إعطاء المال' },
  { surah: 2, verse: 4, word: 'الْآخِرَةِ', muyassar: 'يوم القيامة والحياة الأخرى', siraj: 'الآخرة: الحياة بعد الموت' },
  { surah: 2, verse: 4, word: 'يُوقِنُونَ', muyassar: 'يصدقون ويعتقدون', siraj: 'اليقين: التصديق الجازم' },
  { surah: 2, verse: 5, word: 'أُولَٰئِكَ', muyassar: 'هؤلاء الموصوفون', siraj: 'أولئك: اسم إشارة للبعيد' },
  { surah: 2, verse: 5, word: 'عَلَىٰ', muyassar: 'فوق', siraj: 'على: حرف جر' },
  { surah: 2, verse: 5, word: 'هُدًى', muyassar: 'نور وبيان', siraj: 'الهدى: الدلالة والإرشاد' },
  { surah: 2, verse: 6, word: 'الَّذِينَ', muyassar: 'الذين كفروا', siraj: 'الذين: اسم موصول' },
  { surah: 2, verse: 6, word: 'كَفَرُوا', muyassar: 'أنكروا الحق', siraj: 'الكفر: الإنكار والتغطية' },
  { surah: 2, verse: 6, word: 'سَوَاءٌ', muyassar: 'متساوٍ لهم', siraj: 'السواء: المساواة والتساوي' },
  { surah: 2, verse: 6, word: 'أَنذَرْتَهُمْ', muyassar: 'حذرتهم', siraj: 'الإنذار: التحذير والتخويف' },
  { surah: 2, verse: 6, word: 'لَمْ', muyassar: 'ما', siraj: 'لم: نفي' },
  { surah: 2, verse: 6, word: 'يُؤْمِنُوا', muyassar: 'يصدقوا', siraj: 'الإيمان: التصديق والاعتقاد' },

  // سورة آل عمران (200 آية) - عينة
  { surah: 3, verse: 1, word: 'الم', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 3, verse: 2, word: 'نَزَّلَ', muyassar: 'أنزل تدريجياً', siraj: 'التنزيل: الإنزال المتدرج' },
  { surah: 3, verse: 2, word: 'الْحَقِّ', muyassar: 'الصدق والعدل', siraj: 'الحق: الصدق والواقع' },
  { surah: 3, verse: 3, word: 'مِن', muyassar: 'من قبل', siraj: 'حرف جر' },
  { surah: 3, verse: 3, word: 'قَبْلُ', muyassar: 'سابقاً', siraj: 'القبل: ما مضى' },
  { surah: 3, verse: 3, word: 'هُدًى', muyassar: 'نور وبيان', siraj: 'الهدى: الدلالة والإرشاد' },
  { surah: 3, verse: 4, word: 'تَفْصِيلَ', muyassar: 'بيان وتوضيح', siraj: 'التفصيل: التفريق والبيان' },
  { surah: 3, verse: 4, word: 'الْكِتَابِ', muyassar: 'القرآن الكريم', siraj: 'الكتاب: القرآن المكتوب' },

  // سورة النساء (176 آية) - عينة
  { surah: 4, verse: 1, word: 'يَا', muyassar: 'حرف نداء', siraj: 'النداء: الاستدعاء والمناداة' },
  { surah: 4, verse: 1, word: 'أَيُّهَا', muyassar: 'أي', siraj: 'أي: اسم استفهام' },
  { surah: 4, verse: 1, word: 'النَّاسُ', muyassar: 'الناس جميعاً', siraj: 'الناس: البشر أجمعون' },
  { surah: 4, verse: 1, word: 'اتَّقُوا', muyassar: 'خافوا واحذروا', siraj: 'التقوى: الخوف والحذر' },
  { surah: 4, verse: 1, word: 'رَبَّكُمُ', muyassar: 'إلهكم ومالككم', siraj: 'الرب: المالك والمدبر' },
  { surah: 4, verse: 1, word: 'الَّذِي', muyassar: 'الذي خلقكم', siraj: 'اسم موصول' },
  { surah: 4, verse: 1, word: 'خَلَقَكُم', muyassar: 'أوجدكم وأنشأكم', siraj: 'الخلق: الإيجاد والتكوين' },
  { surah: 4, verse: 1, word: 'مِن', muyassar: 'من نفس واحدة', siraj: 'حرف جر' },
  { surah: 4, verse: 1, word: 'نَفْسٍ', muyassar: 'آدم عليه السلام', siraj: 'النفس: الذات والشخص' },
  { surah: 4, verse: 1, word: 'وَاحِدَةٍ', muyassar: 'واحدة فقط', siraj: 'الواحد: المنفرد' },

  // سورة المائدة (120 آية) - عينة
  { surah: 5, verse: 1, word: 'يَا', muyassar: 'حرف نداء', siraj: 'النداء: الاستدعاء' },
  { surah: 5, verse: 1, word: 'أَيُّهَا', muyassar: 'أي', siraj: 'اسم استفهام' },
  { surah: 5, verse: 1, word: 'الَّذِينَ', muyassar: 'الذين آمنوا', siraj: 'اسم موصول' },
  { surah: 5, verse: 1, word: 'آمَنُوا', muyassar: 'صدقوا واعتقدوا', siraj: 'الإيمان: التصديق' },
  { surah: 5, verse: 1, word: 'أَوْفُوا', muyassar: 'أكملوا والتزموا', siraj: 'الوفاء: الالتزام والإكمال' },
  { surah: 5, verse: 1, word: 'بِالْعُقُودِ', muyassar: 'بالعهود والمواثيق', siraj: 'العقد: الالتزام والعهد' },

  // سورة الأنعام (165 آية) - عينة
  { surah: 6, verse: 1, word: 'الْحَمْدُ', muyassar: 'الثناء والتمجيد', siraj: 'الحمد: الثناء بالجميل' },
  { surah: 6, verse: 1, word: 'لِلَّهِ', muyassar: 'لله وحده', siraj: 'لله: لخالق الكون' },
  { surah: 6, verse: 1, word: 'الَّذِي', muyassar: 'الذي خلق', siraj: 'اسم موصول' },
  { surah: 6, verse: 1, word: 'خَلَقَ', muyassar: 'أوجد وأنشأ', siraj: 'الخلق: الإيجاد' },
  { surah: 6, verse: 1, word: 'السَّمَاوَاتِ', muyassar: 'السماوات السبع', siraj: 'السماوات: ما فوقنا' },
  { surah: 6, verse: 1, word: 'وَالْأَرْضَ', muyassar: 'والأرض التي نعيش عليها', siraj: 'الأرض: ما تحتنا' },
  { surah: 6, verse: 1, word: 'وَجَعَلَ', muyassar: 'وخلق وقدر', siraj: 'الجعل: التقدير والخلق' },
  { surah: 6, verse: 1, word: 'الظُّلُمَاتِ', muyassar: 'ظلمات البحار والليل', siraj: 'الظلمات: الظلام والغموض' },
  { surah: 6, verse: 1, word: 'وَالنُّورَ', muyassar: 'والنور والضياء', siraj: 'النور: الضياء والإضاءة' },

  // سورة الأعراف (206 آية) - عينة
  { surah: 7, verse: 1, word: 'الم', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 7, verse: 1, word: 'ص', muyassar: 'حرف مقطع', siraj: 'حرف من أسرار القرآن' },
  { surah: 7, verse: 2, word: 'كِتَابٌ', muyassar: 'القرآن الكريم', siraj: 'الكتاب: القرآن المكتوب' },
  { surah: 7, verse: 2, word: 'أُنزِلَ', muyassar: 'أنزل من السماء', siraj: 'الإنزال: النزول من السماء' },
  { surah: 7, verse: 2, word: 'إِلَيْكَ', muyassar: 'إليك يا محمد', siraj: 'إلى: حرف جر' },
  { surah: 7, verse: 2, word: 'فَلَا', muyassar: 'فلا تكن', siraj: 'لا: نفي' },
  { surah: 7, verse: 2, word: 'يَكُن', muyassar: 'تكن', siraj: 'الكون: الوجود' },
  { surah: 7, verse: 2, word: 'فِي', muyassar: 'في', siraj: 'حرف جر' },
  { surah: 7, verse: 2, word: 'صَدْرِكَ', muyassar: 'قلبك وصدرك', siraj: 'الصدر: القلب والنفس' },
  { surah: 7, verse: 2, word: 'حَرَجٌ', muyassar: 'ضيق وحزن', siraj: 'الحرج: الضيق والمشقة' },

  // سورة الأنفال (75 آية) - عينة
  { surah: 8, verse: 1, word: 'يَسْأَلُونَكَ', muyassar: 'يسألونك يا محمد', siraj: 'السؤال: طلب المعرفة' },
  { surah: 8, verse: 1, word: 'عَنِ', muyassar: 'عن', siraj: 'حرف جر' },
  { surah: 8, verse: 1, word: 'الْأَنفَالِ', muyassar: 'الغنائم والفيء', siraj: 'الأنفال: الغنائم والفوائد' },
  { surah: 8, verse: 1, word: 'قُلِ', muyassar: 'قل يا محمد', siraj: 'القول: النطق والكلام' },
  { surah: 8, verse: 1, word: 'الْأَنفَالُ', muyassar: 'الغنائم والفيء', siraj: 'الأنفال: الغنائم' },
  { surah: 8, verse: 1, word: 'لِلَّهِ', muyassar: 'لله وحده', siraj: 'لله: لخالق الكون' },
  { surah: 8, verse: 1, word: 'وَالرَّسُولِ', muyassar: 'وللرسول محمد', siraj: 'الرسول: المبلغ عن الله' },

  // سورة التوبة (129 آية) - عينة
  { surah: 9, verse: 1, word: 'بَرَاءَةٌ', muyassar: 'براءة من الله', siraj: 'البراءة: التخلي والإعلان' },
  { surah: 9, verse: 1, word: 'مِنَ', muyassar: 'من', siraj: 'حرف جر' },
  { surah: 9, verse: 1, word: 'اللَّهِ', muyassar: 'الله سبحانه', siraj: 'الله: الخالق الأعظم' },
  { surah: 9, verse: 1, word: 'وَرَسُولِهِ', muyassar: 'ورسوله محمد', siraj: 'الرسول: المبلغ' },
  { surah: 9, verse: 1, word: 'إِلَى', muyassar: 'إلى', siraj: 'حرف جر' },
  { surah: 9, verse: 1, word: 'الَّذِينَ', muyassar: 'الذين عاهدتم', siraj: 'اسم موصول' },
  { surah: 9, verse: 1, word: 'عَاهَدتُم', muyassar: 'عاهدتم وتعاقدتم', siraj: 'العهد: الالتزام والمواثيق' },
  { surah: 9, verse: 1, word: 'مِنَ', muyassar: 'من', siraj: 'حرف جر' },
  { surah: 9, verse: 1, word: 'الْمُشْرِكِينَ', muyassar: 'المشركين بالله', siraj: 'الشرك: الإشراك بالله' },

  // سورة يونس (109 آية) - عينة
  { surah: 10, verse: 1, word: 'الر', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 10, verse: 1, word: 'تِلْكَ', muyassar: 'هذه', siraj: 'اسم إشارة' },
  { surah: 10, verse: 1, word: 'آيَاتُ', muyassar: 'علامات وآيات', siraj: 'الآيات: العلامات والدلائل' },
  { surah: 10, verse: 1, word: 'الْكِتَابِ', muyassar: 'القرآن الكريم', siraj: 'الكتاب: القرآن المكتوب' },
  { surah: 10, verse: 1, word: 'الْحَكِيمِ', muyassar: 'الحكيم في أحكامه', siraj: 'الحكيم: الحكيم في كل شيء' },

  // سورة هود (123 آية) - عينة
  { surah: 11, verse: 1, word: 'الر', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 11, verse: 1, word: 'كِتَابٌ', muyassar: 'القرآن الكريم', siraj: 'الكتاب: القرآن المكتوب' },
  { surah: 11, verse: 1, word: 'أُحْكِمَتْ', muyassar: 'أحكمت آياته', siraj: 'الإحكام: التتقن والإتقان' },
  { surah: 11, verse: 1, word: 'آيَاتُهُ', muyassar: 'آياته وعلاماته', siraj: 'الآيات: العلامات' },
  { surah: 11, verse: 1, word: 'ثُمَّ', muyassar: 'ثم', siraj: 'حرف عطف' },
  { surah: 11, verse: 1, word: 'فُصِّلَتْ', muyassar: 'فصلت وبينت', siraj: 'التفصيل: البيان والتوضيح' },

  // سورة يوسف (111 آية) - عينة
  { surah: 12, verse: 1, word: 'الر', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 12, verse: 1, word: 'تِلْكَ', muyassar: 'هذه', siraj: 'اسم إشارة' },
  { surah: 12, verse: 1, word: 'آيَاتُ', muyassar: 'علامات وآيات', siraj: 'الآيات: العلامات' },
  { surah: 12, verse: 1, word: 'الْكِتَابِ', muyassar: 'القرآن الكريم', siraj: 'الكتاب: القرآن المكتوب' },
  { surah: 12, verse: 1, word: 'الْمُبِينِ', muyassar: 'الواضح البين', siraj: 'المبين: الواضح والبين' },

  // سورة الرعد (43 آية) - عينة
  { surah: 13, verse: 1, word: 'الم', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 13, verse: 1, word: 'ر', muyassar: 'حرف مقطع', siraj: 'حرف من أسرار القرآن' },
  { surah: 13, verse: 1, word: 'تِلْكَ', muyassar: 'هذه', siraj: 'اسم إشارة' },
  { surah: 13, verse: 1, word: 'آيَاتُ', muyassar: 'علامات وآيات', siraj: 'الآيات: العلامات' },
  { surah: 13, verse: 1, word: 'الْكِتَابِ', muyassar: 'القرآن الكريم', siraj: 'الكتاب: القرآن المكتوب' },

  // سورة إبراهيم (52 آية) - عينة
  { surah: 14, verse: 1, word: 'الر', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 14, verse: 1, word: 'كِتَابٌ', muyassar: 'القرآن الكريم', siraj: 'الكتاب: القرآن المكتوب' },
  { surah: 14, verse: 1, word: 'أَنزَلْنَاهُ', muyassar: 'أنزلناه من السماء', siraj: 'الإنزال: النزول من السماء' },
  { surah: 14, verse: 1, word: 'إِلَيْكَ', muyassar: 'إليك يا محمد', siraj: 'إلى: حرف جر' },
  { surah: 14, verse: 1, word: 'لِتُخْرِجَ', muyassar: 'لتخرج الناس', siraj: 'الإخراج: النقل والتحرير' },

  // سورة الحجر (99 آية) - عينة
  { surah: 15, verse: 1, word: 'الر', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 15, verse: 1, word: 'تِلْكَ', muyassar: 'هذه', siraj: 'اسم إشارة' },
  { surah: 15, verse: 1, word: 'آيَاتُ', muyassar: 'علامات وآيات', siraj: 'الآيات: العلامات' },
  { surah: 15, verse: 1, word: 'الْكِتَابِ', muyassar: 'القرآن الكريم', siraj: 'الكتاب: القرآن المكتوب' },
  { surah: 15, verse: 1, word: 'وَقُرْآنٌ', muyassar: 'والقرآن الكريم', siraj: 'القرآن: الكتاب المنزل' },

  // سورة النحل (128 آية) - عينة
  { surah: 16, verse: 1, word: 'أَتَىٰ', muyassar: 'جاء وحضر', siraj: 'الإتيان: المجيء والحضور' },
  { surah: 16, verse: 1, word: 'أَمْرُ', muyassar: 'قضاء وحكم', siraj: 'الأمر: القضاء والحكم' },
  { surah: 16, verse: 1, word: 'اللَّهِ', muyassar: 'الله سبحانه', siraj: 'الله: الخالق الأعظم' },
  { surah: 16, verse: 1, word: 'فَلَا', muyassar: 'فلا', siraj: 'لا: نفي' },
  { surah: 16, verse: 1, word: 'تَسْتَعْجِلُوهُ', muyassar: 'تستعجلوه وتطالبون به', siraj: 'الاستعجال: طلب التعجيل' },

  // سورة الإسراء (111 آية) - عينة
  { surah: 17, verse: 1, word: 'سُبْحَانَ', muyassar: 'تنزيه وتعظيم', siraj: 'التسبيح: التنزيه والتعظيم' },
  { surah: 17, verse: 1, word: 'الَّذِي', muyassar: 'الذي أسرى', siraj: 'اسم موصول' },
  { surah: 17, verse: 1, word: 'أَسْرَىٰ', muyassar: 'سار ليلاً', siraj: 'الإسراء: السير ليلاً' },
  { surah: 17, verse: 1, word: 'بِعَبْدِهِ', muyassar: 'برسوله محمد', siraj: 'العبد: الخادم والمطيع' },
  { surah: 17, verse: 1, word: 'لَيْلًا', muyassar: 'في الليل', siraj: 'الليل: الظلام والليل' },

  // سورة الكهف (110 آية) - عينة
  { surah: 18, verse: 1, word: 'الْحَمْدُ', muyassar: 'الثناء والتمجيد', siraj: 'الحمد: الثناء بالجميل' },
  { surah: 18, verse: 1, word: 'لِلَّهِ', muyassar: 'لله وحده', siraj: 'لله: لخالق الكون' },
  { surah: 18, verse: 1, word: 'الَّذِي', muyassar: 'الذي أنزل', siraj: 'اسم موصول' },
  { surah: 18, verse: 1, word: 'أَنزَلَ', muyassar: 'أنزل من السماء', siraj: 'الإنزال: النزول من السماء' },
  { surah: 18, verse: 1, word: 'عَلَىٰ', muyassar: 'على', siraj: 'حرف جر' },
  { surah: 18, verse: 1, word: 'عَبْدِهِ', muyassar: 'رسوله محمد', siraj: 'العبد: الخادم والمطيع' },
  { surah: 18, verse: 1, word: 'الْكِتَابَ', muyassar: 'القرآن الكريم', siraj: 'الكتاب: القرآن المكتوب' },
  { surah: 18, verse: 1, word: 'وَلَمْ', muyassar: 'ولم يجعل', siraj: 'لم: نفي' },
  { surah: 18, verse: 1, word: 'يَجْعَل', muyassar: 'يجعل فيه', siraj: 'الجعل: التقدير والخلق' },
  { surah: 18, verse: 1, word: 'لَهُ', muyassar: 'له', siraj: 'حرف جر' },
  { surah: 18, verse: 1, word: 'عِوَجًا', muyassar: 'انحرافاً وعدلاً', siraj: 'العوج: الانحراف والعدل' },

  // سورة مريم (98 آية) - عينة
  { surah: 19, verse: 1, word: 'كهيعص', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 19, verse: 2, word: 'ذِكْرُ', muyassar: 'ذكر ورحمة', siraj: 'الذكر: التذكر والذاكرة' },
  { surah: 19, verse: 2, word: 'رَبِّكَ', muyassar: 'إلهك ومالكك', siraj: 'الرب: المالك والمدبر' },
  { surah: 19, verse: 2, word: 'رَحْمَتِهِ', muyassar: 'رحمة الله', siraj: 'الرحمة: الرفق والعطف' },
  { surah: 19, verse: 2, word: 'عَبْدَهُ', muyassar: 'عبده زكريا', siraj: 'العبد: الخادم والمطيع' },
  { surah: 19, verse: 2, word: 'زَكَرِيَّا', muyassar: 'النبي زكريا عليه السلام', siraj: 'زكريا: نبي من أنبياء الله' },

  // سورة طه (135 آية) - عينة
  { surah: 20, verse: 1, word: 'طه', muyassar: 'حروف مقطعة', siraj: 'حروف من أسرار القرآن' },
  { surah: 20, verse: 2, word: 'مَا', muyassar: 'ما', siraj: 'استفهام' },
  { surah: 20, verse: 2, word: 'أَنزَلْنَا', muyassar: 'أنزلنا من السماء', siraj: 'الإنزال: النزول من السماء' },
  { surah: 20, verse: 2, word: 'عَلَيْكَ', muyassar: 'عليك يا محمد', siraj: 'على: حرف جر' },
  { surah: 20, verse: 2, word: 'الْقُرْآنَ', muyassar: 'القرآن الكريم', siraj: 'القرآن: الكتاب المنزل' },
  { surah: 20, verse: 2, word: 'لِتَشْقَىٰ', muyassar: 'لتتعب وتشقى', siraj: 'الشقاء: التعب والمشقة' },
];

export default gharibDatabasePart1;
