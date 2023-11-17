import Column from '@Components/Column'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { PRICE_ORANGE, WHITE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import ScreenKey from '@Navigation/ScreenKey'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'

const ItemBeautyInsurance = () => {

  const { navigate } = useNavigate()

  return (
    <TouchableOpacity
      onPress={navigate(ScreenKey.DETAIL_BEAUTY_INSURANCE)}>
      <Column
        style={shadow}
        backgroundColor={WHITE}
        marginBottom={0}
        borderRadius={8}
        padding={8 * 2}
        margin={8 * 2}>
        <Row gap={8 * 2} alignItems='flex-start'>
          <Image style={styles.avatar} />
          <Column gap={4} flex={1}>
            <Text weight='bold'>
              Bảo hiểm làm đẹp cá nhân
            </Text>
            <Text weight='bold' color={PRICE_ORANGE}>
              500.000 VNĐ
            </Text>
            <Text size={12}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </Text>
          </Column>
        </Row>
      </Column>
    </TouchableOpacity>
  )
}

export default ItemBeautyInsurance

const styles = StyleSheet.create({
  avatar: {
    width: _moderateScale(8 * 10),
    height: _moderateScale(8 * 10),
    borderRadius: 8,
  }
})

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
