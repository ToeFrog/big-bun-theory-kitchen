
// This script adds the "start" script to package.json for Heroku deployment
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');
let packageJson;

try {
  // Read the package.json file
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  packageJson = JSON.parse(packageJsonContent);
  
  // Make sure scripts object exists
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
  
  // Add or update the start script
  packageJson.scripts.start = 'node server.cjs';
  console.log('Updated "start" script to package.json for Heroku deployment');
  
  // Add engines field if it doesn't exist
  if (!packageJson.engines) {
    packageJson.engines = {
      node: '18.x'
    };
    console.log('Added "engines" field to package.json for Heroku deployment');
  }
  
  // Make sure build script exists
  if (!packageJson.scripts.build) {
    packageJson.scripts.build = 'vite build';
    console.log('Added "build" script to package.json for Heroku deployment');
  }
  
  // Write the updated package.json
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );
  
  console.log('Successfully updated package.json for Heroku deployment');
} catch (error) {
  console.error('Error updating package.json:', error);
  process.exit(1);
}
