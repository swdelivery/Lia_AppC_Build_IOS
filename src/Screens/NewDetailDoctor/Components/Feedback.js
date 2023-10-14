import { StyleSheet, Text, View, Image } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'

const Feedback = memo(() => {
    return (
        <View style={styles.container}>
            <Text style={styles.feedBackText}>
                Đánh giá từ khách hàng
            </Text>

            <View style={{ height: _moderateScale(8 * 0) }} />
            {
                [1, 2,3]?.map((item, index) => {
                    return (
                        <View key={index} style={{ marginTop: _moderateScale(8 * 3) }}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Image
                                    style={styles.avatar}
                                    source={{
                                        uri: `https://i.ibb.co/7jbTH44/A-nh-ma-n-hi-nh-2023-09-26-lu-c-14-36-22.png`
                                    }} />
                                <View style={{ width: _moderateScale(8) }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.name}>
                                        Nguyễn Thị Thu Thảo
                                    </Text>

                                    <View style={{ height: 4 }} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                                        <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                                        <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                                        <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                                        <Image style={styles.start} source={require('../../../Image/a_star2.png')} />
                                    </View>
                                </View>
                                <Image
                                    style={{
                                        width: _moderateScale(8 * 6),
                                        height: _moderateScale(8 * 6)
                                    }}
                                    source={require('../../../Image/quality.jpeg')} />

                            </View>

                            <View style={styles.box__diary__name}>
                                <View style={styles.verticalLine} />
                                <Text style={styles.box__diary__nameService}>
                                    Cắt mí T-2022
                                </Text>
                            </View>

                            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Text>

                            <View style={{ height: _moderateScale(8) }} />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly'
                            }}>
                                <Image
                                    style={{
                                        width: _moderateScale(8 * 14),
                                        height: _moderateScale(8 * 14),
                                        borderRadius: _moderateScale(4)
                                    }}
                                    source={{ uri: `https://img2.soyoung.com/tieba/android/post/20230212/9/eadee71a901aa7439248fc4836d65901_640_853.jpg` }} />
                                <Image
                                    style={{
                                        width: _moderateScale(8 * 14),
                                        height: _moderateScale(8 * 14),
                                        borderRadius: _moderateScale(4)
                                    }}
                                    source={{ uri: `https://img2.soyoung.com/tieba/android/post/20230212/9/21e5112cff03d60fe055ba1783fe870a_640_853.jpg` }} />
                                <Image
                                    style={{
                                        width: _moderateScale(8 * 14),
                                        height: _moderateScale(8 * 14),
                                        borderRadius: _moderateScale(4)
                                    }}
                                    source={{ uri: `https://img2.soyoung.com/tieba/android/post/20230212/7/e762fb62c05e0262e000797fb8768ffd_640_853.jpg` }} />

                            </View>
                        </View>
                    )
                })
            }

        </View>
    )
})

export default Feedback

const styles = StyleSheet.create({
    box__diary__name: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingLeft: _moderateScale(8),
        marginBottom: _moderateScale(8),
    },
    box__diary__nameService: {
        fontSize: _moderateScale(12),
        fontWeight: 'bold',
    },
    verticalLine: {
        width: _moderateScale(2),
        height: _moderateScale(8 * 3),
        backgroundColor: 'red',
        marginRight: _moderateScale(4)
    },
    name: {
        fontSize: _moderateScale(14),
        fontWeight: '500'
    },
    start: {
        width: 8 * 1.75,
        height: 8 * 1.75,
        marginLeft: 1,
        resizeMode: 'contain'
    },
    avatar: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 5 / 2)
    },
    feedBackText: {
        fontSize: _moderateScale(14),
        fontWeight: 'bold'
    },
    container: {
        width: _width,
        minHeight: 200,
        borderRadius: _moderateScale(8),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: _moderateScale(8),
        padding: _moderateScale(8 * 2)
    }
})