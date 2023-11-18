import Column from "@Components/Column";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  BASE_COLOR,
  BLACK,
  BLUE_FB,
  BORDER_COLOR,
  GREY,
  RED,
  WHITE,
} from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import ItemService from "./ItemService";
import { Booking } from "@typings/booking";
import { formatMonney } from "@Constant/Utils";
import useBookingStatuses from "../useBookingStatuses";
import { sum } from "lodash";
import Services from "./Services";

type Props = {
  booking: Booking;
};

const TabInfo = ({ booking }: Props) => {
  const statuses = useBookingStatuses(booking);

  const activeStatusIndex = useMemo(() => {
    return statuses.findIndex((item) => item.status === booking.status);
  }, [booking, statuses]);

  return (
    <View style={styles.container}>
      <Services booking={booking} />

      <View style={styles.mainBill}>
        <Text weight="bold">Trạng thái đặt hẹn</Text>
        <Column marginTop={8 * 2} gap={8 * 2}>
          {statuses?.map((item, index) => {
            const isCancelled = booking.status === "CANCEL";
            const isActive = activeStatusIndex >= index;
            const color =
              (!isCancelled && isActive) ||
              (isCancelled && item.status === "CANCEL")
                ? BASE_COLOR
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

                {!!item.time && isActive && (
                  <Text style={styles.timeStatus} weight="regular">
                    {moment(item?.time).format("LT")}-
                    {moment(item?.time).format("DD/MM")}
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
