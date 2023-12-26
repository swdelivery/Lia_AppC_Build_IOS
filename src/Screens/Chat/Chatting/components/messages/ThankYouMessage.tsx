import React, { useCallback } from "react";
import { Message, TemplateData } from "@typings/chat";
import Column from "@Components/Column";
import Icon from "@Components/Icon";
import { GREEN, GREEN_2, GREEN_SUCCESS } from "@Constant/Color";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import { formatMonney } from "@Constant/Utils";

type Props = {
  template: TemplateData;
};

export default function ThankYouMessage({ template }: Props) {
  const { navigation } = useNavigate();

  const handleDetails = useCallback(() => {
    // @ts-ignore
    navigation.navigate(ScreenKey.CHARITY_FUND_DETAILS, {
      campain: {
        _id: template.data.volunteerId,
      },
    });
  }, [template]);

  return (
    <Column paddingHorizontal={16} paddingVertical={8} gap={8}>
      <Text
        weight="bold"
        size={12}
      >{`CÁM ƠN BẠN ĐÃ ĐÓNG GÓP CHO DỰ ÁN "${template.data.volunteerName.toUpperCase()}"`}</Text>
      <Text size={12}>
        <Icon name="leaf" color={GREEN_SUCCESS} size={18} /> Chân thành cám ơn
        <Text weight="bold" size={12}>
          {` Anh/Chị ${template.data.partnerName} `}
        </Text>
        đã tin tưởng sử dụng dịch vụ tại LiA và đóng góp
        <Text weight="bold" size={12}>
          {` ${formatMonney(template.data.amount, true)} `}
        </Text>
        cho Dự án
        <Text weight="bold" size={12}>
          {` ${template.data.volunteerName} `}
        </Text>
      </Text>
      <Text size={12}>
        <Icon name="leaf" color={GREEN_SUCCESS} size={18} /> Đây là một nghĩa cử
        vô cùng cao đẹp góp phần động viên, chia sẻ và giúp đỡ các hoàn cảnh khó
        khăn ở khắp Việt Nam.
      </Text>
      <Text size={12}>
        <Icon name="leaf" color={GREEN_SUCCESS} size={18} /> LiA xin hứa sẽ quản
        lý, sử dụng số tiền trên đúng mục đích, đúng đối tượng, thiết thực và
        hiệu quả. Hy vọng sẽ tiếp tục nhận được sự giúp đỡ và huỏng ứng nhiệt
        tình của Anh/Chị {template.data.partnerName} trong các dự án thiện
        nguyện tiếp theo.
      </Text>
      <Row
        backgroundColor={GREEN_2}
        alignSelf="center"
        borderRadius={12}
        paddingHorizontal={8}
        paddingVertical={1}
        marginTop={8}
        onPress={handleDetails}
      >
        <Text size={12} color={"white"} weight="bold" bottom={2}>
          XEM THÊM VỀ DỰ ÁN
        </Text>
        <Icon name="chevron-double-right" color="white" size={18} />
      </Row>
    </Column>
  );
}
