import BottomSheet from "@Components/BottomSheet";
import Column from "@Components/Column";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  BORDER_INPUT_TEXT,
  BORDER_INPUT_TEXT_FOCUSED,
  GREY,
} from "@Constant/Color";
import React from "react";
import { View, StyleSheet } from "react-native";
import { UpDownIcon } from "src/SGV";

type Props = {
  onPress: () => void;
};

export default function CollaborationType({ onPress }: Props) {
  return (
    <>
      <Row
        justifyContent="space-between"
        borderWidth={1}
        borderColor={BORDER_INPUT_TEXT}
        borderRadius={8}
        paddingVertical={16}
        marginHorizontal={16}
        paddingHorizontal={8}
        onPress={onPress}
      >
        <Text color={GREY}>Hình thức hợp tác</Text>
        <UpDownIcon />
      </Row>
    </>
  );
}

const styles = StyleSheet.create({
  //
});
