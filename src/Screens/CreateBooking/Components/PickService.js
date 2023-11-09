import React, { memo, useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform } from 'react-native';
import { navigation } from '../../../../rootNavigation';
import CountStar from '../../../Components/CountStar/index';
import * as Color from '../../../Constant/Color';
import { BG_GREY_OPACITY_5, BG_GREY_OPACITY_9, GREY, SECOND_COLOR, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { formatMonney, alertCustomNotAction, randomStringFixLengthCode } from '../../../Constant/Utils';
import ScreenKey from '../../../Navigation/ScreenKey';
import Collapsible from 'react-native-collapsible';
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import ModalPickTopping from '../../Booking/bookingForBranch/ModalPickTopping';

const PickService = memo((props) => {

    const [showModalPickTopping, setShowModalPickTopping] = useState({
        data: {},
        isShow: false
    })

    useEffect(() => {
        let arr = props?.listServiceHasChoice;
        console.log({ arr });
    }, [props?.listServiceHasChoice])


    const _renderTempPrice = (price) => {


        let tempPrice = price

        props?.listCouponActive?.map(item => {

            if (item?.coupon?.discountType == 'percent') {

                console.log('percent', { item }, { price });

                // if (item?.coupon?.minRequiredOrderAmount && price < item?.coupon?.minRequiredOrderAmount) {
                //     return alertCustomNotAction(`Thông báo`,`Đơn hàng chưa đạt đủ ${item?.coupon?.minRequiredOrderAmount} để áp dụng voucher này.`)
                // }


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

    return (
        <>

            <ModalPickTopping
                confirm={(currChoice, listTopping) => {
                    console.log({ currChoice, listTopping });
                    let indexCurrChoiceInArray = props?.listServiceHasChoice?.findIndex(item => item?._id == currChoice?._id);
                    if (indexCurrChoiceInArray !== -1) {
                        let tempArray = props?.listServiceHasChoice;
                        tempArray[indexCurrChoiceInArray].listTopping = listTopping
                        props?.setListServiceHasChoice(tempArray)
                    }
                }}
                data={showModalPickTopping?.data}
                show={showModalPickTopping?.isShow}
                hide={() => {
                    setShowModalPickTopping({
                        data: {},
                        isShow: false
                    })
                }}
            />
            <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 2) }}>
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                    Dịch vụ {
                        <Text style={{ color: Color.RED, fontSize: _moderateScale(16) }}>*</Text>
                    }
                </Text>
            </View>

            {/* <View style={{ paddingHorizontal: _moderateScale(8 * 2.5), marginTop: _moderateScale(8 * 2) }}>
                {
                    props?.listServiceHasChoice?.map((item, index) => {
                        console.log({ item });

                        return (
                            <View style={{ flexDirection: 'row',alignItems:'center',marginBottom:_moderateScale(8) }}>
                                <FastImage
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: _moderateScale(8),
                                        borderColor: Color.BG_GREY_OPACITY_2,
                                        backgroundColor: Color.BG_GREY_OPACITY_2,
                                        width: _moderateScale(8 * 7),
                                        height: _moderateScale(8 * 7),
                                    }}
                                    source={{
                                        uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                <View style={{ paddingLeft: _moderateScale(8), flex: 1 }}>
                                    <Text numberOfLines={1} style={[stylesFont.fontNolanBold, {
                                        fontSize: _moderateScale(15),
                                        color: Color.BLACK_OPACITY_8,
                                        marginTop: _moderateScale(0),
                                    }]}>
                                        {item?.name}
                                    </Text>
                                    <Text style={[stylesFont.fontNolanBold, {
                                        fontSize: _moderateScale(14),
                                        color: GREY,
                                        marginTop: _moderateScale(0),
                                    }]}>
                                        {item?.listTopping?.map((itemTopping, indexTopping) => {
                                            if (indexTopping == item?.listTopping?.length - 1) {
                                                return `${itemTopping?.name}.`
                                            }
                                            return `${itemTopping?.name}, `
                                        })}
                                    </Text>
                                </View>
                                <View style={{marginLeft:_moderateScale(4)}}>
                                    <Text style={{...stylesFont.fontNolanBold,fontSize:_moderateScale(14),color:Color.PRICE_ORANGE}}>
                                        {formatMonney(item?.price)}đ
                                    </Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View> */}

            {/* <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ScreenKey.PICK_SERVICE_TO_BOOKING, { setListServiceHasChoice: props?.setListServiceHasChoice, listServiceHasChoice: props?.listServiceHasChoice })
                }}
                style={[styles.itemService, {
                    justifyContent: 'center', alignItems: 'center',
                }]}>
                <Image style={sizeIcon.md} source={require('../../../NewIcon/plusGrey.png')} />
            </TouchableOpacity> */}

            <View style={[{ marginTop: _moderateScale(0), marginBottom: _moderateScale(8 * 0) }]}>
                <ScrollView
                    // contentContainerStyle={{flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    <View style={[styles.listService]}>

                        {
                            props?.listServiceHasChoice?.map((item, index) => {
                                console.log({ item });

                                return (

                                    <TouchableOpacity
                                        onPress={() => {
                                            // navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService: item?._id })
                                            console.log({ adada: item });
                                            if (props?.flashSale) return
                                            setShowModalPickTopping({
                                                data: item,
                                                isShow: true
                                            })
                                        }}
                                        style={[{
                                            marginRight: _moderateScale(8 * 2),
                                            marginBottom: _moderateScale(6),
                                            position: 'relative',
                                            height: '100%'
                                        }]} key={index}>

                                        <FastImage
                                            style={{
                                                borderWidth: 1,
                                                borderRadius: _moderateScale(8),
                                                borderColor: Color.BG_GREY_OPACITY_2,
                                                backgroundColor: Color.BG_GREY_OPACITY_2,
                                                width: _moderateScale(8 * 19),
                                                height: _moderateScale(8 * 19),
                                            }}
                                            source={{
                                                uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`
                                            }}
                                            resizeMode={FastImage.resizeMode.cover}
                                        />
                                        {
                                            props?.flashSale ?
                                                <></>
                                                :
                                                <TouchableOpacity
                                                    hitSlop={styleElement.hitslopSm}
                                                    onPress={() => {
                                                        props?.setListServiceHasChoice(olds => olds?.filter(itemFilter => itemFilter?._id !== item?._id))
                                                        props?.setListCouponActive([])
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        right: _moderateScale(-8),
                                                        top: _moderateScale(-8),
                                                        width: _moderateScale(8 * 2.5),
                                                        height: _moderateScale(8 * 2.5),
                                                        backgroundColor: Color.RED,
                                                        borderRadius: _moderateScale(8 * 2.5 / 2),
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        alignContent: 'center'
                                                    }}>
                                                    <View style={{
                                                        width: _moderateScale(8 * 1.25),
                                                        height: _moderateScale(2.5),
                                                        backgroundColor: WHITE
                                                    }} />
                                                </TouchableOpacity>
                                        }



                                        <View style={{ paddingHorizontal: _moderateScale(8 * 1), paddingVertical: _moderateScale(8 * 1), paddingBottom: _moderateScale(8 * 1), borderBottomWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, borderColor: BG_GREY_OPACITY_5, borderRadius: _moderateScale(8), borderTopEndRadius: 0, borderTopStartRadius: 0, width: _moderateScale(8 * 19) }}>
                                            {
                                                props?.flashSale ?
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.PRICE_ORANGE }]}>
                                                            {formatMonney(item?.finalPrice)}
                                                        </Text>
                                                        <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: Color.PRICE_ORANGE, fontSize: _moderateScale(14), }}>đ</Text>
                                                    </View>
                                                    :
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.PRICE_ORANGE }]}>
                                                            {/* {formatMonney(item?.price)} */}
                                                            {
                                                                item?.listTopping?.length > 0 ?
                                                                    formatMonney(
                                                                        item?.price + item?.listTopping?.reduce((previousValue, currentValue) => {
                                                                            return previousValue + currentValue?.extraAmount;
                                                                        }, 0)
                                                                    )
                                                                    :
                                                                    formatMonney(
                                                                        item?.price
                                                                    )
                                                            }
                                                        </Text>
                                                        <Text style={{ top: -_moderateScale(4), marginLeft: _moderateScale(4), ...stylesFont.fontNolanBold, color: Color.PRICE_ORANGE, fontSize: _moderateScale(14), }}>đ</Text>
                                                    </View>
                                            }


                                            <Text numberOfLines={1} style={[stylesFont.fontNolan500, {
                                                fontSize: _moderateScale(14),
                                                color: Color.BLACK_OPACITY_8,
                                                marginTop: _moderateScale(0)
                                            }]}>
                                                {item?.name}
                                            </Text>
                                            {
                                                item?.listTopping?.length > 0 ?
                                                    <Text style={[stylesFont.fontNolan500, {
                                                        fontSize: _moderateScale(14),
                                                        color: GREY,
                                                        marginTop: _moderateScale(0),
                                                        fontStyle: 'italic'
                                                    }]}>
                                                        {item?.listTopping?.map((itemTopping, indexTopping) => {
                                                            if (indexTopping == item?.listTopping?.length - 1) {
                                                                return `- ${itemTopping?.name}`
                                                            }
                                                            return `- ${itemTopping?.name}\n`
                                                        })}
                                                        {/* {item?.listTopping?.map((itemTopping, indexTopping) => {
                                                            if (indexTopping == item?.listTopping?.length - 1) {
                                                                return `${itemTopping?.name}.`
                                                            }
                                                            return `${itemTopping?.name}, `
                                                        })} */}
                                                    </Text>
                                                    :
                                                    <></>
                                            }


                                            <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8), justifyContent: 'space-between' }]}>

                                                <CountStar reviewCount={item?.reviewCount} averageRating={parseInt(item?.averageRating)} small />

                                                <View style={[styleElement.rowAliCenter]}>
                                                    <Image style={sizeIcon.xxs} source={require('../../../NewIcon/people.png')} />
                                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), color: GREY, marginLeft: _moderateScale(4) }}>
                                                        {item?.countPartner}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        {
                            props?.flashSale ?
                                <></>
                                :
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(ScreenKey.PICK_SERVICE_TO_BOOKING, { setListServiceHasChoice: props?.setListServiceHasChoice, listServiceHasChoice: props?.listServiceHasChoice })
                                    }}
                                    style={[styles.itemService, {
                                        justifyContent: 'center', alignItems: 'center',
                                    }]}>
                                    <Image style={sizeIcon.md} source={require('../../../NewIcon/plusGrey.png')} />
                                </TouchableOpacity>
                        }


                    </View>
                </ScrollView>

            </View>

            {/* {
                props?.listServiceHasChoice?.length > 0 ?
                    <>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), fontStyle: 'italic', marginLeft: _moderateScale(8 * 3) }}>Dịch vụ đi kèm:</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: _moderateScale(8 * 2) }}>
                            {
                                [1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                                    return (
                                        <TouchableOpacity style={{
                                            paddingHorizontal: _moderateScale(8 * 2),
                                            paddingVertical: _moderateScale(8),
                                            backgroundColor: Color.BG_GREY_OPACITY_2,
                                            marginLeft: _moderateScale(8 * 1),
                                            marginTop: _moderateScale(8),
                                            borderRadius: _moderateScale(4)
                                        }} >
                                            <Text style={{ ...stylesFont.fontNolan500, color: Color.BLACK }}>
                                                {"Cắt mí T-2020"}
                                            </Text>
                                            <View style={{ height: _moderateScale(2) }} />
                                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.PRICE_ORANGE }]}>
                                                560.000đ
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </>
                    :
                    <></>
            } */}



            {
                props?.flashSale ?
                    <></>
                    :

                    <Collapsible collapsed={props?.listServiceHasChoice?.length > 0 ? false : true}>
                        {
                            props?.listCoupon?.length > 0 ?
                                <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 0) }}>
                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                                        Voucher
                                    </Text>
                                </View>
                                : <></>
                        }

                        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ paddingLeft: _moderateScale(8 * 3), paddingVertical: _moderateScale(8) }}>
                            {
                                props?.listCoupon?.map((item, index) => {
                                    if (props?.listCouponActive?.find(itemFind => itemFind?._id == item?._id)) {
                                        return (
                                            <View style={styles.avoucher}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        props?.onClickInfoCoupon(item)
                                                    }}
                                                    activeOpacity={0.7}
                                                    style={[styles.avoucher__left, shadow]}>
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
                                                        props?.removeCoupon(item)
                                                    }}
                                                    activeOpacity={0.7} style={[styles.avoucher__right]}>
                                                    <View style={styles.verticalLineDash} >
                                                        <View style={styles.verticalLineDash__line} />
                                                        <View style={styles.verticalLineDash__line} />
                                                        <View style={styles.verticalLineDash__line} />
                                                        <View style={styles.verticalLineDash__line} />
                                                    </View>
                                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: SECOND_COLOR }}>
                                                        Huỷ
                                                    </Text>

                                                </TouchableOpacity>
                                            </View>
                                        )
                                    } else {
                                        return (
                                            <View style={styles.voucher}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        props?.onClickInfoCoupon(item)
                                                    }}
                                                    activeOpacity={0.7}
                                                    style={[styles.voucher__left]}>
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
                                                        console.log({ clicked: item });
                                                        if (item?.coupon?.minRequiredOrderAmount && props?.listServiceHasChoice?.reduce((sum, { price }) => sum + price, 0) < item?.coupon?.minRequiredOrderAmount) {
                                                            return alertCustomNotAction(`Thông báo`, `Đơn hàng chưa đạt đủ ${item?.coupon?.minRequiredOrderAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} để áp dụng voucher này.`)
                                                        }
                                                        props?.confirmCoupon(item)
                                                    }}
                                                    activeOpacity={0.7} style={[styles.voucher__right]}>
                                                    <View style={[styles.verticalLineDash, { backgroundColor: '#F3F3F3' }]} >
                                                        <View style={styles.verticalLineDash__line} />
                                                        <View style={styles.verticalLineDash__line} />
                                                        <View style={styles.verticalLineDash__line} />
                                                        <View style={styles.verticalLineDash__line} />
                                                    </View>
                                                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: SECOND_COLOR }}>
                                                        Chọn
                                                    </Text>

                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }

                                })
                            }
                        </ScrollView>

                        <Text style={{ ...stylesFont.fontNolan500, marginTop: _moderateScale(8), marginLeft: _moderateScale(8 * 3), fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_7 }}>
                            Tạm tính:  {
                                Platform.OS == 'ios' ?
                                    <Text style={{ color: Color.BLUE_FB, ...stylesFont.fontDinTextPro }}>
                                        {
                                            _renderTempPrice(props?.listServiceHasChoice?.reduce((sum, { price, listTopping }) => {
                                                if (listTopping?.length > 0) {
                                                    return sum + price + listTopping?.reduce((sumTopping, { extraAmount }) => {
                                                        return sumTopping + extraAmount
                                                    }, 0)
                                                } else {
                                                    return sum + price
                                                }

                                            }, 0))
                                        }
                                    </Text>
                                    :
                                    <Text style={{ color: Color.BLUE_FB, ...stylesFont.fontDinTextPro }}>
                                        {
                                            _renderTempPrice(props?.listServiceHasChoice?.reduce((sum, { price, listTopping }) => {
                                                if (listTopping?.length > 0) {
                                                    return sum + price + listTopping?.reduce((sumTopping, { extraAmount }) => {
                                                        return sumTopping + extraAmount
                                                    }, 0)
                                                } else {
                                                    return sum + price
                                                }

                                            }, 0))
                                        }
                                    </Text>
                                // <Text style={{ color: Color.BLUE_FB, ...stylesFont.fontDinTextProBold }}>
                                //     {
                                //         _renderTempPrice(props?.listServiceHasChoice?.reduce((sum, { price }) => sum + price, 0))
                                //     }
                                // </Text>
                            }
                        </Text>
                        {/* <Text style={{ ...stylesFont.fontNolan500, marginTop: _moderateScale(8), marginLeft: _moderateScale(8 * 3), fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_7 }}>
                            Tạm tính:  {
                                Platform.OS == 'ios' ?
                                    <Text style={{ color: Color.BLUE_FB, ...stylesFont.fontDinTextPro }}>
                                        {
                                            _renderTempPrice(props?.listServiceHasChoice?.reduce((sum, { price }) => sum + price, 0))
                                        }
                                    </Text>
                                    :
                                    <Text style={{ color: Color.BLUE_FB, ...stylesFont.fontDinTextProBold }}>
                                        {
                                            _renderTempPrice(props?.listServiceHasChoice?.reduce((sum, { price }) => sum + price, 0))
                                        }
                                    </Text>
                            }
                        </Text> */}
                    </Collapsible>

            }


            <View style={{ paddingHorizontal: _moderateScale(8 * 3), marginTop: _moderateScale(8 * 3) }}>
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: Color.BLACK_OPACITY_8 }}>
                    Ghi chú
                </Text>

                <View style={{
                    minHeight: _moderateScale(8 * 10),
                    backgroundColor: Color.BG_GREY_OPACITY_2,
                    marginTop: _moderateScale(8 * 2),
                    borderRadius: _moderateScale(8),
                    padding: _moderateScale(8),
                    paddingHorizontal: _moderateScale(8 * 1.5),
                    // paddingVertical:
                }}>
                    <TextInput
                        onChangeText={(content) => {
                            props?.setDescription(content)
                        }}
                        value={props?.description}
                        placeholder={'vd: Tôi muốn xử lí da dư'}
                        multiline
                        style={{
                            flex: 1,
                            fontSize: _moderateScale(14)
                        }} />
                </View>
            </View>
        </>
    );
});


const styles = StyleSheet.create({
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
        width: _moderateScale(8 * 36),
        height: _moderateScale(8 * 9),
        // borderWidth: 1,
        marginTop: _moderateScale(8 * 1),
        flexDirection: 'row',
        marginRight: _moderateScale(8 * 2)
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
        width: _moderateScale(8 * 36),
        height: _moderateScale(8 * 9),
        // borderWidth: 1,
        marginTop: _moderateScale(8 * 1),
        flexDirection: 'row',
        marginRight: _moderateScale(8 * 2)
    },
    listService: {
        flexDirection: 'row',
        paddingVertical: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 3),
        alignItems: 'center'
    },
    imgService: {
        width: '100%',
        height: _moderateScale(100),
        borderTopLeftRadius: _moderateScale(8),
        borderTopRightRadius: _moderateScale(8)
    },
    itemService: {
        width: _moderateScale(90),
        height: _moderateScale(100),
        marginRight: _moderateScale(8 * 2),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: _moderateScale(8),
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
        shadowColor: BG_GREY_OPACITY_9,
        backgroundColor: WHITE,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
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


export default PickService;