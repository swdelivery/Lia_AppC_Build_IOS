import Column from '@Components/Column'
import Text from '@Components/Text'
import { BORDER_COLOR } from '@Constant/Color'
import { stylesFont } from '@Constant/Font'
import { selectSearchValue } from '@Redux/charity/actions'
import { getDataFilterReportState } from '@Redux/charity/selectors'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const SearchInput = () => {
  const { search } = useSelector(getDataFilterReportState)
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const _handleBlur = useCallback(() => {
    dispatch(selectSearchValue(value))
  }, [value])

  useEffect(() => {
    setValue(search)
  }, [search])

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
        onBlur={_handleBlur}
        value={value}
        onChangeText={setValue}
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
