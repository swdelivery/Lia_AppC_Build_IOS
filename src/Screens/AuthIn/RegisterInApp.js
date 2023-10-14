import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from "react-redux";
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { login, register } from '../../Redux/Action/AuthAction';
import Button from '../../Components/Button/Button';
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { alertCustomNotAction } from '../../Constant/Utils';
import { partnerAccountRegister } from '../../Redux/Action/AuthAction'
import { styleElement } from '../../Constant/StyleElement';
import LinearGradient from 'react-native-linear-gradient';

const RegisterInApp = props => {

    const [showModal, setShowModal] = useState(false)
    const [phoneNumber, setphoneNumber] = useState('')
    const [name, setName] = useState('')

    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [focusInput, setFocusInput] = useState(null)

    const dispatch = useDispatch();

    const fetchData = async () => {
        // dispatch(fetchAllData())
        if (!phoneNumber || !password) {
            return alert('Nhập đầy đủ thông tin')
        }
    }

    const _handleRegister = async () => {

        // if (props?.route?.params?.routeName) {
        //     return navigation?.navigate(props?.route?.params?.routeName)
        // }
        // return navigation.navigate(ScreenKey.ACTIVATION_IN_APP, { phoneNumber: newFormatPhone, fullPhone: phoneNumber, password: password, routeName: props?.route?.params?.routeName })

        console.log({
            name,
            phoneNumber,
            password,
            password2
        });

        if (!name.trim() || !phoneNumber.trim() || !password.trim() || !password2.trim()) {
            return alertCustomNotAction(`Lỗi`, `Vui lòng nhập đầy đủ các trường cần thiết`)
        }
        if (password?.length < 6) {
            return alertCustomNotAction(`Lỗi`, `Mật khẩu phải ít nhất 6 kí tự`)
        }
        if (password !== password2) {
            return alertCustomNotAction(`Lỗi`, `Mật khẩu xác nhận không đúng`)
        }

        let resultPartnerAccountRegister = await partnerAccountRegister({
            "name": name,
            "phone": {
                "phoneNumber": phoneNumber,
                "nationCode": "+84"
            },
            "password": password
        })
        if (resultPartnerAccountRegister?.isAxiosError) return

        let newFormatPhone = phoneNumber;

        if (newFormatPhone.charAt(0) == "0") {
            newFormatPhone = `+84${newFormatPhone.substring(1)}`
        } else {
            newFormatPhone = `+84${newFormatPhone}`
        }

        return navigation.navigate(ScreenKey.ACTIVATION_IN_APP, { phoneNumber: newFormatPhone, fullPhone: phoneNumber, password: password, routeName: props?.route?.params?.routeName })

        // navigation.navigate(ScreenKey.ACTIVATION, { phoneNumber: phoneNumber })
    }

    return (
        <>
            <StatusBarCustom bgColor={'white'} barStyle={'dark-content'} />

            <KeyboardAwareScrollView bounces={false} contentContainerStyle={{
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
                            Đăng ký
                        </Text>
                        <View style={sizeIcon.lg} />
                    </View>


                    <View style={{ height: _moderateScale(8 * 2) }} />
                    <View style={[{ height: _moderateScale(8 * 20), borderWidth: 0, margin: _moderateScale(8 * 2), borderRadius: _moderateScale(8 * 2) }, styleElement.centerChild]}>
                        {/* <Text>LOGO HERE</Text> */}
                        <Image resizeMode={'contain'} style={{ width: '70%', height: '70%' }} source={require('../../NewImage/logoCenterBase.png')} />
                    </View>
                    <View style={{ height: _moderateScale(8 * 2) }} />


                    <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                        <View style={[{
                            width: '100%',
                            backgroundColor: Color.BG_GREY_OPACITY_2,
                            paddingVertical: _moderateScale(8 * 2),
                            borderRadius: _moderateScale(8)
                        }, styleElement.rowAliCenter]}>
                            <Image style={[sizeIcon.md, { marginHorizontal: _moderateScale(8 * 2), opacity: 0.7 }]} source={require('../../NewIcon/peopleBlack.png')} />
                            <TextInput
                                value={name}
                                onChangeText={(content) => {
                                    setName(content)
                                }}
                                style={styles.input}
                                placeholder={'Tên của bạn'}
                                style={{
                                    ...stylesFont.fontNolan500,
                                    fontSize: _moderateScale(14),
                                    paddingVertical: 0,
                                    flex: 1
                                }} />
                        </View>
                        <View style={{ height: _moderateScale(8 * 2) }} />

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
                                style={styles.input}
                                style={{
                                    ...stylesFont.fontNolan500,
                                    fontSize: _moderateScale(14),
                                    paddingVertical: 0,
                                    flex: 1
                                }} placeholder={"Số điện thoại"} />
                        </View>
                        <View style={{ height: _moderateScale(8 * 2) }} />

                        <View style={[{
                            width: '100%',
                            backgroundColor: Color.BG_GREY_OPACITY_2,
                            paddingVertical: _moderateScale(8 * 2),
                            borderRadius: _moderateScale(8)
                        }, styleElement.rowAliCenter]}>
                            <Image style={[sizeIcon.md, { marginHorizontal: _moderateScale(8 * 2), opacity: 0.7 }]} source={require('../../NewIcon/lockBlack.png')} />
                            <TextInput
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(content) => {
                                    setPassword(content)
                                }}
                                style={styles.input}
                                style={{
                                    ...stylesFont.fontNolan500,
                                    fontSize: _moderateScale(14),
                                    paddingVertical: 0,
                                    flex: 1
                                }} placeholder={"Mật khẩu"} />
                        </View>
                        <View style={{ height: _moderateScale(8 * 2) }} />

                        <View style={[{
                            width: '100%',
                            backgroundColor: Color.BG_GREY_OPACITY_2,
                            paddingVertical: _moderateScale(8 * 2),
                            borderRadius: _moderateScale(8)
                        }, styleElement.rowAliCenter]}>
                            <Image style={[sizeIcon.md, { marginHorizontal: _moderateScale(8 * 2), opacity: 0.7 }]} source={require('../../NewIcon/lockBlack.png')} />
                            <TextInput
                                secureTextEntry={true}
                                value={password2}
                                onChangeText={(content) => {
                                    setPassword2(content)
                                }}
                                style={styles.input}
                                style={{
                                    ...stylesFont.fontNolan500,
                                    fontSize: _moderateScale(14),
                                    paddingVertical: 0,
                                    flex: 1
                                }} placeholder={"Xác nhận mật khẩu"} />
                        </View>

                        <View style={{ height: _moderateScale(8 * 4) }} />

                        <TouchableOpacity
                            onPress={() => {
                                _handleRegister()
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
                                Đăng ký
                            </Text>
                        </TouchableOpacity>


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
        width: _widthScale(320),
        color: Color.GREY,
        padding: 0,
        fontSize: _widthScale(14),
        paddingHorizontal: _widthScale(0),
        margin: 0
    },
})

export default RegisterInApp;