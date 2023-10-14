import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { navigation } from '../../../../rootNavigation';
import * as Color from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import { _heightScale, _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { styleElement } from '../../../Constant/StyleElement';
import ScreenKey from '../../../Navigation/ScreenKey';









const Header = memo((props) => {

    const _handleChoiceOptions = (key) => {
        switch (key) {
            case "Công việc":
                return navigation.navigate(ScreenKey.INFOTASK)
            case "Tạo nhóm":
                return navigation.navigate(ScreenKey.MODAL_CREATE_GROUP_CHAT)
            default:
                break;
        }
    }

    return (
        <View style={styles.headerSearch}>
            <View style={[styleElement.rowAliCenter, { flex: 1, backgroundColor: Color.BASE_COLOR }]}>
                <Image
                    style={[sizeIcon.lg, { marginHorizontal: _widthScale(16) }]}
                    source={require('../../../Icon/find.png')} />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.LIST_MEMBER_APP)
                    }}
                    activeOpacity={1}
                    style={[stylesFont.fontNolan500, {
                        flex: 1,
                        justifyContent: 'center',
                        marginRight: _moderateScale(8),
                        backgroundColor: Color.WHITE,
                        height: _moderateScale(8 * 3.5),
                        paddingHorizontal: _moderateScale(8 * 2),
                        borderRadius: _moderateScale(4)
                    }]}>
                    <Text style={[stylesFont.fontNolan500, { color: Color.GREY }]}>
                        Tìm bạn bè...
                    </Text>

                </TouchableOpacity>
                <Dropdown
                    data={[{
                        value: 'Tạo nhóm',
                    },]}
                    onChangeText={(item) => {
                        _handleChoiceOptions(item)
                    }}
                    itemColor={'#000'}
                    selectedItemColor={"#000"}
                    renderBase={() => (<Image
                        style={[sizeIcon.lllg]}
                        source={require('../../../Icon/plus.png')} />)}
                    rippleInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    dropdownPosition={1}
                    pickerStyle={{
                        width: 200,
                        left: null,
                        right: 40,
                        marginRight: 8,
                        marginTop: 24
                    }}
                    propsExtractor={() => {
                        return (
                            <Image
                                style={[sizeIcon.lllg]}
                                source={require('../../../Icon/plus.png')} />
                        )
                    }} />

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.LIST_MEMBER_APP)
                    }}
                    style={[styleElement.paddingBtn, { marginHorizontal: _widthScale(8) }]}>
                    <Image
                        style={[sizeIcon.lllg]}
                        source={require('../../../Icon/contact.png')} />
                </TouchableOpacity>
            </View>
            {/* </LinearGradient> */}
        </View>
    );
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.WHITE
    },
    headerSearch: {
        width: _width,
        height: _moderateScale(8 * 6),
    },
    gradientContainerStyle: {
        width: '100%',
        height: '100%',
        paddingTop: _heightScale(20),
        // paddingVertical: basePadding.sm,
        position: 'absolute',
        top: 0,
        left: 0,
    },
})

const gradient = {
    container: {
        width: '100%',
        height: '100%',
        // paddingVertical: basePadding.sm,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        Color.BASE_COLOR,
        'rgba(104, 47, 144,.7)'
    ]
}



export default Header;