import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { GREY, BG_GREY_OPACITY_5, BG_GREY_OPACITY_2 } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';

const InputSearch = memo((props) => {


    return (
        <View style={styles.inputHeader}>

            <Image
                style={[sizeIcon.sm]}
                source={require('../../../Icon/search_grey.png')} />

            <TextInput
                value={props?.value}
                onChangeText={(text) => {
                    props?.onChangeText(text)
                }}
                placeholderTextColor={GREY}
                style={[stylesFont.fontNolan, {marginLeft:_moderateScale(8), fontSize: _moderateScale(14), flex: 1, paddingVertical: 0 }]}
                placeholder={'Bạn cần tìm ?'} />
            {
                props?.value?.length > 0 ?
                    <TouchableOpacity
                    hitSlop={styleElement.hitslopSm}
                    onPress={props?.clearSearch}
                    style={styles.btnClearInput}>
                        <Image
                            style={[sizeIcon.xxxs, { opacity: 0.7 }]}
                            source={require('../../../Icon/cancel.png')} />
                    </TouchableOpacity>
                    : <></>
            }



        </View>
    );
});

const styles = StyleSheet.create({
    btnClearInput: {
        width: _moderateScale(8 * 2.25),
        height: _moderateScale(8 * 2.25),
        borderRadius: _moderateScale(8 * 2.25 / 2),
        backgroundColor: BG_GREY_OPACITY_5,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    inputHeader: {
        width: "100%",
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8 * 4),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_2
    },
})

export default InputSearch;