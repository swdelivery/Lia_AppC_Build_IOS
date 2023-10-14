import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale, _width, _heightScale } from '../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, BLACK_OPACITY_7, SECOND_COLOR, THIRD_COLOR, BLACK, RED, GREY_FOR_TITLE } from '../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import moment from 'moment'
import { navigation } from '../../../rootNavigation';
import ScreenKey, { AFFILIATE } from '../../Navigation/ScreenKey'
import { getConfigFileByCode } from '../../Redux/Action/SpinWheelAction';
import { formatMonney } from '../../Constant/Utils';
import { useSelector } from 'react-redux';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'

const ModalCongrats = memo((props) => {

    const [imageFeedbackDone, setImageFeedbackDone] = useState({})
    const isShowModalCongrats = useSelector(state => state?.walletReducer?.isShowModalGetReward)


    useEffect(() => {
        _getConfigFile()
    }, [])

    const _getConfigFile = async () => {
        let result = await getConfigFileByCode('DONE_FEEDBACK');
        if (result?.isAxiosError) return
        setImageFeedbackDone(result?.data?.data)
    }

    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'center',
                paddingBottom: getBottomSpace() + _heightScale(8 * 10)
            }}
            isVisible={isShowModalCongrats?.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                // props?.hide()
            }}
            onBackdropPress={() => {
                // props?.hide()
            }}>

            <View style={styles.container}>

                {
                    imageFeedbackDone?._id ?
                        <ImageBackground
                            style={{
                                width: "100%",
                                height: _moderateScale(8 * 70),
                                alignSelf: 'center'
                            }}
                            resizeMode={'cover'}
                            source={{
                                uri: `${URL_ORIGINAL}${imageFeedbackDone?.fileArr[0].link}`
                            }} >

                            <View style={[styleElement.rowAliCenter, { padding: _moderateScale(8 * 2), paddingBottom: 0 }]}>
                                <Text style={{ flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>

                                </Text>
                                <View style={{ alignItems: 'flex-end', }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // props?.hide()
                                            store.dispatch({
                                                type: ActionType.SHOW_MODAL_GET_REWARD,
                                                payload: {
                                                    data: {
                                                        show: false,
                                                        data:{}
                                                    }
                                                }
                                            })
                                        }}
                                        style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                                        <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 1 }} />

                            <View style={[{
                                width: _moderateScale(8 * 30),
                                height: _moderateScale(8 * 5),
                                borderRadius: _moderateScale(8 * 2),
                                alignSelf: 'center',
                                backgroundColor: '#FAF5DC',
                                marginBottom: _moderateScale(8 * 2)
                            }, styleElement.centerChild]}>
                                <Text style={{
                                    ...stylesFont.fontNolanBold,
                                    fontSize: _moderateScale(14),
                                    color: GREY_FOR_TITLE
                                }}>
                                   Trang Beauty tặng bạn {formatMonney(isShowModalCongrats?.data?.totalAmount)}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    store.dispatch({
                                        type: ActionType.SHOW_MODAL_GET_REWARD,
                                        payload: {
                                            data: {
                                                show: false,
                                                data:{}
                                            }
                                        }
                                    })
                                    navigation.navigate(AFFILIATE, { showModalInfoWallet: true })
                                }}
                                style={[styleElement.centerChild, {
                                    width: _moderateScale(8 * 37),
                                    height: _moderateScale(8 * 5),
                                    borderRadius: _moderateScale(8 * 2),
                                    alignSelf: 'center',
                                    backgroundColor: '#F95067'
                                }]}>
                                <Text style={{
                                    ...stylesFont.fontNolanBold,
                                    color: WHITE,
                                    fontSize: _moderateScale(15)
                                }}>
                                    NHẬN THƯỞNG
                                </Text>
                            </TouchableOpacity>
                            <View style={{ height: _moderateScale(8 * 5) }} />

                        </ImageBackground>
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

export default ModalCongrats;