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
import store from "../../../Redux/store";
import * as ActionType from '../../../Redux/Constants/ActionType'
import FastImage from '../../../Components/Image/FastImage';
import ItemEncyclopedia from './ItemEncyclopedia';
import { getEncyclopedia } from '../../../Redux/Action/News';

const Encyclopedia = memo((props) => {

    const [listEncyclopedia, setListEncyclopedia] = useState([])

    const translateX1 = useRef(new Animated.Value(0)).current;
    const translateOpacity1 = useRef(new Animated.Value(0)).current;

    const translateX2 = useRef(new Animated.Value(0)).current;
    const translateOpacity2 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        _getListEncyclopedia()
        // _startAnimation()
    }, [])
    const _getListEncyclopedia = async () => {
        let result = await getEncyclopedia({
            "limit": 8,
            "page": 1
        })
        if (result?.isAxiosError) return
        setListEncyclopedia(result?.data?.data)
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

            <View style={{ alignItems: 'flex-end', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(0) }}>
                {
                    listEncyclopedia?.length > 0 ?
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.LIST_ALL_ENCYCLOPEDIA)
                            }}
                            style={[styleElement.rowAliCenter]}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.BLACK_OPACITY_8 }}>
                                Xem tất cả
                            </Text>

                            <Animated.Image style={[
                                sizeIcon.md,
                            ]} source={require('../../../Icon/arrowRight_grey.png')} />
                        </TouchableOpacity>
                        : <></>
                }

            </View>

            {
                listEncyclopedia?.length > 0 ?
                    <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>

                        {
                            listEncyclopedia?.map((item, index) => {
                                return <ItemEncyclopedia data={item} />
                            })
                        }
                    </View>
                    :
                    <>
                        <View style={{ height: 1000 }}>
                            <Text style={{ ...stylesFont.fontNolan500, color: Color.GREY, fontSize: _moderateScale(14), fontStyle: 'italic', alignSelf: 'center', marginTop: 100 }}>
                                Đang cập nhật
                            </Text>
                        </View>
                    </>
            }

            {
                listEncyclopedia?.length > 0 ?
                    <View style={{ alignItems: 'flex-end', paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.LIST_ALL_ENCYCLOPEDIA)
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
                                ]}
                                source={require('../../../NewIcon/arrowRightWhite.png')} />
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

export default Encyclopedia;