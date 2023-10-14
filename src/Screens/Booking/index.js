import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, ScrollView } from 'react-native';
import * as Color from '../../Constant/Color';
import { BG_GREY_OPACITY_3, BLUE, BLUE_2, GREY_FOR_TITLE, WHITE } from '../../Constant/Color';
import { FONT_DINTEXT_PRO, stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { ImageBackground, Image, Dimensions } from 'react-native';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import _ from 'lodash';
import { navigate, navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey';
import { setShowModalAllNotifi } from '../../Redux/Action/NotificationAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { useDispatch, useSelector } from 'react-redux';
import { getListBranchLocation } from '../../Redux/Action/BookingAction';
import { isEmpty } from '../../Constant/Utils';
import AlarmNotifi from '../../Components/AlarmNotifi/AlarmNotifi';

const Booking = props => {
    const dispatch = useDispatch()

    const listBranchRedux = useSelector(state => state.bookingReducer.listBranch)
    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    useEffect(() => {
        if (isEmpty(listBranchRedux)) {
            dispatch(getListBranchLocation())
        }
    }, [listBranchRedux])

    const scrollA = useRef(new Animated.Value(0)).current;
    return (

        <View style={styles.container}>
            <StatusBarCustom />
            <Animated.ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}>
                <View style={[styles.bannerContainer]}>
                    <Animated.Image
                        resizeMode={'contain'}
                        style={[styles.banner(scrollA),]}
                        source={require('../../NewImage/bannerDoctor2.png')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(500),
                        width: "100%"
                    }}>
                        <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }]}>
                            <TouchableOpacity
                                hitSlop={styleElement.hitslopMd}
                                onPress={() => {
                                    if (props?.route?.params?.keyGoBack) {
                                        navigation.navigate(props?.route?.params?.keyGoBack)
                                    } else {
                                        navigation.goBack()
                                    }
                                }}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={[sizeIcon.llg]} source={require('../../Icon/back_left_white.png')} />
                                {/* <Text style={[stylesFont.fontNolanBold,{fontSize:_moderateScale(16), color:WHITE}]}>
                                    Quay lại
                                </Text> */}
                            </TouchableOpacity>
                            <Image
                                style={[sizeLogo.xl]}
                                source={require('../../Image/auth/logo.png')} />
                            <View style={{ opacity: 0 }}>
                                <AlarmNotifi />
                            </View>
                        </View>

                        <Text style={[stylesFont.fontNolanBold, styles.title]}>
                            Đặt hẹn 
                        </Text>
                        <Text style={[stylesFont.fontNolan, styles.title, { marginTop: _moderateScale(4) }]}>

                        </Text>

                        <View style={{ paddingHorizontal: _moderateScale(8 * 4), marginTop: _moderateScale(8 * 7) }}>
                            <View style={styles.inputHeader}>

                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.main]}>
                    <View style={[styles.wave]} />

                    <View style={[styles.listBooking]}>
                        <TouchableOpacity activeOpacity={.5} style={[styles.FaItemBooing, shadow]} onPress={() => navigation.navigate(ScreenKey.LIST_BRANCH)}>
                            <View style={[styles.itemBooking]}>
                                <View style={[styles.leftItemBooking]}>
                                    <Image
                                        style={[styles.avatar]}
                                        source={require('../../NewIcon/noteBooking.png')}
                                    />
                                </View>
                                <View style={[styles.rightItemBooking]}>
                                    <Text style={[styles.titBooking]}>Đặt hẹn đến phòng khám</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.5} style={[styles.FaItemBooing, shadow]} onPress={() => navigation.navigate(ScreenKey.LIST_DOCTOR)}>
                            <View style={[styles.itemBooking]}>
                                <View style={[styles.leftItemBooking]}>
                                    <Image
                                        resizeMode='contain'
                                        style={[styles.avatar]}
                                        source={require('../../NewIcon/noteDoctor.png')}
                                    />
                                </View>
                                <View style={[styles.rightItemBooking]}>
                                    <Text style={[styles.titBooking]}>Đặt hẹn với bác sĩ khám </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.5} style={[styles.FaItemBooing, shadow]} onPress={() => {

                            if (!infoUserRedux?._id) {
                                return navigation.navigate(ScreenKey?.LOGIN_IN_APP, { routeName: props?.route?.name })
                            }
                            navigation.navigate(ScreenKey.VIDEO_REQUEST)
                        }}>
                            <View style={[styles.itemBooking]}>
                                <View style={[styles.leftItemBooking]}>
                                    <Image
                                        resizeMode='contain'
                                        style={[styles.avatar]}
                                        source={require('../../NewIcon/noteCall.png')}
                                    />
                                </View>
                                <View style={[styles.rightItemBooking]}>
                                    <Text style={[styles.titBooking]}>Đăng kí video call tư vấn </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </Animated.ScrollView>
        </View>
    );
};



const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,

    elevation: 1
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.MAIN_BG
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
        backgroundColor: Color.MAIN_BG,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1),
        // backgroundColor:'red'
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
    main: {
        // position:'relative',
        flex: 1,
    },
    mainContent: {
        flex: 1,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        top: _moderateScale(-16),
        borderTopLeftRadius: _moderateScale(16),
        borderTopRightRadius: _moderateScale(16),
        overflow: 'hidden',
    },
    backButton: {
        position: 'absolute',
        backgroundColor: Color.BASE_COLOR,
        width: _moderateScale(48),
        height: _moderateScale(48),
        bottom: _moderateScale(56),
        left: _moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: _moderateScale(50)
    },
    listBooking: {
        // paddingHorizontal: _moderateScale(16),
        // paddingTop: _moderateScale(32),
    },
    FaItemBooing: {
        backgroundColor: WHITE,
        marginVertical: _moderateScale(12),
        marginHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(12),
        // borderWidth: 0.5,
        // borderColor: '#000',
    },
    itemBooking: {
        flexDirection: 'row',

        paddingVertical: _moderateScale(12),
        // backgroundColor: 'rgba(255, 168, 198,0.3)',
        borderRadius: _moderateScale(12),


        // shadowColor: WHITE,
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        // elevation: 10,
    },
    leftItemBooking: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.3,
    },
    containAvatar: {
        backgroundColor: '#fff',
        width: _moderateScale(64),
        height: _moderateScale(64),
        borderRadius: _moderateScale(64 / 2),
        backgroundColor: '#4FADA4',
        // shadowColor: Color.BASE_COLOR,
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        // elevation: 5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: _moderateScale(8 * 7),
        height: _moderateScale(8 * 7),
    },
    rightItemBooking: {
        justifyContent: 'center',
        flex: 0.7,
        paddingHorizontal: _moderateScale(12)
    },
    titBooking: {
        fontSize: 18,
        ...stylesFont.fontNolanBold,
        color: Color.SECOND_COLOR
    }
})


export default Booking;