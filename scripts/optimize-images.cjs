const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image optimization settings
const sizes = {
  small: 400,
  medium: 800,
  large: 1200,
};

const formats = ['webp', 'avif'];

async function optimizeImage(inputPath, outputPath, width, format) {
  try {
    const image = sharp(inputPath);

    // Resize if width is specified
    if (width) {
      image.resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }

    // Convert to format
    if (format === 'webp') {
      image.webp({ quality: 80 });
    } else if (format === 'avif') {
      image.avif({ quality: 70 });
    }

    await image.toFile(outputPath);
    console.log(
      `✓ Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`
    );
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
  }
}

async function processImage(inputPath) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath);

  // Skip if already processed
  if (inputPath.includes('/optimized/')) {
    return;
  }

  console.log(`\nProcessing: ${path.basename(inputPath)}`);

  // Generate different sizes and formats
  for (const [sizeName, width] of Object.entries(sizes)) {
    for (const format of formats) {
      const outputFilename = `${filename}-${sizeName}.${format}`;
      const outputPath = path.join(outputDir, outputFilename);

      await optimizeImage(inputPath, outputPath, width, format);
    }
  }

  // Also create original size in modern formats
  for (const format of formats) {
    const outputFilename = `${filename}.${format}`;
    const outputPath = path.join(outputDir, outputFilename);

    await optimizeImage(inputPath, outputPath, null, format);
  }
}

async function optimizeAllImages() {
  console.log('🚀 Starting image optimization...\n');

  // Process pakker images
  const pakkerDir = path.join(imageDir, 'pakker');
  const pakkerFiles = fs
    .readdirSync(pakkerDir)
    .filter((file) => /\.(png|jpg|jpeg)$/i.test(file));

  for (const file of pakkerFiles) {
    await processImage(path.join(pakkerDir, file));
  }

  // Process cases images
  const casesDir = path.join(imageDir, 'cases');
  const casesFiles = fs
    .readdirSync(casesDir)
    .filter((file) => /\.(png|jpg|jpeg)$/i.test(file));

  for (const file of casesFiles) {
    await processImage(path.join(casesDir, file));
  }

  console.log('\n✅ Image optimization complete!');
}

optimizeAllImages().catch(console.error);
