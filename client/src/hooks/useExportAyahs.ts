/**
 * Hook for exporting ayahs to different formats
 * Supports PDF and Word document export
 */

import { SavedAyah } from './useSavedAyahs';

export function useExportAyahs() {
  // Export to CSV
  const exportToCSV = (ayahs: SavedAyah[], filename: string = 'ayahs.csv'): void => {
    const headers = ['السورة', 'رقم الآية', 'النص', 'الترجمة الإنجليزية', 'الترجمة الفرنسية', 'الترجمة الإسبانية'];
    const rows = ayahs.map((ayah) => [
      ayah.surahName,
      ayah.ayahNumber,
      `"${ayah.text}"`,
      `"${ayah.translations?.en || ''}"`,
      `"${ayah.translations?.fr || ''}"`,
      `"${ayah.translations?.es || ''}"`,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to JSON
  const exportToJSON = (ayahs: SavedAyah[], filename: string = 'ayahs.json'): void => {
    const data = {
      exportDate: new Date().toISOString(),
      totalAyahs: ayahs.length,
      ayahs,
    };

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to TXT
  const exportToTXT = (ayahs: SavedAyah[], filename: string = 'ayahs.txt'): void => {
    let content = 'الآيات المحفوظة من تطبيق رؤى قرآنية\n';
    content += `تاريخ التصدير: ${new Date().toLocaleDateString('ar-SA')}\n`;
    content += `عدد الآيات: ${ayahs.length}\n`;
    content += '='.repeat(80) + '\n\n';

    ayahs.forEach((ayah) => {
      content += `سورة ${ayah.surahName} - الآية ${ayah.ayahNumber}\n`;
      content += `${ayah.text}\n`;
      if (ayah.translations?.en) {
        content += `EN: ${ayah.translations.en}\n`;
      }
      if (ayah.translations?.fr) {
        content += `FR: ${ayah.translations.fr}\n`;
      }
      if (ayah.translations?.es) {
        content += `ES: ${ayah.translations.es}\n`;
      }
      content += '\n' + '-'.repeat(80) + '\n\n';
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to HTML
  const exportToHTML = (ayahs: SavedAyah[], filename: string = 'ayahs.html'): void => {
    let html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>الآيات المحفوظة</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Amiri', serif;
      background: #1a1a1a;
      color: #fff;
      padding: 20px;
      line-height: 1.8;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #2a2a2a;
      padding: 30px;
      border-radius: 10px;
    }
    h1 {
      text-align: center;
      margin-bottom: 10px;
      color: #d4af37;
      font-size: 2em;
    }
    .meta {
      text-align: center;
      color: #999;
      margin-bottom: 30px;
      font-size: 0.9em;
    }
    .ayah {
      margin-bottom: 30px;
      padding: 20px;
      background: #1a1a1a;
      border-right: 3px solid #d4af37;
      border-radius: 5px;
    }
    .ayah-header {
      color: #d4af37;
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 0.95em;
    }
    .ayah-text {
      font-size: 1.3em;
      margin-bottom: 15px;
      line-height: 2;
    }
    .translations {
      font-size: 0.9em;
      color: #ccc;
      margin-top: 10px;
    }
    .translation {
      margin: 5px 0;
    }
    .translation-label {
      color: #d4af37;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>الآيات المحفوظة</h1>
    <div class="meta">
      <p>تم التصدير بتاريخ: ${new Date().toLocaleDateString('ar-SA')}</p>
      <p>عدد الآيات: ${ayahs.length}</p>
    </div>`;

    ayahs.forEach((ayah) => {
      html += `
    <div class="ayah">
      <div class="ayah-header">سورة ${ayah.surahName} - الآية ${ayah.ayahNumber}</div>
      <div class="ayah-text">${ayah.text}</div>
      <div class="translations">`;

      if (ayah.translations?.en) {
        html += `<div class="translation"><span class="translation-label">EN:</span> ${ayah.translations.en}</div>`;
      }
      if (ayah.translations?.fr) {
        html += `<div class="translation"><span class="translation-label">FR:</span> ${ayah.translations.fr}</div>`;
      }
      if (ayah.translations?.es) {
        html += `<div class="translation"><span class="translation-label">ES:</span> ${ayah.translations.es}</div>`;
      }

      html += `
      </div>
    </div>`;
    });

    html += `
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    exportToCSV,
    exportToJSON,
    exportToTXT,
    exportToHTML,
  };
}
