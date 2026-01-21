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
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT_DIR, 'CODEBASE_CONTEXT.md');

// Priority patterns - files matching these are placed first in output
const PRIORITY_PATTERNS = [
  'package.json',
  '**/schema.ts',
  '**/convex.ts',
  '**/providers.tsx',
  '**/router.tsx',
  '**/__root.tsx',
];

// Directories to scan for important files
// Each entry can specify include patterns and exclude patterns
const SCAN_DIRS = [
  // Backend - all Convex code (automatically includes all subfolders)
  { dir: 'convex', include: ['*.ts'], exclude: ['_generated/**', 'tsconfig.json'] },
  // Frontend routes
  { dir: 'src/routes', include: ['*.tsx'], exclude: [] },
  // App-specific components (business logic)
  { dir: 'src/components/app', include: ['*.tsx'], exclude: [] },
  // Standalone components outside /app and /ui
  { dir: 'src/components', include: ['*.tsx'], exclude: ['app/**', 'ui/**'] },
  // Frontend utilities
  { dir: 'src/lib', include: ['*.ts', '*.tsx'], exclude: [] },
  // Scripts (for reference)
  { dir: 'scripts', include: ['*.ts'], exclude: [] },
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
  '.sample-data-cache.json',
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

// Emoji mappings for known folder patterns
const FOLDER_EMOJIS: Record<string, string> = {
  'providers': '🔌',
  'ingest': '📥',
  'ratings': '⭐',
  'enrichment': '✨',
  'merge': '🔀',
  'resolve': '🔍',
  'admin': '🔧',
  'lib': '📚',
  'ai': '🤖',
  'validation': '✅',
  'analytics': '📈',
  'notifications': '🔔',
  'cache': '💾',
  'jobs': '⏰',
  'webhooks': '🪝',
  'migrations': '🔄',
};

// Get emoji for a folder name (with fallback)
function getFolderEmoji(folderName: string): string {
  return FOLDER_EMOJIS[folderName] || '📁';
}

// Dynamically build category name for convex subfolders
function buildConvexCategoryName(folderName: string): string {
  const emoji = getFolderEmoji(folderName);
  const description = FOLDER_DESCRIPTIONS[folderName] || folderName.charAt(0).toUpperCase() + folderName.slice(1);
  return `${emoji} ${description}`;
}

// Category mappings - maps folder patterns to category names
// Order matters: more specific patterns should come first
const STATIC_CATEGORY_MAPPINGS: Array<{ pattern: string | RegExp; category: string }> = [
  // Specific file patterns
  { pattern: 'package.json', category: '📦 Dependencies' },
  { pattern: /convex\/schema\.ts$/, category: '🗄️ Database Schema' },
  { pattern: /Queries\.ts$/, category: '📊 Database Queries' },

  // Root config files
  { pattern: /^(tsconfig|vite\.config|tailwind\.config|postcss\.config|eslint\.config)/, category: '⚙️ Configuration' },

  // Catch-all for convex root files (subfolders handled dynamically)
  { pattern: /^convex\/[^/]+$/, category: '⚙️ Backend Logic' },

  // Frontend patterns
  { pattern: /^src\/routes\//, category: '🛤️ Routes & Pages' },
  { pattern: /^src\/components\/app\//, category: '🧩 App Components' },
  { pattern: /^src\/components\//, category: '🧩 Components' },
  { pattern: /^src\/lib\//, category: '🔧 Frontend Utilities' },

  // Scripts
  { pattern: /^scripts\//, category: '📜 Scripts' },
];

// Build dynamic category mappings based on discovered convex subfolders
function buildCategoryMappings(): Array<{ pattern: string | RegExp; category: string }> {
  const dynamicMappings: Array<{ pattern: string | RegExp; category: string }> = [];

  // Discover convex subfolders and create mappings for them
  const convexSubdirs = discoverSubdirs('convex');
  for (const subdir of convexSubdirs) {
    const pattern = new RegExp(`^convex/${subdir}/`);
    const category = buildConvexCategoryName(subdir);
    dynamicMappings.push({ pattern, category });
  }

  // Combine static and dynamic mappings (static first for priority)
  return [
    ...STATIC_CATEGORY_MAPPINGS.slice(0, 3), // package.json, schema.ts, Queries.ts
    ...dynamicMappings, // All convex subfolders
    ...STATIC_CATEGORY_MAPPINGS.slice(3), // Rest of static mappings
  ];
}

// Memoize category mappings (built once on first use)
let cachedCategoryMappings: Array<{ pattern: string | RegExp; category: string }> | null = null;

function getCategoryMappings(): Array<{ pattern: string | RegExp; category: string }> {
  if (!cachedCategoryMappings) {
    cachedCategoryMappings = buildCategoryMappings();
  }
  return cachedCategoryMappings;
}

function categorizeFile(relativePath: string): string {
  const normalizedPath = relativePath.replace(/\\/g, '/');
  const mappings = getCategoryMappings();

  for (const { pattern, category } of mappings) {
    if (typeof pattern === 'string') {
      if (normalizedPath === pattern || normalizedPath.endsWith(`/${pattern}`)) {
        return category;
      }
    } else if (pattern.test(normalizedPath)) {
      return category;
    }
  }

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

// Auto-discover subdirectories for dynamic tree generation
function discoverSubdirs(baseDir: string): string[] {
  const absoluteDir = path.join(ROOT_DIR, baseDir);
  if (!fs.existsSync(absoluteDir)) return [];

  const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('.'))
    .map(e => e.name)
    .sort();
}

// Category descriptions for known folder patterns
const FOLDER_DESCRIPTIONS: Record<string, string> = {
  'convex': 'Convex serverless backend',
  'providers': 'External API integrations',
  'ingest': 'Data ingestion pipelines',
  'ratings': 'Player rating computation',
  'enrichment': 'Data enrichment logic',
  'merge': 'Player merging logic',
  'resolve': 'Player resolution',
  'ai': 'AI & report generation',
  'admin': 'Admin utilities',
  'lib': 'Shared utilities',
  'src': 'React frontend',
  'routes': 'TanStack Router pages',
  'components': 'React components',
  'app': 'Business logic components',
  'ui': 'UI primitives',
  'scripts': 'Build & utility scripts',
};

function getDescription(folderName: string): string {
  return FOLDER_DESCRIPTIONS[folderName] || folderName;
}

function generateDirectoryTree(): string {
  const tree: string[] = ['```'];
  tree.push('Footbase/');

  // Convex backend
  tree.push(`├── convex/`.padEnd(30) + `# ${getDescription('convex')}`);
  const convexSubdirs = discoverSubdirs('convex');
  for (const subdir of convexSubdirs) {
    tree.push(`│   ├── ${subdir}/`.padEnd(30) + `# ${getDescription(subdir)}`);
  }

  // Frontend
  tree.push(`├── src/`.padEnd(30) + `# ${getDescription('src')}`);
  tree.push(`│   ├── routes/`.padEnd(30) + `# ${getDescription('routes')}`);
  tree.push(`│   ├── components/`.padEnd(30) + `# ${getDescription('components')}`);
  tree.push(`│   │   ├── app/`.padEnd(30) + `# ${getDescription('app')}`);
  tree.push(`│   │   └── ui/`.padEnd(30) + `# ${getDescription('ui')}`);
  tree.push(`│   └── lib/`.padEnd(30) + `# ${getDescription('lib')}`);

  // Scripts
  if (fs.existsSync(path.join(ROOT_DIR, 'scripts'))) {
    tree.push(`├── scripts/`.padEnd(30) + `# ${getDescription('scripts')}`);
  }

  tree.push('```');
  return tree.join('\n');
}

interface SampleTable {
  table: string;
  count: number;
  samples: Record<string, unknown>[];
}

interface SampleDataExport {
  exportedAt: string;
  limit: number;
  tables: SampleTable[];
}

const SAMPLE_DATA_CACHE_FILE = path.join(ROOT_DIR, '.sample-data-cache.json');

/**
 * Fetch sample data from Convex production database
 * Falls back to cached file if Convex query fails
 */
function fetchSampleData(): SampleDataExport | null {
  console.log('📊 Fetching sample data from Convex...');

  try {
    const result = execSync(
      'npx convex run admin:exportSampleData --prod',
      {
        cwd: ROOT_DIR,
        encoding: 'utf-8',
        timeout: 60000, // 60 second timeout
        stdio: ['pipe', 'pipe', 'pipe'],
      }
    );

    // Parse the JSON output
    const data = JSON.parse(result.trim()) as SampleDataExport;
    console.log(`✅ Fetched samples from ${data.tables.length} tables`);

    // Cache the result for future runs
    fs.writeFileSync(SAMPLE_DATA_CACHE_FILE, JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.warn('⚠️  Could not fetch sample data from Convex');

    // Try to load from cache
    if (fs.existsSync(SAMPLE_DATA_CACHE_FILE)) {
      console.log('📂 Loading sample data from cache...');
      try {
        const cached = JSON.parse(fs.readFileSync(SAMPLE_DATA_CACHE_FILE, 'utf-8')) as SampleDataExport;
        console.log(`✅ Loaded cached samples from ${cached.exportedAt}`);
        return cached;
      } catch {
        console.warn('   Cache file is invalid');
      }
    }

    console.warn('   To enable sample data export:');
    console.warn('   1. Fix any TypeScript errors in convex/');
    console.warn('   2. Run: npx convex deploy');
    console.warn('   3. Re-run this script');
    return null;
  }
}

/**
 * Format sample data as markdown
 */
function formatSampleDataMarkdown(data: SampleDataExport): string {
  const lines: string[] = [];

  lines.push('## Database Sample Data');
  lines.push('');
  lines.push(`> Sample records from production database (up to ${data.limit} per table)`);
  lines.push(`> Exported: ${data.exportedAt}`);
  lines.push('');

  for (const table of data.tables) {
    if (table.count === 0) continue;

    lines.push(`### \`${table.table}\` (${table.count} samples)`);
    lines.push('');
    lines.push('```json');

    // Format each sample with truncation for very long fields
    const truncatedSamples = table.samples.map(sample => {
      const truncated: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(sample)) {
        if (typeof value === 'string' && value.length > 200) {
          truncated[key] = value.substring(0, 200) + '...';
        } else if (typeof value === 'object' && value !== null) {
          const str = JSON.stringify(value);
          if (str.length > 300) {
            truncated[key] = '[Object truncated]';
          } else {
            truncated[key] = value;
          }
        } else {
          truncated[key] = value;
        }
      }
      return truncated;
    });

    lines.push(JSON.stringify(truncatedSamples.slice(0, 5), null, 2)); // Show first 5 in detail

    if (table.count > 5) {
      lines.push(`\n// ... and ${table.count - 5} more records`);
    }

    lines.push('```');
    lines.push('');
  }

  return lines.join('\n');
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

function matchesPriorityPattern(relativePath: string): boolean {
  const normalizedPath = relativePath.replace(/\\/g, '/');
  for (const pattern of PRIORITY_PATTERNS) {
    if (pattern.startsWith('**/')) {
      const suffix = pattern.slice(3);
      if (normalizedPath.endsWith(suffix) || normalizedPath.endsWith(`/${suffix}`)) {
        return true;
      }
    } else if (normalizedPath === pattern || normalizedPath.endsWith(`/${pattern}`)) {
      return true;
    }
  }
  return false;
}

function main() {
  console.log('🚀 Exporting codebase context...\n');

  // Collect all files
  const allFiles: FileEntry[] = [];

  // Scan all configured directories
  for (const { dir, include, exclude } of SCAN_DIRS) {
    const scannedFiles = scanDirectory(dir, include, exclude);
    for (const file of scannedFiles) {
      // Skip duplicates
      if (allFiles.some(f => f.relativePath === file)) continue;

      const absolutePath = path.join(ROOT_DIR, file);
      const stats = fs.statSync(absolutePath);
      allFiles.push({
        relativePath: file,
        absolutePath,
        category: categorizeFile(file),
        size: stats.size,
      });
    }
  }

  // Add root-level config files
  const rootConfigFiles = ['package.json', 'tsconfig.json', 'vite.config.ts', 'tailwind.config.ts'];
  for (const file of rootConfigFiles) {
    const absolutePath = path.join(ROOT_DIR, file);
    if (fs.existsSync(absolutePath) && !allFiles.some(f => f.relativePath === file)) {
      const stats = fs.statSync(absolutePath);
      allFiles.push({
        relativePath: file,
        absolutePath,
        category: categorizeFile(file),
        size: stats.size,
      });
    }
  }

  // Sort: priority files first, then alphabetically within categories
  const files = allFiles.sort((a, b) => {
    const aPriority = matchesPriorityPattern(a.relativePath) ? 0 : 1;
    const bPriority = matchesPriorityPattern(b.relativePath) ? 0 : 1;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.relativePath.localeCompare(b.relativePath);
  });

  // Group files by category
  const grouped = new Map<string, FileEntry[]>();
  for (const file of files) {
    const existing = grouped.get(file.category) || [];
    existing.push(file);
    grouped.set(file.category, existing);
  }

  // Build category order dynamically
  // Start with priority categories, then add discovered convex folder categories, then frontend
  const priorityCategories = [
    '⚙️ Configuration',
    '📦 Dependencies',
    '🗄️ Database Schema',
    '📊 Database Queries',
    '⚙️ Backend Logic',
  ];

  // Get all categories from convex subfolders (sorted alphabetically for consistency)
  const convexSubdirs = discoverSubdirs('convex');
  const convexCategories = convexSubdirs.map(buildConvexCategoryName).sort();

  const frontendCategories = [
    '🛤️ Routes & Pages',
    '🧩 App Components',
    '🧩 Components',
    '🔧 Frontend Utilities',
    '📜 Scripts',
    '📄 Other',
  ];

  const categoryOrder = [...priorityCategories, ...convexCategories, ...frontendCategories];

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

  // Add sample data from production database
  const sampleData = fetchSampleData();
  if (sampleData) {
    output.push(formatSampleDataMarkdown(sampleData));
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
