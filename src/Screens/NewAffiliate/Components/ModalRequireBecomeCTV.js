import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { _height, _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { BASE_COLOR, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color'
import Animated, { FadeInRight, FadeOut, SlideInRight, runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { IconBackBase, IconBackWhite, IconBook, IconBrone, IconDiamond, IconGold, IconSilver } from '../../../Components/Icon/Icon'
import { sizeIcon } from '../../../Constant/Icon'
import { stylesFont } from '../../../Constant/Font'
import { TabBar, TabView } from 'react-native-tab-view'
import * as Color from '../../../Constant/Color'
import LinearGradient from 'react-native-linear-gradient'
import TabBrone from './TabBrone'
import TabSilver from './TabSilver'
import TabGold from './TabGold'
import TabDiamond from './TabDiamond'
import { styleElement } from '../../../Constant/StyleElement'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const ModalRequireBecomeCTV = memo((props) => {

    const opacityBackDrop = useSharedValue(0);
    const opacityContainer = useSharedValue(0);
    const scaleContainer = useSharedValue(0);

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
                        // zIndex:10,
                        // backgroundColor:'blue',
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
                                width:_width,
                                alignItems:'center',
                                right: -_width
                            },animXModal]}>
                            <View style={{
                                width: _widthScale(350),
                                backgroundColor: WHITE,
                                borderRadius: _moderateScale(8 * 2),
                                paddingBottom: _moderateScale(8 * 2),
                            }}>
                                <View style={styles.header}>

                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: GREY_FOR_TITLE }]}>
                                            Thông báo
                                        </Text>
                                    </View>


                                    <Text style={{
                                        width: _moderateScale(8 * 35),
                                        textAlign: 'center',
                                        marginTop: _moderateScale(8 * 2),
                                        ...stylesFont.fontNolan500,
                                        color: GREY_FOR_TITLE
                                    }}>
                                        Bạn cần phải trở thành Cộng tác viên để sử dụng chức năng này
                                    </Text>
                                </View>
                                <View style={{ height: _moderateScale(8 * 3) }} />

                                <View style={[styleElement.rowAliCenter, { justifyContent: 'space-evenly' }]}>
                                    <TouchableOpacity
                                        onPress={_handleHideModal}
                                        style={{
                                            width: _moderateScale(8 * 20),
                                            height: _moderateScale(8 * 5),
                                            borderWidth: 2,
                                            ...styleElement.centerChild,
                                            borderRadius: _moderateScale(8),
                                            borderColor: BASE_COLOR
                                        }}>
                                        <Text style={{
                                            ...stylesFont.fontNolanBold,
                                            fontSize: _moderateScale(14),
                                            color: BASE_COLOR
                                        }}>
                                            Để sau
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(ScreenKey.VERIFICATION_CTV)
                                            _handleHideModal()
                                        }}
                                        style={{
                                            width: _moderateScale(8 * 20),
                                            height: _moderateScale(8 * 5),
                                            ...styleElement.centerChild,
                                            borderRadius: _moderateScale(8),
                                            backgroundColor: BASE_COLOR
                                        }}>
                                        <Text style={{
                                            ...stylesFont.fontNolanBold,
                                            fontSize: _moderateScale(14),
                                            color: WHITE
                                        }}>
                                            Đăng kí ngay
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>

                    </View>
                    :
                    <></>
            }
        </>
    )
})


export default ModalRequireBecomeCTV

const styles = StyleSheet.create({
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