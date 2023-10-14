import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';
import { sizeIcon } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';
import { BLACK_OPACITY_8, WHITE, BG_GREY_OPACITY_5, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3, BASE_COLOR } from '../../Constant/Color';
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'
import { styleElement } from '../../Constant/StyleElement';
import LinearGradient from 'react-native-linear-gradient';

const HeaderLeft = memo((props) => {
    return (
        <View style={[styles.container]}>
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.6, 1]}
                colors={[
                    BASE_COLOR,
                    '#8c104e',
                    '#db0505',
                ]}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    flexDirection: 'row',
                    paddingHorizontal: _moderateScale(8 * 2),
                    alignItems: 'center',
                    paddingVertical: _moderateScale(8),
                }} >
                <View style={[styles.widthBtnHeader, { alignItems: 'flex-start' }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../Icon/back_left_white.png')} />
                    </TouchableOpacity>
                </View>

                <Text numberOfLines={1} style={[stylesFont.fontNolanBold, { flex: 1, fontSize: _moderateScale(18), color: WHITE }]}>
                    {props?.title}
                </Text>
            </LinearGradient>

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // paddingHorizontal: _moderateScale(8 * 2),
        alignItems: 'center',
        // marginTop:_moderateScale(8),
        // paddingVertical: _moderateScale(8),
        borderBottomWidth: _moderateScale(0.5),
        borderBottomColor: BG_GREY_OPACITY_3,
        backgroundColor: BASE_COLOR,
        height: _moderateScale(8 * 6)
    },
    widthBtnHeader: {
        width: _moderateScale(8 * 5),
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.36,
    shadowRadius: 1.68,

    elevation: 11
}

export default HeaderLeft;