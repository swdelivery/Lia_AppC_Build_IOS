import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from "react-redux";
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _moderateScale, _widthScale, _width, _height } from '../../Constant/Scale';
import { login, loginInApp } from '../../Redux/Action/AuthAction';
import Button from '../../Components/Button/Button';
import ScreenKey from '../../Navigation/ScreenKey';
import { navigation } from '../../../rootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';

import { findPhoneNumbersInText } from 'libphonenumber-js'
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';


const FillPhoneToGetNewPass = props => {

    const [showModal, setShowModal] = useState(false)
    const [phoneNumber, setphoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [focusInput, setFocusInput] = useState(null)
    const [nationCode, setNationCode] = useState('+84')

    const dispatch = useDispatch();

    useEffect(() => {
        _getUsernamePassword()
    }, [])

    const _getUsernamePassword = async () => {
        let userName = await AsyncStorage.getItem('userName');
        setphoneNumber(userName)
    }

    const fetchData = async () => {
        // dispatch(fetchAllData())

        // console.log(getCountryCallingCode());

        // return

        if (!phoneNumber || !password) {
            return alert('Nhập đầy đủ thông tin')
        }

        dispatch(loginInApp({
            phone: {
                phoneNumber: phoneNumber,
                nationCode: nationCode
            },
            password: password,
            appName: "CS_APP"
        }, props?.route?.params?.routeName))

    }
    return (
        <>
            <StatusBarCustom bgColor={'white'} barStyle={'dark-content'}/>

            <KeyboardAwareScrollView contentContainerStyle={{
                flexGrow: 1,
            }}>
                <View style={styles.container}>

                    <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 2) }]}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            hitSlop={styleElement.hitslopSm}>
                            <Image style={sizeIcon.lg} source={require('../../NewIcon/backBold.png')} />
                        </TouchableOpacity>
                        <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16) }}>
                            Quên mật khẩu
                        </Text>
                        <View style={sizeIcon.lg} />
                    </View>


                    <View style={{ height: _moderateScale(8 * 8) }} />

                    <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                        <View style={[{
                            width: '100%',
                            backgroundColor: Color.BG_GREY_OPACITY_2,
                            paddingVertical: _moderateScale(8 * 2),
                            borderRadius: _moderateScale(8)
                        }, styleElement.rowAliCenter]}>
                            <Image style={[sizeIcon.md, { marginHorizontal: _moderateScale(8 * 2), opacity: 0.7 }]} source={require('../../NewIcon/phoneBlack.png')} />
                            <TextInput
                                value={phoneNumber}
                                keyboardType={'number-pad'}
                                onChangeText={(content) => {
                                    setphoneNumber(content)
                                }}
                                style={{
                                    ...stylesFont.fontNolan500,
                                    fontSize: _moderateScale(14),
                                    paddingVertical: 0,
                                    flex: 1
                                }} placeholder={"Số điện thoại đã đăng kí"} />
                        </View>
                        <View style={{ height: _moderateScale(8 * 4) }} />


                        <TouchableOpacity
                            onPress={() => {
                                let newFormatPhone = phoneNumber;

                                if (newFormatPhone.charAt(0) == "0") {
                                    newFormatPhone = `+84${newFormatPhone.substring(1)}`
                                } else {
                                    newFormatPhone = `+84${newFormatPhone}`
                                }
                                return navigation.navigate(ScreenKey.GET_OTP_NEW_PASS, { phoneNumber: newFormatPhone, fullPhone: phoneNumber, routeName: props?.route?.params?.routeName })
                            }}
                            style={[{
                                height: _moderateScale(8 * 6),
                                backgroundColor: Color.WHITE,
                                borderRadius: _moderateScale(8),
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Color.SECOND_COLOR,
                            }]}>
                            <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                locations={[0, 0.6, 1]}
                                colors={[
                                    Color.BASE_COLOR,
                                    '#8c104e',
                                    '#db0505',
                                ]}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    borderRadius: _moderateScale(8),
                                }} />

                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: Color.WHITE }]}>
                                Tiếp tục
                            </Text>
                        </TouchableOpacity>
                        <View style={{ height: _moderateScale(8 * 0.5) }} />

                    </View>

                </View>
            </KeyboardAwareScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.WHITE
    },
    input: {
        // width: _widthScale(240),
        flex: 1,
        color: Color.SECOND_COLOR,
        padding: 0,
        fontSize: _widthScale(16),
        paddingHorizontal: _widthScale(0),
        margin: 0,
    },
    containInput: {
        marginBottom: _heightScale(8 * 3),
        borderColor: Color.BG_MAIN_OPACITY,
        borderWidth: 1,
        height: _moderateScale(48),
        // paddingLeft: _moderateScale(16),
        // justifyContent: 'center',
        borderRadius: _moderateScale(25),
        backgroundColor: Color.BG_MAIN_OPACITY,
    },
    active: {
        borderColor: Color.SECOND_COLOR,
    }
})



const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}


export default FillPhoneToGetNewPass;