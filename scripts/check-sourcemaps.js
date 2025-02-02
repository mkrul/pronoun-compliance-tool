const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../build/static/js');

try {
  const files = fs.readdirSync(buildDir);
  const hasSourceMap = files.some(file => file.endsWith('.map'));

  if (!hasSourceMap) {
    console.error('Warning: No source map files found in build. This will make debugging production issues difficult.');
    process.exit(1);
  }

  console.log('Source maps verified successfully.');
} catch (error) {
  console.error('Error checking for source maps:', error);
  process.exit(1);
}