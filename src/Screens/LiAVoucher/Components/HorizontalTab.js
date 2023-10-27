import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { _moderateScale } from '../../../Constant/Scale'
import { BASE_COLOR, WHITE } from '../../../Constant/Color'
import { IconVoucher } from '../../../Components/Icon/Icon'
import { styleElement } from '../../../Constant/StyleElement'
import { sizeIcon } from '../../../Constant/Icon'
import { stylesFont } from '../../../Constant/Font'
import { sizeText } from '../../../Constant/Text'
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const HorizontalTab = memo((props) => {

    const [currTab, setCurrTab] = useState('1')

    const animBG = useAnimatedStyle(() => {
        if (props?.primaryColor) {
            const animtedColor = interpolateColor(
                props.flagIndexHasChanged.value,
                [0, 1],
                [props?.preColor, props?.primaryColor],
            );
            return {
                backgroundColor: animtedColor
            }
        } else {
            return {

            }
        }

    })

    const animActiveBG = useAnimatedStyle(() => {
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


    return (
        <View style={styles.tab}>
            <Animated.View style={[styles.tab__child, {
                backgroundColor: "#AF7169",
                ...styleElement.centerChild,
                borderTopRightRadius: 16
            }, animActiveBG]}>
                <IconVoucher style={sizeIcon.lg} />
                <Text style={[sizeText.small_bold, { color: WHITE }]}>
                    LiA Voucher
                </Text>
            </Animated.View>
            <Animated.View style={[styles.tab__child, animBG]}>
                <IconVoucher style={sizeIcon.lg} />
                <Text style={[sizeText.small_bold, { color: WHITE }]}>
                    Điểm danh
                </Text>
            </Animated.View>
            <Animated.View style={[styles.tab__child, animBG]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.WHEEL_SPIN)
                    }}
                    style={{ alignItems: 'center' }}>
                    <IconVoucher style={sizeIcon.lg} />
                    <Text style={[sizeText.small_bold, { color: WHITE }]}>
                        Vòng quay LiA
                    </Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.tab__child, animBG]}>
                <IconVoucher style={sizeIcon.lg} />
                <Text style={[sizeText.small_bold, { color: WHITE }]}>
                    Vũ điệu LiA
                </Text>
            </Animated.View>
        </View>
    )
})

export default HorizontalTab

const styles = StyleSheet.create({
    tab__child: {
        flex: 1,
        backgroundColor: BASE_COLOR,
        ...styleElement.centerChild
    },
    tab: {
        height: _moderateScale(8 * 7),
        flexDirection: 'row'
    }
})