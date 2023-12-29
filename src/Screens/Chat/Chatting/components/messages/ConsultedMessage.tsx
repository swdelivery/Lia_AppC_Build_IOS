import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Message, TemplateData } from "@typings/chat";
import Column from "@Components/Column";
import Icon from "@Components/Icon";
import { BASE_COLOR, GREEN_2, GREEN_SUCCESS } from "@Constant/Color";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";

type Props = {
  template: TemplateData;
};

export default function ConsultedMessage({ template }: Props) {
  const { navigation } = useNavigate();

  const handleDetails = useCallback(() => {
    if (template.data.bookingStatus === "CANCEL") {
      navigation.navigate(ScreenKey.LIST_TREATMENT_DETAIL);
    } else {
      navigation.navigate(ScreenKey.LIST_BOOKING);
    }
  }, [template]);

  return (
    <Column paddingHorizontal={8} paddingVertical={2} gap={8}>
      <Row gap={6} alignItems="flex-start">
        <Column marginTop={5}>
          <Icon name="check-circle-outline" color={GREEN_SUCCESS} />
        </Column>
        <Column>
          <Text weight="bold" color={GREEN_2} size={16}>
            THÔNG BÁO
          </Text>
          <Text
            size={14}
            color={GREEN_2}
          >{`CHÀO BẠN ${template.data.partnerName}`}</Text>
        </Column>
      </Row>
      <Text size={14}>
        Chúc mừng bạn vừa hoàn thành tư vấn dịch vụ tại{" "}
        <Text weight="bold">{template.data.branchName}</Text>
      </Text>
      <Text weight="bold" size={14}>
        Xem chi tiết thông tin tư vấn tại đây!!
      </Text>
      <Row
        backgroundColor={BASE_COLOR}
        alignSelf="center"
        borderRadius={12}
        paddingHorizontal={8}
        paddingVertical={1}
        marginTop={8}
        onPress={handleDetails}
      >
        <Text size={14} color={"white"} weight="bold" bottom={2}>
          Chi tiết thông tin tư vấn
        </Text>
        <Icon name="chevron-double-right" color="white" size={18} />
      </Row>
    </Column>
  );
}
