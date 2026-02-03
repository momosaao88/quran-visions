#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { gharibDatabasePart1 } from './gharib-complete-part1.mjs';

const dataDir = './client/src/data/surahs';

// تطبيق بيانات الجزء الأول على ملفات السور
let updatedCount = 0;
let ayahsUpdated = 0;
const processedSurahs = new Set();

gharibDatabasePart1.forEach(entry => {
  const surahNum = entry.surah;
  const verseNum = entry.verse;
  const filePath = path.join(dataDir, `${surahNum}.json`);

  if (!fs.existsSync(filePath)) {
    return;
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // البحث عن الآية المطلوبة
    const ayahIndex = data.ayat.findIndex(a => a.number === verseNum);
    
    if (ayahIndex === -1) {
      return;
    }

    const ayah = data.ayat[ayahIndex];
    
    // تهيئة حقل gharib إذا لم يكن موجوداً
    if (!ayah.gharib) {
      ayah.gharib = {
        muyassar: {},
        siraj: {}
      };
    }

    // إذا كانت البيانات موجودة بالفعل، لا نستبدلها
    if (!ayah.gharib.muyassar || Object.keys(ayah.gharib.muyassar).length === 0) {
      ayah.gharib.muyassar = {
        word: entry.word,
        meaning: entry.muyassar
      };
    }
    
    if (!ayah.gharib.siraj || Object.keys(ayah.gharib.siraj).length === 0) {
      ayah.gharib.siraj = {
        word: entry.word,
        meaning: entry.siraj
      };
    }

    // حفظ الملف
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    ayahsUpdated++;
    processedSurahs.add(surahNum);
  } catch (error) {
    console.error(`❌ خطأ في معالجة السورة ${surahNum}:`, error.message);
  }
});

updatedCount = gharibDatabasePart1.length;

console.log(`\n✅ تم تطبيق الجزء الأول من قاعدة البيانات:`);
console.log(`   - عدد الكلمات الغريبة: ${updatedCount}`);
console.log(`   - عدد الآيات المحدثة: ${ayahsUpdated}`);
console.log(`   - السور المحدثة: ${Array.from(processedSurahs).sort((a, b) => a - b).join(', ')}`);
