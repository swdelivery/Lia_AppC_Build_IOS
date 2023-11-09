import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { BASE_COLOR, GREEN_SUCCESS, PRICE_ORANGE, WHITE } from '../../Constant/Color'
import LiAHeader from '../../Components/Header/LiAHeader'
import { sizeIcon } from '../../Constant/Icon'
import { _moderateScale, _width, _widthScale } from '../../Constant/Scale'
import { styleElement } from '../../Constant/StyleElement'
import { sizeText } from '../../Constant/Text'
import RenderHTML from '../../Components/RenderHTML/RenderHTML'
import { getConfigData } from '../../Redux/Action/OrtherAction'
import Lottie from 'lottie-react-native';
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay, withTiming } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { stylesFont } from '../../Constant/Font'
import { styleText } from '../../Constant/StyleText'
import ModalFlashMsg from '../../Components/ModalFlashMsg/ModalFlashMsg'
import { navigation } from '../../../rootNavigation'
import ScreenKey from '../../Navigation/ScreenKey'
import { getDetailVoucher, takeVoucher } from '../../Redux/Action/VoucherAction'
import moment from 'moment'
import { URL_ORIGINAL } from '../../Constant/Url'
import { useSelector } from 'react-redux'
import { formatMonney } from '../../Constant/Utils'

const HEIGHT_BOTTOM_SWIPER = _moderateScale(90);

const clamp = (value, min, max) => {
    'worklet';
    return Math.min(Math.max(value, min), max);
};

