import Column from "@Components/Column";
import Fade from "@Components/Fade";
import Icon from "@Components/Icon";
import IconButton from "@Components/IconButton";
import Image from "@Components/Image";
import withPortal from "@Components/withPortal";
import { BLACK_OPACITY_4 } from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { ConfigFileCode } from "@typings/configFile";
import { head } from "lodash";
import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import useConfigFile from "src/Hooks/useConfigFile";
import { useFocused } from "src/Hooks/useNavigation";
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
    console.log({ lastShowAdsPopup });

    if (
      lastShowAdsPopup &&
      new Date().getTime() - new Date(lastShowAdsPopup).getTime() >
        15 * 60 * 1000 // 15 minutes
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
      <Column padding={25}>
        <Image auto avatar={head(imageAds.fileArr)} style={styles.image} />
        <IconButton containerStyle={styles.iconClose} onPress={handleClose}>
          <Icon name="close-circle" size={60} />
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
  },
  iconClose: {
    position: "absolute",
    right: 0,
  },
});
