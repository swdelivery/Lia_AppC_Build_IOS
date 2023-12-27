import { styleElement } from '@Constant/StyleElement'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { measure, runOnJS, runOnUI, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { IconCancelGrey } from '../../Components/Icon/Icon'
import { BASE_COLOR, BORDER_COLOR, GREY_FOR_TITLE, RED, WHITE } from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font'
import { sizeIcon } from '../../Constant/Icon'
import { _height, _heightScale, _moderateScale, _width } from '../../Constant/Scale'
import { Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Text from '@Components/Text'


type Props = {
    title?: string;
    visible: boolean;
    onClose: () => void;
    onConfirm: (item) => void;
    options: any[];
    indexRed: number;
}

const ActionSheetBottom = memo(({ title, visible, onClose, onConfirm, options, indexRed }: Props) => {
    const [heightModal, setHeightModal] = useState(0)
    const opacityBackDrop = useSharedValue(0);
    const tranYModal = useSharedValue(0);

    const { bottom } = useSafeAreaInsets()

    useEffect(() => {
        if (visible && heightModal) {
            tranYModal.value = withTiming(-heightModal, { duration: 200 })
            opacityBackDrop.value = withTiming(1, { duration: 300 })
        } else {
        }
    }, [visible, heightModal])

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
        onClose()
    }

    const Option = ({ data, lasted, isRed, onPress }) => {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[styles.option, lasted && { borderBottomWidth: 0 }]}>
                <Text color={isRed ? RED : BASE_COLOR} weight='bold'>
                    {
                        data?.name
                    }
                </Text>
            </TouchableOpacity>
        )
    }

    const _handleChoice = useCallback((data) => () => {
        onConfirm(data)
        _handleHideModal()
    }, [onConfirm])

    if (!visible) {
        return null;
    }

    return (
        <View style={{
            width: _width,
            height: _height,
            position: 'absolute',
            zIndex: 100,
            bottom: 0
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
                    width: _width,
                    backgroundColor: WHITE,
                    borderRadius: _moderateScale(8 * 2),
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    paddingBottom: _moderateScale(8 * 2),
                    position: 'absolute',
                    bottom: -heightModal,
                }, animTranY]}>

                <View
                    onLayout={({
                        nativeEvent: {
                            layout: { height },
                        },
                    }) => setHeightModal(height)}>



                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={_handleHideModal}
                        style={styles.cancelBtn}>
                        <IconCancelGrey style={sizeIcon.sm} />
                    </TouchableOpacity>

                    {
                        options?.length > 0 && options?.map((item, index) => {
                            return (
                                <Option
                                    onPress={_handleChoice(item)}
                                    data={item}
                                    key={index}
                                    lasted={index + 1 == options.length ? true : false}
                                    isRed={index == indexRed ? true : false}
                                />
                            )
                        })
                    }
                    {/* <View style={{ height: bottom }} /> */}
                </View>

            </Animated.View>

        </View>

    )
})


export default ActionSheetBottom

const styles = StyleSheet.create({
    cancelBtn: {
        position: 'absolute',
        right: _moderateScale(8 * 3),
        zIndex: 100,
        top: _moderateScale(8 * 2)
    },
    option: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: BORDER_COLOR
    },
    itemMission: {
        padding: _moderateScale(8 * 2),
        borderBottomWidth: .5,
        borderColor: 'rgba(0,0,0,.3)',
        flexDirection: 'row'
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
        // marginTop: _moderateScale(8 * 2),
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
