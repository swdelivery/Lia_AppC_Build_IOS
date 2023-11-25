import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale'
import IconEye from '../../../SGV/eye.svg'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { _codeResultScanning } from '../../../Constant/CodeResultScanningEye'


const RightEffectTextEye = memo((props) => {

    const tranYText1 = useSharedValue(0);
    const opacityText1 = useSharedValue(0);

    const tranYText2 = useSharedValue(0);
    const opacityText2 = useSharedValue(0);

    const tranYText3 = useSharedValue(0);
    const opacityText3 = useSharedValue(0);


    const _handleEnd = () => {
        // props?.setStartTextRightEye('done')
    }

    useEffect(() => {

        if (props?.startTextRightEye == 'doing') {
            opacityText1.value = withTiming(1, {
                duration: 1000
            })
            tranYText1.value = withTiming(-25, {
                duration: 1000
            })

            opacityText2.value = withTiming(1, {
                duration: 1000
            })
            tranYText2.value = withTiming(-25, {
                duration: 1000
            })

            opacityText3.value = withTiming(1, {
                duration: 1000
            })
            tranYText3.value = withTiming(-25, {
                duration: 1000
            })

            setTimeout(() => {
                opacityText1.value = withTiming(0, {
                    duration: 500
                })
                tranYText1.value = withTiming(0, {
                    duration: 500
                })

                opacityText2.value = withTiming(0, {
                    duration: 500
                })
                tranYText2.value = withTiming(0, {
                    duration: 500
                })

                opacityText3.value = withTiming(0, {
                    duration: 500
                })
                tranYText3.value = withTiming(0, {
                    duration: 500
                }, (fi) => {
                    if (fi) {
                        runOnJS(_handleEnd)()
                    }
                })
            }, 4000);

        }
    }, [props?.startTextRightEye])

    const animText1 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: tranYText1.value
                },
            ],
            opacity: opacityText1.value
        }
    })
    const animText2 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: tranYText2.value
                },
            ],
            opacity: opacityText2.value
        }
    })
    const animText3 = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: tranYText3.value
                },
            ],
            opacity: opacityText3.value
        }
    })

    return (
        <>
            {
                props?.startTextRightEye == 'doing' ?
                    <>
                        <Animated.View style={[{
                            position: 'absolute',
                            zIndex: 100,
                            top: _heightScale(200),
                            left: _widthScale(130),
                            alignItems: 'flex-start',
                        }, animText1]}>
                            <IconEye
                                width={_moderateScale(8 * 3)}
                                height={_moderateScale(8 * 3)}
                            />
                            <Text style={{
                                fontSize: _moderateScale(12),
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                Mắt Phải
                            </Text>
                            <View style={{ height: _moderateScale(4) }} />
                            <Text style={{ fontSize: _moderateScale(12), fontWeight: 'bold', color: '#9fe0ed', letterSpacing: 2 }}>
                                {
                                    _codeResultScanning(props?.scanningResult?.right?.eylid_type)
                                }
                            </Text>
                            {/* <Text style={{ fontSize: _moderateScale(8), fontWeight: 'bold', color: '#9fe0ed', letterSpacing: 2 }}>
                                OUTER
                            </Text>
                            <Text style={{ fontSize: _moderateScale(8), fontWeight: 'bold', color: '#9fe0ed', letterSpacing: 2 }}>
                                CANTHUS
                            </Text> */}
                        </Animated.View>

                        <Animated.View style={[{
                            position: 'absolute',
                            zIndex: 100,
                            top: _heightScale(240),
                            left: _widthScale(230),
                            alignItems: 'flex-start',
                        }, animText2]}>
                            <IconEye
                                width={_moderateScale(8 * 3)}
                                height={_moderateScale(8 * 3)}
                            />
                            <Text style={{
                                fontSize: _moderateScale(12),
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                Bọng mỡ
                            </Text>
                            <View style={{ height: _moderateScale(4) }} />
                            <Text style={{ width: _moderateScale(8 * 8), fontSize: _moderateScale(12), fontWeight: 'bold', color: '#9fe0ed', letterSpacing: 2 }}>
                                {
                                    _codeResultScanning(props?.scanningResult?.right?.eye_bag_type)
                                }
                            </Text>
                            {/* <Text style={{ fontSize: _moderateScale(8), fontWeight: 'bold', color: '#9fe0ed', letterSpacing: 2 }}>
                                OUTER
                            </Text>
                            <Text style={{ fontSize: _moderateScale(8), fontWeight: 'bold', color: '#9fe0ed', letterSpacing: 2 }}>
                                CANTHUS
                            </Text> */}
                        </Animated.View>

                        {/* <Animated.View style={[{
                            position: 'absolute',
                            zIndex: 100,
                            top: _heightScale(530),
                            left: _widthScale(270),
                            alignItems: 'flex-start',
                        }, animText3]}>
                            <IconEye
                                width={_moderateScale(8 * 3)}
                                height={_moderateScale(8 * 3)}
                            />
                            <Text style={{
                                fontSize: _moderateScale(12),
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                RIGHT EYE
                            </Text>
                            <View style={{ height: _moderateScale(4) }} />
                            <Text style={{ fontSize: _moderateScale(8), fontWeight: 'bold', color: '#9fe0ed', letterSpacing: 2 }}>
                                NORMAL
                            </Text>
                            <Text style={{ fontSize: _moderateScale(8), fontWeight: 'bold', color: '#9fe0ed', letterSpacing: 2 }}>
                                OUTER
                            </Text>
                            <Text style={{ fontSize: _moderateScale(8), fontWeight: 'bold', color: '#9fe0ed', letterSpacing: 2 }}>
                                CANTHUS
                            </Text>
                        </Animated.View> */}
                    </>
                    :
                    <>
                    </>
            }

        </>
    )
})

export default RightEffectTextEye

const styles = StyleSheet.create({})
