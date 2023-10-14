import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale, _width } from '../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, BLACK_OPACITY_7, SECOND_COLOR, THIRD_COLOR, BLACK, RED } from '../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import moment from 'moment'
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'

const ModalSuccess = memo((props) => {
    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'center',
                paddingBottom: getBottomSpace() + _moderateScale(8 * 2)
            }}
            isVisible={props.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                // props?.hide()
            }}>

            <View style={styles.container}>
                <View style={[styleElement.rowAliCenter, { padding: _moderateScale(8 * 2), paddingBottom: 0 }]}>
                    <Text style={{ flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>

                    </Text>
                    <View style={{ alignItems: 'flex-end', }}>
                        <TouchableOpacity
                            onPress={() => {
                                props?.hide()
                            }}
                            style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                            <Image style={sizeIcon.xxxxs} source={require('../../NewIcon/xWhite.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    props?.data?.data?.awards?.length > 0 ?
                        <Image style={{
                            width: _moderateScale(8 * 20),
                            height: _moderateScale(8 * 20),
                            resizeMode: 'contain',
                            alignSelf: 'center',
                        }} source={require('../../Image/success.png')} />
                        :
                        <Image style={{
                            width: _moderateScale(8 * 20),
                            height: _moderateScale(8 * 20),
                            resizeMode: 'contain',
                            alignSelf: 'center',
                        }} source={require('../../Image/success.png')} />
                }



                {/* <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16), alignSelf: 'center', marginTop: _moderateScale(8 * 2) }}>
                    Chúc mừng bạn đã nhận được
                </Text> */}
                

                <View style={{ paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8) }}>
                    <Text
                        style={{ ...stylesFont.fontNolan500,textAlign:'center', fontSize: _moderateScale(16), alignSelf: 'center', color: RED, marginTop: _moderateScale(8 * 1) }}>
                        {props?.data?.data?.message}
                        {/* Giảm 100k ({props?.data?.luckyNumber}) */}
                    </Text>
                </View>

                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(12), alignSelf: 'center', marginTop: _moderateScale(8 * 8), color: GREY }}>
                    Đăng nhập mỗi ngày để có thêm nhiều lượt quay nhé!
                </Text>


            </View>

        </Modal>
    );
});


const styles = StyleSheet.create({
    container: {
        width: _width - _moderateScale(8 * 4),
        height: _moderateScale(8 * 50),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 4)
    }
})

export default ModalSuccess;