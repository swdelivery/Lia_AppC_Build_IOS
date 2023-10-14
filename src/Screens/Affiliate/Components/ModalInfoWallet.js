import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { StyleSheet, Platform, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { _moderateScale } from '../../../Constant/Scale';
import { WHITE, BASE_COLOR, FIFTH_COLOR, BTN_PRICE, GREEN_SUCCESS, GREY, BG_SERVICE, BLACK_OPACITY_8, BLUE_FB, BG_GREY_OPACITY_5, RED, BG_BEAUTY, SECOND_COLOR, GREY_FOR_TITLE, BLUE, PRICE_ORANGE } from '../../../Constant/Color';
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
import { getConfigData } from '../../../Redux/Action/OrtherAction';

const ModalInfoWallet = memo((props) => {

    const [valueLIA_BONUS_DES, setValueLIA_BONUS_DES] = useState({})
    const [valueLIA_WITHDRAW_DES, setValueLIA_WITHDRAW_DES] = useState({})
    const [valueLIA_COMISSION_DES, setValueLIA_COMISSION_DES] = useState({})

    useEffect(() => {
        _getData()
    }, [])

    const _getData = async () => {
        let result = await getConfigData("LIA_BONUS_DES")
        if(result?.isAxiosError)return
        setValueLIA_BONUS_DES(result)

        let result2 = await getConfigData("LIA_WITHDRAW_DES")
        if(result2?.isAxiosError)return
        setValueLIA_WITHDRAW_DES(result2)

        let result3 = await getConfigData("LIA_COMISSION_DES")
        if(result3?.isAxiosError)return
        setValueLIA_COMISSION_DES(result3)
    }

    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'center',
            marginHorizontal: _moderateScale(8 * 2)
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
                    <Image style={[sizeIcon.md, { opacity: 0 }]} source={require('../../../Icon/cancel.png')} />
                    <Text style={{ color: GREY_FOR_TITLE }}>
                        CHI TIẾT VÍ
                    </Text>
                    <TouchableOpacity
                        onPress={props?.hide}
                        hitSlop={styleElement.hitslopSm}
                        style={{
                        }}>
                        <Image style={[sizeIcon.md]} source={require('../../../Icon/cancel.png')} />
                    </TouchableOpacity>

                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.itemCol]}>
                            <Text style={[stylesFont.fontNolanBold, styles.number, { color: PRICE_ORANGE }]}>
                                {formatMonney(props?.data?.bonusAmount)}
                            </Text>
                            <Text style={[styles.brief]}>
                                Tiền thưởng
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.itemCol, { flex: 1, flexDirection: 'row' }]}>
                            <View style={{ flex: 1 }}>
                                <Text style={[stylesFont.fontNolanBold, styles.number, { color: '#5D5FEF' }]}>
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

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.itemCol, { flex: 1, flexDirection: 'row' }]}>
                            <View style={{ flex: 1 }}>
                                <Text style={[stylesFont.fontNolanBold, styles.number, { color: GREEN_SUCCESS }]}>
                                    {/* {formatMonney(props?.commission?.orderCommission?.commissionAmountInMonth + props?.commission?.depositCommission?.commissionAmountInMonth)} */}
                                    {formatMonney(props?.data?.commissionAmount)}
                                </Text>
                                <Text style={[styles.brief]}>
                                    Hoa hồng khả dụng
                                </Text>
                            </View>
                            {
                                props?.data?.commissionAmount ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            props?.hide()
                                            props?.handleWithDraw()
                                        }}
                                        style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), paddingVertical: _moderateScale(4), borderWidth: _moderateScale(0.5), borderColor: WHITE, borderRadius: _moderateScale(4), backgroundColor: BLUE_FB }]}>
                                        <Image style={[sizeIcon.xs]} source={require('../../../Icon/cashOut.png')} />
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: WHITE, marginLeft: _moderateScale(8) }]}>Rút</Text>
                                    </TouchableOpacity>
                                    :
                                    <></>
                            }

                        </View>
                    </View>

                    <View style={{ marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(4) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                width: _moderateScale(4),
                                height: _moderateScale(8 * 2.5),
                                backgroundColor: PRICE_ORANGE,
                                marginRight: _moderateScale(8)
                            }} />
                            <Text style={{
                                ...stylesFont.fontNolanBold,
                                fontSize: _moderateScale(14)
                            }}>
                                Tiền thưởng
                            </Text>
                        </View>
                        <Text style={{
                            ...stylesFont.fontNolan500,
                            fontSize: _moderateScale(14),
                            marginHorizontal: _moderateScale(8 * 1.5),
                            textAlign: 'justify'
                        }}>
                           {valueLIA_BONUS_DES?.value}
                        </Text>
                    </View>

                    <View style={{ marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(4) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                width: _moderateScale(4),
                                height: _moderateScale(8 * 2.5),
                                backgroundColor: "#5D5FEF",
                                marginRight: _moderateScale(8)
                            }} />
                            <Text style={{
                                ...stylesFont.fontNolanBold,
                                fontSize: _moderateScale(14)
                            }}>
                                Tiền nạp
                            </Text>
                        </View>
                        <Text style={{
                            ...stylesFont.fontNolan500,
                            fontSize: _moderateScale(14),
                            marginHorizontal: _moderateScale(8 * 1.5),
                            textAlign: 'justify'
                        }}>
                            {/* Là số tiền khách hàng nạp vào ví, để thanh toán các hóa đơn dịch vụ. Khách hàng không được rút hay chuyển đổi thành tiền mặt. */}
                            {valueLIA_WITHDRAW_DES?.value}
                        </Text>
                    </View>

                    <View style={{ marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(4) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                width: _moderateScale(4),
                                height: _moderateScale(8 * 2.5),
                                backgroundColor: GREEN_SUCCESS,
                                marginRight: _moderateScale(8)
                            }} />
                            <Text style={{
                                ...stylesFont.fontNolanBold,
                                fontSize: _moderateScale(14)
                            }}>
                                Hoa hồng khả dụng
                            </Text>
                        </View>
                        <Text style={{
                            ...stylesFont.fontNolan500,
                            fontSize: _moderateScale(14),
                            marginHorizontal: _moderateScale(8 * 1.5),
                            textAlign: 'justify'
                        }}>
                            {/* Là số tiền khách hàng nhận được từ chương trình cộng tác viên.
                            Khách hàng có thể rút trực tiếp tại cơ sở hoặc nhận qua ngân hàng. */}
                            {valueLIA_COMISSION_DES?.value}
                        </Text>
                    </View>

                        <View style={{height:100}}/>
                </ScrollView>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenKey.CREATE_BOOKING)
                    }}
                    style={[{
                        height: _moderateScale(8 * 5),
                        backgroundColor: WHITE,
                        borderRadius: _moderateScale(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: BASE_COLOR,
                        marginTop:8
                        // flex: 1
                    }]}>

                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                        Đặt hẹn ngay
                    </Text>

                    <Image style={[sizeIcon.md, { position: 'absolute', right: 16 }]} source={require('../../../NewIcon/arrowRightWhite.png')} />
                    <Image style={[sizeIcon.md, { position: 'absolute', right: 16 + 8 }]} source={require('../../../NewIcon/arrowRightWhite.png')} />
                </TouchableOpacity>


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
        height: '80%',
        // paddingVertical: _heightScale(30),
        paddingVertical: _moderateScale(20),
        // paddingBottom: _moderateScale(50),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(8),
        borderRadius: _moderateScale(8)
    },
    itemCol: {
        backgroundColor: BG_BEAUTY,
        flex: 1,
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