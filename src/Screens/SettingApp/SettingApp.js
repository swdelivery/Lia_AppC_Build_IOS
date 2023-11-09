import React, { useRef, memo, useState, useEffect } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, processColor, Platform, Alert } from 'react-native';


import { _moderateScale, _heightScale, _width, _widthScale } from '../../Constant/Scale';
import { WHITE, RED, GREY, BG_GREY_OPACITY_2, BLACK_OPACITY_8, BG_GREY_OPACITY_5, BLUE_FB, BTN_PRICE, GREEN_SUCCESS, BASE_COLOR, BLACK_OPACITY_7, BG_GREY_OPACITY_7 } from '../../Constant/Color';
import { randomStringFixLengthCode } from '../../Constant/Utils';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';

import ScreenKey from '../../Navigation/ScreenKey';
import { useSelector } from 'react-redux';
import Store from "../../Redux/store";
import * as ActionType from '../../Redux/Constants/ActionType'
import Header from '../../Components/HeaderLoseWeight/index';
import LinearGradient from 'react-native-linear-gradient';
import { getListBank, getPaymentForPartner } from '../../Redux/Action/Affiilate';
import { escapeRegExp, isEmpty, remove } from 'lodash';
import slugify from 'slugify';
import { navigation } from '../../../rootNavigation';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import moment from 'moment'
import { Permission, PERMISSION_TYPE, REQUEST_PERMISSION_TYPE } from '../../PermissionConfig/PermissionConfig';
import { request, PERMISSIONS, openSettings, RESULTS } from 'react-native-permissions';
import { checkNotifications } from 'react-native-permissions';
import { requestNotifications } from 'react-native-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import { partnerAccountLogout } from '../../Redux/Action/AuthAction';
import SocketInstance from '../../../SocketInstance';
import ModalThele from '../WheelSpin/ModalThele';
import { getConfigData } from '../../Redux/Action/OrtherAction';
import { removeAccount } from '../../Redux/Action/ProfileAction';

