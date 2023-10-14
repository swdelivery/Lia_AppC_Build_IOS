import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Animated,
    Image,
    TouchableWithoutFeedback, TouchableOpacity 
} from 'react-native'
import { BG_GREY_OPACITY_9, GREY_FOR_TITLE, SECOND_COLOR, WHITE } from '../../Constant/Color';
import { navigation } from '../../../rootNavigation';
import { _moderateScale } from '../../Constant/Scale';
import { sizeIcon } from '../../Constant/Icon';

const index = memo((props) => {



    return (
        <View style={{
            flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
            <TouchableWithoutFeedback
                onPress={() => navigation.goBack()}
                style={{ width: "100%", height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    width: "80%",
                    height: '80%',
                    backgroundColor: WHITE
                }}>
                    <Text>alo</Text>
                </View>
            </TouchableWithoutFeedback>

        </View>
    );
});

const styles = StyleSheet.create({
    headOfModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: BG_GREY_OPACITY_9,
        paddingBottom: _moderateScale(12)
    },
    titleModal: {
        color: SECOND_COLOR,
        fontSize: _moderateScale(16)
    },
    bodyOfModal: {
        flex: 1,
        paddingVertical: _moderateScale(16)
    }
});

export default index;