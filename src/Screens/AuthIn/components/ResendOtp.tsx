import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { stylesFont } from "../../../Constant/Font";
import { BLUE_FB, GREY } from "../../../Constant/Color";
import { _moderateScale } from "../../../Constant/Scale";
import { useInterval } from "@r0b0t3d/react-native-hooks";

type Props = {
  onResend: () => void;
};

function ResendOtp({ onResend }: Props, ref: any) {
  const [counter, setCounter] = useState(20);

  useImperativeHandle(ref, () => ({
    setCounter: (value: number) => {
      setCounter(value);
    },
  }));

  useInterval(
    () => {
      setCounter((prev) => prev - 1);
    },
    counter > 0 ? 1000 : -1
  );

  return (
    <>
      {counter === 0 ? (
        <TouchableOpacity onPress={onResend}>
          <Text style={styles.resend}>Yêu cầu gửi lại OTP</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.resendAfter}>
          Gửi lại OTP sau: <Text style={styles.counter}>{counter}</Text>
        </Text>
      )}
    </>
  );
}

export default forwardRef(ResendOtp);

const styles = StyleSheet.create({
  resend: {
    ...stylesFont.fontNolan,
    alignSelf: "center",
    textDecorationLine: "underline",
    color: GREY,
    fontSize: _moderateScale(15),
  },
  resendAfter: {
    ...stylesFont.fontNolan,
    alignSelf: "center",
    color: GREY,
    fontSize: _moderateScale(15),
  },
  counter: { ...stylesFont.fontNolanBold, color: BLUE_FB },
});
