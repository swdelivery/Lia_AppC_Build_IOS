import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { _moderateScale } from '../../../Constant/Scale'
import { IconIsChecked, IconNotChecked, IconPartnerShip, IconPolicy, IconRightArrow } from '../../../Components/Icon/Icon'
import { BASE_COLOR, GREY, WHITE } from '../../../Constant/Color'
import { stylesFont } from '../../../Constant/Font'
import Animated, { FadeInRight, FadeOut, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Collapsible from 'react-native-collapsible'
import { sizeIcon } from '../../../Constant/Icon'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'
import { checkStepUnlockAffiliate } from '../../../Redux/Action/Affiilate'
import { useSelector } from 'react-redux'


const Content = (props) => {

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const refView = useAnimatedRef()
    const heightValueBox = useSharedValue(0);
    const [heightContent, setHeightContent] = useState(0);

    const [stepUnlockAffiliate, setStepUnlockAffiliate] = useState({})


    useEffect(() => {

        _checkStep(infoUserRedux)

    }, [])

    const _checkStep = async (infoUserRedux) => {
        let result = await checkStepUnlockAffiliate(infoUserRedux?._id)
        if (result?.isAxiosError) return
        setStepUnlockAffiliate(result?.data?.data);
    }



    return (
        <Animated.View
        // ref={refView}
        // entering={FadeInRight.duration(120).springify().mass(0.3)}
        // exiting={FadeOut.duration(100).springify().mass(0.3)}
        >
            <TouchableOpacity
                onPress={() => {
                    if (stepUnlockAffiliate?.isCollaburator) {
                        return
                    } else {
                        navigation.navigate(ScreenKey.VERIFICATION_CTV)
                    }
                }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                {
                    stepUnlockAffiliate?.isCollaburator ?
                        <>
                            <Text style={{ flex: 1, color: BASE_COLOR, textDecorationLine: 'underline', ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                                Bước 1: Đăng kí để trở thành cộng tác viên
                            </Text>
                            <IconIsChecked style={sizeIcon.sm} />
                        </>
                        :
                        <>
                            <Text style={{ flex: 1, color: GREY, textDecorationLine: 'underline', ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                                Bước 1: Đăng kí để trở thành cộng tác viên
                            </Text>
                            <IconNotChecked style={sizeIcon.sm} />
                        </>
                }

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ScreenKey.CREATE_BOOKING)
                }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: _moderateScale(8 * 2)
                }}>

                {
                    stepUnlockAffiliate?.serviceUsed ?
                        <>
                            <Text style={{ flex: 1, color: BASE_COLOR, textDecorationLine: 'underline', ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                                Bước 2: Đặt lịch sử dụng dịch vụ bất kì
                            </Text>
                            <IconIsChecked style={sizeIcon.sm} />
                        </>
                        :
                        <>
                            <Text style={{ flex: 1, color: GREY, textDecorationLine: 'underline', ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                                Bước 2: Đặt lịch sử dụng dịch vụ bất kì
                            </Text>
                            <IconNotChecked style={sizeIcon.sm} />
                        </>
                }


            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ScreenKey.LIST_PARTNER_DIARY)
                }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: _moderateScale(8 * 2)
                }}>
                {
                    stepUnlockAffiliate?.diaryFinished ?
                        <>
                            <Text style={{ flex: 1, color: BASE_COLOR, textDecorationLine: 'underline', ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                                Bước 3: Hoàn thành nhật kí làm đẹp
                            </Text>
                            <IconIsChecked style={sizeIcon.sm} />
                        </>
                        :
                        <>
                            <Text style={{ flex: 1, color: GREY, textDecorationLine: 'underline', ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                                Bước 3: Hoàn thành nhật kí làm đẹp
                            </Text>
                            <IconNotChecked style={sizeIcon.sm} />
                        </>
                }

            </TouchableOpacity>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: _moderateScale(8 * 2)
            }}>
                {
                    stepUnlockAffiliate?.sharedDiary ?
                        <>
                            <Text style={{ flex: 1, color: BASE_COLOR, textDecorationLine: 'underline', ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                                Bước 4: Chia sẻ nhật ký kèm mã giới thiệu
                            </Text>
                            <IconIsChecked style={sizeIcon.sm} />
                        </>
                        :
                        <>
                            <Text style={{ flex: 1, color: GREY, textDecorationLine: 'underline', ...stylesFont.fontNolan500, fontSize: _moderateScale(14) }}>
                                Bước 4: Chia sẻ nhật ký kèm mã giới thiệu
                            </Text>
                            <IconNotChecked style={sizeIcon.sm} />
                        </>
                }

            </View>

            <View style={{
                height: _moderateScale(8 * 2)
            }} />
        </Animated.View>
    )
}

const TutMakeMoney = memo(() => {

    const [isExpanded, setIsExpanded] = useState(false)

    const rotateIcon = useSharedValue(0);

    useEffect(() => {
        if (!isExpanded) {
            rotateIcon.value = withTiming(0, { duration: 300 })
        } else {
            rotateIcon.value = withTiming(90, { duration: 300 })
        }
    }, [isExpanded])

    const animIcon = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${rotateIcon.value}deg`
                }
            ]
        }
    })

    return (
        <View style={styles.options}>
            <View
                // activeOpacity={.8}
                // onPress={() => {
                //     setIsExpanded(old => !old)
                // }}
                style={[styles.options__btn, shadow, isExpanded && { borderColor: BASE_COLOR, borderWidth: 1 }]}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => {
                        setIsExpanded(old => !old)
                    }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: _moderateScale(8 * 5),
                    }}>
                    <IconPartnerShip style={{ width: _moderateScale(8 * 3), height: _moderateScale(8 * 3) }} />

                    <View style={{ width: _moderateScale(8) }} />
                    <Text style={[{ flex: 1, color: BASE_COLOR, fontSize: _moderateScale(14) }, stylesFont.fontNolan500]}>
                        Hướng dẫn kiếm tiền
                    </Text>
                    <Animated.View style={animIcon}>
                        <IconRightArrow style={{ width: _moderateScale(8 * 2), height: _moderateScale(8 * 2) }} />
                    </Animated.View>
                </TouchableOpacity>

                <Collapsible collapsed={!isExpanded}>
                    <Content />
                </Collapsible>



            </View>
        </View>
    )
})

export default TutMakeMoney

const styles = StyleSheet.create({
    options__btn: {
        width: '100%',
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        backgroundColor: WHITE
    },
    options: {
        paddingHorizontal: _moderateScale(8 * 3)
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 5
}
