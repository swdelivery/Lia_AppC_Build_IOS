import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text ,TouchableOpacity} from 'react-native';
import { WHITE, BASE_COLOR } from '../Constant/Color';
import { TabBar, TabView } from 'react-native-tab-view';

const HEADER_HEIGHT = 220;

const header = memo((props) => {

    useEffect(()=>{
        alert('alo')
    },[props?.offset])


    const translateY = props?.offset.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
        extrapolate: "clamp",
      });
    return (
        <Animated.View
            style={[
                {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    overflow: "hidden",
                    backgroundColor: "grey",
                    height: HEADER_HEIGHT,
                },
                { transform: [{ translateY }] },
            ]}
        >
            <Text>Test</Text>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => {
                    setX(old => !old)
                }}>
                    <Text>Change!</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
});



export default header;