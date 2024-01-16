import { FileAvatar } from "@typings/common";
import React, { useMemo } from "react";
import { StyleProp, ImageStyle, StyleSheet } from "react-native";
import { CachedImage } from "@georstat/react-native-image-cache";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  auto?: boolean;
  avatar: FileAvatar;
  style?: StyleProp<ImageStyle>;
};

export default function CachedImageView({ auto, avatar, style }: Props) {
  const url = useMemo(() => {
    return getImageAvataUrl(avatar);
  }, [avatar]);

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

  return <CachedImage source={url} style={[autoStyle, style]} />;
}
