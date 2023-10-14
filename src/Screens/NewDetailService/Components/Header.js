import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import IconBackBlack from '../../../SGV/backArrBlack.svg'
import IconFind from '../../../SGV/find_grey.svg'
import { navigation } from '../../../../rootNavigation'

const Header = memo(() => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
            >
                <IconBackBlack
                    width={_moderateScale(8 * 3)}
                    height={_moderateScale(8 * 3)}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.header__input}>
                <IconFind
                    width={_moderateScale(8 * 2)}
                    height={_moderateScale(8 * 2)}
                />
                <Text style={{ marginLeft: _moderateScale(8) }}>
                    Tìm bất cứ gì bạn muốn
                </Text>
            </TouchableOpacity>
        </View>
    )
})

export default Header

const styles = StyleSheet.create({
    header__input: {
        width: _widthScale(8 * 30),
        height: _moderateScale(8 * 4),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: '#F7F7F7',
        marginLeft: _moderateScale(8 * 2)
    },
    header: {
        width: _width,
        height: _moderateScale(8 * 6),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8),
        borderBottomWidth: .5,
        borderBottomColor: '#dbd9d9'
    }
})