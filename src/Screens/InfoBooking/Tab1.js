import React, { useRef, useEffect, useState, memo } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Button, Linking } from 'react-native';


import { _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BASE_COLOR, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BG_GREY_OPACITY_3, GREEN_SUCCESS, BLUE_FB, PRICE_ORANGE, BLACK, BLACK_OPACITY_7 } from '../../Constant/Color';
import { formatMonney, randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { URL_ORIGINAL } from '../../Constant/Url';
import { TabBar, TabView } from 'react-native-tab-view';
import { navigation } from '../../../rootNavigation';
import moment from 'moment'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { getBookingByIdForPartner } from '../../Redux/Action/BookingAction';
import { getPartnerByCollaboratorCode } from '../../Redux/Action/ProfileAction';
import FastImage from 'react-native-fast-image';
import ModalResultAdvice from './Components/ModalResultAdvice';

const Tab1 = memo((props) => {

    const [currPartnerCollab, setCurrPartnerCollab] = useState({})

    const [showModalResultAdvice,setShowModalResultAdvice] = useState({
        show:false,
        data:{}
    })

    const [listStatus, setListStatus] = useState([
        // {
        //     _id: '1',
        //     name: 'Đang chờ',
        //     status: 'WAIT'
        // },
        {
            _id: '2',
            name: 'CheckIn',
            status: 'WAIT_CONSULTATION'
        },
        {
            _id: '3',
            name: 'Bắt đầu tư vấn',
            status: 'IS_CONSULTING'
        },
        {
            _id: '4',
            name: 'Hoàn thành tư vấn',
            status: 'WAS_CONSULTED'
        },
        {
            _id: '5',
            name: 'Bắt đầu điều trị',
            status: 'IN_PROGRESS'
        },
        {
            _id: '6',
            name: 'Hoàn thành điều trị',
            status: 'COMPLETE_PROGRESS'
        },
        {
            _id: '5',
            name: 'CheckOut',
            status: 'WAS_CHECK_OUT'
        },
        {
            _id: '6',
            name: 'Huỷ',
            status: 'CANCEL'
        }
    ])

    useEffect(() => {
        let x = [
            'checkInAt',
            'startConsultationAt',
            'completeConsultationAt',
            'startProgressAt',
            'completeProgressAt',
            'checkOutAt',
        ]
    }, [])

    useEffect(() => {
        let listStatusTemp = [...listStatus]
        let indexFinded = listStatusTemp?.findIndex(item => item?.status == props?.data?.status);

        listStatusTemp.forEach((item, index) => {
            if (item?.status == 'WAIT_CONSULTATION' && props?.data?.checkInAt) {
                item['time'] = props?.data?.checkInAt
            }
            if (item?.status == 'IS_CONSULTING' && props?.data?.startConsultationAt) {
                item['time'] = props?.data?.startConsultationAt
            }
            if (item?.status == 'WAS_CONSULTED' && props?.data?.completeConsultationAt) {
                item['time'] = props?.data?.completeConsultationAt
            }
            if (item?.status == 'IN_PROGRESS' && props?.data?.startProgressAt) {
                item['time'] = props?.data?.startProgressAt
            }
            if (item?.status == 'COMPLETE_PROGRESS' && props?.data?.completeProgressAt) {
                item['time'] = props?.data?.completeProgressAt
            }
            if (item?.status == 'WAS_CHECK_OUT' && props?.data?.checkOutAt) {
                item['time'] = props?.data?.checkOutAt
            }
            if (item?.status == 'CANCEL' && props?.data?.cancelAt) {
                item['time'] = props?.data?.cancelAt
            }

            // if (index <= indexFinded) {
            //     item['active'] = true
            //     if (item?.status == 'WAIT_CONSULTATION') {
            //         if (item?.checkInAt) {
            //             item['timeDone'] = props?.data?.checkInAt
            //         }
            //     }
            //     if (item?.status == 'IS_CONSULTING') {
            //         item['timeDone'] = props?.data?.checkInAt
            //     }
            // } else {
            //     item['active'] = false
            // }
        });
        setListStatus(listStatusTemp)
    }, [props?.data?.status])

    useEffect(() => {
        if (props?.data?.referralCode) {
            _getPartnerByCollaboratorCode(props?.data?.referralCode)
        }
    }, [props?.data?.referralCode])

    const _getPartnerByCollaboratorCode = async (code) => {
        console.log({ code });
        let result = await getPartnerByCollaboratorCode({
            collaboratorCode: code?.trim()
        })
        if (result?.isAxiosError) return setCurrPartnerCollab({})
        setCurrPartnerCollab(result?.data?.data)
    }


    const _renderTempPrice = (price) => {
        let tempPrice = price
        props?.data?.partnerCoupons?.map(item => {
            if (item?.coupon?.discountType == 'percent') {
                console.log('percent', { item }, { price });
                if (item?.coupon?.maxAmountDiscount && price * item?.coupon?.discountAmount / 100 > item?.coupon?.maxAmountDiscount) {
                    tempPrice = tempPrice - item?.coupon?.maxAmountDiscount
                } else {
                    tempPrice = tempPrice - (price * item?.coupon?.discountAmount / 100)
                }
            }
            if (item?.coupon?.discountType == 'fixed') {
                console.log('fixed', { item });
                tempPrice = tempPrice - item?.coupon?.discountAmount
            }
        })
        return tempPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    const _renderDiscountAmount = (price) => {
        let tempPrice = 0
        props?.data?.partnerCoupons?.map(item => {
            if (item?.coupon?.discountType == 'percent') {
                console.log('percent', { item }, { price });
                if (item?.coupon?.maxAmountDiscount && price * item?.coupon?.discountAmount / 100 > item?.coupon?.maxAmountDiscount) {
                    tempPrice = item?.coupon?.maxAmountDiscount
                } else {
                    tempPrice = (price * item?.coupon?.discountAmount / 100)
                }
            }
            if (item?.coupon?.discountType == 'fixed') {
                console.log('fixed', { item });
                tempPrice = item?.coupon?.discountAmount
            }
        })
        return tempPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }


    if (props?.isActiveTab) {
        return (
            <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>

                <ModalResultAdvice
                    hide={() => {
                        setShowModalResultAdvice({
                            show: false,
                            data: {}
                        })
                    }}
                    data={showModalResultAdvice?.data}
                    show={showModalResultAdvice?.show} />

                {
                    props?.data?.referralCode?.length > 0 && currPartnerCollab?._id ?
                        <>
                            <Text style={styles.title}>Người giới thiệu</Text>
                            <View style={{ flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                <Image
                                    style={{
                                        width: _moderateScale(8 * 5),
                                        height: _moderateScale(8 * 5),
                                        borderRadius: _moderateScale(8 * 2.5),
                                        borderWidth: 0.5,
                                        borderColor: GREY
                                    }}
                                    source={{ uri: `${URL_ORIGINAL}${currPartnerCollab?.fileAvatar?.link}` }} />
                                <View style={{ marginLeft: _moderateScale(8) }}>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15), marginLeft: _moderateScale(4) }}>
                                        {currPartnerCollab?.name}
                                    </Text>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY }}>
                                        {currPartnerCollab?.fullPhone[0]?.slice(0, 3)}xxxxx{currPartnerCollab?.fullPhone[0]?.slice(currPartnerCollab?.fullPhone[0]?.length - 4, currPartnerCollab?.fullPhone[0]?.length)}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ height: _moderateScale(8 * 2) }} />
                            {/* <View style={[styleElement.rowAliCenter, { paddingLeft: _moderateScale(8), marginTop: _moderateScale(4) }]}>
                                <Text style={styles.codeRef}>
                                    {props?.data?.referralAncestorArr[0]?.code}
                                </Text>
                                {
                                    props?.data?.isConfirmReferral ?
                                        <View style={[sizeIcon.xs, { marginLeft: _moderateScale(8), backgroundColor: GREEN_SUCCESS, borderRadius: 50 }, styleElement.centerChild]}>
                                            <Image style={[sizeIcon.xxs]} source={require('../../Icon/tick_white.png')} />
                                        </View>
                                        : <></>
                                }
                            </View> */}
                        </>
                        : <></>
                }

                <View style={{}}>
                    <Text style={[styles.title, { marginTop: _moderateScale(8 * 0), marginBottom: _moderateScale(8) }]}>Danh sách dịch vụ</Text>

                    {
                        props?.data?.services?.map((item, index) => {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: _moderateScale(8) }}>
                                    <FastImage
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: _moderateScale(8),
                                            borderColor: BG_GREY_OPACITY_2,
                                            backgroundColor: BG_GREY_OPACITY_2,
                                            width: _moderateScale(8 * 7),
                                            height: _moderateScale(8 * 7),
                                        }}
                                        source={{
                                            uri: `${URL_ORIGINAL}${item?.service?.representationFileArr[0]?.link}`
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                    <View style={{ paddingLeft: _moderateScale(8), flex: 1 }}>
                                        <Text numberOfLines={1} style={[stylesFont.fontNolanBold, {
                                            fontSize: _moderateScale(15),
                                            color: BLACK_OPACITY_8,
                                            marginTop: _moderateScale(0),
                                        }]}>
                                            {item?.service?.name}
                                        </Text>
                                        <Text style={[stylesFont.fontNolanBold, {
                                            fontSize: _moderateScale(14),
                                            color: GREY,
                                            marginTop: _moderateScale(0),
                                        }]}>
                                            {item?.options?.map((itemTopping, indexTopping) => {
                                                if (indexTopping == item?.options?.length - 1) {
                                                    return `${itemTopping?.name}.`
                                                }
                                                return `${itemTopping?.name}, `
                                            })}
                                        </Text>
                                    </View>
                                    <View style={{ marginLeft: _moderateScale(4) }}>
                                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: PRICE_ORANGE }}>
                                            {
                                                formatMonney(item?.finalPrice)
                                            }
                                            {/* {formatMonney(item?.service?.price)}đ */}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: _moderateScale(8) }}>
                    <Text style={{ ...stylesFont.fontNolan500, color: BLACK, fontSize: _moderateScale(14) }}>
                        Ưu đãi:
                    </Text>
                    <View style={{ width: _moderateScale(8 * 2) }} />
                    <Text style={{ ...stylesFont.fontNolanBold, color: GREEN_SUCCESS, fontSize: _moderateScale(14) }}>

                        - {
                            _renderDiscountAmount(props?.data?.services?.reduce((total, item) => {
                                return total += item?.finalPrice
                            }, 0))
                        }
                    </Text>
                </View>
                <View style={{ height: _moderateScale(8 * 1) }} />
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: _moderateScale(8) }}>
                    <Text style={{ ...stylesFont.fontNolan500, color: BLACK, fontSize: _moderateScale(14) }}>
                        Tạm tính:
                    </Text>
                    <View style={{ width: _moderateScale(8 * 2) }} />
                    <Text style={{ ...stylesFont.fontNolanBold, color: BLUE_FB, fontSize: _moderateScale(14) }}>
                        {_renderTempPrice(
                            props?.data?.services?.reduce((total, item) => {
                                return total += item?.finalPrice
                            }, 0)
                        )}
                    </Text>
                </View>


                {/* {
                    props?.data?.services?.reduce((sum, item) => {
                        let listOption = item.options;
                        return [
                            ...sum,
                            ...listOption
                        ]
                    }, [])?.length > 0 ?
                        <>
                            <Text style={[styles.title, { marginTop: _moderateScale(8 * 0), marginBottom: _moderateScale(4) }]}>Tùy chọn thêm</Text>
                            {
                                props?.data?.services?.reduce((sum, item) => {
                                    let listOption = item.options;
                                    return [
                                        ...sum,
                                        ...listOption
                                    ]
                                }, [])?.map((itemMap, indexMap) => {
                                    return (
                                        <View>
                                            <Text style={{ ...stylesFont.fontNolan500, color: BLACK_OPACITY_8 }}>
                                                - {itemMap?.name}
                                            </Text>
                                        </View>
                                    )
                                })
                            }

                        </>
                        :
                        <></>
                } */}

                <View style={{ height: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }} >
                    <View style={{ position: 'absolute', left: -_moderateScale(8 * 2), height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_2, width: _width }} />
                </View>


                <View style={[styleElement.rowAliCenter]}>
                    <Text style={[styles.title, { flex: 1 }]}>Địa chỉ</Text>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL(`${props?.data?.branch?.linkMap}`)
                    }}>
                        <Text style={[styles.title, { color: BLACK_OPACITY_7, fontSize: _moderateScale(13) }]}>
                            Xem chỉ đường
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styleElement.rowAliCenter, { paddingLeft: _moderateScale(8), marginTop: _moderateScale(4) }]}>
                    <Text style={[styles.codeRef, { fontStyle: 'italic' }]}>
                        {props?.data?.branch?.address}
                    </Text>
                </View>
                {
                    props?.data?.pickUpAddress?.fullAddress || props?.data?.desiredFoodDrinkArr?.length > 0 ?
                        <View style={{}}>
                            <View style={{ height: _moderateScale(8 * 2) }} />
                            <View style={[styleElement.rowAliCenter]}>
                                <Text style={[styles.title, { flex: 1 }]}>Đưa đón & Thức uống</Text>
                            </View>
                            <View style={[styleElement.rowAliCenter, { paddingLeft: _moderateScale(8), marginTop: _moderateScale(4) }]}>
                                <Text style={[styles.codeRef, { fontStyle: 'italic' }]}>
                                    {props?.data?.pickUpAddress?.fullAddress}
                                </Text>
                            </View>
                            {
                                props?.data?.desiredFoodDrinkArr?.length > 0 ?
                                    <View style={[styleElement.rowAliCenter, { paddingLeft: _moderateScale(8), marginTop: _moderateScale(4) }]}>
                                        <Text style={[styles.codeRef, { fontStyle: 'italic' }]}>
                                            {`${props?.data?.desiredFoodDrinkArr?.map((item, index) => {
                                                return ` ${item?.name}`
                                            })
                                                }`}
                                        </Text>
                                    </View>
                                    :
                                    <></>
                            }

                        </View>
                        :
                        <></>
                }


                <Text style={[styles.title, { marginTop: _moderateScale(8 * 2) }]}>Tiến trình</Text>
                <View style={{ paddingLeft: _moderateScale(8) }}>
                    {
                        listStatus?.map((item, index) => {
                            if (item?.time) {
                                return (
                                    <View key={index} style={[{ marginTop: _moderateScale(8) }, styleElement.rowAliCenter]}>
                                        <View style={styles.dotActive}>
                                            <Text style={styles.dotActive__number}>
                                                {index + 1}
                                            </Text>
                                        </View>



                                        {
                                            item?.status == 'WAS_CONSULTED' ?
                                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                                    <Text style={[{
                                                        ...stylesFont.fontNolanBold,
                                                        fontSize: _moderateScale(14),
                                                        color: BLUE_FB,
                                                    }]}>
                                                        {item?.name}
                                                    </Text>
                                                    <TouchableOpacity
                                                    onPress={()=>{
                                                        setShowModalResultAdvice({
                                                            show: true,
                                                            data: {booking: props?.data}
                                                        })
                                                    }}
                                                    style={[shadow, {
                                                        paddingHorizontal: _moderateScale(8),
                                                        backgroundColor: GREEN_SUCCESS,
                                                        paddingVertical: _moderateScale(4),
                                                        borderRadius: _moderateScale(4),
                                                        marginLeft: _moderateScale(8 * 1)
                                                    }]}>
                                                        <Text style={[{ color: WHITE, fontSize: _moderateScale(14), ...stylesFont.fontNolanBold }]}>Chi tiết</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <Text style={styles.dotActive__text}>
                                                    {item?.name}
                                                </Text>
                                        }

                                        <Text style={styles.dotActive__time}>
                                            {moment(item?.time).format('LT')}-{moment(item?.time).format('DD/MM')}
                                        </Text>
                                    </View>
                                )
                            } else {
                                return (
                                    <View key={index} style={[{ marginTop: _moderateScale(8) }, styleElement.rowAliCenter]}>
                                        <View style={styles.dotInActive}>
                                            <Text style={styles.dotInActive__number}>
                                                {index + 1}
                                            </Text>
                                        </View>
                                        <Text style={styles.dotInActive__text}>
                                            {item?.name}
                                        </Text>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            </View>
        );
    } else {
        return <></>
    }
});

const styles = StyleSheet.create({
    dotActive__time: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(13),
        color: GREY,
        fontStyle: 'italic'
    },
    codeRef: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: BASE_COLOR
    },
    dotActive__text: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: BLUE_FB,
        flex: 1
    },
    dotActive__number: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: WHITE
    },
    dotActive: {
        width: _moderateScale(8 * 2.75),
        height: _moderateScale(8 * 2.75),
        borderRadius: _moderateScale(8 * 3),
        backgroundColor: BLUE_FB,
        ...styleElement.centerChild,
        marginRight: _moderateScale(8)
    },
    dotInActive__text: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: GREY
    },
    dotInActive__number: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: GREY
    },
    dotInActive: {
        width: _moderateScale(8 * 2.75),
        height: _moderateScale(8 * 2.75),
        borderRadius: _moderateScale(8 * 3),
        backgroundColor: BG_GREY_OPACITY_3,
        ...styleElement.centerChild,
        marginRight: _moderateScale(8)
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

export default Tab1;