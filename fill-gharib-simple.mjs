#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Gharib database - copied directly
const gharibDatabase = [
  // Surah Al-Naba (78)
  { surah: 78, verse: 1, word: "عَمَّ", muyassar: "عن أي شيء", siraj: "عن أي شيء يتساءلون" },
  { surah: 78, verse: 1, word: "يَتَسَآءَلُونَ", muyassar: "يسأل بعضهم بعضاً", siraj: "يسأل بعضهم بعضاً عن الخبر العظيم" },
  { surah: 78, verse: 2, word: "النَّبَإِ", muyassar: "الخبر العظيم", siraj: "الخبر العظيم الشأن وهو القرآن" },
  { surah: 78, verse: 2, word: "العَظِيمِ", muyassar: "العظيم الشأن", siraj: "العظيم الذي شك فيه كفار قريش" },
  { surah: 78, verse: 3, word: "الَّذِى", muyassar: "الذي", siraj: "الذي هم فيه مختلفون" },
  { surah: 78, verse: 3, word: "مُخْتَلِفُونَ", muyassar: "متنازعون ومختلفون", siraj: "متنازعون فيه بين مؤمن وكافر" },
  { surah: 78, verse: 4, word: "كَلَّا", muyassar: "ردع وتنبيه", siraj: "كلا أي ليس الأمر كما تزعمون" },
  { surah: 78, verse: 4, word: "سَيَعْلَمُونَ", muyassar: "سيعرفون الحقيقة", siraj: "سيعرفون عاقبة تكذيبهم" },
  { surah: 78, verse: 5, word: "ثُمَّ", muyassar: "ثم يكرر التأكيد", siraj: "ثم يكرر التأكيد والتهديد" },
  { surah: 78, verse: 6, word: "أَلَمْ", muyassar: "ألم أي هل لم", siraj: "ألم تعلمون أن الله خلق السماوات" },
  { surah: 78, verse: 6, word: "نَجْعَلِ", muyassar: "نخلق", siraj: "نخلق ونصنع" },
  { surah: 78, verse: 6, word: "الْأَرْضَ", muyassar: "الأرض", siraj: "الأرض فراشاً" },
  { surah: 78, verse: 6, word: "مِهَادًا", muyassar: "فراشاً ومهاداً", siraj: "فراشاً ومكاناً مستقراً" },
  { surah: 78, verse: 7, word: "الْجِبَالَ", muyassar: "الجبال", siraj: "الجبال أوتاداً" },
  { surah: 78, verse: 7, word: "أَوْتَادًا", muyassar: "أوتاداً تثبت الأرض", siraj: "أوتاداً تثبت الأرض وتمنعها من الحركة" },
  { surah: 78, verse: 8, word: "وَخَلَقْنَاكُمْ", muyassar: "وخلقناكم", siraj: "وخلقناكم أزواجاً" },
  { surah: 78, verse: 8, word: "أَزْوَاجًا", muyassar: "ذكراً وأنثى", siraj: "ذكراً وأنثى" },
  { surah: 78, verse: 9, word: "النَّوْمَ", muyassar: "النوم", siraj: "النوم سكناً وراحة" },
  { surah: 78, verse: 9, word: "سُبَاتًا", muyassar: "سكناً وراحة", siraj: "سكناً وراحة للأجسام" },
  { surah: 78, verse: 10, word: "اللَّيْلَ", muyassar: "الليل", siraj: "الليل" },
  { surah: 78, verse: 10, word: "لِبَاسًا", muyassar: "لباساً يغطي", siraj: "لباساً يغطي الأرض بظلامه" },
  { surah: 78, verse: 11, word: "النَّهَارَ", muyassar: "النهار", siraj: "النهار" },
  { surah: 78, verse: 11, word: "مَعَاشًا", muyassar: "معاشاً وعملاً", siraj: "معاشاً للعمل والكسب" },
  { surah: 78, verse: 12, word: "سَبْعًا", muyassar: "سبع سماوات", siraj: "سبع سماوات" },
  { surah: 78, verse: 12, word: "طِبَاقًا", muyassar: "طبقات بعضها فوق بعض", siraj: "طبقات محكمة الخلق" },
  { surah: 78, verse: 13, word: "سِرَاجًا", muyassar: "مصباحاً", siraj: "مصباحاً منيراً" },
  { surah: 78, verse: 13, word: "وَهَّاجًا", muyassar: "مضيئاً ومتوهجاً", siraj: "متوهجاً مشتعلاً" },
  { surah: 78, verse: 14, word: "مِطْرًا", muyassar: "مطراً", siraj: "مطراً غزيراً" },
  { surah: 78, verse: 14, word: "ثِجَاجًا", muyassar: "مطراً غزيراً", siraj: "مطراً غزيراً متتابعاً" },
  { surah: 78, verse: 15, word: "الْأَنْهَارَ", muyassar: "الأنهار", siraj: "الأنهار" },
  { surah: 78, verse: 15, word: "بِقَدَرٍ", muyassar: "بقدر معين", siraj: "بقدر معين لا يزيد ولا ينقص" },
  { surah: 78, verse: 16, word: "النَّخْلَ", muyassar: "النخل", siraj: "النخل" },
  { surah: 78, verse: 16, word: "إِسْتَبْرَقًا", muyassar: "ديباجاً وحريراً", siraj: "ديباجاً وحريراً" },
  { surah: 78, verse: 17, word: "جَنَّاتٍ", muyassar: "جنات", siraj: "جنات وبساتين" },
  { surah: 78, verse: 17, word: "غُلْفًا", muyassar: "غلفاً مغلقة", siraj: "غلفاً مغلقة الأبواب" },
  { surah: 78, verse: 18, word: "الْيَقِينُ", muyassar: "الموت واليقين", siraj: "الموت وهو اليقين" },
  { surah: 78, verse: 19, word: "نُفِخَ", muyassar: "نفخ في الصور", siraj: "نفخ في الصور" },
  { surah: 78, verse: 19, word: "الصُّورِ", muyassar: "الصور", siraj: "الصور وهو القرن" },
  { surah: 78, verse: 20, word: "فَإِذَا", muyassar: "فإذا", siraj: "فإذا هم من الأجداث" },
  { surah: 78, verse: 20, word: "الْأَجْدَاثِ", muyassar: "القبور", siraj: "القبور" },
];

