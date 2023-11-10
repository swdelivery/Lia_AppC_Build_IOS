import Text from "@Components/Text";
import { BLACK } from "@Constant/Color";
import React, { ReactNode, useMemo } from "react";
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";

type Props = {
  image?: ReactNode;
  title: string;
  titleColor?: string;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  height?: number;
};

export default function ListEmpty({
  title,
  titleColor = BLACK,
  image,
  isLoading,
  style,
  height = 80,
}: Props) {
  const mContainerStyle = useMemo(
    () => ({
      minHeight: height,
    }),
    [height]
  );

  if (isLoading) {
    return null;
  }

  return (
    <View
      style={[styles.container, mContainerStyle, style]}
      pointerEvents="none"
    >
      {image}
      <Text color={titleColor} weight="bold" size={17} style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  title: {
    textAlign: "center",
  },
});
