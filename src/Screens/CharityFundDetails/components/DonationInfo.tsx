import Avatar from "@Components/Avatar";
import Column from "@Components/Column";
import HorizontalProgress from "@Components/HoriontalProgress";
import Icon from "@Components/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BLACK_OPACITY_4, NEW_BASE_COLOR } from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import React from "react";

const ITEMS_COUNT = Math.floor((_width - 32) / 40) - 1;

export default function DonationInfo() {
  return (
    <Column paddingHorizontal={16}>
      <HorizontalProgress percent={80} />
      <Row marginTop={4}>
        <Text>Đã đạt được </Text>
        <Text weight="bold" color={NEW_BASE_COLOR} flex={1}>
          {formatMonney(36238232, true)}
        </Text>
        <Text weight="bold">80%</Text>
      </Row>
      <Row gap={8} justifyContent="space-between" marginTop={20}>
        {Array.from(Array(ITEMS_COUNT).keys()).map((_, index) => {
          return <Avatar size={32} key={index} />;
        })}
        <Column borderRadius={16} width={32} aspectRatio={1}>
          <Avatar size={32} />
          <Column
            width={32}
            aspectRatio={1}
            borderRadius={16}
            backgroundColor={BLACK_OPACITY_4}
            position="absolute"
            alignItems="center"
            justifyContent="center"
          >
            <Icon name="dots-horizontal" color="white" size={18} />
          </Column>
        </Column>
      </Row>
      <Text size={12} weight="bold" top={8}>
        Nguyễn Đình Mạnh, NGUYEN HUONG GIANG{" "}
        <Text size={12}>và 2.421 người khác đã ủng hộ</Text>
      </Text>
      <Row alignSelf="flex-end" marginTop={12}>
        <Text size={12} color={NEW_BASE_COLOR}>
          Xem sao kê tài khoản
        </Text>
        <Icon name="arrow-right-thin" color={NEW_BASE_COLOR} size={18} />
      </Row>
    </Column>
  );
}
