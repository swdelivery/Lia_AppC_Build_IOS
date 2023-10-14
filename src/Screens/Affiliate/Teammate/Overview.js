import React, { useRef, useEffect, useState, memo } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, ScrollView, Clipboard } from 'react-native';
import { GREY, WHITE, BASE_COLOR, SECOND_COLOR, BTN_PRICE, RED, BLUE_FB, THIRD_COLOR, BLACK, BG_GREY_OPACITY_5, BG_GREY_OPACITY_2 } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../../Constant/Icon';
import { _moderateScale, _width } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { navigation } from '../../../../rootNavigation';
import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux';
import { getWallet, getCurrentCommission, getCollabStatistic } from '../../../Redux/Action/InfoAction'
import { formatMonney } from '../../../Constant/Utils';
import ModalCashInWallet from '../Components/ModalCashInWallet';
import ModalInfoWallet from '../Components/ModalInfoWallet';
import ScreenKey from '../../../Navigation/ScreenKey'
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { TabBar, TabView } from 'react-native-tab-view';
import ModalFlashMsg from '../../../Components/ModalFlashMsg/ModalFlashMsg';
import LinearGradient from 'react-native-linear-gradient';


const Overview = memo((props) => {
    return (
        <View style={{
            padding: _moderateScale(8 * 2),
        }}>
            <View style={{ flexDirection: 'row', marginTop: _moderateScale(8 * 0) }}>
                <TouchableOpacity
                    onPress={() => {
                        props?.setIndex(1)
                    }}
                    style={[styles.box, shadow]}>
                    <View style={[{ flex: 1, justifyContent: 'center' }]}>
                        <Text style={[styles.box__text, { alignSelf: 'center' }]}>
                            Người hướng dẫn
                        </Text>
                        <View style={{ paddingHorizontal: _moderateScale(8) }}>
                            <Text style={[styles.box__text2]}>
                                (Cấp quản lý trực tiếp)
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ width: '4%' }} />
                <TouchableOpacity
                    onPress={() => {
                        props?.setIndex(2)
                    }}
                    style={[styles.box, shadow]}>
                    <View style={[{ flex: 1, justifyContent: 'center' }]}>
                        <Text style={[styles.box__text, { alignSelf: 'center' }]}>
                            Cấp trên
                        </Text>
                        <View style={{ paddingHorizontal: _moderateScale(8) }}>
                            <Text style={[styles.box__text2]}>
                                (Đội nhóm trung gian giữa lãnh đạo và người hướng dẫn)
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: _moderateScale(8 * 2) }}>
                <TouchableOpacity
                    onPress={() => {
                        props?.setIndex(3)
                    }}
                    style={[styles.box, shadow]}>
                    <View style={[{ flex: 1, justifyContent: 'center' }]}>
                        <Text style={[styles.box__text, { alignSelf: 'center' }]}>
                            Lãnh đạo
                        </Text>
                        <View style={{ paddingHorizontal: _moderateScale(8) }}>
                            <Text style={[styles.box__text2]}>
                                (Cấp cao nhất trong hệ thống)
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ width: '4%' }} />
                <TouchableOpacity
                    onPress={() => {
                        props?.setIndex(4)
                    }}
                    style={[styles.box, shadow]}>
                    <View style={[{ flex: 1, justifyContent: 'center' }]}>
                        <Text style={[styles.box__text, { alignSelf: 'center' }]}>
                            Nhóm cấp dưới
                        </Text>
                        <View style={{ paddingHorizontal: _moderateScale(8) }}>
                            <Text style={[styles.box__text2]}>
                                (Đội nhóm CTV bên dưới quản lý trực tiếp bởi bạn)
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
}

const styles = StyleSheet.create({
    box__text3: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(18),
        color: '#EF9000',
    },
    box__text2: {
        ...stylesFont.fontNolan,
        fontSize: _moderateScale(14),
        color: BLACK,
    },
    box__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: BLACK,
    },
    box: {
        width: '48%',
        height: _moderateScale(8 * 12),
        borderRadius: _moderateScale(8 * 1),
        backgroundColor: WHITE,
    },
    totalPrice__text2: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(24),
        color: '#FA4664',
    },
    totalPrice__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: BLACK,
    },
    totalPrice: {
        marginTop: _moderateScale(8 * 1),
        alignItems: 'center'
    },
    flagText__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: WHITE,
        marginLeft: _moderateScale(8)
    },
    flagText__dot: {
        width: _moderateScale(8 * 1.5),
        height: _moderateScale(8 * 1.5),
        borderRadius: _moderateScale(8 * 1.5 / 2),
        backgroundColor: WHITE
    },
    flagText: {
        width: _moderateScale(8 * 14),
        height: _moderateScale(8 * 3.5),
        // backgroundColor: BASE_COLOR,
        borderTopEndRadius: _moderateScale(8 * 2),
        borderBottomEndRadius: _moderateScale(8 * 2),
        overflow: 'hidden',
        borderTopStartRadius: _moderateScale(4),
        borderBottomStartRadius: _moderateScale(4),
    },
    btnMenu: {
        height: _moderateScale(100),
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bannerStatis: {
        backgroundColor: BTN_PRICE,
        height: _moderateScale(8 * 6),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    btnOptionCash__text: {
        fontSize: _moderateScale(14),
        color: WHITE,
        alignSelf: 'center',
        marginTop: _moderateScale(4)
    },
    btnOptionCash: {
        width: _moderateScale(8 * 9),
        height: _moderateScale(8 * 9),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(2),
        borderColor: WHITE,
        backgroundColor: BTN_PRICE,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: _moderateScale(8 * 2)
    },
    btnCopy: {
        // width:"100%",
        flex: 1,
        marginLeft: _moderateScale(8 * 1),
        borderRadius: _moderateScale(4),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: _moderateScale(2),
        borderWidth: _moderateScale(1),
        borderColor: WHITE
    },
    bannerPrice__textPrice: {
        color: '#5D5FEF',
        fontSize: _moderateScale(20),
        alignSelf: 'center',
        // marginBottom: _moderateScale(8 * 1),
        // marginTop: _moderateScale(8),
    },
    bannerPrice: {
        // marginHorizontal: _moderateScale(8 * 4),
        backgroundColor: 'rgba(255, 255, 255,0.8)',
        // paddingHorizontal: _moderateScale(8 * 2),
        // paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(4),
        // marginTop: _moderateScale(8 * 2),
        // position: 'relative',
        flex: 1,
        // alignSelf:'flex-start'
        // width: _moderateScale(8 * 20)
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
        marginLeft: _moderateScale(8 * 4),
        marginTop: _moderateScale(8 * 3)
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
        // width: 100%, 
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

export default Overview;