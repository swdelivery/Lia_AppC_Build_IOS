import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import Text from "@Components/Text";

type Props = {
  name: string;
  backgroundColor?: string;
  bg?: string;
  larger?: boolean;
  onPress?: () => void;
};

const Certificate = ({
  name,
  backgroundColor = "#414378",
  bg,
  larger,
  onPress,
}: Props) => {
  const containerStyle = useMemo(() => {
    return {
      backgroundColor:
        bg == "black" ? "#151617" : bg == "blue" ? "#6AB6D3" : backgroundColor,
    };
  }, [backgroundColor, bg]);

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Image
        style={[styles.image, larger && styles.larger]}
        source={require("../../Image/kimcuong.png")}
      />
      <Text color={"#F8E6D0"} weight="bold" size={10}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default Certificate;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: 8 * 1.5,
    height: 8 * 1.5,
    resizeMode: "contain",
    marginRight: 4,
  },
  larger: {
    width: 8 * 2,
    height: 8 * 2,
    resizeMode: "contain",
  },
});
