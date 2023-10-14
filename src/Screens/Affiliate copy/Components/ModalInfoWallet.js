import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { StyleSheet, Platform, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { _moderateScale } from '../../../Constant/Scale';
import { WHITE, BASE_COLOR, FIFTH_COLOR, BTN_PRICE, GREEN_SUCCESS, GREY, BG_SERVICE, BLACK_OPACITY_8, BLUE_FB, BG_GREY_OPACITY_5, RED, BG_BEAUTY, SECOND_COLOR, GREY_FOR_TITLE, BLUE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import _isEmpty from 'lodash/isEmpty'
import { alertCustomNotAction, formatMonney } from '../../../Constant/Utils';
import { uploadModule, createPaymentRequest } from '../../../Redux/Action/BookingAction';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey';

const ModalInfoWallet = memo((props) => {



    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'center',
            marginHorizontal: _moderateScale(8 * 4)
        }}
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={150}
            animationOutTiming={500}
            isVisible={props.show}
            backdropTransitionOutTiming={0}
            useNativeDriverForBackdrop={true}
            hideModalContentWhileAnimating={true}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props.hide()
            }}
            onBackdropPress={() => {
                props.hide()
            }}>
            <View style={[styles.container]}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    marginBottom: _moderateScale(4),
                    justifyContent: 'space-between'
                }}>
                    <Text style={{ color: GREY_FOR_TITLE }}>
                        CHI TIẾT VÍ
                        {/* {formatMonney(props?.data?.commissionAmount +
                            props?.data?.bonusAmount +
                            props?.data?.depositAmount)} */}
                    </Text>
                    <TouchableOpacity
                        onPress={props?.hide}
                        hitSlop={styleElement.hitslopSm}
                        style={{
                        }}>
                        <Image style={[sizeIcon.md]} source={require('../../../Icon/cancel.png')} />
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[styles.itemCol]}>
                        <Text style={[stylesFont.fontNolan500, styles.number, { color: BASE_COLOR }]}>
                            {/* {formatMonney(props?.data?.commissionAmount)} */}
                            {formatMonney(props?.commission?.orderCommission?.commissionAmountInMonth + props?.commission?.depositCommission?.commissionAmountInMonth)}
                        </Text>
                        <Text style={[styles.brief]}>
                            Hoa hồng dự kiến
                        </Text>
                    </View>
                    <View style={[styles.itemCol]}>
                        <Text style={[stylesFont.fontNolan500, styles.number, { color: SECOND_COLOR }]}>
                            {formatMonney(props?.data?.bonusAmount)}
                        </Text>
                        <Text style={[styles.brief]}>
                            Thưởng
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[styles.itemCol, { flex: 1, flexDirection: 'row' }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={[stylesFont.fontNolan500, styles.number, { color: '#5D5FEF' }]}>
                                {formatMonney(props?.data?.depositAmount)}
                            </Text>
                            <Text style={[styles.brief]}>
                                Nạp
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                props?.hide()
                                setTimeout(() => {
                                    props?.handleOpenModalCashIn()
                                }, 200);
                            }}
                            style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), paddingVertical: _moderateScale(4), borderWidth: _moderateScale(0.5), borderColor: WHITE, borderRadius: _moderateScale(4), backgroundColor: BLUE_FB }]}>
                            <Image style={[sizeIcon.xs]} source={require('../../../Icon/cashIn.png')} />
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE, marginLeft: _moderateScale(8) }]}>Nạp</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    width: "100%",
                    height: _moderateScale(0.5),
                    backgroundColor: BG_GREY_OPACITY_5,
                    marginVertical: _moderateScale(8)
                }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[styles.itemCol, { flex: 1, flexDirection: 'row' }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={[stylesFont.fontNolan500, styles.number, { color: GREY_FOR_TITLE }]}>
                                {/* {formatMonney(props?.commission?.orderCommission?.commissionAmountInMonth + props?.commission?.depositCommission?.commissionAmountInMonth)} */}
                                {formatMonney(props?.data?.commissionAmount)}
                            </Text>
                            <Text style={[styles.brief]}>
                                Hoa hồng khả dụng
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                props?.hide()
                                props?.handleWithDraw()
                            }}
                            style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), paddingVertical: _moderateScale(4), borderWidth: _moderateScale(0.5), borderColor: WHITE, borderRadius: _moderateScale(4), backgroundColor: BLUE_FB }]}>
                            <Image style={[sizeIcon.xs]} source={require('../../../Icon/cashOut.png')} />
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE, marginLeft: _moderateScale(8) }]}>Rút</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    width: "100%",
                    height: _moderateScale(0.5),
                    backgroundColor: BG_GREY_OPACITY_5,
                    marginVertical: _moderateScale(8)
                }} />

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[styles.itemCol, { flex: 1 }]}>
                        <Text style={[stylesFont.fontNolan500, styles.number, { color: RED }]}>
                            {formatMonney(props?.data?.liaTicketAmount)}

                        </Text>
                        <Text style={[styles.brief]}>
                            Xu LiA
                        </Text>

                        <View style={{ width: '100%', marginTop: _moderateScale(8 * 2), alignItems: 'flex-end', paddingHorizontal: _moderateScale(8 * 1) }}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.hide()
                                    navigation.navigate(ScreenKey.HISTORY_LIA_TICKET)
                                }}
                                style={[{
                                    backgroundColor: WHITE,
                                    paddingHorizontal: _moderateScale(8 * 1.5), paddingVertical: _moderateScale(4),
                                    borderRadius: _moderateScale(8)
                                }, shadow]}>
                                <Text>Xem lịch sử xu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> */}

                {/* <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 5) }]}>


                    <TouchableOpacity
                        onPress={() => {
                            props?.hide()
                            setTimeout(() => {
                                props?.handleOpenModalCashIn()
                            }, 200);
                        }}
                        style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), paddingVertical: _moderateScale(8), borderWidth: _moderateScale(0.5), borderColor: WHITE, borderRadius: _moderateScale(4), backgroundColor: BLUE_FB }]}>
                        <Image style={[sizeIcon.xs]} source={require('../../../Icon/cashIn.png')} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE, marginLeft: _moderateScale(8) }]}>Nạp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            props?.hide()
                            props?.handleWithDraw()
                        }}
                        style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), paddingVertical: _moderateScale(8), borderWidth: _moderateScale(0.5), borderColor: WHITE, borderRadius: _moderateScale(4), backgroundColor: BLUE_FB }]}>
                        <Image style={[sizeIcon.xs]} source={require('../../../Icon/cashOut.png')} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE, marginLeft: _moderateScale(8) }]}>Rút</Text>
                    </TouchableOpacity>
                </View> */}

            </View>
        </Modal>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,

    elevation: 1
}

