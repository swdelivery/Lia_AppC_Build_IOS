import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState, memo } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { navigation } from '../../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BG_GREY_OPACITY_9, BLACK_OPACITY_7, BG_GREY_OPACITY_2, GREEN_SUCCESS, BLACK } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import FastImage from '../../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../Constant/Url';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import ImagePicker from 'react-native-image-crop-picker';
import { getPartnerDiaryv2 } from '../../../Redux/Action/Diary';
import ImageView from "react-native-image-viewing";
import { alertCustomNotAction } from '../../../Constant/Utils';
import ScreenKey from '../../../Navigation/ScreenKey'

const ItemDiary = memo((props) => {


    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(ScreenKey.DETAIL_NEW_FEED, { idPost: props?.data?.postId })
            }}
            style={[styles.cardDiary, shadow,{...props}]} key={props?.data?._id} >

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

            <View style={[{ paddingHorizontal: _moderateScale(0) }]}>
                <View style={{ flexDirection: 'row' }}>
                    <FastImage
                        style={[{
                            width: _moderateScale(48),
                            height: _moderateScale(48),
                            borderRadius: _moderateScale(48),
                            borderWidth: _moderateScale(2),
                            backgroundColor: WHITE,
                            borderColor: WHITE,
                        }]}
                        uri={props?.data?.partner?.fileAvatar?.link ? `${URL_ORIGINAL}${props?.data?.partner?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                    />
                    <View style={[styles.titOfFeed]}>
                        <Text style={[styles.titFeed]}>{props?.data?.partner?.name}</Text>
                        <Text style={{...stylesFont.fontNolan,fontSize:_moderateScale(13),color:BLACK}}>
                            Cập nhật: {
                                <Text style={{...stylesFont.fontNolan500,fontSize:_moderateScale(14)}}>{moment(props?.data?.updated).fromNow()}</Text>
                            }
                        </Text>
                    </View>
                </View>

                {/* {infoUserRedux?._id === infoPost?.partnerId ?
                        <TouchableOpacity
                            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                            onPress={() => ActionSheetRef.current.show()}
                            style={[styles.moreFeed]}>
                            <Image
                                source={require('../../Image/component/more.png')} />
                        </TouchableOpacity>
                        : <></>
                    } */}
            </View>

            <View style={{height:_moderateScale(8)}}/>

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

                            <Image style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: _moderateScale(8)
                            }} source={{ uri: `${URL_ORIGINAL}${props?.data?.imageBeforeTreatment[0]?.link}` }} />
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
        marginVertical: _moderateScale(8),
        padding: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8)
    },
    titOfFeed: {
        paddingLeft: _moderateScale(6),
        paddingTop: _moderateScale(4)
    },
    titFeed: {
        color: BLUE_TITLE,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    timeFeed: {
        color: GREY_FOR_TITLE,
        fontSize: _moderateScale(11)
    },
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