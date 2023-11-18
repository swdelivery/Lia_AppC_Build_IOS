import Text from '@Components/Text'
import { BORDER_COLOR, WHITE } from '@Constant/Color'
import { _moderateScale, _width } from '@Constant/Scale'
import ScreenKey from '@Navigation/ScreenKey'
import { clearDataCreateBooking, clearResponse, createPartnerBooking } from '@Redux/booking/actions'
import { getDataCreateBookingState, getResBookingState } from '@Redux/booking/selectors'
import { isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'

const ActionBottom = () => {

    const dispatch = useDispatch()
    const { navigate } = useNavigate();

    const {
        dataBranch,
        dataDoctor,
        dataPractitioner,
        dataDate,
        dataTime,
        dataServices,
        dataCoupon,
        dataInsurance,
        dataDescription,
    } = useSelector(getDataCreateBookingState)

    const { data, loading, error } = useSelector(getResBookingState)

    const infoUserRedux = useSelector((state) => state.infoUserReducer);

    const _handleConfirmCreateBooking = () => {

        if (!infoUserRedux?.infoUser?._id) {
            return Alert.alert('Bạn cần đăng nhập để đặt hẹn')
        }
        if (isEmpty(dataBranch)) {
            return Alert.alert('Vui lòng chọn chi nhánh')
        }
        if (isEmpty(dataDate)) {
            return Alert.alert('Vui lòng chọn thời gian đặt hẹn')
        }
        if (isEmpty(dataServices)) {
            return Alert.alert('Vui lòng chọn dịch vụ')
        }
        let dataFetch = {};
        dataFetch['partnerId'] = infoUserRedux?.infoUser?._id;
        if (!isEmpty(dataDate) && !isEmpty(dataTime)) {
            dataFetch['appointmentDate'] = {
                "date": dataDate,
                "from": {
                    "hour": dataTime.hour,
                    "minute": dataTime.minute
                },
                "to": {
                    "hour": dataTime.hour,
                    "minute": dataTime.minute
                }
            }
        }
        if (!isEmpty(dataBranch)) {
            dataFetch['branchCode'] = dataBranch.code;
        }
        if (!isEmpty(dataServices)) {
            dataFetch['serviceNeedCareCodeArr'] = dataServices?.map(item => item.code);
        }
        dataFetch['partnerPhone'] = {
            nationCode: infoUserRedux?.infoUser?.phone[0]?.nationCode,
            phoneNumber: infoUserRedux?.infoUser?.phone[0]?.phoneNumber
        }
        if (!isEmpty(dataDescription)) {
            dataFetch['description'] = dataDescription
        }
        if (!isEmpty(dataCoupon)) {
            dataFetch['partnerCouponIdArr'] = [dataCoupon?._id]
        }
        if (!isEmpty(dataDoctor)) {
            dataFetch['assignedDoctorCode'] = dataDoctor.code
        }
        if (!isEmpty(dataPractitioner)) {
            dataFetch['assignedPractitionerCode'] = dataPractitioner.code
        }
        if (!isEmpty(dataInsurance)) {
            dataFetch['serviceNeedCareCodeArr'] = dataInsurance?.map(item => item.code);
        }
        console.log({ dataFetch });
        Alert.alert(
            "Xác nhận",
            `Xác nhận tạo lịch hẹn?`,
            [
                {
                    text: "Huỷ",
                    style: "cancel"
                },
                {
                    text: "Đồng ý", onPress: async () => {
                        dispatch(createPartnerBooking.request(dataFetch))
                    }
                }
            ],
            { cancelable: false }
        );
    }

    useEffect(() => {
        if (!isEmpty(data)) {
            Alert.alert(data?.message)
            dispatch(clearDataCreateBooking())
            dispatch(clearResponse())
            return navigate(ScreenKey.LIST_BOOKING)()
        }
    }, [data, error])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={_handleConfirmCreateBooking}
                style={styles.btnAction}>
                <LinearGradient
                    style={[StyleSheet.absoluteFillObject, { borderRadius: 8, }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={["#01AB84", "#186A57"]}
                />
                <Text color={WHITE} weight='bold' size={14}>
                    Xác nhận lịch hẹn
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ActionBottom

const styles = StyleSheet.create({
    btnAction: {
        marginHorizontal: _moderateScale(8 * 2),
        height: _moderateScale(8 * 5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        height: _moderateScale(8 * 7),
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
        width: _width,
        justifyContent: 'center',
    }
})
