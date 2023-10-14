import { StyleSheet, Text, View,Image } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _widthScale } from '../../../Constant/Scale'
import CountDownTimer from '../../../Components/CountDownTimer/CountDownTimer'

const FlashSale = memo(() => {
    return (
        <View>
            <View style={styles.flashsale}>
                <Image
                    style={{
                        width: _moderateScale(8 * 15),
                        height: _moderateScale(8 * 5),
                        resizeMode: 'contain',
                        borderRadius: 16
                    }}
                    source={require('../../../Image/flashSaleIcon.png')} />

                <View style={{
                    alignItems: 'flex-end'
                }}>
                    <CountDownTimer />
                    <Text style={styles.flashsale__text}>
                        Reference site about
                    </Text>
                </View>
            </View>

            <View style={styles.priceFlashSale}>
                <View style={styles.priceFlashSale__filnalPrice}>
                    <Text style={{
                        fontSize: _moderateScale(14),
                        color: 'red',
                        fontWeight: 'bold'
                    }}>
                        Giá cuối
                    </Text>
                    <View style={{ width: 4 }} />
                    <Text style={{
                        fontSize: _moderateScale(20),
                        color: 'red',
                        fontWeight: 'bold'
                    }}>
                        1.900K
                    </Text>
                </View>

                <View style={{ width: 16 }} />
                <View style={styles.priceFlashSale__filnalPrice}>
                    <Text style={{
                        fontSize: _moderateScale(20),
                        color: 'red',
                        fontWeight: 'bold'
                    }}>
                        =
                    </Text>
                </View>
                <View style={{ width: 16 }} />


                <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: _moderateScale(14),
                        color: 'red',
                        fontWeight: 'bold',
                    }}>
                        Giá gốc
                    </Text>
                    <View style={{ width: 4 }} />
                    <Text style={{
                        fontSize: _moderateScale(20),
                        color: 'red',
                        fontWeight: '500'
                    }}>
                        3.900K
                    </Text>
                </View>
                <View style={{ width: 16 }} />

                <View style={styles.priceFlashSale__filnalPrice}>
                    <Text style={{
                        fontSize: _moderateScale(20),
                        color: 'red',
                        fontWeight: '500'
                    }}>
                        -
                    </Text>
                </View>
                <View style={{ width: 16 }} />

                <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: _moderateScale(14),
                        color: 'red',
                        fontWeight: '500',
                    }}>
                        FlashSale
                    </Text>
                    <View style={{ width: 4 }} />
                    <Text style={{
                        fontSize: _moderateScale(20),
                        color: 'red',
                        fontWeight: '500'
                    }}>
                        2.000K
                    </Text>
                </View>

            </View>
        </View>
    )
})

export default FlashSale

const styles = StyleSheet.create({
    priceFlashSale__filnalPrice: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    priceFlashSale: {
        width: _widthScale(360),
        height: _moderateScale(8 * 8),
        alignSelf: 'center',
        marginTop: _moderateScale(8 * 1),
        backgroundColor: 'white',
        borderRadius: _moderateScale(8),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    flashsale__text: {
        fontSize: _moderateScale(16)
    },
    flashsale: {
        flexDirection: 'row',
        marginTop: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        justifyContent: 'space-between'
    },
})