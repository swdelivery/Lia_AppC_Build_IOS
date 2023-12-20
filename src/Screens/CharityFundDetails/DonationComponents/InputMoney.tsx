import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import { stylesFont } from '@Constant/Font'
import { BORDER_COLOR, GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import Row from '@Components/Row'

const InputMoney = () => {
  const [valueMoney, setValueMoney] = useState('')

  const _handleOnchangeText = (value) => {
    setValueMoney(value.split('.').join("").toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  }

  const _handleSetMoney = useCallback((value) => () => {
    console.log({ value });
    setValueMoney(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  }, [valueMoney])

  return (
    <Column>
      <Column top={-8 * 2}>
        <Column marginLeft={8 * 2}>
          <Text>
            Nhập số tiền ủng hộ
          </Text>
        </Column>
      </Column>

      <Column
        marginHorizontal={8 * 2}
        justifyContent='center'>
        <TextInput
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
        marginTop={8 * 2}
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
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    color: NEW_BASE_COLOR,
    fontSize: 16,
    paddingRight: 8 * 3,
    backgroundColor: WHITE
  }
})
