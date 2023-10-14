import React, { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { _heightScale, _widthScale } from '../../../Constant/Scale'

const OptionService = memo(() => {
    return (
        <View style={{
            width: _widthScale(350),
            height: _widthScale(130),
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 8,
            justifyContent: 'center',
        }}>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item, index) => {
                        return (
                            <View style={{
                                alignItems: 'center',
                                width: _widthScale(65)
                            }}>
                                <View style={styles.item__option} >
                                    <Image style={{
                                        width: '100%',
                                        height: '100%'
                                    }} source={require('../../../Image/iconOption.png')} />
                                </View>
                                <Text>Item</Text>
                            </View>
                        )
                    })
                }

            </View>

        </View>
    )
})

const styles = StyleSheet.create({
    item__option: {
        width: _widthScale(8 * 5),
        height: _widthScale(8 * 5),
        borderRadius: _widthScale(8 * 5 / 2),
    },
})


export default OptionService
