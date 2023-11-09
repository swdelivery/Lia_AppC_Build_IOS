import React, { useRef, memo, useEffect, useState } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, RefreshControl } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BG_BEAUTY, BASE_COLOR } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import Header from '../../Components/Header/Header'
import { getBookingDataForPartner } from '../../Redux/Action/BookingAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { TabBar, TabView } from 'react-native-tab-view';

import ListDeposit from '../../Screens/ListDeposit/index';
import ListDepositRequest from '../../Screens/ListDepositRequest';
import ListPayment from '../../Screens/ListPayment/index';


const index = memo((props) => {

    const [listBooking, setListBooking] = useState([])
    const [refresh, setRefresh] = useState(false)

    const [routes] = useState([
        { key: 'first', title: 'Cọc' },
        { key: 'second', title: 'Y/C Nạp rút' },
        { key: 'third', title: 'Thanh toán' },
    ]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (props?.route?.params?.numIndex) {
            setTimeout(() => {
            setIndex(props?.route?.params?.numIndex)
            }, 100);
        }
    }, [props?.route?.params?.numIndex])


    const renderTabBar = (props) => {
        return (
            <TabBar
                tabStyle={{ flexDirection: 'row', alignItems: 'center' }}
                {...props}
                indicatorStyle={{ backgroundColor: BASE_COLOR }}
                style={{
                    backgroundColor: WHITE,
                }}
                inactiveColor="grey"
                activeColor={BASE_COLOR}
                labelStyle={[stylesFont.fontNolan500, {
                    fontSize: _moderateScale(14),
                }]}
                getLabelText={({ route }) => route.title}
            />
        )
    }
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <ListDeposit />;
            case 'second':
                return <ListDepositRequest />;
            case 'third':
                return <ListPayment />;

            default:
                return null;
        }
    };


    return (
        <View style={styles.container}>
            <StatusBarCustom bgColor={BASE_COLOR} />
            <Header title={`Thanh toán / Cọc`} keyGoBack={props?.route?.params?.keyGoBack}
                styleTit={{ color: WHITE }}
                backStyle={`white`}
                styleCus={{ backgroundColor: BASE_COLOR }} />

            <TabView
                renderTabBar={renderTabBar}
                swipeEnabled={true}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy
            />

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_BEAUTY
    }
})


export default index;