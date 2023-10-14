import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity, ImageBackground, Animated, Easing } from 'react-native';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale, _width, _heightScale } from '../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, BLACK_OPACITY_7, SECOND_COLOR, THIRD_COLOR, BLACK, RED } from '../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import moment from 'moment'
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'

const ModalSuccess = memo((props) => {

    const scaleBtn = useRef(new Animated.Value(0)).current;


    console.log({ ALOO: props?.data });

    useEffect(() => {
        // _startScaleBtn()
    }, [])


    const _startScaleBtn = () => {
        Animated.sequence([
            Animated.timing(scaleBtn, { toValue: 1, duration: 300, easing: Easing.out(Easing.quad), useNativeDriver: true }),
            Animated.timing(scaleBtn, { toValue: 0, duration: 800, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        ]).start(() => {
            props.show ? _startScaleBtn() : null
            // if (countAnimatedImageLoop.current > 20) return
        })
    }

    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'center',
                paddingBottom: getBottomSpace() + _heightScale(8 * 10)
            }}
            isVisible={props.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props?.hide()
            }}
            onModalShow={_startScaleBtn}
            onBackdropPress={() => {
                // props?.hide()
            }}>

            <View style={styles.container}>


                <ImageBackground
                    style={{
                        width: "100%",
                        height: _moderateScale(8 * 50),
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                    source={{
                        uri: `${URL_ORIGINAL}${props?.data?.data?.data?.imageResponse?.link}`
                    }} >

                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => {
                            props?.hide()
                        }}
                        style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100,
                        position:'absolute',right:_moderateScale(8*2),zIndex:100 }}>
                        <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={props?.confirmGetReward}
                    style={{
                        width: "100%",
                        height: _moderateScale(8 * 50),
                    }}>

                        {/* <View style={[styleElement.rowAliCenter, { padding: _moderateScale(8 * 2), paddingBottom: 0 }]}>

                            <View style={{ alignItems: 'flex-end', }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        props?.hide()
                                    }}
                                    style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                                    <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                                </TouchableOpacity>
                            </View>
                        </View> */}

                        <Animated.Image style={[{
                            width: _moderateScale(8 * 20),
                            height: _moderateScale(8 * 5),
                            resizeMode: 'contain',
                            position: 'absolute',
                            zIndex: 1,
                            bottom: _moderateScale(8 * 3),
                            alignSelf: 'center'
                        },
                        {
                            transform: [
                                {
                                    scale: scaleBtn.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 1.15]
                                    })
                                },
                            ]
                        }
                        ]} source={require('../../Image/spin/btnGetReward.png')} />

                    </TouchableOpacity>
                </ImageBackground>

            </View>

        </Modal>
    );
});


const styles = StyleSheet.create({
    container: {
        width: _width - _moderateScale(8 * 4),
        height: _moderateScale(8 * 50),
        backgroundColor: 'transparent',
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 4)
    }
})

export default ModalSuccess;