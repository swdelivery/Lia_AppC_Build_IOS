import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Text from '@Components/Text'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Banner from './DonationComponents/Banner'
import { _width } from '@Constant/Scale'
import Column from '@Components/Column'
import { stylesFont } from '@Constant/Font'
import { BORDER_COLOR, GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import Row from '@Components/Row'
import Toggle from '@Components/Toggle/Toggle'
import InputMoney from './DonationComponents/InputMoney'
import InputWish from './DonationComponents/InputWish'
import TypeDonate from './DonationComponents/TypeDonate'
import ActionButton from '@Components/ActionButton/ActionButton'
import { useDispatch } from 'react-redux'
import { openModalThanks } from '@Redux/modal/actions'

const Donation = () => {
  const dispatch = useDispatch()
  const [isAnonymous, setIsAnonymous] = useState(false)

  const _handleConfirm = useCallback(() => {
    dispatch(openModalThanks({
      visible: true,
      data: {
        type: 'donation',
        price: 100000,
        name: `Hoang Oanh`,
        campainName: `Chiến dịch thiện nguyện mang nhà vệ sinh đến trẻ em mầm non vùng cao`,
        ownerName: `LiA Beauty`
      }
    }))
  }, [])

  return (
    <Screen safeBottom>
      <FocusAwareStatusBar barStyle='dark-content' />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        <Banner />
        <InputMoney />
        <Row
          gap={8}
          margin={8 * 2}>
          <Toggle
            onPress={setIsAnonymous}
            isActive={isAnonymous} />
          <Text>Tôi muốn ủng hộ giấu tên</Text>
        </Row>
        <InputWish />
        <TypeDonate />
      </ScrollView>
      <ActionButton
        onPress={_handleConfirm}
        colors={["#34759b", "#1a3e67"]}
        title='Ủng hộ' />
    </Screen>
  )
}

export default Donation

const styles = StyleSheet.create({


  content: {
  },
  contentContainer: {
    paddingBottom: 60,
  },
})
