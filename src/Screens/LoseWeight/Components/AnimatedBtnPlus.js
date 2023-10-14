import React, { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableHighlight, Animated, Text, Image ,TouchableOpacity} from "react-native";
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { BASE_COLOR, BLUE_FB } from '../../../Constant/Color';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale } from '../../../Constant/Scale';

const AnimatedBtnPlus = memo((props) => {

    const mode = useRef(new Animated.Value(0)).current;
    const buttonSize = useRef(new Animated.Value(1)).current;

    const [firstLoad, setFirstLoad] = useState(false)

    const handlePress = () => {
        props?.onPress()
    }

    useEffect(() => {
        setFirstLoad(true)
    }, [])

    useEffect(() => {
        if (firstLoad) {
            Animated.sequence([
                Animated.timing(buttonSize, {
                    // toValue: 0.95,
                    toValue: props?.show ? 0.95 : 1,
                    duration: 1
                }),
                Animated.timing(mode, {
                    toValue: mode._value === 0 ? 1 : 0,
                    duration: 200
                }),
            ]).start();
        }

    }, [props?.show])


    const thermometerX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, -100]
    });

    const thermometerY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -100]
    });

    const timeX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, -24]
    });

    const timeY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -150]
    });

    const pulseX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, 50]
    });

    const pulseY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -100]
    });

    const rotation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"]
    });

    const sizeStyle = {
        transform: [{ scale: buttonSize }]
    };

    return (
        <View style={{ position: "absolute", alignItems: "center", zIndex: 100 }}>
            <Animated.View style={{ position: "absolute", left: thermometerX, top: thermometerY }}>
                <View style={styles.secondaryButton}>
                    {/* <Feather name="thermometer" size={24} color="#FFF" /> */}
                </View>
            </Animated.View>
            <Animated.View style={{ position: "absolute", left: timeX, top: timeY }}>
                <View style={styles.secondaryButton}>
                    {/* <Feather name="clock" size={24} color="#FFF" /> */}
                </View>
            </Animated.View>
            <Animated.View style={{ position: "absolute", left: pulseX, top: pulseY }}>
                <View style={styles.secondaryButton}>
                    {/* <Feather name="activity" size={24} color="#FFF" /> */}
                </View>
            </Animated.View>
            <Animated.View style={[styles.button, sizeStyle]}>
                <TouchableOpacity style={{padding: _moderateScale(8 * 2) }} onPress={handlePress} underlayColor="#7F58FF">
                    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                        {/* <FontAwesome5 name="plus" size={24} color="#FFF" /> */}
                        <Image style={[sizeIcon.lg]} source={require('../../../Icon/plus_white.png')} />
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
});


const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 8 * 8,
        height: 8 * 8,
        borderRadius: 36,
        backgroundColor: BLUE_FB,
        position: "absolute",
        marginTop: -60,
        shadowColor: BLUE_FB,
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF"
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: BLUE_FB,
        borderWidth: 3,
        borderColor: "#FFFFFF"
    }
});

export default AnimatedBtnPlus;