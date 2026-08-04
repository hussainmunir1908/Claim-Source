import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

async function optimizeImages() {
  const files = fs.readdirSync(publicDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`Found ${imageFiles.length} images to optimize.`);

  for (const file of imageFiles) {
    const filePath = path.join(publicDir, file);
    const tempPath = path.join(publicDir, `temp-${file}`);
    const stat = fs.statSync(filePath);
    
    // Only optimize if larger than 500KB
    if (stat.size > 500 * 1024) {
      console.log(`Optimizing ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)...`);
      try {
        await sharp(filePath)
          .resize({ width: 1920, withoutEnlargement: true }) // Max width 1920px
          .jpeg({ quality: 80, force: false })
          .png({ quality: 80, force: false })
          .toFile(tempPath);
        
        fs.renameSync(tempPath, filePath);
        console.log(`  -> Done.`);
      } catch (err) {
        console.error(`  -> Failed to optimize ${file}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    } else {
      console.log(`Skipping ${file} (${(stat.size / 1024).toFixed(2)} KB) - already small.`);
    }
  }
}

optimizeImages().catch(console.error);
