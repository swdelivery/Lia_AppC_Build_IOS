import Checkbox from "@Components/Checkbox";
import Icon from "@Components/Icon";
import Image from "@Components/Image";
import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import { FileUpload } from "@typings/common";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import useCallbackItem from "src/Hooks/useCallbackItem";

type Props = {
  item: FileUpload;
  isSelected: boolean;
  onPress: (item: FileUpload) => void;
};

export default function ProblemItem({ item, onPress, isSelected }: Props) {
  const trigger = useCallbackItem(item);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={trigger(onPress)}
    >
      <Image avatar={item.fileUpload} style={styles.imageConsul} />
      <Checkbox
        containerStyle={styles.checkbox}
        value={isSelected}
        color="#866946"
      />
      <Text size={12} weight="bold">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginRight: _moderateScale(8) },
  imageConsul: {
    width: _moderateScale(8 * 12),
    height: _moderateScale(8 * 12),
    borderRadius: _moderateScale(8),
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.3)",
  },
  checkbox: {
    position: "absolute",
    top: 2,
    right: 2,
  },
});
