import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import CountStar2 from '../../../Components/NewCountStar/CountStar'
import Certificate from '../../../Components/Certificate/Certificate'

const Banner = (props) => {
    return (
        <View
            onLayout={(e) => {
                console.log({ ...e });
                props?.setHeightBanner(e?.nativeEvent?.layout?.height)
            }}
            style={[styles.banner, shadow]}>
            <Image
                style={styles.avatar}
                source={{
                    uri: `https://api.trangbeautycenter.com/public/treatmentDoctor/1665116656736dBPk.png`
                }} />

            <View style={{
                height: _moderateScale(8 * 5.5)
            }} />
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.banner__name__doctor}>
                    B.S Vũ Thị Nga
                </Text>
                <CountStar2 />
                <View style={{
                    height: _moderateScale(4)
                }} />
                <Text>
                    Bác sĩ trưởng <Text style={{ color: 'grey' }}>|</Text> 10 năm KN
                </Text>

                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 8
                }}>
                    <Certificate name={"Da liễu"} bg={"black"} />
                    <View style={{ width: 4 }} />
                    <Certificate name={"Chứng chỉ"} />
                    <View style={{ width: 4 }} />
                    <Certificate bg={'blue'} name={"Kinh nghiệm"} />
                </View>

                <View style={{ height: _moderateScale(8 * 1) }} />
                <View style={styles.infoHorizon}>
                    <View style={styles.infoHorizon__box}>
                        <Text style={styles.infoHorizon__box__textUp}>
                            195
                        </Text>
                        <Text style={styles.infoHorizon__box__textDown}>
                            ABC
                        </Text>
                    </View>
                    <View style={styles.infoHorizon__box}>
                        <Text style={styles.infoHorizon__box__textUp}>
                            757
                        </Text>
                        <Text style={styles.infoHorizon__box__textDown}>
                            Lượt đánh giá
                        </Text>
                    </View>
                    <View style={styles.infoHorizon__box}>
                        <Text style={styles.infoHorizon__box__textUp}>
                            195
                        </Text>
                        <Text style={styles.infoHorizon__box__textDown}>
                            Lần điều trị
                        </Text>
                    </View>

                </View>
                <View style={{ height: 8 }} />

                <View style={{ width: '100%', paddingRight:_moderateScale(8), alignItems: 'flex-start' }}>
                    <View style={[styles.box__child,{marginLeft:_moderateScale(8*2)}]}>
                        <Image style={styles.iconLike} source={require('../../../Image/like.png')} />
                        <View style={{ width: 4 }} />
                        <Text style={{ fontSize: _moderateScale(14), fontWeight: '500' }}>
                            Chuyên dự án: Da liễu
                        </Text>
                    </View>

                    <View style={{ height: 8 }} />
                    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft:_moderateScale(8*2)}} horizontal>
                        {
                            [1, 2, 3, 4, 5]?.map((item, index) => {
                                return(
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
                                                    <Image style={{ width: 8 * 1.25,height: 8 * 1.25,marginLeft: 1,resizeMode: 'contain'}} source={require('../../../Image/a_star2.png')} />
                                                    <Image style={{ width: 8 * 1.25,height: 8 * 1.25,marginLeft: 1,resizeMode: 'contain'}} source={require('../../../Image/a_star2.png')} />
                                                    <Image style={{ width: 8 * 1.25,height: 8 * 1.25,marginLeft: 1,resizeMode: 'contain'}} source={require('../../../Image/a_star2.png')} />
                                                    <Image style={{ width: 8 * 1.25,height: 8 * 1.25,marginLeft: 1,resizeMode: 'contain'}} source={require('../../../Image/a_star2.png')} />
                                                    <Image style={{ width: 8 * 1.25,height: 8 * 1.25,marginLeft: 1,resizeMode: 'contain'}} source={require('../../../Image/a_star2.png')} />
                                                   
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
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>

                <View style={styles.box}>

                    <View style={{ height: 4 }} />
                    <View style={styles.box__child}>
                        <Image style={styles.iconLike} source={require('../../../Image/diamon.png')} />
                        <View style={{ width: 4 }} />
                        <Text style={{ fontSize: _moderateScale(14), fontWeight: '500' }}>
                            Danh sách Nhật ký nổi bật 2023
                        </Text>
                    </View>

                </View>



            </View>
            <View style={{ marginTop: _moderateScale(8 * 1), paddingRight: _moderateScale(8) }}>
                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: _moderateScale(8 * 2) }} horizontal>
                    {
                        [1, 2, 3, 4]?.map((item, index) => {
                            return (
                                <View style={[styles.box__diary]}>
                                    <View style={{
                                        flexDirection: 'row',
                                        margin: _moderateScale(8)
                                    }}>
                                        <Image
                                            style={styles.avatar__customer}
                                            source={{
                                                uri: `https://i.ibb.co/7jbTH44/A-nh-ma-n-hi-nh-2023-09-26-lu-c-14-36-22.png`
                                            }} />
                                        <View style={{ flex: 1 }}>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.customer__name}>
                                                Trần Thị Thu
                                            </Text>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.customer__updateTime}>
                                                Cập nhật <Text>2 Ngày trước</Text>
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.box__diary__name}>
                                        <View style={styles.verticalLine} />
                                        <Text style={styles.box__diary__nameService}>
                                            Cắt mí T-2022
                                        </Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: _moderateScale(8)
                                    }}>
                                        <View style={styles.box__diary__image}>
                                            <View style={styles.absoluteText}>
                                                <Text style={{
                                                    fontSize: _moderateScale(12),
                                                    color: 'white',
                                                    fontWeight: '500'
                                                }}>
                                                    Trước
                                                </Text>
                                            </View>
                                            <Image
                                                style={styles.box__diary__image}
                                                source={{
                                                    uri: `https://i.ibb.co/mHZWXF6/IMG-3225.jpg`
                                                }} />
                                        </View>
                                        <View style={styles.box__diary__image}>
                                            <View style={styles.absoluteText}>
                                                <Text style={{
                                                    fontSize: _moderateScale(12),
                                                    color: 'white',
                                                    fontWeight: '500'
                                                }}>
                                                    Sau
                                                </Text>
                                            </View>
                                            <Image
                                                style={styles.box__diary__image}
                                                source={{
                                                    uri: `https://i.ibb.co/8mbV6QR/IMG-3226.jpg`
                                                }} />
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
}

