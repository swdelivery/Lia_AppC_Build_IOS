import Column from "@Components/Column";
import Fade from "@Components/Fade";
import IconButton from "@Components/IconButton";
import { BLACK_OPACITY_4 } from "@Constant/Color";
import { _height, _moderateScale, _width } from "@Constant/Scale";
import { ConfigFileCode } from "@typings/configFile";
import { head, isEmpty } from "lodash";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Image, StyleSheet } from "react-native";
import useConfigFile from "src/Hooks/useConfigFile";
import { CloseIcon } from "src/SGV";
import { getImageAvataUrl } from "src/utils/avatar";
import storage from "src/utils/storage";

export type AdsContextType = {
  checkShowAds: () => void;
};

export const AdsContext = createContext<AdsContextType>(
  // @ts-ignore
  {}
);

export function useAdsContext() {
  const ctx = useContext(AdsContext);
  if (!ctx) {
    throw new Error("useAdsContext must be used within a AdsContextProvider");
  }
  return ctx;
}

function AdsPopup({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const imageAds = useConfigFile(ConfigFileCode.ImageAds);

  const ratioImage = useMemo(() => {
    if (!isEmpty(imageAds)) {
      let image = head(imageAds.fileArr);
      return image?.dimensions?.width / image?.dimensions?.height
    } else {
      return 0;
    }
  }, [imageAds])

  if (!imageAds) {
    return null;
  }

  return (
    <Fade visible={visible} style={styles.container}>
      <Column padding={0}>
        {/* <Image auto avatar={head(imageAds.fileArr)} style={styles.image} /> */}
        <Image
          style={{
            width: _width - _moderateScale(16) * 4,
            height: (_width - _moderateScale(16) * 4) / ratioImage,
            resizeMode: 'contain'
          }}
          source={{ uri: getImageAvataUrl(head(imageAds.fileArr)) }} />
        <IconButton containerStyle={styles.iconClose} onPress={onClose}>
          <CloseIcon width={34} height={34} />
        </IconButton>
      </Column>
    </Fade>
  );
}

export default function AdsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(true);

  const handleClose = useCallback(() => {
    setVisible(false);
    storage.setString("lastShowAdsPopup", new Date().toISOString());
  }, []);

  const checkShowAds = useCallback(() => {
    const lastShowAdsPopup = storage.getString("lastShowAdsPopup");

    if (
      lastShowAdsPopup &&
      new Date().getTime() - new Date(lastShowAdsPopup).getTime() >
      5 * 60 * 1000 // 5 minutes
    ) {
      setVisible(true);
      return;
    }
  }, []);

  const context = useMemo(
    () => ({
      checkShowAds,
    }),
    [checkShowAds]
  );

  return (
    <AdsContext.Provider value={context}>
      {children}
      <AdsPopup visible={visible} onClose={handleClose} />
    </AdsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BLACK_OPACITY_4,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: (_width * 2) / 3,
    maxWidth: 500,
    maxHeight: (_height * 2) / 3,
    borderRadius: 25,
  },
  iconClose: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});
