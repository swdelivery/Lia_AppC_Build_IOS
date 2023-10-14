import { StyleSheet, Text, View, Image } from 'react-native'
import React, { memo } from 'react'
import { _width } from '../../../Constant/Scale'

const ListBottonService = memo(() => {
    return (
        <View>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9,1,2,3,4,5]?.map((item, index) => {
                        return (
                            <View style={styles.card}>
                                <View style={{
                                    width: '90%',
                                    height: 180,
                                    backgroundColor: 'white',
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8,
                                }}>
                                    <View>
                                        <Image
                                            style={{
                                                width: '100%',
                                                height: 120,
                                                borderTopLeftRadius: 8,
                                                borderTopRightRadius: 8
                                            }}
                                            source={{ uri: `https://img2.soyoung.com/product/20230204/6/4c37c3bc52acc601968d58619dbb4336_400_300.jpg` }} />
                                    </View>
                                    <View style={{
                                        padding: 4
                                    }}>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: 'bold'
                                        }}>Loại bỏ bọng mắt Pinhole</Text>

                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                {/* <Image style={styles.start} source={require('../../../Image/locationRed.png')}/> */}
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

                                        <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        fontWeight: 'bold',
                                                        color: 'red',
                                                        textDecorationLine: 'underline'
                                                    }}
                                                >
                                                    đ
                                                </Text>
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}>
                                                    12.000.000
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Image style={styles.start} source={require('../../../Image/people.png')} />
                                                <Text style={{
                                                    fontSize: 10,
                                                    marginLeft: 4
                                                }}>
                                                    (157)
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
})

export default ListBottonService

const styles = StyleSheet.create({
    start: {
        width: 8 * 1.25,
        height: 8 * 1.25,
        marginLeft: 1,
        resizeMode: 'contain'
    },
    card: {
        width: _width / 2,
        height: _width / 2.25,
        alignItems: 'center',
    },
})