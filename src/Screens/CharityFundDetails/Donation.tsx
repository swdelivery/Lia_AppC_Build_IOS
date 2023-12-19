import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
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

const Donation = () => {

  const [isAnonymous, setIsAnonymous] = useState(false)


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
        onPress={() => { }}
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
