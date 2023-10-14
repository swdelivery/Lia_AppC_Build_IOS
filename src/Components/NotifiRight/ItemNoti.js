import moment from 'moment';
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';


const ItemNoti = memo((props) => {

    const _renderTitle = () => {
        switch (props?.data?.event) {
            case "CREATE_PARTNER_NOTIFICATION_REVIEW":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Thưởng đánh giá dịch vụ
                    </Text> 
                )
            case "HANDLED_COLLABORATOR_REQUEST":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Cộng tác viên
                    </Text> 
                )
            case "LIA_REFUND_BONUS":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Thu hồi vé 
                    </Text> 
                )
            case "LIA_BONUS":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        {/* Tặng vé LiA */}
                        {props?.data?.title || `Quà tặng`}
                    </Text> 
                )
            case "REMIND_MEDICAL":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Nhắc nhở uống thuốc
                    </Text> 
                )
            case "ADD_PARTNER_POST_COMMENT":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Bình luận mới
                    </Text> 
                )
            case "CALL_TREATMENT_QUEUE":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Gọi điều trị
                    </Text>
                )
            case "CALL_QUEUE_CONSULTATION":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Gọi tư vấn
                    </Text>
                )
            case "ADD_BOOKING":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Đặt hẹn thành công
                    </Text>
                )
            case "LATE_BOOKING_TIME":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Thông báo trễ hẹn
                    </Text>
                )
            case "HAVE_COME_BOOKING_TIME":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Thông báo đến giờ hẹn
                    </Text>
                )
            case "UPCOMING_BOOKING_TIME":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Thông báo sắp đến giờ hẹn
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
            case "HANDLED_PAYMENT_REQUEST":
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        Yêu cầu cọc
                    </Text>
                )

            default:
                return (
                    <Text style={[stylesFont.fontNolan500, { flex: 1, fontSize: _moderateScale(14) }]}>
                        {props?.data?.title}
                    </Text> 
                )
                break;
        }
    }

    const _handleGetInfoBooking = async () => {

        // if(props?.data?.moduleName == "BOOKING"){
        //     let resultGetBookingByIdForPartner = await getBookingByIdForPartner(props?.data?.data?.bookingId)
        //     if (resultGetBookingByIdForPartner?.isAxiosError) return
            
        //     setCurrSeeBooking(old => {
        //         return {
        //             ...old,
        //             isShow: true,
        //             data: resultGetBookingByIdForPartner?.data?.data
        //         }
        //     })
        // }

    }

    return (
        <>

            <TouchableOpacity
                onPress={()=>props?.pressed()}
                // onPress={() => _handleGetInfoBooking()}
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
        // marginHorizontal: _moderateScale(8 * 3),
        borderBottomWidth: _moderateScale(0.5),
        borderBottomColor: Color.BG_GREY_OPACITY_5,
        paddingVertical: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 3)
    }
})

export default ItemNoti;