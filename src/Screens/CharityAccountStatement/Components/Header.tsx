import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Column from '@Components/Column'
import { _width } from '@Constant/Scale'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styleElement } from '@Constant/StyleElement'
import { IconBackBlue } from '@Components/Icon/Icon'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { useNavigate } from 'src/Hooks/useNavigation'

const Header = () => {
  const { top } = useSafeAreaInsets()
  const { navigation } = useNavigate()

  return (
    <Column
      width={_width}
      alignItems='center'
      top={top + 8 * 2}
      zIndex={10}
      position='absolute'>
      <Column
        left={8 * 2}
        position='absolute'>
        <TouchableOpacity
          onPress={navigation.goBack}
          hitSlop={styleElement.hitslopSm}>
          <IconBackBlue />
        </TouchableOpacity>
      </Column>
      <Text
        size={16}
        color={NEW_BASE_COLOR}
        weight='bold'>
        Chi tiết sao kê
      </Text>
    </Column>
  )
}

export default Header

const styles = StyleSheet.create({})
