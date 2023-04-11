const {
  getBuildVersion,
  getMarketingVersion,
  updateXcodeBuildVersion,
  updateXcodeMarketingVersion,
} = require('../index');
const path = require('path');
const filePath = path.join(__dirname, 'yourProject.xcodeproj', 'project.pbxproj');

//TODO: need test before and after
describe('updateXcodeBuildVersion', () => {
  beforeEach(async () => {
    await updateXcodeBuildVersion(filePath, "1");
  });

  it('should update the build version', async () => {
    const newVersion = '3';
    await updateXcodeBuildVersion(filePath, newVersion);
    const version = await getBuildVersion(filePath);
    expect(version).toBe(newVersion);
  });
});

describe('updateXcodeMarketingVersion', () => {
  beforeEach(async () => {
    await updateXcodeMarketingVersion(filePath, "1.0.0");
  });

  it('should update the marketing version', async () => {
    const newVersion = '3.0.0';
    await updateXcodeMarketingVersion(filePath, newVersion);
    const version = await getMarketingVersion(filePath);
    expect(version).toBe(newVersion);
  });

  it('should reset the build version', async () => {
    const newVersion = '3.0.0';
    await updateXcodeMarketingVersion(filePath, newVersion, true);
    const version = await getBuildVersion(filePath);
    expect(version).toBe('1');
  });
});