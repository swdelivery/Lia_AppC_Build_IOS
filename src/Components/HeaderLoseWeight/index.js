import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';
import { sizeIcon } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';
import { BLACK_OPACITY_8, WHITE, BG_GREY_OPACITY_5, BG_GREY_OPACITY_2, BG_GREY_OPACITY_3 } from '../../Constant/Color';
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'
import { styleElement } from '../../Constant/StyleElement';

const Header = memo((props) => {
    return (
        <View style={[styles.container]}>
            <View style={[styles.widthBtnHeader, { alignItems: 'flex-start' }]}>
                <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
                onPress={() => navigation.goBack()}>
                    <Image
                        style={[sizeIcon.lg]}
                        source={require('../../Icon/back_bold.png')} />
                </TouchableOpacity>
            </View>

            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(18), color: BLACK_OPACITY_8 }]}>
                {props?.title}
            </Text>

            <View style={[styles.widthBtnHeader, { alignItems: 'flex-end' }]}>
                {
                    props?.hasSetting ?
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.SETTING_LOSE_WEIGHT)
                            }}
                        >
                            <Image
                                style={[sizeIcon.lg]}
                                source={require('../../Icon/setting_bold.png')} />
                        </TouchableOpacity>
                        : <></>
                }

                {
                    props?.addFood ? 
                    <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.ADDING_FOOD)
                            }}
                        >
                            <Image
                                style={[sizeIcon.sm]}
                                source={require('../../Icon/plus_black.png')} />
                        </TouchableOpacity>
                        : <></>
                }
                {
                    props?.addActivity ? 
                    <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenKey.ADDING_ACTIVITY)
                            }}
                        >
                            <Image
                                style={[sizeIcon.sm]}
                                source={require('../../Icon/plus_black.png')} />
                        </TouchableOpacity>
                        : <></>
                }

            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: _moderateScale(8 * 2),
        alignItems: 'center',
        // marginTop:_moderateScale(8),
        paddingVertical: _moderateScale(8),
        borderBottomWidth:_moderateScale(0.5),
        borderBottomColor:BG_GREY_OPACITY_3
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

export default Header;