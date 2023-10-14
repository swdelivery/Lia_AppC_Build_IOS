import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';  
import { BASE_COLOR, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';


const BottomBtn = memo((props) => {
    return (
        <TouchableOpacity
            onPress={props?.submit}
            style={[{
                height: _moderateScale(8 * 4),
                backgroundColor: WHITE,
                // width: _moderateScale(8 * 12),
                marginHorizontal: _moderateScale(8 * 2),
                borderRadius: _moderateScale(8),
                overflow: 'hidden',
                marginVertical: _moderateScale(8),
                marginBottom: getBottomSpace() + _moderateScale(8)
            }]}>
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={gradient.color}
                style={gradient.container}>
                <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(15), color: WHITE }]}>
                    {props?.title}
            </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
});



const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        'rgba(104, 47, 144,.7)',
        BASE_COLOR,
    ]
}

export default BottomBtn;
