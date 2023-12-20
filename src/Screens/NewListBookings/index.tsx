import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "@Components/Screen";
import ListBookings from "./ListBookings";
import { useDispatch, useSelector } from "react-redux";
import { getStateActionSheetBottom } from "@Redux/modal/selectors";
import ActionSheetBottom from "@Components/ModalBottom/ActionSheetBottom";
import { closeActionSheetBottom, openActionSheetBottom } from "@Redux/modal/actions";
import LinearGradient from "react-native-linear-gradient";
import { BASE_COLOR } from "@Constant/Color";
import LiAHeader from "@Components/Header/LiAHeader";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";

const NewListBookings = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigate()
  const { showActionSheetBottom } = useSelector(getStateActionSheetBottom);


  const _handleOnCloseActionSheetBottom = () => {
    dispatch(closeActionSheetBottom({}));
  };

  const _handleConfirm = (data) => {
    if (data?.type == 'edit') {
      navigate(ScreenKey.CREATE_BOOKING, {
        type: 'edit',
        dataBookingEdit: showActionSheetBottom?.data
      })()
    }
  };

  return (
    <Screen>
      <LinearGradient
        colors={[BASE_COLOR, "#fff"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <LiAHeader safeTop bg={"transparent"} title={"Danh sách đặt hẹn"} />
      <ListBookings />
      <ActionSheetBottom
        onConfirm={_handleConfirm}
        indexRed={1}
        options={[
          { name: "Chỉnh sửa lịch hẹn", type: "edit" },
          { name: "Huỷ lịch hẹn", type: "cancel" },
        ]}
        onClose={_handleOnCloseActionSheetBottom}
        visible={showActionSheetBottom?.flag}
      />
    </Screen>
  );
};

export default NewListBookings;

const styles = StyleSheet.create({});
