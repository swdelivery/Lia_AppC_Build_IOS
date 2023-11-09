import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
import { WHITE, BLACK_OPACITY_8, BTN_PRICE } from '../../../Constant/Color';
import { navigation } from '../../../../rootNavigation';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { sizeIcon } from '../../../Constant/Icon';
import { stylesFont } from '../../../Constant/Font';
import ScreenKey from '../../../Navigation/ScreenKey'

const InfoProjSocial = memo((props) => {

    if(props?.isActiveTab){
        return (
            <View>
                <Text style={[stylesFont.fontNolan,{fontSize:_moderateScale(13), color:BLACK_OPACITY_8}]}>
                    {props?.data}
                </Text>
            </View>
        );
    }else{
        return <></>
    }

    
});



export default InfoProjSocial;