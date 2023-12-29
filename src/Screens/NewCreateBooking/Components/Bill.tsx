import { StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { _moderateScale } from "@Constant/Scale";
import Text from "@Components/Text";
import Row from "@Components/Row";
import Column from "@Components/Column";
import { BASE_COLOR, RED } from "@Constant/Color";
import { useSelector } from "react-redux";
import { getDataCreateBookingState } from "@Redux/booking/selectors";
import { formatMonney } from "@Constant/Utils";
import Collapsible from "react-native-collapsible";
import { getServicePrice } from "@Constant/service";
import { sumBy } from "lodash";

const Bill = () => {
  const { dataCoupon, dataServices, dataInsurance } = useSelector(
    getDataCreateBookingState
  );

  const servicesPrice = useMemo(() => {
    return sumBy(dataServices, (service) => getServicePrice(service));
  }, [dataServices]);

  const insurancePrice = useMemo(() => {
    return sumBy(dataInsurance, (item: any) => item.price);
  }, [dataInsurance]);

  const originPrice = servicesPrice + insurancePrice;

  const discountAmount = useMemo(() => {
    if (dataCoupon?._id && originPrice) {
      if (dataCoupon?.coupon?.couponType == "Discount") {
        if (dataCoupon?.coupon?.discountType == "fixed") {
          if (originPrice > dataCoupon?.coupon?.minRequiredOrderAmount) {
            return dataCoupon?.coupon?.discountAmount;
          }
        } else if (dataCoupon?.coupon?.discountType == "percent") {
          if (originPrice > dataCoupon?.coupon?.minRequiredOrderAmount) {
            let discountAmountTemp =
              (originPrice * dataCoupon?.coupon?.discountAmount) / 100;
            if (discountAmountTemp > dataCoupon?.coupon?.maxAmountDiscount) {
              return dataCoupon?.coupon?.maxAmountDiscount;
            } else {
              return (originPrice * dataCoupon?.coupon?.discountAmount) / 100;
            }
          }
        }
      } else if (dataCoupon?.coupon?.couponType == "Refund") {
        if (dataCoupon?.coupon?.discountType == "fixed") {
          if (originPrice > dataCoupon?.coupon?.minRequiredOrderAmount) {
            return dataCoupon?.coupon?.discountAmount;
          }
        } else if (dataCoupon?.coupon?.discountType == "percent") {
          if (originPrice > dataCoupon?.coupon?.minRequiredOrderAmount) {
            let discountAmountTemp =
              (originPrice * dataCoupon?.coupon?.discountAmount) / 100;
            if (discountAmountTemp > dataCoupon?.coupon?.maxAmountDiscount) {
              return dataCoupon?.coupon?.maxAmountDiscount;
            } else {
              return (originPrice * dataCoupon?.coupon?.discountAmount) / 100;
            }
          }
        }
      }
    } else {
      return null;
    }
  }, [dataCoupon, originPrice]);

  return (
    <View style={styles.container}>
      <Column gap={8}>
        <Row style={{ justifyContent: "space-between" }}>
          <Text size={14} weight="bold">
            Tổng tiền dịch vụ tạm tính:{" "}
          </Text>
          <Text size={14} weight="regular">
            {formatMonney(originPrice)} VNĐ
          </Text>
        </Row>
        <Row
          alignItems="flex-start"
          style={{ justifyContent: "space-between" }}
        >
          <Column gap={4} flex={1}>
            <Text size={14} weight="bold">
              Ưu đãi:
            </Text>
            <Collapsible
              collapsed={
                dataCoupon?.coupon?.couponType == "Refund" ? false : true
              }
            >
              <Text size={12}>
                (*) Tiền sẽ được hoàn về ví sau khi thanh toán{" "}
              </Text>
            </Collapsible>
          </Column>
          <Text size={14} color={RED} weight="regular">
            - {formatMonney(discountAmount)} VNĐ
          </Text>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <Text size={14} weight="bold">
            Tổng thanh toán tạm tính:
          </Text>
          <Text size={14} weight="bold" color={BASE_COLOR}>
            {formatMonney(originPrice - discountAmount)} VNĐ
          </Text>
        </Row>
      </Column>
    </View>
  );
};

export default Bill;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _moderateScale(8 * 2),
  },
});
