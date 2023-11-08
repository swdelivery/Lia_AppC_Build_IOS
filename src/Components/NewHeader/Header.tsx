import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BASE_COLOR, WHITE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { navigation } from 'rootNavigation'
import { IconBackWhite } from '@Components/Icon/Icon'
import { stylesFont } from '@Constant/Font'

const Header = memo((props) => {

    const { top } = useSafeAreaInsets()
    const { title } = props

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
                <View style={{ flex: 4, alignItems: 'center' }}>
                    <Text style={[stylesFont.fontNolanBold, { color: WHITE, fontSize: _moderateScale(16) }]}>
                        {title}
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>

                </View>
            </View>
        </View>
    )
})

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