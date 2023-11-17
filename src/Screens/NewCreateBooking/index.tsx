import Column from "@Components/Column";
import Screen from "@Components/Screen";
import React, { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import CoverImage from "./Components/CoverImage";
import { _heightScale, _moderateScale } from "@Constant/Scale";
import { WHITE } from "@Constant/Color";
import InputRefCode from "./Components/InputRefCode";
import InputPicker from "./Components/InputPicker";
import ModalListBranch from "./Components/ModalListBranch";
import ModalListDoctor from "./Components/ModalListDoctor";
import InputTimeBooking from "./Components/InputTimeBooking";
import moment from "moment";
import NewDatePicker from "@Components/NewDatePicker/NewDatePicker";
import TimePicker from "@Components/TimePicker/TimePicker";
import PickService from "./Components/PickService";
import ListVoucher from "./Components/ListVoucher";
import Bill from "./Components/Bill";
import Notes from "./Components/Notes";
import ActionBottom from "./Components/ActionBottom";
import Header from "./Components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ListBeautyInsurance from "./Components/ListBeautyInsurance";
import ModalListBeautyInsurance from "./Components/ModalListBeautyInsurance";
import useVisible from "src/Hooks/useVisible";
import { useDispatch, useSelector } from "react-redux";
import { clearDoctor, clearPractitioner, getBranchListForBooking, getDoctorListByBranchCode, getPractitionerListByBranchCode, selectDate } from "@Redux/booking/actions";
import { getDataCreateBookingState } from "@Redux/booking/selectors";
import Collapsible from "react-native-collapsible";

const NewCreateBooking = () => {

    const dispatch = useDispatch()
    const scrollY = useSharedValue(0);

    const { dataBranch, dataDoctor, dataPractitioner } = useSelector(getDataCreateBookingState)

    const [showModalListBranch, setShowModalListBranch] = useState(false)
    const [showModalListDoctor, setShowModalListDoctor] = useState(false)

    const [showModalDatePicker, setShowModalDatePicker] = useState(false)
    const [showModalTimePicker, setShowModalTimePicker] = useState(false)

    const insurancePicker = useVisible();

    const [listTimeForBooking, setListTimeForBooking] = useState([
        { _id: '2', from: '09:00', to: '10:00', time: { hour: '09', minute: '00' } },
        { _id: '3', from: '10:00', to: '11:00', time: { hour: '10', minute: '00' } },
        { _id: '4', from: '11:00', to: '12:00', time: { hour: '11', minute: '00' } },
        { _id: '5', from: '12:00', to: '13:00', time: { hour: '12', minute: '00' } },
        { _id: '6', from: '13:00', to: '14:00', time: { hour: '13', minute: '00' } },
        { _id: '7', from: '14:00', to: '15:00', time: { hour: '14', minute: '00' } },
        { _id: '8', from: '15:00', to: '16:00', time: { hour: '15', minute: '00' } },
        { _id: '9', from: '16:00', to: '17:00', time: { hour: '16', minute: '00' } },
        { _id: '10', from: '17:00', to: '18:00', time: { hour: '17', minute: '00' } },
        { _id: '11', from: '18:00', to: '19:00', time: { hour: '18', minute: '00' } },
    ])

    useEffect(() => {
        dispatch(getBranchListForBooking.request())
    }, [])

    useEffect(() => {
        if (dataBranch?.code) {
            dispatch(clearDoctor())
            dispatch(clearPractitioner())
            dispatch(getDoctorListByBranchCode.request({
                branchCode: dataBranch?.code
            }))
            dispatch(getPractitionerListByBranchCode.request({
                branchCode: dataBranch?.code
            }))
        }
    }, [dataBranch?.code])

    const _handleConfirmPickDate = useCallback((date) => {
        dispatch(selectDate(date))
    }, [])


    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            scrollY.value = event.contentOffset.y;
        },
    });


    return (


        <Screen safeBottom>
            <StatusBar barStyle={"dark-content"} />
            <ModalListBranch isShow={showModalListBranch} onHideModal={() => setShowModalListBranch(false)} />
            <ModalListDoctor isShow={showModalListDoctor} onHideModal={() => setShowModalListDoctor(false)} />
            <NewDatePicker onConfirm={_handleConfirmPickDate} minDate={moment()} visible={showModalDatePicker} onClose={() => setShowModalDatePicker(false)} />
            <TimePicker isShow={showModalTimePicker} onHideModal={() => setShowModalTimePicker(false)} />
            <ModalListBeautyInsurance visible={insurancePicker.visible} onClose={insurancePicker.hide} />

            <Header scrollY={scrollY} title={'Đặt hẹn'} />
            <CoverImage scrollY={scrollY} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <Animated.ScrollView
                    scrollEventThrottle={16}
                    onScroll={scrollHandler}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={{ backgroundColor: WHITE }}>
                        <Column style={{ marginTop: 8 * 4 }} gap={32}>
                            <InputRefCode />
                            <InputPicker value={dataBranch} require title={"Chọn phòng khám"} onPress={() => setShowModalListBranch(old => !old)} />
                            <Collapsible collapsed={dataBranch?._id ? false : true}>
                                <InputPicker value={dataPractitioner?._id ? dataPractitioner : dataDoctor} title={'Chọn bác sĩ'} onPress={() => setShowModalListDoctor(old => !old)} />
                            </Collapsible>
                            <InputTimeBooking
                                setShowModalDatePicker={setShowModalDatePicker}
                                setShowModalTimePicker={setShowModalTimePicker}
                                listTimeForBooking={listTimeForBooking}
                            />
                            <PickService />
                            <ListBeautyInsurance
                                onPress={insurancePicker.show}
                            />
                            <ListVoucher />
                            <Bill />
                            <Notes />

                        </Column>
                    </View>

                    <View style={{ height: 100 }} />
                </Animated.ScrollView>
            </KeyboardAvoidingView>
            <ActionBottom />

        </Screen>

    )
}

export default NewCreateBooking

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: _heightScale(170),
        backgroundColor: "transparent",
    },
})
