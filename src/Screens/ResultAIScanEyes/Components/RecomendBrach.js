import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { GREY_FOR_TITLE } from '../../../Constant/Color'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { navigation } from '../../../../rootNavigation'
import { sizeIcon } from '../../../Constant/Icon'
import ScreenKey from '../../../Navigation/ScreenKey'

const RecomendBrach = () => {
    return (
        <View style={{ paddingHorizontal: _moderateScale(4), marginTop: _moderateScale(4) }}>
            <View style={{ width: '100%', borderTopStartRadius: _moderateScale(8), borderTopEndRadius: _moderateScale(8) }}>
                <LinearGradient
                    style={[StyleSheet.absoluteFill, { zIndex: -1, borderTopStartRadius: _moderateScale(8), borderTopEndRadius: _moderateScale(8) }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={["#C4E5FC", "white"]}
                />
                <Text style={{
                    fontSize: _moderateScale(14),
                    margin: _moderateScale(8 * 2),
                    marginBottom: _moderateScale(8),
                    color: GREY_FOR_TITLE,
                    fontWeight: 'bold'
                }}>
                    Các phòng khám uy tín hàng đầu
                </Text>

                <View style={{alignItems:'center'}}>
                    {
                        [1, 2, 3, 4, 5]?.map((item, index) => {
                            return (
                                <View style={[styles.card, shadow]}>
                                    {/* <LinearGradient
                                    style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    locations={[0, 0.8]}
                                    colors={['#EE79B8', 'white',]}
                                /> */}
                                    <TouchableOpacity
                                        activeOpacity={.6}
                                        onPress={() => {
                                            // navigation.navigate(ScreenKey.DETAIL_BRANCH)
                                        }}
                                        style={{ flexDirection: 'row' }}>
                                        <View>
                                            <Image
                                                style={{
                                                    width: 8 * 6,
                                                    height: 8 * 6,
                                                    borderRadius: 8 * 6 / 2,
                                                    borderWidth: 0.5
                                                }}
                                                source={{ uri: `https://img2.soyoung.com/product/20230502/2/d295215cb6b7bbfcf6b56e040512ea36_400_300.png?imageView2/0/format/webp` }}
                                            />
                                        </View>
                                        <View style={{ width: 8 }} />
                                        <View style={{ flex: 1, }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>
                                                <Text
                                                    numberOfLines={1}
                                                    style={styles.title}>
                                                    Trang Beauty Center Ba Tháng Hai
                                                </Text>

                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        backgroundColor: "#4BA888",
                                                        paddingHorizontal: 8,
                                                        paddingVertical: 2,
                                                        borderRadius: 8 * 2
                                                    }}
                                                >
                                                    {/* <Image 
                                                style={{
                                                    width:8*2,
                                                    height:8*2,
                                                    resizeMode:'contain'
                                                }}
                                                source={require('../../Image/chatBase2.png')}/> */}
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            color: 'white',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        Tư vấn
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
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
                                                <View style={{ width: 8 }} />
                                                <Text>|</Text>
                                                <View style={{ width: 8 }} />
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

                                            <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                                <Image style={{
                                                    width: 8 * 2,
                                                    height: 8 * 2,
                                                    resizeMode: 'contain'
                                                }} source={require('../../../Image/locationRed.png')} />
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: 'grey'
                                                }}>
                                                    294 Đường 3/2 Phường 12 Quận 10 TPHCM
                                                </Text>
                                            </View>

                                            <View style={{
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                marginTop: 8
                                            }}>
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
                                                <View style={{ width: 4 }} />

                                                <TouchableOpacity style={{
                                                    paddingHorizontal: 8,
                                                    paddingVertical: 4,
                                                    backgroundColor: '#414378',
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
                                                        Giấy phép
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>



                                        </View>


                                    </TouchableOpacity>

                                    <View style={{ marginTop: 8 * 2 }}>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                            {
                                                [1, 2, 3, 4, 5]?.map((item, index) => {
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
                                                                        <Image style={styles.start2} source={require('../../../Image/a_star2.png')} />
                                                                        <Image style={styles.start2} source={require('../../../Image/a_star2.png')} />
                                                                        <Image style={styles.start2} source={require('../../../Image/a_star2.png')} />
                                                                        <Image style={styles.start2} source={require('../../../Image/a_star2.png')} />
                                                                        <Image style={styles.start2} source={require('../../../Image/a_star2.png')} />
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

                                </View>
                            )
                        })
                    }
                </View>




            </View>
        </View>
    )
}

export default RecomendBrach


const styles = StyleSheet.create({
    start: {
        width: 8 * 1.75,
        height: 8 * 1.75,
        marginLeft: 1,
        resizeMode: 'contain'
    },
    start2: {
        width: 8 * 1,
        height: 8 * 1,
        marginLeft: 1,
        resizeMode: 'contain'
    },
    card: {
        width: _width - 8 * 2,
        paddingVertical: 8,
        paddingHorizontal: 8 * 1,
        marginBottom: 8,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    dot: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        backgroundColor: '#28A745',
        marginRight: _moderateScale(4)
    },
    overView__box__leftEye: {
        width: _moderateScale(8 * 14),
        height: _moderateScale(8 * 14),
        borderRadius: _moderateScale(8 * 2)
    },
    overView__box: {
        width: _widthScale(350),
        // height: _moderateScale(8 * 40),
        // borderWidth:1,
        alignSelf: 'center',
        // bottom: _moderateScale(8 * 3),
        // position: 'absolute',
        backgroundColor: 'rgba(255,255,255,.3)',
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 2)
    },
    overView: {
        width: _width,
        // height: _moderateScale(8 * 60),
        paddingTop: _moderateScale(8 * 10),
        paddingBottom: _moderateScale(8 * 2)
    },
    container: {
        flex: 1,
        backgroundColor: '#F4F9FD'
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}
