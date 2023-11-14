import Icon from "@Components/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { styleElement } from "@Constant/StyleElement";
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

type Props = {
  onViewMore: () => void;
};

export default function BeautyInsurance({ onViewMore }: Props) {
  return (
    <Row
      backgroundColor={"white"}
      marginTop={8}
      marginHorizontal={8}
      borderRadius={8}
      padding={16}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text weight="bold" style={styleElement.flex}>
        Bảo hiểm làm đẹp
      </Text>
      <Pressable style={styles.buttonMore} onPress={onViewMore}>
        <Text size={12} right={4}>
          Tìm hiểu thêm
        </Text>
        <Icon name="chevron-right" color="grey" size={20} />
      </Pressable>
    </Row>
  );
}

const styles = StyleSheet.create({
  buttonMore: {
    flexDirection: "row",
    alignItems: "center",
  },
});
