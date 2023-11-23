import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { _height, _width, _widthScale } from '../../../Constant/Scale'

const LeftCircle = memo((props) => {


    const opacityCircle = useSharedValue(0);

    const opacityCircle1 = useSharedValue(0);
    const opacityCircle2 = useSharedValue(0);

    const rotateCircle1 = useSharedValue(0)
    const rotateCircle2 = useSharedValue(0)
    const rotateCircle3 = useSharedValue(0)
    const rotateCircle4 = useSharedValue(0)
    const rotateCircle5 = useSharedValue(0)
    const rotateCircle6 = useSharedValue(0)

    useEffect(() => {
        if (props?.startCirlLeftEye == 'doing') {
            _startMultiCircle()
        }
    }, [props?.startCirlLeftEye])

    const _handleDoneAnim = () => {
        props?.setStartCirlLeftEye('done')
    }


    const _startMultiCircle = () => {
        opacityCircle.value = withTiming(1, { duration: 1000 })
        rotateCircle1.value = withTiming(2, { duration: 5000 })
        rotateCircle2.value = withTiming(.5, { duration: 5000 })
        rotateCircle3.value = withTiming(.5, { duration: 5000 })
        rotateCircle4.value = withTiming(2, { duration: 5000 })
        rotateCircle5.value = withTiming(1, { duration: 5000 })
        rotateCircle6.value = withTiming(.5, { duration: 5000 })
        setTimeout(() => {
            opacityCircle.value = withTiming(0, { duration: 1000 }, (fns) => {
                if (fns) {
                    // opacityCircle1.value = withTiming(0, {
                    //     duration: 300
                    // })
                    // opacityCircle2.value = withTiming(0, {
                    //     duration: 300
                    // }, (fns) => {
                    //     if (fns) {
                    //         runOnJS(_handleDoneAnim)()
                    //     }
                    // })
                    runOnJS(_handleDoneAnim)()
                }
            })
        }, 4000);
    }


    const animCircle1 = useAnimatedStyle(() => {
        const interpolateRotate = interpolate(rotateCircle1.value, [0, 1], ['0', '360'], {});
        return {
            transform: [{ rotate: `${interpolateRotate}deg` }]
        }
    })
    const animCircle2 = useAnimatedStyle(() => {
        const interpolateRotate = interpolate(rotateCircle2.value, [0, 1], ['0', '360'], {});
        return {
            transform: [{ rotate: `-${interpolateRotate}deg` }]
        }
    })
    const animCircle3 = useAnimatedStyle(() => {
        const interpolateRotate = interpolate(rotateCircle3.value, [0, 1], ['0', '360'], {});
        return {
            transform: [{ rotate: `-${interpolateRotate}deg` }]
        }
    })
    const animCircle4 = useAnimatedStyle(() => {
        const interpolateRotate = interpolate(rotateCircle4.value, [0, 1], ['0', '360'], {});
        return {
            transform: [{ rotate: `${interpolateRotate}deg` }]
        }
    })
    const animCircle5 = useAnimatedStyle(() => {
        const interpolateRotate = interpolate(rotateCircle5.value, [0, 1], ['0', '360'], {});
        return {
            transform: [{ rotate: `${interpolateRotate}deg` }]
        }
    })
    const animCircle6 = useAnimatedStyle(() => {
        const interpolateRotate = interpolate(rotateCircle6.value, [0, 1], ['0', '360'], {});
        return {
            transform: [{ rotate: `-${interpolateRotate}deg` }]
        }
    })
    const animOpacity = useAnimatedStyle(() => {
        return {
            opacity: opacityCircle.value
        }
    })

    return (
        <>
            {
                props?.startCirlLeftEye == 'doing' ?
                    <Animated.View style={[{
                        width: 160,
                        height: 160,
                        borderRadius: 16,
                        position: 'absolute',
                        zIndex: 10,
                        top: _height / 2 - 80,
                        left: _width / 2 - 80,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }, animOpacity]}>

                        <Animated.Image
                            style={[{
                                width: _widthScale(230),
                                height: _widthScale(230),
                                position: 'absolute',
                                zIndex: 1
                            }, animCircle1]}
                            source={require('../../../Image/circle/5.png')}
                        />
                        <Animated.Image
                            style={[{
                                width: _widthScale(230),
                                height: _widthScale(230),
                                position: 'absolute',
                                zIndex: 1
                            }, animCircle2]}
                            source={require('../../../Image/circle/4.png')}
                        />
                        <Animated.Image
                            style={[{
                                width: _widthScale(260),
                                height: _widthScale(260),
                                position: 'absolute',
                                zIndex: 1
                            }, animCircle3]}
                            source={require('../../../Image/circle/1.png')}
                        />
                        <Animated.Image
                            style={[{
                                width: _widthScale(260),
                                height: _widthScale(260),
                                position: 'absolute',
                                zIndex: 1
                            }, animCircle4]}
                            source={require('../../../Image/circle/2.png')}
                        />
                        <Animated.Image
                            style={[{
                                width: _widthScale(280),
                                height: _widthScale(280),
                                position: 'absolute',
                                zIndex: 1
                            }, animCircle5]}
                            source={require('../../../Image/circle/3.png')}
                        />
                        <Animated.Image
                            style={[{
                                width: _widthScale(280),
                                height: _widthScale(280),
                                position: 'absolute',
                                zIndex: 1
                            }, animCircle6]}
                            source={require('../../../Image/circle/6.png')}
                        />

                    </Animated.View>
                    :
                    <></>
            }

        </>

    )
})

export default LeftCircle

const styles = StyleSheet.create({})
