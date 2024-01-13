import Column from "@Components/Column";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  BASE_COLOR,
  BLACK,
  BORDER_COLOR,
  GREY,
  PRICE_ORANGE,
  WHITE,
} from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import moment from "moment";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Booking } from "@typings/booking";
import useBookingStatuses from "../useBookingStatuses";
import Services from "./Services";

type Props = {
  booking: Booking;
};

const TabInfo = ({ booking }: Props) => {
  const statuses = useBookingStatuses(booking);

  return (
    <View style={styles.container}>
      <Services booking={booking} />

      <View style={styles.mainBill}>
        <Text weight="bold">Trạng thái đặt hẹn</Text>
        <Column marginTop={8 * 2} gap={8 * 2}>
          {statuses?.map((item, index) => {
            const isCancelled = booking.status === "CANCEL";
            const isActive = !!item.time;
            const color =
              !isCancelled && isActive
                ? BASE_COLOR
                : isCancelled && item.status === "CANCEL"
                ? PRICE_ORANGE
                : GREY;

            return (
              <Row gap={8} key={item.id}>
                <Column style={styles.dotNumber} backgroundColor={color}>
                  <Text weight="bold" color={WHITE}>
                    {index + 1}
                  </Text>
                </Column>
                <Text style={styleElement.flex} weight="bold" color={color}>
                  {item?.name}
                </Text>

                {!!item.time && (
                  <Text style={styles.timeStatus} weight="regular">
                    {moment(item?.time).format("LT")}-
                    {moment(item?.time).format("DD/MM/YYYY")}
                  </Text>
                )}
              </Row>
            );
          })}
        </Column>
      </View>
    </View>
  );
};

export default TabInfo;

const styles = StyleSheet.create({
  timeStatus: {
    color: BLACK,
    fontStyle: "italic",
  },
  dotNumber: {
    width: _moderateScale(8 * 3),
    height: _moderateScale(8 * 3),
    borderRadius: _moderateScale((8 * 3) / 2),
    justifyContent: "center",
    alignItems: "center",
  },
  mainBill: {
    padding: _moderateScale(8 * 2),
  },
  bill: {
    justifyContent: "space-between",
  },
  itemService: {
    padding: _moderateScale(8 * 2),
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  avatarService: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    borderRadius: 8,
  },
  title: {
    padding: _moderateScale(8 * 2),
    paddingBottom: 0,
  },
  container: {
    paddingBottom: 60,
  },
});
