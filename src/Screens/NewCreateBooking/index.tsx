import Column from "@Components/Column";
import NewDatePicker from "@Components/NewDatePicker/NewDatePicker";
import Screen from "@Components/Screen";
import TimePicker from "@Components/TimePicker/TimePicker";
import { WHITE } from "@Constant/Color";
import { _heightScale } from "@Constant/Scale";
import {
  changeBranchListForBookingByService,
  clearDataCreateBooking,
  clearDoctor,
  clearPractitioner,
  getBranchListForBooking,
  getDoctorListByBranchCode,
  getPractitionerListByBranchCode,
  selectBranch,
  selectCoupon,
  selectDate,
  selectDoctor,
  selectPractitioner,
  selectServices,
  selectTime,
} from "@Redux/booking/actions";
import { getDataCreateBookingState } from "@Redux/booking/selectors";
import {
  getInsuranceList,
  loadMoreInsuranceList,
} from "@Redux/insurance/actions";
import { getInsuranceListState } from "@Redux/insurance/selectors";
import { TimeForBooking } from "@typings/booking";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import useListFilter from "src/Hooks/useListFilter";
import useVisible from "src/Hooks/useVisible";
import ActionBottom from "./Components/ActionBottom";
import Bill from "./Components/Bill";
import CoverImage from "./Components/CoverImage";
import Header from "./Components/Header";
import InputPicker from "./Components/InputPicker";
import InputTimeBooking from "./Components/InputTimeBooking";
import ListBeautyInsurance from "./Components/ListBeautyInsurance";
import ListVoucher from "./Components/ListVoucher";
import ModalListBeautyInsurance from "./Components/ModalListBeautyInsurance";
import ModalListBranch from "./Components/ModalListBranch";
import ModalListDoctor from "./Components/ModalListDoctor";
import Notes from "./Components/Notes";
import PickService from "./Components/PickService";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigationParams } from "src/Hooks/useNavigation";
import { getBranchList } from "@Redux/branch/actions";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";
import ModalScrollPicker from "@Components/ModalBottom/ModalScrollPicker";
import { formatMonney } from "@Constant/Utils";

const listTimeForBooking: TimeForBooking[] = [
  {
    _id: "2",
    from: "09:00",
    to: "10:00",
    time: { hour: "09", minute: "00" },
  },
  {
    _id: "3",
    from: "10:00",
    to: "11:00",
    time: { hour: "10", minute: "00" },
  },
  {
    _id: "4",
    from: "11:00",
    to: "12:00",
    time: { hour: "11", minute: "00" },
  },
  {
    _id: "5",
    from: "12:00",
    to: "13:00",
    time: { hour: "12", minute: "00" },
  },
  {
    _id: "6",
    from: "13:00",
    to: "14:00",
    time: { hour: "13", minute: "00" },
  },
  {
    _id: "7",
    from: "14:00",
    to: "15:00",
    time: { hour: "14", minute: "00" },
  },
  {
    _id: "8",
    from: "15:00",
    to: "16:00",
    time: { hour: "15", minute: "00" },
  },
  {
    _id: "9",
    from: "16:00",
    to: "17:00",
    time: { hour: "16", minute: "00" },
  },
  {
    _id: "10",
    from: "17:00",
    to: "18:00",
    time: { hour: "17", minute: "00" },
  },
  {
    _id: "11",
    from: "18:00",
    to: "19:00",
    time: { hour: "18", minute: "00" },
  },
];

type ScreenK = typeof ScreenKey.CREATE_BOOKING;

