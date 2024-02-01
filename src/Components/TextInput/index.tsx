import Column from "@Components/Column";
import Row from "@Components/Row";
import Text, { FONT_WEIGHTS } from "@Components/Text";
import {
  BLACK,
  BORDER_INPUT_TEXT,
  BORDER_INPUT_TEXT_FOCUSED,
  ERROR_COLOR,
  GREY,
} from "@Constant/Color";
import { stylesFont } from "@Constant/Font";
import { _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import React, { forwardRef } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
} from "react-native";
import useShareForwardedRef from "src/Hooks/useShareForwardedRef";

type Props = TextInputProps & {
  //
};

function TextInput({ style, ...props }: Props, ref: any) {
  const innerRef = useShareForwardedRef<RNTextInput>(ref);

  return (
    <RNTextInput
      ref={innerRef}
      placeholderTextColor={GREY}
      style={[styles.input, style]}
      {...props}
    />
  );
}

export default forwardRef(TextInput);

export function FormTextInput({
  error,
  ...props
}: {
  error?: string;
} & Props) {
  return (
    <Column>
      <Row
        paddingVertical={16}
        borderRadius={8}
        borderColor={
          error
            ? ERROR_COLOR
            : props.value
              ? BORDER_INPUT_TEXT_FOCUSED
              : BORDER_INPUT_TEXT
        }
        borderWidth={1}
        paddingHorizontal={10}
      >
        <TextInput style={styleElement.flex} {...props} />
      </Row>
      {error && error.length > 0 && (
        <Text style={styles.error_text}>{error}</Text>
      )}

      {props.value && (
        <Column style={styles.labelContainer}>
          <Text size={14} color={GREY}>
            {props.placeholder}
          </Text>
        </Column>
      )}
    </Column>
  );
}

const styles = StyleSheet.create({
  input: {
    color: BLACK,
    fontFamily: FONT_WEIGHTS.regular,
    paddingVertical: 0
  },
  input_text: {
    ...stylesFont.fontNolan,
    fontSize: _moderateScale(14),
    paddingVertical: 0,
    flex: 1,
    color: BLACK,
  },
  error_text: {
    color: ERROR_COLOR,
    marginHorizontal: 10,
    fontStyle: "italic",
    marginVertical: 5,
  },
  labelContainer: {
    backgroundColor: "white", // Same color as background
    alignSelf: "flex-start", // Have View be same width as Text inside
    paddingHorizontal: 3, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 1, // Needed for android
    shadowColor: "white", // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "absolute", // Needed to be able to precisely overlap label with border
    top: -12, // Vertical position of label. Eyeball it to see where label intersects border.
  },
});
