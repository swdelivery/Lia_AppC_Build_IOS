import ActionButton from "@Components/ActionButton/ActionButton";
import CachedImageView from "@Components/CachedImage";
import Column from "@Components/Column";
import { IconCancelGrey } from "@Components/Icon/Icon";
import Row from "@Components/Row";
import Screen from "@Components/Screen";
import { StatusBar } from "@Components/StatusBar";
import Text from "@Components/Text";
import Toggle from "@Components/Toggle/Toggle";
import { BORDER_COLOR } from "@Constant/Color";
import { sizeIcon } from "@Constant/Icon";
import ScreenKey from "@Navigation/ScreenKey";
import {
  createCheckinBookingForPartner,
  getBookingDataForPartner,
} from "@Redux/Action/BookingAction";
import { selectBookingForCheckin } from "@Redux/qrCheckin/actions";
import { FlashList } from "@shopify/flash-list";
import { RenderItemProps } from "@typings/common";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import useCallbackItem from "src/Hooks/useCallbackItem";
import { useNavigate, useNavigationParams } from "src/Hooks/useNavigation";

type ScreenKey = typeof ScreenKey.QR_CODE_BOOKING_LIST;

export default function NewQrBookingList() {
  const dispatch = useDispatch();
  const { navigation } = useNavigate();
  const { branchCode } = useNavigationParams<ScreenKey>();
  const [choiceBooking, setChoiceBooking] = useState(null);
  const [currDataBooking, setCurrDataBooking] = useState({
    show: false,
    data: [],
  });

  const _handleConfirm = useCallback(() => {
    dispatch(selectBookingForCheckin(choiceBooking));
    navigation.navigate(ScreenKey.PICK_UTILITIES);
  }, [choiceBooking]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let resultGetBookingDataForPartner = await getBookingDataForPartner({
      condition: {
        branchCode: {
          in: [branchCode],
        },
        status: {
          in: ["WAIT"],
        },
      },
      limit: 100,
      sort: {
        "appointmentDateFinal.from.dateTime": 1,
      },
    });
    if (resultGetBookingDataForPartner?.isAxiosError) return;

    if (resultGetBookingDataForPartner?.data?.data?.length > 0) {
      setCurrDataBooking((old) => {
        return {
          ...old,
          show: true,
          data: resultGetBookingDataForPartner?.data?.data,
        };
      });
    }

    if (isEmpty(resultGetBookingDataForPartner?.data?.data)) {
      return Alert.alert(
        "Danh sách booking trống",
        "Xác nhận tạo Booking tự động và checkin?",
        [
          {
            text: "Huỷ",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Đồng ý",
            onPress: async () => {
              let resultCreateCheckinBookingForPartner =
                await createCheckinBookingForPartner({
                  branchCode: branchCode,
                });
              if (resultCreateCheckinBookingForPartner?.isAxiosError) return;
              navigation.goBack();
              navigation.navigate(ScreenKey.LIST_BOOKING);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const toggleItem = useCallback(
    (data: any) => {
      if (choiceBooking?._id == data?._id) {
        setChoiceBooking(null);
      } else {
        setChoiceBooking(data);
      }
    },
    [choiceBooking]
  );

  function renderItem({ item }: RenderItemProps<any>) {
    return (
      <ItemBooking
        data={item}
        onSelect={toggleItem}
        selectedItem={choiceBooking}
      />
    );
  }

  return (
    <Screen safeBottom safeTop>
      <StatusBar barStyle="dark-content" />
      <Row marginVertical={8 * 2} justifyContent="center">
        <Text weight="bold" size={16}>
          Danh sách booking
        </Text>
        <TouchableOpacity onPress={navigation.goBack} style={styles.cancelBtn}>
          <IconCancelGrey style={sizeIcon.md} />
        </TouchableOpacity>
      </Row>
      <FlashList
        data={currDataBooking?.data ?? []}
        renderItem={renderItem}
        estimatedItemSize={80}
        extraData={choiceBooking}
      />
      <ActionButton
        onPress={_handleConfirm}
        colors={["#34759b", "#1a3e67"]}
        disabled={!choiceBooking?._id}
        title="Check in Booking"
      />
    </Screen>
  );
}

const ItemBooking = ({ data, onSelect, selectedItem }) => {
  const trigger = useCallbackItem(data);

  const { services } = data;

  const isActive = selectedItem?._id === data?._id;

  return (
    <Row
      padding={8 * 2}
      borderWidth={1}
      borderColor={BORDER_COLOR}
      borderRadius={8}
      margin={8 * 2}
    >
      <Row gap={8}>
        <CachedImageView
          style={styles.avatarService}
          avatar={services[0]?.service?.avatar}
        />
        <Column gap={8} flex={1}>
          <Text size={12} numberOfLines={2}>
            {services[0]?.service?.name}
          </Text>
          <Row>
            <Text size={12}>
              {moment(data?.appointmentDateFinal?.date).format("DD/MM/YYYY")}
            </Text>
            <Text>-</Text>
            <Text size={12}>
              {moment(data?.appointmentDateFinal?.from?.dateTime).format(
                "HH:mm"
              )}
            </Text>
          </Row>
        </Column>
        <Toggle onPress={trigger(onSelect)} isActive={isActive} />
      </Row>
    </Row>
  );
};

const styles = StyleSheet.create({
  cancelBtn: {
    position: "absolute",
    right: 8 * 4,
  },
  avatarService: {
    width: 8 * 14,
    height: (8 * 14 * 9) / 16,
    borderRadius: 8,
  },
});
