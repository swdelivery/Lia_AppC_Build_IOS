import Text from "@Components/Text";
import { BORDER_COLOR, WHITE } from "@Constant/Color";
import { _moderateScale, _width } from "@Constant/Scale";
import { createPartnerBooking, updatePartnerBooking } from "@Redux/booking/actions";
import { getDataCreateBookingState } from "@Redux/booking/selectors";
import { isEmpty } from "lodash";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "src/Hooks/useNavigation";
import useConfirmation from "src/Hooks/useConfirmation";

type Props = {
  isEditBooking?: boolean;
  editBookingId?: string;
};

const ActionBottom = ({ isEditBooking, editBookingId }: Props) => {
  const dispatch = useDispatch();
  const { navigation } = useNavigate();
  const { showConfirmation } = useConfirmation();

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
  } = useSelector(getDataCreateBookingState);


  const infoUserRedux = useSelector((state) => state.infoUserReducer);

  const _handleConfirmCreateBooking = () => {
    if (!infoUserRedux?.infoUser?._id) {
      return Alert.alert("Bạn cần đăng nhập để đặt hẹn");
    }
    if (isEmpty(dataBranch)) {
      return Alert.alert("Vui lòng chọn chi nhánh");
    }
    if (isEmpty(dataDate)) {
      return Alert.alert("Vui lòng chọn thời gian đặt hẹn");
    }
    if (isEmpty(dataServices)) {
      return Alert.alert("Vui lòng chọn dịch vụ");
    }
    let dataFetch = {};
    dataFetch["partnerId"] = infoUserRedux?.infoUser?._id;
    if (!isEmpty(dataDate) && !isEmpty(dataTime)) {
      dataFetch["appointmentDate"] = {
        date: dataDate,
        from: {
          hour: dataTime.hour,
          minute: dataTime.minute,
        },
        to: {
          hour: dataTime.hour,
          minute: dataTime.minute,
        },
      };
    }
    if (!isEmpty(dataBranch)) {
      dataFetch["branchCode"] = dataBranch.code;
    }
    if (!isEmpty(dataServices)) {
      dataFetch["serviceNeedCareCodeArr"] = dataServices?.map(
        (item) => item.code
      );
      dataFetch["services"] = dataServices?.map(
        (item) => {
          return {
            "serviceCode": item?.code,//bắt buộc
            "options": []
          }
        }
      );
    }
    dataFetch["partnerPhone"] = {
      nationCode: infoUserRedux?.infoUser?.phone[0]?.nationCode,
      phoneNumber: infoUserRedux?.infoUser?.phone[0]?.phoneNumber,
    };
    if (!isEmpty(dataDescription)) {
      dataFetch["description"] = dataDescription;
    }
    if (!isEmpty(dataCoupon)) {
      dataFetch["partnerCouponIdArr"] = [dataCoupon?._id];
    } else {
      dataFetch["partnerCouponIdArr"] = []
    }
    if (!isEmpty(dataDoctor)) {
      dataFetch["assignedDoctorCode"] = dataDoctor.code;
    }
    if (!isEmpty(dataPractitioner)) {
      dataFetch["assignedPractitionerCode"] = dataPractitioner.code;
    }
    if (!isEmpty(dataInsurance)) {
      dataFetch["insuranceCodeArr"] = dataInsurance?.map(
        (item) => item.code
      );
    } else {
      dataFetch["insuranceCodeArr"] = []
    }
    if (isEditBooking) {
      showConfirmation(
        "Xác nhận",
        "Xác nhận cập nhật lịch hẹn?",
        () => {
          dispatch(updatePartnerBooking.request({
            idBooking: editBookingId,
            data: dataFetch
          }));
        }
      );
    } else {
      showConfirmation(
        "Xác nhận",
        "Xác nhận tạo lịch hẹn?",
        () => {
          dispatch(createPartnerBooking.request(dataFetch));
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={_handleConfirmCreateBooking}
        style={styles.btnAction}
      >
        <LinearGradient
          style={[StyleSheet.absoluteFillObject, { borderRadius: 8 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#01AB84", "#186A57"]}
        />
        <Text color={WHITE} weight="bold" size={14}>
          {
            isEditBooking ?
              `Cập nhật lịch hẹn`
              :
              `Xác nhận lịch hẹn`
          }
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionBottom;

const styles = StyleSheet.create({
  btnAction: {
    marginHorizontal: _moderateScale(8 * 2),
    height: _moderateScale(8 * 5),
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: _moderateScale(8 * 7),
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    width: _width,
    justifyContent: "center",
  },
});
