import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment'
import Column from '@Components/Column'
import HorizontalLine from '@Components/Line/HorizontalLine'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import Placeholder from "@Screens/NewDetailService/Components/Placeholder"
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import CardInfoCharity from './Components/CardInfoCharity'
import Header from './Components/Header'
import ListUsers from './Components/ListUsers'
import { IconOptions } from '@Components/Icon/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { getListCampain, getListCompanionRequest } from '@Redux/charity/actions'
import { getListCampainState } from '@Redux/charity/selectors'

const Charity = () => {
  const [listCharity, setListCharity] = useState([])
  const dispatch = useDispatch()
  const { data } = useSelector(getListCampainState)

  useEffect(() => {
    dispatch(getListCampain.request())
    dispatch(getListCompanionRequest.request())
  }, [])

  const _renderListHeaderFlatlist = () => {
    return (
      <Column>
        {/* <ListUsers /> */}
        <HorizontalLine style={styles.horizontalLine} />
        <Row
          marginTop={8} gap={8}
          paddingHorizontal={8 * 2}>
          <IconOptions width={8 * 2} height={8 * 2} />
          <Text
            color={NEW_BASE_COLOR}
            weight='bold'>
            Chương trình thiện nguyện của LiA
          </Text>
        </Row>
      </Column>
    )
  }
  const _renderItemCardCharity = ({ item, index }) => {
    return (
      <CardInfoCharity data={item} />
    )
  }

  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );
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
          keyExtractor={_awesomeChildListKeyExtractor}
          data={data}
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
