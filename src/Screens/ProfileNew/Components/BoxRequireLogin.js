import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconRightWhite } from '../../../Components/Icon/Icon'
import { _moderateScale } from '../../../Constant/Scale'
import { styleElement } from '../../../Constant/StyleElement'

const BoxRequireLogin = memo(() => {
    return (
        <View style={{
            height: _moderateScale(8 * 22),
            justifyContent: 'flex-end',
            paddingBottom: _moderateScale(8 * 2)
        }}>
            <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2) }]}>
                <View style={{
                    width: _moderateScale(8 * 6),
                    height: _moderateScale(8 * 6),
                    borderRadius: _moderateScale(8 * 3),
                    borderBottomRightRadius: _moderateScale(4),
                    backgroundColor: 'rgba(255,255,255,.7)'
                }}></View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        fontSize: _moderateScale(18),
                        marginHorizontal: _moderateScale(8),
                        fontWeight: 'bold',
                        color: 'white'
                    }}>Đăng Nhập/ Đăng Kí</Text>
                    <IconRightWhite style={{ width: _moderateScale(8 * 3), height: _moderateScale(8 * 3) }} />
                </View>
            </View>
        </View>
    )
})

export default BoxRequireLogin

const styles = StyleSheet.create({})