import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _widthScale } from '../../../Constant/Scale'

const Certificate = memo(() => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: '#151617',
                borderRadius: 4,
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <Image style={{
                    width: 8 * 1.5,
                    height: 8 * 1.5,
                    resizeMode: 'contain',
                    marginRight: 4
                }} source={require('../../../Image/kimcuong.png')} />
                <Text style={{
                    color: '#F8E6D0',
                    fontWeight: 'bold',
                    fontSize: 10
                }}>
                    Phòng khám
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: '#414378',
                borderRadius: 4,
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'hidden',
                marginLeft:_moderateScale(8)
            }}>
                <Image style={{
                    width: 8 * 1.5,
                    height: 8 * 1.5,
                    resizeMode: 'contain',
                    marginRight: 4
                }} source={require('../../../Image/kimcuong.png')} />
                <Text style={{
                    color: '#F8E6D0',
                    fontWeight: 'bold',
                    fontSize: 10
                }}>
                    Giấy phép
                </Text>
            </TouchableOpacity>
        </View>
    )
})

export default Certificate

const styles = StyleSheet.create({
    container: {
        width: _widthScale(360),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: _moderateScale(8),
        flexDirection: 'row'
    }
})