import React, { useState } from 'react';
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

const Register = props => {

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

        // console.log({resultRegister});


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

    const _handleRegister = async () => {
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

        return navigation.navigate(ScreenKey.ACTIVATION, { phoneNumber: newFormatPhone, fullPhone: phoneNumber, password: password })

        // navigation.navigate(ScreenKey.ACTIVATION, { phoneNumber: phoneNumber })
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
                        }]}>Đăng ký</Text>
                        <Text style={[{
                            maxWidth: _moderateScale(180),
                            color: Color.GREY,
                            lineHeight: 18,
                            marginLeft: _moderateScale(24),
                            fontSize: _heightScale(14)
                        }]}>Vui lòng nhập chính xác thông tin bên dưới (*)</Text>

                    </View>
                </ImageBackground>

                <View style={{ width: _moderateScale(340), alignSelf: 'center' }}>
                    <View style={{
                        paddingVertical: _moderateScale(2),
                        marginBottom: 40,
                        borderBottomColor: Color.SECOND_COLOR,
                        borderBottomWidth: 1,
                    }}>
                        <TextInput
                            value={name}
                            onFocus={() => {
                                setFocusInput(1)
                            }}
                            onBlur={() => {
                                setFocusInput(0)
                            }}
                            onChangeText={(content) => {
                                setName(content)
                            }}
                            style={styles.input}
                            placeholder={'Tên của bạn'} />
                    </View>
                    <View style={{
                        paddingVertical: _moderateScale(2),
                        marginBottom: 40,
                        borderBottomColor: Color.SECOND_COLOR,
                        borderBottomWidth: 1,
                    }}>
                        <TextInput
                            value={phoneNumber}
                            onFocus={() => {
                                setFocusInput(1)
                            }}
                            keyboardType={'number-pad'}
                            onBlur={() => {
                                setFocusInput(0)
                            }}
                            onChangeText={(content) => {
                                setphoneNumber(content)
                            }}
                            style={styles.input}
                            placeholder={'Điện thoại'} />
                    </View>
                    <View style={{
                        paddingVertical: _moderateScale(2),
                        marginBottom: 40,
                        borderBottomColor: Color.SECOND_COLOR,
                        borderBottomWidth: 1,
                    }}>
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
                            placeholder={'Mật khẩu'} />
                    </View>
                    <View style={{
                        paddingVertical: _moderateScale(2),
                        marginBottom: 40,
                        borderBottomColor: Color.SECOND_COLOR,
                        borderBottomWidth: 1,
                    }}>
                        <TextInput
                            onFocus={() => {
                                setFocusInput(1)
                            }}
                            secureTextEntry={true}
                            onBlur={() => {
                                setFocusInput(0)
                            }}
                            value={password2}
                            onChangeText={(content) => {
                                setPassword2(content)
                            }}
                            style={styles.input}
                            placeholder={'Xác nhận mật khẩu'} />
                    </View>
                </View>

                {/* <View style={{ height: 8 * 1}} /> */}

                <View style={{ marginTop: _moderateScale(40), alignItems: 'center' }}>
                    <View style={{ width: _moderateScale(320), alignSelf: 'center' }}>
                        <Button.ButtonPrimary pressAction={() => _handleRegister()} text={`Đăng ký`} height={48} />
                    </View>
                </View>


                <View style={{ marginTop: _heightScale(8 * 2), flex: 1, justifyContent: 'flex-end', paddingBottom: _moderateScale(32), alignSelf: 'center' }}>
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
        width: _widthScale(320),
        color: Color.GREY,
        padding: 0,
        fontSize: _widthScale(14),
        paddingHorizontal: _widthScale(0),
        margin: 0
    },
})

export default Register;