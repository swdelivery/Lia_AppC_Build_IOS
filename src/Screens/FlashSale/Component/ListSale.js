import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BLACK_OPACITY_7, BLACK_OPACITY_8, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, RED, THIRD_COLOR, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _width, _heightScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { getPaymentForPartner } from '../../../Redux/Action/Affiilate';
import { getFlashSale, getServicePromotion } from '../../../Redux/Action/FlashSaleAction';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { useSelector } from 'react-redux';
import store from "../../../Redux/store";
import * as ActionType from '../../../Redux/Constants/ActionType'
import { alertCustomNotAction } from '../../../Constant/Utils';
import { sizeIcon } from '../../../Constant/Icon';

const ListSale = memo((props) => {

    const [servicePromotion, setServicePromotion] = useState([])
    const [isFirstLoaded, setIsFirstLoaded] = useState(false)

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)


    useEffect(() => {
        if (props?.data?.key) {
            console.log({ xxx: props?.data })
            _getServicePromotion(props?.data?.key)
        }
    }, [props?.data])

    const _getServicePromotion = async (id) => {
        let result = await getServicePromotion(id)
        setIsFirstLoaded(true)
        if (result?.isAxiosError) return
        setServicePromotion(result?.data?.data)
    }

    // const _getHistoryTicketLiA = async () => {
    //     let result = await getPaymentForPartner({
    //         condition: {
    //             paymentFor: {
    //                 equal: "WALLET_LIA_TICKET"
    //             }
    //         }
    //     })
    //     setIsFirstLoaded(true)
    //     if (result?.isAxiosError) return
    //     setServicePromotion(result?.data?.data)
    // }

    const _renderAmout = (item) => {

        return (<>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{
                    ...stylesFont.fontNolanBold,
                    letterSpacing: 0.8,
                    fontSize: _moderateScale(18), color: RED
                }}>
                    {item.final.toString().split('.').join("").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Text>
                <Text style={{
                    marginLeft: _moderateScale(8),
                    borderWidth: _moderateScale(0.5),
                    // height: _moderateScale(26), 
                    // width: _moderateScale(26), 
                    borderRadius: _moderateScale(2),
                    backgroundColor: '#fdd8e0',
                    borderColor: '#ff3f6b',
                    color: RED,
                    lineHeight: _moderateScale(24),
                    fontSize: _moderateScale(11),
                    paddingHorizontal: _moderateScale(2),
                    textAlign: 'center'
                }}>
                    {
                        100 - Math.floor((item?.final / item?.amount) * 100)
                    }%
                </Text>
            </View>
            <Text style={{ fontSize: _moderateScale(14), textDecorationLine: 'line-through', color: GREY }}>
                {item?.amount.toString().split('.').join("").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Text></>
        )
    }

    return (
        <View style={styles.container}>
            {
                // isFirstLoaded ?
                <>
                    {
                        servicePromotion?.length > 0 ?
                            <ScrollView>
                                <View style={{ height: _moderateScale(8 * 2) }} />
                                {
                                    servicePromotion?.map((item, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    onPress={() => {

                                                        navigation.navigate(ScreenKey.DETAIL_SERVICE_FLASH_SALE, {
                                                            idService: item?.service?._id,
                                                            servicePromotion: item,
                                                            choiceService: {
                                                                ...item?.service,
                                                                finalPrice: item?.finalPrice,
                                                                servicePromotionId: item?._id
                                                            },
                                                            ready: props?.data?.type === 'current' ? true : false
                                                        })

                                                        // if(props?.data?.type === 'current'){
                                                        //     navigation.navigate(ScreenKey.DETAIL_SERVICE_FLASH_SALE, {
                                                        //         idService: item?.service?._id,
                                                        //         servicePromotion: item,
                                                        //         choiceService: {
                                                        //             ...item?.service,
                                                        //             finalPrice: item?.finalPrice,
                                                        //             servicePromotionId: item?._id
                                                        //         },
                                                        //         ready: props?.data?.type === 'current' ? true : false
                                                        //     })
                                                        // }else{
                                                        //     alertCustomNotAction(`Thông báo`,`Hiện chưa đến khung giờ áp dụng khuyến mãi`)
                                                        // }


                                                    }}
                                                    style={{
                                                        paddingHorizontal: _moderateScale(8 * 2),
                                                        flexDirection: 'row',
                                                    }} key={item?._id}>
                                                    {
                                                        item?.service?.representationFileArr?.length > 0 ?
                                                            <Image style={{
                                                                width: _moderateScale(88),
                                                                height: _moderateScale(88)
                                                            }} source={{
                                                                uri: `${URL_ORIGINAL}${item?.service?.representationFileArr[0]?.link}`
                                                            }} />
                                                            :
                                                            <View style={{
                                                                width: _moderateScale(88),
                                                                height: _moderateScale(88),
                                                                backgroundColor: BG_GREY_OPACITY_2
                                                            }} />
                                                    }
                                                    {/* <Image style={{
                                                        width: _moderateScale(88),
                                                        height: _moderateScale(88)
                                                    }} source={require('../../../Image/flashsale.png')} /> */}
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        paddingHorizontal: _moderateScale(12),
                                                        flex: 1
                                                    }}>
                                                        <View>
                                                            <Text style={{
                                                                ...stylesFont.fontNolan500,
                                                                fontSize: _moderateScale(14), color: GREY_FOR_TITLE
                                                            }}>
                                                                {index + 1}. {item?.service?.name}
                                                            </Text>
                                                            <View style={[styleElement.colAliTop, { marginTop: _moderateScale(4), paddingRight: _moderateScale(8) }]}>

                                                                {
                                                                    item?.originalPrice ?
                                                                        _renderAmout({ amount: item?.originalPrice, final: item?.finalPrice })
                                                                        : <></>
                                                                }
                                                            </View>
                                                        </View>
                                                        <View style={{
                                                            width: '100%',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexDirection: 'row', justifyContent: 'space-between'
                                                        }}>
                                                            <View style={{
                                                                height: _moderateScale(8 * 2), flex: 1,
                                                                marginRight: _moderateScale(16),
                                                                borderRadius: _moderateScale(6), backgroundColor: '#fdd8e0',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}>

                                                                <Image style={[
                                                                    sizeIcon.lg,
                                                                    {
                                                                        position: 'absolute',
                                                                        left: 0,
                                                                        zIndex: 100
                                                                    }
                                                                ]} source={require('../../../Image/flashsale/fire.png')} />

                                                                <Text style={{
                                                                    position: 'absolute',
                                                                    zIndex: 1,
                                                                    ...stylesFont.fontNolanBold,
                                                                    fontSize: _moderateScale(12),
                                                                    alignSelf: 'center',
                                                                    color: WHITE
                                                                }}>
                                                                    {`Đã bán: ${item?.usage}/${item?.limit}`}
                                                                </Text>
                                                                <View style={{
                                                                    height: _moderateScale(8 * 1.75),
                                                                    width: `${item?.usage / item?.limit * 100}%`,
                                                                    borderRadius: _moderateScale(6), backgroundColor: RED,
                                                                    alignSelf: 'flex-start'
                                                                }}>
                                                                </View>
                                                            </View>
                                                            {props?.data?.type === 'current' ?
                                                                <View style={
                                                                    item?.usage == item?.limit && { opacity: 0.3 }
                                                                }>
                                                                    <TouchableOpacity
                                                                        onPress={() => {

                                                                            if (item?.usage == item?.limit) {
                                                                                return alertCustomNotAction(`Thông báo`, `Đã hết lượt áp dụng khuyến mãi này, bạn hãy chờ đợt kế tiếp nhé!`)
                                                                            }

                                                                            if (!infoUserRedux?._id) {
                                                                                store.dispatch({
                                                                                    type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
                                                                                    payload: {
                                                                                        flag: true,
                                                                                        currRouteName: props?.route?.name
                                                                                    }
                                                                                })
                                                                                return
                                                                            }

                                                                            navigation.navigate(ScreenKey.CREATE_BOOKING_FLASH_SALE, {
                                                                                choiceService: {
                                                                                    ...item?.service,
                                                                                    finalPrice: item?.finalPrice,
                                                                                    servicePromotionId: item?._id
                                                                                }
                                                                            })
                                                                        }}
                                                                        style={[{
                                                                            paddingHorizontal: _moderateScale(8),
                                                                            borderRadius: _moderateScale(4),
                                                                            paddingVertical: _moderateScale(2),
                                                                            backgroundColor: BASE_COLOR
                                                                        },
                                                                        ]}>
                                                                        <Text style={{ color: WHITE, fontSize: _moderateScale(14) }}>Đặt hẹn</Text>
                                                                    </TouchableOpacity>
                                                                </View> : <></>}
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{ marginVertical: _moderateScale(8 * 1), alignSelf: 'center', width: "90%", height: _moderateScale(1), backgroundColor: BG_GREY_OPACITY_5 }} />
                                                {/* {
                                                    index === 4 ?
                                                        <Image source={require('../../../Image/dev.png')} style={{
                                                            width: _width,
                                                            resizeMode: 'contain',
                                                            marginBottom: _moderateScale(12),
                                                            height: _width * 0.6
                                                        }} />
                                                        :
                                                        <></>
                                                } */}
                                            </>
                                        )
                                    })
                                }

                                <View style={{ height: getBottomSpace() + _moderateScale(150) }} />
                            </ScrollView>
                            :
                            <View style={[{ flex: 1, alignItems: 'center', paddingTop: _heightScale(8 * 30) }]}>
                                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY, fontStyle: 'italic' }}>
                                    Sự kiện chưa diễn ra
                                </Text>
                            </View>
                    }
                </>
                // :
                // <>
                // </>
            }

        </View>
    );
});


const styles = StyleSheet.create({
    btnBank: {
        backgroundColor: BG_GREY_OPACITY_2,
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: _moderateScale(8 * 8 / 2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoBank: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        resizeMode: 'contain',
    },
    inputHeader: {
        marginHorizontal: _moderateScale(8 * 3),
        marginTop: _moderateScale(8),
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_2
    },
    container: {
        flex: 1,
        backgroundColor: WHITE,
        paddingBottom: _moderateScale(32)
    }
})


export default ListSale;
