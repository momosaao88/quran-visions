#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Video mappings from the existing file
const videoMappings = [
  { surah: 80, verse: 1, word: "عبس", videoId: "b7MEB7iOSfI", title: "برنامج ( غريب القرآن ) || الحلقة 01 - { غثاءً أحوى}" },
  { surah: 112, verse: 2, word: "الصمد", videoId: "nMezLNQzD_4", title: "برنامج ( غريب القرآن ) || الحلقة 02 - { الله الصمد}" },
  { surah: 96, verse: 3, word: "من نطفة أمشاج", videoId: "aEczqy0hlCE", title: "برنامج ( غريب القرآن ) || الحلقة 03 - { من نطفة أمشاج }" },
  { surah: 113, verse: 4, word: "غاسق إذا وقب", videoId: "FqqopePrNYE", title: "برنامج ( غريب القرآن ) || الحلقة 04 - { غاسق إذا وقب }" },
  { surah: 111, verse: 5, word: "حبل من مسد", videoId: "LbI1Zv8Uuv8", title: "برنامج ( غريب القرآن ) || الحلقة 05 - { حبل من مسد }" },
  { surah: 114, verse: 5, word: "الوسواس الخناس", videoId: "TwB8_ONDULM", title: "برنامج ( غريب القرآن ) || الحلقة 06 - { الوسواس الخناس }" },
  { surah: 72, verse: 1, word: "فظن ألن نقدر عليه", videoId: "WvDpMVuPxOc", title: "برنامج ( غريب القرآن ) || الحلقة 07 - { فظن ألن نقدر عليه }" },
  { surah: 105, verse: 4, word: "جابوا الصخر بالواد", videoId: "IMbB7JYBqyE", title: "برنامج ( غريب القرآن ) || الحلقة 08 - { جابوا الصخر بالواد}" },
  { surah: 78, verse: 14, word: "ماءً ثجاجًا", videoId: "7n-2DSPb8a4", title: "برنامج ( غريب القرآن ) || الحلقة 09 - { ماءً ثجاجًا }" },
  { surah: 79, verse: 26, word: "نزاعة للشوى", videoId: "tiJIu5x23Dw", title: "برنامج ( غريب القرآن ) || الحلقة 10 - { نزاعة للشوى }" },
  { surah: 53, verse: 6, word: "ذو مرة فاستوى", videoId: "n-x2seY74yA", title: "برنامج ( غريب القرآن ) || الحلقة 11 - { ذو مرة فاستوى }" },
  { surah: 13, verse: 3, word: "وبست الجبال بسًا", videoId: "OBcZwqeJCeA", title: "برنامج ( غريب القرآن ) || الحلقة 12 - { وبست الجبال بسًا }" },
  { surah: 71, verse: 19, word: "ذات ألواح و دسر", videoId: "x7HbB1NHelw", title: "برنامج ( غريب القرآن ) || الحلقة 13 - { ذات ألواح و دسر }" },
  { surah: 53, verse: 40, word: "وأنه هو أغنى وأقنى", videoId: "mtjzT85w4DM", title: "برنامج ( غريب القرآن ) || الحلقة 14 - { وأنه هو أغنى وأقنى }" },
  { surah: 76, verse: 1, word: "وإذا رأيت ثم رأيت", videoId: "lMFS_5TsB6s", title: "برنامج ( غريب القرآن ) || الحلقة 15 - { وإذا رأيت ثم رأيت }" },
  { surah: 88, verse: 1, word: "وأنتم سامدون", videoId: "gAjsRwUL20w", title: "برنامج ( غريب القرآن ) || الحلقة 16 - { وأنتم سامدون }" },
  { surah: 88, verse: 6, word: "جمالت صفر", videoId: "DkWA_kA0ilA", title: "برنامج ( غريب القرآن ) || الحلقة 17 - { جمالت صفر }" },
  { surah: 78, verse: 34, word: "دِهَاقًا", videoId: "bnNG9D3hZSo", title: "برنامج ( غريب القرآن ) || الحلقة 18 - { و كأسًا دهاقًا }" },
  { surah: 90, verse: 10, word: "و هديناه النجدين", videoId: "6AeVJtZD4YA", title: "برنامج ( غريب القرآن ) || الحلقة 19 - { و هديناه النجدين }" },
  { surah: 43, verse: 12, word: "و له الجوار المنشئات في البحر كالأعلام", videoId: "N63ZKnHdEcw", title: "برنامج ( غريب القرآن ) || الحلقة 20 - { و له الجوار المنشئات في البحر كالأعلام }" },
  { surah: 50, verse: 24, word: "و لو ألقى معاذيره", videoId: "NouQ2RZkEug", title: "برنامج ( غريب القرآن ) || الحلقة 21 - { و لو ألقى معاذيره }" },
  { surah: 75, verse: 24, word: "وجوه يومئذ باسرة", videoId: "vREEv0mjxFI", title: "برنامج ( غريب القرآن ) || الحلقة 22 - { وجوه يومئذ باسرة }" },
  { surah: 75, verse: 25, word: "تظن أن يفعل بها فاقرة", videoId: "stXuE-tlCGI", title: "برنامج ( غريب القرآن ) || الحلقة 23 - { تظن أن يفعل بها فاقرة }" },
  { surah: 75, verse: 31, word: "و أعطى قليلاً و أكدى", videoId: "HSgYkX1LgIM", title: "برنامج ( غريب القرآن ) || الحلقة 24 - { و أعطى قليلاً و أكدى }" },
  { surah: 75, verse: 32, word: "كالعهن المنفوش", videoId: "NRXfL3YIwHU", title: "برنامج ( غريب القرآن ) || الحلقة 25 - { كالعهن المنفوش }" },
  { surah: 100, verse: 1, word: "والعاديات ضبحا", videoId: "frs8zwJ_6G8", title: "برنامج ( غريب القرآن ) || الحلقة 26 - { والعاديات ضبحا }" },
  { surah: 4, verse: 3, word: "قسمة ضيزى", videoId: "zODfN7wICGQ", title: "برنامج ( غريب القرآن ) || الحلقة 27 - { قسمة ضيزى }" },
  { surah: 16, verse: 71, word: "أولي النعمة", videoId: "Ut-Zkxd6MPQ", title: "برنامج ( غريب القرآن ) || الحلقة 28 - { أولي النعمة }" },
  { surah: 75, verse: 16, word: "مهطعين", videoId: "zODfN7wICGQ", title: "برنامج ( غريب القرآن ) || الحلقة 29 - { مهطعين } ، { عزين }" },
  { surah: 12, verse: 80, word: "وشددنا أسرهم", videoId: "Ut-Zkxd6MPQ", title: "برنامج ( غريب القرآن ) || الحلقة 30 - { وشددنا أسرهم }" },
];

