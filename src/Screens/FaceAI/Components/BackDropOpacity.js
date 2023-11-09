import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import { _moderateScale } from '../../../Constant/Scale'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const BackDropOpacity = memo((props) => {


    const opacityValue = useSharedValue(0);

    useEffect(() => {
        if (props?.show == 'doing') {
            opacityValue.value = withTiming(1, { duration: 1000 })
        }
        if (props?.show == 'hiding') {
            opacityValue.value = withTiming(0, { duration: 1000 }, (fns) => {
                if (fns) {
                    runOnJS(props?.setShowBackDropOpacity)('done')
                }
            })
        }
    }, [props?.show])

    const animOpacityGridEffect = useAnimatedStyle(() => {
        return {
            opacity: opacityValue.value
        }
    })

    return (
        <>
            {
                props?.show == 'doing' || props?.show == 'hiding' ?
                    <Animated.View style={
                        [{
                            ...StyleSheet.absoluteFillObject,
                            position: 'absolute',
                            zIndex: 1
                        },
                            animOpacityGridEffect
                        ]} >

                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,.3)', zIndex: 2 }]} />

                        <View style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            top: _moderateScale(8 * 10),
                            zIndex: 3
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: _moderateScale(50),
                                fontWeight: 'bold',
                                opacity: 1
                            }}>
                                EYE ANALYSIS
                            </Text>
                        </View>

                    </Animated.View >
                    :
                    <>
                    </>
            }
        </>
    )
})

export default BackDropOpacity

const styles = StyleSheet.create({})