const SettingApp = memo((props) => {

    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const [perMicro, setPerMicro] = useState(null)
    const [perGallery, setPerGallery] = useState(null)
    const [perCamera, setPerCamera] = useState(null)
    const [perNotifi, setPerNotifi] = useState(null)

    const [showModalBaoHanh, setShowModalBaoHanh] = useState(false)
    const [configBaoHanh, setConfigBaoHanh] = useState({})

    const [showModalBaoMat, setShowModalBaoMat] = useState(false)
    const [configBaoMat, setConfigBaoMat] = useState({})

    useEffect(() => {
        _checkPer()
        // request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(res => {
        //     console.log({res});
        // })
        _getDataBaoHanh()
        _getDataBaoMat()

    }, [])

    const _getDataBaoHanh = async () => {
        let result = await getConfigData("CSBH")
        if (result?.isAxiosError) return
        setConfigBaoHanh(result)
    }
    const _getDataBaoMat = async () => {
        let result = await getConfigData("CSBM")
        if (result?.isAxiosError) return
        setConfigBaoMat(result)
    }


    const _handleLogOut = async () => {


        Store.dispatch({
            type: ActionType.LOG_OUT
        })
        let fcmTokenSTR = await AsyncStorage.getItem('fcmToken');
        // return alert(fcmTokenSTR)

        // let resultLogout = await handleApi(_logout(fcmTokenSTR))
        // console.log({ resultLogout });
        // if (resultLogout.error) {
        //     return alert(resultLogout.message)
        // }

        let result = await partnerAccountLogout({
            fcmToken: fcmTokenSTR
        })
        if (result?.isAxiosError) return

        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("userName");
        await AsyncStorage.removeItem("password");
        await AsyncStorage.removeItem("codeAffiliateVsIdService");

        setTimeout(() => {
            Store.dispatch({
                type: ActionType.CLEAR_STORE_REDUX
            })
        }, 0);
        SocketInstance.instance = null;
        SocketInstance.socketConn.disconnect();
        SocketInstance.socketConn = null

        navigation.replace("MainTab")

    }

    const _checkPer = async () => {
        let resultPerMicro = await Permission.checkPermission(PERMISSION_TYPE.microphone)
        setPerMicro(resultPerMicro)

        let resultPerGallery = await Permission.checkPermission(PERMISSION_TYPE.gallery)
        setPerGallery(resultPerGallery)

        let resultPerCamera = await Permission.checkPermission(PERMISSION_TYPE.camera)
        setPerCamera(resultPerCamera)

        checkNotifications().then(({ status, settings }) => {
            // …
            console.log({ status, settings });
            setPerNotifi(status)
        });

    }

    const _handleDeleteAccount = () => {
        Alert.alert(
            "Xác nhận",
            `Bạn chắc chắn muốn xóa tài khoản này khỏi hệ thống?`,
            [
                {
                    text: "Huỷ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Đồng ý", onPress: async () => {
                        let result = await removeAccount(infoUserRedux?._id)
                        if(result?.isAxiosError)return;

                        _handleLogOut()
                        // Alert.alert(
                        //     `Yêu cầu xóa tài khoản`,
                        //     `Lia Beauty đã tiếp nhận thông tin sẽ liên hệ lại với thời gian sớm nhất. \n Mọi thông tin xin liên hệ:\n Hotline: +842877762526 hoặc email: info@liavietnam.com`
                        // )
                    }
                }
            ],
            { cancelable: false }
        );
    }



    return (
        <View style={styles.container}>

            <ModalThele
                hide={() => {
                    setShowModalBaoHanh(false)
                }}
                data={configBaoHanh}
                show={showModalBaoHanh}
            />
            <ModalThele
                hide={() => {
                    setShowModalBaoMat(false)
                }}
                data={configBaoMat}
                show={showModalBaoMat}
            />

            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />
            <View style={{ height: _moderateScale(8) }} />
            <Header title={"Cài đặt"} />

            <ScrollView>

                <View style={{
                    padding: _moderateScale(8 * 3)
                }}>
                    <View style={[styleElement.rowAliTop]}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                                Thông báo
                            </Text>
                            <View style={{ height: _moderateScale(4) }} />
                            <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14), fontStyle: 'italic' }}>
                                Thông báo tin nhắn mới và các sự kiện ưu đãi
                            </Text>
                        </View>

                        {
                            perNotifi == RESULTS.GRANTED ?
                                <TouchableOpacity style={styles.btnActive}>
                                    <View style={styles.btnActive__child} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={
                                        async () => {

                                            if (perNotifi == RESULTS.BLOCKED) {
                                                return openSettings()
                                            }

                                            requestNotifications().then(({ status, settings }) => {
                                                console.log({ status, settings });
                                                if (status == RESULTS.GRANTED) {
                                                    return setPerNotifi(status)
                                                }
                                                if (status == RESULTS.BLOCKED) {
                                                    return
                                                }
                                                openSettings()
                                            });

                                            // let result = await Permission.requestPermission(REQUEST_PERMISSION_TYPE[PERMISSION_TYPE.microphone][Platform.OS])
                                            // if (result == RESULTS.GRANTED) {
                                            //     return setPerMicro(result)
                                            // }
                                            // if (result == RESULTS.BLOCKED) {
                                            //     return
                                            // }
                                            // openSettings()
                                            //  else {
                                            //     openSettings()
                                            // }
                                        }
                                    }
                                    style={styles.btnInActive}>
                                    <View style={styles.btnInActive__child} />
                                </TouchableOpacity>
                        }

                    </View>
                </View>

                <View style={{ width: "100%", height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />

                <View style={{
                    padding: _moderateScale(8 * 3)
                }}>
                    <View style={[styleElement.rowAliTop]}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                                Micro
                            </Text>
                            <View style={{ height: _moderateScale(4) }} />
                            <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14), fontStyle: 'italic' }}>
                                MicroPhone được sử dụng để đàm thoại với bác sĩ
                            </Text>
                        </View>

                        {
                            perMicro == RESULTS.GRANTED ?
                                <TouchableOpacity style={styles.btnActive}>
                                    <View style={styles.btnActive__child} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={
                                        async () => {

                                            if (perMicro == RESULTS.BLOCKED) {
                                                return openSettings()
                                            }

                                            let result = await Permission.requestPermission(REQUEST_PERMISSION_TYPE[PERMISSION_TYPE.microphone][Platform.OS])
                                            if (result == RESULTS.GRANTED) {
                                                return setPerMicro(result)
                                            }
                                            if (result == RESULTS.BLOCKED) {
                                                return
                                            }
                                            openSettings()
                                            //  else {
                                            //     openSettings()
                                            // }
                                        }
                                    }
                                    style={styles.btnInActive}>
                                    <View style={styles.btnInActive__child} />
                                </TouchableOpacity>
                        }

                    </View>
                </View>

                <View style={{ width: "100%", height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />

                <View style={{
                    padding: _moderateScale(8 * 3)
                }}>
                    <View style={[styleElement.rowAliTop]}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                                Thư viện ảnh
                            </Text>
                            <View style={{ height: _moderateScale(4) }} />
                            <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14), fontStyle: 'italic' }}>
                                Thư viện ảnh được sử dụng để gửi ảnh khi nhắn tin, cập nhật ảnh hậu phẫu
                            </Text>
                        </View>

                        {
                            perGallery == RESULTS.GRANTED ?
                                <TouchableOpacity style={styles.btnActive}>
                                    <View style={styles.btnActive__child} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={
                                        async () => {

                                            if (perGallery == RESULTS.BLOCKED) {
                                                return openSettings()
                                            }

                                            let result = await Permission.requestPermission(REQUEST_PERMISSION_TYPE[PERMISSION_TYPE.gallery][Platform.OS])
                                            if (result == RESULTS.GRANTED) {
                                                return setPerGallery(result)
                                            }
                                            if (result == RESULTS.BLOCKED) {
                                                return
                                            }
                                            openSettings()
                                            //  else {
                                            //     openSettings()
                                            // }
                                        }
                                    }
                                    style={styles.btnInActive}>
                                    <View style={styles.btnInActive__child} />
                                </TouchableOpacity>
                        }

                    </View>
                </View>

                <View style={{ width: "100%", height: _moderateScale(0.5), backgroundColor: BG_GREY_OPACITY_5 }} />

                <View style={{
                    padding: _moderateScale(8 * 3)
                }}>
                    <View style={[styleElement.rowAliTop]}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                                Camera
                            </Text>
                            <View style={{ height: _moderateScale(4) }} />
                            <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14), fontStyle: 'italic' }}>
                                Camera được sử dụng để quét mã QR Code, nhắn tin bằng hình ảnh và tải ảnh hậu phẫu
                            </Text>
                        </View>

                        {
                            perCamera == RESULTS.GRANTED ?
                                <TouchableOpacity style={styles.btnActive}>
                                    <View style={styles.btnActive__child} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={
                                        async () => {

                                            if (perCamera == RESULTS.BLOCKED) {
                                                return openSettings()
                                            }

                                            let result = await Permission.requestPermission(REQUEST_PERMISSION_TYPE[PERMISSION_TYPE.camera][Platform.OS])
                                            if (result == RESULTS.GRANTED) {
                                                return setPerCamera(result)
                                            }
                                            if (result == RESULTS.BLOCKED) {
                                                return
                                            }
                                            openSettings()
                                            //  else {
                                            //     openSettings()
                                            // }
                                        }
                                    }
                                    style={styles.btnInActive}>
                                    <View style={styles.btnInActive__child} />
                                </TouchableOpacity>
                        }

                    </View>
                </View>

                <View style={{ flex: 1 }} />

                <View style={{ marginLeft: _moderateScale(16), marginBottom: _moderateScale(8 * 2) }}>
                    <TouchableOpacity
                        onPress={() => {
                            setShowModalBaoHanh(true)
                        }}
                        style={{
                            marginVertical: _moderateScale(8 * 1)
                        }}>
                        <Text style={{
                            ...stylesFont.fontNolan500,
                            fontSize: _moderateScale(15),
                            textDecorationLine: 'underline'
                        }}>
                            Chính sách bảo hành
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setShowModalBaoMat(true)
                        }}
                        style={{
                        }}>
                        <Text style={{
                            ...stylesFont.fontNolan500,
                            fontSize: _moderateScale(15),
                            textDecorationLine: 'underline'
                        }}>
                            Chính sách bảo mật
                        </Text>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity
                    onPress={_handleDeleteAccount}
                    style={[styleElement.centerChild, { height: _moderateScale(8 * 5), borderColor: RED, alignItems: 'center', marginTop: _moderateScale(8 * 2), borderWidth: 1, marginHorizontal: _moderateScale(8 * 2), marginBottom: _moderateScale(8 * 1) }]}>
                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(15), color: RED, ...stylesFont.fontNolan500 }}>
                        Yêu cầu xóa tài khoản
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={_handleLogOut}
                    style={[styleElement.centerChild, { height: _moderateScale(8 * 5), borderColor: RED, backgroundColor: RED, alignItems: 'center', marginTop: _moderateScale(8 * 2), borderWidth: 1, marginHorizontal: _moderateScale(8 * 2), marginBottom: getBottomSpace() + _moderateScale(8 * 1) }]}>
                    <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), color: WHITE, ...stylesFont.fontNolan500 }}>
                        Đăng xuất
                    </Text>
                </TouchableOpacity>

                

            </ScrollView>

        </View>
    );
});


