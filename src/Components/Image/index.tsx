import FastImage from "@Components/FastImage";
import LinearGradient from "@Components/LinearGradient";
import { BASE_COLOR, BG_BEAUTY, SECOND_COLOR, WHITE } from "@Constant/Color";
import { FileAvatar } from "@typings/common";
import React, { useMemo } from "react";
import { StyleProp, StyleSheet, View } from "react-native";
import { ImageStyle, ResizeMode } from "react-native-fast-image";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  auto?: boolean;
  avatar?: FileAvatar;
  style?: StyleProp<ImageStyle>;
  placeholderComponent?: React.ReactNode;
  placeholderColors?: string[];
  resizeMode?: ResizeMode;
};

export default function Image({
  avatar,
  auto = false,
  style,
  placeholderColors = [BG_BEAUTY, WHITE],
  resizeMode,
}: Props) {
  const uri = useMemo(() => {
    return getImageAvataUrl(avatar, "");
  }, [avatar]);

  console.log({ uri });
  

  const autoStyle = useMemo(() => {
    if (!avatar || !auto) {
      return undefined;
    }
    const ratio = avatar.dimensions.height / avatar.dimensions.width;
    let { width, height } = StyleSheet.flatten(style);
    if (width && typeof width === "number") {
      height = width * ratio;
    } else if (height && typeof height === "number") {
      width = height / ratio;
    }
    return {
      width,
      height,
    };
  }, [avatar, auto, style]);

  return (
    <View style={style}>
      <FastImage
        auto={auto}
        style={[style, autoStyle]}
        uri={uri}
        placeholderComponent={<DefaultPlaceholder colors={placeholderColors} />}
        resizeMode={resizeMode}
      />
    </View>
  );
}

function DefaultPlaceholder({ colors }: { colors: string[] }) {
  return (
    <LinearGradient
      style={styles.placeholder}
      colors={colors}
    // start={{ x: 0, y: 0 }}
    // end={{ x: 0, y: 1 }}
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
