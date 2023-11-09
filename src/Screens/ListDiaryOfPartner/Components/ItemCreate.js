import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { _moderateScale } from '../../../Constant/Scale';
import { BASE_COLOR, BG_BEAUTY, BLUE_FB, BLUE_TITLE, FIFTH_COLOR, GREY, SECOND_COLOR, THIRD_COLOR } from '../../../Constant/Color';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey';

const ItemCreate = ((props) => {
    return (
        <TouchableOpacity 
        onPress = {()=>{
            navigation.navigate(ScreenKey.PICK_TREATMENT_TO_BOOKING)
        }}
        style={{
            flex: 1,
            backgroundColor: '#ffffffcc',
            minHeight: _moderateScale(72),
            marginBottom: _moderateScale(12),
            borderRadius: _moderateScale(12),
            justifyContent: 'center',
            alignItems: 'center'
        }}> 
            <Image source={require('../../../Icon/plusGrey.png')} 
            style={{width: _moderateScale(36), height: _moderateScale(36)}}/>
        </TouchableOpacity>
        
    );
});



export default ItemCreate;