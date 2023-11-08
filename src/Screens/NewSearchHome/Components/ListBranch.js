import React, { useRef, useEffect, memo } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, ScrollView } from 'react-native';
import * as Color from '../../../Constant/Color';
import { BG_GREY_OPACITY_3, BLUE, BLUE_2, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color';
import { FONT_DINTEXT_PRO, stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale, _heightScale, _width } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { ImageBackground, Image, Dimensions } from 'react-native';
import { sizeIcon, sizeLogo } from '../../../Constant/Icon';
import _ from 'lodash';
import { navigate, navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey';
import { setShowModalAllNotifi } from '../../../Redux/Action/NotificationAction';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBranch } from '../../../Redux/Action/BranchAction';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { URL_ORIGINAL, URL_FOR_PARTNER } from '../../../Constant/Url';
import AlarmNotifi from '../../../Components/AlarmNotifi/AlarmNotifi';
import Header from '../../../Components/HeaderLoseWeight/index';
import HeaderLeft from '../../../Components/HeaderLeft';
import CountStar from '../../../Components/CountStar/index';
import store from "../../../Redux/store";
import * as ActionType from '../../../Redux/Constants/ActionType'
import FastImage from '../../../Components/Image/FastImage';

const ListBranch = memo((props) => {
    return (
        <View style={{}}>
            {
                props?.data?.data?.map((item, index) => {

                    return (
                        <View key={index} style={{
                            paddingHorizontal: _moderateScale(8 * 1.5),
                            marginBottom: _moderateScale(8 * 2),
                            backgroundColor:WHITE 
                        }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate(ScreenKey.DETAIL_BRAND, { idBranch: item?._id })}
                                style={[{
                                    width: '100%',
                                    backgroundColor: WHITE,
                                    borderRadius: _moderateScale(8 * 1),
                                    paddingBottom: _moderateScale(8 * 2)
                                }, shadow]}>
                                <View style={{
                                    margin: _moderateScale(8 * 2),
                                    height: _widthScale(8 * 22),
                                    backgroundColor: Color.BG_GREY_OPACITY_2,
                                    borderRadius: _moderateScale(8),
                                    overflow: 'hidden',
                                }}>
                                    <FastImage
                                        style={[{ width: '100%', height: '100%' }]}
                                        uri={
                                            item?.representationFileArr?.length > 0 ?
                                                `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`
                                                :
                                                ""
                                        } />
                                </View>

                                <View style={{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row' }}>
                                    {
                                        item?.avatar?.link ?
                                            <Image style={{ width: _moderateScale(8 * 5), height: _moderateScale(8 * 5), borderRadius: _moderateScale(8 * 5 / 2) }}
                                                source={{ uri: `${URL_ORIGINAL}${item?.avatar?.link}` }} />
                                            : <View style={{ width: _moderateScale(8 * 5), height: _moderateScale(8 * 5), borderRadius: _moderateScale(8 * 5 / 2), backgroundColor: Color.BG_GREY_OPACITY_2 }} />
                                    }

                                    <View style={{ marginLeft: _moderateScale(8 * 2), flex: 1 }}>
                                        <Text numberOfLines={1} style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_7 }}>
                                            {item?.name}
                                        </Text>
                                        <View style={[styleElement.rowAliTop, { marginVertical: _moderateScale(4) }]}>
                                            <Image style={sizeIcon.xxs} source={require('../../../NewIcon/location.png')} />
                                            <Text style={{ marginLeft: _moderateScale(8), flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.GREY }} numberOfLines={1}>
                                                {item?.address}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row', marginTop: _moderateScale(8), justifyContent: 'space-between' }}>
                                    <View style={[styleElement.rowAliCenter]}>
                                        <CountStar reviewCount={item?.reviewCount} averageRating={parseInt(item?.averageRating)} medium />

                                        <View style={[styleElement.rowAliCenter, { marginLeft: _moderateScale(8) }]}>
                                            <Image style={sizeIcon.xxs} source={require('../../../NewIcon/people.png')} />
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: Color.GREY, marginLeft: _moderateScale(4) }}>
                                                {item?.countPartner}
                                            </Text>
                                        </View>
                                    </View>
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

export default ListBranch;