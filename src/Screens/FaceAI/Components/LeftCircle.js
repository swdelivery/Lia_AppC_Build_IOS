import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { _height, _width, _widthScale } from '../../../Constant/Scale'

const LeftCircle = memo((props) => {

    const rotateFlag1 = useSharedValue(0);
    const rotateFlag2 = useSharedValue(0);
    const opacityCircle1 = useSharedValue(0);
    const opacityCircle2 = useSharedValue(0);

    useEffect(() => {
        if (props?.startCirlLeftEye == 'doing') {
            _startCircleAnim()
        }
    }, [props?.startCirlLeftEye])

    useEffect(() => {
        if (props?.startTextLeftEye == 'done') {
            opacityCircle1.value = withTiming(0, {
                duration: 300
            })
            opacityCircle2.value = withTiming(0, {
                duration: 300
            }, (fns) => {
                if (fns) {
                    runOnJS(_handleDoneAnim)()
                }
            })
        }
    }, [props?.startTextLeftEye])

    const _handleDoneAnim = () => {
        props?.setStartCirlLeftEye('done')
    }

    const _startCircleAnim = () => {



        opacityCircle1.value = withTiming(1, {
            duration: 300
        })
        opacityCircle2.value = withTiming(1, {
            duration: 300
        })

        rotateFlag1.value = withTiming(1, {
            duration: 2000
        }, (isFinished) => {
            if (isFinished) {
                rotateFlag1.value = 0
            }
        })
        rotateFlag2.value = withTiming(1, {
            duration: 2000
        }, (isFinished) => {
            if (isFinished) {
                rotateFlag2.value = 0
                runOnJS(_startCircleAnim)()
            }
        })
    }


    const animCircle1 = useAnimatedStyle(() => {

        const interpolateRotate = interpolate(rotateFlag1.value, [0, 1], ['0', '360'], {});

        return {
            transform: [{
                rotate: `${interpolateRotate}deg`
            }],
            opacity: opacityCircle1.value
        }
    })
    const animCircle2 = useAnimatedStyle(() => {

        const interpolateRotate = interpolate(rotateFlag2.value, [0, 1], ['0', '360'], {});
        return {
            transform: [{
                rotate: `-${interpolateRotate}deg`
            }],
            opacity: opacityCircle2.value
        }
    })

    return (
        <>
            {
                props?.startCirlLeftEye == 'doing' ?
                    <View style={{
                        width: 160,
                        height: 160,
                        borderRadius: 16,
                        // borderWidth: 1,
                        position: 'absolute',
                        zIndex: 10,
                        top: _height / 2 - 80,
                        left: _width / 2 - 80,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Animated.Image
                            source={require('../../../Image/circle.png')}
                            style={[{
                                width: _widthScale(200),
                                height: _widthScale(200),
                                position: 'absolute'
                            }, animCircle1]} />

                        <Animated.Image
                            source={require('../../../Image/circle.png')}
                            style={[{
                                width: _widthScale(250),
                                height: _widthScale(250),
                                position: 'absolute'
                            }, animCircle2]} />
                    </View>
                    :
                    <></>
            }

        </>

    )
})

export default LeftCircle

const styles = StyleSheet.create({})