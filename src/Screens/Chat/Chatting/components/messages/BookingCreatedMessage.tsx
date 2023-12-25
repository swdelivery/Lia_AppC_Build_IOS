import Column from "@Components/Column";
import Icon from "@Components/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { Message } from "@typings/chat";
import moment from "moment";
import React, { useCallback } from "react";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  item: Message;
};

export default function BookingCreatedMessage({ item }: Props) {
  const { navigation } = useNavigate();
  const template = item.template;

  console.log({ item });

  const handleBookingDetails = useCallback(() => {
    // @ts-ignore
    navigation.navigate(ScreenKey.DETAIL_BOOKING, {
      booking: {
        _id: template?.data?.bookingId,
      },
    });
  }, [template?.data?.bookingId]);

  return (
    <Column padding={8} gap={4}>
      <Text
        size={12}
        weight="bold"
      >{`Xin chào Khách hàng ${template?.data?.partnerName}, cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ tại LiA`}</Text>
      <Text size={12} fontStyle="italic">
        Lịch đặt hẹn của bạn đã được xác nhận thành công với thông tin sau
      </Text>
      <Row gap={8}>
        <Column>
          <Text size={12} fontStyle="italic">
            Khách Hàng
          </Text>
          <Text size={12} fontStyle="italic">
            Thời gian
          </Text>
          <Text size={12} fontStyle="italic">
            Dịch vụ đã chọn
          </Text>
          {template.data.services?.map((item) => (
            <Text size={12} fontStyle="italic" key={item}>
              {"• Dịch vụ"}
            </Text>
          ))}
          <Text size={12} fontStyle="italic">
            Tổng giá trị
          </Text>
          <Text size={12} fontStyle="italic">
            Trạng thái thanh toán
          </Text>
        </Column>
        <Column>
          <Text size={12} fontStyle="italic">
            {template.data.partnerName}
          </Text>
          <Text size={12} fontStyle="italic">
            {moment(template.data.created).format("DD/MM/YYYY, HH:mm")}
          </Text>
          <Text size={12} fontStyle="italic"></Text>
          {template.data.services?.map((item) => (
            <Text size={12} fontStyle="italic" key={item} numberOfLines={1}>
              {item}
            </Text>
          ))}
          <Text size={12} fontStyle="italic">
            {formatMonney(template.data.totalAmount, true)}
          </Text>
          <Text size={12} fontStyle="italic" numberOfLines={1}>
            {template.data.status}
          </Text>
        </Column>
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
        <Text size={12} color={"white"} weight="bold" bottom={2}>
          Chi tiết lịch hẹn
        </Text>
        <Icon name="chevron-right" color="white" />
      </Row>
    </Column>
  );
}
