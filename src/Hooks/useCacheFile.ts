import { FileAvatar } from "@typings/common";
import { useCallback, useEffect, useMemo, useState } from "react";
import RNFS from "react-native-fs";
import { getImageAvataUrl } from "src/utils/avatar";
import FileViewer from "react-native-file-viewer";

export default function useCacheFile(file: FileAvatar) {
  const [isLoading, setLoading] = useState(false);
  const [isExist, setExist] = useState(false);

  const localPath = useMemo(() => {
    if (!file) {
      return "";
    }
    return `${RNFS.DocumentDirectoryPath}/${file.originalName}`;
  }, [file]);

  useEffect(() => {
    if (!localPath) {
      return;
    }
    RNFS.exists(localPath).then(setExist);
  }, [localPath]);

  const openFile = useCallback(async () => {
    if (isExist) {
      FileViewer.open(localPath);
      return;
    }

    setLoading(true);
    RNFS.downloadFile({
      fromUrl: getImageAvataUrl(file),
      toFile: localPath,
    })
      .promise.then(() => FileViewer.open(localPath))
      .then(() => {
        // success
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // error
      });
  }, [isExist, localPath, file]);

  return {
    isExist,
    isLoading,
    openFile,
  };
}
