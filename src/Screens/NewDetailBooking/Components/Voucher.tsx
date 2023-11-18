import Row from "@Components/Row";
import Text from "@Components/Text";
import { BASE_COLOR, RED } from "@Constant/Color";
import { Booking } from "@typings/booking";
import { sum } from "lodash";
import React, { useMemo } from "react";

type Props = {
  booking: Booking;
};

export default function Voucher({ booking }: Props) {
  const totalAmount = useMemo(() => {
    let total = 0;
    booking.servicesNeedCare?.map((item) => {
      total += item.price;
    });
    return total;
  }, [booking]);

  const discountAmount = useMemo(() => {
    return sum(
      (booking.partnerCoupons || []).map((item) => {
        if (item.coupon.discountType === "percent") {
          const discount = (totalAmount * item.coupon.discountAmount) / 100;
          return Math.min(discount, item.coupon.maxAmountDiscount);
        }
        if (item.coupon.discountType === "fixed") {
          return item.coupon.discountAmount;
        }
        return 0;
      })
    );
  }, [totalAmount]);

  return (
    <Row justifyContent="space-between">
      <Text weight="bold">Ưu đãi:</Text>
      <Text color={BASE_COLOR} weight="bold">
        {`-${discountAmount}`} VNĐ
      </Text>
    </Row>
  );
}
