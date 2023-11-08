import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, AppState } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _widthScale, _moderateScale } from '../../Constant/Scale';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from "../../Redux/store";
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import ScreenKey from '../../Navigation/ScreenKey'
import { navigation } from '../../../rootNavigation';
import { URL_ORIGINAL } from '../../Constant/Url';
import { Permission, PERMISSION_TYPE, REQUEST_PERMISSION_TYPE } from '../../PermissionConfig/PermissionConfig';
import { request, PERMISSIONS, openSettings, RESULTS } from 'react-native-permissions';
import { checkNotifications } from 'react-native-permissions';
import { requestNotifications } from 'react-native-permissions';
import { alertCustomNotAction } from '../../Constant/Utils';

const ModalVideoCallHasCome = props => {


    const closeModal = () => {
        // Store.dispatch({
        //     type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
        //     payload: {
        //         flag: false
        //     }
        // })
        props?.hide()
    }

    const [perMicro, setPerMicro] = useState(null)
    const [perCamera, setPerCamera] = useState(null)

    const [appStateVisible, setAppStateVisible] = useState("");


    const _checkPer = async () => {
        let resultPerMicro = await Permission.checkPermission(PERMISSION_TYPE.microphone)
        setPerMicro(resultPerMicro)

        // let resultPerGallery = await Permission.checkPermission(PERMISSION_TYPE.gallery)
        // setPerGallery(resultPerGallery)

        let resultPerCamera = await Permission.checkPermission(PERMISSION_TYPE.camera)
        setPerCamera(resultPerCamera)
    }


    useEffect(() => {
        AppState.addEventListener("change", async (state) => {
            if (state == 'active') {
                setAppStateVisible("active")

            } else {
                setAppStateVisible('inActive')
            }
        });

        return () => {
            AppState.removeEventListener("change", () => {
                // alert('out')
            });
        };
    }, []);


    useEffect(() => {
        (async () => {
            if (appStateVisible == "active") {
                _checkPer()
            }
        })()
    }, [appStateVisible])



    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'center'
        }}
            animationIn='zoomIn'
            animationOut='zoomOut'
            // animationInTiming={500}
            // animationOutTiming={500}
            isVisible={props?.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onModalShow={() => {
                _checkPer()
            }}
            onBackButtonPress={() => {
                props?.confirmfalse()
            }}
            onBackdropPress={() => {
                // props?.confirmfalse()
            }}>

            <View style={styles.modalFilter}>
                <View style={{ alignItems: 'flex-end', paddingRight: _moderateScale(8 * 2) }}>
                    <TouchableOpacity
                        onPress={() => {
                            props?.confirmfalse()
                        }}
                        style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                        <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                    </TouchableOpacity>
                </View>
                {
                    props?.dataSenderVideo?.nameSender ?
                        <>
                            <Image style={{
                                width: _widthScale(160),
                                height: _widthScale(160),
                                borderRadius: _moderateScale(8 * 2),
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                marginVertical: _moderateScale(8 * 2)
                            }} source={{ uri: `${URL_ORIGINAL}${JSON.parse(props?.dataSenderVideo?.nameSender)?.avatar?.link}` }} />
                            <View style={styles.viewContent}>
                                <Text style={[stylesFont.fontNolan500, { fontSize: _widthScale(18), marginBottom: _heightScale(8), color: Color.BLACK_OPACITY_8 }]}>
                                    Cuộc gọi đến
                                </Text>
                                {
                                    console.log({ x: props?.dataSenderVideo?.nameSender })

                                }
                                <Text style={[stylesFont.fontNolan500, styles.content]}>
                                    Bạn có một cuộc gọi Video từ {JSON.parse(props?.dataSenderVideo?.nameSender)?.name}
                                </Text>
                                <View style={{
                                    width: "100%",
                                    height: 1,
                                    backgroundColor: Color.BG_GREY_OPACITY_2,
                                    marginVertical: _moderateScale(8)
                                }} />

                                <View style={{
                                }}>
                                    <View style={[styleElement.rowAliTop]}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                                                Camera
                                            </Text>
                                            <View style={{ height: _moderateScale(4) }} />
                                            <Text style={{ ...stylesFont.fontNolan, fontSize: _moderateScale(14), fontStyle: 'italic' }}>
                                                Camera được sử dụng để tương tác với bác sĩ
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
                                                            // alert(perCamera)

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

                                <View style={{
                                    marginTop: _moderateScale(8)
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

                                <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8 * 4) }]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            props?.confirmfalse()
                                        }}
                                        style={[{ backgroundColor: 'transparent', width: "48%", paddingVertical: _moderateScale(8), borderRadius: _moderateScale(8) }, styleElement.centerChild]}>
                                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: Color.BLACK_OPACITY_7 }}>
                                            Huỷ
                                        </Text>
                                    </TouchableOpacity>
                                    {
                                        perMicro == RESULTS.GRANTED && perCamera == RESULTS.GRANTED ?
                                            <TouchableOpacity
                                                onPress={() => {
                                                    props?.confirmTrue()
                                                }}
                                                style={[{ backgroundColor: Color.SECOND_COLOR, width: "48%", paddingVertical: _moderateScale(8), borderRadius: _moderateScale(8) }, styleElement.centerChild]}>
                                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: Color.WHITE }}>
                                                    Nhấc máy
                                                </Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                onPress={() => {
                                                    alertCustomNotAction(`Thông báo`,`Bạn cần phải cho phép quyền truy cập Camera và MicroPhone`)
                                                }}
                                                style={[{ backgroundColor: 'rgba(79, 173, 164,0.5)', width: "48%", paddingVertical: _moderateScale(8), borderRadius: _moderateScale(8) }, styleElement.centerChild]}>
                                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: Color.WHITE }}>
                                                    Nhấc máy
                                                </Text>
                                            </TouchableOpacity>
                                    }

                                </View>
                            </View>
                        </>
                        :
                        <></>
                }

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    btnInActive__child: {
        width: _moderateScale(8 * 2.5),
        height: _moderateScale(8 * 2.5),
        borderRadius: _moderateScale(8 * 1.5),
        backgroundColor: Color.WHITE
    },
    btnInActive: {
        width: _moderateScale(8 * 5.5),
        height: _moderateScale(8 * 3),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: Color.BG_GREY_OPACITY_7,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: _moderateScale(2)
    },
    btnActive__child: {
        width: _moderateScale(8 * 2.5),
        height: _moderateScale(8 * 2.5),
        borderRadius: _moderateScale(8 * 1.5),
        backgroundColor: Color.WHITE
    },
    btnActive: {
        width: _moderateScale(8 * 5.5),
        height: _moderateScale(8 * 3),
        borderRadius: _moderateScale(8 * 2),
        backgroundColor: Color.GREEN_SUCCESS,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: _moderateScale(2)
    },
    modalFilter: {
        width: "85%",
        backgroundColor: Color.WHITE,
        borderRadius: _widthScale(8 * 2),
        backgroundColor: Color.WHITE,
        paddingVertical: _heightScale(8 * 2)
    },
    viewContent: {
        paddingHorizontal: _widthScale(8 * 3),
    },
    content: {
        fontSize: _widthScale(14),
        // lineHeight: _heightScale(16),
        color: Color.GREY
    },
    cancelBtn: {
        alignSelf: 'flex-end',
        padding: _widthScale(8),
        marginTop: _heightScale(8),
    },
    cancelBtn__text: {
        fontSize: _widthScale(16),
        color: Color.BASE_COLOR
    }
})



export default ModalVideoCallHasCome;