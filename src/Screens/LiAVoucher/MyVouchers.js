import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import LiAHeader from '../../Components/Header/LiAHeader'
import LinearGradient from 'react-native-linear-gradient'
import { navigation } from '../../../rootNavigation'
import ScreenKey from '../../Navigation/ScreenKey'
import { sizeText } from '../../Constant/Text'
import Animated from 'react-native-reanimated'
import { _moderateScale, _widthScale } from '../../Constant/Scale'
import { styleElement } from '../../Constant/StyleElement'
import { getPartnerCoupon } from '../../Redux/Action/BookingAction'
import moment from 'moment'
import { URL_ORIGINAL } from '../../Constant/Url'

const MyVouchers = memo(() => {

    const [listVoucher, setListVoucher] = useState([])

    useEffect(() => {
        _getListCoupon()
    }, [])

    const _getListCoupon = async () => {
        let result = await getPartnerCoupon({
            "condition": {
                // "usedAt": {
                //     "equal": null
                // }
            },
        })
        if (result?.isAxiosError) return
        setListVoucher(result?.data?.data)
    }

    return (
        <View style={styles.container}>
            <LiAHeader barStyle={'light-content'} title={"Mã giảm giá của tôi"} />
            <View style={{
                flex: 1
            }}>
                <LinearGradient
                    style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={[BASE_COLOR, 'white']}
                />

                <ScrollView>
                    {
                        listVoucher?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        // navigation.navigate(ScreenKey.DETAIL_LIA_VOUCHER, { isTaked: true })
                                        navigation.navigate(ScreenKey.DETAIL_LIA_VOUCHER, { data: { ...item?.coupon, isTaked: true } })
                                    }}
                                    style={styles.voucherBox}>
                                    <View style={styles.voucherBox__left}>
                                        <View>
                                            <Image
                                                style={styles.avatarVoucher}
                                                source={{
                                                    uri: `${URL_ORIGINAL}${item?.coupon?.couponImg?.link}`
                                                }} />
                                        </View>
                                        <View style={{ flex: 1, height: '100%', marginLeft: 8, paddingTop: _moderateScale(6) }}>
                                            <Text style={sizeText.small_500}>
                                                {
                                                    item?.coupon?.name
                                                }
                                            </Text>
                                            <Text numberOfLines={2} style={sizeText.small_bold}>
                                                {
                                                    item?.coupon?.description
                                                }
                                            </Text>
                                            <Text numberOfLines={2} style={[sizeText.small]}>
                                                Hiệu lực đến ngày: {moment(item?.coupon?.expiredAt).format('DD/MM/YYYY')}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.dashLine} />
                                    <View style={styles.voucherBox__right}>
                                        <Animated.View style={[{}]}>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate(ScreenKey.CREATE_BOOKING)
                                                }}
                                                style={styles.voucherBox__right__btn}>
                                                <Text style={[sizeText.small_bold, { color: WHITE }]}>
                                                    Sử dụng
                                                </Text>
                                            </TouchableOpacity>
                                        </Animated.View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }, [])
                    }
                </ScrollView>
            </View>
        </View>
    )
})

export default MyVouchers

const styles = StyleSheet.create({
    voucherBox__right__btn: {
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        backgroundColor: BASE_COLOR,
        borderRadius: _moderateScale(4)
    },
    avatarVoucher: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: _moderateScale(8)
    },
    dashLine: {
        width: 1,
        height: _moderateScale(8 * 8),
        backgroundColor: 'transparent',
        borderStyle: 'dashed',
        borderWidth: 1,
        top: _moderateScale(8),
        borderColor: WHITE
    },
    voucherBox__left: {
        flex: 1,
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8)
    },
    voucherBox__right: {
        width: _moderateScale(8 * 10),
        height: _moderateScale(8 * 10),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8),
        ...styleElement.centerChild

    },
    voucherBox: {
        width: _widthScale(340),
        height: _moderateScale(8 * 10),
        alignSelf: 'center',
        marginTop: _moderateScale(8 * 2),
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})