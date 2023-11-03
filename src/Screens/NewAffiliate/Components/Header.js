import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BASE_COLOR, WHITE } from '../../../Constant/Color'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { _moderateScale } from '../../../Constant/Scale'
import { IconBXH, IconBackWhite, IconWallet } from '../../../Components/Icon/Icon'
import { stylesFont } from '../../../Constant/Font'
import { navigation } from '../../../../rootNavigation'
import ScreenKey from '../../../Navigation/ScreenKey'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Header = () => {

    const { top } = useSafeAreaInsets();

    return (
        <View style={styles.header}>
            <View style={{
                height: top
            }} />
            <View style={styles.header__box}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IconBackWhite />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(16) }]}>
                        TRI ÂN
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => navigation.navigate(ScreenKey.LIST_RANKED)}>
                        <IconBXH />
                    </TouchableOpacity>
                    <View style={{ width: _moderateScale(8 * 2) }} />
                    <TouchableOpacity onPress={() => navigation.navigate(ScreenKey.INFO_WALLET_NEW_AFFILIATE)}>
                        <IconWallet />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header__box: {
        height: _moderateScale(8 * 6),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    header: {
        backgroundColor: BASE_COLOR,
    }
})