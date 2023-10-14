import React, { useRef, useEffect, useState, memo } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Button } from 'react-native';


import { _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BASE_COLOR, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BG_GREY_OPACITY_3, GREEN_SUCCESS, BLUE_FB } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { URL_ORIGINAL } from '../../Constant/Url';
import { TabBar, TabView } from 'react-native-tab-view';
import { navigation } from '../../../rootNavigation';
import moment from 'moment'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { getTreatmentDetailForPartner } from '../../Redux/Action/TreatmentAction';
import ImageView from "react-native-image-viewing";


const Tab2 = memo((props) => {

    const [listTreatmentDetail, setListTreatmentDetail] = useState([])

    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    useEffect(() => {
        console.log(props?.data);
        _getTreatmentDetailForPartner()
    }, [props?.data])

    const _getTreatmentDetailForPartner = async () => {
        let result = await getTreatmentDetailForPartner({
            condition: {
                bookingId: {
                    equal: props?.data?._id
                }
            },
            limit: 1000
        })
        if (result?.isAxiosError) return
        setListTreatmentDetail(result?.data?.data)
    }

    if (props?.isActiveTab) {
        return (
            <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>


                <ImageView
                    images={listImagesSeeCurr?.map(item => {
                        return {
                            uri: `${URL_ORIGINAL}${item?.link}`,
                        }
                    })}
                    onRequestClose={() => {
                        setShowImageViewing(false)
                    }}
                    imageIndex={indexCurrImageView}
                    visible={showImageViewing}
                />

                <Text style={styles.title}>Hình ảnh</Text>
                <View style={{ height: _moderateScale(8) }} />
                {
                    listTreatmentDetail?.map((item, index) => {
                        return (
                            <View key={index} style={[{ backgroundColor: WHITE, padding: _moderateScale(8 * 1.5), borderRadius: _moderateScale(8), marginBottom: _moderateScale(8 * 2) }, shadow]}>
                                <Text style={styles.title}>{item?.serviceName}</Text>

                                <View style={{ flexDirection: 'row', width: "100%", marginTop: _moderateScale(8 * 2), paddingLeft: _moderateScale(8) }}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {
                                            item?.imageBeforeTreatment?.map((itemImage, indexImage) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setShowImageViewing(true)
                                                            setIndexCurrImageView(indexImage)
                                                            setListImagesSeeCurr(item?.imageAfterTreatment)
                                                        }}
                                                        key={indexImage}>
                                                        <Image
                                                            style={[{
                                                                width: _moderateScale(8 * 14),
                                                                height: _moderateScale(8 * 18),
                                                                borderRadius: _moderateScale(8),
                                                                marginRight: _moderateScale(8)
                                                            }]}
                                                            source={{ uri: `${URL_ORIGINAL}${itemImage?.link}` }}
                                                        />
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                                <Text style={styles.centerTitle}>Hình ảnh trước điều trị</Text>

                                <View style={{ flexDirection: 'row', width: "100%", marginTop: _moderateScale(8 * 2), paddingLeft: _moderateScale(8) }}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {
                                            item?.imageAfterTreatment?.map((itemImage, indexImage) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setShowImageViewing(true)
                                                            setIndexCurrImageView(indexImage)
                                                            setListImagesSeeCurr(item?.imageAfterTreatment)
                                                        }}
                                                        key={indexImage}>
                                                        <Image
                                                            style={[{
                                                                width: _moderateScale(8 * 14),
                                                                height: _moderateScale(8 * 18),
                                                                borderRadius: _moderateScale(8),
                                                                marginRight: _moderateScale(8)
                                                            }]}
                                                            source={{ uri: `${URL_ORIGINAL}${itemImage?.link}` }}
                                                        />
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                                <Text style={styles.centerTitle}>Hình ảnh sau điều trị</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    } else {
        return <></>
    }
});


const styles = StyleSheet.create({
    centerTitle: {
        ...stylesFont.fontNolan500,
        alignSelf: 'center',
        fontSize: _moderateScale(13),
        color: GREY,
        fontStyle: 'italic',
        marginTop: _moderateScale(8)
    },
    title: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(16),
        color: BLACK_OPACITY_8
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

    elevation: 3
}

export default Tab2;