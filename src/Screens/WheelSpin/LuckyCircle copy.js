import React, { memo, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Animated, Easing, TouchableOpacity, ImageBackground } from 'react-native';
import { sizeIcon } from '../../Constant/Icon';
import ModalSuccess from './ModalSuccess';
import { _moderateScale, _heightScale } from '../../Constant/Scale';
import PressBtn from './Components/PressBtn';
import { getSpinWheel, getLuckyCircle } from '../../Redux/Action/SpinWheelAction';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';

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
        if (result1?.isAxiosError) return

        let findIndex = props?.data?.findIndex(item => item?.code == result1?.data?.data?.code);
        if (findIndex !== -1) {
            _startSpin(findIndex, { data: result1?.data })
        }

        props?.showOverLay(true)

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
            <View style={{ alignItems: 'center', top: -_heightScale(8 * 22) }}>

                <Image
                    style={{
                        width: 50,
                        height: 50,
                        position: 'absolute',
                        zIndex: 10,
                        top: -20
                    }}
                    source={require('../../Image/component/arrowDown.png')} />

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
                                    width: _moderateScale(8 * 40),
                                    height: _moderateScale(8 * 40),
                                }]}
                            source={{ uri: `${URL_ORIGINAL}${luckyCircle?.fileArr[0]?.link}` }} />
                        : <></>
                }



                <PressBtn onPress={_getLuckyNumber} />

            </View>


        </>
    );
});



export default LuckyCircle;