const NewCreateBooking = () => {
  const dispatch = useDispatch();
  const { doctor, branch, practitioner, service, coupon } = useNavigationParams<ScreenK>();
  const scrollY = useSharedValue(0);
  const { dataBranch, dataDoctor, dataPractitioner, dataServices } = useSelector(
    getDataCreateBookingState
  );

  const listBranchPicker = useVisible();
  const listDoctorPicker = useVisible();
  const datePicker = useVisible();
  const timePicker = useVisible();
  const insurancePicker = useVisible();

  useEffect(() => {
    dispatch(getInsuranceList.request())
    return () => {
      dispatch(clearDataCreateBooking())
    };
  }, [])

  useEffect(() => {
    if (branch) {
      dispatch(selectBranch(branch));
    }
  }, [branch]);

  useEffect(() => {
    if (doctor) {
      dispatch(selectDoctor(doctor));
    }
  }, [doctor]);

  useEffect(() => {
    if (service?._id) {
      let branches = (service?.branchServices || []).map(item => item.branch);
      dispatch(selectBranch(branches[0]));
      dispatch(selectServices([service]));
    }
  }, [service])

  useEffect(() => {
    if (practitioner) {
      dispatch(selectPractitioner(practitioner));
    }
  }, [practitioner]);

  useEffect(() => {
    if (coupon?._id) {
      console.log({ coupon, dataServices });
      let totalPriceSerive = dataServices?.reduce((sum, { price }) => sum + price, 0);
      if (totalPriceSerive == 0) return;
      if (totalPriceSerive < coupon?.coupon?.minRequiredOrderAmount) {
        return Alert.alert(`Bạn cần đạt giá trị đơn hàng tối thiểu ${formatMonney(coupon?.coupon?.minRequiredOrderAmount)} để sử dụng Voucher này`)
      }
      dispatch(selectCoupon(coupon))
    }
  }, [coupon])

  useEffect(() => {
    if (dataBranch?.code) {
      if (dataDoctor && dataDoctor?.branchCode !== dataBranch?.code) {
        dispatch(clearDoctor());
      }
      if (
        dataPractitioner &&
        dataPractitioner?.branchCode !== dataBranch?.code
      ) {
        dispatch(clearPractitioner());
      }
    }
  }, [dataBranch?.code]);

  const _handleConfirmPickDate = useCallback((date) => {
    dispatch(selectDate(moment(date)));
  }, []);
  const _handleConfirmPickTime = useCallback((data) => {
    dispatch(
      selectTime({
        hour: `${data?.valueInteger}`,
        minute: `${data?.valueDecimal}`,
      })
    );
  }, [])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Screen safeBottom>
      <StatusBar barStyle={"dark-content"} />
      <Header scrollY={scrollY} title={"Đặt hẹn"} />
      <CoverImage scrollY={scrollY} />
      <AfterTimeoutFragment>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Animated.ScrollView
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="never"
            keyboardDismissMode={"on-drag"}
          >
            <Column backgroundColor={WHITE}>
              <Column marginTop={8 * 4} gap={32}>
                {/* PENDING FOR WAITING BACK-END */}
                {/* <InputRefCode /> */}
                <InputPicker
                  value={dataBranch}
                  require
                  title={"Chọn phòng khám"}
                  onPress={listBranchPicker.show}
                />
                {dataBranch?._id ? (
                  <InputPicker
                    value={
                      dataPractitioner?._id ? dataPractitioner : dataDoctor
                    }
                    title={"Chọn bác sĩ"}
                    onPress={listDoctorPicker.show}
                  />
                ) : (
                  <></>
                )}
                <InputTimeBooking
                  setShowModalDatePicker={datePicker.show}
                  setShowModalTimePicker={timePicker.show}
                  listTimeForBooking={listTimeForBooking}
                />
                <PickService />
                <ListBeautyInsurance onPress={insurancePicker.show} />
                <ListVoucher />
                <Bill />
                <Notes />
              </Column>
            </Column>
          </Animated.ScrollView>
        </KeyboardAvoidingView>
        <ActionBottom />
      </AfterTimeoutFragment>
      <ModalListBranch
        visible={listBranchPicker.visible}
        onClose={listBranchPicker.hide}
      />
      <ModalListDoctor
        visible={listDoctorPicker.visible}
        onClose={listDoctorPicker.hide}
        branchCode={dataBranch?.code}
      />
      <NewDatePicker
        onConfirm={_handleConfirmPickDate}
        minDate={moment()}
        visible={datePicker.visible}
        onClose={datePicker.hide}
      />
      <ModalListBeautyInsurance
        visible={insurancePicker.visible}
        onClose={insurancePicker.hide}
      />

      <ModalScrollPicker
        title={"Chọn khung giờ"}
        unit={""}
        dataInteger={["", ...Array.from(new Array(13), (x, i) => i + 9), ""]}
        dataDecimal={["", `00`, `15`, `30`, `45`, ""]}
        onConfirm={_handleConfirmPickTime}
        visible={timePicker.visible}
        onClose={timePicker.hide}
      />
    </Screen>
  );
};

export default NewCreateBooking;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: _heightScale(170),
    backgroundColor: "transparent",
    paddingBottom: 100,
  },
});
