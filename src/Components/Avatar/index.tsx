import FastImage from "@Components/FastImage";
import { FileAvatar } from "@typings/common";
import React, { useMemo } from "react";
import { ImageStyle } from "react-native";
import { DoctorIcon } from "src/SGV";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  avatar?: FileAvatar;
  size?: number;
  circle?: boolean;
  style?: ImageStyle;
};

export default function Avatar({ avatar, size = 24, style, circle }: Props) {
  const uri = useMemo(() => {
    return getImageAvataUrl(avatar);
  }, [avatar]);

  const containerStyle = useMemo(() => {
    return {
      width: size,
      height: size,
      borderRadius: circle ? size / 2 : undefined,
    };
  }, [size, circle]);

  return (
    <FastImage
      uri={uri}
      // @ts-ignore
      style={[containerStyle, style]}
      placeholderComponent={<DoctorIcon width={size} height={size} />}
    />
  );
}