console.log(`Gharib database has ${gharibDatabase.length} entries`);

// Organize by surah and verse
const gharibByVerse = {};
gharibDatabase.forEach(entry => {
  const key = `${entry.surah}_${entry.verse}`;
  if (!gharibByVerse[key]) {
    gharibByVerse[key] = [];
  }
  gharibByVerse[key].push(entry);
});

console.log(`Organized into ${Object.keys(gharibByVerse).length} verses\n`);

// Process all surah files
const surahsDir = path.join(__dirname, 'client/src/data/surahs');
const files = fs.readdirSync(surahsDir).filter(f => f.endsWith('.json'));

let updatedCount = 0;
let ayahsUpdated = 0;

files.forEach(file => {
  const filePath = path.join(surahsDir, file);
  const surahNumber = parseInt(file.replace('.json', ''));
  
  try {
    const surahData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const ayahs = surahData.ayat || surahData.ayahs || [];
    
    let surahUpdated = false;
    
    ayahs.forEach(ayah => {
      const key = `${surahNumber}_${ayah.number}`;
      if (gharibByVerse[key]) {
        const entries = gharibByVerse[key];
        const entry = entries[0];
        
        ayah.gharib = {
          muyassar: entry.muyassar ? { word: entry.word, meaning: entry.muyassar } : {},
          siraj: entry.siraj ? { word: entry.word, meaning: entry.siraj } : {}
        };
        
        ayahsUpdated++;
        surahUpdated = true;
      }
    });
    
    if (surahUpdated) {
      fs.writeFileSync(filePath, JSON.stringify(surahData, null, 2));
      updatedCount++;
      console.log(`✓ Surah ${surahNumber.toString().padStart(3, ' ')}`);
    }
  } catch (error) {
    console.error(`✗ Error with ${file}:`, error.message);
  }
});

console.log(`\n✅ Done! Updated ${updatedCount} files, ${ayahsUpdated} ayahs`);
