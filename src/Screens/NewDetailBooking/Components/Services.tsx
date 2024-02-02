import Text from "@Components/Text";
import { Booking } from "@typings/booking";
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import ItemService from "./ItemService";
import Column from "@Components/Column";
import Row from "@Components/Row";
import { BASE_COLOR, BLACK } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import { head, sum } from "lodash";
import ItemInsurance from "@Screens/NewCreateBooking/Components/ItemInsurance";
import { calculateDiscountAmount } from "src/utils/booking";
import Collapsible from "react-native-collapsible";

type Props = {
  booking: Booking;
};

export default function Services({ booking }: Props) {
  const discountAmount = useMemo(() => {
    return sum(
      (booking.partnerCoupons || []).map((item) => {
        return calculateDiscountAmount(item, booking.totalAmount);
      })
    );
  }, [booking]);

  const discountLevel = useMemo(() => {
    if (!booking.partnerLevelPromotion) return 0;
    return (
      (booking.totalAmount *
        booking.partnerLevelPromotion.discountRetailService) /
      100
    );
  }, [booking]);

  const isRefundCoupon = useMemo(
    () => head(booking.partnerCoupons)?.coupon?.couponType == "Refund",
    [booking]
  );

  const totalAmount = useMemo(() => {
    return Math.max(
      booking.totalAmount -
        discountLevel -
        (isRefundCoupon ? 0 : discountAmount),
      0
    );
  }, [booking, isRefundCoupon, discountAmount, discountLevel]);

  return (
    <View style={styles.container}>
      <Text weight="bold" color={BLACK} top={8} left={16}>
        Danh sách dịch vụ
      </Text>
      {booking.services &&
        booking.services?.map((item, index) => {
          return <ItemService key={item._id} item={item} />;
        })}
      {booking.insurances?.length > 0 && (
        <>
          <Text weight="bold" color={BLACK} top={16} left={16}>
            Danh sách bảo hiểm
          </Text>
          {booking.insurances.map((item) => {
            return <ItemInsurance item={item.insurance} key={item._id} />;
          })}
        </>
      )}
      <Column gap={8} paddingHorizontal={16} marginTop={16}>
        <Column>
          <Row justifyContent="space-between">
            <Text weight="bold">Ưu đãi:</Text>
            <Text color={BASE_COLOR} weight="bold">
              {`${isRefundCoupon ? "" : "-"}${formatMonney(
                discountAmount,
                true
              )}`}
            </Text>
          </Row>
          <Collapsible collapsed={isRefundCoupon ? false : true}>
            <Text size={12}>
              (*) Tiền sẽ được hoàn về ví sau khi thanh toán{" "}
            </Text>
          </Collapsible>
        </Column>
        <Column>
          <Row justifyContent="space-between">
            <Text weight="bold">Giảm giá dựa trên bậc hạng:</Text>
            <Text color={BASE_COLOR} weight="bold">
              {`-${formatMonney(discountLevel, true)}`}
            </Text>
          </Row>
          {booking.partnerLevelPromotion && (
            <Text size={12}>
              Bậc hiện tại:{" "}
              <Text size={12} weight="bold">
                {booking.partnerLevelPromotion.name}
              </Text>
              {` giảm ${booking.partnerLevelPromotion.discountRetailService}%`}
            </Text>
          )}
        </Column>
        <Row justifyContent="space-between">
          <Text weight="bold">Tạm tính:</Text>
          <Text color={"#0053BD"} weight="bold">
            {`${formatMonney(totalAmount, true)}`}
          </Text>
        </Row>
      </Column>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});
