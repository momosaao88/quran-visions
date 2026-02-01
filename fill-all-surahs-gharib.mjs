#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gharibDatabase from './comprehensive-gharib-all-surahs.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const surahsDir = path.join(__dirname, 'client/src/data/surahs');

// Group gharib entries by surah and verse
const gharibByVerse = {};
gharibDatabase.forEach(entry => {
  const key = `${entry.surah}-${entry.verse}`;
  if (!gharibByVerse[key]) {
    gharibByVerse[key] = [];
  }
  gharibByVerse[key].push(entry);
});

let totalUpdated = 0;
let totalAyahs = 0;

// Process each surah file
try {
  const files = fs.readdirSync(surahsDir).filter(f => f.endsWith('.json'));
  
  files.forEach(file => {
    const filePath = path.join(surahsDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    const surahNum = parseInt(file.replace('.json', ''));
    let updated = 0;
    
    // Update each ayah
    if (data.ayat && Array.isArray(data.ayat)) {
      data.ayat.forEach(ayah => {
        const key = `${surahNum}-${ayah.number}`;
        const gharibEntries = gharibByVerse[key];
        
        if (gharibEntries && gharibEntries.length > 0) {
          // Initialize gharib if not exists
          if (!ayah.gharib) {
            ayah.gharib = {};
          }
          
          // Get first entry (usually one word per verse)
          const entry = gharibEntries[0];
          
          ayah.gharib.muyassar = {
            word: entry.word,
            meaning: entry.muyassar
          };
          
          ayah.gharib.siraj = {
            word: entry.word,
            meaning: entry.siraj
          };
          
          updated++;
          totalAyahs++;
        }
      });
    }
    
    if (updated > 0) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✓ Surah ${surahNum}: ${updated} ayahs updated`);
      totalUpdated++;
    }
  });
  
  console.log(`\n✅ Done! Updated ${totalUpdated} surah files, ${totalAyahs} ayahs with gharib data`);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
