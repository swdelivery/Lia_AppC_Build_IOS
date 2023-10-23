import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import Banner from './Components/Banner';
import Search from './Components/Search';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { _height, _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import ScrollableTabView from "@itenl/react-native-scrollable-tabview";
import { useState } from 'react';
import SoYoung_Service from '../SoYoung_Service/index';
import SoYoung_Branch from '../SoYoung_Branch/index';
import So_Young_Doctor from '../SoYoung_Doctor/index';
import So_Young_Expert from '../SoYoung_Expert'
import { useRef } from 'react';
import { WHITE } from '../../Constant/Color';
import Collapsible from 'react-native-collapsible';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { getAllServiceGroup } from '../../Redux/Action/ServiceGroup';
import { useDispatch, useSelector } from 'react-redux';
import { stylesFont } from '../../Constant/Font';
import ModalPickSingleNotSearch from '../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch';

const index = () => {
    const scrollableTabViewRef = useRef()
    const [rootTime, setRootTime] = useState(Date.now())

    const listServiceGroupRedux = useSelector(state => state.serviceGroupReducer?.listServiceGroup)
    const dispatch = useDispatch()


    const heightExpandServiceGr = useSharedValue(0)

    const [expandServiceGr, setExpandServiceGr] = useState(true)

    const [stacks, setStacks] = useState([
        {
            screen: SoYoung_Service,
            tabLabel: "Dịch vụ",
        },
        {
            screen: SoYoung_Branch,
            tabLabel: "Phòng khám",
        },
        {
            screen: So_Young_Doctor,
            tabLabel: "Bác sĩ",
        },
        {
            screen: So_Young_Expert,
            tabLabel: "Chuyên viên",
        },
        {
            screen: SoYoung_Service,
            tabLabel: "Vật liệu",
        },
    ])


    useEffect(() => {
        _getDataServiceGr()
    }, [])

    const _getDataServiceGr = () => {
        var condition = {
            condition: {
                parentCode: {
                    equal: null
                }
            },
            "sort": {
                "orderNumber": -1
            },
            "limit": 100,
            "page": 1
        }
        dispatch(getAllServiceGroup(condition))
    }

    const _renderHeader = () => {
        return (
            <Banner />

        )
    }

    useEffect(() => {
        if (expandServiceGr) {
            heightExpandServiceGr.value = withTiming(200, { duration: 300 })
        } else {
            heightExpandServiceGr.value = withTiming(0, { duration: 0 })
        }
    }, [expandServiceGr])

    const animHeightExpandServiceGr = useAnimatedStyle(() => {
        return {
            height: heightExpandServiceGr.value
        }
    })

    return (
        <View style={styles.container}>


            <View style={{
                position: 'absolute',
                top: _moderateScale(getStatusBarHeight() + 8),
                zIndex: 1,
                alignItems: 'center',
                width: _width
            }}>
                <Search press={() => { setExpandServiceGr(old => !old) }} />
            </View>


            <ScrollableTabView
                titleArgs={{
                }}
                title={
                    <View style={{}}>
                    </View>
                }
                onTabviewChanged={(index, tabLabel) => {

                }}
                mappingProps={{
                    rootTime: rootTime,
                }}
                stacks={stacks}
                tabWrapStyle={{ flex: 1 }}
                tabInnerStyle={{ width: "100%", }}
                tabActiveOpacity={1}
                tabsStyle={{
                    height: (8 * 5),
                    backgroundColor: "white",
                    borderBottomColor: 'grey',
                    // borderBottomWidth: 1,
                }}
                tabStyle={{
                    backgroundColor: "white",
                    width: _width / 4.25,
                }}
                tabUnderlineStyle={{
                    backgroundColor: '#4BA888',
                    top: 8 * 4,
                    height: 3,
                }}
                textStyle={{
                    color: 'black',
                    fontWeight: '500',
                    fontSize: 14
                }}
                ref={(it) => (scrollableTabViewRef.current = it)}
                textActiveStyle={{
                    color: '#4BA888',
                    fontWeight: 'bold',
                }}
                header={
                    _renderHeader
                }
                firstIndex={0}
                useScroll={true}
                toTabsOnTab={true}
                oneTabHidden={true}
                enableCachePage={true}
                tabsEnableAnimatedUnderlineWidth={40}
                tabsEnableAnimated={true}
            >

            </ScrollableTabView>
        </View>
    );
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})