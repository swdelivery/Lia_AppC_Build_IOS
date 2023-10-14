import React, { memo, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Animated, Easing, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import ModalSuccess from './ModalSuccess';
import { _moderateScale, _heightScale, _widthScale } from '../../Constant/Scale';
import PressBtn from './Components/PressBtn';
import { getSpinWheel, getLuckyCircle } from '../../Redux/Action/SpinWheelAction';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import { BG_GREY_OPACITY_2 } from '../../Constant/Color';

const LuckyCircle = memo((props, ref) => {

    const spinValue = new Animated.Value(0);

    const [numberLucky, setNumberLucky] = useState(null)

    const [luckyCircle, setLuckyCircle] = useState({})


    // Next, interpolate beginning and end values (in this case 0 and 1)

    useEffect(() => {
        _getImageCircle()
    }, [])

    const _getImageCircle = async () => {
        let result = await getLuckyCircle()
        if (result?.isAxiosError) return
        setLuckyCircle(result?.data?.data)
    }

    const _getLuckyNumber = async () => {

        let result1 = await getSpinWheel()
        if (result1?.isAxiosError) return props?.showOverLay(false)

        let findIndex = props?.data?.findIndex(item => item?.code == result1?.data?.data?.code);
        if (findIndex !== -1) {
            _startSpin(findIndex, { data: result1?.data })
        }



        return

        // setTimeout(() => {
        //     // setNumberLucky(3)


        // }, 500);
        // _startSpin(3)

        let result = await fakeApi();
        console.log({ result });
        // setNumberLucky(result?.number)
        _startSpin(result?.number)

    }

    const fakeApi = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                return resolve({ number: Math.floor(Math.random() * 10) })
            }, 0)
        });
    }

    const _startSpin = (luckyNumber, data) => {
        console.log({ spinValuex: spinValue._value });

        spinValue.setValue(0)

        Animated.timing(
            spinValue,
            {
                toValue: spinValue._value + (6 + luckyNumber / props?.data?.length),
                duration: 5000,
                useNativeDriver: true,  // To make use of native driver for performance
                easing: Easing.out(Easing.quad)
                // easing: Easing.inOut(Easing.quad)
            }
        ).start(() => {
            // spinValue.setValue(spinValue._value + (6+ luckyNumber / 10))
            props?.onSpinEnd(data)
        })
    }

    // useImperativeHandle(ref, () => ({

    //     getAlert() {
    //         console.log({ spinValuex: spinValue._value });

    //         spinValue.setValue(0)

    //         Animated.timing(
    //             spinValue,
    //             {
    //                 toValue: spinValue._value + (2 + props?.number / 10),
    //                 duration: 3000,
    //                 useNativeDriver: true,  // To make use of native driver for performance
    //                 easing: Easing.inOut(Easing.quad)
    //             }
    //         ).start(() => {
    //             spinValue.setValue(spinValue._value + (2 + props?.number / 10))
    //             props?.onSpinEnd()
    //         })
    //     }

    // }));

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
    })


    return (
        <>
            <View style={{ alignItems: 'center', marginTop: _heightScale(8 * 3) }}>

                <Image
                    resizeMode={'contain'}
                    style={{
                        width: _heightScale(8 * 5),
                        height: _heightScale(8 * 6),
                        position: 'absolute',
                        zIndex: 10,
                        top: -_heightScale(16),
                    }}
                    source={require('../../Image/spin/arrowDown.png')} />

                {
                    luckyCircle?.fileArr?.length > 0 ?
                        <Animated.Image
                            style={[
                                {
                                    transform: [{
                                        rotate: spin
                                    }]
                                },
                                {
                                    width: _heightScale(8 * 42.5),
                                    height: _heightScale(8 * 42.5),
                                    backgroundColor: BG_GREY_OPACITY_2,
                                    borderRadius: _heightScale(8 * 42.5 / 2)
                                }]}
                            source={{ uri: `${URL_ORIGINAL}${luckyCircle?.fileArr[0]?.link}` }}
                        // source={require('../../Image/spin/circleHD.png')}
                        />
                        :
                        <View style={{
                            width: _heightScale(8 * 42.5),
                            height: _heightScale(8 * 42.5),
                            backgroundColor: BG_GREY_OPACITY_2,
                            borderRadius: _heightScale(8 * 42.5 / 2)
                        }}>
                        </View>
                }

                <Image style={{
                    width: _heightScale(8 * 20),
                    height: _heightScale(8 * 7),
                    resizeMode: 'contain',
                    position: 'absolute',
                    top: _heightScale(8 * 41.5),
                    zIndex: 0
                }} source={require('../../Image/spin/wire.png')} />


                <PressBtn
                    showOverLay={props?.showOverLay}
                    onPress={_getLuckyNumber} />



            </View>


        </>
    );
});

const styles = StyleSheet.create({
    ls: {
        width: _heightScale(8 * 10),
        height: _heightScale(8 * 10),
        resizeMode: 'contain'
    },
    tl: {
        width: _heightScale(8 * 10),
        height: _heightScale(8 * 11.5),
        resizeMode: 'contain',
        bottom: _heightScale(2)
    }
})

export default LuckyCircle;