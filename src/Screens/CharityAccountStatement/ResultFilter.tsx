import LiAHeader from '@Components/Header/LiAHeader'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import { FONT_WEIGHTS } from '@Components/Text'
import { NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { _heightScale, _width } from '@Constant/Scale'
import { getVolunteerReportHistoryFilter } from '@Redux/charity/actions'
import { getDataFilterReportState } from '@Redux/charity/selectors'
import ScrollableTabView from "@itenl/react-native-scrollable-tabview"
import { isEmpty } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import StickyHeader from './Components/StickyHeader'
import Banner from './ResultFilterComponents/Banner'
import HistoryCashIn from './ResultFilterComponents/HistoryCashIn'
import HistoryCashOut from './ResultFilterComponents/HistoryCashOut'

const ResultFilter = () => {
  const dispatch = useDispatch()
  const [currIndexTab, setCurrIndexTab] = useState(0)
  const [rootTime, setRootTime] = useState(Date.now());
  const scrollableTabViewRef = useRef();

  const {
    volunteerId,
    search,
    dateFrom,
    dateTo,
    paymentMethodCode,
    depositAmount
  } = useSelector(getDataFilterReportState)

  useEffect(() => {
    scrollableTabViewRef?.current?.toTabView(currIndexTab)
  }, [currIndexTab])

  useEffect(() => {

    let condition = {
      volunteerId: { equal: volunteerId },
    }
    if (!isEmpty(dateFrom) && !isEmpty(dateTo)) {
      condition['created'] = {
        from: dateFrom,
        to: dateTo
      }
    }
    if (!isEmpty(paymentMethodCode) && !paymentMethodCode.find(item => item?.code == "OTHER")) {
      condition['paymentMethodCode'] = {
        in: paymentMethodCode?.map(item => item?.code)
      }
    }
    if (!isEmpty(depositAmount)) {
      condition['depositAmount'] = {
        from: depositAmount[0]?.data?.from,
        to: depositAmount[0]?.data?.to
      }
    }
    dispatch(getVolunteerReportHistoryFilter.request({
      condition: condition,
      search: search
    }))
  }, [])

  const STACKS = [
    {
      screen: () => {
        return <HistoryCashIn />
      },
      tabLabel: "Thu",
    },
    {
      screen: () => {
        return <HistoryCashOut />
      },
      tabLabel: "Chi",
    },
  ];

  return (
    <Screen safeBottom >
      <FocusAwareStatusBar barStyle='light-content' />
      <LiAHeader
        bg={NEW_BASE_COLOR}
        safeTop
        title='Chi tiết thu chi' />
      <ScrollableTabView
        tabsShown={false}
        stickyHeader={
          <StickyHeader
            setCurrIndexTab={setCurrIndexTab}
            currIndexTab={currIndexTab} />
        }
        title={<View style={{ width: _width, height: '100%', backgroundColor: WHITE }} />}
        titleArgs={{
          interpolateHeight: {
            inputRange: [0, 0],
            outputRange: [0, 0],
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

export default ResultFilter

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
