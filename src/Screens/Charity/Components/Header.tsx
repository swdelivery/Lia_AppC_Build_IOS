import { IconBackBlue, IconFindAroundCirle, IconLogoCharity, IconProfileAroundCirle } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'

const Header = () => {
  const { navigation, navigate } = useNavigate()
  return (
    <Row
      justifyContent='space-between'
      paddingVertical={8}
      paddingHorizontal={8 * 2}>
      <Row gap={8 * 2}>
        <TouchableOpacity
          onPress={navigation.goBack}
          hitSlop={styleElement.hitslopSm}>
          <IconBackBlue />
        </TouchableOpacity>
        <IconLogoCharity width={8 * 3} height={8 * 3} />
        <Text
          weight='bold'
          color={NEW_BASE_COLOR}
          size={16}>
          Phụng sự
        </Text>
      </Row>
      <Row gap={8 * 2}>
        <TouchableOpacity
          onPress={navigate(ScreenKey.SEARCHING_CHARITY)}
          hitSlop={styleElement.hitslopSm}>
          <IconFindAroundCirle width={8 * 3} height={8 * 3} />
        </TouchableOpacity>
        <IconProfileAroundCirle width={8 * 3} height={8 * 3} />
      </Row>
    </Row>
  )
}

export default Header

const styles = StyleSheet.create({})