const styles = StyleSheet.create({
    inputDeposit: {
        fontSize: _moderateScale(14),
        color: BLACK_OPACITY_8,
        borderWidth: _moderateScale(0.75),
        borderColor: BASE_COLOR,
        borderRadius: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        paddingHorizontal: _moderateScale(8 * 2)
    },
    btnAddImage: {
        marginHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(8),
        borderWidth: _moderateScale(1),
        borderColor: BG_GREY_OPACITY_5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: _moderateScale(8),
        width: _moderateScale(8 * 10),
        // height:_moderateScale(8*25)
    },
    btnCopy__text: {
        fontSize: _moderateScale(12),
        color: BLUE_FB,
        bottom: 1
    },
    btnCopy: {
        paddingVertical: _moderateScale(2),
        paddingHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(4),
        borderWidth: _moderateScale(1),
        borderColor: BLUE_FB
    },
    btnTabActive: {
        borderBottomWidth: _moderateScale(2),
        borderBottomColor: BTN_PRICE,
    },
    btnTab__text: {
        fontSize: _moderateScale(16),
        color: GREY
    },
    btnTab: {
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: _moderateScale(4),
        borderBottomWidth: _moderateScale(2),
        borderBottomColor: 'transparent'
    },
    btnService: {
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BG_SERVICE,
        marginRight: _moderateScale(8),
        marginTop: _moderateScale(8)
    },
    btnConfirm__text: {
        fontSize: _moderateScale(16),
        color: WHITE
    },
    btnConfirm: {
        width: "100%",
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        height: _moderateScale(8 * 4)
    },
    textInput: {
        height: _moderateScale(8 * 4),
        fontSize: _moderateScale(14),
        textAlignVertical: 'top'
    },
    btnStar: {
        padding: _moderateScale(8),

    },
    container: {
        width: "100%",
        // paddingVertical: _heightScale(30),
        paddingVertical: _moderateScale(20),
        // paddingBottom: _moderateScale(50),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(8)
    },
    itemCol: {
        backgroundColor: BG_BEAUTY,
        flex: 0.5,
        margin: _moderateScale(4),
        padding: _moderateScale(8),
        borderRadius: _moderateScale(4),
        alignItems: 'center'
    },
    brief: {
        color: GREY
    },
    number: {
        fontSize: _moderateScale(18)
    }
})

export default ModalInfoWallet;