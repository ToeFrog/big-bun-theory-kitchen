
// This script adds the "start" script to package.json for Heroku deployment
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update start script
packageJson.scripts.start = 'node server.cjs';
  
// Write the updated package.json
fs.writeFileSync(
  packageJsonPath,
  JSON.stringify(packageJson, null, 2)
);

console.log('Updated "start" script to package.json for Heroku deployment');

// Add engines field if it doesn't exist
if (!packageJson.engines) {
  packageJson.engines = {
    node: '18.x'
  };
  
  // Write the updated package.json again
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );
  
  console.log('Added "engines" field to package.json for Heroku deployment');
}

// Check if we need to add build script
if (!packageJson.scripts.build) {
  packageJson.scripts.build = 'vite build';
  
  // Write the updated package.json
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );
  
  console.log('Added "build" script to package.json for Heroku deployment');
}

console.log('Heroku build script completed successfully');
