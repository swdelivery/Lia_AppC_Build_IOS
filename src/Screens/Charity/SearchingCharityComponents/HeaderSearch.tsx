import { IconBackBlue, IconFindAroundCirle } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import AsyncStorage from '@react-native-community/async-storage'
import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useFocused, useNavigate } from 'src/Hooks/useNavigation'

type Props = {
  value: string;
  onChangeText: (value) => void;
}

const HeaderSearch = ({ value, onChangeText }: Props) => {
  const { navigation } = useNavigate()
  const RefTextInput = useRef(null)

  useFocused(() => {
    RefTextInput?.current?.focus();
  })


  const _handleOnBlur = useCallback(async () => {
    if (value.trim()?.length > 0) {
      let listHistorySearchKeyCampain = JSON.parse(
        await AsyncStorage.getItem("ListHistorySearchKeyCampain")
      );
      if (!listHistorySearchKeyCampain) {
        listHistorySearchKeyCampain = [];
      }
      let findExist = listHistorySearchKeyCampain?.find(item => item == value);
      if (findExist) return
      listHistorySearchKeyCampain.push(`${value}`);
      AsyncStorage.setItem(
        "ListHistorySearchKeyCampain",
        JSON.stringify(listHistorySearchKeyCampain)
      );
    }
  }, [value])


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
            onBlur={_handleOnBlur}
            value={value}
            onChangeText={onChangeText}
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
