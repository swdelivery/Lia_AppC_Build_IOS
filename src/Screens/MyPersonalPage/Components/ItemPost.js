import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useCallback, useState, memo } from 'react';
import {
    Animated, Image, StyleSheet, Text, TextInput,
    RefreshControl, ActivityIndicator,
    TouchableOpacity, View, FlatList, ImageBackground, ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK, BLACK_OPACITY_7 } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import FastImage from '../../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import ScreenKey from '../../../Navigation/ScreenKey';
import { getAllPost, getMoreAllPost } from '../../../Redux/Action/PostAction';
import isEmpty from 'lodash/isEmpty'
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../../Components/AlarmNotifi/AlarmNotifi';
import { getMinePartnerPost } from '../../../Redux/Action/PostAction'

const ItemPost = memo((props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                // navigation.navigate(ScreenKey.DETAIL_NEW_FEED, { idPost: props?.data?._id })
                props?.onPress(props?.data?._id)
            }}
            style={[{
                marginTop: _moderateScale(8 * 2),
                borderRadius: _moderateScale(8),
                padding: _moderateScale(8),
                marginHorizontal: _moderateScale(8 * 2),
                backgroundColor: WHITE
            }, shadow]}>
            {
                props?.data?.content ?
                    <Text numberOfLines={1} style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK }}>
                        {props?.data?.content}
                    </Text>
                    : <></>
            }


            <View style={{ marginTop: _moderateScale(8), flexDirection: 'row', gap: 8 * 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Image style={sizeIcon.xs} source={require('../../../Image/component/share.png')} />
                    <Text style={{ flex: 1, marginLeft: _moderateScale(4), ...stylesFont.fontNolan500, color: BASE_COLOR }}>
                        {
                            props?.data?.template?.data?.serviceName
                        }
                    </Text>
                </View>

                <View style={[styleElement.rowAliCenter, { paddingRight: _moderateScale(8 * 1) }]}>

                    <View
                        style={[styleElement.rowAliCenter]}>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), marginRight: _moderateScale(4), top: -2 }}>
                            {props?.data?.reactionCount}
                        </Text>
                        <Image style={[sizeIcon.xxs]} source={require('../../../NewIcon/heartRed.png')} />

                    </View>

                    <View style={{ width: _moderateScale(8 * 2) }} />

                    <View
                        style={[styleElement.rowAliCenter]}>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), marginRight: _moderateScale(4), top: -1 }}>
                            {props?.data?.commentsCount}
                        </Text>
                        <Image style={[sizeIcon.xs]} source={require('../../../NewIcon/commentBlack.png')} />

                    </View>

                </View>

            </View>
        </TouchableOpacity>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,

    elevation: 3
}

export default ItemPost;
