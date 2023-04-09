#!/usr/bin/env node
const {
  updateXcodeMarketingVersion,
} = require('../index.js');

// get args (path, version, resetBuildVersion)
const args = process.argv.slice(2);
const projectPath = args[0];
const version = args[1];
const resetBuildVersion = args[2] === 'true';

// run
(async () => {
  try {
    console.log('Updating Xcode project version...');
    await updateXcodeMarketingVersion(projectPath, version, resetBuildVersion);
    console.log('Updated marketing version to ' + version);
  } catch (e) {
    console.error(e);
  }
})();

