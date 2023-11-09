import FastImage from "@Components/FastImage";
import Icon from "@Components/Icon";
import { URL_AVATAR_DEFAULT } from "@Constant/Url";
import { FileAvatar } from "@typings/common";
import React, { useMemo } from "react";
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  avatar?: FileAvatar;
  style?: StyleProp<ViewStyle>;
  placeholderComponent?: React.ReactNode;
};

export default function Image({ avatar, style }: Props) {
  const uri = useMemo(() => {
    return getImageAvataUrl(avatar, URL_AVATAR_DEFAULT);
  }, [avatar]);

  return (
    <View style={[styles.container, style]}>
      <FastImage
        style={StyleSheet.absoluteFillObject}
        uri={uri}
        placeholderComponent={<DefaultPlaceholder />}
      />
    </View>
  );
}

function DefaultPlaceholder() {
  return <View style={styles.placeholder} />;
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.1)",
  },
});
