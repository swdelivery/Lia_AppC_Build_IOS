import { IconChat } from "@Components/Icon/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BLACK } from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import React, { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
};

export default function HeaderList({ icon, title }: Props) {
  return (
    <Row gap={10} marginVertical={16}>
      {icon}
      <Text weight="bold" color={BLACK} size={16}>
        {title}
      </Text>
    </Row>
  );
}
