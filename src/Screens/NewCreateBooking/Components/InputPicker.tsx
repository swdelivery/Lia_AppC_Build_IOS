import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { _moderateScale } from "@Constant/Scale";
import { BORDER_COLOR, RED, WHITE } from "@Constant/Color";
import Text from "@Components/Text";
import Row from "@Components/Row";
import { IconLineArrowDown } from "@Components/Icon/Icon";
import { sizeIcon } from "@Constant/Icon";
import Column from "@Components/Column";

type Props = {
  value: any;
  require?: boolean;
  title: string;
  onPress: () => void;
};

const InputPicker = ({ value, require, title, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Row paddingHorizontal={8 * 3}>
        <Column flex={1} marginRight={8 * 2}>
          {value?._id ? (
            <Text numberOfLines={1} weight="bold">
              {value?.name}
            </Text>
          ) : (
            <Text numberOfLines={1} weight="bold">
              {title} {require && <Text color={RED}>*</Text>}{" "}
            </Text>
          )}
        </Column>
        {onPress && <IconLineArrowDown style={sizeIcon.md} />}
      </Row>
    </TouchableOpacity>
  );
};

export default InputPicker;

const styles = StyleSheet.create({
  topTitle: {
    top: -10,
    alignSelf: "flex-start",
    left: 8 * 2,
    backgroundColor: WHITE,
    paddingHorizontal: 8,
    position: "absolute",
  },
  container: {
    marginHorizontal: _moderateScale(8 * 2),
    borderWidth: 1,
    height: _moderateScale(8 * 6),
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    justifyContent: "center",
  },
});
