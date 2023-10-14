import React, { memo } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { _widthScale } from '../../../Constant/Scale'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const Voucher = memo(() => {
    return (
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate(ScreenKey.NEW_AFFILIATE)
        }}
        style={{ alignSelf: 'center' }}>
            <Image style={{
                width: _widthScale(350),
                height: _widthScale(100),
                resizeMode: 'stretch',
                // borderWidth:1
            }} source={require('../../../Image/voucher.png')} />
        </TouchableOpacity>
    )
})

export default Voucher

const styles = StyleSheet.create({})