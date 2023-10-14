import React, { useRef, useEffect, memo, useState } from 'react';
import { StyleSheet, View, Text, Animated, ScrollView, TouchableOpacity, Platform } from 'react-native';
import * as Color from '../../../Constant/Color';
import { BG_GREY_OPACITY_3, BLUE, BLUE_2, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color';
import { FONT_DINTEXT_PRO, stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { ImageBackground, Image, Dimensions } from 'react-native';
import { sizeIcon, sizeLogo } from '../../../Constant/Icon';
import _ from 'lodash';
import { navigate, navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey';
import { setShowModalAllNotifi } from '../../../Redux/Action/NotificationAction';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctor, getAllDoctorv2 } from '../../../Redux/Action/DoctorAction';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL, URL_FOR_PARTNER } from '../../../Constant/Url';
import AlarmNotifi from '../../../Components/AlarmNotifi/AlarmNotifi';
import HeaderLeft from '../../../Components/HeaderLeft';
import CountStar from '../../../Components/CountStar/index';
import store from '../../../Redux/Store';
import * as ActionType from '../../../Redux/Constants/ActionType'
import FastImage from '../../../Components/Image/FastImage';


const ListDoctor = memo((props) => {

    const [listDoctor, setListDoctor] = useState([])


    const translateX1 = useRef(new Animated.Value(0)).current;
    const translateOpacity1 = useRef(new Animated.Value(0)).current;

    const translateX2 = useRef(new Animated.Value(0)).current;
    const translateOpacity2 = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        _getListDoctor()
        // _startAnimation()
    }, [])
    const _getListDoctor = async () => {
        let result = await getAllDoctorv2({
            sort: {
                orderNumber: -1
            },
            "limit": 8,
            "page": 1
        })
        if (result?.isAxiosError) return
        setListDoctor(result?.data?.data)
    }


    const _startAnimation = () => {
        Animated.loop(
            Animated.parallel([
                Animated.timing(translateX1, {
                    toValue: 15,
                    duration: 1000,
                    // easing:Easing.bounce
                }),
                Animated.timing(translateOpacity1, {
                    toValue: 1,
                    duration: 1000,
                    // easing:Easing.bounce
                })
            ])
            // {
            //     iterations: -1
            // }
        ).start(() => {
        })

        setTimeout(() => {
            Animated.loop(
                Animated.parallel([
                    Animated.timing(translateX2, {
                        toValue: 15,
                        duration: 1000,
                        // easing:Easing.bounce
                    }),
                    Animated.timing(translateOpacity2, {
                        toValue: 1,
                        duration: 1000,
                        // easing:Easing.bounce
                    })
                ])
                // {
                //     iterations: -1
                // }
            ).start(() => {
            })
        }, 500);

    }



    return (
        <View style={{ paddingTop: _moderateScale(8 * 1) }}>

            <View style={{ alignItems: 'flex-end', paddingHorizontal: _moderateScale(8 * 2), marginBottom: _moderateScale(8) }}>
                <TouchableOpacity
                    onPress={() => {
                        Platform.OS == 'ios' ?
                        navigation.navigate(ScreenKey.LIST_DOCTOR_IOS)
                        :
                        navigation.navigate(ScreenKey.LIST_DOCTOR)
                    }}
                    style={[styleElement.rowAliCenter]}>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.BLACK_OPACITY_8 }}>
                        Xem tất cả
                    </Text>

                    <Animated.Image style={[
                        sizeIcon.md,
                    ]} source={require('../../../Icon/arrowRight_grey.png')} />
                </TouchableOpacity>
            </View>

            {
                listDoctor?.length > 0 ?
                    <>
                        {
                            listDoctor?.map((item, index) => {

                                return (
                                    <View key={index} style={{
                                        paddingHorizontal: _moderateScale(8 * 2),
                                        marginBottom: _moderateScale(8 * 2),
                                    }}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => navigation.navigate(ScreenKey.DETAIL_DOCTOR, { idDoctor: item?._id })}
                                            style={[{
                                                width: '100%',
                                                backgroundColor: WHITE,
                                                borderRadius: _moderateScale(8 * 1),
                                                paddingBottom: _moderateScale(8 * 2),
                                                flexDirection: 'row'
                                            }, shadow]}>

                                            <View style={{ width: _moderateScale(8 * 15) }}>
                                                <View style={{
                                                    margin: _moderateScale(8 * 2),
                                                    height: _widthScale(8 * 15),
                                                    backgroundColor: Color.BG_GREY_OPACITY_2,
                                                    borderRadius: _moderateScale(8),
                                                    overflow: 'hidden'
                                                }}>
                                                    <FastImage
                                                        style={[{ width: '100%', height: '100%' }]}
                                                        uri={
                                                            item?.avatar?.link ?
                                                                `${URL_ORIGINAL}${item?.avatar?.link}`
                                                                :
                                                                "https://image.shutterstock.com/image-vector/doctor-vector-illustration-260nw-512904655.jpg"
                                                        } />
                                                </View>
                                            </View>

                                            <View style={{ flex: 1, paddingTop: _moderateScale(8 * 2), paddingRight: _moderateScale(8 * 2) }}>
                                                <Text numberOfLines={2} style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_7 }}>
                                                    {item?.name}
                                                </Text>
                                                <View style={[styleElement.rowAliTop, { marginVertical: _moderateScale(4) }]}>
                                                    <Image style={sizeIcon.xxs} source={require('../../../NewIcon/location.png')} />
                                                    <Text style={{ marginLeft: _moderateScale(8), flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.GREY }} numberOfLines={1}>
                                                        {item?.branch?.name}
                                                    </Text>
                                                </View>
                                                <View style={[styleElement.rowAliCenter]}>
                                                    <CountStar reviewCount={item?.reviewCount} averageRating={parseInt(item?.averageRating)} medium />


                                                </View>
                                                <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(0) }]}>
                                                    <Image style={sizeIcon.xxs} source={require('../../../NewIcon/people.png')} />
                                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.GREY, marginLeft: _moderateScale(4) }}>
                                                        {item?.countPartner}
                                                    </Text>
                                                </View>
                                                {/* <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'flex-end' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (!infoUserRedux?._id) {
                                                    store.dispatch({
                                                        type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                                        payload: {
                                                            flag: true,
                                                            currRouteName: props?.route?.name
                                                        }
                                                    })
                                                    return
                                                }
                                                navigation.navigate(ScreenKey.BOOKING_FOR_DOCTOR, { infoBranch: item?.branch, infoDoctor: item, doctorCode: item?.code, branchCode: item?.branch?.code, refCode: "" })
                                            }}

                                            hitSlop={styleElement.hitslopSm}
                                            style={[styles.btnBoooking, shadow]}>
                                            <Text style={{ color: WHITE, ...stylesFont.fontNolanBold, fontSize: _moderateScale(14) }}> Đặt hẹn</Text>
                                        </TouchableOpacity>
                                    </View> */}

                                            </View>


                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                        {
                            props?.data?.length % 2 !== 0 ?
                                <View style={[{ width: _widthScale(8 * 21) }, { borderWidth: 0, margin: _moderateScale(8), }]} />
                                : <></>
                        }
                    </>
                    :
                    <>
                        <View style={{ height: 1000 }}>
                        </View>
                    </>
            }

            {
                listDoctor?.length > 0 ?
                    <View style={{ alignItems: 'flex-end', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(0) }}>
                        <TouchableOpacity
                            onPress={() => {
                                Platform.OS == 'ios' ?
                                navigation.navigate(ScreenKey.LIST_DOCTOR_IOS)
                                :
                                navigation.navigate(ScreenKey.LIST_DOCTOR)
                            }}
                            style={[styleElement.rowAliCenter, {
                                backgroundColor: Color.BLUE_FB,
                                width: _moderateScale(8 * 15),
                                height: _moderateScale(8 * 4),
                                borderRadius: _moderateScale(8),
                                paddingLeft: _moderateScale(8 * 2),
                                // justifyContent: 'center',
                                alignItems: 'center'
                            }]}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: WHITE }}>
                                Xem tất cả
                            </Text>

                            <Animated.Image
                                style={[
                                    sizeIcon.md,
                                    // {
                                    //     transform: [
                                    //         {
                                    //             translateX: translateX1
                                    //         }
                                    //     ]
                                    // },
                                    // {
                                    //     opacity: translateOpacity1,
                                    //     position: 'absolute',
                                    //     right: 16
                                    // }
                                ]}
                                source={require('../../../NewIcon/arrowRightWhite.png')} />
                            {/* <Animated.Image
                                style={[
                                    sizeIcon.md,
                                    {
                                        transform: [
                                            {
                                                translateX: translateX2
                                            }
                                        ]
                                    },
                                    {
                                        opacity: translateOpacity2,
                                        position: 'absolute',
                                        right: 16
                                    }
                                ]}
                                source={require('../../../NewIcon/arrowRightWhite.png')} /> */}

                        </TouchableOpacity>
                    </View>
                    : <></>
            }

            <View style={{ height: _moderateScale(8 * 3) }} />

        </View>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 1
}

export default ListDoctor;