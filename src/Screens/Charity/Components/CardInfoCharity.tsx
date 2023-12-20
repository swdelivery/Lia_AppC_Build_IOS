import Column from '@Components/Column'
import HorizontalProgress from '@Components/HoriontalProgress'
import { IconVerify } from '@Components/Icon/Icon'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { formatMonney } from '@Constant/Utils'
import ScreenKey from '@Navigation/ScreenKey'
import { Campain } from '@typings/charity'
import moment from 'moment'
import React, { useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'


type Props = {
  data: Campain
}

const CardInfoCharity = ({ data }: Props) => {
  const { navigate } = useNavigate()
  const { name, createBy, fundTarget, fundCurrent, avatar, endDate } = data

  const percent = useMemo(() => {
    return parseFloat((fundCurrent / fundTarget * 100).toFixed(2))
  }, [fundTarget, fundCurrent])

  const dayLeft = useMemo(() => {
    return moment(endDate).diff(moment(), 'days')
  }, [endDate])

  return (
    <Column
      backgroundColor={"#F6F6F6"}
      borderColor={BORDER_COLOR}
      borderRadius={8 * 2}
      marginHorizontal={8 * 2}
      borderWidth={1}
      padding={8}>
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
          {dayLeft} Ngày
        </Text>
      </Column>
      <TouchableOpacity onPress={navigate(ScreenKey.CHARITY_FUND_DETAILS)}>
        <Row gap={8}>
          <Image
            avatar={avatar}
            style={styles.image} />
          <Column flex={1}>
            <Text
              weight='bold'
              numberOfLines={2}>
              {name}
            </Text>
            <Row flex={1} gap={4}>
              <Text>
                Tạo bởi
              </Text>
              <Text
                weight='bold'
                color={NEW_BASE_COLOR}
                numberOfLines={1}>
                {createBy}
              </Text>
              <IconVerify width={8 * 2} height={8 * 2} />
            </Row>
            <Column gap={4}>
              <HorizontalProgress height={4} percent={percent} />
              <Row justifyContent='space-between'>
                <Row gap={4}>
                  <Text>
                    Đạt
                  </Text>
                  <Text
                    color={NEW_BASE_COLOR}
                    weight='bold'>
                    {formatMonney(fundTarget)} VNĐ
                  </Text>
                </Row>
                <Text
                  color={NEW_BASE_COLOR}
                  weight='bold'>
                  {percent}%
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
    borderRadius: 8
  }
})
