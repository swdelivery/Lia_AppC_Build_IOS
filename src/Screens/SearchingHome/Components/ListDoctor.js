import React, { useRef, useEffect, memo } from 'react';
import { StyleSheet, View, Text, Animated, ScrollView, TouchableOpacity } from 'react-native';
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
import { getAllDoctor } from '../../../Redux/Action/DoctorAction';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL, URL_FOR_PARTNER } from '../../../Constant/Url';
import AlarmNotifi from '../../../Components/AlarmNotifi/AlarmNotifi';
import HeaderLeft from '../../../Components/HeaderLeft';
import CountStar from '../../../Components/CountStar/index';
import store from "../../../Redux/store";
import * as ActionType from '../../../Redux/Constants/ActionType'
import FastImage from '../../../Components/Image/FastImage';


const ListDoctor = memo((props) => {
    return (
        <View style={{}}>
            {
                props?.data?.data?.map((item, index) => {

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