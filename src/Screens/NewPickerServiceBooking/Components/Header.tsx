import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { _heightScale, _moderateScale, _width } from '@Constant/Scale'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Text from '@Components/Text'
import { BLACK, BORDER_COLOR, GREY } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import { IconCancelGrey, IconCancelWhite } from '@Components/Icon/Icon'
import { sizeIcon } from '@Constant/Icon'
import { navigation } from 'rootNavigation'



const Header = () => {
    const { top } = useSafeAreaInsets()

    const _handleGoBack = useCallback(() => {
        navigation.goBack()
    }, [])

    return (
        <View style={[styles.container]}>
            <View style={{ height: top }} />
            <View style={styles.header}>
                <Text size={16} color={BLACK} weight='bold'>
                    Chọn Dịch Vụ
                </Text>

                <TouchableOpacity
                    onPress={_handleGoBack}
                    hitSlop={styleElement.hitslopSm}
                    style={{
                        position: 'absolute',
                        right: _moderateScale(8 * 3),
                        zIndex: 1,
                        borderRadius: _moderateScale(8 * 3 / 2),
                        ...styleElement.centerChild
                    }}>
                    <IconCancelGrey style={sizeIcon.md} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        height: _heightScale(8 * 5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: _width,
        borderBottomWidth: 1,
        borderColor: BORDER_COLOR
    }
})