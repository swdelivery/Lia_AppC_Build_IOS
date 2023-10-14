import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import LinearGradient from 'react-native-linear-gradient'
import { GREY_FOR_TITLE } from '../../../Constant/Color'

const RightEye = () => {
    return (
        <View>
            <View style={{
                marginTop: _moderateScale(8 * 2),
                paddingHorizontal: _moderateScale(8 * 2),
                flexDirection: 'row'
            }}>
                
                <View style={{ alignItems: 'flex-start', flex: 1 }}>
                    <Text style={{
                        fontSize: _moderateScale(22),
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        [ Mắt 2 Mí ]
                    </Text>
                    <Text style={{
                        fontSize: _moderateScale(14),
                        color: 'white',
                        fontWeight: '500'
                    }}>
                        98% trùng khớp kết quả
                    </Text>
                    <View style={{ height: _moderateScale(0) }} />

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: _moderateScale(8)
                        }}>
                            <View style={styles.dot} />
                            <Text style={{ fontSize: _moderateScale(14), color: '#28A745', fontWeight: '500' }}>Mắt ít mỡ</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: _moderateScale(8)
                        }}>
                            <View style={styles.dot} />
                            <Text style={{ fontSize: _moderateScale(14), color: '#28A745', fontWeight: '500' }}>Khoé mắt không hẹp</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: _moderateScale(8)
                        }}>
                            <View style={[styles.dot, { backgroundColor: 'red' }]} />
                            <Text style={{ fontSize: _moderateScale(14), color: 'red', fontWeight: '500' }}>Khung xương cụp</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: _moderateScale(8)
                        }}>
                            <View style={[styles.dot, { backgroundColor: 'red' }]} />
                            <Text style={{ fontSize: _moderateScale(14), color: 'red', fontWeight: '500' }}>Hốc mắt sâu</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: _moderateScale(8 * 2) }} />


                <View style={styles.overView__box__leftEye}>
                    <Image
                        style={{
                            width: _moderateScale(8 * 14),
                            height: _moderateScale(8 * 14),
                            borderRadius: _moderateScale(8 * 2)
                        }}
                        source={{ uri: `https://i.ibb.co/LvCZbK1/Kho-ng-co-tie-u-e.png` }} />
                </View>

            </View>

            <View style={{
                marginRight: _moderateScale(8 * 2),
                marginTop: _moderateScale(8 * 2),
                alignItems: 'flex-end',

            }}>
                <Text style={{ color: GREY_FOR_TITLE, fontWeight: 'bold' }}>
                    Hoàn tất quá trình quét mắt phải
                </Text>

                <View style={{
                    marginTop: _moderateScale(4),
                    paddingHorizontal: _moderateScale(8 * 2),
                    paddingVertical: _moderateScale(4),
                    // borderWidth: .5,
                    borderColor: 'rgba(0,0,0,.4)',
                    borderRadius: _moderateScale(8 * 4),
                    backgroundColor: 'white'
                }}>
                    <Text style={{ color: 'black', fontWeight: '500' }}>
                        ! Có 2 vấn đề bạn cần lưu ý
                    </Text>
                </View>

            </View>

            <View style={{
                width: _widthScale(320),
                // height: _moderateScale(8 * 20),
                alignSelf: 'center',
                marginTop: _moderateScale(8 * 2),
                backgroundColor: 'white',
                borderRadius: _moderateScale(8),
            }}>
                <View style={{
                    width: _moderateScale(8 * 2),
                    height: _moderateScale(8 * 2),
                    backgroundColor: 'white',
                    position: 'absolute',
                    right: _moderateScale(8 * 4),
                    top: -_moderateScale(6),
                    zIndex: -1,
                    transform: [
                        { rotate: '45deg' }
                    ]
                }} />

                <View style={{ paddingHorizontal: _moderateScale(8 * 1.5) }}>
                    <View style={{
                        width: '100%',
                        height: _moderateScale(8 * 8),
                        flexDirection: 'row',
                        marginVertical: _moderateScale(8 * 1.5)
                    }}>
                        <Image
                            style={{
                                width: _moderateScale(8 * 8),
                                height: _moderateScale(8 * 8),
                                borderRadius: _moderateScale(8)
                            }}
                            source={{ uri: `https://i.ibb.co/1Mz03Xt/1.png` }} />
                        <View style={{ flex: 1, paddingLeft: _moderateScale(8) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        fontSize: _moderateScale(14),
                                        fontWeight: '500',
                                        color: '#38484F'
                                    }}>
                                        Khung xương cụp
                                    </Text>
                                </View>

                                <TouchableOpacity>
                                    <Text style={{
                                        color: '#65B4C9'
                                    }}>
                                        {`Chi tiết >`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text
                                numberOfLines={3}
                                style={{
                                    fontSize: _moderateScale(12),
                                    marginTop: _moderateScale(2)
                                }}>
                                Khung xương cụp (mắt dấu huyền) là đôi mắt có phần đuôi rũ xuống, da đuôi nhăn nheo che khuất mi dưới và một phần con ngươi.
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: .5, backgroundColor: 'rgba(0,0,0,.1)' }} />

                    <View style={{
                        width: '100%',
                        height: _moderateScale(8 * 8),
                        flexDirection: 'row',
                        marginTop: _moderateScale(8 * 1),
                        marginVertical: _moderateScale(8 * 1.5)
                    }}>
                        <Image
                            style={{
                                width: _moderateScale(8 * 8),
                                height: _moderateScale(8 * 8),
                                borderRadius: _moderateScale(8)
                            }}
                            source={{ uri: `https://i.ibb.co/59NtgXh/2.png` }} />
                        <View style={{ flex: 1, paddingLeft: _moderateScale(8) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        fontSize: _moderateScale(14),
                                        fontWeight: '500',
                                        color: '#38484F'
                                    }}>
                                        Hốc mắt sâu
                                    </Text>
                                </View>

                                <TouchableOpacity>
                                    <Text style={{
                                        color: '#65B4C9'
                                    }}>
                                        {`Chi tiết >`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text
                                numberOfLines={3}
                                style={{
                                    fontSize: _moderateScale(12),
                                    marginTop: _moderateScale(2)
                                }}>
                                Hốc mắt sâu là tình trạng mắt bị lõm sâu vào trong nhiều hơn so với bình thường.Hốc mắt lõm sâu khiến gương mặt trở nên mệt mỏi, già nua, t
                            </Text>
                        </View>
                    </View>

                </View>

            </View>
        </View>
    )
}

export default RightEye

const styles = StyleSheet.create({
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
        borderWidth: 1,
        paddingTop: _moderateScale(8 * 10),
        paddingBottom: _moderateScale(8 * 2)
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})