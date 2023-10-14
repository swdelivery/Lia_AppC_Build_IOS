import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import { _moderateScale } from '../../../Constant/Scale'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'

const AnimatedVoucherLogin = memo(() => {


    const tranXLight = useSharedValue(0);


    useEffect(() => {
        _startAnimLight()
    }, [])

    const _startAnimLight = () => {

        // tranXLight.value = withRepeat(
        //     withTiming(200, { duration: 500 }), -1
        // )
        

        tranXLight.value = withRepeat(
            withSequence(
                withTiming(300, { duration: 1000 }),
            )
            , -1);
    }

    const animXLight = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: tranXLight.value
                },
                {
                    rotate: '20deg'
                }
            ]
        }
    })

    return (
        <View style={{
            width: _moderateScale(380),
            height: _moderateScale(8 * 8),
            borderRadius: _moderateScale(8 * 1.5),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: _moderateScale(8 * 2),
            overflow: 'hidden'
        }}>

            <Animated.View style={[{
                width: _moderateScale(8 * 2),
                height: _moderateScale(8 * 10),
                backgroundColor: 'rgba(255,255,255,.5)',
                position: 'absolute',
                left: _moderateScale(8 * 10),
                zIndex: 1,
            }, animXLight]} />



            <LinearGradient
                style={[StyleSheet.absoluteFill, {
                    borderWidth: .5,
                    borderColor: 'rgba(0,0,0,.1)',
                    zIndex: -1, borderRadius: _moderateScale(8 * 1.5)
                }]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["white", "#FBE6D5"]}
            />

            <Image
                style={styles.sizeImage}
                source={require('../../../Image/luckymoney.png')} />

            <View style={{ marginLeft: _moderateScale(8) }}>
                <Text style={{ color: '#ED6B35', fontSize: _moderateScale(14), fontWeight: 'bold' }}>
                    Voucher 5.000.000đ đang chờ bạn
                </Text>
                <Text style={{ color: '#EF8984', fontSize: _moderateScale(12), fontWeight: 'bold', marginTop: _moderateScale(4) }}>
                    Đăng kí ngay!!
                </Text>
            </View>

        </View>
    )
})

export default AnimatedVoucherLogin

const styles = StyleSheet.create({
    sizeImage: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        borderRadius: _moderateScale(4)
    }
})