import Column from '@Components/Column'
import LiAHeader from '@Components/Header/LiAHeader'
import Screen from '@Components/Screen'
import Spacer from '@Components/Spacer'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { _heightScale, _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { getInfoUserReducer } from '@Redux/Selectors'
import { getPartnerLevel, setCurrPartnerLevel } from '@Redux/affiliate/actions'
import { getCurrPartnerLevelState, getListPartnerLevelState } from '@Redux/affiliate/selectors'
import React, { useCallback, useEffect } from 'react'
import { FlatList, ImageBackground, ScrollView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CardLevel from './Components/CardLevel'
import InfoUser from './Components/InfoUser'

const WIDTH_CARD = _width - 8 * 4;
const WIDTH_PROCESS_BAR = (_width - 8 * 4) - 8 * 4;

const NewAffiliate = () => {
  const dispatch = useDispatch()
  const { data: listPartnerLevel } = useSelector(getListPartnerLevelState)
  const { data: currPartnerLevel } = useSelector(getCurrPartnerLevelState)
  const { infoUser } = useSelector(getInfoUserReducer);

  useEffect(() => {
    dispatch(getPartnerLevel.request())
  }, [])

  useEffect(() => {
    let findCurrPartnerLevel = listPartnerLevel.find((item) => item?.code == infoUser?.levelCode);
    if (findCurrPartnerLevel) {
      dispatch(setCurrPartnerLevel(findCurrPartnerLevel))
    }
  }, [listPartnerLevel, infoUser])

  const _renderItem = useCallback(({ item }) => {

    return (
      <Column
        alignItems='center'
        width={_width}>
        <CardLevel data={item} />
      </Column>
    )
  }, [currPartnerLevel, listPartnerLevel])

  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  return (
    <Screen>
      <FocusAwareStatusBar barStyle='light-content' />
      <ImageBackground
        resizeMode={'stretch'}
        style={styleElement.flex}
        source={require('../../NewImage/Affiliate/background.png')}>

        <LiAHeader
          safeTop
          bg={'transparent'}
          title='TRI   ÂN' />

        <ScrollView>
          <InfoUser />
          <Spacer top={_heightScale(8 * 6)} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={_awesomeChildListKeyExtractor}
            horizontal
            renderItem={_renderItem}
            data={listPartnerLevel} />
        </ScrollView>

      </ImageBackground>
    </Screen>
  )
}

export default NewAffiliate

const styles = StyleSheet.create({
  card: {
    width: WIDTH_CARD,
    height: WIDTH_CARD * 796 / 1484
  }
})