const styles = StyleSheet.create({
    btnInActive__child: {
        width: _moderateScale(8 * 2.5),
        height: _moderateScale(8 * 2.5),
        borderRadius: _moderateScale(8 * 1.5),
        backgroundColor: WHITE
    },
    btnInActive: {
        width: _moderateScale(8 * 5.5),
        height: _moderateScale(8 * 3),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: BG_GREY_OPACITY_7,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: _moderateScale(2)
    },
    btnActive__child: {
        width: _moderateScale(8 * 2.5),
        height: _moderateScale(8 * 2.5),
        borderRadius: _moderateScale(8 * 1.5),
        backgroundColor: WHITE
    },
    btnActive: {
        width: _moderateScale(8 * 5.5),
        height: _moderateScale(8 * 3),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: GREEN_SUCCESS,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: _moderateScale(2)
    },
    btnBank: {
        backgroundColor: BG_GREY_OPACITY_2,
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: _moderateScale(8 * 8 / 2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoBank: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        resizeMode: 'contain',
    },
    inputHeader: {
        marginHorizontal: _moderateScale(8 * 3),
        marginTop: _moderateScale(8),
        backgroundColor: 'rgba(244, 244, 244,0.7)',
        borderRadius: _moderateScale(8),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        fontSize: _moderateScale(14),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: _moderateScale(0.5),
        borderColor: BG_GREY_OPACITY_2
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})


export default SettingApp;