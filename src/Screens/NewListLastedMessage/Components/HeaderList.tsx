import { IconChat } from "@Components/Icon/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BLACK } from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import React from "react";

type Props = {};

export default function HeaderList({}: Props) {
  return (
    <Row gap={_moderateScale(8)} marginTop={_moderateScale(8 * 2)}>
      <IconChat />
      <Text weight="bold" color={BLACK}>
        Cuộc trò chuyện
      </Text>
    </Row>
  );
}
