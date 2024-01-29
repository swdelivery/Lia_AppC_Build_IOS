import { Platform } from "react-native";
import Config from "react-native-config";

let appVersions;
if (Config.ENV === "prod") {
  appVersions = require("../../app.json");
} else {
  appVersions = require("../../app.staging.json");
}

console.log({ appVersions });

function refineVersion(version: string) {
  return `${version}00`.substr(0, 3);
}

/**
 * Check app version for remote and local
 *
 * @export
 * @param {string} remote Latest app version that was published
 * @param {string} local App version from app.json file
 * @returns @true if app need to be upgraded (remote version greater than local), @false otherwise
 */
export function isVersionUpdate(remote: string, local: string) {
  const remoteVersion = refineVersion(remote.replace(/\./g, ""));
  const currentVersion = refineVersion(local.replace(/\./g, ""));
  // eslint-disable-next-line radix
  return parseInt(remoteVersion) > parseInt(currentVersion);
}

export function getAppVersion(): { version: string; build: number } {
  // @ts-ignore
  const version = appVersions;
  if (!version) {
    console.error("app.json: No version found");
    return { version: "0.0.0", build: 0 };
  }
  return version[Platform.OS];
}
