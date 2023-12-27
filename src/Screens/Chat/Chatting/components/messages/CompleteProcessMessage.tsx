import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Message, TemplateData } from "@typings/chat";
import Column from "@Components/Column";
import Icon from "@Components/Icon";
import { GREEN_2, GREEN_SUCCESS } from "@Constant/Color";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import moment from "moment";
import Toast from "react-native-toast-message";

type Props = {
  template: TemplateData;
};

export default function CompleteProcessMessage({ template }: Props) {
  const { navigate } = useNavigate();

  const handleDetails = useCallback(() => {
    Toast.show({
      text1: "Tính năng này sẽ được phát triển trong thời gian sắp tới",
    });
  }, [template]);

  const services = useMemo(
    () => template.data.serviceName.join(", "),
    [template]
  );

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
            size={10}
            color={GREEN_2}
          >{`ĐÃ HOÀN THÀNH DỊCH VỤ\n${services.toUpperCase()} TẠI ${template.data.branchName?.toUpperCase()}`}</Text>
        </Column>
      </Row>
      <Text size={12}>
        Chân thành cám ơn Anh/Chị đã chọn thực hiện dịch vụ
        <Text size={12} weight="bold">
          {` ${services} `}
        </Text>
        tại
        <Text size={12} weight="bold">
          {` ${template.data.branchName} `}
        </Text>
      </Text>
      <Text size={12}>
        Dịch vụ đã được thực hiện thành công vào lúc
        <Text weight="bold" size={12}>
          {` ${moment(template.data.completedAt).format("HH:mm")} ngày ${moment(
            template.data.completedAt
          ).format("DD/MM/YYYY")} `}
        </Text>
      </Text>
      <Text size={12}>
        Đừng quên tuân thủ{" "}
        <Text size={12} weight="bold">
          hướng dẫn chăm sóc hậu phẫu
        </Text>
        của Bác sĩ hoặc xem thêm các hướng dẫn chăm sóc tại đây
      </Text>
      <Text size={12}>
        Trong quá trình nghỉ dưỡng và chăm sóc tại nhà, nếu có bất cứ biểu hiện
        khác lạ, Anh/Chị {template.data.partnerName} hãy liên hệ ngay với
        HOTLINE để được tư vấn nhanh chóng
      </Text>
      <Row alignSelf="center" gap={8}>
        <Row
          backgroundColor={GREEN_2}
          borderRadius={12}
          paddingHorizontal={8}
          paddingVertical={1}
          marginTop={8}
          onPress={handleDetails}
        >
          <Text size={12} color={"white"} weight="bold" bottom={2}>
            Chia sẻ cho người thân
          </Text>
          <Icon name="chevron-double-right" color="white" size={18} />
        </Row>
        <Row
          backgroundColor={GREEN_2}
          alignSelf="center"
          borderRadius={12}
          paddingHorizontal={8}
          paddingVertical={1}
          marginTop={8}
          onPress={navigate(ScreenKey.TAKECARE)}
        >
          <Text size={12} color={"white"} weight="bold" bottom={2}>
            Chăm sóc
          </Text>
          <Icon name="chevron-double-right" color="white" size={18} />
        </Row>
      </Row>
    </Column>
  );
}
