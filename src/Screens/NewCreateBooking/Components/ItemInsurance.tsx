import Column from "@Components/Column";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BASE_COLOR, BORDER_COLOR, PRICE_ORANGE } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { Insurance } from "@typings/insurance";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  item: Insurance;
};

export default function ItemInsurance({ item }: Props) {
  const { navigate } = useNavigate();
  return (
    <TouchableOpacity
      onPress={navigate(ScreenKey.DETAIL_BEAUTY_INSURANCE, {
        insurance: item,
      })}
    >
      <Column
        gap={4}
        borderRadius={8}
        borderWidth={1}
        borderColor={BORDER_COLOR}
        padding={8 * 2}
        marginTop={8 * 2}
        marginHorizontal={8 * 2}
      >
        <Row justifyContent="space-between">
          <Text flex={1} weight="bold" color={BASE_COLOR}>
            {item?.name}
          </Text>
          <Text weight="bold" color={PRICE_ORANGE}>
            {formatMonney(item?.price)} VNĐ
          </Text>
        </Row>
        <Text numberOfLines={3} top={4}>
          {item?.description}
        </Text>
      </Column>
    </TouchableOpacity>
  );
}
