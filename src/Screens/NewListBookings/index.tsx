import Column from "@Components/Column";
import LiAHeader from "@Components/Header/LiAHeader";
import ActionSheetBottom from "@Components/ModalBottom/ActionSheetBottom";
import Screen from "@Components/Screen";
import { NEW_BASE_COLOR } from "@Constant/Color";
import { styleElement } from "@Constant/StyleElement";
import ScreenKey from "@Navigation/ScreenKey";
import { closeActionSheetBottom } from "@Redux/modal/actions";
import { getStateActionSheetBottom } from "@Redux/modal/selectors";
import { cancelPartnerBooking } from "@Redux/user/actions";
import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "src/Hooks/useNavigation";
import ListBookings from "./ListBookings";

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
    } else if (data?.type === 'cancel') {
      dispatch(
        cancelPartnerBooking.request(showActionSheetBottom?.data?._id)
      );
    }
  };

  return (
    <Screen style={styleElement.flex}>
      <LiAHeader safeTop bg={NEW_BASE_COLOR} title={"Lịch hẹn"} />
      <Column flex={1}>
        <ListBookings />
      </Column>
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
