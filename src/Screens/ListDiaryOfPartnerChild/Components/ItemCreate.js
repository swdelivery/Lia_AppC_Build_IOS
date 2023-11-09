import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { _moderateScale } from '../../../Constant/Scale';
import { BASE_COLOR, BG_BEAUTY, BLUE_FB, BLUE_TITLE, FIFTH_COLOR, GREY, SECOND_COLOR, THIRD_COLOR } from '../../../Constant/Color';
import { useSelector } from 'react-redux';
import ScreenKey from '../../../Navigation/ScreenKey';
import { navigation } from '../../../../rootNavigation';

const ItemCreate = ((props) => {

    console.log(props?.data)
    return (
        <TouchableOpacity
      
        style={{
            flex: 1,
            backgroundColor: '#ffffffcc',
            minHeight: _moderateScale(90),
            marginBottom: _moderateScale(12),
            borderRadius: _moderateScale(12),
            justifyContent: 'center',
            alignItems: 'center'
        }}> 
           
        </TouchableOpacity>
        
    );
});



export default ItemCreate;