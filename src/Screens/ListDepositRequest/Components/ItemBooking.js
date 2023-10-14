import moment from 'moment';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { BLACK, BLUE, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_8, SECOND_COLOR, BLUE_FB, BLUE_2, BTN_PRICE, BASE_COLOR, THIRD_COLOR } from '../../../Constant/Color';
import { _moderateScale } from "../../../Constant/Scale";
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import { URL_ORIGINAL } from '../../../Constant/Url';
import { useSelector } from 'react-redux';
import ModalPaymentRequest from '../../Conversation/ListNoti/Components/ModalPaymentRequest'
import { formatMonney } from '../../../Constant/Utils';

const ItemBooking = memo((props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [showModalInfoBooking, setShowModalInfoBooking] = useState(false)


    const _handleNavigateToInfoBooking = () => {
        setShowModalInfoBooking(true)
    }

    const _renderStatusBooking = () => {
        switch (props?.data?.status) {
            case "WAIT":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: '#969696' }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: "#969696" }]}>
                            Chưa duyệt
                        </Text>
                    </View>
                )

            case "ACCEPT":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: GREEN_SUCCESS }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREEN_SUCCESS }]}>
                            Đã duyệt
                        </Text>
                    </View>
                )
            case "DENY":
                return (
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: SECOND_COLOR }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: SECOND_COLOR }]}>
                            Đã từ chối
                        </Text>
                    </View>
                )

            default:
                break;
        }
    }

    const _renderPaymentFor = () => {
        switch (props?.data?.paymentFor) {
            case "WALLET":
                return (
                    <View style={styles.paymentFor}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: WHITE , bottom:1}]}>
                            Nạp ví
                        </Text>
                    </View>
                )
            case "WALLET_COMMISSION":
                return (
                    <View style={styles.paymentFor}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: WHITE , bottom:1}]}>
                            Rút thưởng
                        </Text>
                    </View>
                )
            case "DEPOSIT":
                return (
                    <View style={styles.paymentFor}>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: WHITE , bottom:1}]}>
                            Cọc Booking
                        </Text>
                    </View>
                )

            default:
                break;
        }
    }

    return (

        <TouchableOpacity
            onPress={_handleNavigateToInfoBooking}
            style={styles.container}>

            <ModalPaymentRequest
                confirm={() => {
                }}
                data={props?.data}
                hide={() => setShowModalInfoBooking(false)}
                show={showModalInfoBooking} />


            <>
                {
                    _renderPaymentFor()
                }
                <View style={[styleElement.rowAliTop]}>
                    <View style={[{ flex: 1 }]}>

                        <View style={{ marginLeft: _moderateScale(8) }}>

                            <Text numberOfLines={1} style={[stylesFont.namePartnerNolan500,{fontSize:_moderateScale(16), color:SECOND_COLOR}]}>
                                {formatMonney(props?.data?.amount)}
                            </Text>

                        </View>

                    </View>

                    <View style={[{ alignItems: 'flex-end' }]}>
                        <View style={[styleElement.rowAliCenter, { marginBottom: _moderateScale(8) }]}>

                            <Text style={[stylesFont.fontNolan, { fontSize: _moderateScale(13), color: BLACK }]}>
                                {
                                    `${moment(props?.data?.appointmentDateFinal?.from?.dateTime).format('LT')}-${moment(props?.data?.appointmentDateFinal?.to?.dateTime).format('LT')} | ${moment(props?.data?.appointmentDateFinal?.date).format('DD/MM')}`
                                }
                            </Text>
                        </View>
                        {
                            _renderStatusBooking()
                        }
                    </View>

                </View>
            </>
            <Text style={[stylesFont.fontNolan500, {
                textAlign: 'right',
                paddingLeft: _moderateScale(8), fontSize: _moderateScale(12), color: BLUE_FB
            }]}>
                {props?.data?.descriptionResult}
            </Text>
            <View style={[styleElement.lineHorizontal, { marginTop: _moderateScale(8) }]} />

        </TouchableOpacity>


    );
});

const styles = StyleSheet.create({
    paymentFor: {
        marginLeft: _moderateScale(8),
        backgroundColor: BLUE_FB,
        alignSelf: 'flex-start',
        paddingHorizontal: _moderateScale(8),
        paddingVertical: _moderateScale(2),
        borderRadius: _moderateScale(4)
    },
    partnerName: {
        fontSize: _moderateScale(16),
        // marginBottom: _moderateScale(4)
    },
    phoneNumber: {
        fontSize: _moderateScale(14),
        color: GREY
    },
    dotStatus: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        marginRight: _moderateScale(4),
        top: _moderateScale(1)
    },
    activeService__text: {
        color: GREY_FOR_TITLE,
        fontSize: _moderateScale(12)
    },
    activeService: {
        backgroundColor: BLUE,
        paddingHorizontal: _moderateScale(8 * 1.5),
        paddingVertical: _moderateScale(4),
        borderRadius: _moderateScale(8),
        alignSelf: 'flex-start',

        // marginLeft: _moderateScale(8),
        // marginTop:_moderateScale(4)
    },
    card: {
        flexDirection: 'row'
    },
    container: {
        width: '100%',
        backgroundColor: WHITE,
        marginTop: _moderateScale(8),
        paddingVertical: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8)
    }
})

export default ItemBooking;