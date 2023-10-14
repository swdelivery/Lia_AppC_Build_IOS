import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import Banner from './Components/Banner';
import Search from './Components/Search';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { _moderateScale, _width } from '../../Constant/Scale';
import ScrollableTabView from "@itenl/react-native-scrollable-tabview";
import { useState } from 'react';
import SoYoung_Service from '../SoYoung_Service/index';
import SoYoung_Branch from '../SoYoung_Branch/index';
import So_Young_Doctor from '../SoYoung_Doctor/index';
import { useRef } from 'react';

const index = () => {
    const scrollableTabViewRef = useRef()
    const [rootTime, setRootTime] = useState(Date.now())

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
            screen: SoYoung_Service,
            tabLabel: "Sản phẩm",
        },
        {
            screen: SoYoung_Service,
            tabLabel: "Bách khoa",
        },
    ])


    const _renderHeader=()=>{
        return(
            <Banner />
           
        )
    }

    return (
        <View style={styles.container}>
            <View style={{
                position: 'absolute',
                top: _moderateScale(getStatusBarHeight()+ 8),
                zIndex: 1,
                alignItems: 'center',
                width: _width
            }}>
                <Search />
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
                    fontWeight:'500',
                    fontSize:14
                }}
                ref={(it) => (scrollableTabViewRef.current = it)}
                textActiveStyle={{
                    color: '#4BA888',
                    fontWeight:'bold',
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