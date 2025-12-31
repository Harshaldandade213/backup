/**
 * Migration script to move files to proper /src structure
 * Run with: node migrate-to-src.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to move to /src
const directoriesToMove = ['components', 'context', 'data', 'types', 'styles'];

// Files to delete
const filesToDelete = ['Attributions.md', 'App.tsx'];

// Directories to delete
const directoriesToDelete = ['guidelines'];

console.log('🚀 Starting migration to /src structure...\n');

// Create src directory if it doesn't exist
const srcDir = path.join(__dirname, 'src');
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
  console.log('✅ Created /src directory');
}

// Function to copy directory recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Source directory not found: ${src}`);
    return;
  }

  // Create destination directory
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read directory contents
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Function to delete directory recursively
function deleteDirectory(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      deleteDirectory(fullPath);
    } else {
      fs.unlinkSync(fullPath);
    }
  }

  fs.rmdirSync(dir);
}

// Move directories to /src
console.log('📁 Moving directories to /src...');
directoriesToMove.forEach(dir => {
  const srcPath = path.join(__dirname, dir);
  const destPath = path.join(srcDir, dir);

  if (fs.existsSync(srcPath)) {
    console.log(`  - Moving ${dir}/ to src/${dir}/`);
    copyDirectory(srcPath, destPath);
    deleteDirectory(srcPath);
    console.log(`    ✅ Moved ${dir}/`);
  } else {
    console.log(`    ⚠️  ${dir}/ not found, skipping`);
  }
});

// Delete unnecessary files
console.log('\n🗑️  Removing unnecessary files...');
filesToDelete.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`  ✅ Deleted ${file}`);
  }
});

// Delete unnecessary directories
directoriesToDelete.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    deleteDirectory(dirPath);
    console.log(`  ✅ Deleted ${dir}/`);
  }
});

console.log('\n✨ Migration complete!');
console.log('\n📋 Next steps:');
console.log('  1. Run: npm install');
console.log('  2. Run: npm run dev');
console.log('  3. Delete this migration script: migrate-to-src.js\n');
