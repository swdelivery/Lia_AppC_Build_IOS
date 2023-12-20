import Column from "@Components/Column";
import Icon from "@Components/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BLACK_OPACITY_7, NEW_BASE_COLOR } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import { getDetailCampainState } from "@Redux/charity/selectors";
import moment from "moment";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

type Props = {};

export default function FundInfo({ }: Props) {

  const { data: {
    fundTarget,
    endDate,
    name,
    createBy
  } } = useSelector(getDetailCampainState)

  const dayLeft = useMemo(() => {
    return moment(endDate).diff(moment(), 'days')
  }, [endDate])

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
            <Text weight="bold">{formatMonney(fundTarget, true)}</Text>
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
            <Text weight="bold">{dayLeft} ngày</Text>
          </Column>
        </Row>
      </Row>
      <Text weight="bold" top={20} size={16}>
        {name}
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
          {createBy}
        </Text>
        <Icon name="check-circle" size={16} color={NEW_BASE_COLOR} left={4} />
      </Row>
    </Column>
  );
}

const styles = StyleSheet.create({
  //
});
