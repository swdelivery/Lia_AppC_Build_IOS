import { Booking } from "@typings/booking";
import { useMemo } from "react";

export default function useBookingStatuses(booking: Booking) {
  return useMemo(() => {
    return [
      //   {
      //     id: 0,
      //     name: "Đang chờ",
      //     status: "WAIT",
      //     time: booking.created,
      //   },
      {
        id: 1,
        name: "Check-In",
        status: "WAIT_CONSULTATION",
        time: booking.checkInAt,
      },
      {
        id: 2,
        name: "Bắt đầu tư vấn",
        status: "IS_CONSULTING",
        time: booking.startConsultationAt,
      },
      {
        id: 3,
        name: "Hoàn thành tư vấn",
        status: "WAS_CONSULTED",
        time: booking.completeConsultationAt,
      },
      {
        id: 4,
        name: "Bắt đầu điều trị",
        status: "IN_PROGRESS",
        time: booking.startProgressAt,
      },
      {
        id: 5,
        name: "Hoàn thành điều trị",
        status: "COMPLETE_PROGRESS",
        time: booking.completeProgressAt,
      },
      {
        id: 6,
        name: "Check-Out",
        status: "WAS_CHECK_OUT",
        time: booking.checkOutAt,
      },
      {
        id: 7,
        name: "Huỷ đặt lịch hẹn",
        status: "CANCEL",
        time: booking.cancelAt,
      },
    ];
  }, [booking]);
}
