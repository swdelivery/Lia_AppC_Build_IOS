import React, { useRef, useEffect, useState, memo, forwardRef, useImperativeHandle } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Button } from 'react-native';


import { _moderateScale, _width, _widthScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BASE_COLOR, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BG_GREY_OPACITY_3, GREEN_SUCCESS, BLUE_FB, BLUE } from '../../Constant/Color';
import { randomStringFixLengthCode, formatMonney } from '../../Constant/Utils';
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
import LinearGradient from 'react-native-linear-gradient';
import { getDepositRequest, getBookingDeposit, getPayment } from '../../Redux/Action/InfoAction';
import ImageView from "react-native-image-viewing";


const Tab3 = forwardRef((props, ref) => {

    const [listPaymentRequest, setListPaymentRequest] = useState([])
    const [listBookingDeposit, setListBookingDeposit] = useState([])
    const [listPayment, setListPayment] = useState([])


    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])
    const [indexCurrImageView, setIndexCurrImageView] = useState(0)

    useEffect(() => {
        console.log(props?.data);
        _getPaymentRq()
        _getBookingDeposit()
        _getPayment()
    }, [props?.data])

    useImperativeHandle(ref, () => ({

        getAlert() {
            _getPaymentRq()
            _getBookingDeposit()
            _getPayment()
        }

    }));

    const _getPaymentRq = async () => {
        let result = await getDepositRequest({
            condition: {
                bookingId: {
                    equal: props?.data?._id
                }
            },
            limit: 1000
        })
        if (result?.isAxiosError) return
        setListPaymentRequest(result)
    }
    const _getPayment = async () => {
        let result = await getPayment({
            condition: {
                bookingId: {
                    equal: props?.data?._id
                },
                paymentSource: {
                    equal: "ORDER"
                }
            },
            limit: 1000
        })
        if (result?.isAxiosError) return
        setListPayment(result)
    }

    const _getBookingDeposit = async () => {
        let result = await getBookingDeposit(props?.data?._id)
        if (result?.isAxiosError) return
        setListBookingDeposit(result)
    }

    const _renderStatusPaymentRq = (status) => {

        switch (status) {
            case "WAIT":
                return (
                    <View style={{ backgroundColor: GREY, paddingHorizontal: _moderateScale(8), paddingVertical: _moderateScale(2), borderRadius: _moderateScale(4) }}>
                        <Text style={[styles.textTable, , { color: WHITE }]}>Chờ duyệt</Text>
                    </View>
                )
            case "DENY":
                return (
                    <View style={{ backgroundColor: RED, paddingHorizontal: _moderateScale(8), paddingVertical: _moderateScale(2), borderRadius: _moderateScale(4) }}>
                        <Text style={[styles.textTable, , { color: WHITE }]}>Từ chối</Text>
                    </View>
                )
            case "ACCEPT":
                return (
                    <View style={{ backgroundColor: GREEN_SUCCESS, paddingHorizontal: _moderateScale(8), paddingVertical: _moderateScale(2), borderRadius: _moderateScale(4) }}>
                        <Text style={[styles.textTable, , { color: WHITE }]}>Thành công</Text>
                    </View>
                )

            default:
                break;
        }
    }

    const _renderPaymentFor = (key) => {
        switch (key) {
            case "DEPOSIT":
                return (
                    <Text style={styles.textTable}>DEPOSIT</Text>
                )
            case "ORDER":
                return (
                    <Text style={styles.textTable}>ORDER</Text>
                )

            default:
                break;
        }
    }

    if (props?.isActiveTab) {
        return (
            <View style={{ paddingHorizontal: _moderateScale(8 * 2), flex: 1 }}>

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

                <Text style={styles.title}>Danh sách yêu cầu cọc</Text>

                <View style={{ height: _moderateScale(8 * 2) }} />
                {
                    listPaymentRequest?.length > 0 ?
                        <>
                            {/* <View style={{ flex: 1, flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, alignItems: 'center', padding: _moderateScale(4), borderTopLeftRadius: _moderateScale(8) }}>
                                    <Text style={styles.titleTable}>Số tiền</Text>
                                </View>
                                <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, alignItems: 'center', padding: _moderateScale(4) }}>
                                    <Text style={styles.titleTable}>Mô tả</Text>
                                </View>
                                <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, alignItems: 'center', padding: _moderateScale(4) }}>
                                    <Text style={styles.titleTable}>Ảnh</Text>
                                </View>
                                <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, alignItems: 'center', padding: _moderateScale(4), borderTopRightRadius: _moderateScale(8) }}>
                                    <Text style={styles.titleTable}>Trạng thái</Text>
                                </View>
                            </View> */}
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                {
                                    listPaymentRequest?.map((item, index) => {
                                        return (

                                            <View key={index} style={{
                                                width: _moderateScale(8 * 32),
                                                height: 100,
                                                borderRadius: _moderateScale(8),
                                                marginRight: _moderateScale(8 * 2)
                                            }}>
                                                <LinearGradient
                                                    colors={gradient.color}
                                                    style={gradient.container}>
                                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                                        <View style={{ flex: 3.5 }}>
                                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: WHITE }}>
                                                                {moment(item?.created).format('DD/MM/YYYY')}
                                                            </Text>
                                                            <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(20), color: WHITE }}>
                                                                {formatMonney(item?.amount)}
                                                            </Text>
                                                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: WHITE }}>
                                                                    {item?.method?.name}
                                                                </Text>
                                                            </View>

                                                        </View>

                                                        <View style={{ flex: 2.5, alignItems: 'flex-end' }}>
                                                            {
                                                                item?.images?.length > 0 ?
                                                                    <TouchableOpacity onPress={() => {
                                                                        setShowImageViewing(true)
                                                                        setIndexCurrImageView(0)
                                                                        setListImagesSeeCurr(item?.images)
                                                                    }}>
                                                                        {
                                                                            item?.images?.length > 1 ?
                                                                                <View style={{
                                                                                    position: 'absolute',
                                                                                    top: 0,
                                                                                    left: 0,
                                                                                    right: 0,
                                                                                    bottom: 0,
                                                                                    borderRadius: _moderateScale(8),
                                                                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                                                                    zIndex: 1,
                                                                                    justifyContent: 'center',
                                                                                    alignItems: 'center'
                                                                                }}>
                                                                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(20), color: WHITE, bottom: 2 }}>+{item?.images?.length - 1}</Text>
                                                                                </View>
                                                                                : <></>
                                                                        }
                                                                        <Image
                                                                            style={{
                                                                                width: _moderateScale(8 * 6),
                                                                                height: _moderateScale(8 * 6),
                                                                                borderRadius: _moderateScale(8)
                                                                            }}
                                                                            source={{ uri: `${URL_ORIGINAL}${item?.images[0]?.link}` }} />
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <></>
                                                            }
                                                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                                                {_renderStatusPaymentRq(item?.status)}
                                                            </View>

                                                        </View>
                                                    </View>
                                                </LinearGradient>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </>
                        :
                        <></>
                }

                <View style={{ height: _moderateScale(8 * 2) }} />
                <Text style={styles.title}>Chi tiết thanh toán</Text>

                {
                    listPayment?.length > 0 ?
                        <>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: _moderateScale(8) }}>
                                <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, alignItems: 'center', padding: _moderateScale(4), borderTopLeftRadius: _moderateScale(8) }}>
                                    <Text style={styles.titleTable}>Thời gian</Text>
                                </View>
                                <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, alignItems: 'center', padding: _moderateScale(4) }}>
                                    <Text style={styles.titleTable}>Số tiền</Text>
                                </View>
                                <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, alignItems: 'center', padding: _moderateScale(4) }}>
                                    <Text style={styles.titleTable}>Hình thức</Text>
                                </View>
                                {/* <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, alignItems: 'center', padding: _moderateScale(4) }}>
                                    <Text style={styles.titleTable}>PaymentFor</Text>
                                </View> */}
                                {/* <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, alignItems: 'center', padding: _moderateScale(4), borderTopRightRadius: _moderateScale(8) }}>
                                    <Text style={styles.titleTable}>PaymentFor</Text>
                                </View> */}
                            </View>
                            {
                                listPayment?.map((item, index) => { 
                                    return (
                                        <View key={index} style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, padding: _moderateScale(4) }}>
                                                {/* <Text style={[styles.textTable,{textAlign:'left'}]}>{item?.orderId}</Text> */}
                                                <Text style={[styles.textTable]}>{moment(item?.create).format('LT')} - {moment(item?.create).format('DD/MM')}</Text>
                                            </View>
                                            <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, padding: _moderateScale(4) }}>
                                                <Text style={styles.textTable}>{formatMonney(item?.amount)}</Text>
                                                <Text style={styles.textTable}>{item?.currency?.code}</Text>
                                            </View>
                                            <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, padding: _moderateScale(4) }}>
                                                {/* {
                                                    _renderPaymentFor(item?.paymentFor)
                                                } */}
                                                <Text style={styles.textTable}>{item?.method?.name}</Text>
                                                {
                                                    _renderPaymentFor(item?.paymentFor)
                                                }
                                            </View>
                                            {/* <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, padding: _moderateScale(4) }}>
                                                {
                                                    _renderPaymentFor(item?.paymentFor)
                                                }
                                            </View> */}
                                            {/* <View style={{ flex: 1, borderWidth: 0.5, borderColor: BG_GREY_OPACITY_5, padding: _moderateScale(4) }}>
                                                {_renderStatusPaymentRq(item?.status)}
                                            </View> */}
                                        </View>
                                    )
                                })
                            }
                        </>
                        :
                        <></>
                }

            </View>
        )
    } else {
        return <></>
    }
});


const gradient = {
    container: {
        flex: 1,
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: _moderateScale(8)
    },
    color: [
        '#B45D7C',
        'rgba(180, 93, 123,0.8)',
        'rgba(180, 93, 123,0.7)',
        'rgba(180, 93, 123,0.8)',
        '#B45D7C',
    ]
}


const styles = StyleSheet.create({
    textTable: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(12),
        // color: GREY,
        textAlign: 'center'
    },
    titleTable: {
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(13),
        // color: GREY,
    },
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

export default Tab3;