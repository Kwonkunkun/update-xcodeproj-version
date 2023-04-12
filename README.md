# update-xcodeproj-version

A Node.js module that helps you update your Xcode project's marketing version and build version. This module provides functions to update the marketing version, update the build version, and get the current marketing and build versions.

## Installation
```
npm install update-xcodeproj-version
```

## Usage
```bash
$ update-xcodeproj-ver --help

  Usage: update-xcodeproj-ver [options]

  Options:

    -V, --version          output the version number
    -p, --path <path>      The path to the project.pbxproj file.
    -m, --marketing <ver>  The new marketing version you want to set.
    -r, --reset            If set to true, it will reset the build version to 1.
    -h, --help             output usage information
```

```javascript
const path = require('path');
const {
  updateXcodeMarketingVersion,
  updateXcodeBuildVersion,
  getMarketingVersion,
  getBuildVersion,
} = require('update-xcodeproj-version');

const projectPath = path.join(__dirname, 'yourProjectName.xcodeproj', 'project.pbxproj');

(async () => {
  // Update marketing version
  await updateXcodeMarketingVersion(projectPath, "1.0.1", true);

  // Update build version
  await updateXcodeBuildVersion(projectPath, "5");

  // Get marketing version
  const marketingVersion = await getMarketingVersion(projectPath);
  console.log('Marketing version:', marketingVersion);

  // Get build version
  const buildVersion = await getBuildVersion(projectPath);
  console.log('Build version:', buildVersion);
})();
```

## API
### updateXcodeMarketingVersion(path, newVersion, buildVersionReset)
- path (string): The path to the project.pbxproj file.
- newVersion (string): The new marketing version you want to set.
- buildVersionReset (boolean): If set to true, it will reset the build version to 1.

Updates the marketing version of your Xcode project.

### updateXcodeBuildVersion(path, newVersion)
- path (string): The path to the project.pbxproj file.
- newVersion (string): The new build version you want to set. 

Updates the build version of your Xcode project.

### getMarketingVersion(path)
- path (string): The path to the project.pbxproj file. 

Returns a Promise that resolves to the current marketing version of your Xcode project.

### getBuildVersion(path)
- path (string): The path to the project.pbxproj file.

Returns a Promise that resolves to the current build version of your Xcode project.


## License
MIT License