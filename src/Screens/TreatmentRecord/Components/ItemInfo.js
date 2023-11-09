import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from 'react-native'
import { _moderateScale } from '../../../Constant/Scale';
import { BTN_PRICE, WHITE, BLACK_OPACITY_8 } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';

const ItemInfo = memo((props) => {
    return (
        <View style={{ alignItems: 'center', width: _moderateScale(8 * 9) }}>
            <View style={{
                width: _moderateScale(8 * 5),
                height: _moderateScale(8 * 5),
                borderRadius: _moderateScale(8 * 5 / 2),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: BTN_PRICE
            }}>
                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: WHITE }]}>{props?.value}</Text>
            </View>
            <Text numberOfLines={1} style={[stylesFont.fontNolan500, { fontSize: _moderateScale(11), color: BLACK_OPACITY_8 }]}>{props?.title}</Text>
        </View>
    );
});



export default ItemInfo;