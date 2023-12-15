import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment'
import Column from '@Components/Column'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import Placeholder from "@Screens/NewDetailService/Components/Placeholder"
import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import CardInfoCharity from './Components/CardInfoCharity'
import Header from './Components/Header'
import ListUsers from './Components/ListUsers'
import { IconOptions } from '@Components/Icon/Icon'

const Charity = () => {
  const [listCharity, setListCharity] = useState([1, 2, 3, 4, 5, 6])

  const _renderListHeaderFlatlist = () => {
    return (
      <Column>
        <ListUsers />
        <HorizontalLine style={styles.horizontalLine} />
        <Row
          marginTop={8} gap={8}
          paddingHorizontal={8 * 2}>
          <IconOptions width={8 * 2} height={8 * 2} />
          <Text
            color={NEW_BASE_COLOR}
            weight='bold'>
            Chiến dịch gây quỹ
          </Text>
        </Row>
      </Column>
    )
  }
  const _renderItemCardCharity = () => {
    return (
      <CardInfoCharity />
    )
  }
  return (
    <Screen
      safeBottom
      safeTop>
      <FocusAwareStatusBar barStyle='dark-content' />
      <AfterTimeoutFragment placeholder={<Placeholder />} timeout={500}>
        <Header />
        <FlatList
          contentContainerStyle={{ gap: 8 * 2 }}
          ListHeaderComponent={_renderListHeaderFlatlist}
          renderItem={_renderItemCardCharity}
          keyExtractor={(item, index) => index}
          data={listCharity}
        />
      </AfterTimeoutFragment>
    </Screen>
  )
}

export default Charity

const styles = StyleSheet.create({
  horizontalLine: {
    backgroundColor: NEW_BASE_COLOR,
    height: 4,
    marginVertical: 8
  }
})
