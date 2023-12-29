import Column from "@Components/Column";
import Icon from "@Components/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BASE_COLOR, ORANGE } from "@Constant/Color";
import ScreenKey from "@Navigation/ScreenKey";
import { Message, TemplateData } from "@typings/chat";
import moment from "moment";
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  template: TemplateData;
};

export default function RemindBookingMessage({ template }: Props) {
  const { navigation } = useNavigate();

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
      <Row gap={4}>
        <Icon name="bell" color={ORANGE} size={18} />
        <Text size={14} weight="bold">
          NHẮC NHỞ NHỎ
        </Text>
      </Row>
      <Text
        size={14}
      >{`Xin chào Khách hàng ${template.data.partnerName}, bạn đừng quên chúng ta có hẹn làm đẹp với nhau vào lúc:`}</Text>
      <Row alignItems="flex-start" gap={20}>
        <Column>
          <Text size={14} fontStyle="italic">
            Thời Gian:
          </Text>
          {template.data.services.map((item, index) => (
            <Text size={14} fontStyle="italic" key={item}>
              {index === 0 ? "Dịch vụ:" : ""}
            </Text>
          ))}
          <Text size={14} fontStyle="italic">
            Địa điểm
          </Text>
        </Column>
        <Column flex={1}>
          <Text size={14} fontStyle="italic">
            {moment(template.data.created).format("DD/MM/YYYY, HH:mm")}
          </Text>
          {template.data.services.map((item) => (
            <Text size={14} fontStyle="italic" key={item}>
              {item}
            </Text>
          ))}
          <Text size={14} fontStyle="italic">
            {template.data.branchName}
          </Text>
        </Column>
      </Row>
      <Text size={14} fontStyle="italic">
        Chúng tôi rất mong chờ để phục vụ bạn vào ngày hôm ấy! Nếu có bất kỳ
        điều gì cần thay đổi hoặc bạn có nhu cầu đặc biệt, đừng ngần ngại liên
        hệ với chúng tôi
      </Text>
      <Row
        backgroundColor={BASE_COLOR}
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

const styles = StyleSheet.create({
  //
});
