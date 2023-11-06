import FastImage from "@Components/FastImage";
import { FileAvatar } from "@typings/common";
import React, { useMemo } from "react";
import { ImageStyle, StyleProp } from "react-native";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  avatar?: FileAvatar;
  style?: StyleProp<ImageStyle>;
};

export default function Image({ avatar, style }: Props) {
  const uri = useMemo(() => {
    return getImageAvataUrl(avatar);
  }, [avatar]);

  return <FastImage uri={uri} style={style} />;
}
