const { exec } = require('child_process');
const { getMarketingVersion } = require('../index.js');
const path = require('path');
const filePath = path.join(__dirname, 'yourProject.xcodeproj/project.pbxproj');

const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

describe('updateXcodeBuildVersion', () => {
  beforeEach(async () => {
    await execPromise(`node ${path.join(__dirname, '../bin/update-xcodeproj-version.js')} ${filePath} 1.0.2`);
  });

  afterEach(async () => {
    await execPromise(`node ${path.join(__dirname, '../bin/update-xcodeproj-version.js')} ${filePath} 1.0.0`);
  });

  it('should update the build version', async () => {
    const version = await getMarketingVersion(filePath);
    expect(version).toBe('1.0.2');
  });
});
