import LiAHeader from '@Components/Header/LiAHeader'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { BASE_COLOR, BLUE, BLUE_FB, GREEN_SUCCESS, GREY, RED, WHITE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { clearListPostoperative, getListPostoperative } from '@Redux/takecare/actions'
import { getListPostoperativeState } from '@Redux/takecare/selectors'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'
import { useDispatch, useSelector } from 'react-redux'
import EachDayDiary from './EachDayDiary'

const UpdateDailyDiaries = (props) => {
  const dispatch = useDispatch()
  const { dataPartnerTreatment } = props?.route?.params

  const { data: dataListPostoperativeState } = useSelector(getListPostoperativeState)

  const [routes, setRoutes] = useState([]);
  const [index, setIndex] = useState(0);


  useEffect(() => {
    dispatch(getListPostoperative.request({
      idPartnerTreatment: dataPartnerTreatment?._id
    }))

    return () => {
      dispatch(clearListPostoperative())
    };

  }, [])

  useEffect(() => {
    if (routes?.length > 0) {
      let findIndex = routes?.findIndex(item => {
        return moment(item?.date).isSame(moment(), "day");
      })
      if (findIndex !== -1) {
        setIndex(findIndex)
      }
    }
  }, [routes])

  useEffect(() => {
    if (dataListPostoperativeState?.length > 0) {
      let tempList = [...dataListPostoperativeState];
      tempList = tempList.map(item => {
        return {
          ...item,
          title: item?.date,
          key: item?._id,
        }
      })
      tempList.sort((a, b) => a.index - b.index);
      setRoutes(tempList)
    }
  }, [dataListPostoperativeState])


  const renderTabBar = (props) => {
    return (
      <>
        <TabBar
          tabStyle={styles.tabStyle}
          {...props}
          indicatorStyle={{ backgroundColor: 'transparent' }}
          style={{
            backgroundColor: BLUE,
            shadowOffset: { height: 0, width: 0 },
            shadowColor: 'transparent',
            shadowOpacity: 0,
            elevation: 0,
            paddingLeft: _moderateScale(6),
          }}
          inactiveColor="grey"
          activeColor={RED}
          scrollEnabled
          getLabelText={({ route }) => route.title}
          renderLabel={({ route, focused, color }) => (
            <TouchableOpacity
              style={[styles.itemTab, focused ? styles.itemTabActive : '']}>


              <Text style={[focused ? styles.textTabActive : styles.textTab]}>Ngày {route?.index} </Text>
              <Text style={[focused ? styles.briefTabActive : styles.briefTab]}>{moment(route?.title).format('DD-MM-YYYY')}</Text>
              {
                route?.isComplete ?
                  <View style={[styles.containerStatus, { borderColor: GREEN_SUCCESS }]}>
                    <Text
                      weight='bold'
                      color={GREEN_SUCCESS}
                      size={12}>Hoàn thành</Text>
                  </View>
                  :
                  <>
                    {
                      moment(route?.date).isBefore(moment(), 'day') ?
                        <View style={[styles.containerStatus, { borderColor: RED }]}>
                          <Text
                            weight='bold'
                            color={RED}
                            size={12}>Quá hạn</Text>
                        </View>
                        :
                        <View style={[styles.containerStatus, { borderColor: BLUE_FB }]}>
                          <Text
                            weight='bold'
                            color={BLUE_FB}
                            size={12}>Đang chờ</Text>
                        </View>
                    }
                  </>
              }
            </TouchableOpacity>
          )}
        />
      </>
    )
  }

  const renderScene = ({ route }) => {
    return (
      <EachDayDiary data={route} />
    )
  };

  return (
    <Screen
      safeBottom
      backgroundColor='#F1FCF9'>
      <FocusAwareStatusBar barStyle="light-content" />
      <LiAHeader
        safeTop
        title={`${dataPartnerTreatment?.serviceName}`} />
      {
        routes?.length > 0 ?
          <TabView
            renderTabBar={renderTabBar}
            swipeEnabled={true}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            lazy
          />
          : <></>
      }

    </Screen>
  )
}

export default UpdateDailyDiaries

const styles = StyleSheet.create({
  containerStatus: {
    paddingHorizontal: 4,
    borderWidth: 1,
    backgroundColor: WHITE,
    borderRadius: 4
  },
  tabStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
    height: 'auto'
  },
  title: {
    fontSize: _moderateScale(20),
    color: WHITE,
  },
  itemTab: {
    backgroundColor: BLUE,
    paddingHorizontal: _moderateScale(8),
    paddingVertical: _moderateScale(4),
    marginRight: _moderateScale(8),
    borderRadius: _moderateScale(8),
    width: _moderateScale(100),
    alignItems: 'center'
  },
  textTab: {
    fontSize: _moderateScale(13),
    color: GREY
  },
  briefTab: {
    fontSize: _moderateScale(10),
    color: GREY
  },
  itemTabActive: {
    backgroundColor: BASE_COLOR
  },
  textTabActive: {
    color: WHITE
  },
  briefTabActive: {
    fontSize: _moderateScale(10),
    color: WHITE
  },
})
