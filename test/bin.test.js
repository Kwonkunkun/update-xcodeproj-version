const { exec } = require('child_process');
const { getMarketingVersion } = require('../index.js');
const path = require('path');
const filePath = path.join(__dirname, 'yourProject.xcodeproj', 'project.pbxproj');

console.log(filePath);

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
    await execPromise(`update-xcodeproj-ver -p ${filePath} -m 1.0.0`);
  });

  it('should update the build version', async () => {
    await execPromise(`update-xcodeproj-ver -p ${filePath} -m 1.0.2`);
    const version = await getMarketingVersion(filePath);
    expect(version).toBe('1.0.2');
  });
});
