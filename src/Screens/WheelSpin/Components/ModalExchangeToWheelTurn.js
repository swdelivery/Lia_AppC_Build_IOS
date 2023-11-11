import React, { memo, useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { navigation } from '../../../../rootNavigation'
import { BASE_COLOR, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color'
import { stylesFont } from '../../../Constant/Font'
import { _height, _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { styleElement } from '../../../Constant/StyleElement'
import ScreenKey from '../../../Navigation/ScreenKey'
import { sizeText } from '../../../Constant/Text'
import { IconArrowRightLarge, IconCancelGrey, IconCancelWhite, IconCoin, IconDecrease, IconIncrease } from '../../../Components/Icon/Icon'
import { sizeIcon } from '../../../Constant/Icon'
import RenderHTML from '../../../Components/RenderHTML/RenderHTML'
import { URL_ORIGINAL } from '../../../Constant/Url'
import { formatMonney } from '../../../Constant/Utils'
import { getConfigData } from '../../../Redux/Action/OrtherAction'
import { PRICE_PER_WHEEL_TURN } from "../../../Constant/CodeConfig";
import { byTurnWheel } from '../../../Redux/Action/SpinWheelAction'

const ModalExchangeToWheelTurn = memo((props) => {

    const opacityBackDrop = useSharedValue(0);
    const tranXModal = useSharedValue(0)

    const [turnValue, setTurnValue] = useState(1);
    const [pricePerWheelTurn, setPricePerWheelTurn] = useState(0)

    useEffect(() => {
        if (props?.isShow) {
            tranXModal.value = withTiming(-_width, { duration: 300 })
            opacityBackDrop.value = withTiming(1, { duration: 300 })
        } else {
        }
    }, [props?.isShow])

    useEffect(() => {
        _getPricePerWheelTurn()
    }, [])

    const _handleBuyTurnWheel = async () => {

        Alert.alert(
            "Xác nhận",
            `Xác nhận mua ${turnValue} lượt quay với giá ${formatMonney(props?.currActiveWheel?.amountPerChange * turnValue)} VND?`,
            [
                {
                    text: "Huỷ",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "Đồng ý",
                    onPress: async () => {
                        let result = await byTurnWheel({
                            "turn": turnValue,
                            "wheelCode": props?.currActiveWheel?.code
                        })
                        if (result?.isAxiosError) return;
                        Alert.alert("Mua thành công")
                        props?.getPartnerWheelTurn()
                        _handleHideModal()
                    },
                }
            ])
    }

    const _getPricePerWheelTurn = async () => {
        let result = await getConfigData(PRICE_PER_WHEEL_TURN);
        setPricePerWheelTurn(result)
    }

    const _handleHideModal = () => {
        tranXModal.value = withTiming(0, { duration: 200 }, (fnd) => {
            if (fnd) {
                runOnJS(_hideModal)()
            }
        })
        opacityBackDrop.value = withTiming(0, { duration: 200 })
    }
    const _hideModal = () => {
        props?.onHideModal()
    }


    const animXModal = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: tranXModal.value
                }
            ]
        }
    })
    const animOpacityBackDrop = useAnimatedStyle(() => {
        return {
            opacity: opacityBackDrop.value
        }
    })


    return (
        <>
            {
                props?.isShow ?
                    <View style={{
                        width: _width,
                        height: _height,
                        position: 'absolute',
                        zIndex: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>


                        <Animated.View style={[{
                            width: _width,
                            height: _height,
                        }, {
                            backgroundColor: 'rgba(0,0,0,.7)'
                        }, animOpacityBackDrop]}>
                            <TouchableOpacity onPress={() => _handleHideModal()} style={[StyleSheet.absoluteFillObject]} />
                        </Animated.View>


                        <Animated.View
                            style={[{
                                position: 'absolute',
                                width: _width,
                                alignItems: 'center',
                                right: -_width
                            }, animXModal]}>
                            <View style={{
                                width: _widthScale(350),
                                height: _widthScale(350),
                                backgroundColor: WHITE,
                                borderRadius: _moderateScale(8),
                                paddingBottom: _moderateScale(8 * 2),
                            }}>
                                <Text style={{
                                    ...stylesFont.fontNolanBold,
                                    fontSize: _moderateScale(22),
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    color: '#FDBE38',
                                    marginTop: _moderateScale(8 * 2)
                                }}>
                                    Quy đổi lượt quay
                                </Text>

                                <Text style={{
                                    ...stylesFont.fontNolanBold,
                                    fontSize: _moderateScale(14),
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    marginTop: _moderateScale(8 * 2),
                                    marginHorizontal: _moderateScale(8 * 3)
                                }}>
                                    Bạn đã hết lượt quay. Thực hiện đổi lượt quay ngay để tham gia vòng quay may mắn !!
                                </Text>

                                <View style={{ flex: 1, flexDirection: 'row', marginTop: _moderateScale(8 * 4) }}>
                                    <View style={{ flex: 2.25, alignItems: 'center' }}>
                                        <View style={{ alignSelf: 'center' }}>
                                            <IconCoin style={{
                                                width: _moderateScale(8 * 10),
                                                height: _moderateScale(8 * 10)
                                            }} />

                                        </View>
                                        <Text style={[sizeText.large_500, { marginTop: _moderateScale(8 * 2) }]}>
                                            {formatMonney(props?.currActiveWheel?.amountPerChange)} VND
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1.5, marginTop: _moderateScale(8 * 1.5) }}>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Image
                                                style={{
                                                    width: _moderateScale(8 * 7),
                                                    height: _moderateScale(8 * 7),
                                                    resizeMode: 'contain'
                                                }}
                                                source={require('../../../Image/arrowRightLarge.png')} />
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            marginTop: _moderateScale(8 * 3.5)
                                        }}>
                                            <Text style={sizeText.large_bold}>
                                                X
                                            </Text>

                                            <View style={{
                                                width: _moderateScale(8 * 3),
                                                height: _moderateScale(8 * 2.5),
                                                backgroundColor: '#D9D9D9',
                                                ...styleElement.centerChild,
                                                marginHorizontal: _moderateScale(8),
                                                borderRadius: 4
                                            }}>
                                                <Text style={sizeText.normal_bold}>
                                                    {
                                                        turnValue
                                                    }
                                                </Text>
                                            </View>

                                            <View style={{
                                                height: _moderateScale(8 * 2.5),
                                                width: _moderateScale(8 * 3)
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setTurnValue(old => old + 1)
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: -_moderateScale(8)
                                                    }}>
                                                    <IconIncrease style={sizeIcon.lg} />
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (turnValue == 1) return
                                                        setTurnValue(old => old - 1)
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: -_moderateScale(8)
                                                    }}>
                                                    <IconDecrease style={sizeIcon.lg} />
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={{ flex: 2.25 }}>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Image
                                                style={{
                                                    width: _moderateScale(8 * 10),
                                                    height: _moderateScale(8 * 10),
                                                    resizeMode: 'contain'
                                                }}
                                                source={require('../../../Image/btnSpinWheel.png')} />
                                        </View>

                                        <View style={{ alignItems: 'center', marginTop: _moderateScale(0) }}>
                                            <Text style={[sizeText.large_500]}>
                                                {turnValue} Lượt quay
                                            </Text>
                                            <Text style={[sizeText.large_500]}>
                                                {
                                                    formatMonney(props?.currActiveWheel?.amountPerChange * turnValue)
                                                } VND
                                            </Text>
                                        </View>

                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={_handleBuyTurnWheel}
                                    style={{
                                        width: _moderateScale(8 * 12),
                                        height: _moderateScale(8 * 4),
                                        borderRadius: _moderateScale(4),
                                        backgroundColor: BASE_COLOR,
                                        ...styleElement.centerChild,
                                        alignSelf: 'center'
                                    }}>
                                    <Text style={[sizeText.normal_bold, { color: WHITE, fontStyle: 'italic' }]}>Đồng ý</Text>

                                </TouchableOpacity>
                            </View>
                        </Animated.View>

                    </View>
                    :
                    <></>
            }
        </>
    )
})


