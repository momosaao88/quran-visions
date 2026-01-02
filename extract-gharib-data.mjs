#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read surah_naba.json to extract gharib data
const nabaPath = path.join(__dirname, 'client', 'src', 'data', 'surah_naba.json');
const nabaData = JSON.parse(fs.readFileSync(nabaPath, 'utf-8'));

// Build gharib database from Surah Al-Naba
const gharibDatabase = {};

nabaData.ayat.forEach(ayah => {
  if (ayah.gharib && (ayah.gharib.muyassar || ayah.gharib.siraj)) {
    const key = `78:${ayah.number}`; // surah:verse format
    gharibDatabase[key] = ayah.gharib;
  }
});

console.log(`Extracted ${Object.keys(gharibDatabase).length} gharib entries from Surah Al-Naba`);

// Now add default gharib structure to all surahs
const surahsDir = path.join(__dirname, 'client', 'src', 'data', 'surahs');
const files = fs.readdirSync(surahsDir).filter(f => f.endsWith('.json'));

let processedCount = 0;
let gharibCount = 0;

files.forEach(file => {
  const filePath = path.join(surahsDir, file);
  const surahNumber = parseInt(path.basename(file, '.json'));
  
  if (isNaN(surahNumber)) return;
  
  try {
    let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Ensure ayat array exists
    if (!data.ayat && data.ayahs) {
      data.ayat = data.ayahs;
    }
    
    if (!data.ayat) {
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
      
      // Check if this verse has gharib data in our database
      const key = `${surahNumber}:${ayah.number}`;
      if (gharibDatabase[key]) {
        ayah.gharib = gharibDatabase[key];
        gharibCount++;
      }
    });
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    processedCount++;
    
    if (processedCount % 20 === 0) {
      console.log(`✓ Processed ${processedCount} surahs...`);
    }
  } catch (error) {
    console.error(`✗ Error processing surah ${surahNumber}:`, error.message);
  }
});

console.log(`\n✅ Complete!`);
console.log(`   - Processed: ${processedCount} surahs`);
console.log(`   - Gharib entries added: ${gharibCount}`);
console.log(`   - Source: Surah Al-Naba (78)`);
