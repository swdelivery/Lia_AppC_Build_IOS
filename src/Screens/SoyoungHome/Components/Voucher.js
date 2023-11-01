import React, { memo } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { _moderateScale, _widthScale } from '../../../Constant/Scale'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const Voucher = memo(() => {
    return (
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate(ScreenKey.LIA_VOUCHER)
        }}
        style={{ alignSelf: 'center' }}>
            <Image style={{
                width: _widthScale(350),
                height: _widthScale(100),
                borderRadius:_moderateScale(8),
                resizeMode: 'stretch',
                // borderWidth:1
            }} source={require('../../../Image/voucher.png')} />
        </TouchableOpacity>
    )
})

export default Voucher

const styles = StyleSheet.create({})