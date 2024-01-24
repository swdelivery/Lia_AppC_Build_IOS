import React, { memo, useEffect, useState } from 'react'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { ReText } from 'react-native-redash'
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale'

const HEIGHT_BOX_CHOICE = _widthScale(8 * 8)

const LeftEyeResult = memo((props) => {

    const [listEyeResult, setListEyeResult] = useState([
        { _id: '1', uri: 'https://i.ibb.co/5Y7xJDK/mi-su-p.png', code: 'MI_SUP' },
        { _id: '2', uri: 'https://i.ibb.co/k0bHB8B/1-mi-lo-t.png', code: 'MI_LOT' },
        { _id: '3', uri: 'https://i.ibb.co/s6gfpQc/2-mi.png', code: 'HAI_MI' },
        { _id: '4', uri: 'https://i.ibb.co/bLT6j1b/1-mi.png', code: 'MOT_MI' },
        { _id: '5', uri: 'https://i.ibb.co/Ldg3R9j/nhie-u-mi.png', code: 'NHIEU_MI' },
        { _id: '6', uri: 'https://i.ibb.co/ct3CNfk/2-mi-lo-t.png', code: '2MI_LOT' },
        { _id: '7', uri: 'https://i.ibb.co/ZKVLr8M/2-mi-ru-o-i.png', code: '2MI_RUOI' },
        { _id: '8', uri: 'https://i.ibb.co/H7TS0rY/mi-xe-ch.png', code: 'MI_SECH' },
    ])
    const [indexCurrValue, setIndexCurrValue] = useState(null)
    const numberValue = useSharedValue(1);
    const opacityChoice = useSharedValue(0.3);

    const tranYBox = useSharedValue(0);
    const scaleEyeChoiced = useSharedValue(1);

    useEffect(() => {
        if (props?.scanningResult) {
            let findIndexCurr = listEyeResult?.findIndex(item => item?.code == props?.scanningResult?.left?.eylid_type);
            if (findIndexCurr !== -1) {
                setIndexCurrValue(findIndexCurr)
            }
        }
    }, [props?.scanningResult])


    useEffect(() => {
        if (props?.startRightResult && indexCurrValue) {
            tranYBox.value = withTiming(HEIGHT_BOX_CHOICE * (listEyeResult.length - 1), { duration: 1000 }, (isFinished) => {
                if (isFinished) {
                    tranYBox.value = withTiming(HEIGHT_BOX_CHOICE * (indexCurrValue), { duration: 500 }, (isFinished) => {
                        if (isFinished) {
                            let randomNumber = Math.floor(Math.random() * (95 - 80 + 1)) + 80;
                            scaleEyeChoiced.value = withTiming(1.15, { duration: 500 })
                            numberValue.value = withTiming(randomNumber, { duration: 1000 })
                            opacityChoice.value = withTiming(1, { duration: 1000 })
                        }
                    })
                }
            })
        }
    }, [props?.startRightResult, indexCurrValue])

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
                                <Animated.View style={[{
                                    width: _widthScale(8 * 12),
                                    height: _widthScale(8 * 8),
                                    position: 'absolute',
                                    right: -_widthScale(8 * 13),
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
                                        Độ chính xác
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
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
                                                index == indexCurrValue && animScaleEyeChoice
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
