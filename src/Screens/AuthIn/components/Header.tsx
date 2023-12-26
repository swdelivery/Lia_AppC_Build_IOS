import { styleElement } from "@Constant/StyleElement";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import IconBackBlack from "../../../SGV/backBase.svg";
import Text from "@Components/Text";
import { sizeIcon } from "@Constant/Icon";
import { _moderateScale } from "@Constant/Scale";
import Row from "@Components/Row";
import { StatusBar } from "@Components/StatusBar";

type Props = {
  title: string;
  onBack: () => void;
};

export default function Header({ title, onBack }: Props) {
  return (
    <Row style={[styleElement.rowAliCenter, styles.headerContainer]}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={onBack} hitSlop={styleElement.hitslopSm}>
        <IconBackBlack width={20} height={20} />
      </TouchableOpacity>
      <Text size={16} weight="bold">
        {title}
      </Text>
      <View style={sizeIcon.lg} />
    </Row>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "space-between",
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: 8,
    height: _moderateScale(45),
  },
});
