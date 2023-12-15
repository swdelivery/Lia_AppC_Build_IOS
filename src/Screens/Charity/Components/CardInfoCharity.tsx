import Column from '@Components/Column'
import HorizontalProgress from '@Components/HoriontalProgress'
import { IconVerify } from '@Components/Icon/Icon'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import ScreenKey from '@Navigation/ScreenKey'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'

const CardInfoCharity = () => {
  const { navigate } = useNavigate()

  return (
    <Column
      borderColor={BORDER_COLOR}
      borderRadius={8}
      marginHorizontal={8 * 2}
      borderWidth={1}
      padding={8 * 2}>
      <Column
        top={8 * 3}
        borderTopRightRadius={4}
        borderBottomRightRadius={4}
        zIndex={1}
        paddingHorizontal={8}
        paddingVertical={2}
        backgroundColor={NEW_BASE_COLOR}
        position='absolute'>
        <Text
          color={WHITE}
          size={10}>
          420 Ngày
        </Text>
      </Column>
      <TouchableOpacity onPress={navigate(ScreenKey.CHARITY_FUND_DETAILS)}>
        <Row gap={8}>
          <Image style={styles.image} />
          <Column flex={1}>
            <Text
              weight='bold'
              numberOfLines={2}>
              Chiến dịch thiện nguyện mang nhà vệ sinh đến trẻ em mầm non các vùng núi phía Bắc
            </Text>
            <Row flex={1} gap={4}>
              <Text>
                Tạo bởi
              </Text>
              <Text
                weight='bold'
                color={NEW_BASE_COLOR}
                numberOfLines={1}>
                Quỹ thiện nguyện LiA
              </Text>
              <IconVerify width={8 * 2} height={8 * 2} />
            </Row>
            <Column gap={4}>
              <HorizontalProgress height={4} percent={80} />
              <Row justifyContent='space-between'>
                <Row gap={4}>
                  <Text>
                    Đạt
                  </Text>
                  <Text
                    color={NEW_BASE_COLOR}
                    weight='bold'>
                    100.000.000 VNĐ
                  </Text>
                </Row>
                <Text
                  color={NEW_BASE_COLOR}
                  weight='bold'>
                  80%
                </Text>
              </Row>
            </Column>
          </Column>
        </Row >
      </TouchableOpacity >
    </Column >
  )
}

export default CardInfoCharity

const styles = StyleSheet.create({
  containerLinear: {
    width: 200,
    height: 4
  },
  containerProcessBar: {
    height: 4,
    backgroundColor: '#E8E8E8',
    borderRadius: 4
  },
  image: {
    width: 8 * 12,
    height: 8 * 12,
    borderRadius: 4
  }
})
