import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { IconPhoneWhite, IconSetting } from '../../../Components/Icon/Icon'
import { _moderateScale, _width } from '../../../Constant/Scale'
import { styleElement } from '../../../Constant/StyleElement'

const Header = () => {
    return (
        <View style={{
            width: _width,
            position: 'absolute',
            zIndex: 1,
            backgroundColor: '#4CA886',
            paddingBottom: _moderateScale(8)
        }}>
            <View style={{ height: getStatusBarHeight() + _moderateScale(8) }} />
            <View style={[{ paddingHorizontal: _moderateScale(8 * 2) }, styleElement.rowAliCenter, { justifyContent: 'space-between' }]}>
                <IconSetting width={_moderateScale(8 * 3)} height={_moderateScale(8 * 3)} />

                <View style={styleElement.rowAliCenter}>
                    <IconPhoneWhite width={_moderateScale(8 * 3)} height={_moderateScale(8 * 3)} />
                    <Text style={{
                        fontSize: _moderateScale(14),
                        color: 'white',
                        fontWeight: '500',
                        marginLeft: _moderateScale(4)
                    }}>Hotline</Text>
                </View>
            </View>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({})