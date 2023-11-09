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

const ModalInfoCoupon = memo((props) => {

    return (
        <Modal
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: 'flex-end',
            }}
            isVisible={props.show}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
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
                            Thông tin Voucher
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

                        <View style={[{
                            width: "90%",
                            minHeight: _moderateScale(8 * 13),
                            // borderWidth:1,
                            borderRadius: _moderateScale(8),
                            alignSelf: 'center',
                            backgroundColor: WHITE,
                            paddingBottom: _moderateScale(8 * 2)
                        }, shadow]}>
                            <View style={{
                                paddingHorizontal: _moderateScale(8 * 1.5),
                                paddingVertical: _moderateScale(2),
                                borderRadius: _moderateScale(8),
                                backgroundColor: SECOND_COLOR,
                                alignSelf: 'center',
                                marginTop: _moderateScale(8)
                            }}>
                                <Text style={{ ...stylesFont.fontNolanBold, color: WHITE, bottom: 1, fontSize: _moderateScale(14) }}>
                                    {
                                        props?.data?.couponCode
                                    }
                                </Text>
                            </View>

                            <Text style={{ ...stylesFont.fontNolan500, color: BLACK, bottom: 1, fontSize: _moderateScale(18), textAlign: 'center', alignSelf: 'center', marginTop: _moderateScale(8 * 1) }}>
                                {
                                    props?.data?.coupon?.name
                                }
                            </Text>

                            <Text style={{ ...stylesFont.fontNolan500, color: GREY, bottom: 1, fontSize: _moderateScale(14), alignSelf: 'center', marginTop: _moderateScale(8 * 1) }}>
                                {
                                    `Sử dụng đến ${moment(props?.data?.coupon?.expiredAt).format('DD.MM.YYYY')}`
                                }
                            </Text>
                        </View>

                        <View style={{ paddingHorizontal: _moderateScale(8), marginTop: _moderateScale(8 * 2) }}>
                            <Text style={{ ...stylesFont.fontNolan500, color: BLACK_OPACITY_8, fontSize: _moderateScale(14) }}>
                                {
                                    props?.data?.coupon?.description
                                }
                                {/* ode: "CP2"created: "2021-12-27T06:36:15.663Z"created: "2021-1created: "2021-12-27T06:36:15.663Z"created: "2021-12-27T06:36:15.663Z"2-27T06:36:15.663Z"created: "2021-12-27T06:36:15.663Z"created: "2021-12-27T06:36:15.663Z"created: "2021-12-27T06:36:15.663Z"created: "2021-12-27T06:36:15.663Z"
                                created: "2021-12-27T06:36:15.663Z"
                                description: ""
                                discountAmount: 5
                                discountFor: "everyBody"
                                discountType: "percent"
                                expiredAt: "2021-12-29T02:17:19.806Z"
                                isActive: true
                                isDelete: false
                                limit: null
                                maxAmountDiscount: 500000
                                minRequiredOrderAmount: 50000000
                                name: "Coupon Test 2"
                                updated: "2021-12-27T06:36:15.663Z"
                                usage: 0 */}
                            </Text>
                        </View>
                        <View style={{ height: _moderateScale(8 * 5) }} />
                    </ScrollView>

                    <TouchableOpacity
                        onPress={() => {
                            props?.confirmCoupon(props?.data)
                        }}
                        style={[{
                            height: _moderateScale(8 * 5),
                            backgroundColor: WHITE,
                            marginHorizontal: _moderateScale(8 * 2),
                            borderRadius: _moderateScale(8),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: BASE_COLOR,
                            marginVertical: _moderateScale(8),
                            marginBottom: getBottomSpace() + _moderateScale(8)
                        }]}>

                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: WHITE }]}>
                            Sử dụng Voucher
                        </Text>
                    </TouchableOpacity>

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
        width: _width,
        height: _heightScale(8 * 80),
        backgroundColor: WHITE,
        borderRadius: _moderateScale(8 * 2),
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
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


export default ModalInfoCoupon;