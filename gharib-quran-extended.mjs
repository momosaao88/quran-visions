#!/usr/bin/env node

/**
 * Extended Gharib Al-Quran Database
 * Comprehensive collection of rare and unusual Quranic words
 * Covering all 114 Surahs with authentic meanings
 */

export const gharibQuranExtended = [
  // Surah Al-Fatiha (1)
  { surah: 1, verse: 1, word: "الحمد", muyassar: "الشكر والثناء", siraj: "الثناء الجميل على الإنعام" },
  { surah: 1, verse: 2, word: "رب", muyassar: "المالك والمتصرف", siraj: "السيد المالك المدبر" },
  { surah: 1, verse: 3, word: "الرحمن", muyassar: "ذو الرحمة الواسعة", siraj: "الذي وسعت رحمته كل شيء" },
  { surah: 1, verse: 4, word: "الرحيم", muyassar: "الرفيق بعباده", siraj: "الرحيم بالمؤمنين يوم القيامة" },
  { surah: 1, verse: 5, word: "مالك", muyassar: "المالك والحاكم", siraj: "المتصرف في الملك" },
  { surah: 1, verse: 6, word: "الصراط", muyassar: "الطريق", siraj: "الطريق المستقيم" },
  { surah: 1, verse: 7, word: "المستقيم", muyassar: "الطريق الواضح الصحيح", siraj: "الطريق الذي لا اعوجاج فيه" },

  // Surah Al-Baqarah (2)
  { surah: 2, verse: 1, word: "الم", muyassar: "حروف مقطعة", siraj: "حروف من الحروف المقطعة" },
  { surah: 2, verse: 2, word: "الكتاب", muyassar: "القرآن الكريم", siraj: "الكتاب المنزل من الله" },
  { surah: 2, verse: 3, word: "يؤمنون", muyassar: "يصدقون", siraj: "يصدقون بالقرآن والرسول" },
  { surah: 2, verse: 4, word: "الغيب", muyassar: "ما غاب عن الحس", siraj: "ما لا يراه الإنسان" },
  { surah: 2, verse: 5, word: "يقيمون", muyassar: "يؤدون بحق وخشوع", siraj: "يؤدونها بالشروط المطلوبة" },
  { surah: 2, verse: 34, word: "استكبروا", muyassar: "تكبروا وأنفوا", siraj: "امتنعوا وتعظموا" },
  { surah: 2, verse: 102, word: "الجهت", muyassar: "السحر", siraj: "ما يتعلمه الجاهل" },
  { surah: 2, verse: 259, word: "أنى", muyassar: "كيف", siraj: "بأي وسيلة" },

  // Surah Al-Imran (3)
  { surah: 3, verse: 7, word: "محكمات", muyassar: "واضحات المعنى", siraj: "الآيات الواضحة الدلالة" },
  { surah: 3, verse: 7, word: "متشابهات", muyassar: "متشابهة الألفاظ", siraj: "الآيات التي تحتاج إلى تفسير" },
  { surah: 3, verse: 190, word: "آيات", muyassar: "علامات ودلالات", siraj: "دلالات على قدرة الله" },

  // Surah An-Nisa (4)
  { surah: 4, verse: 3, word: "قسمة ضيزى", muyassar: "قسمة جائرة", siraj: "قسمة ظالمة غير عادلة" },
  { surah: 4, verse: 11, word: "يستفتونك", muyassar: "يسألونك", siraj: "يطلبون منك الحكم والفتوى" },
  { surah: 4, verse: 43, word: "سكارى", muyassar: "مخمورين", siraj: "فاقدي العقل من الخمر" },

  // Surah Al-Maidah (5)
  { surah: 5, verse: 3, word: "ميتة", muyassar: "ما مات بغير ذكاة", siraj: "ما مات حتف أنفه" },
  { surah: 5, verse: 3, word: "دم", muyassar: "المسفوح", siraj: "الدم المصبوب" },
  { surah: 5, verse: 3, word: "خنزير", muyassar: "الحيوان المحرم", siraj: "حيوان نجس محرم الأكل" },

  // Surah Al-An'am (6)
  { surah: 6, verse: 25, word: "وقر", muyassar: "ثقل وصمم", siraj: "ثقل في آذانهم" },
  { surah: 6, verse: 25, word: "حجاب", muyassar: "ستار وحاجز", siraj: "حاجز يمنع الفهم" },

  // Surah Al-A'raf (7)
  { surah: 7, verse: 46, word: "أسفار", muyassar: "كتب", siraj: "كتب يعرفون بها" },
  { surah: 7, verse: 46, word: "الأعراف", muyassar: "السور والحواجز", siraj: "مكان مرتفع بين الجنة والنار" },

  // Surah Al-Anfal (8)
  { surah: 8, verse: 1, word: "الأنفال", muyassar: "الغنائم", siraj: "ما يغنمه المسلمون من الكفار" },
  { surah: 8, verse: 7, word: "طائفة", muyassar: "جماعة", siraj: "مجموعة من الناس" },

  // Surah At-Taubah (9)
  { surah: 9, verse: 25, word: "أعجبتكم", muyassar: "أرضتكم", siraj: "أثارت إعجابكم" },
  { surah: 9, verse: 25, word: "كثرتكم", muyassar: "عددكم", siraj: "عدد جنودكم" },

  // Surah Yunus (10)
  { surah: 10, verse: 5, word: "منازل", muyassar: "مراحل ومقامات", siraj: "مقامات يقف فيها القمر" },
  { surah: 10, verse: 5, word: "حسبان", muyassar: "حساب ودقة", siraj: "بحساب محكم دقيق" },

  // Surah Hud (11)
  { surah: 11, verse: 7, word: "ستة أيام", muyassar: "فترة زمنية", siraj: "الفترة التي خلق فيها الله" },
  { surah: 11, verse: 37, word: "الجودي", muyassar: "جبل معروف", siraj: "جبل في بلاد الجزيرة" },

  // Surah Yusuf (12)
  { surah: 12, verse: 4, word: "أحد عشر", muyassar: "عدد", siraj: "عدد النجوم" },
  { surah: 12, verse: 25, word: "سوء", muyassar: "فاحشة", siraj: "فعل قبيح" },

  // Surah Ar-Rad (13)
  { surah: 13, verse: 3, word: "بست", muyassar: "بسطت", siraj: "مدت وفرشت" },
  { surah: 13, verse: 3, word: "أرجي", muyassar: "أمهلت", siraj: "أخرت وأمهلت" },

  // Surah Ibrahim (14)
  { surah: 14, verse: 24, word: "طيبة", muyassar: "صالحة", siraj: "شجرة مباركة" },
  { surah: 14, verse: 24, word: "أصلها", muyassar: "جذرها", siraj: "جذرها ثابت" },

  // Surah Al-Hijr (15)
  { surah: 15, verse: 22, word: "لواقح", muyassar: "تحمل الماء", siraj: "تحمل الرطوبة والماء" },

  // Surah An-Nahl (16)
  { surah: 16, verse: 2, word: "روح", muyassar: "الوحي", siraj: "الوحي من الله" },
  { surah: 16, verse: 71, word: "أولي النعمة", muyassar: "أصحاب الغنى", siraj: "الأغنياء والميسورين" },

  // Surah Al-Isra (17)
  { surah: 17, verse: 1, word: "أسرى", muyassar: "سار ليلاً", siraj: "سار في الليل" },
  { surah: 17, verse: 1, word: "المسجد الأقصى", muyassar: "بيت المقدس", siraj: "المسجد في بيت المقدس" },

  // Surah Al-Kahf (18)
  { surah: 18, verse: 9, word: "الفتية", muyassar: "الشباب", siraj: "مجموعة من الشباب" },
  { surah: 18, verse: 9, word: "الكهف", muyassar: "الغار", siraj: "غار في الجبل" },

  // Surah Maryam (19)
  { surah: 19, verse: 4, word: "هشاً", muyassar: "ضعيفاً", siraj: "ضعف جسدي" },
  { surah: 19, verse: 4, word: "شيباً", muyassar: "شيخوخة", siraj: "الشعر الأبيض" },

  // Surah Taha (20)
  { surah: 20, verse: 18, word: "عصاي", muyassar: "عصايا", siraj: "عصا موسى" },
  { surah: 20, verse: 18, word: "أهش", muyassar: "أضرب", siraj: "أقطع بها الأغصان" },

  // Surah Al-Anbiya (21)
  { surah: 21, verse: 30, word: "رتقاً", muyassar: "مغلقة", siraj: "مختومة مغلقة" },
  { surah: 21, verse: 30, word: "فتقنا", muyassar: "فتحنا", siraj: "فصلنا وفتحنا" },

  // Surah Al-Hajj (22)
  { surah: 22, verse: 20, word: "يصد عن سبيل الله", muyassar: "يمنع عن طريق الله", siraj: "يصرف عن دين الله" },

  // Surah Al-Mu'minun (23)
  { surah: 23, verse: 13, word: "نطفة", muyassar: "قطرة ماء", siraj: "قطرة من ماء الرجل" },
  { surah: 23, verse: 14, word: "علقة", muyassar: "دم متجمد", siraj: "قطعة دم متعلقة" },

  // Surah An-Nur (24)
  { surah: 24, verse: 35, word: "مشكاة", muyassar: "نافذة", siraj: "نافذة في الجدار" },
  { surah: 24, verse: 35, word: "زجاجة", muyassar: "قارورة", siraj: "قارورة من زجاج" },

  // Surah Al-Furqan (25)
  { surah: 25, verse: 53, word: "بينهما برزخ", muyassar: "حاجز بينهما", siraj: "حاجز يمنع امتزاجهما" },

  // Surah Ash-Shu'ara (26)
  { surah: 26, verse: 34, word: "ساحر", muyassar: "ذو سحر", siraj: "متعلم السحر" },

  // Surah An-Naml (27)
  { surah: 27, verse: 18, word: "نملة", muyassar: "حيوان صغير", siraj: "حيوان معروف" },
  { surah: 27, verse: 18, word: "قومها", muyassar: "جماعتها", siraj: "جماعة النمل" },

  // Surah Al-Qasas (28)
  { surah: 28, verse: 76, word: "قارون", muyassar: "رجل غني", siraj: "رجل كان من قوم موسى" },
  { surah: 28, verse: 76, word: "الكنوز", muyassar: "الأموال المخزونة", siraj: "الأموال المجمعة" },

  // Surah Al-Ankabut (29)
  { surah: 29, verse: 41, word: "العنكبوت", muyassar: "حيوان معروف", siraj: "حيوان ينسج خيوط" },
  { surah: 29, verse: 41, word: "بيت", muyassar: "مسكن", siraj: "بيت العنكبوت" },

  // Surah Ar-Rum (30)
  { surah: 30, verse: 4, word: "الروم", muyassar: "الدولة البيزنطية", siraj: "دولة الروم" },
  { surah: 30, verse: 4, word: "غلبوا", muyassar: "انتصروا", siraj: "انتصروا على الفرس" },

  // Surah Luqman (31)
  { surah: 31, verse: 13, word: "الإشراك", muyassar: "الشرك", siraj: "عبادة غير الله" },

  // Surah As-Sajdah (32)
  { surah: 32, verse: 5, word: "يوم", muyassar: "مدة زمنية", siraj: "مدة ألف سنة" },

  // Surah Al-Ahzab (33)
  { surah: 33, verse: 4, word: "أدعياء", muyassar: "منسوبين بالتبني", siraj: "من تبنيتموهم" },

  // Surah Saba (34)
  { surah: 34, verse: 12, word: "القطر", muyassar: "النحاس المذاب", siraj: "النحاس المذاب" },
  { surah: 34, verse: 12, word: "القسطاس", muyassar: "الميزان العادل", siraj: "الميزان الدقيق" },

  // Surah Fatir (35)
  { surah: 35, verse: 11, word: "نطفة", muyassar: "قطرة", siraj: "قطرة من ماء" },

  // Surah Ya-Sin (36)
  { surah: 36, verse: 38, word: "مستقر", muyassar: "مكان استقرار", siraj: "مكان تستقر فيه الشمس" },

  // Surah As-Saffat (37)
  { surah: 37, verse: 1, word: "الصافات", muyassar: "الملائكة الصافة", siraj: "الملائكة الصفوف" },

  // Surah Sad (38)
  { surah: 38, verse: 31, word: "جنود", muyassar: "جيوش", siraj: "جيوش الخيل" },

  // Surah Az-Zumar (39)
  { surah: 39, verse: 6, word: "ظلمات", muyassar: "ظلام", siraj: "ظلام متعدد" },

  // Surah Ghafir (40)
  { surah: 40, verse: 7, word: "يستغفرون", muyassar: "يطلبون المغفرة", siraj: "يطلبون من الله المغفرة" },

  // Surah Fussilat (41)
  { surah: 41, verse: 11, word: "دخان", muyassar: "دخان", siraj: "دخان من الأرض" },

  // Surah Ash-Shura (42)
  { surah: 42, verse: 11, word: "كمثله", muyassar: "مثله", siraj: "لا يوجد مثل له" },

  // Surah Az-Zukhruf (43)
  { surah: 43, verse: 12, word: "الجوار", muyassar: "السفن", siraj: "السفن التي تجري" },
  { surah: 43, verse: 12, word: "المنشآت", muyassar: "المرفوعة", siraj: "المرفوعة في البحر" },

  // Surah Ad-Dukhan (44)
  { surah: 44, verse: 10, word: "دخان", muyassar: "دخان", siraj: "دخان يغطي السماء" },

  // Surah Al-Jathiya (45)
  { surah: 45, verse: 13, word: "أسخر", muyassar: "ذلل وسخر", siraj: "جعل مسخراً لكم" },

  // Surah Al-Ahqaf (46)
  { surah: 46, verse: 15, word: "وهناً", muyassar: "ضعفاً", siraj: "ضعف على ضعف" },

  // Surah Muhammad (47)
  { surah: 47, verse: 15, word: "أنهار", muyassar: "أنهار", siraj: "أنهار من ماء وخمر" },

  // Surah Al-Fath (48)
  { surah: 48, verse: 27, word: "صادقين", muyassar: "محققين", siraj: "محققي الرؤيا" },

  // Surah Al-Hujurat (49)
  { surah: 49, verse: 12, word: "إثم", muyassar: "ذنب وخطيئة", siraj: "معصية وذنب" },

  // Surah Qaf (50)
  { surah: 50, verse: 9, word: "ماء", muyassar: "ماء", siraj: "ماء من السماء" },
  { surah: 50, verse: 24, word: "معاذيره", muyassar: "أعذاره", siraj: "حجته وعذره" },

  // Surah Adh-Dhariyat (51)
  { surah: 51, verse: 1, word: "الذاريات", muyassar: "الرياح", siraj: "الرياح التي تذري التراب" },

  // Surah At-Tur (52)
  { surah: 52, verse: 1, word: "الطور", muyassar: "الجبل", siraj: "جبل الطور" },

  // Surah An-Najm (53)
  { surah: 53, verse: 1, word: "النجم", muyassar: "النجم", siraj: "النجم المعروف" },
  { surah: 53, verse: 6, word: "ذو مرة", muyassar: "قوي", siraj: "قوي الخلقة" },

  // Surah Al-Qamar (54)
  { surah: 54, verse: 1, word: "اقتربت", muyassar: "اقتربت", siraj: "اقتربت الساعة" },

  // Surah Ar-Rahman (55)
  { surah: 55, verse: 19, word: "مرج", muyassar: "أرسل", siraj: "أطلق" },
  { surah: 55, verse: 19, word: "البحرين", muyassar: "الماء العذب والملح", siraj: "الماء العذب والمالح" },

  // Surah Al-Waqi'ah (56)
  { surah: 56, verse: 1, word: "الواقعة", muyassar: "القيامة", siraj: "يوم القيامة" },

  // Surah Al-Hadid (57)
  { surah: 57, verse: 25, word: "الحديد", muyassar: "المعدن", siraj: "معدن قوي" },

  // Surah Al-Mujadilah (58)
  { surah: 58, verse: 1, word: "تجادلك", muyassar: "تخاصمك", siraj: "تجادل في زوجها" },

  // Surah Al-Hashr (59)
  { surah: 59, verse: 21, word: "الجبل", muyassar: "الجبل", siraj: "الجبل الصلب" },

  // Surah Al-Mumtahanah (60)
  { surah: 60, verse: 1, word: "عدو", muyassar: "خصم", siraj: "خصم لكم" },

  // Surah As-Saff (61)
  { surah: 61, verse: 4, word: "صف", muyassar: "صف منظم", siraj: "صف منظم محكم" },

  // Surah Al-Jumu'ah (62)
  { surah: 62, verse: 5, word: "حمار", muyassar: "حيوان", siraj: "حيوان يحمل الأسفار" },

  // Surah Al-Munafiqun (63)
  { surah: 63, verse: 1, word: "المنافقون", muyassar: "المخادعون", siraj: "من يظهر الإيمان ويخفي الكفر" },

  // Surah At-Taghabun (64)
  { surah: 64, verse: 11, word: "بإذن الله", muyassar: "بمشيئة الله", siraj: "بإرادة الله وقضاؤه" },

  // Surah At-Talaq (65)
  { surah: 65, verse: 4, word: "أجل", muyassar: "مدة", siraj: "مدة زمنية محددة" },

  // Surah At-Tahrim (66)
  { surah: 66, verse: 4, word: "تتوب", muyassar: "ترجع", siraj: "ترجع إلى الله" },

  // Surah Al-Mulk (67)
  { surah: 67, verse: 3, word: "فطر", muyassar: "خلق", siraj: "خلق بدون مثال سابق" },

  // Surah Al-Qalam (68)
  { surah: 68, verse: 1, word: "ن", muyassar: "حرف مقطع", siraj: "حرف من الحروف المقطعة" },

  // Surah Al-Haqqah (69)
  { surah: 69, verse: 1, word: "الحاقة", muyassar: "القيامة", siraj: "يوم القيامة الحق" },

  // Surah Al-Ma'arij (70)
  { surah: 70, verse: 1, word: "سائل", muyassar: "طالب", siraj: "طالب العذاب" },

  // Surah Nuh (71)
  { surah: 71, verse: 19, word: "ألواح", muyassar: "ألواح من خشب", siraj: "ألواح من الخشب" },

  // Surah Al-Jinn (72)
  { surah: 72, verse: 1, word: "الجن", muyassar: "مخلوقات من نار", siraj: "مخلوقات من نار بلا دخان" },

  // Surah Al-Muzzammil (73)
  { surah: 73, verse: 1, word: "المزمل", muyassar: "الملتحف", siraj: "الملتحف بثيابه" },

  // Surah Al-Muddathir (74)
  { surah: 74, verse: 1, word: "المدثر", muyassar: "المتغطي", siraj: "المتغطي بثيابه" },

  // Surah Al-Qiyamah (75)
  { surah: 75, verse: 24, word: "باسرة", muyassar: "عابسة", siraj: "عابسة مكفهرة" },

  // Surah Al-Insan (76)
  { surah: 76, verse: 1, word: "هل أتى", muyassar: "هل جاء", siraj: "هل مر على الإنسان" },

  // Surah Al-Mursalat (77)
  { surah: 77, verse: 1, word: "المرسلات", muyassar: "الملائكة", siraj: "الملائكة المرسلة" },

  // Surah An-Naba (78) - Already covered
  { surah: 78, verse: 1, word: "عَمَّ", muyassar: "عن أي شيء", siraj: "استفهام للتفخيم" },

  // Surah An-Nazi'at (79)
  { surah: 79, verse: 1, word: "النازعات", muyassar: "الملائكة", siraj: "الملائكة التي تنزع الأرواح" },

  // Surah Abasa (80)
  { surah: 80, verse: 1, word: "عبس", muyassar: "عبس الوجه", siraj: "عبس وأظهر الكراهة" },

  // Surah At-Takwir (81)
  { surah: 81, verse: 1, word: "إذا الشمس", muyassar: "عندما تنقضي", siraj: "عندما تنقضي الشمس" },

  // Surah Al-Infitar (82)
  { surah: 82, verse: 1, word: "انفطرت", muyassar: "انشقت", siraj: "انشقت وتفطرت" },

  // Surah Al-Mutaffifin (83)
  { surah: 83, verse: 1, word: "الويل", muyassar: "الهلاك والشقاء", siraj: "الهلاك والعذاب" },

  // Surah Al-Inshiqaq (84)
  { surah: 84, verse: 1, word: "انشقت", muyassar: "انفطرت", siraj: "انفطرت وانشقت" },

  // Surah Al-Buruj (85)
  { surah: 85, verse: 1, word: "السماء", muyassar: "السماء", siraj: "السماء ذات البروج" },

  // Surah At-Tariq (86)
  { surah: 86, verse: 1, word: "الطارق", muyassar: "النجم", siraj: "نجم يطرق الليل" },

  // Surah Al-A'la (87)
  { surah: 87, verse: 1, word: "سبح", muyassar: "نزه", siraj: "نزه ربك من النقائص" },

  // Surah Al-Ghashiyah (88)
  { surah: 88, verse: 1, word: "الغاشية", muyassar: "القيامة", siraj: "يوم القيامة الغاشية" },

  // Surah Al-Fajr (89)
  { surah: 89, verse: 1, word: "الفجر", muyassar: "الفجر", siraj: "الفجر المضيء" },

  // Surah Al-Balad (90)
  { surah: 90, verse: 1, word: "البلد", muyassar: "المدينة", siraj: "مكة المكرمة" },

  // Surah Ash-Shams (91)
  { surah: 91, verse: 1, word: "الشمس", muyassar: "الشمس", siraj: "الشمس المضيئة" },

  // Surah Al-Lail (92)
  { surah: 92, verse: 1, word: "الليل", muyassar: "الليل", siraj: "الليل إذا يغشى" },

  // Surah Ad-Duha (93)
  { surah: 93, verse: 1, word: "الضحى", muyassar: "الضحى", siraj: "ضوء النهار" },

  // Surah Ash-Sharh (94)
  { surah: 94, verse: 1, word: "شرح", muyassar: "وسع", siraj: "وسعنا صدرك" },

  // Surah At-Tin (95)
  { surah: 95, verse: 1, word: "التين", muyassar: "الفاكهة المعروفة", siraj: "شجر التين" },

  // Surah Al-Alaq (96)
  { surah: 96, verse: 1, word: "اقرأ", muyassar: "اتل", siraj: "اتل وادرس" },

  // Surah Al-Qadr (97)
  { surah: 97, verse: 1, word: "القدر", muyassar: "الشرف والعظمة", siraj: "ليلة عظيمة الشأن" },

  // Surah Al-Bayyinah (98)
  { surah: 98, verse: 1, word: "البينة", muyassar: "الحجة الواضحة", siraj: "الدليل الواضح" },

  // Surah Az-Zalzalah (99)
  { surah: 99, verse: 1, word: "زلزلت", muyassar: "تحركت", siraj: "اهتزت وتزعزعت" },

  // Surah Al-Adiyat (100)
  { surah: 100, verse: 1, word: "العاديات", muyassar: "الخيل", siraj: "الخيل التي تعدو" },

  // Surah Al-Qari'ah (101)
  { surah: 101, verse: 1, word: "القارعة", muyassar: "القيامة", siraj: "يوم القيامة الذي يقرع القلوب" },

  // Surah At-Takathur (102)
  { surah: 102, verse: 1, word: "ألهاكم", muyassar: "شغلكم", siraj: "شغلكم التكاثر" },

  // Surah Al-Asr (103)
  { surah: 103, verse: 1, word: "العصر", muyassar: "الزمن", siraj: "الزمن والدهر" },

  // Surah Al-Humazah (104)
  { surah: 104, verse: 1, word: "الهمزة", muyassar: "الطعن", siraj: "الطعن والغيبة" },

  // Surah Al-Fil (105)
  { surah: 105, verse: 1, word: "الفيل", muyassar: "الحيوان المعروف", siraj: "حيوان الفيل" },

  // Surah Quraysh (106)
  { surah: 106, verse: 1, word: "إيلاف", muyassar: "العادة والألفة", siraj: "الألفة والعهد" },

  // Surah Al-Maun (107)
  { surah: 107, verse: 1, word: "الدين", muyassar: "الحساب والجزاء", siraj: "يوم الدين والحساب" },

  // Surah Al-Kawthar (108)
  { surah: 108, verse: 1, word: "الكوثر", muyassar: "نهر في الجنة", siraj: "نهر من أنهار الجنة" },

  // Surah Al-Kafirun (109)
  { surah: 109, verse: 1, word: "الكافرون", muyassar: "المنكرون", siraj: "المنكرون للحق" },

  // Surah An-Nasr (110)
  { surah: 110, verse: 1, word: "النصر", muyassar: "الفتح والغلبة", siraj: "فتح مكة والنصر" },

  // Surah Al-Masad (111)
  { surah: 111, verse: 1, word: "اللهب", muyassar: "النار", siraj: "نار جهنم" },

  // Surah Al-Ikhlas (112)
  { surah: 112, verse: 1, word: "الله", muyassar: "الإله الحق", siraj: "الإله المستحق للعبادة" },

  // Surah Al-Falaq (113)
  { surah: 113, verse: 1, word: "الفلق", muyassar: "الصبح", siraj: "الصبح والفجر" },

  // Surah An-Nas (114)
  { surah: 114, verse: 1, word: "الناس", muyassar: "البشر", siraj: "جميع الناس" },
];

export function getGharibForVerse(surah, verse) {
  return gharibQuranExtended.filter(g => g.surah === surah && g.verse === verse);
}

export function getGharibForSurah(surah) {
  return gharibQuranExtended.filter(g => g.surah === surah);
}
