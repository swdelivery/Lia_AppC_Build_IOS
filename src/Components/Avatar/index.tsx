import FastImage from "@Components/FastImage";
import Icon from "@Components/Icon";
import { GREY } from "@Constant/Color";
import { FileAvatar } from "@typings/common";
import React, { useMemo } from "react";
import { View, StyleSheet, ImageStyle } from "react-native";
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
      style={[containerStyle, style]}
      placeholderComponent={
        <View style={[styles.container, containerStyle, style]}>
          <Icon name="account" color="white" size={(size * 2) / 3} />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GREY,
  },
  placeholder: {
    backgroundColor: GREY,
  },
});
