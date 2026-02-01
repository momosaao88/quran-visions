#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the comprehensive gharib database file
const gharibDatabasePath = path.join(__dirname, 'client/src/data/comprehensive-gharib-database.ts');
const gharibContent = fs.readFileSync(gharibDatabasePath, 'utf-8');

// Extract the array content between [ and ]
const arrayMatch = gharibContent.match(/export const comprehensiveGharibDatabase = \[([\s\S]*?)\];/);
if (!arrayMatch) {
  console.error('Could not find gharib database array in file');
  process.exit(1);
}

// Parse the array
let gharibDatabase;
try {
  // Create a temporary module to evaluate the array
  const arrayContent = '[' + arrayMatch[1] + ']';
  gharibDatabase = eval(arrayContent);
} catch (e) {
  console.error('Error parsing gharib database:', e.message);
  process.exit(1);
}

console.log(`✓ Gharib database loaded: ${gharibDatabase.length} entries`);

// Organize gharib data by surah and verse
const gharibByVerse = {};
gharibDatabase.forEach(entry => {
  const key = `${entry.surah}_${entry.verse}`;
  if (!gharibByVerse[key]) {
    gharibByVerse[key] = [];
  }
  gharibByVerse[key].push(entry);
});

console.log(`✓ Organized into ${Object.keys(gharibByVerse).length} verses`);

// Process all surah files
const surahsDir = path.join(__dirname, 'client/src/data/surahs');
const files = fs.readdirSync(surahsDir).filter(f => f.endsWith('.json'));

let updatedCount = 0;
let ayahsWithGharib = 0;

files.forEach(file => {
  const filePath = path.join(surahsDir, file);
  const surahNumber = parseInt(file.replace('.json', ''));
  
  try {
    const surahData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const ayahs = surahData.ayat || surahData.ayahs || [];
    
    let surahUpdated = false;
    
    // Update each ayah with gharib data
    ayahs.forEach(ayah => {
      const ayahNumber = ayah.number;
      const key = `${surahNumber}_${ayahNumber}`;
      
      if (gharibByVerse[key] && gharibByVerse[key].length > 0) {
        const entries = gharibByVerse[key];
        
        // Initialize gharib object
        if (!ayah.gharib) {
          ayah.gharib = { muyassar: {}, siraj: {} };
        }
        
        // Add the first entry (or combine if multiple)
        const entry = entries[0];
        
        if (entry.muyassar) {
          ayah.gharib.muyassar = {
            word: entry.word,
            meaning: entry.muyassar
          };
        }
        
        if (entry.siraj) {
          ayah.gharib.siraj = {
            word: entry.word,
            meaning: entry.siraj
          };
        }
        
        ayahsWithGharib++;
        surahUpdated = true;
      }
    });
    
    if (surahUpdated) {
      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(surahData, null, 2));
      updatedCount++;
      console.log(`✓ Surah ${surahNumber.toString().padStart(3, ' ')} - ${ayahs.filter(a => a.gharib && (a.gharib.muyassar.word || a.gharib.siraj.word)).length} verses with gharib`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log(`\n✅ Completed!`);
console.log(`   - Updated ${updatedCount} surah files`);
console.log(`   - Added gharib data to ${ayahsWithGharib} ayahs`);
