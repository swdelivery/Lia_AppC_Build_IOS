import { styleElement } from "@Constant/StyleElement";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import IconBackBlack from "../../../SGV/backArrBlack.svg";
import Text from "@Components/Text";
import { sizeIcon } from "@Constant/Icon";
import { _moderateScale } from "@Constant/Scale";

type Props = {
  title: string;
  onBack: () => void;
};

export default function Header({ title, onBack }: Props) {
  return (
    <View style={[styleElement.rowAliCenter, styles.headerContainer]}>
      <TouchableOpacity onPress={onBack} hitSlop={styleElement.hitslopSm}>
        <IconBackBlack width={24} height={24} />
      </TouchableOpacity>
      <Text size={16} weight="bold">
        {title}
      </Text>
      <View style={sizeIcon.lg} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "space-between",
    paddingHorizontal: _moderateScale(8 * 2),
    paddingBottom: 8,
  },
});
