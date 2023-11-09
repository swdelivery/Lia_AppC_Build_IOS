import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet, View, Image } from 'react-native';
import { GREY, BG_GREY_OPACITY_5, BG_GREY_OPACITY_2 } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale } from '../../../Constant/Scale';

const InputSearch = memo((props) => {
    return (
        <View style={styles.inputHeader}>
            <TextInput
                placeholderTextColor={GREY}
                style={[stylesFont.fontNolan, { flex: 1, paddingVertical: 0 }]}
                placeholder={'Bạn cần tìm ?'} />
            <Image
                style={[sizeIcon.sm]}
                source={require('../../../Icon/search_grey.png')} />
        </View>
    );
});

const styles = StyleSheet.create({
    inputHeader: {
        width: "100%",
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8 * 4),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth:_moderateScale(0.5),
        borderColor:BG_GREY_OPACITY_2
    },
})

export default InputSearch;