import React, { useState, useEffect, memo } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from "react-redux";
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { login } from '../../Redux/Action/AuthAction';
import Button from '../../Components/Button/Button';
import ScreenKey from '../../Navigation/ScreenKey';
import { navigation } from '../../../rootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { sizeIcon } from '../../Constant/Icon';
import * as ActionType from '../../Redux/Constants/ActionType'

const AskForLogin = memo((props) => {
    const dispatch = useDispatch()

    const _handleSkipLogin = () => {
        dispatch({ type: ActionType.LOGIN_SUCCESS, payload: { flag: true } })
    }

    return (
        <ImageBackground
            source={require('../../Image/launch_screen.png')}
            style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', paddingBottom: _moderateScale(8 * 2) + getBottomSpace() }}>
                <View style={{
                    width: "80%",
                    // height: _moderateScale(8 * 20),
                    backgroundColor: Color.WHITE,
                    borderRadius: _moderateScale(8 * 2),
                    padding: _moderateScale(8 * 2)
                }}>
                    <Image
                        style={{
                            width: _moderateScale(8 * 10),
                            height: _moderateScale(8 * 10),
                            // backgroundColor:'grey',
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }}
                        source={require('../../Image/logo-footer.png')} />
                    <View style={{ marginTop: _moderateScale(8 * 2), alignItems: 'center' }}>
                        <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14) }}>
                            Đăng nhập để bắt đầu trải nghiệm
                        </Text>
                    </View>
                    <View style={{ marginTop: _moderateScale(8 * 2), alignItems: 'center', marginHorizontal: _moderateScale(8 * 2) }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Login')
                            }}
                            style={{ backgroundColor: Color.BLUE_FB, borderRadius: _moderateScale(8), justifyContent: 'center', alignItems: 'center', paddingVertical: _moderateScale(8), width: '100%' }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.WHITE }}>
                                Đăng nhập bằng số điện thoại
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: _moderateScale(8 * 2), alignItems: 'flex-end', marginHorizontal: _moderateScale(8 * 2) }}>
                        <TouchableOpacity
                            onPress={_handleSkipLogin}
                            style={{ flexDirection: 'row', alignItems: 'center', borderRadius: _moderateScale(8), paddingVertical: _moderateScale(8) }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.BLUE_FB }}>
                                Bỏ qua
                            </Text>
                            <Image style={[sizeIcon.sm, { marginLeft: _moderateScale(8) }]} source={require('../../Icon/doubleRight_blue.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
});



export default AskForLogin;