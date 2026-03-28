import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('public/images');
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return [fullPath];
    })
  );
  return files.flat();
};

const formatKb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

const optimizeImage = async (inputPath) => {
  const ext = path.extname(inputPath).toLowerCase();
  if (!EXTENSIONS.has(ext)) return null;

  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const inputStats = await fs.stat(inputPath);

  let pipeline = sharp(inputPath, { failOn: 'none' }).rotate();
  if (ext === '.png') {
    pipeline = pipeline.webp({ lossless: true, effort: 6 });
  } else {
    pipeline = pipeline.webp({ quality: 86, effort: 6, smartSubsample: true });
  }

  await pipeline.toFile(outputPath);
  const outputStats = await fs.stat(outputPath);

  return {
    file: path.relative(IMAGES_DIR, inputPath),
    before: inputStats.size,
    after: outputStats.size,
    savings: inputStats.size - outputStats.size,
  };
};

const main = async () => {
  const allFiles = await walk(IMAGES_DIR);
  const candidates = allFiles.filter((file) => EXTENSIONS.has(path.extname(file).toLowerCase()));
  const results = [];

  for (const file of candidates) {
    const result = await optimizeImage(file);
    if (result) results.push(result);
  }

  const totalBefore = results.reduce((sum, item) => sum + item.before, 0);
  const totalAfter = results.reduce((sum, item) => sum + item.after, 0);
  const totalSavings = totalBefore - totalAfter;
  const savingsPct = totalBefore > 0 ? ((totalSavings / totalBefore) * 100).toFixed(1) : '0.0';

  console.log(`Optimized ${results.length} images`);
  console.log(`Total: ${formatKb(totalBefore)} -> ${formatKb(totalAfter)} (${savingsPct}% smaller)`);
  for (const item of results.sort((a, b) => b.savings - a.savings)) {
    console.log(`${item.file}: ${formatKb(item.before)} -> ${formatKb(item.after)}`);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
