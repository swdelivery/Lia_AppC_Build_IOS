import { IconBackBlue, IconFindAroundCirle } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import React, { useRef } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useFocused, useNavigate } from 'src/Hooks/useNavigation'

const HeaderSearch = () => {
  const { navigation, navigate } = useNavigate()
  const RefTextInput = useRef(null)

  useFocused(() => {
    RefTextInput?.current?.focus();
  })

  return (
    <Row
      justifyContent='space-between'
      paddingVertical={8}
      paddingTop={0}
      paddingHorizontal={8 * 2}>
      <Row gap={8 * 2}>
        <TouchableOpacity
          onPress={navigation.goBack}
          hitSlop={styleElement.hitslopSm}>
          <IconBackBlue />
        </TouchableOpacity>
        <Row
          gap={8}
          backgroundColor={"#ECECEC"}
          paddingVertical={8}
          flex={1}
          borderRadius={8 * 3}
          paddingHorizontal={8 * 2}>
          <IconFindAroundCirle width={8 * 3} height={8 * 3} />
          <TextInput
            style={{ padding: 0, flex: 1 }}
            ref={RefTextInput}
            placeholder='Tìm kiếm chiến dịch...' />
        </Row>
        <TouchableOpacity>
          <Text
            color={NEW_BASE_COLOR}
            weight='bold'>
            Tìm kiếm
          </Text>
        </TouchableOpacity>
      </Row>
    </Row>
  )
}

export default HeaderSearch

const styles = StyleSheet.create({})
