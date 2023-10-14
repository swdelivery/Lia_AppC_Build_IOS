import React, { useRef, memo } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';


import { _moderateScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB } from '../../Constant/Color';
import { randomStringFixLengthCode, parseFloatNumber } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import { URL_AVATAR_DEFAULT, URL_ORIGINAL } from '../../Constant/Url';
import { removePartnerFoodMenu } from '../../Redux/Action/LoseWeightAction';
import moment from 'moment'

const ListMenu = memo((props) => {

    const dateFilterTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.dateFilterTrackingWeight)


    const _renderOclock = () => {
        switch (props?.flag) {
            case 'morning':
                return (
                    <Image style={[sizeIcon.md]} source={require('../../Icon/clock_morning.png')} />
                )
            case 'midday':
                return (
                    <Image style={[sizeIcon.md]} source={require('../../Icon/clock_midday.png')} />
                )
            case 'night':
                return (
                    <Image style={[sizeIcon.md]} source={require('../../Icon/clock_night.png')} />
                )
            case 'snack':
                return (
                    <Image style={[sizeIcon.md]} source={require('../../Icon/clock_night.png')} />
                )

            default:
                break;
        }
    }

    const _handleRemovePartnerFood = async (item) => {



        Alert.alert(
            "Xác nhận",
            `Xoá ${item?.food?.name} khỏi thực đơn hôm nay?`,
            [
                {
                    text: "Huỷ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Đồng ý", onPress: async () => {
                        let result = await removePartnerFoodMenu(item?._id)
                        store.dispatch({
                            type: ActionType.REMOVE_DATA_MENU_FOOD,
                            payload: {
                                data: result?.data?.data?.data
                            }
                        })
                        store.dispatch({
                            type: ActionType.UPDATE_DATA_TRACKING_WEIGHT,
                            payload: {
                                data: result?.data?.data?.tracking
                            }
                        })
                    }
                }
            ],
            { cancelable: false }
        );


    }

    return (
        <View style={[{ paddingHorizontal: _moderateScale(8 * 3) }, props?.style]}>
            <View style={[styleElement.rowAliCenter]}>
                <View style={[styleElement.rowAliCenter, { flex: 1 }]}>
                    {_renderOclock()}
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), marginLeft: _moderateScale(8) }]}>
                        {props?.title}
                    </Text>
                </View>

                {
                    moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ?
                        <TouchableOpacity onPress={() => props?.clickAdd()}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: BLUE_FB }]}>Thêm</Text>
                        </TouchableOpacity>
                        : <></>
                }

            </View>
            <View style={{ height: _moderateScale(8) }} />
            <ScrollView style={{ paddingTop: _moderateScale(8 * 1) }} horizontal showsHorizontalScrollIndicator={false}>
                {
                    props?.data?.map((item, index) => {
                        return (
                            <View key={index} style={{ marginRight: _moderateScale(8 * 2), width: _moderateScale(8 * 10) }}>

                                {
                                    moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ?
                                        <TouchableOpacity
                                            onPress={() => _handleRemovePartnerFood(item)}
                                            hitSlop={styleElement.hitslopSm}
                                            style={{
                                                width: _moderateScale(8 * 2),
                                                height: _moderateScale(8 * 2),
                                                backgroundColor: RED,
                                                borderRadius: _moderateScale(8 * 1),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                position: 'absolute',
                                                zIndex: 1,
                                                right: -_moderateScale(4),
                                                top: -_moderateScale(4),
                                            }}>
                                            <View style={{ width: _moderateScale(8 * 1.25), height: _moderateScale(3), backgroundColor: WHITE }} />
                                        </TouchableOpacity>
                                        : <></>
                                }


                                <Image style={{
                                    width: _moderateScale(8 * 10),
                                    height: _moderateScale(8 * 10),
                                    borderRadius: _moderateScale(8),
                                    borderWidth: _moderateScale(0.5),
                                    borderColor: BG_GREY_OPACITY_5,
                                    backgroundColor: BG_GREY_OPACITY_2
                                }} source={{ uri: `${URL_ORIGINAL}${item?.food?.representationFileArr[0]?.link}` }} />
                                <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                    {item?.food?.name}
                                </Text>
                                <Text numberOfLines={1} style={[stylesFont.fontNolan, { fontSize: _moderateScale(13) }]}>
                                    {item?.size} {item?.unit}
                                </Text>
                                <Text numberOfLines={1} style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), fontStyle: 'italic' }]}>

                                    (~{parseFloatNumber(item?.calo)} Calo)
                                </Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
});


const styles = StyleSheet.create({
    textMedium: {
        fontSize: _moderateScale(14), color: WHITE
    },
    textLarge: {
        fontSize: _moderateScale(26), color: WHITE
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: _moderateScale(8 * 2)
    }
})


export default ListMenu;