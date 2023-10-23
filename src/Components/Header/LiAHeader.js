import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { _moderateScale } from '../../Constant/Scale'
import { IconBXH, IconBackWhite, IconWallet } from '../../Components/Icon/Icon'
import { stylesFont } from '../../Constant/Font'

import ScreenKey from '../../Navigation/ScreenKey'
import { navigation } from '../../../rootNavigation'

const LiAHeader = memo((props) => {
    return (
        <View style={styles.header}>
            <View style={{
                height: getStatusBarHeight()
            }} />
            <View style={styles.header__box}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IconBackWhite />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(16) }]}>
                        {
                            props?.title
                        }
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                </View>
            </View>
        </View>
    )
})

export default LiAHeader

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