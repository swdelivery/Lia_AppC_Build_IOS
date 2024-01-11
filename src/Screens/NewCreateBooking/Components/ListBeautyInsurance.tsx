import Column from '@Components/Column'
import { IconPlusBase } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, PRICE_ORANGE } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import ScreenKey from '@Navigation/ScreenKey'
import { getDataCreateBookingState } from '@Redux/booking/selectors'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'
import ItemInsurance from "./ItemInsurance";

type Props = {
  onPress: (item) => void;
};

const ListBeautyInsurance = ({ onPress }: Props) => {
  const { navigate } = useNavigate();

  const { dataInsurance } = useSelector(getDataCreateBookingState);

  return (
    <View>
      <Row marginHorizontal={8 * 2} justifyContent="space-between">
        <Text size={14} weight="bold">
          Bảo hiểm làm đẹp{" "}
        </Text>

        <TouchableOpacity hitSlop={styleElement.hitslopSm} onPress={onPress}>
          <IconPlusBase width={8 * 2} height={8 * 2} />
        </TouchableOpacity>
      </Row>
      {dataInsurance?.map((item, index) => {
        return <ItemInsurance item={item} key={index} />;
      })}
    </View>
  );
};

export default ListBeautyInsurance

const styles = StyleSheet.create({})
