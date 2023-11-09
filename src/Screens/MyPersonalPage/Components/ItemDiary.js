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
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK, BLACK_OPACITY_7, GREEN_SUCCESS } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import ScreenKey from '../../../Navigation/ScreenKey';
import { getAllPost, getMoreAllPost } from '../../../Redux/Action/PostAction';
import isEmpty from 'lodash/isEmpty'
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import AlarmNotifi from '../../../Components/AlarmNotifi/AlarmNotifi';
import { getMinePartnerPost } from '../../../Redux/Action/PostAction'
import ImageView from "react-native-image-viewing";
import FastImage from 'react-native-fast-image'

const ItemDiary = memo((props) => {

    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])


    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(ScreenKey.EDIT_DIARY, { diaryId: props?.data?._id })
            }}
            style={[styles.cardDiary, shadow]} key={props?.data?._id} >

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

            <View style={[styleElement.rowAliCenter]}>
                <View style={[styleElement.rowAliCenter, { flex: 1 }]}>
                    <View style={styles.cardDiary__verticalLine} />
                    <Text style={styles.cardDiary__name}>
                        {props?.data?.serviceName}
                    </Text>
                </View>

                <Image style={[sizeIcon.xs]} source={require('../../../Icon/arrowRight_grey.png')} />
            </View>

            {
                props?.data?.imageBeforeTreatment?.length > 0 ?
                    <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8) }]}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowImageViewing(true)
                                setIndexCurrImageView(0)
                                setListImagesSeeCurr(props?.data?.imageBeforeTreatment)
                            }}
                            style={{ width: '48%', height: _moderateScale(8 * 16) }}>
                            <View style={[styleElement.centerChild, {
                                width: _moderateScale(8 * 8),
                                height: _moderateScale(8 * 3),
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                position: 'absolute',
                                zIndex: 1,
                                bottom: 0,
                                left: 0,
                                borderTopRightRadius: _moderateScale(8),
                                borderBottomLeftRadius: _moderateScale(4),
                            }]}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: WHITE }}>
                                    Trước
                                            </Text>
                            </View>
                            {
                                props?.data?.imageBeforeTreatment?.length > 1 ?
                                    <View style={[styleElement.centerChild, {
                                        width: _moderateScale(8 * 8),
                                        height: _moderateScale(8 * 3),
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        position: 'absolute',
                                        zIndex: 1,
                                        bottom: 0,
                                        right: 0,
                                        borderTopLeftRadius: _moderateScale(8),
                                        borderBottomRightRadius: _moderateScale(4),
                                    }]}>
                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: WHITE }}>
                                            + {props?.data?.imageBeforeTreatment?.length - 1}
                                        </Text>
                                    </View>
                                    : <></>
                            }

                            {/* <Image style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: _moderateScale(8)
                            }} source={{ uri: `${URL_ORIGINAL}${props?.data?.imageBeforeTreatment[0]?.link}` }} /> */}
                            <FastImage
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: _moderateScale(8)
                                }}
                                source={{
                                    uri: `${URL_ORIGINAL}${props?.data?.imageBeforeTreatment[0]?.link}`
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setShowImageViewing(true)
                                setIndexCurrImageView(0)
                                setListImagesSeeCurr(props?.data?.imageAfterTreatment)
                            }}
                            style={{ width: '48%', height: _moderateScale(8 * 16) }}>
                            <View style={[styleElement.centerChild, {
                                width: _moderateScale(8 * 8),
                                height: _moderateScale(8 * 3),
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                position: 'absolute',
                                zIndex: 1,
                                bottom: 0,
                                left: 0,
                                borderTopRightRadius: _moderateScale(8),
                                borderBottomLeftRadius: _moderateScale(4),
                            }]}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: WHITE }}>
                                    Sau
                                            </Text>
                            </View>
                            {
                                props?.data?.imageAfterTreatment?.length > 1 ?
                                    <View style={[styleElement.centerChild, {
                                        width: _moderateScale(8 * 8),
                                        height: _moderateScale(8 * 3),
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        position: 'absolute',
                                        zIndex: 1,
                                        bottom: 0,
                                        right: 0,
                                        borderTopLeftRadius: _moderateScale(8),
                                        borderBottomRightRadius: _moderateScale(4),
                                    }]}>
                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: WHITE }}>
                                            + {props?.data?.imageAfterTreatment?.length - 1}
                                        </Text>
                                    </View>
                                    : <></>
                            }
                            <Image style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: _moderateScale(8)
                            }} source={{ uri: `${URL_ORIGINAL}${props?.data?.imageAfterTreatment[0]?.link}` }} />
                        </TouchableOpacity>
                    </View>
                    : <></>

            }



        </TouchableOpacity>
    );
});



const styles = StyleSheet.create({
    btnNext: {
        alignSelf: 'flex-end',
        marginTop: _moderateScale(8 * 2),
        width: _moderateScale(8 * 10),
        height: _moderateScale(8 * 3.5),
        backgroundColor: SECOND_COLOR,
        borderRadius: _moderateScale(8),
        ...styleElement.centerChild
    },
    cardDiary__verticalLine: {
        width: _moderateScale(2),
        height: _moderateScale(8 * 2),
        backgroundColor: GREEN_SUCCESS,
        marginRight: _moderateScale(8)
    },
    cardDiary__name: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: BLACK_OPACITY_7
    },
    cardDiary: {
        backgroundColor: WHITE,
        marginHorizontal: _moderateScale(8 * 2),
        marginTop: _moderateScale(8 * 2),
        padding: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8)
    }
})

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

export default ItemDiary;