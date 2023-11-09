import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale, _width, _heightScale } from '../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, BLACK_OPACITY_7, SECOND_COLOR, THIRD_COLOR, BLACK, RED } from '../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import moment from 'moment'
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'
import { getNotificationForPartnerV2, partnerReadNotification } from '../../Redux/Action/NotificationAction';
import { getConfigFileByCode } from '../../Redux/Action/SpinWheelAction';
import { useDispatch } from 'react-redux';

const ModalFisrtLoginSuccess = memo((props) => {
    const dispatch = useDispatch()

    const [isShow, setIsShow] = useState(false);
    const [popup, setPopup] = useState({})

    useEffect(() => {
        _getData();

    }, [])

    const _getData = async () => {
        let result = await getNotificationForPartnerV2({
            limit: 5
        })

        let idNoti = null;

        if (result?.data?.data?.find(item => {
            if (item?.content == "Bạn được tặng 1 lượt quay và 1000000 tiền thưởng vì đã đăng ký tài khoản" && !item?.seenAt) {
                idNoti = item?._id
                return true
            } else return false
        })) {
            let result = await getConfigFileByCode('POPUP_GET_REWARD');
            if (result?.isAxiosError) return;
            setTimeout(() => {
                setIsShow(true)
            }, 500);
            setPopup(result?.data?.data)
            if(idNoti){
                dispatch(partnerReadNotification({
                    arrayId: [idNoti]
                }))
            }
           

        }

        // if (result?.data?.data?.find(item => {
        //     if (item?.content == "Bạn được tặng 1 lượt quay và 1000000 tiền thưởng vì đã đăng ký tài khoản" && !item?.seenAt) {
        //         return true
        //     }
        // })) {

        // }
    }

    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'center',
                paddingBottom: getBottomSpace() + _heightScale(8 * 10)
            }}
            isVisible={isShow}
            useNativeDriver={true}
            animationIn={'bounceIn'}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                // setIsShow(false)
            }}
            onBackdropPress={() => {
                // setIsShow(false)
            }}>

            <View style={styles.container}>

                {
                    popup?.fileArr?.length > 0 ?
                        <TouchableOpacity onPress={() => {
                            setIsShow(false)
                            navigation.navigate(ScreenKey.AFFILIATE, { showModalInfoWallet: true })
                        }}>
                            <ImageBackground
                                style={{
                                    width: "100%",
                                    height: _moderateScale(8 * 50),
                                    resizeMode: 'contain',
                                    alignSelf: 'center'
                                }}
                                source={{
                                    uri: `${URL_ORIGINAL}${popup?.fileArr[0]?.link}`
                                }} >

                                <View style={[styleElement.rowAliCenter, { padding: _moderateScale(8 * 2), paddingBottom: 0 }]}>
                                    <Text style={{ flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>

                                    </Text>
                                    <View style={{ alignItems: 'flex-end', }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setIsShow(false)
                                            }}
                                            style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                                            <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </ImageBackground>
                        </TouchableOpacity>
                        :
                        <></>
                }


            </View>

        </Modal>
    );
});


const styles = StyleSheet.create({
    container: {
        width: _width - _moderateScale(8 * 4),
        height: _moderateScale(8 * 50),
        backgroundColor: 'transparent',
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 4)
    }
})

export default ModalFisrtLoginSuccess;
