import { Alert, FlatList, Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import Screen from '@Components/Screen'
import LiAHeader from '@Components/Header/LiAHeader'
import { GREY, GREY_FOR_TITLE, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { FocusAwareStatusBar, StatusBar } from '@Components/StatusBar'
import Row from '@Components/Row'
import Text from '@Components/Text'
import Icon from '@Components/Icon'
import { styleElement } from '@Constant/StyleElement'
import { _width } from '@Constant/Scale'
import Spacer from '@Components/Spacer'
import Column from '@Components/Column'
import CardRefund from './Components/CardRefund'
import useItemExtractor from 'src/Hooks/useItemExtractor'
import CalendarFilterRange from '@Components/CalendarPickMulti/CalendarPickMulti'
import CalendarPickRange from '@Components/CalendarPickRange/CalendarPickRange'
import useVisible from 'src/Hooks/useVisible'

const Refund = () => {
  const [listData, setListData] = useState([12, 3, 3, 4, 5, 6, 67, 7, 47])
  const calendarRangePicker = useVisible()

  const _handleOnConfirm = useCallback((dataDate) => {
    console.log({ dataDate });
  }, [])

  const _renderRight = useMemo(() => {
    return (
      <Row
        onPress={calendarRangePicker.show}
        gap={8}
        top={-12}
        right={8 * 4}
        width={8 * 10}
        position='absolute'>
        <Text fontStyle='italic'>
          1/24 - 2/24
        </Text>
        <Icon name='calendar' />
      </Row>
    )
  }, [])

  const _renderItem = useCallback(() => {
    return (
      <CardRefund />
    )
  }, [])
  const { keyExtractor } = useItemExtractor<any>((item) => item._id);

  return (
    <Screen style={styleElement.flex}>
      <StatusBar barStyle='dark-content' />
      <LiAHeader
        bg={WHITE}
        titleColor={GREY_FOR_TITLE}
        right={_renderRight}
        safeTop title='Hoàn tiền' />
      <Spacer top={8} />
      <Image
        resizeMode='contain'
        style={styles.bgRefund}
        source={require('../../NewImage/Refund/bgRefund.png')} />

      <Column margin={8 * 2}>
        <Text
          size={16}
          weight='bold'
          color={GREY_FOR_TITLE}>
          Lịch sử hoàn tiền
        </Text>
      </Column>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 8 * 2, gap: 8 * 2, paddingBottom: 8 * 4 }}
        keyExtractor={keyExtractor}
        renderItem={_renderItem}
        data={listData} />

      <CalendarPickRange
        onConfirm={_handleOnConfirm}
        visible={calendarRangePicker} />
    </Screen>
  )
}

export default Refund

const styles = StyleSheet.create({
  bgRefund: {
    width: _width - 8 * 4,
    height: (_width - 8 * 4) * 9 / 19,
    alignSelf: 'center',
  }
})
