
// This script adds the "start" script to package.json for Heroku deployment
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

// Add start script if it doesn't exist
if (!packageJson.scripts.start) {
  packageJson.scripts.start = 'node server.js';
  
  // Write the updated package.json
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );
  
  console.log('Added "start" script to package.json for Heroku deployment');
}

// Add engines field if it doesn't exist
if (!packageJson.engines) {
  packageJson.engines = {
    node: '18.x'
  };
  
  // Write the updated package.json
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );
  
  console.log('Added "engines" field to package.json for Heroku deployment');
}
