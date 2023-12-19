import ActionButton from "@Components/ActionButton/ActionButton"
import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { BACKGROUND_COLOR, BORDER_COLOR, GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { stylesFont } from '@Constant/Font'
import { formatMonney } from '@Constant/Utils'
import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

const Companion = () => {
  const [goalMoney, setGoalMoney] = useState(420000000)
  const [valueMoney, setValueMoney] = useState('')

  const _handleOnchangeText = (value) => {
    setValueMoney(value.split('.').join("").toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  }

  const _handleSetMoneyByPercent = useCallback((percent) => () => {
    let money = goalMoney * percent / 100;
    setValueMoney(money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  }, [goalMoney])

  return (
    <Screen
      safeBottom
      backgroundColor={BACKGROUND_COLOR}>
      <FocusAwareStatusBar barStyle='light-content' />
      <LiAHeader
        safeTop
        bg={NEW_BASE_COLOR}
        title='Đăng kí đồng hành gây quỹ' />
      <ScrollView>
        <Column
          gap={8 * 2}
          alignItems='center'>
          <Column
            marginTop={8 * 2}
            alignSelf='center'>
            <Text
              weight='bold'>
              Đồng hành cùng
            </Text>
          </Column>

          <Avatar
            size={8 * 8}
            avatar={null} />

          <Text
            color={NEW_BASE_COLOR}
            weight='bold'>
            QUỸ THIỆN NGUYỆN SINH VIÊN
          </Text>

          <Column
            gap={4}
            marginHorizontal={8 * 2}
            alignItems='center'>
            <Text fontStyle='italic'>
              Trong chiến dịch
            </Text>

            <Text
              weight='bold'
              style={{ textAlign: 'center' }}>
              "Chiến dịch thiện nguyện mang nhà vệ sinh đến trẻ em vùng cao!"
            </Text>

            <Row gap={4}>
              <Text>
                Với mục tiêu
              </Text>
              <Text weight='bold' color={NEW_BASE_COLOR}>
                {formatMonney(goalMoney)} VND
              </Text>
            </Row>
          </Column>
        </Column>

        <Column
          gap={8}
          marginTop={8 * 2}
          paddingHorizontal={8 * 2}>
          <Text weight='bold'>
            Mục tiêu kêu gọi đồng hành
          </Text>
          <Text color={GREY}>
            Nhập số tiền kêu gọi đồng hành
          </Text>

          <Column
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

          <Row gap={8}>
            <TouchableOpacity
              onPress={_handleSetMoneyByPercent(5)}
              style={styles.btnPercent}>
              <Text weight='bold'>
                5%
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={_handleSetMoneyByPercent(10)}
              style={styles.btnPercent}>
              <Text weight='bold'>
                10%
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={_handleSetMoneyByPercent(15)}
              style={styles.btnPercent}>
              <Text weight='bold'>
                15%
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={_handleSetMoneyByPercent(20)}
              style={styles.btnPercent}>
              <Text weight='bold'>
                20%
              </Text>
            </TouchableOpacity>
          </Row>
        </Column>

      </ScrollView>
      <ActionButton
        colors={["#34759b", "#1a3e67"]}
        onPress={() => { }}
        title="Đăng ký"
      />
    </Screen>
  )
}

export default Companion

const styles = StyleSheet.create({
  btnPercent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: WHITE
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
