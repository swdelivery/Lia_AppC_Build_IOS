import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'

const RecomendService = memo(() => {
    return (
        <View style={styles.container}>
            <Text style={styles.rcmService}>
                Có thể bạn sẽ quan tâm
            </Text>

            <View style={{ height: 16 }} />
            <ScrollView horizontal>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item, index) => {
                        return (
                            <View key={index} style={{
                                width: 100,
                                // height: 180,
                                backgroundColor: 'white',
                                borderBottomLeftRadius: 8,
                                borderBottomRightRadius: 8,
                                marginRight: 8 * 1
                            }}>
                                <View>
                                    <Image
                                        style={{
                                            width: 100,
                                            height: 75,
                                            borderTopLeftRadius: 8,
                                            borderTopRightRadius: 8
                                        }}
                                        source={{ uri: `https://img2.soyoung.com/product/20230204/6/4c37c3bc52acc601968d58619dbb4336_400_300.jpg` }} />
                                </View>
                                <View style={{
                                    padding: 4
                                }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 'bold'
                                        }}>Loại bỏ bọng mắt Pinhole</Text>

                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                                            <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                                            <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                                            <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                                            <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                                            <Text style={{
                                                fontSize: 10,
                                                marginLeft: 4
                                            }}>
                                                (320)
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text
                                                style={{
                                                    fontSize: 11,
                                                    fontWeight: 'bold',
                                                    color: 'red',
                                                    textDecorationLine: 'underline'
                                                }}
                                            >
                                                đ
                                            </Text>
                                            <Text style={{
                                                fontSize: 10,
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}>
                                                12.000.000
                                            </Text>
                                        </View>

                                        {/* <View style={{ flexDirection: 'row' }}>
                                                        <Image style={styles.start} source={require('../../Image/people.png')} />
                                                        <Text style={{
                                                            fontSize: 10,
                                                            marginLeft: 4
                                                        }}>
                                                            (157)
                                                        </Text>
                                                    </View> */}
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>

        </View>
    )
})

export default RecomendService

const styles = StyleSheet.create({
    start: {
        width: 8 * 1.25,
        height: 8 * 1.25,
        marginLeft: 1,
        resizeMode: 'contain'
    },
    rcmService: {
        fontSize: _moderateScale(14),
        fontWeight: 'bold'
    },
    container: {
        width: _widthScale(360),
        minHeight: 200,
        borderRadius: _moderateScale(8),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: _moderateScale(8),
        padding: _moderateScale(8 * 2)
    }
})