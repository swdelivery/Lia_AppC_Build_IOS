import React from "react";
import * as Color from "../../Constant/Color";
import Row from "@Components/Row";
import { _moderateScale } from "@Constant/Scale";
import Text from "@Components/Text";

const toastConfig = {
  success: (internalState) => (
    <Row
      borderRadius={_moderateScale(4 * 2)}
      backgroundColor={Color.GREEN_SUCCESS}
      height={50}
      width={"80%"}
      justifyContent="center"
    >
      <Text color={Color.WHITE} size={_moderateScale(14)}>
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
      <Text color={Color.WHITE} size={_moderateScale(14)}>
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
      <Text color={Color.BLACK} size={_moderateScale(14)}>
        {internalState.text1}
      </Text>
    </Row>
  ),
};

export default toastConfig;
