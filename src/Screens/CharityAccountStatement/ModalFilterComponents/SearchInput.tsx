import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Column from '@Components/Column'
import Text from '@Components/Text'
import { BORDER_COLOR } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import { stylesFont } from '@Constant/Font'

const SearchInput = () => {
  return (
    <Column
      gap={8}
      marginTop={8 * 2}
      paddingHorizontal={8 * 2}>
      <Text
        weight='bold'>
        Tài khoản
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder='Tài khoản hoặc nội dung chuyển khoản' />
    </Column>
  )
}

export default SearchInput

const styles = StyleSheet.create({
  textInput: {
    padding: 0,
    paddingHorizontal: 8 * 2,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    paddingVertical: 8 * 2,
    borderRadius: 8,
    ...stylesFont.fontNolan
  }
})
