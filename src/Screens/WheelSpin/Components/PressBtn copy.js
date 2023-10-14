import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { _moderateScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import { BLUE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';

const PressBtn = memo((props) => {

    const scaleAnimation = new Animated.Value(1)

    return (
        <Animated.View style={[styles.btn,
            shadow,
        {
            transform: [
                {
                    scale: scaleAnimation
                },
            ]
        },
        ]}>
            <TouchableOpacity
                onPressIn={() => {
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
                }}
                // onPress={() => {
                //     props?.onPress()
                // }}
                style={{}}>
                <Text style={{ color: '#C86609', ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), bottom: 1 }}>
                    Quay!
                </Text>
            </TouchableOpacity>

            {/* <View style={{
                width: _moderateScale(8 * 15),
                height: _moderateScale(8 * 5),
                borderRadius: _moderateScale(8),
                backgroundColor: "#E48411",
                position: 'absolute',
                zIndex: -100,
                bottom: -16
            }} /> */}
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    btn: {
        marginTop: _moderateScale(8 * 2),
        backgroundColor: "#FDD93F",
        width: _moderateScale(8 * 15),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8),
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