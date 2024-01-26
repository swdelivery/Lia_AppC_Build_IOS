import Column from "@Components/Column";
import Fade from "@Components/Fade";
import Icon from "@Components/Icon";
import IconButton from "@Components/IconButton";
import Image from "@Components/Image";
import withPortal from "@Components/withPortal";
import { BLACK_OPACITY_4 } from "@Constant/Color";
import { _height, _width } from "@Constant/Scale";
import { ConfigFileCode } from "@typings/configFile";
import { head } from "lodash";
import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import useConfigFile from "src/Hooks/useConfigFile";
import { useFocused } from "src/Hooks/useNavigation";
import { CloseIcon } from "src/SGV";
import storage from "src/utils/storage";

type Props = {};

function AdsPopup({}: Props) {
  const [visible, setVisible] = useState(true);
  const imageAds = useConfigFile(ConfigFileCode.ImageAds);

  const handleClose = useCallback(() => {
    setVisible(false);
    storage.setString("lastShowAdsPopup", new Date().toISOString());
  }, []);

  useFocused(() => {
    const lastShowAdsPopup = storage.getString("lastShowAdsPopup");
    if (
      lastShowAdsPopup &&
      new Date().getTime() - new Date(lastShowAdsPopup).getTime() >
        5 * 60 * 1000 // 15 minutes
    ) {
      setVisible(true);
      return;
    }
  });

  if (!imageAds) {
    return null;
  }

  return (
    <Fade visible={visible} style={styles.container}>
      <Column padding={0}>
        <Image auto avatar={head(imageAds.fileArr)} style={styles.image} />
        <IconButton containerStyle={styles.iconClose} onPress={handleClose}>
          <CloseIcon width={34} height={34} />
        </IconButton>
      </Column>
    </Fade>
  );
}

export default AdsPopup;

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
