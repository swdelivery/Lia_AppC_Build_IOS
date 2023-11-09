import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { Platform, KeyboardAvoidingView, Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale, _width, _heightScale } from '../../../Constant/Scale';
import { WHITE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY, BLACK_OPACITY_8, BLUE_FB, GREY_FOR_TITLE, SECOND_COLOR, BLACK, BASE_COLOR } from '../../../Constant/Color';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import InputSearch from '../../LoseWeight/Components/InputSearch';
import _isEmpty from 'lodash/isEmpty'
import { navigation } from '../../../../rootNavigation';
import { getAssetGroup } from '../../../Redux/Action/LoseWeightAction'
import slugify from 'slugify';
import { getListBranchV2 } from '../../../Redux/Action/BranchAction';
import { getAllDoctorv2 } from '../../../Redux/Action/DoctorAction';
import moment from 'moment'
import RenderHtml from 'react-native-render-html';
import { getConfigData } from '../../../Redux/Action/OrtherAction';
import { alertCustomNotAction } from '../../../Constant/Utils';

const ModalTheLeFlashSale = memo((props) => {

    const [configThele, setConfigThele] = useState({})

    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        _getConfigThele()
    }, [])

    const _getConfigThele = async () => {
        let result = await getConfigData("FLASH_SALE_RULE")
        if (result?.isAxiosError) return
        setConfigThele(result)
    }

    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'center',
            }}
            isVisible={props.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onModalHide={()=>{
                setIsChecked(false)
            }}
            onBackButtonPress={() => {
                props?.hide()
            }}
            onBackdropPress={() => {
                props?.hide()
            }}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'position' : null}
                enabled
            >
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: _moderateScale(8 * 2), paddingTop: _moderateScale(8 * 2) }}>
                        <View style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100, opacity: 0 }}>
                            <Image style={sizeIcon.xxxxs} source={require('../../../NewIcon/xWhite.png')} />
                        </View>
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                            Thể lệ Flash Sale
                            </Text>
                        <TouchableOpacity
                            onPress={() => {
                                props?.hide()
                            }}
                            style={{ padding: _moderateScale(8), backgroundColor: '#C4C4C4', borderRadius: 100 }}>
                            <Image style={sizeIcon.xxxxs} source={require('../../../NewIcon/xWhite.png')} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                        <View style={{ height: _moderateScale(8 * 2) }} />
                        <RenderHtml
                            contentWidth={_width - _widthScale(8 * 4)}
                            source={{ html: `${configThele?.value}` }}
                            enableExperimentalBRCollapsing={true}
                            enableExperimentalMarginCollapsing={true}
                        />

                        <View style={{ height: _moderateScale(8 * 5) }} />
                    </ScrollView>

                    <View style={{ marginTop: _moderateScale(8 * 2), marginHorizontal: _moderateScale(8 * 2) }}>
                        {
                            isChecked ?
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsChecked(false)
                                    }}
                                    style={{
                                        flexDirection: 'row'
                                    }}>
                                    <Image style={[sizeIcon.md]} source={require('../../../NewIcon/acheck.png')} />
                                    <Text style={{ color: SECOND_COLOR, flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(14), marginLeft: _moderateScale(4) }}>
                                        Tôi đã đọc và đồng ý với mọi điều khoản.
                                </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsChecked(true)
                                    }}
                                    style={{
                                        flexDirection: 'row'
                                    }}>
                                    <Image style={[sizeIcon.md]} source={require('../../../NewIcon/icheck.png')} />
                                    <Text style={{ flex: 1, ...stylesFont.fontNolan500, fontSize: _moderateScale(14), marginLeft: _moderateScale(4) }}>
                                        Tôi đã đọc và đồng ý với mọi điều khoản.
                                </Text>
                                </TouchableOpacity>
                        }
                    </View>

                    <View style={[
                        { marginVertical: _moderateScale(8 * 2), marginHorizontal: _moderateScale(8 * 2) },
                        isChecked ? { opacity: 1 } : { opacity: 0.4 }
                    ]}>
                        <TouchableOpacity
                            onPress={() => {
                                if (!isChecked) {
                                    alertCustomNotAction(`Thông báo`, `Vui lòng đọc và đồng ý với mọi điều khoản`)
                                } else {
                                    props?.confirm()
                                }
                            }}
                            style={[{
                                height: _moderateScale(8 * 4),
                                backgroundColor: WHITE,
                                borderRadius: _moderateScale(8),
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: BASE_COLOR,
                            }]}>

                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14), color: WHITE }]}>
                                Xác nhận lịch hẹn
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </KeyboardAvoidingView>
        </Modal>
    );
});


const styles = StyleSheet.create({
    btnBranch__nameBranch: {
        flex: 1,
        ...stylesFont.fontNolan500,
        fontSize: _moderateScale(14),
        color: GREY_FOR_TITLE
    },
    btnBranch: {
        backgroundColor: BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(8),
        marginBottom: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2)
    },
    backAndTitle: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingTop: _moderateScale(8 * 2),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    btnConfirm: {
        marginHorizontal: _moderateScale(8 * 2),
        backgroundColor: BLUE_FB,
        paddingVertical: _moderateScale(6),
        marginTop: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: _width - _moderateScale(8 * 8),
        height: _heightScale(8 * 65),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        // paddingBottom: _moderateScale(8 * 3)
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


export default ModalTheLeFlashSale;