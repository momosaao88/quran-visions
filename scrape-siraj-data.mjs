#!/usr/bin/env node

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Surah list with their numbers
const surahs = [
  { num: 1, name: 'الفاتحة' },
  { num: 2, name: 'البقرة' },
  { num: 3, name: 'آل عمران' },
  { num: 4, name: 'النساء' },
  { num: 5, name: 'المائدة' },
  { num: 6, name: 'الأنعام' },
  { num: 7, name: 'الأعراف' },
  { num: 8, name: 'الأنفال' },
  { num: 9, name: 'التوبة' },
  { num: 10, name: 'يونس' },
  // ... (add all 114 surahs)
];

// Function to fetch and parse a surah
async function fetchSurahGharib(surahNum) {
  try {
    const url = `https://read.tafsir.one/alsiraaj/${surahNum}`;
    console.log(`Fetching surah ${surahNum}...`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch surah ${surahNum}: ${response.status}`);
      return null;
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract gharib entries
    const gharibEntries = [];
    
    // Parse the content based on the structure of read.tafsir.one
    // This is a simplified example - actual structure may vary
    $('p').each((index, element) => {
      const text = $(element).text().trim();
      if (text && text.includes('﴿')) {
        // Extract word and meaning
        const match = text.match(/﴿([^﴾]+)﴾:\s*(.+)/);
        if (match) {
          gharibEntries.push({
            word: match[1],
            meaning: match[2]
          });
        }
      }
    });
    
    return {
      surahNum,
      entries: gharibEntries
    };
  } catch (error) {
    console.error(`Error fetching surah ${surahNum}:`, error.message);
    return null;
  }
}

// Main function
async function main() {
  console.log('Starting to scrape Siraj data from read.tafsir.one...\n');
  
  const allData = [];
  
  // Fetch data for each surah (limit to first 5 for testing)
  for (let i = 1; i <= 5; i++) {
    const data = await fetchSurahGharib(i);
    if (data) {
      allData.push(data);
      console.log(`✓ Surah ${i}: ${data.entries.length} entries`);
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Save to file
  const outputPath = path.join(__dirname, 'scraped-siraj-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2));
  
  console.log(`\n✅ Scraped data saved to ${outputPath}`);
  console.log(`Total surahs processed: ${allData.length}`);
}

main().catch(console.error);
