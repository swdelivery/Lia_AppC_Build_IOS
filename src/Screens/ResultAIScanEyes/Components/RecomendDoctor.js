import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { GREY_FOR_TITLE } from '../../../Constant/Color'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { navigation } from '../../../../rootNavigation'
import { sizeIcon } from '../../../Constant/Icon'
import ScreenKey from '../../../Navigation/ScreenKey'

const RecomendDoctor = () => {
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
                    Đội ngũ bác sĩ sẵn sàng tư vấn miễn phí
                </Text>

                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    {
                        [1, 2, 3]?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={.7}
                                    onPress={() => {
                                        navigation.navigate(ScreenKey.DETAIL_DOCTOR)
                                    }}
                                    style={[styles.card]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <Image
                                                style={{
                                                    width: 8 * 6,
                                                    height: 8 * 6,
                                                    borderRadius: 8 * 6 / 2,
                                                    borderWidth: 0.5
                                                }}
                                                source={{ uri: `https://img2.soyoung.com/tieba/android/shortpost/20220917/6/0815271a9df9b46916123420ac8afcfb.jpg` }}
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
                                                    style={{ fontWeight: '500' }}>
                                                    BS.Pham Thi A
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
                                                    Trang Beauty Center 3/2
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
                                                        Da liễu
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
                                                        Chứng chỉ
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>



                                        </View>


                                    </View>



                                </TouchableOpacity>
                            )
                        })
                    }

                </ScrollView>



            </View>
        </View>
    )
}

export default RecomendDoctor


const styles = StyleSheet.create({
    start: {
        width: 8 * 1.75,
        height: 8 * 1.75,
        marginLeft: 1,
        resizeMode: 'contain'
    },
    card: {
        width: _widthScale(280),
        paddingVertical: 8,
        paddingHorizontal: 8 * 1,
        marginBottom: 8,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: .5,
        borderColor: 'rgba(0,0,0,.3)',
        marginLeft:_moderateScale(8*2)
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