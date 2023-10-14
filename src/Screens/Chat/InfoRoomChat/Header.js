import React, { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { navigation } from '../../../../rootNavigation';
import { WHITE } from '../../../Constant/Color';
import { sizeIcon } from '../../../Constant/Icon';
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';

const Header = memo((props) => {
    return (
        <View style={[styles.header, styleElement.rowAliCenter, shadow]}>
            <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
                onPress={() => {
                    navigation.goBack()
                }}
                style={{ marginHorizontal: _widthScale(8), padding: _moderateScale(8) }}>
                <Image
                    style={[sizeIcon.lg]}
                    source={require('../../../Icon/backBlack.png')} />
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    header: {
        width: _width,
        height: _moderateScale(50),
        backgroundColor: WHITE,
        zIndex: 1
    },
})

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.68,

    elevation: 3
}


export default Header;