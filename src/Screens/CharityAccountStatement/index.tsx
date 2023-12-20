import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { FONT_WEIGHTS } from '@Components/Text'
import { WHITE } from '@Constant/Color'
import { _heightScale, _width } from '@Constant/Scale'
import ScrollableTabView from "@itenl/react-native-scrollable-tabview"
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Banner from './Components/Banner'
import Header from './Components/Header'
import MoneyIn from './Components/MoneyIn'
import MoneyOut from './Components/MoneyOut'
import StickyHeader from './Components/StickyHeader'

const CharityAccountStatement = () => {
  const [rootTime, setRootTime] = useState(Date.now());
  const scrollableTabViewRef = useRef();
  const { top } = useSafeAreaInsets()
  const [currIndexTab, setCurrIndexTab] = useState(0)

  useEffect(() => {
    scrollableTabViewRef?.current?.toTabView(currIndexTab)
  }, [currIndexTab])

  const STACKS = [
    {
      screen: () => {
        return <MoneyIn />
      },
      tabLabel: "Thu",
    },
    {
      screen: () => {
        return <MoneyOut />
      },
      tabLabel: "Chi",
    },
  ];

  return (
    <Screen>
      <FocusAwareStatusBar barStyle='dark-content' />
      <Header />

      <ScrollableTabView
        tabsShown={false}
        stickyHeader={
          <StickyHeader
            showFilterIcon
            setCurrIndexTab={setCurrIndexTab}
            currIndexTab={currIndexTab} />
        }
        title={<View style={{ width: _width, height: '100%', backgroundColor: WHITE }} />}
        titleArgs={{
          interpolateHeight: {
            inputRange: [0, 300 + top],
            outputRange: [0, 55 + top],
            extrapolate: "clamp",
          },
        }}
        mappingProps={{
          rootTime: rootTime,
        }}
        stacks={STACKS}
        ref={(it) => (scrollableTabViewRef.current = it)}
        header={<Banner />}
        tabsStyle={styles.tabsStyle}
        tabStyle={styles.tabStyle}
        tabsEnableAnimated={true}
        tabInnerStyle={styles.tabInnerStyle}
        tabActiveOpacity={1}
        tabUnderlineStyle={styles.tabUnderlineStyle}
        textStyle={styles.textStyle}
        textActiveStyle={styles.textActiveStyle}
        firstIndex={0}
        toTabsOnTab={true}
        oneTabHidden={true}
        enableCachePage={true}
        onTabviewChanged={setCurrIndexTab}
      />
    </Screen>
  )
}

export default CharityAccountStatement

const styles = StyleSheet.create({
  imageBackground: {
    width: _width,
    height: _heightScale(300)
  },
  tabsStyle: {
    height: 8 * 5,
    backgroundColor: "white",
    borderBottomColor: "grey",
    // borderBottomWidth: 1,
  },
  tabStyle: {
    backgroundColor: "white",
    width: _width / 4.25,
  },
  textStyle: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: FONT_WEIGHTS["bold"],
  },
  tabUnderlineStyle: {
    backgroundColor: "#4BA888",
    top: 8 * 4,
    height: 3,
  },
  searchContainer: {
    position: "absolute",
    zIndex: 1,
    alignItems: "center",
    width: _width,
  },
  tabInnerStyle: { width: "100%" },
  textActiveStyle: {
    color: "#4BA888",
    fontWeight: "bold",
  },
})
