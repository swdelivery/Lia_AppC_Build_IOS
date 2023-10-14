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
import { removePartnerActivityMenu } from '../../Redux/Action/LoseWeightAction';
import moment from 'moment'

const ListActivity = memo((props) => {

    const dateFilterTrackingWeightRedux = useSelector(state => state.loseWeightReducer?.dateFilterTrackingWeight)


    const _handleRemovePartnerActivity = async (item) => {


        Alert.alert(
            "Xác nhận",
            `Xoá ${item?.activity?.name} khỏi hoạt động hôm nay?`,
            [
                {
                    text: "Huỷ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Đồng ý", onPress: async () => {
                        let result = await removePartnerActivityMenu(item?._id)
                        store.dispatch({
                            type: ActionType.REMOVE_DATA_MENU_ACTIVITY,
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
        <ScrollView style={{ paddingTop: _moderateScale(8 * 1) }} horizontal showsHorizontalScrollIndicator={false}>
            {
                props?.data?.map((item, index) => {
                    return (
                        <View
                            key={item?._id}
                            style={{ marginRight: _moderateScale(8 * 2), width: _moderateScale(8 * 10) }}>
                            {
                                moment(new Date()).isSame(moment(dateFilterTrackingWeightRedux), 'day') ?
                                    <TouchableOpacity
                                        onPress={() => _handleRemovePartnerActivity(item)}
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
                                borderColor: BG_GREY_OPACITY_5
                            }} source={{ uri: item?.activity?.representationFileArr?.length > 0 ? `${URL_ORIGINAL}${item?.activity?.representationFileArr[0]?.link}` : '' }} />
                            <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                {item?.activity?.name}
                            </Text>
                            <Text numberOfLines={1} style={[stylesFont.fontNolan, { fontSize: _moderateScale(13) }]}>
                                {item?.minutes} phút
                                </Text>
                            <Text numberOfLines={1} style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), fontStyle: 'italic' }]}>
                                (~{parseFloatNumber(item?.calo)} Calo)
                                </Text>
                        </View>
                    )
                })
            }
        </ScrollView>
    );
});



export default ListActivity;