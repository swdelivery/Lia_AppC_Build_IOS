import FastImage from "@Components/FastImage";
import Icon from "@Components/Icon";
import { BASE_COLOR, SECOND_COLOR, THIRD_COLOR } from "@Constant/Color";
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
import LinearGradient from "react-native-linear-gradient";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  auto?: boolean;
  avatar?: FileAvatar;
  style?: StyleProp<ViewStyle>;
  placeholderComponent?: React.ReactNode;
  placeholderColors?: string[];
};

export default function Image({
  avatar,
  auto,
  style,
  placeholderColors = [BASE_COLOR, SECOND_COLOR],
}: Props) {
  const uri = useMemo(() => {
    return getImageAvataUrl(avatar, "");
  }, [avatar]);

  return (
    <View style={[styles.container, style]}>
      <FastImage
        auto={auto}
        style={StyleSheet.absoluteFillObject}
        uri={uri}
        placeholderComponent={<DefaultPlaceholder colors={placeholderColors} />}
      />
    </View>
  );
}

function DefaultPlaceholder({ colors }: { colors: string[] }) {
  return (
    <LinearGradient
      style={styles.placeholder}
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
  );
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
