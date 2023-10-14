import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _moderateScale, _width } from '../../../Constant/Scale'
import IconBackBlack from '../../../SGV/backArrBlack.svg'
import IconWallet from '../../../SGV/wallet.svg'
import { BASE_COLOR, GREY_FOR_TITLE } from '../../../Constant/Color'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'

const Header = () => {
    return (
        <View style={styles.header}>

            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate(ScreenKey.HOME_TAB)
                }}>
                    <IconBackBlack
                        width={_moderateScale(8 * 3)}
                        height={_moderateScale(8 * 3)}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 4, alignItems: 'center' }}>
                <Text style={{ fontSize: _moderateScale(16), fontWeight: '500',color:GREY_FOR_TITLE }}>
                    Kết quả phân tích
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                
            </View>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: _width,
        height: _moderateScale(8 * 6),
        borderBottomWidth: .5,
        borderColor: 'rgba(0,0,0,.2)',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2)
    }
})