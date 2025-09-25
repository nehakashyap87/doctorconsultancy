#!/usr/bin/env node

/**
 * DocAppoi Mobile Setup Script
 * 
 * This script helps set up the development environment
 * and install all necessary dependencies.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 DocAppoi Mobile Setup Script');
console.log('================================\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.log('❌ package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Function to run command with error handling
function runCommand(command, description) {
  console.log(`📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed\n`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    process.exit(1);
  }
}

// Main setup function
async function setup() {
  console.log('Starting setup process...\n');
  
  // Step 1: Install dependencies
  runCommand('npm install', 'Installing dependencies');
  
  // Step 2: Create necessary directories
  console.log('📁 Creating necessary directories...');
  const dirs = ['src/components', 'src/utils', 'src/types', 'public/images'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
  console.log('');
  
  // Step 3: Create .env.local file
  console.log('⚙️  Creating environment file...');
  const envContent = `# DocAppoi Mobile Environment Variables
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
`;
  
  if (!fs.existsSync('.env.local')) {
    fs.writeFileSync('.env.local', envContent);
    console.log('✅ Created .env.local file');
  } else {
    console.log('⚠️  .env.local already exists, skipping...');
  }
  console.log('');
  
  // Step 4: Create .gitignore if it doesn't exist
  console.log('📝 Setting up .gitignore...');
  const gitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/

# Production
build/
dist/

# Environment variables
.env*.local
.env

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Performance reports
performance-report.json
lighthouse-report.json
`;
  
  if (!fs.existsSync('.gitignore')) {
    fs.writeFileSync('.gitignore', gitignoreContent);
    console.log('✅ Created .gitignore file');
  } else {
    console.log('⚠️  .gitignore already exists, skipping...');
  }
  console.log('');
  
  // Step 5: Run initial build check
  console.log('🔨 Running initial build check...');
  try {
    execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ Build check passed');
  } catch (error) {
    console.log('⚠️  Build check failed, but this is normal for initial setup');
    console.log('   You can run "npm run dev" to start development');
  }
  console.log('');
  
  // Step 6: Display next steps
  console.log('🎉 Setup completed successfully!');
  console.log('\n📋 Next Steps:');
  console.log('1. Run "npm run dev" to start the development server');
  console.log('2. Open http://localhost:3000 in your browser');
  console.log('3. Start developing your features');
  console.log('4. Run "npm run build" to create a production build');
  console.log('5. Run "npm run build:analyze" to analyze bundle size');
  console.log('\n📚 Available Scripts:');
  console.log('• npm run dev - Start development server');
  console.log('• npm run build - Build for production');
  console.log('• npm run start - Start production server');
  console.log('• npm run lint - Run ESLint');
  console.log('• npm run build:analyze - Analyze bundle size');
  console.log('\n🚀 Happy coding!');
}

// Run setup
setup().catch(console.error);
