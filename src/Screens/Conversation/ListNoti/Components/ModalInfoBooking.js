import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { StyleSheet, Platform, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { _moderateScale } from '../../../../Constant/Scale';
import { WHITE, BASE_COLOR, FIFTH_COLOR, BTN_PRICE, GREEN_SUCCESS, GREY, BG_SERVICE, RED } from '../../../../Constant/Color';
import { stylesFont } from '../../../../Constant/Font';
import { styleElement } from '../../../../Constant/StyleElement';
import { sizeIcon } from '../../../../Constant/Icon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ModalAddDeposit from './ModalAddDeposit'
import { alertCustomNotAction } from '../../../../Constant/Utils';
import moment from 'moment'

const ModalInfoBooking = ((props) => {

    const [showModalAddDeposit, setShowModalAddDeposit] = useState(false)

    useEffect(() => {
        // console.log(props?.data)
    }, [props?.data])

    const _renderStatusBooking = () => {
        switch (props?.data?.status) {
            case "WAIT":
                return (
                    <Text style={[stylesFont.fontNolan500, { color: "#969696" }]}>
                        Chưa CheckIn
                    </Text>
                )
            case "WAS_CHECK_IN":
                return (
                    <Text style={[stylesFont.fontNolan500, { color: "#ff7c22" }]}>
                        Đã CheckIn
                    </Text>
                )
            case "WAIT_CONSULTATION":
                return (
                    <Text style={[stylesFont.fontNolan500, { color: "#5d02ec" }]}>
                        Chờ tư vấn
                    </Text>
                )
            case "IS_CONSULTING":
                return (
                    <Text style={[stylesFont.fontNolan500, { color: "#0b7ad2" }]}>
                        Đang tư vấn
                    </Text>
                )
            case "WAS_CONSULTED":
                return (
                    <Text style={[stylesFont.fontNolan500, { color: "#30CCFF" }]}>
                        Đã tư vấn
                    </Text>
                )
            case "WAIT_PROGRESS":
                return (
                    <Text style={[stylesFont.fontNolan500, { color: "#5d02ec" }]}>
                        Chờ điều trị
                    </Text>
                )
            case "IN_PROGRESS":
                return (
                    <Text style={[stylesFont.fontNolan500, { color: "#0b7ad2" }]}>
                        Đang điều trị
                    </Text>
                )
            case "COMPLETE_PROGRESS":
                return (
                    <Text style={[stylesFont.fontNolan500, { color: "#019801" }]}>
                        Đã điều trị
                    </Text>
                )
            case "WAS_CHECK_OUT":
                return (
                    <Text style={[stylesFont.fontNolan500, { color: GREEN_SUCCESS }]}>
                        Đã CheckOut
                    </Text>
                )
            case "CANCEL":
                return (
                    <Text style={[stylesFont.fontNolan500, { color: RED }]}>
                        Đã Huỷ
                    </Text>
                )

            default:
                break;
        }
    }

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
            coverScreen={Platform.OS == "ios" ? true : true}
            onBackButtonPress={() => {
                props.hide()
            }}
            onBackdropPress={() => {
                props.hide()
            }}>
            <View style={[styles.container]}>

                <ModalAddDeposit
                    data={props?.data}
                    hide={() => setShowModalAddDeposit(false)}
                    hideAll={() => {
                        setShowModalAddDeposit(false)
                        props?.hide()
                    }}
                    show={showModalAddDeposit} />


                <KeyboardAwareScrollView
                    extraHeight={100}
                    enableAutomaticScroll={true}
                    extraScrollHeight={100}
                >

                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: "#EC3A79", alignSelf: 'center' }]}>
                        CHI TIẾT BOOKING
                    </Text>

                    <Text style={[stylesFont.fontNolan500, { textTransform: 'uppercase', fontSize: _moderateScale(16), color: "#EC3A79", marginTop: _moderateScale(8 * 3) }]}>
                        {props?.data?.partnerName}
                    </Text>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: GREY, marginTop: _moderateScale(8) }]}>
                        Chi nhánh:  {
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: '#EC3A79' }]}>
                                {
                                    props?.data?.branch?.name
                                }
                            </Text>
                        }
                    </Text>
                    <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: GREY, marginTop: _moderateScale(0) }]}>
                        {props?.data?.branch?.address}
                    </Text>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: _moderateScale(8) }}>
                        {
                            props?.data?.servicesNeedCare?.map((item, index) => {
                                return (
                                    <View key={index} style={styles.btnService}>
                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: WHITE }]}>
                                            {item?.name}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </View>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: GREY, marginTop: _moderateScale(8) }]}>
                        Thời gian:  {
                            <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: '#EC3A79' }]}>
                                {moment(props?.data?.appointmentDateFinal?.from?.dateTime).format('LT')} ->  {moment(props?.data?.appointmentDateFinal?.to?.dateTime).format('LT')}
                            </Text>
                        }
                    </Text>
                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(18), color: BG_SERVICE, alignSelf: 'flex-end' }]}>
                        {moment(props?.data?.appointmentDateFinal?.date).format("DD/MM/YYYY")}
                    </Text>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: GREY, marginTop: _moderateScale(8) }]}>
                        Trạng thái:  {
                            _renderStatusBooking()
                        }
                    </Text>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BASE_COLOR, marginTop: _moderateScale(8 * 2), marginLeft: _moderateScale(8) }]}>
                        Ghi chú
                    </Text>
                    <View style={{ backgroundColor: FIFTH_COLOR, width: "100%", padding: _moderateScale(8 * 2), borderRadius: _moderateScale(8), marginTop: _moderateScale(8) }}>
                        {/* <TextInput
                            // scrollEnabled={false}
                            multiline
                            placeholder={'Nhập chú thích'}
                            style={styles.textInput} /> */}
                        <Text style={styles.textInput} >
                            {props?.data?.description}
                        </Text>
                    </View>

                    <View style={[styleElement.rowAliCenter, { justifyContent: 'space-between', marginTop: _moderateScale(8 * 5) }]}>
                        <TouchableOpacity
                            onPress={props?.hide}
                            style={[styles.btnConfirm, { backgroundColor: BTN_PRICE }]}>
                            <Text style={[stylesFont.fontNolanBold, styles.btnConfirm__text]}>
                                Huỷ
                            </Text>
                        </TouchableOpacity>
                        {
                            props?.data?.status == "WAIT" ?
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModalAddDeposit(true)
                                    }}
                                    style={[styles.btnConfirm, { backgroundColor: GREEN_SUCCESS }]}>
                                    <Text style={[stylesFont.fontNolanBold, styles.btnConfirm__text]}>
                                        Đặt cọc
                                    </Text>
                                </TouchableOpacity>
                                : <></>

                        }

                    </View>

                    <View style={{ height: _moderateScale(8 * 3) }} />

                </KeyboardAwareScrollView>

            </View>
        </Modal>
    );
});


const styles = StyleSheet.create({
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
        width: "45%",
        borderRadius: _moderateScale(8 * 2),
        justifyContent: 'center',
        alignItems: 'center',
        height: _moderateScale(8 * 4)
    },
    textInput: {
        height: _moderateScale(8 * 8),
        fontSize: _moderateScale(14),
        textAlignVertical: 'top'
    },
    btnStar: {
        padding: _moderateScale(8),

    },
    container: {
        width: "100%",
        // paddingVertical: _heightScale(30),
        paddingTop: _moderateScale(20),
        // paddingBottom: _moderateScale(50),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(23),
        borderRadius: _moderateScale(8)
    },
})

export default ModalInfoBooking;