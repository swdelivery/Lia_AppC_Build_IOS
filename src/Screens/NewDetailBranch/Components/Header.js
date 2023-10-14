import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { _heightScale, _moderateScale, _width } from '../../../Constant/Scale'
import { navigation } from '../../../../rootNavigation'
import IconBackBlack from '../../../SGV/backArrBlack.svg'
import IconBackWhite from '../../../SGV/backWhite.svg'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'

const Header = memo((props) => {

    // const animSizeImg = useAnimatedStyle(() => {

    //     const interpolateWidth = interpolate(props.scrollY.value, [0, 1], [0, 1], { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP });
    //     // const interpolateOpacity = interpolate(props.scrollY.value, [0, 100], [0, 1], { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP });
    //     const interColor = interpolateColor(props.scrollY.value)

    //     const animtedColor = interpolateColor(
    //         props.scrollY.value,
    //         [0, 100],
    //         ['transparent', 'white'],
    //     );

    //     return {
    //         backgroundColor: animtedColor,
    //         // transform: [
    //         //     {
    //         //         scale: interpolateWidth
    //         //     }
    //         // ],
    //     };
    // })

    return (
        <Animated.View style={[styles.header]}>
            <TouchableOpacity
                style={{
                }}
                onPress={() => {
                    navigation.goBack()
                }}
                hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
            >
                <IconBackWhite
                    width={_moderateScale(8 * 4)}
                    height={_moderateScale(8 * 4)}
                />
            </TouchableOpacity>
           
        </Animated.View>
    )
})

export default Header

const styles = StyleSheet.create({
    header: {
        width: _width,
        height: _heightScale(8 * 6),
        // borderWidth: 1,
        borderColor: 'white',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:_moderateScale(8)
    }
})