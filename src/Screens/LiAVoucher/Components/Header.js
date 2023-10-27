import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { BASE_COLOR, WHITE } from '../../../Constant/Color'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { _moderateScale } from '../../../Constant/Scale'
import { IconBXH, IconBackWhite, IconVoucherGold, IconWallet } from '../../../Components/Icon/Icon'
import { stylesFont } from '../../../Constant/Font'

import ScreenKey from '../../../Navigation/ScreenKey'
import { navigation } from '../../../../rootNavigation'
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
import { sizeIcon } from '../../../Constant/Icon'
import { sizeText } from '../../../Constant/Text'

const Header = memo((props) => {

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

    return (
        <Animated.View style={[styles.header, animBG]}>
            <View style={{
                height: getStatusBarHeight()
            }} />
            <View style={styles.header__box}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IconBackWhite style={sizeIcon.llg}/>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(16) }]}>
                        {
                            props?.title
                        }
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenKey.MY_VOUCHERS)
                        }}
                        style={{
                            alignItems: 'center'
                        }}>
                        <IconVoucherGold style={sizeIcon.md} />
                        <Text style={[sizeText.normal_bold, { color: WHITE }]}>
                            Kho Voucher
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    )
})

export default Header

const styles = StyleSheet.create({
    header__box: {
        height: _moderateScale(8 * 6),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    header: {
        backgroundColor: BASE_COLOR,
    }
})