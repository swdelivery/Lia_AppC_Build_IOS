import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import Text from "@Components/Text";
import Icon from "@Components/Icon";

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
      <Icon name="diamond" color="#F8E6D0" size={12} style={styles.icon} />
      <Text color={"#F8E6D0"} weight="bold" size={10} left={4}>
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
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: 8 * 1.5,
    height: 8 * 1.5,
    resizeMode: "contain",
    marginRight: 4,
  },
  icon: {
    marginBottom: -2,
  },
  larger: {
    width: 8 * 2,
    height: 8 * 2,
    resizeMode: "contain",
  },
});
