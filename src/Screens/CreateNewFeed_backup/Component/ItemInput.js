import React, { memo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native';
import { BG_GREY_OPACITY_3, BLACK_OPACITY_8 } from '../../../Constant/Color';
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale';


const ItemInput = memo((props) => {
    const [content, setContent] = useState('')


    return (
    <View style={[styles.input]}>
    <TextInput style={[styles.textFeed]
    }
    multiline={true}
    placeholder={`Bạn đang nghĩ gì?`}
    onChangeText={(text)=>{
        setContent(text)
    }}
    onBlur={()=>{
        props?.setContent(content)
    }}
    />
    </View>
);
})

const styles = StyleSheet.create({
    input: {
        flex: 1,
        padding: _moderateScale(12),
        fontSize: _widthScale(14),
        padding: _moderateScale(8),
        minHeight: _moderateScale(120),
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_3,
        backgroundColor: BG_GREY_OPACITY_3,
        marginBottom: _moderateScale(16),
        color: BLACK_OPACITY_8,
        borderRadius: _moderateScale(8)
    },
    })

export default ItemInput;