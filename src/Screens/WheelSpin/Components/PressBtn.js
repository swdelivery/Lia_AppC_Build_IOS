import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View, Image } from 'react-native';
import { _moderateScale, _heightScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { BLUE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';

const PressBtn = memo((props) => {

    const scaleAnimation = new Animated.Value(1)

    return (
        <>
            <Animated.View style={[styles.btn,
                
            {
                transform: [
                    {
                        scale: scaleAnimation
                    },
                ]
            },
            ]}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPressIn={() => {
                        props?.showOverLay(true)
                        Animated.timing(scaleAnimation, {
                            toValue: 0.8,
                            duration: 200
                        }).start(() => {
                            Animated.timing(scaleAnimation, {
                                toValue: 1,
                                duration: 100
                            }).start()
                        })
                    }}
                    onPressOut={() => {
                        props?.onPress()
                    }}>
                    <Image style={{
                        width: _heightScale(8 * 20),
                        height: _heightScale(8 * 7),
                        resizeMode: 'contain'
                    }} source={require('../../../Image/spin/btnSpin.png')} />

                </TouchableOpacity>
            </Animated.View>

          
        </>
    );
});

const styles = StyleSheet.create({
    btn: {
        marginTop: _heightScale(8 * 5.25),
        // backgroundColor: "#FDD93F",
        width: _heightScale(8 * 20),
        height: _heightScale(8 * 7),
        borderRadius: _heightScale(8),
        ...styleElement.centerChild,
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}

export default PressBtn;