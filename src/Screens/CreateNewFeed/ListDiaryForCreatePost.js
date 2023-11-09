import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState, memo } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BG_GREY_OPACITY_9, BLACK_OPACITY_7, BG_GREY_OPACITY_2, GREEN_SUCCESS } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import FastImage from '../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ItemFeed from './Component/ItemFeed';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import ImagePicker from 'react-native-image-crop-picker';
import { getPartnerDiaryv2 } from '../../Redux/Action/Diary';
import ImageView from "react-native-image-viewing";
import { alertCustomNotAction } from '../../Constant/Utils';



const ListDiaryForCreatePost = memo((props) => {

    const [listPartnerDiary, setListPartnerDiary] = useState([])

    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])

    useEffect(() => {
        _getListDiary()
    }, [])

    const _getListDiary = async () => {
        let result = await getPartnerDiaryv2()
        if (result?.isAxiosError) return
        setListPartnerDiary(result?.data?.data)
    }

    return (
        <View style={{ flex: 1 }}>

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


            {
                listPartnerDiary?.length == 0 ?
                    <View style={[{ flex: 1 }, styleElement.centerChild]}>
                        <Text style={{
                            ...stylesFont.fontNolan500,
                            fontSize: _moderateScale(14),
                            color: GREY,
                            fontStyle: 'italic'
                        }}>
                            Hiện chưa có nhật ký mới để chia sẻ
                        </Text>
                    </View>
                    : <></>
            }

            <ScrollView>

                {
                    listPartnerDiary?.length > 0 ?
                        <View style={{ padding: _moderateScale(8 * 2), paddingBottom: _moderateScale(8) }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                                Chọn Nhật ký bạn muốn chia sẻ
                            </Text>
                        </View>
                        : <></>
                }




                {
                    listPartnerDiary?.map((item, index) => {
                        return (
                            <View style={[styles.cardDiary, shadow]} key={item?._id} >
                                <View style={[styleElement.rowAliCenter]}>
                                    <View style={styles.cardDiary__verticalLine} />
                                    <Text style={styles.cardDiary__name}>
                                        {item?.serviceName}
                                    </Text>
                                </View>

                                {
                                    item?.imageBeforeTreatment?.length > 0 ?
                                        <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8) }]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setShowImageViewing(true)
                                                    setIndexCurrImageView(0)
                                                    setListImagesSeeCurr(item?.imageBeforeTreatment)
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
                                                    item?.imageBeforeTreatment?.length > 1 ?
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
                                                                + {item?.imageBeforeTreatment?.length - 1}
                                                            </Text>
                                                        </View>
                                                        : <></>
                                                }

                                                <Image style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: _moderateScale(8)
                                                }} source={{ uri: `${URL_ORIGINAL}${item?.imageBeforeTreatment[0]?.link}` }} />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    setShowImageViewing(true)
                                                    setIndexCurrImageView(0)
                                                    setListImagesSeeCurr(item?.imageAfterTreatment)
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
                                                    item?.imageAfterTreatment?.length > 1 ?
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
                                                                + {item?.imageAfterTreatment?.length - 1}
                                                            </Text>
                                                        </View>
                                                        : <></>
                                                }
                                                <Image style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: _moderateScale(8)
                                                }} source={{ uri: `${URL_ORIGINAL}${item?.imageAfterTreatment[0]?.link}` }} />
                                            </TouchableOpacity>
                                        </View>
                                        : <></>

                                }

                                {
                                    item?.postId ?
                                        <View style={{ opacity: 0.8 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    alertCustomNotAction(`Thông báo`, `Nhật ký này đã được chia sẻ`)
                                                }}
                                                style={[styles.btnNext, { borderWidth: 1, borderColor: SECOND_COLOR, backgroundColor: 'transparent' }]}>
                                                <Text style={{
                                                    ...stylesFont.fontNolan500,
                                                    fontSize: _moderateScale(14),
                                                    color: SECOND_COLOR
                                                }}>
                                                    Đã chia sẻ
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <TouchableOpacity
                                            onPress={() => {
                                                props?.pickDiary(item)
                                            }}
                                            style={[styles.btnNext]}>
                                            <Text style={{
                                                ...stylesFont.fontNolan500,
                                                fontSize: _moderateScale(14),
                                                color: WHITE
                                            }}>
                                                Tiếp tục
                                        </Text>
                                        </TouchableOpacity>
                                }



                            </View>
                        )
                    })
                }
                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
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

export default ListDiaryForCreatePost;