import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Animated, View ,Image, Easing} from 'react-native';
import { styleElement } from '../../../../Constant/StyleElement';
import { _moderateScale } from '../../../../Constant/Scale';
import { WHITE } from '../../../../Constant/Color';
import { sizeIcon } from '../../../../Constant/Icon';

const AmtdArrow = memo((props) => {

    const tranformXY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (props?.isOpen) {
            Animated.timing(
                tranformXY,
                {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.linear, // Easing is an additional import from react-native
                    useNativeDriver: true  // To make use of native driver for performance
                }
            ).start(() => {
            })
        }else{
            Animated.timing(
                tranformXY,
                {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear, // Easing is an additional import from react-native
                    useNativeDriver: true  // To make use of native driver for performance
                }
            ).start(() => {
            })
        }
    }, [props?.isOpen])


    return (
        <View style={[styleElement.centerChild, {
            width: _moderateScale(24),
            height: _moderateScale(24),
            backgroundColor: WHITE
        },

        ]}>
            <Animated.Image style={[sizeIcon.sm,
            {
                transform: [{
                    rotate: tranformXY.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '90deg']
                    })
                }]
            },
            {
                opacity:0.7
            }
            ]} source={require('../../../../NewIcon/rightBlack.png')} />
        </View>
    );
});



export default AmtdArrow;