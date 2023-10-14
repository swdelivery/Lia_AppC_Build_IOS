import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { _moderateScale } from '../../../Constant/Scale';

const LeftEffectDotEye = memo((props) => {

    const tranXDot1 = useSharedValue(0);
    const tranYDot1 = useSharedValue(0);
    const scaleDot1 = useSharedValue(1);

    const tranXDot2 = useSharedValue(0);
    const tranYDot2 = useSharedValue(0);
    const scaleDot2 = useSharedValue(1);

    const tranXDot3 = useSharedValue(0);
    const tranYDot3 = useSharedValue(0);
    const scaleDot3 = useSharedValue(1);

    const tranXDot4 = useSharedValue(0);
    const tranYDot4 = useSharedValue(0);
    const scaleDot4 = useSharedValue(1);


    const _handleStopAnimEyeDot = () => {

        props?.setFlagDoneZoom(false)
        props?._startCircleAnim()
    }


    useEffect(() => {

        if (props?.flagDoneZoom) {
            

            tranXDot1.value = withTiming(-30, { duration: 1000 })
            tranYDot1.value = withTiming(0, { duration: 1000 })
            _startScaleDot1()

            tranXDot2.value = withTiming(30, { duration: 1000 })
            tranYDot2.value = withTiming(8, { duration: 1000 })
            setTimeout(() => {
                _startScaleDot2()
            }, 100);

            tranXDot3.value = withTiming(0, { duration: 1000 })
            tranYDot3.value = withTiming(-20, { duration: 1000 })
            setTimeout(() => {
                _startScaleDot3()
            }, 250);

            tranXDot4.value = withTiming(0, { duration: 1000 })
            tranYDot4.value = withTiming(20, { duration: 1000 })
            setTimeout(() => {
                _startScaleDot4()
            }, 170);

            setTimeout(() => {
                tranXDot1.value = withTiming(0, { duration: 1000 })
                tranYDot1.value = withTiming(0, { duration: 1000 })
    
                tranXDot2.value = withTiming(0, { duration: 1000 })
                tranYDot2.value = withTiming(0, { duration: 1000 })
    
    
                tranXDot3.value = withTiming(0, { duration: 1000 })
                tranYDot3.value = withTiming(0, { duration: 1000 })
    
    
                tranXDot4.value = withTiming(0, { duration: 1000 })
                tranYDot4.value = withTiming(0, { duration: 1000 }, (isFinished) => {
                    if (isFinished) {
                        runOnJS(_handleStopAnimEyeDot)()
                    }
                })
    
            }, 5000);

        }

        


    }, [props?.flagDoneZoom])

    const _startScaleDot1 = () => {
        scaleDot1.value = withTiming(1.2, {
            duration: 300
        }, (isFinished) => {
            if (isFinished) {
                scaleDot1.value = withTiming(0.5, {
                    duration: 300
                }, (isFinished) => {
                    if (isFinished) {
                        runOnJS(_startScaleDot1)()
                    }
                })
            }
        })
    }
    const _startScaleDot2 = () => {
        scaleDot2.value = withTiming(1.2, {
            duration: 300
        }, (isFinished) => {
            if (isFinished) {
                scaleDot2.value = withTiming(0.2, {
                    duration: 300
                }, (isFinished) => {
                    if (isFinished) {
                        runOnJS(_startScaleDot2)()
                    }
                })
            }
        })
    }
    const _startScaleDot3 = () => {
        scaleDot3.value = withTiming(1.2, {
            duration: 300
        }, (isFinished) => {
            if (isFinished) {
                scaleDot3.value = withTiming(0.6, {
                    duration: 300
                }, (isFinished) => {
                    if (isFinished) {
                        runOnJS(_startScaleDot3)()
                    }
                })
            }
        })
    }
    const _startScaleDot4 = () => {
        scaleDot4.value = withTiming(1.2, {
            duration: 300
        }, (isFinished) => {
            if (isFinished) {
                scaleDot4.value = withTiming(0.1, {
                    duration: 300
                }, (isFinished) => {
                    if (isFinished) {
                        runOnJS(_startScaleDot4)()
                    }
                })
            }
        })
    }

    const animDot1 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tranXDot1.value }, { translateY: tranYDot1.value }, { scale: scaleDot1.value }],
        };
    })
    const animDot2 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tranXDot2.value }, { translateY: tranYDot2.value }, { scale: scaleDot2.value }],
        };
    })
    const animDot3 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tranXDot3.value }, { translateY: tranYDot3.value }, { scale: scaleDot3.value }],
        };
    })
    const animDot4 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tranXDot4.value }, { translateY: tranYDot4.value }, { scale: scaleDot4.value }],
        };
    })

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>



            {
                props?.flagDoneZoom ?
                    <>
                        <Animated.View style={[{
                            width: _moderateScale(8),
                            height: _moderateScale(8),
                            backgroundColor: 'white',
                            // backgroundColor: '#9EE5F6',
                            borderRadius: _moderateScale(4),
                            position: 'absolute'
                        }, animDot1]} />

                        <Animated.View style={[{
                            width: _moderateScale(8),
                            height: _moderateScale(8),
                            backgroundColor: 'white',
                            borderRadius: _moderateScale(4),
                            position: 'absolute'
                        }, animDot2]} />

                        <Animated.View style={[{
                            width: _moderateScale(8),
                            height: _moderateScale(8),
                            backgroundColor: 'white',
                            borderRadius: _moderateScale(4),
                            position: 'absolute'
                        }, animDot3]} />

                        <Animated.View style={[{
                            width: _moderateScale(8),
                            height: _moderateScale(8),
                            backgroundColor: 'white',
                            borderRadius: _moderateScale(4),
                            position: 'absolute'
                        }, animDot4]} />
                    </>
                    :
                    <></>
            }

        </View>
    )
})

export default LeftEffectDotEye

const styles = StyleSheet.create({})