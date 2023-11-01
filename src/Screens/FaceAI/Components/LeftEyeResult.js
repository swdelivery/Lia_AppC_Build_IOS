import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { ReText } from 'react-native-redash'

const HEIGHT_BOX_CHOICE = _widthScale(8 * 8)

const LeftEyeResult = memo((props) => {

    const [listEyeResult, setListEyeResult] = useState([])
    const [number, setNumber] = useState(50)
    const numberValue = useSharedValue(1);
    const opacityChoice = useSharedValue(0.3);

    const tranYBox = useSharedValue(0);
    const scaleEyeChoiced = useSharedValue(1);




    useEffect(() => {
        setListEyeResult([
            { _id: '1', uri: 'https://i.ibb.co/VqM2rcL/A-nh-ma-n-hi-nh-2023-10-02-lu-c-11-47-19.png' },
            { _id: '2', uri: 'https://i.ibb.co/VqM2rcL/A-nh-ma-n-hi-nh-2023-10-02-lu-c-11-47-19.png' },
            { _id: '3', uri: 'https://i.ibb.co/VqM2rcL/A-nh-ma-n-hi-nh-2023-10-02-lu-c-11-47-19.png' },
            { _id: '4', uri: 'https://i.ibb.co/VqM2rcL/A-nh-ma-n-hi-nh-2023-10-02-lu-c-11-47-19.png' },
            { _id: '5', uri: 'https://i.ibb.co/VqM2rcL/A-nh-ma-n-hi-nh-2023-10-02-lu-c-11-47-19.png' },
            { _id: '6', uri: 'https://i.ibb.co/VqM2rcL/A-nh-ma-n-hi-nh-2023-10-02-lu-c-11-47-19.png' },
            { _id: '7', uri: 'https://i.ibb.co/VqM2rcL/A-nh-ma-n-hi-nh-2023-10-02-lu-c-11-47-19.png' },
            { _id: '8', uri: 'https://i.ibb.co/VqM2rcL/A-nh-ma-n-hi-nh-2023-10-02-lu-c-11-47-19.png' },
            // { _id: '9', uri: 'https://i.ibb.co/VqM2rcL/A-nh-ma-n-hi-nh-2023-10-02-lu-c-11-47-19.png' },
            // { _id: '10', uri: 'https://i.ibb.co/VqM2rcL/A-nh-ma-n-hi-nh-2023-10-02-lu-c-11-47-19.png' },
        ])
    }, [])

    useEffect(() => {
        if (props?.startRightResult) {
            tranYBox.value = withTiming(HEIGHT_BOX_CHOICE * (listEyeResult.length - 1), { duration: 1000 }, (isFinished) => {
                if (isFinished) {
                    tranYBox.value = withTiming(HEIGHT_BOX_CHOICE * (listEyeResult?.length - 4), { duration: 500 }, (isFinished) => {
                        if (isFinished) {
                            scaleEyeChoiced.value = withTiming(1.15, { duration: 500 })


                            numberValue.value = withTiming(83, { duration: 1000 })
                            opacityChoice.value = withTiming(1, { duration: 1000 })
                        }
                    })
                }
            })
        }
    }, [props?.startRightResult])

    const animBoxChoice = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: tranYBox.value
                }
            ]
        }
    })

    const animScaleEyeChoice = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scaleEyeChoiced.value }
            ],
            opacity: opacityChoice.value
        }
    })

    // const animNumber = useAnimatedStyle(() => {

    //     // const interpolateWidth = interpolate(numberValue.value, [50, 70], [50, 70], { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP });

    //     // // setNumber(interpolateWidth)

    //     // return{
    //     // }
    // })

    const progressText = useDerivedValue(() => {
        return `${Math.floor(numberValue.value)}`
    })

    const animBoxChoiceTextNumber = useAnimatedStyle(() => {
        const interpolateOpacity = interpolate(scaleEyeChoiced.value, [1, 1.15], [0, 1]);

        return {
            opacity: interpolateOpacity
        }
    })


    return (
        <>
            {
                props?.startRightResult ?
                    <View style={styles.rightEyeResult}>
                        <View style={{}}>

                            <Animated.View style={[styles.animatedChoiceBox, animBoxChoice]}>
                                <Image
                                    style={{
                                        width: _widthScale(8 * 2),
                                        height: _widthScale(8 * 2),
                                        position: 'absolute',
                                        right: -_widthScale(8 * 2),
                                        top: _widthScale(8 * 4) - _widthScale(8),
                                        resizeMode: 'contain'
                                    }}
                                    source={require('../../../Image/left_arrowLeftBoxChoice.png')}
                                />
                                {/* <Image
                                    style={{
                                        width: _widthScale(8 * 8),
                                        height: _widthScale(8 * 8),
                                        resizeMode: 'center',
                                        position:'absolute'
                                        // borderWidth:1
                                    }}
                                    source={require('../../../Image/rightBoxChoice.png')} /> */}

                                <Animated.View style={[{
                                    width: _widthScale(8 * 12),
                                    height: _widthScale(8 * 8),
                                    // borderWidth: 1,
                                    position: 'absolute',
                                    right: -_widthScale(8 * 13),
                                    // backgroundColor: 'rgba(0,0,0,.5)',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }, animBoxChoiceTextNumber]}>

                                    <Image
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'stretch',
                                            position: 'absolute',
                                        }}
                                        source={require('../../../Image/left_leftBoxChoice.png')}
                                    />

                                    <Text style={{
                                        fontSize: _moderateScale(12),
                                        color: 'white',
                                        top: _moderateScale(8),
                                        position: 'absolute',
                                        zIndex: 1
                                    }}>
                                        Tương thích
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        // borderWidth:1,
                                        position: 'absolute',
                                        bottom: Platform.OS == 'ios' ? _heightScale(8) : 0
                                    }}>
                                        <ReText style={{
                                           fontSize: _moderateScale(20),
                                           fontWeight: 'bold',
                                           color: 'white',
                                        }} text={progressText} />
                                        <Text style={{
                                            fontSize: _moderateScale(18),
                                            fontWeight: 'bold',
                                            color: 'white'
                                        }}>%</Text>
                                    </View>
                                    {/* <Text>
                                        {`${progressText.value}`}
                                    </Text> */}
                                </Animated.View>


                            </Animated.View>

                            {
                                listEyeResult?.map((item, index) => {
                                    return (
                                        <Animated.View style={[{
                                            width: _widthScale(8 * 8),
                                            height: _widthScale(8 * 8),
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        },]}>
                                            <Animated.Image
                                                style={[{
                                                    width: _widthScale(8 * 6),
                                                    height: _widthScale(8 * 6),
                                                    borderRadius: _moderateScale(8),
                                                    borderWidth: 1,
                                                    borderColor: 'white',
                                                    opacity: 0.3
                                                },
                                                index == 4 && animScaleEyeChoice
                                                ]}
                                                source={{
                                                    uri: `${item?.uri}`
                                                }} />
                                        </Animated.View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    :
                    <></>

            }


        </>
    )
})

export default LeftEyeResult

const styles = StyleSheet.create({
    animatedChoiceBox: {
        width: _widthScale(8 * 8),
        height: _widthScale(8 * 8),
        // backgroundColor: 'rgba(140, 120, 150,.5)',
        position: 'absolute',
        zIndex: 1,
        borderWidth: _moderateScale(2),
        borderRadius: _moderateScale(8),
        borderColor: '#9fe0ed'
    },
    rightEyeResult: {
        width: _widthScale(8 * 8.5),
        height: _heightScale(8 * 70),
        backgroundColor: 'rgba(0,0,0,.5)',
        left: 0,
        top: _heightScale(8 * 14),
        position: 'absolute',
        zIndex: 10,
        borderTopRightRadius: _moderateScale(8 * 3),
        borderBottomRightRadius: _moderateScale(8 * 3),
        alignItems: 'center',
        justifyContent: 'center',
    }
})