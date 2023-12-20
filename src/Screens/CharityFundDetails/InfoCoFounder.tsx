import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import Screen from '@Components/Screen'
import Spacer from '@Components/Spacer'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { BACKGROUND_COLOR, NEW_BASE_COLOR } from '@Constant/Color'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import CardCampaign from './InfoCoFounderComponents/CardCampaign'
import InfoPerson from './InfoCoFounderComponents/InfoPerson'
import Quotes from './InfoCoFounderComponents/Quotes'
import Report from './InfoCoFounderComponents/Report'

const InfoCoFounder = () => {
  return (
    <Screen
      safeBottom
      backgroundColor={BACKGROUND_COLOR}>
      <FocusAwareStatusBar barStyle='light-content' />
      <LiAHeader
        bg={NEW_BASE_COLOR}
        safeTop
        title='Chiến dịch đồng hành' />
      <ScrollView>
        <InfoPerson />
        <Quotes />
        <Report />

        <Column
          marginTop={8 * 2}
          gap={8 * 2}
          marginHorizontal={8 * 2}>
          <Text weight='bold' color={NEW_BASE_COLOR}>
            Chiến dịch đang đồng hành
          </Text>
          <CardCampaign />
          <CardCampaign />
          <CardCampaign />
        </Column>

        <Spacer top={100} />
      </ScrollView>

    </Screen>
  )
}

export default InfoCoFounder

const styles = StyleSheet.create({
})
