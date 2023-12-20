import Column from "@Components/Column";
import Icon from "@Components/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BLACK_OPACITY_7, NEW_BASE_COLOR } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {};

export default function FundInfo({ }: Props) {
  return (
    <Column paddingHorizontal={16} paddingVertical={20}>
      <Row>
        <Row gap={8} flex={1}>
          <Column
            width={36}
            aspectRatio={1}
            backgroundColor={NEW_BASE_COLOR}
            borderRadius={6}
            alignItems="center"
            justifyContent="center"
          >
            <Icon name="target" color="white" />
          </Column>
          <Column>
            <Text size={12} color={BLACK_OPACITY_7}>
              Mục tiêu chiến dịch
            </Text>
            <Text weight="bold">{formatMonney(120000000, true)}</Text>
          </Column>
        </Row>
        <Row gap={8}>
          <Column
            width={36}
            aspectRatio={1}
            backgroundColor={NEW_BASE_COLOR}
            borderRadius={6}
            alignItems="center"
            justifyContent="center"
          >
            <Icon name="timer-sand" color="white" />
          </Column>
          <Column>
            <Text size={12} color={BLACK_OPACITY_7}>
              Thời gian còn lại
            </Text>
            <Text weight="bold">79 ngày</Text>
          </Column>
        </Row>
      </Row>
      <Text weight="bold" top={20} size={16}>
        Chiến dịch thiện nguyện mang Nhà vệ sinh đến tre em mầm non vùng cao!
      </Text>
      <Row alignItems="flex-start" gap={4} marginTop={6}>
        <Icon
          name="map-marker-outline"
          color={BLACK_OPACITY_7}
          size={12}
          top={4}
        />
        <Text size={12} color={BLACK_OPACITY_7}>
          Ubnd Mèo Vạc, Thị trấn Mèo Vạc, Huyện Mèo Vạc, Tỉnh Hà Giang
        </Text>
      </Row>
      <Row marginTop={12}>
        <Text size={12}>Tạo bởi </Text>
        <Text size={12} weight="bold" color={NEW_BASE_COLOR}>
          QUỸ THIỆN NGUYỆN SINH VIÊN
        </Text>
        <Icon name="check-circle" size={16} color={NEW_BASE_COLOR} left={4} />
      </Row>
    </Column>
  );
}

const styles = StyleSheet.create({
  //
});
