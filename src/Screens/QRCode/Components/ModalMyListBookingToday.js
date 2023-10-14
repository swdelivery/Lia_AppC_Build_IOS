import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal'
import { StyleSheet, Platform, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { _moderateScale } from '../../../Constant/Scale';
import { WHITE, BASE_COLOR, FIFTH_COLOR, BTN_PRICE, GREEN_SUCCESS, GREY, BG_SERVICE, BG_GREY_OPACITY_5, BLUE_FB } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { alertCustomNotAction } from '../../../Constant/Utils';
import moment from 'moment'
import _isEmpty from 'lodash/isEmpty'

const ModalMyListBookingToday = memo((props) => {

    const [currChoice, setCurrChoice] = useState(null)

    useEffect(() => {
        console.log(props?.data)
    }, [props?.data])
    

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
            coverScreen={Platform.OS == "ios" ? true : true}
            onBackButtonPress={() => {
                props.hide()
            }}
            onBackdropPress={() => {
                props.hide()
            }}>
            <View style={[styles.container]}>


                <View style={{ flex: 1 }}>

                    <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BASE_COLOR, alignSelf: 'center' }]}>
                        Danh sách Booking
                    </Text>

                    <ScrollView>
                        <View style={{ height: _moderateScale(8 * 2) }} />

                        {
                            props?.data?.map((item, index) => {
                                return (

                                    <TouchableOpacity
                                        onPress={() => setCurrChoice(item?._id)}
                                        key={index} style={[styles.cardBooking, item?._id == currChoice && { borderColor:BASE_COLOR }]}>
                                        <View style={[styleElement.rowAliTop]}>
                                            <Text style={[stylesFont.fontNolan500, { flex: 1, marginRight: _moderateScale(8 * 2), textTransform: 'uppercase', fontSize: _moderateScale(16), color:BLUE_FB, marginTop: _moderateScale(0) }]}>
                                                {item?.partnerName}
                                            </Text>

                                            {
                                                item?._id == currChoice ?
                                                    <View
                                                        // onPress={() => _handleRemoveService(item)}
                                                        style={{
                                                            width: _moderateScale(8 * 4),
                                                            height: _moderateScale(8 * 4),
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                        <View style={{
                                                            width: _moderateScale(8 * 3),
                                                            height: _moderateScale(8 * 3),
                                                            borderRadius: _moderateScale(8 * 3 / 2),
                                                            borderWidth: _moderateScale(2),
                                                            borderColor: BASE_COLOR,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            <View style={{
                                                                width: _moderateScale(8 * 2),
                                                                height: _moderateScale(8 * 2),
                                                                borderRadius: _moderateScale(8 * 2 / 2),
                                                                backgroundColor:BASE_COLOR
                                                            }} />
                                                        </View>
                                                    </View>
                                                    :
                                                    <View
                                                        // onPress={() => {
                                                        //     _handleNavigatePickDoctor(item)
                                                        // }}
                                                        style={{
                                                            width: _moderateScale(8 * 4),
                                                            height: _moderateScale(8 * 4),
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                        <View style={{
                                                            width: _moderateScale(8 * 3),
                                                            height: _moderateScale(8 * 3),
                                                            borderRadius: _moderateScale(8 * 3 / 2),
                                                            borderWidth: _moderateScale(2),
                                                            borderColor: BG_GREY_OPACITY_5
                                                        }}>
                                                        </View>
                                                    </View>
                                            }

                                        </View>

                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: GREY, marginTop: _moderateScale(0) }]}>
                                            Chi nhánh: {
                                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: BLUE_FB }]}>
                                                    {
                                                        item?.branch?.name
                                                    }
                                                </Text>
                                            }
                                        </Text>
                                        <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(14), color: GREY, marginTop: _moderateScale(0) }]}>
                                            {item?.branch?.address}
                                        </Text>

                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: _moderateScale(8) }}>
                                            {
                                                item?.servicesNeedCare?.map((itemMap, index) => {
                                                    return (
                                                        <View key={index} style={styles.btnService}>
                                                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: WHITE }]}>
                                                                {itemMap?.name}
                                                            </Text>
                                                        </View> 
                                                    )
                                                })
                                            }
                                        </View>

                                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: GREY, marginTop: _moderateScale(8) }]}>
                                            Thời gian:     {
                                                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: '#EC3A79' }]}>
                                                    {moment(item?.appointmentDateFinal?.from?.dateTime).format('LT')} ->  {moment(item?.appointmentDateFinal?.to?.dateTime).format('LT')}
                                                </Text>
                                            }
                                        </Text>
                                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(18), color: BG_SERVICE, alignSelf: 'flex-end' }]}>
                                            {moment(item?.appointmentDateFinal?.date).format("DD/MM/YYYY")}
                                        </Text>
                                    </TouchableOpacity>

                                )
                            })
                        }



                    </ScrollView>
                </View>

                <View style={[styleElement.rowAliCenter, { justifyContent: 'center', marginTop: _moderateScale(8 * 5) }]}>
                    {/* <TouchableOpacity
                        onPress={props?.hide}
                        style={[styles.btnConfirm, { backgroundColor: BTN_PRICE }]}>
                        <Text style={[stylesFont.fontNolanBold, styles.btnConfirm__text]}>
                            Huỷ
                            </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        disabled={_isEmpty(currChoice)}
                        onPress={() => {
                            props?.confirmCheckin(currChoice)
                        }}
                        style={[styles.btnConfirm, { backgroundColor: BASE_COLOR }]}>
                        <Text style={[stylesFont.fontNolanBold, styles.btnConfirm__text]}>
                            CHECK IN
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: _moderateScale(8 * 3) }} />

            </View>
        </Modal >
    );
});


const styles = StyleSheet.create({
    cardBooking: {
        marginHorizontal: _moderateScale(8),
        borderWidth: _moderateScale(1),
        borderColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 2),
        marginBottom: _moderateScale(8 * 2)
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
        borderRadius: _moderateScale(8 * 1),
        justifyContent: 'center',
        alignItems: 'center',
        height: _moderateScale(8 * 5),
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
        height: "80%",
        // paddingVertical: _heightScale(30),
        paddingTop: _moderateScale(20),
        // paddingBottom: _moderateScale(50),
        backgroundColor: WHITE,
        paddingHorizontal: _moderateScale(23),
        borderRadius: _moderateScale(8)
    },
})

export default ModalMyListBookingToday;