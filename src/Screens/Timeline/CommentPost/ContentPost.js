import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale } from '../../../Constant/Scale';

const ContentPost = ((props) => {
    return (
        <View style={[styles.contentView]}> 
            {
                props?.data?.content ?
                    <Text style={[stylesFont.fontNolan, styles.contentView__text]}>
                        {`${props?.data?.content}`}
                    </Text>
                    :
                    <>
                    </>
            }

        </View>
    );
});

const styles = StyleSheet.create({
    contentView__text: {
        fontSize: _moderateScale(14),
        lineHeight: _moderateScale(8 * 2.5),
        textAlign: 'justify'
    },
    contentView: {
        marginVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2)
    },
})

export default memo(ContentPost);