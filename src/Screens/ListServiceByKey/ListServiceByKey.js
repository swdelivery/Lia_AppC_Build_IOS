import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import { Animated, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK, BLACK_OPACITY_7, MAIN_BG, PRICE_ORANGE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale, _width } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import FastImage from '../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SET_CURRENT_LIST_COMMENT_CHILD } from '../../Redux/Constants/ActionType';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getAllPostComment, getPostById, getPostByIdv2, createPostReaction, addReactionPost } from '../../Redux/Action/PostAction';
import { AppState } from 'react-native'
import SocketInstance from "../../../SocketInstance";
import { CSS_PARTNER_POST_JOIN_ROOM, CSS_PARTNER_POST_LEFT_ROOM } from '../../Sockets/type'
import isEmpty from 'lodash/isEmpty';
import ListImage from '../NewFeed/Component/ListImage';
import { getPartnerDiaryDailyByIdv2 } from '../../Redux/Action/PartnerDiary';
import ScreenKey from '../../Navigation/ScreenKey'
import * as ActionType from '../../Redux/Constants/ActionType'
import ImageView from "react-native-image-viewing";
import { getListDiaryByType } from '../../Redux/Action/Diary'
import { getServicev2 } from '../../Redux/Action/Service';
import { formatMonney } from '../../Constant/Utils';
import CountStar from '../../Components/CountStar/index';

const ListServiceByKey = memo((props) => {

    const [listService, setListSerivce] = useState([])

    useEffect(() => {
        if (props?.route?.params?.keySearch) {
            _getServiceByKey()
        }
    }, [props?.route?.params?.keySearch])

    const _getServiceByKey = async () => {
        let result = await getServicev2({
            "sort": {
                orderNumber: -1
            },
            "page": 1,
            "search": props?.route?.params?.keySearch?.trim()
        })
        if (result?.isAxiosError) return
        setListSerivce(result?.data?.data)
    }


    return (
        <View style={styles.container}>
            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                paddingVertical: _moderateScale(8 * 1.5),
                borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: BG_GREY_OPACITY_3,
                backgroundColor: WHITE,
                // height: _moderateScale(8 * 6)
            }}>
                <View style={[{ width: _moderateScale(8 * 5) }, { alignItems: 'flex-start' }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../Icon/back_bold.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {
                        true ?
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]} numberOfLines={2}>
                                Dịch vụ
                        </Text>
                            : <></>
                    }
                </View>
            </View>

            {
                listService?.length > 0 ?
                    <ScrollView>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {
                                listService?.map((item, index) => {
                                    console.log({ item });

                                    return (
                                        <View style={{ backgroundColor: 'transparent' }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService: item?._id })
                                                }}
                                                activeOpacity={0.8}
                                                style={[styles.btnService, shadow]}>
                                                {/* <Image
                                        resizeMode={'cover'}
                                        style={[{ backgroundColor: BG_GREY_OPACITY_5, width: "100%", height: _widthScale(8 * 21), borderRadius: _moderateScale(8 * 1) }]}
                                        imageStyle={{ borderWidth: 1 }}
                                        source={{
                                            uri: `${URL_ORIGINAL}${item?.representationFileArr.length > 0 ? item?.representationFileArr[0]?.link : ''}`,
                                        }} /> */}

                                                <FastImage
                                                    style={[{ backgroundColor: BG_GREY_OPACITY_5, width: "100%", height: _widthScale(8 * 21), borderRadius: _moderateScale(8 * 1) }]}
                                                    uri={
                                                        `${URL_ORIGINAL}${item?.representationFileArr.length > 0 ? item?.representationFileArr[0]?.link : ''}`
                                                    } />

                                                <View style={{ paddingHorizontal: _moderateScale(8 * 1), paddingVertical: _moderateScale(8 * 1), paddingBottom: _moderateScale(8 * 1) }}>
                                                    {
                                                        item?.price ?
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: PRICE_ORANGE }]}>
                                                                    {formatMonney(item?.price)}
                                                                </Text>
                                                                <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: PRICE_ORANGE, fontSize: _moderateScale(14), }}>đ</Text>
                                                            </View>
                                                            : <></>}
                                                    <Text numberOfLines={1} style={[stylesFont.fontNolan500, {
                                                        fontSize: _moderateScale(14),
                                                        color: BLACK_OPACITY_8,
                                                        marginTop: _moderateScale(0)
                                                    }]}>
                                                        {item?.name}
                                                    </Text>
                                                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8), justifyContent: 'space-between' }]}>
                                                        <CountStar reviewCount={item?.reviewCount} averageRating={parseInt(item?.averageRating)} small />
                                                        <View style={[styleElement.rowAliCenter]}>
                                                            <Image style={sizeIcon.xxs} source={require('../../NewIcon/people.png')} />
                                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(4) }}>
                                                                {item?.countPartner}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={[styleElement.rowAliBottom, { justifyContent: 'space-between', marginTop: _moderateScale(4) }]}>
                                                    </View>
                                                    <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(0), justifyContent: 'space-between' }]}>
                                                        <View />
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
                    </ScrollView>

                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...stylesFont.fontNolan500, color: GREY, fontStyle: 'italic' }}>
                            Chưa có dữ liệu
                    </Text>
                    </View>
            }
            <View style={{ height: 50 }} />


        </View>
    );
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    card: {
        width: _width / 2 - _widthScale(8 * 2.5),
        height: _width / 2 - _widthScale(8 * 2.5),
        borderWidth: 1,
        margin: _moderateScale(4)
    },
    btnChoice__text: {
        fontSize: _moderateScale(12),
        color: WHITE,
        bottom: _moderateScale(1)
    },
    btnChoice: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: SECOND_COLOR,
        marginRight: _moderateScale(8 * 2)
    },
    price: {
        paddingHorizontal: _moderateScale(8 * 1.5),
        borderRadius: _moderateScale(4),
        backgroundColor: SECOND_COLOR,
        position: 'absolute',
        left: _moderateScale(8 * 2),
        height: _moderateScale(8 * 3.5),
        justifyContent: 'center',
        alignItems: 'center',
        top: -_moderateScale(8 * 3.5 / 2)
    },
    btnService: {
        width: _widthScale(8 * 21),
        // height:_heightScale(8*),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 1),
        margin: _moderateScale(8),
        // borderWidth: 1,
        // borderColor: BG_GREY_OPACITY_5,
        backgroundColor: 'rgba(7,140,127,0.8)',
        backgroundColor: '#158C80',
        backgroundColor: 'white'
    }
})



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


export default ListServiceByKey;