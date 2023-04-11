#!/usr/bin/env node
const { program } = require('commander');
const {
  updateXcodeMarketingVersion,
  getPackageVersion
} = require('../index.js');

program
  .version(getPackageVersion())
  .requiredOption('-p, --path <path>', 'The path to the project.pbxproj file.')
  .requiredOption('-m, --marketing <ver>', 'The new marketing version you want to set.')
  .option('-r, --reset', 'If set to true, it will reset the build version to 1.')
  .parse(process.argv);

const options = program.opts();

// run
(async () => {
  try {
    console.log("Want to update the Xcode project at " + options.path);
    console.log("Want to update the marketing version to " + options.marketing);
    console.log("Want to reset the build version to 1? " + !!options.reset);
    console.log('Updating Xcode project version...');
    await updateXcodeMarketingVersion(options.path, options.marketing, !!(options.reset));
    console.log('Updated marketing version to ' + options.marketing);
  } catch (e) {
    console.error(e);
  }
})();

