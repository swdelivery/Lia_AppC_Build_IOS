import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, GREY, NEW_BASE_COLOR, RED, WHITE } from '@Constant/Color'
import { stylesFont } from '@Constant/Font'
import { selectAmount } from '@Redux/charity/actions'
import React, { useCallback, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

const InputMoney = () => {
  const dispatch = useDispatch()
  const [valueMoney, setValueMoney] = useState('')

  const _handleOnchangeText = (value) => {
    setValueMoney(value.split('.').join("").toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  }

  const _handleOnBlur = useCallback(() => {
    dispatch(selectAmount(valueMoney))
  }, [valueMoney])

  const _handleSetMoney = useCallback((value) => () => {
    dispatch(selectAmount(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")))
    setValueMoney(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  }, [valueMoney])

  return (
    <Column
      gap={8 * 2}
      marginTop={8 * 2}>
      <Column >
        <Column marginLeft={8 * 2}>
          <Text>
            Nhập số tiền ủng hộ <Text weight='bold' color={RED}>*</Text>
          </Text>
        </Column>
      </Column>

      <Column
        marginHorizontal={8 * 2}
        justifyContent='center'>
        <TextInput
          onBlur={_handleOnBlur}
          value={valueMoney}
          onChangeText={_handleOnchangeText}
          keyboardType='number-pad'
          style={[styles.textInput, stylesFont.fontNolanBold]}
          placeholder='0' />
        <Text
          color={GREY}
          weight='bold'
          style={styles.absoluteText}>
          VND
        </Text>
      </Column>

      <Row
        marginTop={8 * 1}
        paddingHorizontal={8 * 2}
        gap={8}>
        <TouchableOpacity
          onPress={_handleSetMoney(50000)}
          style={styles.btnPercent}>
          <Text
            color={"#888888"}
            weight='bold'>
            50.000
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_handleSetMoney(100000)}
          style={styles.btnPercent}>
          <Text
            color={"#888888"}
            weight='bold'>
            100.000
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_handleSetMoney(200000)}
          style={styles.btnPercent}>
          <Text
            color={"#888888"}
            weight='bold'>
            200.000
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_handleSetMoney(500000)}
          style={styles.btnPercent}>
          <Text
            color={"#888888"}
            weight='bold'>
            500.000
          </Text>
        </TouchableOpacity>
      </Row>
    </Column>
  )
}

export default InputMoney

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
    paddingVertical: 8 * 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    color: NEW_BASE_COLOR,
    fontSize: 18,
    paddingRight: 8 * 3,
    backgroundColor: WHITE
  }
})
