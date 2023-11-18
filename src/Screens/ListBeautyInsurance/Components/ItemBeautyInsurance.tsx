import Column from '@Components/Column'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { PRICE_ORANGE, WHITE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { Insurance } from "@typings/insurance";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  item: Insurance;
};

const ItemBeautyInsurance = ({ item }: Props) => {
  const { navigate } = useNavigate();

  return (
    <TouchableOpacity
      onPress={navigate(ScreenKey.DETAIL_BEAUTY_INSURANCE, {
        insurance: item,
      })}
    >
      <Column
        style={shadow}
        backgroundColor={WHITE}
        marginBottom={0}
        borderRadius={8}
        padding={8 * 2}
        margin={8 * 2}
      >
        <Row gap={8 * 2} alignItems="flex-start">
          <Image auto style={styles.avatar} avatar={item.avatar} />
          <Column gap={4} flex={1}>
            <Text weight="bold">{item.name}</Text>
            <Text weight="bold" color={PRICE_ORANGE}>
              {`${formatMonney(item.price)} VNĐ`}
            </Text>
            <Text size={12} numberOfLines={5}>
              {item.description}
            </Text>
          </Column>
        </Row>
      </Column>
    </TouchableOpacity>
  );
};

export default ItemBeautyInsurance;

const styles = StyleSheet.create({
  avatar: {
    width: _moderateScale(8 * 10),
    borderRadius: 8,
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1,

  elevation: 2
}
