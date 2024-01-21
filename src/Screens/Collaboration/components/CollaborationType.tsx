import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  BORDER_INPUT_TEXT,
  BORDER_INPUT_TEXT_FOCUSED,
  ERROR_COLOR,
  GREY,
} from "@Constant/Color";
import React from "react";
import { StyleSheet } from "react-native";
import { UpDownIcon } from "src/SGV";

type Props = {
  value: string;
  onPress: () => void;
  error?: string;
};

export default function CollaborationType({ value, onPress, error }: Props) {
  return (
    <>
      <Row
        justifyContent="space-between"
        borderWidth={1}
        borderColor={
          error
            ? ERROR_COLOR
            : value
            ? BORDER_INPUT_TEXT_FOCUSED
            : BORDER_INPUT_TEXT
        }
        borderRadius={8}
        paddingVertical={16}
        marginHorizontal={16}
        paddingHorizontal={8}
        onPress={onPress}
      >
        {!value && <Text color={GREY}>Hình thức hợp tác</Text>}
        {!!value && <Text>{value}</Text>}
        <UpDownIcon />
      </Row>
      {error && error.length > 0 && (
        <Text style={styles.error_text}>{error}</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  error_text: {
    color: ERROR_COLOR,
    marginHorizontal: 26,
    fontStyle: "italic",
    marginVertical: 5,
  },
});