const DetailLiAVoucher = memo((props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [dataHTML, setDataHTML] = useState("");
    const [takingVoucher, setTakingVoucher] = useState(false)

    const tranYBottomSwiper = useSharedValue(0);
    const [showModalFlashMsg, setShowModalFlashMsg] = useState(false)

    const tranCircleX = useSharedValue(0)

    useEffect(() => {
        _getData()
        console.log({ props });
        // _getDetailVoucher()
    }, [])

    useEffect(() => {
        if (props?.route?.params?.idVoucher) {
            _getDetailVoucher(props?.route?.params?.idVoucher)
        }
    }, [props?.route?.params?.idVoucher])

    const _getDetailVoucher = async (_id) => {
        let result = await getDetailVoucher(_id)
    }

    useEffect(() => {
        if (takingVoucher) {
            _handleTakeVoucher(props?.route?.params?.data)
        }
    }, [takingVoucher])

    const _handleTakeVoucher = async (item) => {
        let result = await takeVoucher({
            partnerId: infoUserRedux?._id,
            couponCode: item?.code
        })
        if (result?.isAxiosError) return

        props?.route?.params?._getListPublicVoucher()

        setShowModalFlashMsg(true)
        setTimeout(() => {
            setShowModalFlashMsg(false)
        }, 500);
    }

   

    const _getData = async () => {
        let result = await getConfigData("DEMO_HTML_DATA");
        if (result?.isAxiosError) return;

        setDataHTML(result)

    }

    useEffect(() => {
        if (showModalFlashMsg) {
            setTimeout(() => {
                setShowModalFlashMsg(false)
            }, 1000);
        }
    }, [showModalFlashMsg])

    useEffect(() => {
        console.log({ dataHTML });
    }, [dataHTML])

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.startX = tranCircleX.value;
        },
        onActive: (event, ctx) => {
            tranCircleX.value = clamp(
                event.translationX + ctx.startX,
                0,
                120
            );
        },
        onEnd: (event) => {
            tranCircleX.value = withDecay({
                velocity: event.velocityX,
                clamp: [0, 120], // optionally define boundaries for the animation
            }, () => {
                runOnJS(setShowModalFlashMsg)(true);
                runOnJS(setTakingVoucher)(true);
                tranYBottomSwiper.value = withTiming(HEIGHT_BOTTOM_SWIPER, { duration: 500 })
            });
        },
    });

    const showModal = () => {
        'worklet'
        Alert.alert('awdawd')
    }

    const animCircleX = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: tranCircleX.value },
            ],
        };
    })
    const animWidthBG = useAnimatedStyle(() => {
        const interpolateWidth = interpolate(tranCircleX.value, [0, 120], [0, 120], { extrapolateRight: Extrapolation.CLAMP });
        return {
            width: interpolateWidth
        }
    })
    const animTranYBottomSwiper = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: tranYBottomSwiper.value
                }
            ]
        }
    })

    return (
        <View style={styles.container}>

            <ModalFlashMsg
                show={showModalFlashMsg}
                hide={() => {
                    setShowModalFlashMsg(false)
                }}
                data={'Lấy voucher thành công.'} />

            <LiAHeader
                barStyle={'dark-content'}
                bg={WHITE}
                title={'Chi tiết mã giảm giá'}
                titleColor={'black'}
            />
            <ScrollView>
                <View style={styles.banner}>
                    <View style={[styles.banner__voucher, shadow]}>
                        <View style={[styles.voucherBox__left]}>
                            <View>
                                <Image
                                    style={styles.avatarVoucher}
                                    source={{
                                        uri: `${URL_ORIGINAL}${props?.route?.params?.data?.couponImg?.link}`
                                    }} />
                            </View>
                            <View style={{ flex: 1, height: '100%', marginLeft: 8, paddingTop: _moderateScale(6) }}>
                                <Text style={sizeText.small_500}>
                                    {
                                        props?.route?.params?.data?.name
                                    }
                                </Text>
                                <Text numberOfLines={2} style={sizeText.small_bold}>
                                    {
                                        props?.route?.params?.data?.description
                                    }
                                </Text>
                                <Text numberOfLines={2} style={[sizeText.small]}>
                                    Hiệu lực đến ngày: {moment(props?.route?.params?.data?.expiredAt).format('DD/MM/YYYY')}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: _moderateScale(8 * 5), paddingHorizontal: _moderateScale(8 * 2) }}>
                    {
                        props?.route?.params?.data?.content ?
                            <RenderHTML data={props?.route?.params?.data?.content} />
                            :
                            <></>
                    }

                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <Animated.View style={[{
                height: _moderateScale(90),
                width: _width,
                backgroundColor: WHITE,
                position: 'absolute',
                bottom: 0,
                alignItems: 'center',
                paddingTop: _moderateScale(8 * 2)
            }, shadow]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.CREATE_BOOKING)
                    }}
                    style={{
                        width: _moderateScale(320),
                        height: _moderateScale(8 * 5),
                        backgroundColor: BASE_COLOR,
                        ...styleElement.centerChild,
                        borderRadius: _moderateScale(8)
                    }}>
                    <Text style={[sizeText.normal_bold, { color: WHITE }]}>
                        Sử dụng mã giảm giá
                    </Text>
                </TouchableOpacity>
            </Animated.View>


            {
                props?.route?.params?.data?.isTaked ?
                    <>
                    </>
                    :
                    <Animated.View style={[{
                        height: _moderateScale(90),
                        width: _width,
                        flexDirection: 'row',
                        backgroundColor: WHITE,
                        position: 'absolute',
                        bottom: 0
                    }, shadow, animTranYBottomSwiper]}>

                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            paddingTop: _moderateScale(8)
                        }}>
                            <Text style={sizeText.normal_500}>Tiết kiệm đến</Text>
                            <Text style={[stylesFont.fontDinTextProBold, {
                                fontSize: _moderateScale(18),
                                color: PRICE_ORANGE
                            }]}>
                                {formatMonney(props?.route?.params?.data?.maxAmountDiscount)} vnd
                            </Text>
                        </View>

                        <View style={{
                            height: _moderateScale(90),
                            width: _widthScale(220),
                            // backgroundColor: "#4ECCC9",
                            paddingTop: 8,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                        }}>
                            <View style={{
                                width: 120,
                                height: 50,
                                backgroundColor: '#e0e0e0',
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    height: 50, width: 50, borderRadius: 25, position: 'absolute', left: -25, top: 0, backgroundColor: '#4ECCC9'
                                }} />



                                <View style={{
                                    height: 50, width: 50, borderRadius: 25, position: 'absolute', zIndex: -1, right: -25, top: 0, backgroundColor: '#e0e0e0'
                                }} />

                                <View style={{ right: _moderateScale(8), position: 'absolute' }}>
                                    <Text style={[sizeText.small_bold, { color: GREEN_SUCCESS }]}>
                                        Lấy ngay!!
                                    </Text>
                                </View>

                                <Animated.View style={[{
                                    backgroundColor: '#4ECCC9',
                                    height: 50,
                                    position: 'absolute',
                                    left: 0
                                }, animWidthBG]} />

                                <PanGestureHandler onGestureEvent={eventHandler}>
                                    <Animated.View style={[{
                                        height: 50, width: 50, borderRadius: 25, position: 'absolute', left: -25, top: 0, backgroundColor: 'white'
                                    }, animCircleX, shadow2]} >

                                        <Lottie
                                            speed={1}
                                            autoPlay={true}
                                            loop={true}
                                            style={{ width: _moderateScale(60), height: _moderateScale(60), left: _moderateScale(-10), top: _moderateScale(-10) }}
                                            // ref={animationLoadRef}
                                            source={require('../../Json/delivery.json')}
                                        />

                                    </Animated.View>
                                </PanGestureHandler>
                            </View>

                        </View>
                    </Animated.View>
            }


        </View>
    )
})

export default DetailLiAVoucher

const styles = StyleSheet.create({
    voucherBox__right__btn: {
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        // backgroundColor:BASE_COLOR,

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
    banner__voucher: {
        width: _moderateScale(320),
        height: _moderateScale(8 * 10),
        alignSelf: 'center',
        bottom: -_moderateScale(8 * 3),
        position: 'absolute',
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8),
        flexDirection: 'row'
    },
    banner: {
        height: _moderateScale(8 * 12),
        backgroundColor: "#AF7169"
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
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


const shadow2 = {
    shadowColor: "#4ECCC9",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 5,

    elevation: 3
}
