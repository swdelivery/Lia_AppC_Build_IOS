import React from "react";
import { Text, View } from "react-native";
import * as Color from "../../Constant/Color";
import Row from "@Components/Row";
import { _moderateScale } from "@Constant/Scale";

const toastConfig = {
  success: (internalState) => (
    <Row
      borderRadius={_moderateScale(4 * 2)}
      backgroundColor={Color.GREEN_SUCCESS}
      height={50}
      width={"80%"}
      justifyContent="center"
    >
      <Text style={{ color: Color.WHITE, fontSize: 14 }}>
        {internalState.text1}
      </Text>
    </Row>
  ),
  error: (internalState) => (
    <Row
      borderRadius={_moderateScale(4 * 2)}
      backgroundColor={Color.ERROR_COLOR}
      height={50}
      width={"80%"}
      justifyContent="center"
    >
      <Text style={{ color: Color.WHITE, fontSize: 14 }}>
        {internalState.text1}
      </Text>
    </Row>
  ),
  info: (internalState) => (
    <Row
      borderRadius={_moderateScale(4 * 2)}
      backgroundColor={Color.INFO_COLOR}
      height={50}
      width={"80%"}
      justifyContent="center"
    >
      <Text style={{ color: Color.BLACK, fontSize: 14 }}>
        {internalState.text1}
      </Text>
    </Row>
  ),
};

export default toastConfig;
