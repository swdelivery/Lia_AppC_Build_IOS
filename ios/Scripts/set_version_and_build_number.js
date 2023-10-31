/* eslint-disable @typescript-eslint/no-var-requires */
const {exec} = require('child_process');

const {INFOPLIST_PATH, ENV} = process.env;

let appVersions = require('../../app.json');

if (ENV === 'staging') {
  appVersions = require('../../app.staging.json');
}
const appVersion = appVersions
  ? appVersions.ios
  : {
      version: '0.1',
      build: 10,
    };

const runCommand = (command) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(error.message);
      } else {
        resolve(stdout);
      }
    });
  });

async function run() {
  console.log('Setting version', appVersion.version);
  await runCommand(
    `/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${appVersion.version}" "${INFOPLIST_PATH}"`,
  );
  console.log('Setting build number', appVersion.build);
  await runCommand(
    `/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${appVersion.build}" "${INFOPLIST_PATH}"`,
  );
}

run();
