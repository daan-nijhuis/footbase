#!/usr/bin/env npx tsx

/**
 * Codebase Context Export Script
 *
 * Exports important files to a single markdown file for LLM context.
 * Focuses on: schema, logic, routes, configuration
 * Excludes: node_modules, generated files, UI primitives, build artifacts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT_DIR, 'CODEBASE_CONTEXT.md');

// Files to always include (relative to root)
const PRIORITY_FILES = [
  'package.json',
  'convex/schema.ts',
  'src/lib/convex.ts',
  'src/lib/providers.tsx',
  'src/router.tsx',
  'src/routes/__root.tsx',
];

// Directories to scan for important files
const SCAN_DIRS = [
  { dir: 'convex', include: ['*.ts'], exclude: ['_generated/**', 'tsconfig.json'] },
  { dir: 'src/routes', include: ['*.tsx'], exclude: [] },
  { dir: 'src/components/app', include: ['*.tsx'], exclude: [] },
  { dir: 'src/lib', include: ['*.ts', '*.tsx'], exclude: [] },
];

// Patterns to always exclude
const GLOBAL_EXCLUDES = [
  'node_modules',
  'dist',
  'dist-ssr',
  '.next',
  '.vercel',
  '.tanstack',
  '_generated',
  '*.local',
  '*.lock',
  '.DS_Store',
  '*.map',
  '*.d.ts',
  'routeTree.gen.ts',
];

// UI component files to exclude (standard primitives)
const UI_PRIMITIVES = [
  'button.tsx', 'card.tsx', 'input.tsx', 'label.tsx', 'select.tsx',
  'table.tsx', 'tabs.tsx', 'badge.tsx', 'dialog.tsx', 'dropdown-menu.tsx',
  'popover.tsx', 'tooltip.tsx', 'separator.tsx', 'skeleton.tsx',
  'scroll-area.tsx', 'sheet.tsx', 'slider.tsx', 'switch.tsx',
  'textarea.tsx', 'toast.tsx', 'toaster.tsx', 'use-toast.ts',
  'accordion.tsx', 'alert.tsx', 'avatar.tsx', 'checkbox.tsx',
  'collapsible.tsx', 'command.tsx', 'context-menu.tsx', 'hover-card.tsx',
  'menubar.tsx', 'navigation-menu.tsx', 'progress.tsx', 'radio-group.tsx',
  'resizable.tsx', 'sonner.tsx', 'toggle.tsx', 'toggle-group.tsx',
];

interface FileEntry {
  relativePath: string;
  absolutePath: string;
  category: string;
  size: number;
}

function shouldExclude(filePath: string): boolean {
  const normalizedPath = filePath.replace(/\\/g, '/');
  const fileName = path.basename(filePath);

  // Check global excludes
  for (const exclude of GLOBAL_EXCLUDES) {
    if (exclude.startsWith('*.')) {
      const ext = exclude.slice(1);
      if (normalizedPath.endsWith(ext)) return true;
    } else if (normalizedPath.includes(`/${exclude}/`) || normalizedPath.includes(`/${exclude}`)) {
      return true;
    }
  }

  // Check UI primitives
  if (normalizedPath.includes('/components/ui/') && UI_PRIMITIVES.includes(fileName)) {
    return true;
  }

  return false;
}

function matchesPattern(fileName: string, pattern: string): boolean {
  if (pattern === '*.ts') return fileName.endsWith('.ts') && !fileName.endsWith('.d.ts');
  if (pattern === '*.tsx') return fileName.endsWith('.tsx');
  if (pattern === '*.json') return fileName.endsWith('.json');
  return fileName === pattern;
}

function scanDirectory(dirPath: string, patterns: string[], excludePatterns: string[]): string[] {
  const results: string[] = [];
  const absoluteDir = path.join(ROOT_DIR, dirPath);

  if (!fs.existsSync(absoluteDir)) return results;

  function scan(currentDir: string, relativePath: string = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const entryRelPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
      const entryAbsPath = path.join(currentDir, entry.name);
      const fullRelPath = `${dirPath}/${entryRelPath}`;

      // Check exclude patterns
      const shouldSkip = excludePatterns.some(pattern => {
        if (pattern.includes('**')) {
          const prefix = pattern.replace('/**', '');
          return entryRelPath.startsWith(prefix) || entry.name === prefix;
        }
        return entry.name === pattern;
      });

      if (shouldSkip) continue;

      if (entry.isDirectory()) {
        scan(entryAbsPath, entryRelPath);
      } else if (entry.isFile()) {
        const matchesAny = patterns.some(p => matchesPattern(entry.name, p));
        if (matchesAny && !shouldExclude(fullRelPath)) {
          results.push(fullRelPath);
        }
      }
    }
  }

  scan(absoluteDir);
  return results;
}

function categorizeFile(relativePath: string): string {
  if (relativePath === 'package.json') return '📦 Dependencies';
  if (relativePath === 'convex/schema.ts') return '🗄️ Database Schema';
  if (relativePath.startsWith('convex/providers/')) return '🔌 External Providers';
  if (relativePath.startsWith('convex/ingest/')) return '📥 Data Ingestion';
  if (relativePath.startsWith('convex/ratings/')) return '⭐ Rating System';
  if (relativePath.startsWith('convex/enrichment/')) return '✨ Data Enrichment';
  if (relativePath.startsWith('convex/merge/')) return '🔀 Player Merging';
  if (relativePath.startsWith('convex/resolve/')) return '🔍 Player Resolution';
  if (relativePath.startsWith('convex/admin/')) return '🔧 Admin Utilities';
  if (relativePath.startsWith('convex/lib/')) return '📚 Backend Utilities';
  if (relativePath.startsWith('convex/') && relativePath.endsWith('Queries.ts')) return '📊 Database Queries';
  if (relativePath.startsWith('convex/')) return '⚙️ Backend Logic';
  if (relativePath.startsWith('src/routes/')) return '🛤️ Routes & Pages';
  if (relativePath.startsWith('src/components/app/')) return '🧩 App Components';
  if (relativePath.startsWith('src/lib/')) return '🔧 Frontend Utilities';
  return '📄 Other';
}

function getFileContent(absolutePath: string): string | null {
  try {
    return fs.readFileSync(absolutePath, 'utf-8');
  } catch {
    return null;
  }
}

function getLanguage(filePath: string): string {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) return 'typescript';
  if (filePath.endsWith('.json')) return 'json';
  if (filePath.endsWith('.md')) return 'markdown';
  if (filePath.endsWith('.css')) return 'css';
  return '';
}

function generateDirectoryTree(): string {
  const tree: string[] = ['```'];
  tree.push('Footbase/');

  const showDirs = [
    ['convex/', 'Convex serverless backend'],
    ['  providers/', 'External API integrations'],
    ['  ingest/', 'Data ingestion pipelines'],
    ['  ratings/', 'Player rating computation'],
    ['  enrichment/', 'Data enrichment logic'],
    ['  merge/', 'Player merging logic'],
    ['  resolve/', 'Player resolution'],
    ['src/', 'React frontend'],
    ['  routes/', 'TanStack Router pages'],
    ['  components/app/', 'Business logic components'],
    ['  lib/', 'Utilities & providers'],
  ];

  for (const [dir, desc] of showDirs) {
    tree.push(`├── ${dir.padEnd(25)} # ${desc}`);
  }

  tree.push('```');
  return tree.join('\n');
}

function handleEnvFile(): string | null {
  const envPath = path.join(ROOT_DIR, '.env');
  const envExamplePath = path.join(ROOT_DIR, '.env.example');
  const envLocalPath = path.join(ROOT_DIR, '.env.local');

  // Check if .env.example exists
  if (fs.existsSync(envExamplePath)) {
    const content = fs.readFileSync(envExamplePath, 'utf-8');
    // Only include if it doesn't contain actual values
    if (!content.includes('=sk-') && !content.includes('=api_')) {
      return content;
    }
  }

  // Generate template from .env or .env.local
  const sourceEnv = fs.existsSync(envPath) ? envPath :
                    fs.existsSync(envLocalPath) ? envLocalPath : null;

  if (sourceEnv) {
    const content = fs.readFileSync(sourceEnv, 'utf-8');
    const lines = content.split('\n');
    const template = lines.map(line => {
      if (line.startsWith('#') || line.trim() === '') return line;
      const [key] = line.split('=');
      if (key) return `${key.trim()}=<your-value>`;
      return line;
    }).join('\n');
    return template;
  }

  return null;
}

function main() {
  console.log('🚀 Exporting codebase context...\n');

  // Collect all files
  const files: FileEntry[] = [];

  // Add priority files first
  for (const file of PRIORITY_FILES) {
    const absolutePath = path.join(ROOT_DIR, file);
    if (fs.existsSync(absolutePath) && !shouldExclude(file)) {
      const stats = fs.statSync(absolutePath);
      files.push({
        relativePath: file,
        absolutePath,
        category: categorizeFile(file),
        size: stats.size,
      });
    }
  }

  // Scan directories
  for (const { dir, include, exclude } of SCAN_DIRS) {
    const scannedFiles = scanDirectory(dir, include, exclude);
    for (const file of scannedFiles) {
      // Skip if already added as priority
      if (files.some(f => f.relativePath === file)) continue;

      const absolutePath = path.join(ROOT_DIR, file);
      const stats = fs.statSync(absolutePath);
      files.push({
        relativePath: file,
        absolutePath,
        category: categorizeFile(file),
        size: stats.size,
      });
    }
  }

  // Group files by category
  const grouped = new Map<string, FileEntry[]>();
  for (const file of files) {
    const existing = grouped.get(file.category) || [];
    existing.push(file);
    grouped.set(file.category, existing);
  }

  // Sort categories in logical order
  const categoryOrder = [
    '📦 Dependencies',
    '🗄️ Database Schema',
    '📊 Database Queries',
    '⚙️ Backend Logic',
    '🔌 External Providers',
    '📥 Data Ingestion',
    '⭐ Rating System',
    '✨ Data Enrichment',
    '🔀 Player Merging',
    '🔍 Player Resolution',
    '🔧 Admin Utilities',
    '📚 Backend Utilities',
    '🛤️ Routes & Pages',
    '🧩 App Components',
    '🔧 Frontend Utilities',
    '📄 Other',
  ];

  // Generate markdown
  const output: string[] = [];
  const timestamp = new Date().toISOString();
  const totalFiles = files.length;
  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  output.push('# Footbase Codebase Context');
  output.push('');
  output.push('> Auto-generated context export for LLM understanding');
  output.push('');
  output.push('## Overview');
  output.push('');
  output.push('**Footbase** is a football player statistics platform that:');
  output.push('- Ingests data from multiple sports data providers (API-Football, Fotmob, SofaScore)');
  output.push('- Enriches player data (height, weight, preferred foot)');
  output.push('- Computes player ratings and aggregated statistics');
  output.push('- Displays data through a React web application');
  output.push('');
  output.push('## Tech Stack');
  output.push('');
  output.push('| Layer | Technology |');
  output.push('|-------|------------|');
  output.push('| Frontend | React 19 + TanStack Router + Vite |');
  output.push('| Backend | Convex (serverless DB + functions) |');
  output.push('| Styling | Tailwind CSS + Radix UI |');
  output.push('| Data Sources | API-Football, Fotmob, SofaScore, Wikidata |');
  output.push('| Deployment | Vercel |');
  output.push('');
  output.push('## Directory Structure');
  output.push('');
  output.push(generateDirectoryTree());
  output.push('');
  output.push('## Export Statistics');
  output.push('');
  output.push(`- **Generated**: ${timestamp}`);
  output.push(`- **Files exported**: ${totalFiles}`);
  output.push(`- **Total size**: ${(totalSize / 1024).toFixed(1)} KB`);
  output.push('');

  // Add env template if available
  const envTemplate = handleEnvFile();
  if (envTemplate) {
    output.push('## Environment Variables');
    output.push('');
    output.push('```env');
    output.push(envTemplate);
    output.push('```');
    output.push('');
  }

  // Add file index
  output.push('## File Index');
  output.push('');
  for (const category of categoryOrder) {
    const categoryFiles = grouped.get(category);
    if (!categoryFiles || categoryFiles.length === 0) continue;

    output.push(`### ${category}`);
    output.push('');
    for (const file of categoryFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath))) {
      output.push(`- \`${file.relativePath}\``);
    }
    output.push('');
  }

  // Add file contents
  output.push('---');
  output.push('');
  output.push('## File Contents');
  output.push('');

  for (const category of categoryOrder) {
    const categoryFiles = grouped.get(category);
    if (!categoryFiles || categoryFiles.length === 0) continue;

    output.push(`### ${category}`);
    output.push('');

    for (const file of categoryFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath))) {
      const content = getFileContent(file.absolutePath);
      if (!content) continue;

      const lang = getLanguage(file.relativePath);
      output.push(`#### \`${file.relativePath}\``);
      output.push('');
      output.push(`\`\`\`${lang}`);
      output.push(content.trim());
      output.push('```');
      output.push('');
    }
  }

  // Write output
  fs.writeFileSync(OUTPUT_FILE, output.join('\n'));

  console.log(`✅ Exported ${totalFiles} files to ${OUTPUT_FILE}`);
  console.log(`📊 Total size: ${(totalSize / 1024).toFixed(1)} KB`);
  console.log('');
  console.log('Categories:');
  for (const category of categoryOrder) {
    const count = grouped.get(category)?.length || 0;
    if (count > 0) {
      console.log(`  ${category}: ${count} files`);
    }
  }
}

main();
