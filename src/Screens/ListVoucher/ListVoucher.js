import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState, memo } from 'react';
import { Animated, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BLACK } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
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
import store from "../../Redux/store";
import * as Color from '../../Constant/Color';
import { getPartnerCoupon } from '../../Redux/Action/BookingAction';
import ModalInfoCoupon from '../CreateBooking/Components/ModalInfoCoupon';

const ListVoucher = memo((props) => {

    const [listCoupon, setListCoupon] = useState([])

    const [openInfoCoupon, setOpenInfoCoupon] = useState({
        show: false,
        data: {}
    })

    const [isFirstLoaded, setIsFirstLoaded] = useState(false)


    useEffect(() => {
        _getPartnerCoupon()
    }, [])

    const _getPartnerCoupon = async () => {
        let result = await getPartnerCoupon({
            "condition": {
                "usedAt": {
                    "equal": null
                }
            },
        })
        setIsFirstLoaded(true)
        if (result?.isAxiosError) return
        setListCoupon(result?.data?.data)
    }

    const _handleOnClickInfoCoupon = (data) => {
        setOpenInfoCoupon({
            data: data,
            show: true
        })
    }
    const _handleConfirmCoupon = () => {
        setOpenInfoCoupon({
            data: {},
            show: false
        })
        navigation.navigate(ScreenKey.CREATE_BOOKING)
    }

    return (
        <View style={styles.container}>
            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />


            <ModalInfoCoupon
                hide={() => {
                    setOpenInfoCoupon({
                        data: {},
                        show: false
                    })
                }}
                confirmCoupon={_handleConfirmCoupon}
                data={openInfoCoupon?.data}
                show={openInfoCoupon?.show} />

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

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]} numberOfLines={2}>
                        Danh sách mã giảm giá
                    </Text>
                </View>
            </View>

            {
                isFirstLoaded ?
                    <>
                        {
                            listCoupon?.length > 0 ?
                                <>
                                    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                                        <View style={{ height: _moderateScale(8) }} />
                                        {
                                            listCoupon?.map((item, index) => {
                                                if (false) {
                                                    return (
                                                        <View style={styles.avoucher}>
                                                            <View style={[styles.avoucher__left, shadow]}>
                                                                <View style={{ paddingLeft: _moderateScale(8 * 1) }}>
                                                                    <Text numberOfLines={1} style={styles.avoucher__left__text1}>
                                                                        {item?.couponCode}
                                                                    </Text>
                                                                    <Text numberOfLines={1} style={styles.avoucher__left__text2}>
                                                                        {item?.coupon?.name}
                                                                    </Text>
                                                                    <Text numberOfLines={1} style={styles.avoucher__left__text3}>
                                                                        HSD: {moment(item?.coupon?.expiredAt).format('DD.MM.YYYY')}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    navigation.navigate(ScreenKey.CREATE_BOOKING)
                                                                }}
                                                                activeOpacity={0.7} style={[styles.avoucher__right]}>
                                                                <View style={styles.verticalLineDash} >
                                                                    <View style={styles.verticalLineDash__line} />
                                                                    <View style={styles.verticalLineDash__line} />
                                                                    <View style={styles.verticalLineDash__line} />
                                                                    <View style={styles.verticalLineDash__line} />
                                                                </View>
                                                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(13), color: SECOND_COLOR }}>
                                                                    Sử dụng
                                                                </Text>

                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                } else {
                                                    return (
                                                        <View style={styles.voucher}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    _handleOnClickInfoCoupon(item)
                                                                }}
                                                                activeOpacity={0.7}
                                                                style={styles.voucher__left}>
                                                                <View style={{ paddingLeft: _moderateScale(8 * 1) }}>
                                                                    <Text numberOfLines={1} style={styles.avoucher__left__text1}>
                                                                        {item?.couponCode}
                                                                    </Text>
                                                                    <Text numberOfLines={1} style={styles.avoucher__left__text2}>
                                                                        {item?.coupon?.name}
                                                                    </Text>
                                                                    <Text numberOfLines={1} style={styles.avoucher__left__text3}>
                                                                        HSD: {moment(item?.coupon?.expiredAt).format('DD.MM.YYYY')}
                                                                    </Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    navigation.navigate(ScreenKey.CREATE_BOOKING)
                                                                }}
                                                                activeOpacity={0.7} style={[styles.voucher__right]}>
                                                                <View style={[styles.verticalLineDash, { backgroundColor: '#F3F3F3' }]} >
                                                                    <View style={styles.verticalLineDash__line} />
                                                                    <View style={styles.verticalLineDash__line} />
                                                                    <View style={styles.verticalLineDash__line} />
                                                                    <View style={styles.verticalLineDash__line} />
                                                                </View>
                                                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(13), color: SECOND_COLOR }}>
                                                                    Sử dụng
                                                                </Text>

                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                }

                                            })
                                        }
                                        <View style={{ height: 50 }} />
                                    </ScrollView>
                                </>
                                :
                                <View style={[{ flex: 1 }, styleElement.centerChild]}>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                                        Dữ liệu trống
                                    </Text>
                                </View>
                        }

                    </>
                    :
                    <></>
            }


        </View>
    );
});




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    avoucher__left__text1: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(12),
        color: Color.BLACK_OPACITY_7
    },
    avoucher__left__text2: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(15),
        color: Color.BLACK_OPACITY_8
    },
    avoucher__left__text3: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(12),
        color: Color.BLACK_OPACITY_7,
        marginTop: _moderateScale(4)
    },
    verticalLineDash__line: {
        width: _moderateScale(1),
        height: _moderateScale(4),
        backgroundColor: GREY,
        marginVertical: _moderateScale(2)
    },
    verticalLineDash: {
        width: _moderateScale(6),
        height: _moderateScale(8 * 5),
        backgroundColor: '#ebfcfb',
        position: 'absolute',
        left: -_moderateScale(4),
        zIndex: 1,
        // borderWidth:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avoucher__right: {
        flex: 1.25,
        borderWidth: _moderateScale(1),
        borderTopStartRadius: _moderateScale(8 * 1.5),
        borderBottomStartRadius: _moderateScale(8 * 1.5),
        borderColor: Color.SECOND_COLOR,
        borderTopRightRadius: _moderateScale(4),
        borderBottomRightRadius: _moderateScale(4),
        backgroundColor: '#ebfcfb',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avoucher__left: {
        flex: 4.75,
        borderWidth: _moderateScale(1),
        borderTopEndRadius: _moderateScale(8 * 1.5),
        borderBottomEndRadius: _moderateScale(8 * 1.5),
        borderColor: Color.SECOND_COLOR,
        borderLeftWidth: _moderateScale(6),
        borderTopLeftRadius: _moderateScale(4),
        borderBottomLeftRadius: _moderateScale(4),
        backgroundColor: '#ebfcfb',
        justifyContent: 'center',
    },
    avoucher: {
        width: _widthScale(8 * 42),
        height: _moderateScale(8 * 9),
        // borderWidth: 1,
        marginTop: _moderateScale(8 * 1),
        flexDirection: 'row',
        // marginRight: _moderateScale(8 * 2)
    },
    voucher__right: {
        flex: 1.25,
        borderWidth: _moderateScale(1),
        borderTopStartRadius: _moderateScale(8 * 1.5),
        borderBottomStartRadius: _moderateScale(8 * 1.5),
        borderColor: Color.BG_GREY_OPACITY_2,
        borderTopRightRadius: _moderateScale(4),
        borderBottomRightRadius: _moderateScale(4),
        backgroundColor: Color.BG_GREY_OPACITY_2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    voucher__left: {
        flex: 4.75,
        borderWidth: _moderateScale(1),
        borderTopEndRadius: _moderateScale(8 * 1.5),
        borderBottomEndRadius: _moderateScale(8 * 1.5),
        borderColor: Color.BG_GREY_OPACITY_2,
        borderLeftColor: SECOND_COLOR,
        borderLeftWidth: _moderateScale(6),
        borderTopLeftRadius: _moderateScale(4),
        borderBottomLeftRadius: _moderateScale(4),
        backgroundColor: Color.BG_GREY_OPACITY_2,
        justifyContent: 'center',
    },
    voucher: {
        width: _widthScale(8 * 42),
        height: _moderateScale(8 * 9),
        // borderWidth: 1,
        marginTop: _moderateScale(8 * 1),
        flexDirection: 'row',
        // marginRight: _moderateScale(8 * 2)
    },
})

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    elevation: 1
}

export default ListVoucher;