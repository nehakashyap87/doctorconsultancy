#!/usr/bin/env node

/**
 * Performance Testing Script for DocAppoi Mobile
 * 
 * This script helps measure and optimize the application's performance
 * by running various performance tests and generating reports.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 DocAppoi Mobile Performance Testing Script');
console.log('==============================================\n');

// Performance metrics storage
const performanceMetrics = {
  buildTime: 0,
  bundleSize: {},
  lighthouseScore: {},
  timestamp: new Date().toISOString()
};

// Function to run command and capture output
function runCommand(command, description) {
  console.log(`📊 ${description}...`);
  try {
    const startTime = Date.now();
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`✅ ${description} completed in ${duration}ms\n`);
    return { output, duration };
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return { output: '', duration: 0, error: error.message };
  }
}

// Function to analyze bundle size
function analyzeBundleSize() {
  console.log('📦 Analyzing Bundle Size...');
  
  const buildDir = path.join(__dirname, '.next');
  const staticDir = path.join(buildDir, 'static');
  
  if (!fs.existsSync(staticDir)) {
    console.log('❌ Build directory not found. Please run "npm run build" first.');
    return;
  }
  
  const chunks = fs.readdirSync(staticDir).filter(file => file.startsWith('chunks'));
  let totalSize = 0;
  
  chunks.forEach(chunk => {
    const chunkPath = path.join(staticDir, chunk);
    const stats = fs.statSync(chunkPath);
    totalSize += stats.size;
    performanceMetrics.bundleSize[chunk] = {
      size: stats.size,
      sizeKB: Math.round(stats.size / 1024),
      sizeMB: Math.round(stats.size / (1024 * 1024) * 100) / 100
    };
  });
  
  performanceMetrics.bundleSize.total = {
    size: totalSize,
    sizeKB: Math.round(totalSize / 1024),
    sizeMB: Math.round(totalSize / (1024 * 1024) * 100) / 100
  };
  
  console.log(`✅ Total bundle size: ${performanceMetrics.bundleSize.total.sizeMB}MB`);
  console.log(`📊 Number of chunks: ${chunks.length}\n`);
}

// Function to generate performance report
function generateReport() {
  const reportPath = path.join(__dirname, 'performance-report.json');
  
  const report = {
    ...performanceMetrics,
    recommendations: [
      {
        category: 'Bundle Size',
        issue: performanceMetrics.bundleSize.total?.sizeMB > 1 ? 'Bundle size is large' : 'Bundle size is optimal',
        suggestion: performanceMetrics.bundleSize.total?.sizeMB > 1 
          ? 'Consider code splitting and lazy loading' 
          : 'Bundle size is well optimized'
      },
      {
        category: 'Build Time',
        issue: performanceMetrics.buildTime > 60000 ? 'Build time is slow' : 'Build time is acceptable',
        suggestion: performanceMetrics.buildTime > 60000 
          ? 'Consider optimizing webpack configuration' 
          : 'Build time is well optimized'
      }
    ],
    nextSteps: [
      'Run "npm run build:analyze" for detailed bundle analysis',
      'Test with Google PageSpeed Insights',
      'Monitor Core Web Vitals in production',
      'Consider implementing service workers for caching'
    ]
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Performance report saved to: ${reportPath}`);
}

// Function to run Lighthouse audit (if available)
function runLighthouseAudit() {
  console.log('🔍 Running Lighthouse Audit...');
  
  try {
    // Check if lighthouse is installed
    execSync('lighthouse --version', { stdio: 'pipe' });
    
    const lighthouseCommand = 'lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"';
    const result = runCommand(lighthouseCommand, 'Lighthouse audit');
    
    if (result.output && !result.error) {
      console.log('✅ Lighthouse audit completed');
      console.log('📊 Check lighthouse-report.json for detailed results');
    }
  } catch (error) {
    console.log('⚠️  Lighthouse not installed. Install with: npm install -g lighthouse');
    console.log('📊 You can manually test with Google PageSpeed Insights\n');
  }
}

// Main execution
async function main() {
  console.log('Starting performance analysis...\n');
  
  // Step 1: Build the application
  const buildResult = runCommand('npm run build', 'Building application');
  performanceMetrics.buildTime = buildResult.duration;
  
  if (buildResult.error) {
    console.log('❌ Build failed. Please fix errors before running performance tests.');
    return;
  }
  
  // Step 2: Analyze bundle size
  analyzeBundleSize();
  
  // Step 3: Run Lighthouse audit
  runLighthouseAudit();
  
  // Step 4: Generate report
  generateReport();
  
  // Step 5: Display summary
  console.log('📈 Performance Test Summary');
  console.log('==========================');
  console.log(`Build Time: ${performanceMetrics.buildTime}ms`);
  console.log(`Bundle Size: ${performanceMetrics.bundleSize.total?.sizeMB || 'N/A'}MB`);
  console.log(`Chunks: ${Object.keys(performanceMetrics.bundleSize).length - 1}`);
  console.log('\n🎯 Next Steps:');
  console.log('1. Review the performance report');
  console.log('2. Test with Google PageSpeed Insights');
  console.log('3. Monitor Core Web Vitals in production');
  console.log('4. Consider implementing additional optimizations');
  
  console.log('\n✅ Performance testing completed!');
}

// Run the script
main().catch(console.error);
