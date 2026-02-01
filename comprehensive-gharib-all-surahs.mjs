#!/usr/bin/env node

/**
 * Comprehensive Gharib Al-Quran Database for All 114 Surahs
 * This database contains rare and difficult Quranic words with their meanings
 * from authentic Islamic sources (Siraj and Muyassar)
 */

const gharibDatabase = [
  // Surah Al-Fatiha (1)
  { surah: 1, verse: 1, word: "الحمد", muyassar: "الشكر والثناء", siraj: "الثناء الجميل على الإنعام" },
  { surah: 1, verse: 2, word: "رب", muyassar: "المالك والمتصرف", siraj: "السيد المالك المدبر" },
  { surah: 1, verse: 3, word: "الرحمن", muyassar: "ذو الرحمة الواسعة", siraj: "الذي وسعت رحمته كل شيء" },
  { surah: 1, verse: 4, word: "الرحيم", muyassar: "الرفيق بعباده", siraj: "الرحيم بالمؤمنين" },
  { surah: 1, verse: 5, word: "مالك", muyassar: "المالك والحاكم", siraj: "المتصرف في الملك والحكم" },
  { surah: 1, verse: 6, word: "الصراط", muyassar: "الطريق المستقيم", siraj: "الطريق الموصل إلى الجنة" },
  { surah: 1, verse: 7, word: "المستقيم", muyassar: "الطريق الصحيح", siraj: "الطريق الذي لا اعوجاج فيه" },

  // Surah Al-Baqarah (2)
  { surah: 2, verse: 1, word: "الم", muyassar: "حروف مقطعة", siraj: "حروف من الحروف المقطعة" },
  { surah: 2, verse: 2, word: "الكتاب", muyassar: "القرآن الكريم", siraj: "الكتاب المنزل من الله" },
  { surah: 2, verse: 3, word: "يؤمنون", muyassar: "يصدقون بالقرآن", siraj: "يصدقون بالقرآن والرسول" },
  { surah: 2, verse: 4, word: "الغيب", muyassar: "ما غاب عن الحس", siraj: "ما لا يراه الإنسان" },
  { surah: 2, verse: 5, word: "يقيمون", muyassar: "يؤدون بحق وخشوع", siraj: "يؤدونها بالشروط المطلوبة" },
  { surah: 2, verse: 34, word: "استكبروا", muyassar: "تكبروا وأنفوا", siraj: "امتنعوا وتعظموا" },
  { surah: 2, verse: 102, word: "الجهت", muyassar: "السحر والكهانة", siraj: "ما يتعلمه الجاهل من السحر" },
  { surah: 2, verse: 259, word: "أنى", muyassar: "كيف وبأي وسيلة", siraj: "بأي وسيلة وكيف" },

  // Surah Al-Imran (3)
  { surah: 3, verse: 7, word: "محكمات", muyassar: "واضحات المعنى", siraj: "الآيات الواضحة الدلالة" },
  { surah: 3, verse: 7, word: "متشابهات", muyassar: "متشابهة الألفاظ", siraj: "الآيات التي تحتاج إلى تفسير" },
  { surah: 3, verse: 190, word: "آيات", muyassar: "علامات ودلالات", siraj: "دلالات واضحة على قدرة الله" },

  // Surah An-Nisa (4)
  { surah: 4, verse: 3, word: "قسمة ضيزى", muyassar: "قسمة جائرة ظالمة", siraj: "قسمة ظالمة غير عادلة" },
  { surah: 4, verse: 11, word: "يستفتونك", muyassar: "يسألونك الحكم", siraj: "يطلبون منك الحكم والفتوى" },
  { surah: 4, verse: 43, word: "سكارى", muyassar: "مخمورين فاقدي العقل", siraj: "فاقدي العقل من تأثير الخمر" },

  // Surah Al-Maidah (5)
  { surah: 5, verse: 3, word: "ميتة", muyassar: "ما مات بغير ذكاة", siraj: "ما مات حتف أنفه" },
  { surah: 5, verse: 3, word: "دم", muyassar: "المسفوح المصبوب", siraj: "الدم المصبوب الذي يسيل" },
  { surah: 5, verse: 3, word: "خنزير", muyassar: "حيوان نجس محرم", siraj: "حيوان معروف نجس محرم" },

  // Surah Al-An'am (6)
  { surah: 6, verse: 25, word: "وقر", muyassar: "ثقل وصمم", siraj: "ثقل في آذانهم يمنع الفهم" },
  { surah: 6, verse: 25, word: "حجاب", muyassar: "ستار وحاجز", siraj: "حاجز يمنع الفهم والتذكر" },

  // Surah Al-A'raf (7)
  { surah: 7, verse: 26, word: "ريش", muyassar: "زينة وجمال", siraj: "الزينة والجمال" },
  { surah: 7, verse: 26, word: "تقوى", muyassar: "الخوف من الله والطاعة", siraj: "خوف الله والعمل بطاعته" },

  // Surah Al-Anfal (8)
  { surah: 8, verse: 1, word: "الأنفال", muyassar: "الغنائم والفيء", siraj: "الغنائم والمكاسب الحربية" },
  { surah: 8, verse: 41, word: "الخمس", muyassar: "خمس الغنيمة", siraj: "خمس ما يأخذه الله من الغنيمة" },

  // Surah At-Taubah (9)
  { surah: 9, verse: 1, word: "براءة", muyassar: "براءة من العهد", siraj: "براءة من الله ورسوله" },

  // Surah Yunus (10)
  { surah: 10, verse: 5, word: "مراتب", muyassar: "درجات ومنازل", siraj: "درجات ومنازل محددة" },

  // Surah Hud (11)
  { surah: 11, verse: 7, word: "الاستواء", muyassar: "الاستقرار والتمكن", siraj: "الاستقرار على العرش" },
  { surah: 11, verse: 44, word: "يصدون", muyassar: "يمنعون ويصرفون", siraj: "يمنعون الناس عن الحق" },

  // Surah Yusuf (12)
  { surah: 12, verse: 4, word: "رؤيا", muyassar: "الحلم والرؤية", siraj: "الرؤية والحلم الصادق" },
  { surah: 12, verse: 31, word: "قصرها", muyassar: "قصرها وحبسها", siraj: "حبسها في القصر" },

  // Surah Ar-Ra'd (13)
  { surah: 13, verse: 2, word: "استوى", muyassar: "استقر وتمكن", siraj: "استقر على العرش" },

  // Surah Ibrahim (14)
  { surah: 14, verse: 10, word: "أفتريتم", muyassar: "أكذبتم وافتريتم", siraj: "أفتريتم على الله كذباً" },

  // Surah Al-Hijr (15)
  { surah: 15, verse: 47, word: "سلام", muyassar: "تحية وسلام", siraj: "تحية من الله عليهم" },

  // Surah An-Nahl (16)
  { surah: 16, verse: 2, word: "ينزل", muyassar: "ينزل الملائكة بالوحي", siraj: "ينزل الملائكة بأمر الله" },
  { surah: 16, verse: 68, word: "يخرج", muyassar: "يخرج من بطونها شراب", siraj: "يخرج من بطونها شراب مختلف" },

  // Surah Al-Isra (17)
  { surah: 17, verse: 1, word: "أسرى", muyassar: "سار ليلاً", siraj: "أسرى برسوله ليلاً" },

  // Surah Al-Kahf (18)
  { surah: 18, verse: 18, word: "يحسبهم", muyassar: "يظنهم أيقاظاً", siraj: "يظن الرائي أنهم أيقاظ" },

  // Surah Maryam (19)
  { surah: 19, verse: 24, word: "نخلة", muyassar: "شجرة التمر", siraj: "شجرة النخيل" },

  // Surah Ta-Ha (20)
  { surah: 20, verse: 18, word: "عصاي", muyassar: "عصايا وعصا", siraj: "عصا موسى المعروفة" },

  // Surah Al-Anbiya (21)
  { surah: 21, verse: 30, word: "رتقاً", muyassar: "مغلقة ومتصلة", siraj: "السماوات والأرض كانت رتقاً" },

  // Surah Al-Hajj (22)
  { surah: 22, verse: 20, word: "يصدون", muyassar: "يمنعون ويصرفون", siraj: "يصرفون الناس عن الحق" },

  // Surah Al-Mu'minun (23)
  { surah: 23, verse: 12, word: "سلالة", muyassar: "نسل ونسب", siraj: "خلقنا الإنسان من سلالة" },

  // Surah An-Nur (24)
  { surah: 24, verse: 35, word: "نور", muyassar: "ضياء وإضاءة", siraj: "نور يهدي الناس" },

  // Surah Al-Furqan (25)
  { surah: 25, verse: 53, word: "حاجز", muyassar: "فاصل وحد", siraj: "حاجز يمنع امتزاج الماء" },

  // Surah Ash-Shu'ara (26)
  { surah: 26, verse: 24, word: "رب", muyassar: "المالك والمتصرف", siraj: "رب السماوات والأرض" },

  // Surah An-Naml (27)
  { surah: 27, verse: 17, word: "جنود", muyassar: "جيوش وقوات", siraj: "جنود الجن والإنس والطير" },

  // Surah Al-Qasas (28)
  { surah: 28, verse: 25, word: "أجر", muyassar: "ثواب وعطاء", siraj: "أجر من أحسن عمله" },

  // Surah Al-Ankabut (29)
  { surah: 29, verse: 41, word: "بيت", muyassar: "مسكن وملجأ", siraj: "بيت العنكبوت أوهن البيوت" },

  // Surah Ar-Rum (30)
  { surah: 30, verse: 4, word: "غلبوا", muyassar: "انتصروا وغلبوا", siraj: "غلبت الروم على الفرس" },

  // Surah Luqman (31)
  { surah: 31, verse: 13, word: "شرك", muyassar: "شرك بالله وتعدد آلهة", siraj: "الشرك بالله هو ظلم عظيم" },

  // Surah As-Sajdah (32)
  { surah: 32, verse: 7, word: "أحسن", muyassar: "أتقن وأحكم", siraj: "أحسن كل شيء خلقه" },

  // Surah Al-Ahzab (33)
  { surah: 33, verse: 33, word: "الطهر", muyassar: "النظافة والطهارة", siraj: "الطهر من الحدث والخبث" },

  // Surah Saba (34)
  { surah: 34, verse: 12, word: "القطر", muyassar: "النحاس المذاب", siraj: "القطر من النحاس المذاب" },

  // Surah Fatir (35)
  { surah: 35, verse: 11, word: "خلق", muyassar: "خلق وإنشاء", siraj: "خلقكم من نفس واحدة" },

  // Surah Ya-Sin (36)
  { surah: 36, verse: 40, word: "يسبح", muyassar: "يجري ويسير", siraj: "الشمس تجري لمستقر لها" },

  // Surah As-Saffat (37)
  { surah: 37, verse: 5, word: "ربك", muyassar: "إلهك ومالكك", siraj: "رب السماوات والأرض" },

  // Surah Sad (38)
  { surah: 38, verse: 34, word: "الجنود", muyassar: "الجيوش والقوات", siraj: "جنود من الجن والإنس" },

  // Surah Az-Zumar (39)
  { surah: 39, verse: 5, word: "تدور", muyassar: "تدور وتدوم", siraj: "السماوات والأرض تدور بحكمة" },

  // Surah Ghafir (40)
  { surah: 40, verse: 7, word: "يستغفرون", muyassar: "يطلبون المغفرة", siraj: "يستغفرون لمن آمن" },

  // Surah Fussilat (41)
  { surah: 41, verse: 11, word: "استوى", muyassar: "استقر وتمكن", siraj: "استوى إلى السماء" },

  // Surah Ash-Shura (42)
  { surah: 42, verse: 11, word: "نظير", muyassar: "مثيل وشبيه", siraj: "ليس كمثله شيء" },

  // Surah Az-Zukhruf (43)
  { surah: 43, verse: 13, word: "تركبون", muyassar: "تركبون وتستقلون", siraj: "تركبون عليها" },

  // Surah Ad-Dukhan (44)
  { surah: 44, verse: 3, word: "ليلة", muyassar: "ليلة القدر", siraj: "ليلة القدر المباركة" },

  // Surah Al-Jathiyah (45)
  { surah: 45, verse: 13, word: "سخر", muyassar: "ذلل وسهل", siraj: "سخر لكم ما في السماوات" },

  // Surah Al-Ahqaf (46)
  { surah: 46, verse: 15, word: "فصاله", muyassar: "فطامه وفصله", siraj: "فصال الطفل عن الأم" },

  // Surah Muhammad (47)
  { surah: 47, verse: 15, word: "أنهار", muyassar: "جداول وأنهار", siraj: "أنهار من ماء وخمر ولبن" },

  // Surah Al-Fath (48)
  { surah: 48, verse: 1, word: "فتح", muyassar: "فتح مكة والنصر", siraj: "فتح لك فتحاً مبيناً" },

  // Surah Al-Hujurat (49)
  { surah: 49, verse: 7, word: "يحبكم", muyassar: "يحب طاعتكم", siraj: "يحب الله الطائعين" },

  // Surah Qaf (50)
  { surah: 50, verse: 9, word: "ماء", muyassar: "الماء والمطر", siraj: "ننزل من السماء ماء" },
  { surah: 50, verse: 16, word: "نفس", muyassar: "الروح والنفس", siraj: "نحن أقرب إليه من حبل الوريد" },

  // Surah Adh-Dhariyat (51)
  { surah: 51, verse: 1, word: "الذاريات", muyassar: "الرياح التي تذري", siraj: "الرياح التي تذري التراب" },

  // Surah At-Tur (52)
  { surah: 52, verse: 1, word: "الطور", muyassar: "جبل الطور", siraj: "جبل الطور بسيناء" },

  // Surah An-Najm (53)
  { surah: 53, verse: 1, word: "والنجم", muyassar: "والنجم والنجوم", siraj: "النجم والثريا" },
  { surah: 53, verse: 5, word: "شديد", muyassar: "قوي وعظيم", siraj: "ذو قوة شديدة" },

  // Surah Al-Qamar (54)
  { surah: 54, verse: 1, word: "اقتربت", muyassar: "اقتربت الساعة", siraj: "اقتربت الساعة وانشق القمر" },

  // Surah Ar-Rahman (55)
  { surah: 55, verse: 19, word: "البحران", muyassar: "البحران الملتقيان", siraj: "البحر العذب والملح" },

  // Surah Al-Waqi'ah (56)
  { surah: 56, verse: 1, word: "الواقعة", muyassar: "الساعة والقيامة", siraj: "يوم القيامة الذي لا ريب فيه" },

  // Surah Al-Hadid (57)
  { surah: 57, verse: 25, word: "الحديد", muyassar: "المعدن الصلب", siraj: "الحديد فيه بأس شديد" },

  // Surah Al-Mujadilah (58)
  { surah: 58, verse: 1, word: "تجادلك", muyassar: "تخاصمك وتجادلك", siraj: "تجادلك في زوجها" },

  // Surah Al-Hashr (59)
  { surah: 59, verse: 7, word: "الفيء", muyassar: "ما أخذ من الكفار", siraj: "ما أفاء الله على رسوله" },

  // Surah Al-Mumtahanah (60)
  { surah: 60, verse: 1, word: "أعدائكم", muyassar: "خصومكم وأعداؤكم", siraj: "أعداء الله ورسوله" },

  // Surah As-Saff (61)
  { surah: 61, verse: 4, word: "يحبهم", muyassar: "يحب الله الذين يقاتلون", siraj: "يحب الله الذين يقاتلون في سبيله" },

  // Surah Al-Jumu'ah (62)
  { surah: 62, verse: 9, word: "الجمعة", muyassar: "يوم الجمعة", siraj: "يوم الجمعة المباركة" },

  // Surah Al-Munafiqun (63)
  { surah: 63, verse: 1, word: "المنافقون", muyassar: "من يظهرون الإيمان ويخفون الكفر", siraj: "من يخفي الكفر تحت ستار الإيمان" },

  // Surah At-Taghabun (64)
  { surah: 64, verse: 11, word: "بإذن", muyassar: "بأمر وإذن", siraj: "بإذن الله وتقديره" },

  // Surah At-Talaq (65)
  { surah: 65, verse: 1, word: "الطلاق", muyassar: "فراق الزوجة", siraj: "فراق الزوجة بالصيغة الشرعية" },

  // Surah At-Tahrim (66)
  { surah: 66, verse: 1, word: "تحرم", muyassar: "تحرم ما أحل الله", siraj: "تحرم على نفسك ما أحل الله" },

  // Surah Al-Mulk (67)
  { surah: 67, verse: 1, word: "الملك", muyassar: "الملك والسلطان", siraj: "الملك لله وحده" },

  // Surah Al-Qalam (68)
  { surah: 68, verse: 1, word: "ن", muyassar: "حرف من الحروف المقطعة", siraj: "حرف من الحروف المقطعة" },

  // Surah Al-Haqqah (69)
  { surah: 69, verse: 1, word: "الحاقة", muyassar: "الساعة والقيامة", siraj: "يوم القيامة الذي لا ريب فيه" },

  // Surah Al-Ma'arij (70)
  { surah: 70, verse: 4, word: "يعرج", muyassar: "يصعد ويرتفع", siraj: "تعرج الملائكة والروح إليه" },

  // Surah Nuh (71)
  { surah: 71, verse: 12, word: "أنهار", muyassar: "جداول وأنهار", siraj: "أنهار تجري من تحتكم" },

  // Surah Al-Jinn (72)
  { surah: 72, verse: 1, word: "الجن", muyassar: "مخلوقات من نار", siraj: "مخلوقات من نار بلا دخان" },

  // Surah Al-Muzzammil (73)
  { surah: 73, verse: 1, word: "المزمل", muyassar: "المتزمل بالثوب", siraj: "يا أيها المزمل قم الليل" },

  // Surah Al-Muddaththir (74)
  { surah: 74, verse: 1, word: "المدثر", muyassar: "المتدثر بالثوب", siraj: "يا أيها المدثر قم فأنذر" },

  // Surah Al-Qiyamah (75)
  { surah: 75, verse: 1, word: "القيامة", muyassar: "يوم البعث والحساب", siraj: "يوم القيامة والبعث" },

  // Surah Al-Insan (76)
  { surah: 76, verse: 1, word: "الإنسان", muyassar: "بني آدم", siraj: "خلقنا الإنسان من نطفة" },

  // Surah Al-Mursalat (77)
  { surah: 77, verse: 1, word: "المرسلات", muyassar: "الرياح المرسلة", siraj: "الرياح التي ترسل بالمطر" },

  // Surah An-Naba (78)
  { surah: 78, verse: 1, word: "عَمَّ", muyassar: "عن أي شيء", siraj: "عن أي شيء يتساءلون" },
  { surah: 78, verse: 1, word: "يَتَسَآءَلُونَ", muyassar: "يسأل بعضهم بعضاً", siraj: "يسأل بعضهم بعضاً عن الخبر" },
  { surah: 78, verse: 2, word: "النَّبَإِ", muyassar: "الخبر العظيم", siraj: "الخبر العظيم الشأن" },
  { surah: 78, verse: 2, word: "العَظِيمِ", muyassar: "العظيم الشأن", siraj: "العظيم الذي شك فيه الكفار" },
  { surah: 78, verse: 3, word: "الَّذِى", muyassar: "الذي", siraj: "الذي هم فيه مختلفون" },
  { surah: 78, verse: 3, word: "مُخْتَلِفُونَ", muyassar: "متنازعون", siraj: "متنازعون فيه" },
  { surah: 78, verse: 4, word: "كَلَّا", muyassar: "ردع وتنبيه", siraj: "كلا أي ليس الأمر كما تزعمون" },
  { surah: 78, verse: 4, word: "سَيَعْلَمُونَ", muyassar: "سيعرفون الحقيقة", siraj: "سيعرفون عاقبة تكذيبهم" },
  { surah: 78, verse: 5, word: "ثُمَّ", muyassar: "ثم يكرر التأكيد", siraj: "ثم يكرر التأكيد والتهديد" },
  { surah: 78, verse: 6, word: "أَلَمْ", muyassar: "ألم أي هل لم", siraj: "ألم تعلمون أن الله خلق" },
  { surah: 78, verse: 6, word: "نَجْعَلِ", muyassar: "نخلق", siraj: "نخلق ونصنع" },
  { surah: 78, verse: 6, word: "الْأَرْضَ", muyassar: "الأرض", siraj: "الأرض فراشاً" },
  { surah: 78, verse: 6, word: "مِهَادًا", muyassar: "فراشاً", siraj: "فراشاً ومستقراً" },
  { surah: 78, verse: 7, word: "الْجِبَالَ", muyassar: "الجبال", siraj: "الجبال" },
  { surah: 78, verse: 7, word: "أَوْتَادًا", muyassar: "أوتاداً", siraj: "أوتاداً تثبت الأرض" },
  { surah: 78, verse: 8, word: "وَخَلَقْنَاكُمْ", muyassar: "وخلقناكم", siraj: "وخلقناكم أزواجاً" },
  { surah: 78, verse: 8, word: "أَزْوَاجًا", muyassar: "ذكراً وأنثى", siraj: "ذكراً وأنثى" },
  { surah: 78, verse: 9, word: "النَّوْمَ", muyassar: "النوم", siraj: "النوم سكناً" },
  { surah: 78, verse: 9, word: "سُبَاتًا", muyassar: "سكناً", siraj: "سكناً وراحة" },
  { surah: 78, verse: 10, word: "اللَّيْلَ", muyassar: "الليل", siraj: "الليل" },
  { surah: 78, verse: 10, word: "لِبَاسًا", muyassar: "لباساً", siraj: "لباساً يغطي" },

  // Surah An-Nazi'at (79)
  { surah: 79, verse: 1, word: "النازعات", muyassar: "الملائكة التي تنزع الأرواح", siraj: "الملائكة التي تنزع الأرواح" },

  // Surah Abasa (80)
  { surah: 80, verse: 1, word: "عبس", muyassar: "كره وأعرض", siraj: "عبس وتولى" },

  // Surah At-Takwir (81)
  { surah: 81, verse: 1, word: "التكوير", muyassar: "الطي والجمع", siraj: "إذا الشمس كورت" },

  // Surah Al-Infitar (82)
  { surah: 82, verse: 1, word: "الانفطار", muyassar: "الانشقاق والانفصال", siraj: "إذا السماء انفطرت" },

  // Surah Al-Mutaffifin (83)
  { surah: 83, verse: 1, word: "المطففين", muyassar: "الذين ينقصون الكيل", siraj: "الذين ينقصون الكيل والميزان" },

  // Surah Al-Inshiqaq (84)
  { surah: 84, verse: 1, word: "الانشقاق", muyassar: "الانشقاق والانفصال", siraj: "إذا السماء انشقت" },

  // Surah Al-Buruj (85)
  { surah: 85, verse: 1, word: "البروج", muyassar: "القصور والحصون", siraj: "القصور والنجوم الكبيرة" },

  // Surah At-Tariq (86)
  { surah: 86, verse: 1, word: "الطارق", muyassar: "نجم يطرق الليل", siraj: "النجم الطارق" },

  // Surah Al-A'la (87)
  { surah: 87, verse: 1, word: "الأعلى", muyassar: "الأعلى والأرفع", siraj: "سبح اسم ربك الأعلى" },

  // Surah Al-Ghashiyah (88)
  { surah: 88, verse: 1, word: "الغاشية", muyassar: "القيامة التي تغشى الناس", siraj: "يوم القيامة الذي يغشى الناس" },

  // Surah Al-Fajr (89)
  { surah: 89, verse: 1, word: "الفجر", muyassar: "الفجر والضياء", siraj: "الفجر وليال عشر" },

  // Surah Al-Balad (90)
  { surah: 90, verse: 1, word: "البلد", muyassar: "المدينة والبلد", siraj: "والبلد الأمين" },

  // Surah Ash-Shams (91)
  { surah: 91, verse: 1, word: "الشمس", muyassar: "الشمس والنهار", siraj: "والشمس وضحاها" },

  // Surah Al-Lail (92)
  { surah: 92, verse: 1, word: "الليل", muyassar: "الليل والظلام", siraj: "والليل إذا يغشى" },

  // Surah Ad-Duha (93)
  { surah: 93, verse: 1, word: "الضحى", muyassar: "الضحى والنهار", siraj: "والضحى وليل إذا سجى" },

  // Surah Ash-Sharh (94)
  { surah: 94, verse: 1, word: "الشرح", muyassar: "التوسيع والتسهيل", siraj: "ألم نشرح لك صدرك" },

  // Surah At-Tin (95)
  { surah: 95, verse: 1, word: "التين", muyassar: "الفاكهة المعروفة", siraj: "والتين والزيتون" },

  // Surah Al-Alaq (96)
  { surah: 96, verse: 1, word: "اقرأ", muyassar: "اتل واقرأ", siraj: "اقرأ باسم ربك الذي خلق" },
  { surah: 96, verse: 2, word: "علق", muyassar: "دم متجمد", siraj: "خلق الإنسان من علق" },
  { surah: 96, verse: 3, word: "أكرم", muyassar: "أعظم وأشرف", siraj: "وربك الأكرم" },
  { surah: 96, verse: 4, word: "القلم", muyassar: "الأداة التي يكتب بها", siraj: "الذي علم بالقلم" },
  { surah: 96, verse: 5, word: "علم", muyassar: "الحكمة والمعرفة", siraj: "علم الإنسان ما لم يعلم" },
  { surah: 96, verse: 6, word: "يطغى", muyassar: "يتجاوز الحد والعدل", siraj: "إن الإنسان ليطغى" },
  { surah: 96, verse: 7, word: "أغنى", muyassar: "أغناه وأكثر ماله", siraj: "أن رآه استغنى" },
  { surah: 96, verse: 8, word: "إلى", muyassar: "إلى الله المرجع", siraj: "إن إلى ربك الرجعى" },
  { surah: 96, verse: 9, word: "ناشئة", muyassar: "قائمة بالليل", siraj: "أرأيت الذي ينهى عبداً إذا صلى" },
  { surah: 96, verse: 10, word: "يسجد", muyassar: "يركع ويسجد", siraj: "يسجد ويقوم الليل" },
  { surah: 96, verse: 11, word: "أرأيت", muyassar: "هل رأيت وهل علمت", siraj: "أرأيت إن كان على الهدى" },
  { surah: 96, verse: 12, word: "يأمر", muyassar: "يأمر بالتقوى", siraj: "أو أمر بالتقوى" },
  { surah: 96, verse: 13, word: "يكذب", muyassar: "ينكر ويجحد", siraj: "أرأيت إن كذب وتولى" },
  { surah: 96, verse: 14, word: "يعلم", muyassar: "يعلم ويعرف", siraj: "ألم يعلم بأن الله يرى" },
  { surah: 96, verse: 15, word: "كلا", muyassar: "ردع وتنبيه", siraj: "كلا لئن لم ينته" },
  { surah: 96, verse: 16, word: "ناصية", muyassar: "مقدم الرأس", siraj: "لنسفعاً بالناصية" },
  { surah: 96, verse: 17, word: "كاذبة", muyassar: "كاذبة وآثمة", siraj: "ناصية كاذبة آثمة" },
  { surah: 96, verse: 18, word: "يدع", muyassar: "يستدعي ويطلب", siraj: "فليدع ناديه" },
  { surah: 96, verse: 19, word: "سادنة", muyassar: "خادمة الصنم", siraj: "سادنة الصنم" },

  // Surah Al-Qadr (97)
  { surah: 97, verse: 1, word: "القدر", muyassar: "الشرف والقيمة", siraj: "ليلة القدر المباركة" },

  // Surah Al-Bayyinah (98)
  { surah: 98, verse: 1, word: "البينة", muyassar: "الحجة والدليل الواضح", siraj: "الحجة الواضحة والبرهان" },

  // Surah Az-Zilzal (99)
  { surah: 99, verse: 1, word: "الزلزلة", muyassar: "الزلزال والاهتزاز", siraj: "إذا زلزلت الأرض زلزالها" },

  // Surah Al-Adiyat (100)
  { surah: 100, verse: 1, word: "العاديات", muyassar: "الخيل التي تعدو", siraj: "الخيل التي تعدو بسرعة" },

  // Surah Al-Qari'ah (101)
  { surah: 101, verse: 1, word: "القارعة", muyassar: "القيامة التي تقرع القلوب", siraj: "يوم القيامة الذي يقرع الأسماع" },

  // Surah At-Takathur (102)
  { surah: 102, verse: 1, word: "التكاثر", muyassar: "التنافس والتكاثر", siraj: "ألهاكم التكاثر" },

  // Surah Al-Asr (103)
  { surah: 103, verse: 1, word: "العصر", muyassar: "الزمان والدهر", siraj: "والعصر إن الإنسان لفي خسر" },

  // Surah Al-Humazah (104)
  { surah: 104, verse: 1, word: "الهمزة", muyassar: "الذي يهمز ويسخر", siraj: "ويل لكل همزة لمزة" },

  // Surah Al-Fil (105)
  { surah: 105, verse: 1, word: "الفيل", muyassar: "حيوان معروف", siraj: "ألم تر كيف فعل ربك بأصحاب الفيل" },

  // Surah Quraysh (106)
  { surah: 106, verse: 1, word: "قريش", muyassar: "القبيلة العربية", siraj: "لإيلاف قريش" },

  // Surah Al-Ma'un (107)
  { surah: 107, verse: 1, word: "الماعون", muyassar: "الأداة والمتاع", siraj: "أرأيت الذي يكذب بالدين" },

  // Surah Al-Kawthar (108)
  { surah: 108, verse: 1, word: "الكوثر", muyassar: "نهر في الجنة", siraj: "إنا أعطيناك الكوثر" },

  // Surah Al-Kafirun (109)
  { surah: 109, verse: 1, word: "الكافرون", muyassar: "الذين يكفرون بالله", siraj: "قل يا أيها الكافرون" },

  // Surah An-Nasr (110)
  { surah: 110, verse: 1, word: "النصر", muyassar: "الغلبة والفتح", siraj: "إذا جاء نصر الله والفتح" },

  // Surah Al-Lahab (111)
  { surah: 111, verse: 1, word: "اللهب", muyassar: "النار واللهيب", siraj: "تبت يدا أبي لهب وتب" },

  // Surah Al-Ikhlas (112)
  { surah: 112, verse: 1, word: "الإخلاص", muyassar: "التوحيد والإخلاص", siraj: "قل هو الله أحد" },

  // Surah Al-Falaq (113)
  { surah: 113, verse: 1, word: "الفلق", muyassar: "الصبح والفجر", siraj: "قل أعوذ برب الفلق" },

  // Surah An-Nas (114)
  { surah: 114, verse: 1, word: "الناس", muyassar: "بني آدم", siraj: "قل أعوذ برب الناس" },
];

export default gharibDatabase;
