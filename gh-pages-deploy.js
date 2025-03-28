
/**
 * This is a simple script to modify the required build settings for GitHub Pages
 * Run this before deploying to GitHub Pages with:
 * node gh-pages-deploy.js && npm run build
 */

const fs = require('fs');
const path = require('path');

console.log('Preparing project for GitHub Pages deployment...');

// Set the GITHUB_PAGES environment variable for the build process
process.env.GITHUB_PAGES = 'true';

console.log('GitHub Pages environment variable set');
console.log('You can now run: npm run build');
console.log('After building, deploy the "dist" folder to GitHub Pages');
