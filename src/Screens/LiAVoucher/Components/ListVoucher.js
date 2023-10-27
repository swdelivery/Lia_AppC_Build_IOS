import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { BASE_COLOR, GREY, WHITE } from '../../../Constant/Color'
import { sizeText } from '../../../Constant/Text'
import { styleElement } from '../../../Constant/StyleElement'
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'
import ModalFlashMsg from '../../../Components/ModalFlashMsg/ModalFlashMsg'
import { getListPublicVoucher, takeVoucher } from '../../../Redux/Action/VoucherAction'
import moment from 'moment'
import { URL_ORIGINAL } from '../../../Constant/Url'
import { useSelector } from 'react-redux'

const ListVoucher = (props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [listVoucher, setListVoucher] = useState([])
    const [showModalFlashMsg, setShowModalFlashMsg] = useState(false)

    useEffect(() => {
        _getListPublicVoucher()
    }, [])

    const _getListPublicVoucher = async () => {
        let result = await getListPublicVoucher()
        if (result?.isAxiosError) return;
        setListVoucher(result?.data?.data)
    }

    const _handleTakeVoucher = async (item) => {


        let result = await takeVoucher({
            partnerId: infoUserRedux?._id,
            couponCode: item?.code
        })
        if (result?.isAxiosError) return

        _getListPublicVoucher()

        setShowModalFlashMsg(true)
        setTimeout(() => {
            setShowModalFlashMsg(false)
        }, 500);
    }

    const animBG = useAnimatedStyle(() => {
        if (props?.secondColor) {
            const animtedColor = interpolateColor(
                props.flagSecondIndexHasChanged.value,
                [0, 1],
                [props?.preSecondColor, props?.secondColor],
            );
            return {
                backgroundColor: animtedColor
            }
        } else {
            return {

            }
        }

    })

    const animBGBtn = useAnimatedStyle(() => {
        if (props.primaryColor) {
            const animtedColor = interpolateColor(
                props.flagIndexHasChanged.value,
                [0, 1],
                [props.preColor, props.primaryColor],
            );
            return {
                backgroundColor: animtedColor
            }
        } else {
            return {

            }
        }

    })

    return (
        <Animated.View style={[styles.container, animBG]}>

            <ModalFlashMsg
                bottom
                show={showModalFlashMsg}
                hide={() => {
                    setShowModalFlashMsg(false)
                }}
                data={'Lấy voucher thành công.'} />

            <LinearGradient
                style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['transparent', 'white']}
            />

            <ScrollView>
                {
                    listVoucher?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.DETAIL_LIA_VOUCHER, { data: item, _getListPublicVoucher })
                                    // navigation.navigate(ScreenKey.DETAIL_LIA_VOUCHER, { idVoucher: item?._id })
                                }}
                                style={styles.voucherBox}>
                                <View style={styles.voucherBox__left}>
                                    <View>
                                        <Image
                                            style={styles.avatarVoucher}
                                            source={{
                                                uri: `${URL_ORIGINAL}${item?.couponImg?.link}`
                                            }} />
                                    </View>
                                    <View style={{ flex: 1, height: '100%', marginLeft: 8, paddingTop: _moderateScale(6) }}>
                                        <Text style={sizeText.small_500}>
                                            {
                                                item?.name
                                            }
                                        </Text>
                                        <Text numberOfLines={2} style={sizeText.small_bold}>
                                            {
                                                item?.description
                                            }
                                        </Text>
                                        <Text numberOfLines={2} style={[sizeText.small]}>
                                            Hiệu lực đến ngày: {moment(item?.expiredAt).format('DD/MM/YYYY')}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.dashLine} />
                                <View style={styles.voucherBox__right}>

                                    {
                                        item?.isTaked ?
                                            <Animated.View style={[{ borderRadius: _moderateScale(4) }, { backgroundColor: GREY }]}>
                                                <TouchableOpacity
                                                    // onPress={() => {
                                                    //     _handleTakeVoucher(item)
                                                    // }}
                                                    style={styles.voucherBox__right__btn}>
                                                    <Text style={[sizeText.small_bold, { color: WHITE }]}>
                                                        Đã lấy
                                                    </Text>
                                                </TouchableOpacity>
                                            </Animated.View>
                                            :
                                            <Animated.View style={[{ borderRadius: _moderateScale(4) }, animBG]}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        _handleTakeVoucher(item)
                                                    }}
                                                    style={styles.voucherBox__right__btn}>
                                                    <Text style={[sizeText.small_bold, { color: WHITE }]}>
                                                        Lấy mã
                                                    </Text>
                                                </TouchableOpacity>
                                            </Animated.View>
                                    }


                                </View>
                            </TouchableOpacity>
                        )
                    }, [])
                }

                <View style={{ height: 100 }} />
            </ScrollView>

        </Animated.View>
    )
}

export default ListVoucher

const styles = StyleSheet.create({
    voucherBox__right__btn: {
        // paddingHorizontal: _moderateScale(8),
        // paddingVertical: _moderateScale(4),
        // backgroundColor:BASE_COLOR,
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 3),
        ...styleElement.centerChild
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
        flex: 1
    }
})