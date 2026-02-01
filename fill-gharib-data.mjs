#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import comprehensive gharib database
const gharibDatabasePath = path.join(__dirname, 'client/src/data/comprehensive-gharib-database.ts');
const gharibContent = fs.readFileSync(gharibDatabasePath, 'utf-8');

// Extract gharib data from the database file
// The format is: export const gharibDatabase = { surahNumber: { ayahNumber: { word, muyassar, siraj } } }
const gharibMatch = gharibContent.match(/export const gharibDatabase = ({[\s\S]*?});/);
if (!gharibMatch) {
  console.error('Could not find gharib database in file');
  process.exit(1);
}

// Parse the database
let gharibDatabase;
try {
  // Evaluate the database object
  const dbString = gharibMatch[1];
  gharibDatabase = eval(`(${dbString})`);
} catch (e) {
  console.error('Error parsing gharib database:', e);
  process.exit(1);
}

console.log('Gharib database loaded successfully');
console.log('Surahs with gharib data:', Object.keys(gharibDatabase).length);

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
    
    // Check if this surah has gharib data
    if (gharibDatabase[surahNumber]) {
      const surahGharib = gharibDatabase[surahNumber];
      
      // Update each ayah with gharib data
      ayahs.forEach(ayah => {
        const ayahNumber = ayah.number;
        if (surahGharib[ayahNumber]) {
          const gharibEntry = surahGharib[ayahNumber];
          ayah.gharib = {
            muyassar: gharibEntry.muyassar ? { 
              word: gharibEntry.word, 
              meaning: gharibEntry.muyassar 
            } : {},
            siraj: gharibEntry.siraj ? { 
              word: gharibEntry.word, 
              meaning: gharibEntry.siraj 
            } : {}
          };
          ayahsWithGharib++;
        }
      });
      
      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(surahData, null, 2));
      updatedCount++;
      console.log(`✓ Updated surah ${surahNumber} (${file})`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log(`\n✅ Completed!`);
console.log(`- Updated ${updatedCount} surah files`);
console.log(`- Added gharib data to ${ayahsWithGharib} ayahs`);
