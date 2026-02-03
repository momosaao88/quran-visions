#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { gharibDatabasePart1 } from './gharib-complete-part1.mjs';

const dataDir = './client/src/data/surahs';

// تطبيق بيانات الجزء الأول على ملفات السور
let updatedCount = 0;
let ayahsUpdated = 0;

gharibDatabasePart1.forEach(entry => {
  const surahNum = entry.surah;
  const verseNum = entry.verse;
  const filePath = path.join(dataDir, `surah_${surahNum}.json`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ملف السورة ${surahNum} غير موجود`);
    return;
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // البحث عن الآية المطلوبة
    const ayahIndex = data.ayat.findIndex(a => a.number === verseNum);
    
    if (ayahIndex === -1) {
      console.log(`⚠️  الآية ${verseNum} من السورة ${surahNum} غير موجودة`);
      return;
    }

    const ayah = data.ayat[ayahIndex];
    
    // تهيئة حقل gharib إذا لم يكن موجوداً
    if (!ayah.gharib) {
      ayah.gharib = {};
    }

    // إضافة بيانات الغريب
    if (!ayah.gharib.muyassar) {
      ayah.gharib.muyassar = [];
    }
    if (!ayah.gharib.siraj) {
      ayah.gharib.siraj = [];
    }

    // إضافة الكلمة الغريبة
    const muyassarEntry = {
      word: entry.word,
      meaning: entry.muyassar
    };
    
    const sirajEntry = {
      word: entry.word,
      meaning: entry.siraj
    };

    // تجنب التكرار
    if (!ayah.gharib.muyassar.find(e => e.word === entry.word)) {
      ayah.gharib.muyassar.push(muyassarEntry);
    }
    
    if (!ayah.gharib.siraj.find(e => e.word === entry.word)) {
      ayah.gharib.siraj.push(sirajEntry);
    }

    // حفظ الملف
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    ayahsUpdated++;
  } catch (error) {
    console.error(`❌ خطأ في معالجة السورة ${surahNum}:`, error.message);
  }
});

updatedCount = gharibDatabasePart1.length;

console.log(`\n✅ تم تطبيق الجزء الأول من قاعدة البيانات:`);
console.log(`   - عدد الكلمات الغريبة: ${updatedCount}`);
console.log(`   - عدد الآيات المحدثة: ${ayahsUpdated}`);
console.log(`   - السور المغطاة: 1-20 (الفاتحة إلى طه)`);
