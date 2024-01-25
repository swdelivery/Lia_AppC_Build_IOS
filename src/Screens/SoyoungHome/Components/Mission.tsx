import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { _width, _widthScale } from '@Constant/Scale'
import { GREY_FOR_TITLE, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import Row from '@Components/Row'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'
import useRequireLoginCallback from 'src/Hooks/useRequireLoginAction'

const Mission = () => {
  const { navigate } = useNavigate()

  const _handleGoToDetail = useRequireLoginCallback(() => {
    navigate(ScreenKey.MISSION_FOR_NEW_USER)()
  }, [])

  return (
    <Column style={styles.container}>
      <Row
        gap={8}
        alignItems='flex-end'>
        <Column flex={1} gap={8}>
          <Text
            color={GREY_FOR_TITLE}
            weight='bold'>Nhận ngay 1 Triệu đồng</Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </Text>
        </Column>
        <Column alignItems='flex-end'>
          <TouchableOpacity
            onPress={_handleGoToDetail}
            activeOpacity={.7}>
            <Column
              paddingVertical={4}
              borderRadius={8}
              backgroundColor={NEW_BASE_COLOR}
              paddingHorizontal={8 * 2}>
              <Text
                color={WHITE}
                weight='bold'>
                Làm ngay
              </Text>
            </Column>
          </TouchableOpacity>
        </Column>
      </Row>
    </Column>
  )
}

export default Mission

const styles = StyleSheet.create({
  container: {
    width: _width - _widthScale(16) * 2,
    alignSelf: 'center',
    backgroundColor: WHITE,
    padding: 8 * 2,
    borderRadius: 8
  }
})
