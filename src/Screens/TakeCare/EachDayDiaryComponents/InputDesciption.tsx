import { StyleSheet, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { BORDER_COLOR, GREY_FOR_TITLE, WHITE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'

const InputDesciption = ({ disabledEdit, dataFetch, setDataFetch }) => {
  const [value, setValue] = useState('')

  const _handleOnBlur = useCallback(() => {
    setDataFetch(old => {
      return {
        ...old,
        description: value
      }
    })
  }, [value])

  useEffect(() => {
    if (dataFetch?.description) {
      setValue(dataFetch?.description)
    }
  }, [dataFetch?.description])

  return (
    <Column gap={8}>
      <Text
        color={GREY_FOR_TITLE}
        weight='bold'>
        Ghi chú cho bác sĩ
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          onBlur={_handleOnBlur}
          editable={disabledEdit ? false : true}
          value={value}
          onChangeText={setValue}
          placeholder={"Nhập ghi chú"}
          multiline />
      </View>
    </Column>
  )
}

export default InputDesciption

const styles = StyleSheet.create({
  inputContainer: {
    minHeight: _moderateScale(8 * 10),
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: _moderateScale(8),
    padding: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 1.5),
    backgroundColor: WHITE
  },
})
