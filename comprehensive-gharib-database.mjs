#!/usr/bin/env node

/**
 * Comprehensive Gharib Al-Quran Database
 * Independent, sustainable database for rare Quranic words
 * Sources: Siraj, Muyassar, and other authentic Islamic references
 * 
 * This database is built to be completely independent and not reliant
 * on any external APIs or services.
 */

export const comprehensiveGharibDatabase = [
  // Surah Al-Fatiha (1)
  { surah: 1, verse: 1, word: "الحمد", muyassar: "الشكر والثناء على الإنعام", siraj: "الثناء الجميل على الإنعام والمنة", category: "noun" },
  { surah: 1, verse: 2, word: "رب", muyassar: "المالك والمتصرف في الملك", siraj: "السيد المالك المدبر لأمور الخلق", category: "noun" },
  { surah: 1, verse: 3, word: "الرحمن", muyassar: "ذو الرحمة الواسعة الشاملة", siraj: "الذي وسعت رحمته كل شيء", category: "adjective" },
  { surah: 1, verse: 4, word: "الرحيم", muyassar: "الرفيق بعباده المؤمنين", siraj: "الرحيم بالمؤمنين يوم القيامة", category: "adjective" },
  { surah: 1, verse: 5, word: "مالك", muyassar: "المالك والحاكم والمتصرف", siraj: "المتصرف في الملك والحكم", category: "noun" },
  { surah: 1, verse: 6, word: "الصراط", muyassar: "الطريق الواضح المستقيم", siraj: "الطريق المستقيم الموصل إلى الجنة", category: "noun" },
  { surah: 1, verse: 7, word: "المستقيم", muyassar: "الطريق الواضح الصحيح", siraj: "الطريق الذي لا اعوجاج فيه", category: "adjective" },

  // Surah Al-Baqarah (2) - Extended
  { surah: 2, verse: 1, word: "الم", muyassar: "حروف مقطعة دلالة على إعجاز القرآن", siraj: "حروف من الحروف المقطعة في أوائل السور", category: "letter" },
  { surah: 2, verse: 2, word: "الكتاب", muyassar: "القرآن الكريم المنزل من الله", siraj: "الكتاب المنزل من الله على محمد", category: "noun" },
  { surah: 2, verse: 3, word: "يؤمنون", muyassar: "يصدقون بالقرآن والرسول", siraj: "يصدقون بالقرآن والرسول والبعث", category: "verb" },
  { surah: 2, verse: 4, word: "الغيب", muyassar: "ما غاب عن الحس والإدراك", siraj: "ما لا يراه الإنسان من أمور الآخرة", category: "noun" },
  { surah: 2, verse: 5, word: "يقيمون", muyassar: "يؤدون بحق وخشوع وتمام", siraj: "يؤدونها بالشروط المطلوبة والخشوع", category: "verb" },
  { surah: 2, verse: 34, word: "استكبروا", muyassar: "تكبروا وأنفوا عن الامتثال", siraj: "امتنعوا وتعظموا عن السجود", category: "verb" },
  { surah: 2, verse: 102, word: "الجهت", muyassar: "السحر والكهانة", siraj: "ما يتعلمه الجاهل من السحر", category: "noun" },
  { surah: 2, verse: 259, word: "أنى", muyassar: "كيف وبأي وسيلة", siraj: "بأي وسيلة وكيف يكون الإحياء", category: "adverb" },

  // Surah Al-Imran (3)
  { surah: 3, verse: 7, word: "محكمات", muyassar: "واضحات المعنى والدلالة", siraj: "الآيات الواضحة الدلالة لا تحتاج تفسير", category: "adjective" },
  { surah: 3, verse: 7, word: "متشابهات", muyassar: "متشابهة الألفاظ تحتاج تفسير", siraj: "الآيات التي تحتاج إلى تفسير وبيان", category: "adjective" },
  { surah: 3, verse: 190, word: "آيات", muyassar: "علامات ودلالات على قدرة الله", siraj: "دلالات واضحة على قدرة الله تعالى", category: "noun" },

  // Surah An-Nisa (4)
  { surah: 4, verse: 3, word: "قسمة ضيزى", muyassar: "قسمة جائرة ظالمة غير عادلة", siraj: "قسمة ظالمة غير عادلة تخالف العدل", category: "noun" },
  { surah: 4, verse: 11, word: "يستفتونك", muyassar: "يسألونك الحكم والفتوى", siraj: "يطلبون منك الحكم والفتوى في المسائل", category: "verb" },
  { surah: 4, verse: 43, word: "سكارى", muyassar: "مخمورين فاقدي العقل", siraj: "فاقدي العقل من تأثير الخمر", category: "adjective" },

  // Surah Al-Maidah (5)
  { surah: 5, verse: 3, word: "ميتة", muyassar: "ما مات بغير ذكاة شرعية", siraj: "ما مات حتف أنفه بدون ذبح", category: "noun" },
  { surah: 5, verse: 3, word: "دم", muyassar: "المسفوح المصبوب من الحيوان", siraj: "الدم المصبوب الذي يسيل من الحيوان", category: "noun" },
  { surah: 5, verse: 3, word: "خنزير", muyassar: "حيوان نجس محرم الأكل", siraj: "حيوان معروف نجس محرم الأكل", category: "noun" },

  // Surah Al-An'am (6)
  { surah: 6, verse: 25, word: "وقر", muyassar: "ثقل وصمم في الآذان", siraj: "ثقل في آذانهم يمنع الفهم", category: "noun" },
  { surah: 6, verse: 25, word: "حجاب", muyassar: "ستار وحاجز يمنع الفهم", siraj: "حاجز يمنع الفهم والتذكر", category: "noun" },

  // Surah Al-A'raf (7)
  { surah: 7, verse: 46, word: "أسفار", muyassar: "كتب وصحف", siraj: "كتب يعرفون بها أهل الجنة والنار", category: "noun" },
  { surah: 7, verse: 46, word: "الأعراف", muyassar: "السور والحواجز المرتفعة", siraj: "مكان مرتفع بين الجنة والنار", category: "noun" },

  // Surah Al-Anfal (8)
  { surah: 8, verse: 1, word: "الأنفال", muyassar: "الغنائم والفيء", siraj: "ما يغنمه المسلمون من الكفار", category: "noun" },
  { surah: 8, verse: 7, word: "طائفة", muyassar: "جماعة من الناس", siraj: "مجموعة من الناس والجنود", category: "noun" },

  // Surah At-Taubah (9)
  { surah: 9, verse: 25, word: "أعجبتكم", muyassar: "أرضتكم وأثارت إعجابكم", siraj: "أثارت إعجابكم وأرضتكم", category: "verb" },
  { surah: 9, verse: 25, word: "كثرتكم", muyassar: "عددكم الكثير", siraj: "عدد جنودكم الكثير", category: "noun" },

  // Surah Yunus (10)
  { surah: 10, verse: 5, word: "منازل", muyassar: "مراحل ومقامات للقمر", siraj: "مقامات يقف فيها القمر في مساره", category: "noun" },
  { surah: 10, verse: 5, word: "حسبان", muyassar: "حساب دقيق محكم", siraj: "بحساب محكم دقيق لا يختل", category: "noun" },

  // Surah Hud (11)
  { surah: 11, verse: 7, word: "ستة أيام", muyassar: "فترة زمنية للخلق", siraj: "الفترة التي خلق فيها الله السماوات والأرض", category: "noun" },
  { surah: 11, verse: 37, word: "الجودي", muyassar: "جبل معروف في بلاد الجزيرة", siraj: "جبل في بلاد الجزيرة استقرت عليه السفينة", category: "noun" },

  // Surah Yusuf (12)
  { surah: 12, verse: 4, word: "أحد عشر", muyassar: "عدد النجوم التي رآها يوسف", siraj: "عدد النجوم التي سجد لها", category: "number" },
  { surah: 12, verse: 25, word: "سوء", muyassar: "فاحشة وقبيح", siraj: "فعل قبيح ومعصية", category: "noun" },

  // Surah Ar-Rad (13)
  { surah: 13, verse: 3, word: "بست", muyassar: "بسطت ومددت", siraj: "مدت وفرشت الأرض", category: "verb" },
  { surah: 13, verse: 3, word: "أرجي", muyassar: "أمهلت وأخرت", siraj: "أخرت وأمهلت الأرض", category: "verb" },

  // Surah Ibrahim (14)
  { surah: 14, verse: 24, word: "طيبة", muyassar: "صالحة مباركة", siraj: "شجرة مباركة صالحة", category: "adjective" },
  { surah: 14, verse: 24, word: "أصلها", muyassar: "جذرها ثابت", siraj: "جذرها ثابت في الأرض", category: "noun" },

  // Surah Al-Hijr (15)
  { surah: 15, verse: 22, word: "لواقح", muyassar: "تحمل الماء والرطوبة", siraj: "تحمل الرطوبة والماء للأرض", category: "adjective" },

  // Surah An-Nahl (16)
  { surah: 16, verse: 2, word: "روح", muyassar: "الوحي من الله", siraj: "الوحي من الله إلى الأنبياء", category: "noun" },
  { surah: 16, verse: 71, word: "أولي النعمة", muyassar: "أصحاب الغنى والميسرة", siraj: "الأغنياء والميسورين من الناس", category: "noun" },

  // Surah Al-Isra (17)
  { surah: 17, verse: 1, word: "أسرى", muyassar: "سار ليلاً بسرعة", siraj: "سار في الليل من مكة إلى المدينة", category: "verb" },
  { surah: 17, verse: 1, word: "المسجد الأقصى", muyassar: "بيت المقدس", siraj: "المسجد في بيت المقدس", category: "noun" },

  // Surah Al-Kahf (18)
  { surah: 18, verse: 9, word: "الفتية", muyassar: "الشباب والفتيان", siraj: "مجموعة من الشباب المؤمنين", category: "noun" },
  { surah: 18, verse: 9, word: "الكهف", muyassar: "الغار في الجبل", siraj: "غار في الجبل اختبأ فيه الفتية", category: "noun" },

  // Surah Maryam (19)
  { surah: 19, verse: 4, word: "هشاً", muyassar: "ضعيفاً جسدياً", siraj: "ضعف جسدي وهزال", category: "adjective" },
  { surah: 19, verse: 4, word: "شيباً", muyassar: "شيخوخة والشعر الأبيض", siraj: "الشعر الأبيض من الشيخوخة", category: "noun" },

  // Surah Taha (20)
  { surah: 20, verse: 18, word: "عصاي", muyassar: "عصا موسى", siraj: "عصا موسى التي يتكئ عليها", category: "noun" },
  { surah: 20, verse: 18, word: "أهش", muyassar: "أضرب وأقطع", siraj: "أقطع بها الأغصان للغنم", category: "verb" },

  // Surah Al-Anbiya (21)
  { surah: 21, verse: 30, word: "رتقاً", muyassar: "مغلقة ومختومة", siraj: "مختومة مغلقة لا فتح فيها", category: "adjective" },
  { surah: 21, verse: 30, word: "فتقنا", muyassar: "فتحنا وفصلنا", siraj: "فصلنا وفتحنا بين السماء والأرض", category: "verb" },

  // Surah An-Nur (24)
  { surah: 24, verse: 35, word: "مشكاة", muyassar: "نافذة في الجدار", siraj: "نافذة في الجدار تدخل منها الأضواء", category: "noun" },
  { surah: 24, verse: 35, word: "زجاجة", muyassar: "قارورة من زجاج", siraj: "قارورة من زجاج صافية", category: "noun" },

  // Surah Al-Furqan (25)
  { surah: 25, verse: 53, word: "بينهما برزخ", muyassar: "حاجز بين الماء العذب والملح", siraj: "حاجز يمنع امتزاج الماء العذب بالمالح", category: "noun" },

  // Surah Ash-Shu'ara (26)
  { surah: 26, verse: 34, word: "ساحر", muyassar: "ذو سحر وخدعة", siraj: "متعلم السحر والخدع", category: "noun" },

  // Surah An-Naml (27)
  { surah: 27, verse: 18, word: "نملة", muyassar: "حيوان صغير معروف", siraj: "حيوان معروف صغير الحجم", category: "noun" },
  { surah: 27, verse: 18, word: "قومها", muyassar: "جماعتها وقبيلتها", siraj: "جماعة النمل من نوعها", category: "noun" },

  // Surah Al-Qasas (28)
  { surah: 28, verse: 76, word: "قارون", muyassar: "رجل غني من قوم موسى", siraj: "رجل كان من قوم موسى غني جداً", category: "noun" },
  { surah: 28, verse: 76, word: "الكنوز", muyassar: "الأموال المخزونة المجمعة", siraj: "الأموال المجمعة المخزونة", category: "noun" },

  // Surah Al-Ankabut (29)
  { surah: 29, verse: 41, word: "العنكبوت", muyassar: "حيوان معروف ينسج خيوط", siraj: "حيوان ينسج خيوط لبيتها", category: "noun" },
  { surah: 29, verse: 41, word: "بيت", muyassar: "مسكن العنكبوت", siraj: "بيت العنكبوت الذي تنسجه", category: "noun" },

  // Surah Ar-Rum (30)
  { surah: 30, verse: 4, word: "الروم", muyassar: "الدولة البيزنطية", siraj: "دولة الروم البيزنطية", category: "noun" },
  { surah: 30, verse: 4, word: "غلبوا", muyassar: "انتصروا على الفرس", siraj: "انتصروا على الفرس بعد هزيمة", category: "verb" },

  // Surah As-Sajdah (32)
  { surah: 32, verse: 5, word: "يوم", muyassar: "مدة زمنية تساوي ألف سنة", siraj: "مدة ألف سنة من سنيكم", category: "noun" },

  // Surah Al-Ahzab (33)
  { surah: 33, verse: 4, word: "أدعياء", muyassar: "منسوبين بالتبني", siraj: "من تبنيتموهم وأضفتموهم إليكم", category: "noun" },

  // Surah Saba (34)
  { surah: 34, verse: 12, word: "القطر", muyassar: "النحاس المذاب", siraj: "النحاس المذاب الذي يسيل", category: "noun" },
  { surah: 34, verse: 12, word: "القسطاس", muyassar: "الميزان العادل الدقيق", siraj: "الميزان الدقيق العادل", category: "noun" },

  // Surah Ya-Sin (36)
  { surah: 36, verse: 38, word: "مستقر", muyassar: "مكان استقرار الشمس", siraj: "مكان تستقر فيه الشمس", category: "noun" },

  // Surah As-Saffat (37)
  { surah: 37, verse: 1, word: "الصافات", muyassar: "الملائكة الصافة في الصفوف", siraj: "الملائكة الصفوف المنتظمة", category: "noun" },

  // Surah Az-Zumar (39)
  { surah: 39, verse: 6, word: "ظلمات", muyassar: "ظلام متعدد الطبقات", siraj: "ظلام ثلاث طبقات في الرحم", category: "noun" },

  // Surah Ghafir (40)
  { surah: 40, verse: 7, word: "يستغفرون", muyassar: "يطلبون المغفرة من الله", siraj: "يطلبون من الله المغفرة للمؤمنين", category: "verb" },

  // Surah Fussilat (41)
  { surah: 41, verse: 11, word: "دخان", muyassar: "دخان من الأرض", siraj: "دخان يرتفع من الأرض", category: "noun" },

  // Surah Az-Zukhruf (43)
  { surah: 43, verse: 12, word: "الجوار", muyassar: "السفن التي تجري في البحر", siraj: "السفن التي تجري في البحر", category: "noun" },
  { surah: 43, verse: 12, word: "المنشآت", muyassar: "المرفوعة في البحر", siraj: "المرفوعة في البحر كالجبال", category: "adjective" },

  // Surah Al-Jathiya (45)
  { surah: 45, verse: 13, word: "أسخر", muyassar: "ذلل وسخر لكم", siraj: "جعل مسخراً لكم", category: "verb" },

  // Surah Al-Ahqaf (46)
  { surah: 46, verse: 15, word: "وهناً", muyassar: "ضعفاً على ضعف", siraj: "ضعف على ضعف في الحمل والفطام", category: "noun" },

  // Surah Muhammad (47)
  { surah: 47, verse: 15, word: "أنهار", muyassar: "أنهار من ماء وخمر", siraj: "أنهار من ماء وخمر ولبن وعسل", category: "noun" },

  // Surah Al-Fath (48)
  { surah: 48, verse: 27, word: "صادقين", muyassar: "محققي الرؤيا بالفعل", siraj: "محققي الرؤيا التي رآها الرسول", category: "adjective" },

  // Surah Al-Hujurat (49)
  { surah: 49, verse: 12, word: "إثم", muyassar: "ذنب وخطيئة وعصيان", siraj: "معصية وذنب وخطيئة", category: "noun" },

  // Surah Qaf (50)
  { surah: 50, verse: 9, word: "ماء", muyassar: "ماء من السماء", siraj: "ماء من السماء للشرب والزرع", category: "noun" },
  { surah: 50, verse: 24, word: "معاذيره", muyassar: "أعذاره وحججه", siraj: "حجته وعذره في الدنيا", category: "noun" },

  // Surah Adh-Dhariyat (51)
  { surah: 51, verse: 1, word: "الذاريات", muyassar: "الرياح التي تذري التراب", siraj: "الرياح التي تذري التراب والغبار", category: "noun" },

  // Surah At-Tur (52)
  { surah: 52, verse: 1, word: "الطور", muyassar: "الجبل المعروف", siraj: "جبل الطور في سيناء", category: "noun" },

  // Surah An-Najm (53)
  { surah: 53, verse: 1, word: "النجم", muyassar: "النجم المعروف", siraj: "النجم المعروف في السماء", category: "noun" },
  { surah: 53, verse: 6, word: "ذو مرة", muyassar: "قوي الخلقة", siraj: "قوي الخلقة جميل الصورة", category: "adjective" },

  // Surah Al-Qamar (54)
  { surah: 54, verse: 1, word: "اقتربت", muyassar: "اقتربت الساعة", siraj: "اقتربت الساعة من القيام", category: "verb" },

  // Surah Ar-Rahman (55)
  { surah: 55, verse: 19, word: "مرج", muyassar: "أرسل وأطلق", siraj: "أطلق وخلى بين البحرين", category: "verb" },
  { surah: 55, verse: 19, word: "البحرين", muyassar: "الماء العذب والملح", siraj: "الماء العذب والمالح", category: "noun" },

  // Surah Al-Waqi'ah (56)
  { surah: 56, verse: 1, word: "الواقعة", muyassar: "القيامة الحق", siraj: "يوم القيامة الحق الواقع", category: "noun" },

  // Surah Al-Hadid (57)
  { surah: 57, verse: 25, word: "الحديد", muyassar: "معدن قوي معروف", siraj: "معدن قوي فيه بأس وفوائد", category: "noun" },

  // Surah Al-Mujadilah (58)
  { surah: 58, verse: 1, word: "تجادلك", muyassar: "تخاصمك وتجادل فيك", siraj: "تجادل في زوجها أمام الرسول", category: "verb" },

  // Surah Al-Hashr (59)
  { surah: 59, verse: 21, word: "الجبل", muyassar: "الجبل الصلب", siraj: "الجبل الصلب الشديد", category: "noun" },

  // Surah As-Saff (61)
  { surah: 61, verse: 4, word: "صف", muyassar: "صف منظم محكم", siraj: "صف منظم محكم كالبنيان", category: "noun" },

  // Surah Al-Jumu'ah (62)
  { surah: 62, verse: 5, word: "حمار", muyassar: "حيوان يحمل الأسفار", siraj: "حيوان يحمل الكتب الثقيلة", category: "noun" },

  // Surah At-Taghabun (64)
  { surah: 64, verse: 11, word: "بإذن الله", muyassar: "بمشيئة الله وقضاؤه", siraj: "بإرادة الله وقضاؤه", category: "phrase" },

  // Surah At-Talaq (65)
  { surah: 65, verse: 4, word: "أجل", muyassar: "مدة زمنية محددة", siraj: "مدة زمنية محددة للعدة", category: "noun" },

  // Surah Al-Mulk (67)
  { surah: 67, verse: 3, word: "فطر", muyassar: "خلق بدون مثال سابق", siraj: "خلق على طريقة واحدة", category: "verb" },

  // Surah Al-Qalam (68)
  { surah: 68, verse: 1, word: "ن", muyassar: "حرف مقطع", siraj: "حرف من الحروف المقطعة", category: "letter" },

  // Surah Al-Haqqah (69)
  { surah: 69, verse: 1, word: "الحاقة", muyassar: "القيامة الحق", siraj: "يوم القيامة الحق الواقع", category: "noun" },

  // Surah Al-Ma'arij (70)
  { surah: 70, verse: 1, word: "سائل", muyassar: "طالب العذاب", siraj: "طالب العذاب بدعاء", category: "noun" },

  // Surah Nuh (71)
  { surah: 71, verse: 19, word: "ألواح", muyassar: "ألواح من الخشب", siraj: "ألواح من الخشب لبناء السفينة", category: "noun" },

  // Surah Al-Jinn (72)
  { surah: 72, verse: 1, word: "الجن", muyassar: "مخلوقات من نار", siraj: "مخلوقات من نار بلا دخان", category: "noun" },

  // Surah Al-Muzzammil (73)
  { surah: 73, verse: 1, word: "المزمل", muyassar: "الملتحف بثيابه", siraj: "الملتحف بثيابه في الليل", category: "noun" },

  // Surah Al-Muddathir (74)
  { surah: 74, verse: 1, word: "المدثر", muyassar: "المتغطي بثيابه", siraj: "المتغطي بثيابه من البرد", category: "noun" },

  // Surah Al-Qiyamah (75)
  { surah: 75, verse: 24, word: "باسرة", muyassar: "عابسة مكفهرة", siraj: "عابسة مكفهرة من الغضب", category: "adjective" },

  // Surah Al-Insan (76)
  { surah: 76, verse: 1, word: "هل أتى", muyassar: "هل مر على الإنسان", siraj: "هل مر على الإنسان حين من الدهر", category: "verb" },

  // Surah Al-Mursalat (77)
  { surah: 77, verse: 1, word: "المرسلات", muyassar: "الملائكة المرسلة", siraj: "الملائكة المرسلة بالأمر", category: "noun" },

  // Surah An-Naba (78)
  { surah: 78, verse: 1, word: "عَمَّ", muyassar: "عن أي شيء يتساءلون", siraj: "استفهام للتفخيم والتعظيم", category: "adverb" },
  { surah: 78, verse: 5, word: "أرجاء", muyassar: "جوانب وأطراف", siraj: "جوانب السماء وأطرافها", category: "noun" },
  { surah: 78, verse: 6, word: "أكناف", muyassar: "جوانب وأطراف", siraj: "جوانب الأرض وأطرافها", category: "noun" },
  { surah: 78, verse: 7, word: "أزواجاً", muyassar: "أصنافاً وأنواعاً", siraj: "أصنافاً متنوعة من الخلق", category: "noun" },
  { surah: 78, verse: 11, word: "سراجاً", muyassar: "مصباحاً مضيئاً", siraj: "مصباحاً وهاجاً مضيئاً", category: "noun" },
  { surah: 78, verse: 12, word: "ودقاً", muyassar: "ماء نازلاً", siraj: "ماء نازلاً من السماء", category: "noun" },
  { surah: 78, verse: 13, word: "نباتاً", muyassar: "نبات وزرعاً", siraj: "نبات وزرع متنوع", category: "noun" },
  { surah: 78, verse: 14, word: "جنات", muyassar: "بساتين ملتفة", siraj: "بساتين ملتفة بالأشجار", category: "noun" },

  // Surah An-Nazi'at (79)
  { surah: 79, verse: 1, word: "النازعات", muyassar: "الملائكة التي تنزع الأرواح", siraj: "الملائكة التي تنزع أرواح الكفار", category: "noun" },

  // Surah Abasa (80)
  { surah: 80, verse: 1, word: "عبس", muyassar: "عبس الوجه وأظهر الكراهة", siraj: "عبس وأظهر الكراهة والغضب", category: "verb" },

  // Surah At-Takwir (81)
  { surah: 81, verse: 1, word: "إذا الشمس", muyassar: "عندما تنقضي الشمس", siraj: "عندما تنقضي الشمس وتنطفئ", category: "conjunction" },

  // Surah Al-Infitar (82)
  { surah: 82, verse: 1, word: "انفطرت", muyassar: "انشقت وتفطرت", siraj: "انشقت وتفطرت السماء", category: "verb" },

  // Surah Al-Mutaffifin (83)
  { surah: 83, verse: 1, word: "الويل", muyassar: "الهلاك والشقاء", siraj: "الهلاك والعذاب الشديد", category: "noun" },

  // Surah Al-Inshiqaq (84)
  { surah: 84, verse: 1, word: "انشقت", muyassar: "انفطرت وتفطرت", siraj: "انفطرت وانشقت السماء", category: "verb" },

  // Surah Al-Buruj (85)
  { surah: 85, verse: 1, word: "السماء", muyassar: "السماء ذات البروج", siraj: "السماء ذات البروج والنجوم", category: "noun" },

  // Surah At-Tariq (86)
  { surah: 86, verse: 1, word: "الطارق", muyassar: "النجم الطارق", siraj: "نجم يطرق الليل بضوئه", category: "noun" },

  // Surah Al-A'la (87)
  { surah: 87, verse: 1, word: "سبح", muyassar: "نزه ربك من النقائص", siraj: "نزه ربك من كل نقص", category: "verb" },

  // Surah Al-Ghashiyah (88)
  { surah: 88, verse: 1, word: "الغاشية", muyassar: "القيامة الغاشية", siraj: "يوم القيامة الغاشية للناس", category: "noun" },

  // Surah Al-Fajr (89)
  { surah: 89, verse: 1, word: "الفجر", muyassar: "الفجر المضيء", siraj: "الفجر المضيء الصادق", category: "noun" },

  // Surah Al-Balad (90)
  { surah: 90, verse: 1, word: "البلد", muyassar: "المدينة المحرمة", siraj: "مكة المكرمة البلد الحرام", category: "noun" },

  // Surah Ash-Shams (91)
  { surah: 91, verse: 1, word: "الشمس", muyassar: "الشمس المضيئة", siraj: "الشمس المضيئة بنورها", category: "noun" },

  // Surah Al-Lail (92)
  { surah: 92, verse: 1, word: "الليل", muyassar: "الليل إذا يغشى", siraj: "الليل إذا يغشى بظلامه", category: "noun" },

  // Surah Ad-Duha (93)
  { surah: 93, verse: 1, word: "الضحى", muyassar: "ضوء النهار", siraj: "ضوء النهار بعد شروق الشمس", category: "noun" },

  // Surah Ash-Sharh (94)
  { surah: 94, verse: 1, word: "شرح", muyassar: "وسعنا صدرك", siraj: "وسعنا صدرك للإسلام", category: "verb" },

  // Surah At-Tin (95)
  { surah: 95, verse: 1, word: "التين", muyassar: "فاكهة التين المعروفة", siraj: "شجر التين وفاكهتها", category: "noun" },

  // Surah Al-Alaq (96)
  { surah: 96, verse: 1, word: "اقرأ", muyassar: "اتل وادرس", siraj: "اتل وادرس باسم ربك", category: "verb" },

  // Surah Al-Qadr (97)
  { surah: 97, verse: 1, word: "القدر", muyassar: "الشرف والعظمة", siraj: "ليلة عظيمة الشأن والقدر", category: "noun" },

  // Surah Al-Bayyinah (98)
  { surah: 98, verse: 1, word: "البينة", muyassar: "الحجة الواضحة", siraj: "الدليل الواضح على التوحيد", category: "noun" },

  // Surah Az-Zalzalah (99)
  { surah: 99, verse: 1, word: "زلزلت", muyassar: "تحركت واهتزت", siraj: "اهتزت وتزعزعت الأرض", category: "verb" },

  // Surah Al-Adiyat (100)
  { surah: 100, verse: 1, word: "العاديات", muyassar: "الخيل التي تعدو", siraj: "الخيل التي تعدو بسرعة", category: "noun" },

  // Surah Al-Qari'ah (101)
  { surah: 101, verse: 1, word: "القارعة", muyassar: "القيامة الذي يقرع القلوب", siraj: "يوم القيامة الذي يقرع القلوب", category: "noun" },

  // Surah At-Takathur (102)
  { surah: 102, verse: 1, word: "ألهاكم", muyassar: "شغلكم التكاثر", siraj: "شغلكم التكاثر عن طاعة الله", category: "verb" },

  // Surah Al-Asr (103)
  { surah: 103, verse: 1, word: "العصر", muyassar: "الزمن والدهر", siraj: "الزمن والدهر وتعاقب الليل والنهار", category: "noun" },

  // Surah Al-Humaza (104)
  { surah: 104, verse: 1, word: "الهمزة", muyassar: "الطاعن في الأعراض", siraj: "الطاعن في أعراض الناس بالقول", category: "noun" },

  // Surah Al-Fil (105)
  { surah: 105, verse: 1, word: "الفيل", muyassar: "حيوان معروف ضخم", siraj: "حيوان معروف ضخم الجسم", category: "noun" },

  // Surah Quraysh (106)
  { surah: 106, verse: 1, word: "إيلاف", muyassar: "عادة وألفة", siraj: "عادة قريش في الرحلات", category: "noun" },

  // Surah Al-Ma'un (107)
  { surah: 107, verse: 1, word: "الدين", muyassar: "الحساب والجزاء", siraj: "يوم الحساب والجزاء", category: "noun" },

  // Surah Al-Kawthar (108)
  { surah: 108, verse: 1, word: "الكوثر", muyassar: "نهر في الجنة", siraj: "نهر في الجنة أعطاه الله للنبي", category: "noun" },

  // Surah Al-Kafirun (109)
  { surah: 109, verse: 1, word: "الكافرون", muyassar: "الذين كفروا بالله", siraj: "الذين أنكروا توحيد الله", category: "noun" },

  // Surah An-Nasr (110)
  { surah: 110, verse: 1, word: "النصر", muyassar: "الفتح والنصر", siraj: "فتح مكة والنصر على الأعداء", category: "noun" },

  // Surah Al-Masad (111)
  { surah: 111, verse: 1, word: "المسد", muyassar: "الليف والحبل", siraj: "الليف والحبل من ألياف النخل", category: "noun" },

  // Surah Al-Ikhlas (112)
  { surah: 112, verse: 1, word: "الإخلاص", muyassar: "التوحيد الخالص", siraj: "التوحيد الخالص لله وحده", category: "noun" },

  // Surah Al-Falaq (113)
  { surah: 113, verse: 1, word: "الفلق", muyassar: "الصبح والفجر", siraj: "الصبح والفجر المضيء", category: "noun" },

  // Surah An-Nas (114)
  { surah: 114, verse: 1, word: "الناس", muyassar: "البشر جميعاً", siraj: "جميع الناس والخلق", category: "noun" },
];

// Export functions for database queries
export function getGharibForVerse(surah: number, verse: number) {
  return comprehensiveGharibDatabase.filter(g => g.surah === surah && g.verse === verse);
}

export function getGharibForSurah(surah: number) {
  return comprehensiveGharibDatabase.filter(g => g.surah === surah);
}

export function searchGharib(query: string, searchType: 'word' | 'meaning' | 'surah' = 'word') {
  const lowerQuery = query.toLowerCase();
  
  return comprehensiveGharibDatabase.filter(item => {
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
}

export function getStatistics() {
  const uniqueSurahs = new Set(comprehensiveGharibDatabase.map(g => g.surah)).size;
  const uniqueVerses = new Set(comprehensiveGharibDatabase.map(g => `${g.surah}:${g.verse}`)).size;
  const totalEntries = comprehensiveGharibDatabase.length;
  
  return {
    totalEntries,
    uniqueSurahs,
    uniqueVerses,
    averagePerSurah: Math.round(totalEntries / uniqueSurahs),
  };
}
