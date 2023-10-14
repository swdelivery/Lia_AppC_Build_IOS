import React, { useRef, useEffect, memo, useState } from 'react';
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
import { getAllBranch, getListBranchV2 } from '../../../Redux/Action/BranchAction';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { URL_ORIGINAL, URL_FOR_PARTNER } from '../../../Constant/Url';
import AlarmNotifi from '../../../Components/AlarmNotifi/AlarmNotifi';
import Header from '../../../Components/HeaderLoseWeight/index';
import HeaderLeft from '../../../Components/HeaderLeft';
import CountStar from '../../../Components/CountStar/index';
import store from '../../../Redux/Store';
import * as ActionType from '../../../Redux/Constants/ActionType'
import FastImage from '../../../Components/Image/FastImage';

const ListBranch = memo((props) => {

    const [listBranch, setListBranch] = useState([])

    const translateX1 = useRef(new Animated.Value(0)).current;
    const translateOpacity1 = useRef(new Animated.Value(0)).current;

    const translateX2 = useRef(new Animated.Value(0)).current;
    const translateOpacity2 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        _getListBranch()
        // _startAnimation()
    }, [])
    const _getListBranch = async () => {
        let result = await getListBranchV2({
            sort: {
                orderNumber: -1
            },
            "limit": 8,
            "page": 1
        })
        if (result?.isAxiosError) return
        setListBranch(result?.data?.data)
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
                        navigation.navigate(ScreenKey.LIST_BRANCH)
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
                listBranch?.length > 0 ?
                    <>

                        {
                            listBranch?.map((item, index) => {

                                return (
                                    <View key={index} style={{
                                        paddingHorizontal: _moderateScale(8 * 1.5),
                                        marginBottom: _moderateScale(8 * 2),
                                        backgroundColor: WHITE
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
                            listBranch?.length % 2 !== 0 ?
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
                listBranch?.length > 0 ?
                    <View style={{ alignItems: 'flex-end', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.LIST_BRANCH)
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

export default ListBranch;