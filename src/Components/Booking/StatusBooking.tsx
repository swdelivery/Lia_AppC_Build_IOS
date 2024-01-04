import { StyleSheet } from "react-native";
import React from "react";
import Row from "@Components/Row";
import Text from "@Components/Text";
import Column from "@Components/Column";
import { BookingStatus } from "@typings/booking";
import { BLUE_FB, GREEN_SUCCESS, GREY } from "@Constant/Color";

const STATUS: Record<BookingStatus, { name: string; color: string }> = {
  WAIT: {
    name: "Chưa Check-In",
    color: GREY,
  },
  WAS_CHECK_IN: {
    name: "Đã Check-In",
    color: GREY,
  },
  WAIT_CONSULTATION: {
    name: "Đang chờ",
    color: "orange",
  },
  IS_CONSULTING: {
    name: "Đang tư vấn",
    color: "orange",
  },
  WAS_CONSULTED: {
    name: "Hoàn thành tư vấn",
    color: "orange",
  },
  WAIT_PROGRESS: {
    name: "Đang chờ điều trị",
    color: BLUE_FB,
  },
  IN_PROGRESS: {
    name: "Đang điều trị",
    color: BLUE_FB,
  },
  COMPLETE_PROGRESS: {
    name: "Hoàn thành điều trị",
    color: GREEN_SUCCESS,
  },
  WAS_CHECK_OUT: {
    name: "Đã check-out",
    color: GREEN_SUCCESS,
  },
  CANCEL: {
    name: "Đã hủy",
    color: "red",
  },
};

type Props = {
  status: BookingStatus;
  // other props
};

const StatusBooking = ({ status }: Props) => {
  return (
    <Row gap={8}>
      <Column style={styles.dot} backgroundColor={STATUS[status]?.color} />
      <Text weight="bold" color={STATUS[status]?.color}>
        {STATUS[status]?.name}
      </Text>
    </Row>
  );
};

export default StatusBooking;

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    top: 1.5,
  },
});
