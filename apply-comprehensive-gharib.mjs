#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { gharibQuranDatabase } from './gharib-quran-database.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const surahsDir = path.join(__dirname, 'client', 'src', 'data', 'surahs');

console.log(`📚 Applying comprehensive Gharib Al-Quran database...`);
console.log(`   Total gharib entries: ${gharibQuranDatabase.length}`);

const files = fs.readdirSync(surahsDir).filter(f => f.endsWith('.json'));

let processedCount = 0;
let gharibEntriesAdded = 0;

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
      
      // Find matching gharib entries
      const matchingGharib = gharibQuranDatabase.filter(
        g => g.surah === surahNumber && g.verse === ayah.number
      );
      
      // Add gharib data
      matchingGharib.forEach(g => {
        // Only add if not already exists
        if (Object.keys(ayah.gharib.muyassar).length === 0 || !ayah.gharib.muyassar.word) {
          ayah.gharib.muyassar = {
            word: g.word,
            meaning: g.muyassar
          };
        }
        
        if (Object.keys(ayah.gharib.siraj).length === 0 || !ayah.gharib.siraj.word) {
          ayah.gharib.siraj = {
            word: g.word,
            meaning: g.siraj
          };
        }
        
        gharibEntriesAdded++;
      });
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
console.log(`   - Gharib entries added: ${gharibEntriesAdded}`);
console.log(`   - Database source: Comprehensive Gharib Al-Quran`);
