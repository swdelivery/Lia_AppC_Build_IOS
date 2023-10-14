import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _widthScale } from '../../../Constant/Scale'

const Tutorial = memo(() => {
    return (
        <View style={styles.container}>
            <Text style={styles.tutorial}>
                Hướng dẫn
            </Text>

            {
                [1, 2]?.map((item, index) => {
                    return (
                        <View key={index} style={styles.card}>
                            <View style={{ flex: 1 }}>
                                <Text style={{
                                    fontSize: _moderateScale(14),
                                    fontWeight: '500'
                                }} numberOfLines={1}>
                                    Lorem Ipsum is simply dummy
                                </Text>
                                <Text
                                    style={{
                                        fontSize: _moderateScale(14),
                                        color: 'grey'
                                    }}
                                    numberOfLines={1}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry
                                </Text>
                            </View>

                            <View style={{ width: _moderateScale(24) }} />
                            <Image
                                style={styles.card__video}
                                source={{
                                    uri: 'https://img2.soyoung.com/tieba/android/post/20210521/1/31ba7d797c6b225bad44ca290d83ffac_640_853.jpg'
                                }} />
                        </View>
                    )
                })
            }

        </View>
    )
})

export default Tutorial

const styles = StyleSheet.create({
    card__video: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 6),
        borderRadius: 8
    },
    card: {
        flexDirection: 'row',
        marginTop: _moderateScale(8*2)
    },
    tutorial: {
        fontSize: _moderateScale(14),
        fontWeight: 'bold'
    },
    container: {
        width: _widthScale(360),
        minHeight: 200,
        alignSelf: 'center',
        marginTop: _moderateScale(8),
        borderRadius: _moderateScale(8),
        backgroundColor: 'white',
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 2)
    }
})