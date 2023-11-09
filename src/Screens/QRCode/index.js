import React, { useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Linking, Alert } from 'react-native';
import { GREY, WHITE, BASE_COLOR, RED, SECOND_COLOR, THIRD_COLOR, BTN_PRICE, BLACK_OPACITY_8, BLACK_OPACITY_7 } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _moderateScale, _heightScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';


import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'

import ModalMyListBookingToday from './Components/ModalMyListBookingToday'
// import { useSafeArea } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { getBookingDataForPartner, checkinBookingForPartner, createCheckinBookingForPartner } from '../../Redux/Action/BookingAction';
import _isEmpty from 'lodash/isEmpty'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../Constant/Url';
import ModalPickLocationToCreateBooking from '../../Components/ModalPickLocationToCreateBooking/ModalPickLocationToCreateBooking';
import { TabBar, TabView } from 'react-native-tab-view';
import OpenCamera from './OpenCamera';
import MyQR from './MyQR';


const QRScreen = () => {

    const [routes] = useState([
        { key: 'first', title: 'Quét mã' },
        { key: 'second', title: 'QR của tôi' }
    ]);
    const [index, setIndex] = useState(0);


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
                return <OpenCamera />;
            case 'second':
                return <MyQR />;

            default:
                return null;
        }
    };


    return (
        <View style={styles.container}>
            {/* <StatusBarCustom /> */}
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />

            <View style={{ flexDirection: 'row' , justifyContent:'space-between',marginHorizontal:_moderateScale(8*2), marginTop:_moderateScale(8*2)}}>

                <View style={[sizeIcon.lxlg]} />

                <Text style={{...stylesFont.fontNolan500,fontSize:_moderateScale(16)}}>
                    QR Code
                </Text>

                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{...sizeIcon.lxlg,justifyContent:'center',alignItems:'center', backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                    <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                </TouchableOpacity>
            </View>

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
};

const styles = StyleSheet.create({
    avatar: {
        width: _moderateScale(8 * 7),
        height: _moderateScale(8 * 7),
        borderRadius: _moderateScale(8 * 7 / 2)
    },
    btnOptions__icon: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        resizeMode: 'contain'
    },
    btnOptions: {
        width: _moderateScale(100),
        height: _moderateScale(100),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    inputHeader: {
        width: "100%",
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8 * 4),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: _moderateScale(20),
        color: WHITE,
    },

    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1)
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(300),
        width: "100%",
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    outputRange: [-_moderateScale(300) / 2, 0, _moderateScale(300) * 0.75, _moderateScale(300) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
}
)


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 11
}


export default QRScreen;