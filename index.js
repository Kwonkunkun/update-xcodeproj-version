const asyncFs = require('fs').promises;

/**
 * @description update xcode marketing version
 * @param path project.pbxproj path
 * @param newVersion version that you want
 * @param buildVersionReset if you want to reset build version, set true
 * @returns {Promise<void>}
 * @example await updateXcodeMarketingVersion(path.join(__dirname, 'yourProjectName.xcodeproj', 'project.pbxproj'), "1.0.0");
 */
const updateXcodeMarketingVersion = async (path, newVersion, buildVersionReset) => {
  try {
    //readFile
    const file = await asyncFs.readFile(path, 'utf8');

    //replace and make newFile
    let newFile = file.replace(/MARKETING_VERSION = \d+\.\d+\.\d+;/g, () => {
      return `MARKETING_VERSION = ${newVersion};`;
    });

    //reset build version
    if (buildVersionReset) {
      newFile = newFile.replace(/CURRENT_PROJECT_VERSION\s*=\s*\d+;/g, () => {
        return `CURRENT_PROJECT_VERSION = 1;`;
      });
    }

    //writeFile
    await asyncFs.writeFile(path, newFile, 'utf8', (err) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
      console.log(`Project version updated to ${newVersion} successfully.`);
    });
  } catch (e) {
    console.error(e);
  }
};

/**
 * @description update xcode build version
 * @param path project.pbxproj path
 * @param newVersion version that you want
 * @returns {Promise<void>}
 */
const updateXcodeBuildVersion = async (path, newVersion) => {
  try {
    //readFile
    const file = await asyncFs.readFile(path, 'utf8');

    //replace and make newFile
    const regex = /CURRENT_PROJECT_VERSION\s*=\s*\d+;/g;
    const newFile = file.replace(regex, () => {
      return `CURRENT_PROJECT_VERSION = ${newVersion};`;
    });

    //writeFile
    await asyncFs.writeFile(path, newFile, 'utf8', (err) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
      console.log(`Project version updated to ${newVersion} successfully.`);
    });
  } catch (e) {
    console.error(e);
  }
};

/**
 * @description get marketing version
 * @param path
 * @returns {Promise<string>}
 */
const getMarketingVersion = async (path) => {
  try {
    //readFile
    const file = await asyncFs.readFile(path, 'utf8');

    //find version
    const regex = /MARKETING_VERSION\s*=\s*([\d.]+);/;
    let version;

    const match = regex.exec(file);
    if (match) {
      version = match[1];
    }else {
      throw new Error('Cannot find marketing version');
    }
    return version;
  } catch (e) {
    console.error(e);
  }
}

/**
 * @description get build version
 * @param path
 * @returns {Promise<string>}
 */
const getBuildVersion = async (path) => {
  try {
    //readFile
    const file = await asyncFs.readFile(path, 'utf8');

    //find version
    const regex = /CURRENT_PROJECT_VERSION\s*=\s*(\d+);/;
    let version;

    const match = regex.exec(file);
    if (match) {
      version = match[1];
    }else{
      throw new Error('Cannot find build version');
    }

    return version;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  updateXcodeMarketingVersion,
  updateXcodeBuildVersion,
  getMarketingVersion,
  getBuildVersion,
}