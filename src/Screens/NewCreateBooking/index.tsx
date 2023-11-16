import Column from "@Components/Column";
import Screen from "@Components/Screen";
import React, { useCallback, useState } from "react";
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

const NewCreateBooking = () => {

    const scrollY = useSharedValue(0);
    const [showModalListBranch, setShowModalListBranch] = useState(false)
    const [showModalListDoctor, setShowModalListDoctor] = useState(false)

    const [list7Days, setList7Days] = useState(Array.from(new Array(7), (x, i) => moment().add(i, 'days')))
    const [currPickDate, setCurrPickDate] = useState(moment())
    const [showModalDatePicker, setShowModalDatePicker] = useState(false)
    const [showModalTimePicker, setShowModalTimePicker] = useState(false)
    const [showModalPickBeautyInsurance, setShowModalPickBeautyInsurance] = useState(false)

    const insurancePicker = useVisible();

    const [listTimeForBooking, setListTimeForBooking] = useState([
        { _id: '2', from: '09:00', to: '10:00' },
        { _id: '3', from: '10:00', to: '11:00' },
        { _id: '4', from: '11:00', to: '12:00' },
        { _id: '5', from: '12:00', to: '13:00' },
        { _id: '6', from: '13:00', to: '14:00' },
        { _id: '7', from: '14:00', to: '15:00' },
        { _id: '8', from: '15:00', to: '16:00' },
        { _id: '9', from: '16:00', to: '17:00' },
        { _id: '10', from: '17:00', to: '18:00' },
        { _id: '11', from: '18:00', to: '19:00' },
    ])
    const [currPickTime, setCurrPickTime] = useState(null)

    const [refCodeValue, setRefCodeValue] = useState(null)


    const _handleShowModalPickBeautyInsurance = useCallback(() => {
        setShowModalPickBeautyInsurance(old => !old)
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
            <NewDatePicker minDate={moment()} visible={showModalDatePicker} onClose={() => setShowModalDatePicker(false)} />
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
                            <InputRefCode
                                value={refCodeValue}
                            // onChange={}
                            />
                            <InputPicker require title={"Chọn phòng khám"} onPress={() => setShowModalListBranch(old => !old)} />
                            <InputPicker title={'Chọn bác sĩ'} onPress={() => setShowModalListDoctor(old => !old)} />
                            <InputTimeBooking
                                setShowModalDatePicker={setShowModalDatePicker}
                                setShowModalTimePicker={setShowModalTimePicker}
                                setCurrPickDate={setCurrPickDate}
                                currPickDate={currPickDate}
                                list7Days={list7Days}
                                listTimeForBooking={listTimeForBooking}
                                setCurrPickTime={setCurrPickTime}
                                currPickTime={currPickTime}
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