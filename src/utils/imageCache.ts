import { CacheManager } from "@georstat/react-native-image-cache";
import { Dirs } from "react-native-file-access";

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 0,
  maxRetries: 3 /* optional, if not provided defaults to 0 */,
  retryDelay: 3000 /* in milliseconds, optional, if not provided defaults to 0 */,
  sourceAnimationDuration: 500,
  thumbnailAnimationDuration: 500,
};