export default Banner

const styles = StyleSheet.create({
    box__diary__name: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: _moderateScale(8),
        marginBottom: _moderateScale(8)
    },
    box__diary__nameService: {
        fontSize: _moderateScale(14),
        fontWeight: '500'
    },
    verticalLine: {
        width: _moderateScale(2),
        height: _moderateScale(8 * 3),
        backgroundColor: 'red',
        marginRight: _moderateScale(4)
    },
    absoluteText: {
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(4),
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'absolute',
        left: 0,
        zIndex: 1,
        bottom: 0,
        borderTopRightRadius: _moderateScale(8)
    },
    box__diary__image: {
        width: _moderateScale(8 * 11.5),
        height: _moderateScale(8 * 11.5),
        borderRadius: _moderateScale(8),
        overflow: 'hidden'
    },
    box__diary: {
        width: _moderateScale(8 * 26),
        // height: _moderateScale(8 * 15),
        marginRight: _moderateScale(8),
        borderRadius: _moderateScale(8),
        backgroundColor: 'white',
        borderWidth: .5,
        borderColor: 'rgba(0,0,0,.2)',
        paddingBottom: _moderateScale(8)
    },
    customer__updateTime: {
        fontSize: _moderateScale(12),
        flex: 1,
        marginLeft: _moderateScale(4),
        color: 'grey'
    },
    customer__name: {
        fontSize: _moderateScale(14),
        flex: 1,
        marginLeft: _moderateScale(4),
        fontWeight: '500'
    },
    avatar__customer: {
        width: _moderateScale(8 * 4),
        height: _moderateScale(8 * 4),
        borderRadius: _moderateScale(8 * 4 / 2)
    },
    iconLike: {
        width: _moderateScale(8 * 2.5),
        height: _moderateScale(8 * 2.5),
        resizeMode: 'cover'
    },
    box__child: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    box: {
        width: _widthScale(320),
        marginTop:_moderateScale(8)
        // height: 100,
    },
    infoHorizon__box__textDown: {
        fontSize: _moderateScale(12),
    },
    infoHorizon__box__textUp: {
        fontSize: _moderateScale(15),
        fontWeight: '500'
    },
    infoHorizon__box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoHorizon: {
        width: _widthScale(300),
        minHeight: 50,
        flexDirection: 'row'
    },
    banner__name__doctor: {
        fontSize: _moderateScale(14),
        fontWeight: 'bold'
    },
    avatar: {
        width: _moderateScale(8 * 9),
        height: _moderateScale(8 * 9),
        borderRadius: _moderateScale(8 * 9) / 2,
        borderBottomRightRadius: 0,
        alignSelf: 'center',
        top: -_moderateScale(8 * 9) / 2,
        position: 'absolute'
    },
    banner: {
        width: _widthScale(360),
        // height: _moderateScale(8 * 30),
        alignSelf: 'center',
        top: -_moderateScale(8 * 20) / 1.5,
        backgroundColor: 'white',
        borderRadius: _moderateScale(8 * 3),
        paddingBottom: _moderateScale(8 * 2),
        position: 'absolute',
        zIndex: 10
    }
})

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,

    elevation: 3
}
