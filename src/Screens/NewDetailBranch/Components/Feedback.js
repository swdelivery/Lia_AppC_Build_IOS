import React, { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { _moderateScale, _widthScale } from '../../../Constant/Scale'

const Feedback = memo(() => {
    return (
        <View style={styles.container}>
            <Text style={styles.feedBackText}>
                Đánh giá của khách hàng
            </Text>

            <View style={{ height: _moderateScale(8 * 0) }} />
            {
                [1,2,3]?.map((item, index) => {
                    return (
                        <View key={index} style={{ marginTop: _moderateScale(8*3) }}>
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
                            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Text>
                            
                            <View style={{height:_moderateScale(8)}}/>
                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-evenly'
                            }}>
                                <Image
                                style={{
                                    width:_moderateScale(8*14),
                                    height:_moderateScale(8*14),
                                    borderRadius:_moderateScale(4)
                                }}
                                source={{uri:`https://lh5.googleusercontent.com/p/AF1QipOfRhhKmvxdkD0JApAQcye0Bt1FvYG4s4UiHVHU`}}/>
                                <Image
                                style={{
                                    width:_moderateScale(8*14),
                                    height:_moderateScale(8*14),
                                    borderRadius:_moderateScale(4)
                                }}
                                source={{uri:`https://cfw.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibGlhYmVhdXR5LnZuIiwidiI6OTczNjIwMDQ3LCJpIjoiY2Q1NTI4ZTEtMGY5NS00YmY2LTgwY2YtMTYyZjEwZGE4ZDAwIn0/wp-content/uploads/2022/07/LiA-Beauty-2-768x614.jpg`}}/>
                                <Image
                                style={{
                                    width:_moderateScale(8*14),
                                    height:_moderateScale(8*14),
                                    borderRadius:_moderateScale(4)
                                }}
                                source={{uri:`https://liabeauty.vn/wp-content/uploads/2023/06/2022-07-08.jpg`}}/>

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
        width: _widthScale(360),
        minHeight: 200,
        borderRadius: _moderateScale(8),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: _moderateScale(8),
        padding: _moderateScale(8 * 2)
    }
})