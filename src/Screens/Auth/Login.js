import React, { useState, useEffect } from 'react';
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

import { findPhoneNumbersInText } from 'libphonenumber-js'


const Login = props => {

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
        let password = await AsyncStorage.getItem('password');
        setPassword(password)
    }

    const fetchData = async () => {
        // dispatch(fetchAllData())

        // console.log(getCountryCallingCode());

        // return

        if (!phoneNumber || !password) {
            return alert('Nhập đầy đủ thông tin')
        }

        dispatch(login({
            phone: {
                phoneNumber: phoneNumber,
                nationCode: nationCode
            },
            password: password,
            appName: "CS_APP"
        }))


        // console.log({resultLogin});


        // return

        // let resultGetAllDataServiceRevunue = await handleApi(_getAllDataServiceReveunue());
        // if (resultGetAllDataServiceRevunue.error) return

        // let resultGetAllDataBranchRevenue = await handleApi(_getAllDataBranchRevenue());
        // if (resultGetAllDataBranchRevenue.error) return

        // let resultGetAllDataCostPart = await handleApi(_getAllDataCostPart())
        // if (resultGetAllDataCostPart.error) return

        // let resultGetAllDataCostItem = await handleApi(_getAllDataCostItem())
        // if (resultGetAllDataCostItem.error) return


        // Store.dispatch({
        //     type: ActionType.SAVE_LIST_REVENUE_BRANCH,
        //     payload: resultGetAllDataBranchRevenue.data
        // })
        // Store.dispatch({
        //     type: ActionType.SAVE_LIST_REVENUE_SERVICE,
        //     payload: resultGetAllDataServiceRevunue.data
        // })
        // Store.dispatch({
        //     type: ActionType.SAVE_LIST_COST_PART,
        //     payload: resultGetAllDataCostPart.data
        // })
        // Store.dispatch({
        //     type: ActionType.SAVE_LIST_COST_ITEM,
        //     payload: resultGetAllDataCostItem.data
        // })

        // Store.dispatch({
        //     type: ActionType.LOADING_DONE,
        //     payload: null
        // })
        // Store.dispatch({
        //     type: ActionType.LOGIN,
        //     payload: {
        //         flag: true
        //     }
        // })
    }
    return (
        <KeyboardAwareScrollView bounces={false} contentContainerStyle={{
            flexGrow: 1,
        }}>
            <View style={styles.container}>
                <StatusBarCustom />

                <ImageBackground source={require(
                    '../../Image/auth/bg_top.png'
                )}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        backgroundColor: Color.WHITE,
                        marginBottom: _heightScale(8 * 4),
                        width: "100%",
                        height: _heightScale(300),
                    }}
                    resizeMode='stretch' >
                    <View style={{
                        flex: 0.5,
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: _moderateScale(12)
                    }}>
                        {/* <Text style={[stylesFont.fontNolan500,{color:Color.WHITE, fontSize:_moderateScale(16)}]}>
                        Trang Beauty Center</Text> */}
                    </View>
                    <View style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image
                            style={{
                                width: _moderateScale(280),
                                height: _heightScale(77),
                                resizeMode: 'contain',
                            }}
                            source={
                                focusInput == 2 ?
                                    require('../../Image/auth/logo.png')
                                    :
                                    require('../../Image/auth/logo.png')
                            } />
                    </View>
                    <View style={{
                        flex: 2,
                        justifyContent: 'center'
                    }}>
                        <Text style={[stylesFont.fontNolanBold, {
                            maxWidth: _moderateScale(250),
                            marginLeft: _moderateScale(24),
                            color: Color.GREY,
                            marginBottom: 24,
                            fontSize: _heightScale(30)
                        }]}>Đăng nhập</Text>
                        <Text style={[{
                            maxWidth: _moderateScale(180),
                            color: Color.GREY,
                            lineHeight: 18,
                            marginLeft: _moderateScale(24),
                            fontSize: _heightScale(14)
                        }]}>Vui lòng nhập chính xác thông tin bên dưới (*)</Text>

                    </View>
                </ImageBackground>


                <View style={{ width: _moderateScale(320), alignSelf: 'center' }}>
                    <View style={[styles.containInput, { flexDirection: 'row', alignItems: 'center', paddingLeft: _moderateScale(8 * 2) }]}>

                        <TextInput
                            value={phoneNumber}
                            onFocus={() => {
                                setFocusInput(1)
                            }}
                            onBlur={() => {
                                setFocusInput(0)
                            }}
                            keyboardType={'number-pad'}
                            onChangeText={(content) => {
                                setphoneNumber(content)
                            }}
                            style={styles.input}
                            placeholderTextColor={Color.THIRD_COLOR}
                            placeholder={'Số điện thoại'} />
                        {/* <View style={{ width: _moderateScale(1), backgroundColor: Color.GREY, height: _moderateScale(16), marginHorizontal: _moderateScale(0) }} />

                        <Text style={{ marginHorizontal: _moderateScale(8 * 2), ...stylesFont.fontNolan500, color: Color.GREY, fontSize: _moderateScale(16) }}>
                            +84
                        </Text> */}
                    </View>
                    <View style={[styles.containInput, { justifyContent: 'center', paddingLeft: _moderateScale(8 * 2) }]}>
                        <TextInput
                            onFocus={() => {
                                setFocusInput(1)
                            }}
                            secureTextEntry={true}
                            onBlur={() => {
                                setFocusInput(0)
                            }}
                            value={password}
                            onChangeText={(content) => {
                                setPassword(content)
                            }}
                            style={styles.input}
                            placeholderTextColor={Color.THIRD_COLOR}
                            placeholder={'Mật khẩu'} />
                    </View>
                </View>

                <View style={{ marginTop: 40, alignItems: 'center' }}>
                    <View style={{ width: _moderateScale(320), alignSelf: 'center', marginBottom: _moderateScale(16) }}>
                        <Button.ButtonPrimary pressAction={() => fetchData()}
                            text={`Đăng nhập`} height={48} />
                    </View>
                    <View style={{ width: _moderateScale(320), alignSelf: 'center', marginBottom: _moderateScale(16) }}>
                        <Button.ButtonOutline
                            pressAction={() => navigation.navigate(ScreenKey.REGISTER)}
                            text={`Đăng ký`} height={48} />
                    </View>
                    <TouchableOpacity>
                        <Text style={{ color: Color.GREY, marginTop: 12 }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: _moderateScale(32), alignSelf: 'center' }}>
                    <Text style={[stylesFont.fontDinTextPro, { color: Color.THIRD_COLOR, fontSize: _moderateScale(12) }]}>
                    Copyright © Trang Beauty 2021.
                </Text>
                </View>


            </View>
        </KeyboardAwareScrollView>
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

export default Login;