export default ModalExchangeToWheelTurn

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
        width: _widthScale(320),
        height: _moderateScale(8 * 10),
        alignSelf: 'center',
        marginTop: _moderateScale(8 * 2),
        flexDirection: 'row',
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8)
    },
    titleDetail: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(16),
        color: BASE_COLOR
    },
    boxDetail__text: {
        ...stylesFont.fontNolan500,
        color: WHITE,
        fontSize: _moderateScale(12),
        fontStyle: 'italic'
    },
    boxDetail__textPercent: {
        ...stylesFont.fontNolanBold,
        color: WHITE,
        fontSize: _moderateScale(16)
    },
    boxDetail: {
        flex: 1,
        alignItems: 'center',
        height: _moderateScale(8 * 6),
        justifyContent: 'center',
        borderRadius: _moderateScale(4)
    },
    lineText: {
        width: _moderateScale(340),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: _moderateScale(8),
        alignItems: 'flex-end'
    },
    line: {
        width: _moderateScale(340),
        height: _moderateScale(8),
        alignSelf: 'center',
        borderRadius: _moderateScale(8)
    },
    textRanked: {
        ...stylesFont.fontNolanBold,
        fontSize: _moderateScale(14),
        color: GREY_FOR_TITLE
    },
    iconSizeRanked: {
        width: _moderateScale(8 * 12),
        height: _moderateScale(8 * 12)
    },
    btnBack: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(8 * 4 / 2),
        backgroundColor: BASE_COLOR
    },
    header: {
        marginTop: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2),
        alignItems: 'center'
    }

})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.36,
    shadowRadius: 1.68,

    elevation: 11
}
