import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale, _widthScale, _width } from '../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, BLACK_OPACITY_7, SECOND_COLOR, THIRD_COLOR, BLACK } from '../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../Constant/Url';
import { styleElement } from '../../Constant/StyleElement';
import { sizeIcon } from '../../Constant/Icon';
import moment from 'moment'
import { navigation } from '../../../rootNavigation';
import ScreenKey from '../../Navigation/ScreenKey'

const ModalListDiaryNotUpdate = memo((props) => {
    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'flex-end',
                paddingBottom: getBottomSpace() + _moderateScale(8 * 2)
            }}
            isVisible={props.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? true : true}
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                props?.hide()
            }}>

            <View style={styles.container}>
                <View style={[styleElement.rowAliCenter, { padding: _moderateScale(8 * 2) }]}>
                    <Text style={{ flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                        Danh sách nhật ký hẫu phẫu
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
                    props?.data?.map((item, index) => {
                        return (
                            <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginBottom: _moderateScale(8 * 2) }]}>
                                <Image
                                    style={{
                                        width: _moderateScale(8 * 5),
                                        height: _moderateScale(8 * 5),
                                        borderRadius: _moderateScale(8 * 1),
                                        borderWidth: 0.5,
                                        borderColor: GREY
                                    }}
                                    source={{ uri: `${URL_ORIGINAL}${item?.service?.representationFileArr[0]?.link}` }} />

                                <View style={{ flex: 1, paddingLeft: _moderateScale(8) }}>
                                    <Text numberOfLines={1} style={{ flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                                        {item?.serviceName}
                                    </Text>

                                    <Text style={{ flex: 1, ...stylesFont.fontNolan, fontSize: _moderateScale(14), color: BLACK_OPACITY_7 }}>
                                        Ngày thứ {item?.index}
                                    </Text>
                                </View>

                                <View style={{width:8*2}}/>

                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(ScreenKey.DIARY_OF_TREATMENT, { treatmentDailyDiary: item })
                                    }}
                                    style={{ backgroundColor: THIRD_COLOR, paddingHorizontal: _moderateScale(8), paddingVertical: _moderateScale(4), borderRadius: _moderateScale(4) }}>
                                    <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: BLACK_OPACITY_8 }}>
                                        Cập nhật
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        )
                    })
                }



            </View>

        </Modal>
    );
});


const styles = StyleSheet.create({
    container: {
        width: _width - _moderateScale(8 * 4),
        // height: _moderateScale(8 * 30),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 4)
    }
})

export default ModalListDiaryNotUpdate;