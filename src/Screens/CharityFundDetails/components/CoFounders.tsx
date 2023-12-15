import Avatar from "@Components/Avatar";
import Column from "@Components/Column";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  BLACK_OPACITY_4,
  BLACK_OPACITY_7,
  NEW_BASE_COLOR,
} from "@Constant/Color";
import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {};

export default function CoFounders({}: Props) {
  return (
    <Column marginTop={20}>
      <Row paddingHorizontal={16}>
        <Text weight="bold">Đồng hành gây quỹ </Text>
        <Text color={NEW_BASE_COLOR} flex={1}>
          (2)
        </Text>
        <Text color={NEW_BASE_COLOR}>Xem tất cả</Text>
      </Row>
      <CoFounderItem />
    </Column>
  );
}

function CoFounderItem() {
  return (
    <Row paddingHorizontal={16} gap={8} marginTop={20}>
      <Avatar size={32} />
      <Column>
        <Text weight="bold">Huân Nguyễn</Text>
        <Text size={12} color={BLACK_OPACITY_7} fontStyle="italic">
          Đã kêu gọi 0 VNĐ
        </Text>
      </Column>
    </Row>
  );
}

const styles = StyleSheet.create({
  //
});
