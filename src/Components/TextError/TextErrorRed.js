import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import { stylesFont } from '../../Constant/Font';
import { RED } from '../../Constant/Color';
import { _moderateScale } from '../../Constant/Scale';

const TextErrorRed = memo((props) => {
    return (
        <>
            {
                props?.isShowError ?
                    <Text style={styles.textError}>{props?.dataError}</Text>
                    :
                    <Text numberOfLines={1} style={[styles.textError, { opacity: 0 }]}>{"."}</Text>
            }
        </>
    );
});


const styles = StyleSheet.create({
    textError: {
        ...stylesFont.fontNolan500,
        color: RED,
        fontStyle: 'italic',
        fontSize: _moderateScale(12),
        marginTop: _moderateScale(4)
    },
})


export default TextErrorRed;