const surahsDir = path.join(__dirname, 'client', 'src', 'data', 'surahs');

// Process all surah files
const files = fs.readdirSync(surahsDir).filter(f => f.endsWith('.json'));

console.log(`Processing ${files.length} surah files...`);

let processedCount = 0;
let videosAdded = 0;

files.forEach(file => {
  const filePath = path.join(surahsDir, file);
  const surahNumber = parseInt(path.basename(file, '.json'));
  
  try {
    let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Ensure ayat array exists
    if (!data.ayat && data.ayahs) {
      data.ayat = data.ayahs;
    }
    
    if (!data.ayat) {
      console.warn(`⚠️  No ayat array in surah ${surahNumber}`);
      return;
    }
    
    // Process each ayah
    data.ayat.forEach(ayah => {
      // Initialize gharib if not exists
      if (!ayah.gharib) {
        ayah.gharib = {
          muyassar: {},
          siraj: {}
        };
      }
      
      // Initialize shehri_videos if not exists
      if (!ayah.shehri_videos) {
        ayah.shehri_videos = [];
      }
      
      // Find matching videos
      const matchingVideos = videoMappings.filter(
        v => v.surah === surahNumber && v.verse === ayah.number
      );
      
      // Add videos to shehri_videos
      matchingVideos.forEach(video => {
        if (!ayah.shehri_videos.some(v => v.videoId === video.videoId)) {
          ayah.shehri_videos.push({
            videoId: video.videoId,
            url: `https://www.youtube.com/watch?v=${video.videoId}`,
            title: video.title,
            word: video.word
          });
          videosAdded++;
        }
      });
    });
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    processedCount++;
    
    if (processedCount % 10 === 0) {
      console.log(`✓ Processed ${processedCount} surahs...`);
    }
  } catch (error) {
    console.error(`✗ Error processing surah ${surahNumber}:`, error.message);
  }
});

console.log(`\n✅ Complete!`);
console.log(`   - Processed: ${processedCount} surahs`);
console.log(`   - Videos added: ${videosAdded}`);
