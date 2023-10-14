import { isArray, isEmpty } from 'lodash';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// REDUX 
import { useDispatch, useSelector } from "react-redux";
import FastImage from '../../../../Components/Image/FastImage';
import * as Color from '../../../../Constant/Color';
import { stylesFont } from '../../../../Constant/Font';
import { _moderateScale, _widthScale } from '../../../../Constant/Scale';
import { styleElement } from '../../../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../../../Constant/Url';
import { _substringMaxValue } from '../../../../Constant/Utils';
import Avatar from '../../../../Components/User/Avatar';

import ModalInfoBooking from './ModalInfoBooking'
import { getBookingByIdForPartner } from '../../../../Redux/Action/BookingAction';
import _isEmpty from 'lodash/isEmpty'

const ItemNoti = memo((props) => {

    const [showModalInfoBooking, setShowModalInfoBooking] = useState(false)
    const [currSeeBooking, setCurrSeeBooking] = useState({
        isShow: false,
        data: {}
    })

    const _renderTitle = () => {
        switch (props?.data?.event) {
            case "ADD_BOOKING":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Đặt hẹn thành công
                    </Text>
                )
            case "CHECK_IN_BOOKING":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        CheckIn thành công
                    </Text>
                )
            case "CHECK_OUT_BOOKING":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        CheckOut thành công
                    </Text>
                )

            default:
                break;
        }
    }

    const _handleGetInfoBooking = async () => {

        if(props?.data?.moduleName == "BOOKING"){
            let resultGetBookingByIdForPartner = await getBookingByIdForPartner(props?.data?.data?.bookingId)
            if (resultGetBookingByIdForPartner?.isAxiosError) return
            
            setCurrSeeBooking(old => {
                return {
                    ...old,
                    isShow: true,
                    data: resultGetBookingByIdForPartner?.data?.data
                }
            })
        }

    }

    return (
        <>
            <ModalInfoBooking
                confirm={() => {
                    // setShowModalInfoBooking(false)

                    // setTimeout(() => {
                    //     setShowModalAddDeposit(true)
                    //     alert('alo')
                    // }, 1000);
                }}
                data={currSeeBooking?.data}
                hide={() => setCurrSeeBooking(old => {
                    return {
                        ...old,
                        isShow: false,
                    }
                })}
                show={currSeeBooking?.isShow} />


            <TouchableOpacity
                onPress={() => _handleGetInfoBooking()}
                style={[styles.btnNoti, props?.active && { borderBottomWidth: _moderateScale(1), borderBottomColor: Color.FOURTH_COLOR, backgroundColor: 'rgba(255, 168, 198,0.3)' }]}>
                <View style={[styleElement.rowAliCenter]}>
                    {_renderTitle()}

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(12), fontStyle: 'italic', color: Color.GREEN_SUCCESS }]}>
                        {moment(props?.data?.created).startOf('minute').fromNow()}
                    </Text>
                </View>

                <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14), color: Color.GREY, marginTop: _moderateScale(8) }]}>
                    {
                        props?.data?.content
                    }
                </Text>

            </TouchableOpacity>
        </>
    );
});

const styles = StyleSheet.create({
    btnNoti: {
        marginHorizontal: _moderateScale(8 * 3),
        borderBottomWidth: _moderateScale(0.5),
        borderBottomColor: Color.BG_GREY_OPACITY_5,
        paddingVertical: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2)
    }
})

export default ItemNoti;