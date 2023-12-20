import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { stylesFont } from '@Constant/Font'
import { BORDER_COLOR, GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import Row from '@Components/Row'
import { useDispatch } from 'react-redux'
import { selectDescription } from '@Redux/charity/actions'

const InputWish = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const _handleOnchangeText = (value) => {
    setValue(value)
  }

  const _handleOnBlur = useCallback(() => {
    dispatch(selectDescription(value))
  }, [value])

  return (
    <Column
      marginTop={8 * 2}
      gap={8 * 1.5}>
      <Column marginLeft={8 * 2}>
        <Text>
          Lời chúc
        </Text>
      </Column>
      <Column
        marginHorizontal={8 * 2}
        justifyContent='center'>
        <TextInput
          value={value}
          onBlur={_handleOnBlur}
          onChangeText={_handleOnchangeText}
          style={[styles.textInput, stylesFont.fontNolan]}
          placeholder='Cùng nhau trao gửi những lời yêu thương' />
      </Column>
    </Column>
  )
}

export default InputWish

const styles = StyleSheet.create({
  btnPercent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#D9D9D9'
  },
  absoluteText: {
    position: 'absolute',
    right: 8 * 2
  },
  textInput: {
    padding: 0,
    paddingHorizontal: 8 * 2,
    paddingVertical: 8 * 1.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    paddingRight: 8 * 3,
    backgroundColor: WHITE
  }
})
