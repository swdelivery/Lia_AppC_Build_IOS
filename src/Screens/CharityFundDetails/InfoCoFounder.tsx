import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import LiAHeader from '@Components/Header/LiAHeader'
import { BACKGROUND_COLOR, BORDER_COLOR, GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import InfoPerson from './InfoCoFounderComponents/InfoPerson'
import Column from '@Components/Column'
import Row from '@Components/Row'
import HorizontalLine from '@Components/Line/HorizontalLine'
import { IconFilter, IconFindGrey } from '@Components/Icon/Icon'
import Icon from '@Components/Icon'
import { styleElement } from '@Constant/StyleElement'
import Quotes from './InfoCoFounderComponents/Quotes'
import Report from './InfoCoFounderComponents/Report'
import CardCampaign from './InfoCoFounderComponents/CardCampaign'
import BlankView from '@Components/BlankView/BlankView'

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

        <BlankView height={100} />
      </ScrollView>

    </Screen>
  )
}

export default InfoCoFounder

const styles = StyleSheet.create({
})
