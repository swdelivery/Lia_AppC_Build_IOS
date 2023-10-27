import React, { memo, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { navigation } from '../../../../rootNavigation'
import { BASE_COLOR, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color'
import { stylesFont } from '../../../Constant/Font'
import { _height, _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { styleElement } from '../../../Constant/StyleElement'
import ScreenKey from '../../../Navigation/ScreenKey'
import { sizeText } from '../../../Constant/Text'
import { IconCancelGrey, IconCancelWhite } from '../../../Components/Icon/Icon'
import { sizeIcon } from '../../../Constant/Icon'
import RenderHTML from '../../../Components/RenderHTML/RenderHTML'
import { URL_ORIGINAL } from '../../../Constant/Url'

const ModalInfoReward = memo((props) => {

    const opacityBackDrop = useSharedValue(0);
    const tranXModal = useSharedValue(0)

    useEffect(() => {
        if (props?.isShow) {
            tranXModal.value = withTiming(-_width, { duration: 300 })
            opacityBackDrop.value = withTiming(1, { duration: 300 })
        } else {
        }
    }, [props?.isShow])

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
                                    Chúc mừng bạn đã {`\n`} quay được!!!
                                </Text>

                                <TouchableOpacity
                                    activeOpacity={1}
                                    // onPress={() => {
                                    //     navigation.navigate(ScreenKey.DETAIL_LIA_VOUCHER, { data: item, _getListPublicVoucher })
                                    //     // navigation.navigate(ScreenKey.DETAIL_LIA_VOUCHER, { idVoucher: item?._id })
                                    // }}
                                    style={[styles.voucherBox,shadow]}>
                                    <View style={styles.voucherBox__left}>
                                        <View>
                                            <Image
                                                style={styles.avatarVoucher}
                                                source={{
                                                    uri: `https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png`
                                                }} />
                                        </View>
                                        <View style={{ flex: 1, height: '100%', marginLeft: 8, paddingTop: _moderateScale(6) }}>
                                            <Text style={sizeText.small_500}>
                                                LiA VC
                                            </Text>
                                            <Text numberOfLines={2} style={sizeText.small_bold}>
                                               Giảm 10% cho đơn hàng từ 10.000.000 vnd trở lên
                                            </Text>
                                            <Text numberOfLines={2} style={[sizeText.small]}>
                                                Hiệu lực đến ngày: 11/11/2023
                                            </Text>
                                        </View>
                                    </View>
                                    
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


export default ModalInfoReward

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
        backgroundColor:WHITE,
        borderRadius:_moderateScale(8)
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
