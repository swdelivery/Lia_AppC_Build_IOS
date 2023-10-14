import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { _height, _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { BASE_COLOR, GREY_FOR_TITLE, WHITE } from '../../../Constant/Color'
import Animated, { FadeInRight, FadeOut, SlideInRight, runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { IconBackBase, IconBackWhite, IconBook, IconBrone, IconCancelWhite, IconCopy, IconDiamond, IconGold, IconShare, IconSilver } from '../../../Components/Icon/Icon'
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
import Clipboard from '@react-native-community/clipboard'
import ModalFlashMsg from '../../../Components/ModalFlashMsg/ModalFlashMsg'
import Share from 'react-native-share';

const ModalShareCodeAffiliate = memo((props) => {

    const opacityBackDrop = useSharedValue(0);
    const opacityContainer = useSharedValue(0);
    const scaleContainer = useSharedValue(0);
    const tranYModal = useSharedValue(0);

    const [showModalFlashMsg, setShowModalFlashMsg] = useState(false)


    useEffect(() => {

        if (props?.isShow) {
            // scaleContainer.value = withTiming(1, { duration: 1 }, (fnd) => {
            //     if (fnd) {
            //         opacityBackDrop.value = withTiming(1, { duration: 200 })
            //         opacityContainer.value = withTiming(1, { duration: 100 })
            //         tranYModal.value = withTiming(-400, { duration: 200 })
            //     }
            // })
            tranYModal.value = withTiming(-400, { duration: 200 })
            opacityBackDrop.value = withTiming(1, { duration: 300 })
        } else {

        }

    }, [props?.isShow])

    const animTranY = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: tranYModal.value
                }
            ]
        }
    })

    const animOpacityBackDrop = useAnimatedStyle(() => {
        return {
            opacity: opacityBackDrop.value
        }
    })

    const _handleHideModal = () => {
        tranYModal.value = withTiming(0, { duration: 200 }, (fnd) => {
            if (fnd) {
                runOnJS(_hideModal)()
            }
        })
        opacityBackDrop.value = withTiming(0, { duration: 200 })
    }
    const _hideModal = () => {
        props?.onHideModal()
    }

    return (

        <>
            {
                props?.isShow ?
                    <View style={{
                        width: _width,
                        height: _height,
                        position: 'absolute',
                        zIndex: 100
                        // zIndex:10,
                        // backgroundColor:'blue'
                    }}>

                        <ModalFlashMsg
                            bottom
                            show={showModalFlashMsg}
                            hide={() => {
                                setShowModalFlashMsg(false)
                            }}
                            data={'Đã copy.'} />

                        <Animated.View style={[{
                            width: _width,
                            height: _height,
                        }, {
                            backgroundColor: 'rgba(0,0,0,.7)'
                        },animOpacityBackDrop]}>
                            <TouchableOpacity onPress={() => _handleHideModal()} style={[StyleSheet.absoluteFillObject]} />
                        </Animated.View>

                        <Animated.View style={[{
                            width: _width,
                            backgroundColor: WHITE,
                            borderRadius: _moderateScale(8 * 2),
                            paddingBottom: _moderateScale(8 * 2),
                            position: 'absolute',
                            bottom: -400,
                            height: 400,
                        }, animTranY]}>


                            <View style={{
                                height: 300,
                                width: _width,
                                position: 'absolute'
                            }}>
                                <LinearGradient
                                    style={[StyleSheet.absoluteFill, { borderTopLeftRadius: _moderateScale(8 * 2), borderTopRightRadius: _moderateScale(8 * 2) }]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    // locations={[0, 1]}
                                    colors={[BASE_COLOR, 'white']}
                                />
                            </View>

                            <View style={styles.header}>

                                <View style={{ alignItems: 'center', width: _width }}>
                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                                        Giới thiệu bạn bè
                                    </Text>
                                    <TouchableOpacity
                                        onPress={_handleHideModal}
                                        style={{
                                            position: 'absolute',
                                            right: _moderateScale(8 * 3),
                                            zIndex: 100,
                                        }}>
                                        <IconCancelWhite style={sizeIcon.md} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: _moderateScale(8 * 3) }} />

                            <View style={[{
                                width: _widthScale(340),
                                alignSelf: 'center',
                                borderRadius: _moderateScale(8 * 2),
                                backgroundColor: WHITE,
                                padding: _moderateScale(8 * 2),
                                paddingBottom: _moderateScale(8 * 3)
                            }, shadow]}>



                                <View>
                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: '#01AB84' }]}>
                                        Mã giới thiệu
                                    </Text>


                                </View>
                                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8) }]}>
                                    <View style={{
                                        flex: 1,
                                        height: _moderateScale(8 * 4),
                                        borderWidth: 1,
                                        borderColor: 'rgba(0,0,0,.3)',
                                        borderRadius: _moderateScale(4),
                                        justifyContent: 'center',
                                        paddingHorizontal: _moderateScale(8)
                                    }}>
                                        <Text selectable={true} style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.BLUE_FB }]}>
                                            LIA0475837
                                        </Text>
                                    </View>
                                    <View style={{ width: _widthScale(8) }} />
                                    <TouchableOpacity
                                        onPress={() => {
                                            Clipboard.setString('LIA0475837')
                                            setShowModalFlashMsg(true)
                                            setTimeout(() => {
                                                setShowModalFlashMsg(false)
                                            }, 1500);
                                        }}
                                    >
                                        <IconCopy style={sizeIcon.llg} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: _moderateScale(8 * 2) }}>
                                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: '#01AB84' }]}>
                                        Link giới thiệu
                                    </Text>
                                </View>
                                <View style={[styleElement.rowAliCenter, { marginTop: _moderateScale(8) }]}>
                                    <View style={{
                                        flex: 1,
                                        height: _moderateScale(8 * 4),
                                        borderWidth: 1,
                                        borderColor: 'rgba(0,0,0,.3)',
                                        borderRadius: _moderateScale(4),
                                        justifyContent: 'center',
                                        paddingHorizontal: _moderateScale(8)
                                    }}>
                                        <Text selectable={true} style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: Color.BLUE_FB }]}>
                                            https://liabeauty.vn/
                                        </Text>
                                    </View>
                                    <View style={{ width: _widthScale(8) }} />
                                    <TouchableOpacity
                                        onPress={() => {
                                            Clipboard.setString('https://liabeauty.vn/')
                                            setShowModalFlashMsg(true)
                                            setTimeout(() => {
                                                setShowModalFlashMsg(false)
                                            }, 1500);
                                        }}
                                    >
                                        <IconCopy style={sizeIcon.llg} />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        Share.open({
                                            message: `https://liabeauty.vn`
                                        })
                                            .then((res) => {
                                                Alert.alert('Chia sẻ thành công!')
                                                _handleHideModal()
                                            })
                                            .catch((err) => {
                                                err && console.log(err);
                                            });
                                    }}
                                    style={{
                                        width: '100%',
                                        height: _moderateScale(8 * 5),
                                        ...styleElement.centerChild,
                                        marginTop: _moderateScale(8 * 3),
                                        borderRadius: _moderateScale(8),
                                        backgroundColor: BASE_COLOR,
                                        flexDirection: 'row'
                                    }}>
                                    <IconShare style={sizeIcon.md} />
                                    <Text style={[stylesFont.fontNolanBold, { marginLeft: _moderateScale(8), fontSize: _moderateScale(16), color: WHITE }]}>
                                        Chia sẻ
                                    </Text>
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


export default ModalShareCodeAffiliate

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


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,

    elevation: 5
}
