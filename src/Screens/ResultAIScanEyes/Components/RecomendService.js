import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { GREY_FOR_TITLE } from '../../../Constant/Color'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const RecomendService = () => {
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
                    Giải pháp làm đẹp mắt
                </Text>

                <View style={{ paddingHorizontal: _moderateScale(8 * 1), flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {
                        [1, 2, 3, 4, 5, 6]?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate(ScreenKey.DETAIL_SERVICE)
                                }}
                                style={{ margin: _moderateScale(0), marginBottom: _moderateScale(8), }}>
                                    <View style={{
                                        width: _moderateScale(8 * 10),
                                        height: _moderateScale(8 * 5),
                                        // borderWidth:1,
                                        position: 'absolute',
                                        zIndex: 1,
                                        top: _moderateScale(8 * 1.5),
                                        left: _moderateScale(8 * 1.2),
                                        backgroundColor: '#FFFFFF'
                                    }}>
                                        <Text style={{
                                            fontSize: _moderateScale(10),
                                            fontWeight: 'bold',
                                            color: GREY_FOR_TITLE
                                        }}>
                                            Cắt Mí T-2022
                                        </Text>
                                        <Text style={{
                                            fontSize: _moderateScale(10),
                                            color: 'grey'
                                        }}>
                                            Giải pháp cho mắt 1 mí
                                        </Text>
                                    </View>
                                    <Image style={{
                                        width: _moderateScale(8 * 15),
                                        height: _moderateScale(8 * 9),
                                        resizeMode: 'contain',
                                        borderWidth: .2,
                                        borderRadius: _moderateScale(8)
                                    }} source={{ uri: `https://i.ibb.co/LSpHFRx/4.png` }} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

            </View>
        </View>
    )
}

export default RecomendService


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
        paddingTop: _moderateScale(8 * 10),
        paddingBottom: _moderateScale(8 * 2)
    },
    container: {
        flex: 1,
        backgroundColor: '#F4F9FD'
    }
})