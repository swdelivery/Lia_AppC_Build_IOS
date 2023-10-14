import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Certificate = (props) => {
    return (
        <TouchableOpacity style={[{
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: props?.bg == 'black' ? "#151617" : (props?.bg == 'blue' ? "#6AB6D3" : "#414378"),
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden'
        },
            // props?.bg == 'black' ? "#151617"
        ]}>
            <Image style={[{
                width: 8 * 1.5,
                height: 8 * 1.5,
                resizeMode: 'contain',
                marginRight: 4
            }, props?.larger && styles.larger]} source={require('../../Image/kimcuong.png')} />
            <Text style={{
                color: '#F8E6D0',
                fontWeight: 'bold',
                fontSize: 10
            }}>
                {props?.name}
            </Text>
        </TouchableOpacity>
    )
}

export default Certificate

const styles = StyleSheet.create({
    larger: {
        width: 8 * 2,
        height: 8 * 2,
        resizeMode: 'contain',
    }
})