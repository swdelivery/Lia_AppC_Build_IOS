import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { BORDER_COLOR, NEW_BASE_COLOR } from '@Constant/Color'
import Row from '@Components/Row'
import moment from 'moment'
import { styleElement } from '@Constant/StyleElement'
import Icon from '@Components/Icon'
import HorizontalLine from '@Components/Line/HorizontalLine'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'

const CardExaminationResult = () => {
  const { navigate } = useNavigate()

  const _handleGoToDetail = useCallback(() => {
    navigate(ScreenKey.DETAIL_EXAMINATION_RESULT)()
  }, [])

  return (
    <TouchableOpacity
      onPress={_handleGoToDetail}
      activeOpacity={.7}>
      <Column
        borderColor={NEW_BASE_COLOR}
        borderRadius={8}
        borderWidth={1}>
        <Column
          paddingVertical={8}
          padding={8 * 2}>
          <Row>
            <Text
              weight='bold'
              color={'#1C5579'}
              style={styleElement.flex}>Kết quả thăm khám Mí mắt</Text>
            <Text
              color={"#4A4A4A"}
              fontStyle='italic'>
              {moment().format('HH:mm')}, {moment().format('DD/MM/YYYY')}
            </Text>
          </Row>
          <Row gap={4} marginTop={4} alignItems='flex-start'>
            <Icon top={4} size={8 * 2} color='#4A4A4A' name='map-marker' />
            <Column>
              <Text color={"#4A4A4A"}>
                Trang Beauty Center
              </Text>
              <Text size={12} fontStyle='italic' color={"#4A4A4A"}>
                434 Cao Thắng, P12, Q10, TPHCM
              </Text>
            </Column>
          </Row>
        </Column>
        <HorizontalLine />
        <Column
          alignItems='flex-end'
          paddingVertical={2}
          padding={8 * 2}>
          <Row>
            <Text
              fontStyle='italic'
              color={"#4A4A4A"}>
              Chi tiết
            </Text>
            <Icon color='#1C5579' name='chevron-right' />
          </Row>
        </Column>
      </Column>
    </TouchableOpacity>
  )
}

export default CardExaminationResult

const styles = StyleSheet.create({})
