import Column from "@Components/Column";
import Icon from "@Components/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { _widthScale } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { Message } from "@typings/chat";
import moment from "moment";
import React, { useCallback } from "react";
import { useNavigate } from "src/Hooks/useNavigation";

const LEFT_WIDTH = _widthScale(120);
type Props = {
  item: Message;
};

export default function BookingCreatedMessage({ item }: Props) {
  const { navigation } = useNavigate();
  const template = item.template;

  const handleBookingDetails = useCallback(() => {
    // @ts-ignore
    navigation.navigate(ScreenKey.DETAIL_BOOKING, {
      booking: {
        _id: template?.data?.bookingId,
      },
    });
  }, [template?.data?.bookingId]);

  return (
    <Column padding={8} gap={4} width={_widthScale(280)}>
      <Text
        size={14}
        weight="bold"
      >{`Xin chào Khách hàng ${template?.data?.partnerName}, cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ tại LiA`}</Text>
      <Text size={14} fontStyle="italic">
        Lịch đặt hẹn của bạn đã được xác nhận thành công với thông tin sau
      </Text>
      <Row alignItems="flex-start">
        <Column width={LEFT_WIDTH}>
          <Text size={14} fontStyle="italic">
            Khách Hàng
          </Text>
        </Column>
        <Text size={14} fontStyle="italic" flex={1}>
          {template.data.partnerName}
        </Text>
      </Row>
      <Row>
        <Column width={LEFT_WIDTH}>
          <Text size={14} fontStyle="italic">
            Thời gian
          </Text>
        </Column>
        <Text size={14} fontStyle="italic">
          {moment(template.data.created).format("DD/MM/YYYY, HH:mm")}
        </Text>
      </Row>
      <Text size={14} fontStyle="italic">
        Dịch vụ đã chọn
      </Text>
      {template.data.services?.map((item) => (
        <Row key={item} alignItems="flex-start">
          <Column width={LEFT_WIDTH}>
            <Text size={14} fontStyle="italic">
              {"• Dịch vụ"}
            </Text>
          </Column>
          <Text size={14} fontStyle="italic" flex={1}>
            {item}
          </Text>
        </Row>
      ))}
      <Row>
        <Column width={LEFT_WIDTH}>
          <Text size={14} fontStyle="italic">
            Tổng giá trị
          </Text>
        </Column>
        <Text size={14} fontStyle="italic">
          {formatMonney(template.data.totalAmount, true)}
        </Text>
      </Row>
      <Row>
        <Column width={LEFT_WIDTH}>
          <Text size={14} fontStyle="italic">
            Trạng thái thanh toán
          </Text>
        </Column>
        <Text size={14} fontStyle="italic" numberOfLines={1}>
          {template.data.status}
        </Text>
      </Row>
      <Row
        backgroundColor={"#8a0086"}
        alignSelf="flex-start"
        borderRadius={8}
        paddingHorizontal={8}
        paddingVertical={1}
        marginTop={8}
        onPress={handleBookingDetails}
      >
        <Text size={14} color={"white"} weight="bold" bottom={2}>
          Chi tiết lịch hẹn
        </Text>
        <Icon name="chevron-right" color="white" />
      </Row>
    </Column>
  );
}
