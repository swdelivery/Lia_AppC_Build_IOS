import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _width } from '../../../Constant/Scale'
import { getBottomSpace } from 'react-native-iphone-x-helper'

const BottomAction = memo(() => {
    return (
        <View style={styles.container}>
            <View style={{
                width: _width,
                height: _moderateScale(8 * 8),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: _moderateScale(8 * 3),
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <Image style={styles.care} source={require('../../../Image/care.png')} />
                    <Text>
                        Yêu cầu tư vấn
                    </Text>
                </TouchableOpacity>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.bookingBtn}>
                        <Text style={styles.bookingBtn__text}>
                            Đặt Hẹn
                        </Text>
                    </TouchableOpacity>
                    <View style={{width:8*2}}/>

                    <TouchableOpacity style={styles.chatBtn}>
                        <Text style={styles.chatBtn__text}>
                            Trò Chuyện
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
})

export default BottomAction

const styles = StyleSheet.create({
    chatBtn__text:{
        fontSize: _moderateScale(14),
        color: 'white',
        fontWeight: 'bold'
    },
    chatBtn:{
        width: _moderateScale(8 * 13),
        height: _moderateScale(8 * 5),
        borderWidth: 2,
        borderRadius: _moderateScale(8 * 2),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1E463E',
        backgroundColor:'#1E463E'
    },
    bookingBtn__text: {
        fontSize: _moderateScale(14),
        color: '#1E463E',
        fontWeight: 'bold'
    },
    bookingBtn: {
        width: _moderateScale(8 * 13),
        height: _moderateScale(8 * 5),
        borderWidth: 1,
        borderRadius: _moderateScale(8 * 2),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1E463E'
    },
    care: {
        width: _moderateScale(8 * 3),
        height: _moderateScale(8 * 3)
    },
    container: {
        width: _width,
        backgroundColor: 'white',
        paddingBottom: _moderateScale(8 * 3),
        borderTopWidth: .5,
        borderColor: 'rgba(0,0,0,.2)'
    }
})