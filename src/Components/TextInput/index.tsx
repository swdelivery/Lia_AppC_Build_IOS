import { BLACK, GREY } from "@Constant/Color";
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

const styles = StyleSheet.create({
  input: {
    color: BLACK,
  },
});
