import Column from "@Components/Column";
import NewDatePicker from "@Components/NewDatePicker/NewDatePicker";
import Screen from "@Components/Screen";
import { WHITE } from "@Constant/Color";
import { _heightScale } from "@Constant/Scale";
import {
  clearDataCreateBooking,
  clearDoctor,
  clearPractitioner,
  selectBranch,
  selectCoupon,
  selectDate,
  selectDescription,
  selectDoctor,
  selectPractitioner,
  selectServices,
  selectTime,
  setInsurance,
} from "@Redux/booking/actions";
import { getDataCreateBookingState } from "@Redux/booking/selectors";
import { getInsuranceList } from "@Redux/insurance/actions";
import { getInsuranceListState } from "@Redux/insurance/selectors";
import { TimeForBooking } from "@typings/booking";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
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
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";
import ModalScrollPicker from "@Components/ModalBottom/ModalScrollPicker";
import { formatMonney } from "@Constant/Utils";
import { getMyCouponsState } from "@Redux/user/selectors";
import { styleElement } from "@Constant/StyleElement";

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
  const {
    doctor,
    branch,
    practitioner,
    service,
    coupon,
    type,
    dataBookingEdit,
  } = useNavigationParams<ScreenK>();
  const scrollY = useSharedValue(0);
  const { dataBranch, dataDoctor, dataPractitioner, dataServices } =
    useSelector(getDataCreateBookingState);
  const listDoctorRedux = useSelector(
    (state) => state?.bookingReducer?.listDoctor
  );
  const { data: listMyCoupon } = useSelector(getMyCouponsState);
  const { data: dataListInsurance } = useSelector(getInsuranceListState);

  const listBranchPicker = useVisible();
  const listDoctorPicker = useVisible();
  const datePicker = useVisible();
  const timePicker = useVisible();
  const insurancePicker = useVisible();

  const [isEditBooking, setIsEditBooking] = useState(false);
  const [editBookingId, setEditBookingId] = useState(null);

  useEffect(() => {
    dispatch(getInsuranceList.request());
    return () => {
      dispatch(clearDataCreateBooking());
    };
  }, []);

  useEffect(() => {
    if (type == "edit") {
      setIsEditBooking(true);
      setEditBookingId(dataBookingEdit?._id);
      const {
        branch,
        assignedDoctorCode,
        appointmentDateFinal,
        servicesNeedCare,
        partnerCouponIdArr,
        insuranceCodeArr,
        description,
      } = dataBookingEdit;

      dispatch(selectBranch(branch));
      if (assignedDoctorCode) {
        let findDoctor = listDoctorRedux?.find(
          (item) => item?.code == assignedDoctorCode
        );
        if (findDoctor?.code) {
          dispatch(selectDoctor(findDoctor));
        }
      }
      if (appointmentDateFinal?.date) {
        dispatch(selectDate(moment(appointmentDateFinal?.date)));
        dispatch(
          selectTime({
            hour: `${appointmentDateFinal?.from?.hour}`,
            minute: `${appointmentDateFinal?.from?.minute}`,
          })
        );
      }
      if (servicesNeedCare?.length > 0) {
        dispatch(selectServices(servicesNeedCare));
      }
      if (partnerCouponIdArr?.length > 0) {
        let findCoupon = listMyCoupon?.find(
          (item) => item?._id == partnerCouponIdArr[0]
        );
        if (findCoupon?._id) {
          dispatch(selectCoupon(findCoupon));
        }
      }
      if (insuranceCodeArr?.length > 0) {
        let listInsuranceFinded = [];
        dataListInsurance?.map((item) => {
          let finded = insuranceCodeArr?.find(
            (itemFind) => itemFind == item?.code
          );
          if (finded) {
            listInsuranceFinded.push(item);
          }
        });
        dispatch(setInsurance(listInsuranceFinded));
      }
      if (description) {
        dispatch(selectDescription(description));
      }
    }
  }, [type, listMyCoupon, dataListInsurance]);

  useEffect(() => {
    if (branch) {
      dispatch(selectBranch(branch));
    }
  }, [branch]);

  useEffect(() => {
    if (doctor) {
      dispatch(selectDoctor(doctor));
      if (doctor.branch) {
        dispatch(selectBranch(doctor.branch));
      }
    }
  }, [doctor]);

  useEffect(() => {
    if (service?._id) {
      let branches = (service?.branchServices || []).map((item) => item.branch);
      dispatch(selectBranch(branches[0]));
      dispatch(selectServices([service]));
    }
  }, [service]);

  useEffect(() => {
    if (practitioner) {
      dispatch(selectPractitioner(practitioner));
    }
  }, [practitioner]);

  useEffect(() => {
    if (coupon?._id) {
      let totalPriceSerive = dataServices?.reduce(
        (sum, { price }) => sum + price,
        0
      );
      if (totalPriceSerive == 0) return;
      if (totalPriceSerive < coupon?.coupon?.minRequiredOrderAmount) {
        return Alert.alert(
          `Bạn cần đạt giá trị đơn hàng tối thiểu ${formatMonney(
            coupon?.coupon?.minRequiredOrderAmount
          )} để sử dụng Voucher này`
        );
      }
      dispatch(selectCoupon(coupon));
    }
  }, [coupon]);

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
    if (date) {
      dispatch(selectDate(moment(date)));
    } else {
      dispatch(selectDate(moment(new Date())));
    }
  }, []);

  const _handleNew = useCallback(() => {
    dispatch(selectDate(moment(new Date())));
    datePicker.hide();
  }, []);

  const _handleConfirmPickTime = useCallback((data) => {
    dispatch(
      selectTime({
        hour: `${data?.valueInteger}`,
        minute: `${data?.valueDecimal}`,
      })
    );
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Screen safeBottom>
      <StatusBar barStyle={"dark-content"} />
      <CoverImage scrollY={scrollY} />
      <AfterTimeoutFragment>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styleElement.flex}
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
                    onPress={!doctor ? listDoctorPicker.show : undefined}
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
        <ActionBottom
          editBookingId={editBookingId}
          isEditBooking={isEditBooking}
        />
      </AfterTimeoutFragment>
      <Header scrollY={scrollY} title={"Đặt hẹn"} />
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
        onNew={_handleNew}
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
