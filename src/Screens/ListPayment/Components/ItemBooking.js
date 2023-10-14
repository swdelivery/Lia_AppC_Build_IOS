import moment from 'moment';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { BLACK, BLUE, GREEN_SUCCESS, GREY, GREY_FOR_TITLE, WHITE, BG_GREY_OPACITY_5, BLACK_OPACITY_8, SECOND_COLOR, BLUE_FB, BLUE_2 } from '../../../Constant/Color';
import { _moderateScale } from "../../../Constant/Scale";
import { stylesFont } from '../../../Constant/Font';
import { styleElement } from '../../../Constant/StyleElement';
import {  URL_ORIGINAL } from '../../../Constant/Url';
import { useSelector } from 'react-redux';
import ModalPaymentRequest from '../../Conversation/ListNoti/Components/ModalPaymentRequest'
import { formatMonney } from '../../../Constant/Utils';

const ItemBooking = memo((props) => {

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)

    const [showModalInfoBooking,setShowModalInfoBooking] = useState(false)


    const _handleNavigateToInfoBooking = () => {
        setShowModalInfoBooking(true)
    }

    const _renderStatusBooking = () => {
        switch (props?.data?.paymentSource) {
            case "ORDER":
                return (
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: BLUE_FB }]}>
                          Thanh toán Đơn hàng
                     </Text>
                )
           
            case "REQUEST":
                return (
                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: BLUE_FB }]}>
                           Yêu cầu chuyển tiền ({props?.data?.paymentFor==='DEPOSIT'?'Đặt cọc'
                                                :props?.data?.paymentFor==='ORDER'?'Đơn hàng'
                                                :''})
                    </Text>
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
    return (

        <TouchableOpacity
        onPress={_handleNavigateToInfoBooking}
        style={styles.container}>

        {/* <ModalPaymentRequest
            confirm={() => {
            }}
            data={props?.data}
            hide={() => setShowModalInfoBooking(false)}
            show={showModalInfoBooking} /> 
        */}
            <View style={[styleElement.rowAliCenter]}>
                <Image
                    source={{ uri: infoUserRedux?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}` : infoUserRedux?.avatarTemp }}
                    style={[{
                        width: _moderateScale(8 * 6),
                        height: _moderateScale(8 * 6),
                        borderRadius: _moderateScale(8 * 6 / 2),
                        backgroundColor: BG_GREY_OPACITY_5
                    }]} />
                <View style={[styleElement.rowAliCenter, { flex: 1 }]}>
                    <View style={{ marginLeft: _moderateScale(8) }}>
                        <Text numberOfLines={1} style={[stylesFont.namePartnerNolan500]}>
                            {infoUserRedux?.name}
                        </Text>
                        <Text style={[stylesFont.phonePartnerNolan_14, { color: GREY }]}>
                            {`${infoUserRedux?.fullPhone[0]}`}
                        </Text>
                        <Text style={[stylesFont.fontNolanBold, { color: GREEN_SUCCESS }]}>
                            {`${props?.data?.branch?.name}`}
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
                    
                    <View style={[styleElement.rowAliCenter]}>
                        <View style={[styles.dotStatus, { backgroundColor: SECOND_COLOR }]} />
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: SECOND_COLOR }]}>
                           {formatMonney(props?.data?.amount)}
                        </Text>
                        <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), color: GREY }]}>
                            ({formatMonney(props?.data?.method?.name)})
                        </Text>
                    </View>
                    
                </View>

            </View>
            <Text style={[stylesFont.fontNolan500, {textAlign:'right',
            paddingLeft:_moderateScale(8), fontSize: _moderateScale(12), color: BLUE_FB }]}>
                {_renderStatusBooking()}
            </Text>
            <View style={[styleElement.lineHorizontal, { marginTop: _moderateScale(8) }]} />

        </TouchableOpacity>


    );
});

const styles = StyleSheet.create({
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