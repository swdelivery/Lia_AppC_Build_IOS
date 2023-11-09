import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { _moderateScale } from '../../../../Constant/Scale';
import { stylesFont } from '../../../../Constant/Font';
import { BTN_PRICE, GREY, BLACK, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BASE_COLOR } from '../../../../Constant/Color';

const ItemPriceWallet = memo((props) => {
    return (
        <View style={styles.btnPrice}>
            <Text style={[stylesFont.fontNolan500, styles.title]}>
                {props?.title}
            </Text>
            {props?.type!=='referal'&&<Text style={[stylesFont.fontDinTextProBold, styles.price , props?.end && {color:'#5D5FEF'}]}>
                {props?.price}
            </Text>}
            {props?.type==='referal'&&<View style={{flexDirection:'row', 
            marginTop: _moderateScale(8),
            justifyContent:"space-between"}}>
                <View style={{alignItems:'center', paddingTop:_moderateScale(4)}}>
                    <Text style={{color: props?.color?props?.color:BASE_COLOR, fontSize:_moderateScale(16)}}>{props?.price2}</Text>
                    <Text style={{fontStyle:'normal', color: GREY, fontSize: _moderateScale(11)}}>Level 2</Text>
                </View>
                <View style={{alignItems:'center', paddingTop:_moderateScale(4)}}>
                    <Text style={{color: props?.color?props?.color:BASE_COLOR, fontSize:_moderateScale(16)}}>{props?.price3}</Text>
                    <Text style={{fontStyle:'normal', color: GREY, fontSize: _moderateScale(11)}}>Level 3</Text>
                </View>
            </View>}
        </View>
    );
});

const styles = StyleSheet.create({
    btnPrice: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 2),
        borderBottomWidth:_moderateScale(0.5),
        borderBottomColor:BG_GREY_OPACITY_3
    },
    title: {
        color: BLACK_OPACITY_8,
        fontSize: _moderateScale(14)
    },
    price: {
        alignSelf: 'flex-end',
        fontSize: _moderateScale(20),
        color: BTN_PRICE
    }
})


export default ItemPriceWallet;