import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import {
  BASE_COLOR,
  BG_GREY_OPACITY_5,
  BLACK,
  BORDER_COLOR,
  GREY,
  RED,
  WHITE,
} from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { formatMonney } from "@Constant/Utils";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Booking } from "@typings/booking";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, getOrderPayments } from "@Redux/user/actions";
import {
  getOrderDetailsState,
  getOrderPaymentState,
} from "@Redux/user/selectors";
import ItemService from "./ItemService";
import { head, sum } from "lodash";
import ItemInsurance from "@Screens/NewCreateBooking/Components/ItemInsurance";
import { calculateDiscountAmount } from "src/utils/booking";
import Collapsible from "react-native-collapsible";

const PAYMENT_FOR = {
  WALLET: "Ví",
  DEPOSIT: "Cọc",
  ORDER: "Thanh toán",
};

const PAYMENT_METHODS = {
  CASH: "Tiền mặt",
  CARDTRANSFER: "Chuyển khoản",
  BANK_TRANSFER: "Chuyển khoán",
  WALLETTRANSFER: "Ví",
};

type Props = {
  booking: Booking;
};

const TabPayment = ({ booking }: Props) => {
  const dispatch = useDispatch();
  const { data: orderPayments } = useSelector(getOrderPaymentState);
  const { data: orderDetails } = useSelector(getOrderDetailsState);

  // useEffect(() => {
  //   dispatch(
  //     getPaymentRequest.request({
  //       bookingId: booking._id,
  //     })
  //   );
  //   dispatch(getBookingDeposits.request(booking._id));
  // }, [booking._id]);

  useEffect(() => {
    console.log({ orderId: booking.orderId });
    if (booking.orderId) {
      dispatch(getOrderDetails.request(booking.orderId));
      dispatch(getOrderPayments.request(booking.orderId));
    }
  }, [booking.orderId]);

  const isRefundCoupon = useMemo(
    () => head(orderDetails?.partnerCoupons)?.coupon?.couponType === "Refund",
    [orderDetails]
  );

  const discountAmount = useMemo(() => {
    return sum(
      (orderDetails?.partnerCoupons || []).map((item) => {
        return calculateDiscountAmount(item, orderDetails.totalAmount);
      })
    );
  }, [orderDetails]);

  const discountLevel = useMemo(() => {
    if (!orderDetails?.partnerLevelPromotion) return 0;
    return (
      (orderDetails.totalAmount *
        orderDetails.partnerLevelPromotion.discountRetailService) /
      100
    );
  }, [orderDetails]);

  const totalAmount = useMemo(() => {
    if (!orderDetails) {
      return 0;
    }
    return orderDetails.totalAmount - discountAmount - discountLevel;
  }, [orderDetails]);

  return (
    <View style={styles.container}>
      <Column gap={8 * 2} paddingTop={16} marginBottom={16}>
        <Row gap={8 * 2} paddingHorizontal={8 * 2}>
          <Card
            title={"Tổng"}
            price={formatMonney(totalAmount) + " VNĐ"}
            bgColor={"#56A0FF"}
          />
          <Card
            title={"Cọc"}
            price={
              formatMonney(
                orderDetails?.totalAmountDeposit -
                  orderDetails?.totalRefundDeposit
              ) + " VNĐ"
            }
            bgColor={"#FFBC46"}
          />
        </Row>
        <Row gap={8 * 2} paddingHorizontal={8 * 2}>
          <Card
            title={"Đã trả"}
            price={formatMonney(orderDetails?.totalAmountPayment) + " VNĐ"}
            bgColor={"#10780E"}
          />
          <Card
            title={"Hoàn tiền"}
            price={formatMonney(orderDetails?.totalRefundPayment) + " VNĐ"}
            bgColor={"#FF7895"}
          />
        </Row>

        <Row gap={8 * 2} paddingHorizontal={8 * 2}>
          <Card
            title={"Còn lại"}
            price={formatMonney(orderDetails?.remainingAmount) + " VNĐ"}
            bgColor={"#A745F2"}
          />
        </Row>
      </Column>

      <View style={styles.title}>
        <Text weight="bold" color={BLACK}>
          Danh sách dịch vụ
        </Text>
      </View>
      {(orderDetails?.services || []).map((item, index) => {
        return <ItemService key={item.service._id} item={item} />;
      })}
      {orderDetails?.insurances?.length > 0 && (
        <>
          <Text weight="bold" color={BLACK} top={16} left={16}>
            Danh sách bảo hiểm
          </Text>
          {orderDetails.insurances.map((item) => {
            return <ItemInsurance item={item.insurance} key={item._id} />;
          })}
        </>
      )}

      <Column paddingHorizontal={16} paddingTop={16} gap={8}>
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
          {orderDetails?.partnerLevelPromotion && (
            <Text size={12}>
              Bậc hiện tại:{" "}
              <Text size={12} weight="bold">
                {booking.partnerLevelPromotion.name}
              </Text>
              {` giảm ${booking.partnerLevelPromotion.discountRetailService}%`}
            </Text>
          )}
        </Column>
      </Column>

      {orderPayments?.length > 0 && (
        <Column paddingHorizontal={16}>
          <Row paddingVertical={16}>
            <Text weight="bold">Thanh toán</Text>
          </Row>
          <View style={styles.topRowTable}>
            <View style={styles.topRowTable__child}>
              <Text style={styles.titleTable}>Thời gian</Text>
            </View>
            <View style={styles.topRowTable__child}>
              <Text style={styles.titleTable}>Số tiền</Text>
            </View>
            <View style={styles.topRowTable__child}>
              <Text style={styles.titleTable}>Hình thức</Text>
            </View>
          </View>
          {orderPayments.map((item, index) => {
            return (
              <View key={index} style={styles.bodyRowTable}>
                <View style={styles.bodyRowTable__child}>
                  <Text style={[styles.textTable]}>
                    {moment(item.created).format("LT")} -{" "}
                    {moment(item.created).format("DD/MM/YYYY")}
                  </Text>
                </View>
                <View style={styles.bodyRowTable__child}>
                  <Text style={styles.textTable}>
                    {formatMonney(item.amount)}
                  </Text>
                  <Text style={styles.textTable}>{item.currencyCode}</Text>
                  {item.isRefund && (
                    <Text color={RED} style={styles.textTable}>
                      (Hoàn tiền)
                    </Text>
                  )}
                </View>
                <View style={styles.bodyRowTable__child}>
                  <Text>
                    {PAYMENT_METHODS[item.methodCode] ?? item.methodCode}
                  </Text>
                </View>
              </View>
            );
          })}
        </Column>
      )}
    </View>
  );
};

const Card = ({ title, price, bgColor }) => {
  return (
    <Column style={[styleElement.flex, styles.box]} backgroundColor={bgColor}>
      <Column gap={8} style={styleElement.centerChild}>
        <Text weight="bold" color={WHITE}>
          {title}
        </Text>
        <Text weight="bold" color={WHITE}>
          {price}
        </Text>
      </Column>
    </Column>
  );
};

export default TabPayment;

const styles = StyleSheet.create({
  bodyRowTable__child: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: BG_GREY_OPACITY_5,
    padding: _moderateScale(4),
    justifyContent: "center",
    alignItems: "center",
  },
  bodyRowTable: {
    flex: 1,
    flexDirection: "row",
  },
  topRowTable__child: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: BG_GREY_OPACITY_5,
    alignItems: "center",
    padding: _moderateScale(4),
  },
  topRowTable: {
    flex: 1,
    flexDirection: "row",
    marginTop: _moderateScale(0),
  },
  bill: {
    padding: _moderateScale(8 * 2),
    justifyContent: "space-between",
  },
  textTable: {
    // color: GREY,
    textAlign: "center",
  },
  titleTable: {
    // color: GREY,
  },
  box: {
    height: _moderateScale(8 * 10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  avatarPartner: {
    width: "100%",
    height: _moderateScale(8 * 25),
    borderRadius: 8,
  },
  timeStatus: {
    color: BLACK,
    fontStyle: "italic",
  },
  dotNumber: {
    width: _moderateScale(8 * 3),
    height: _moderateScale(8 * 3),
    borderRadius: _moderateScale((8 * 3) / 2),
    backgroundColor: GREY,
    justifyContent: "center",
    alignItems: "center",
  },
  mainBill: {
    padding: _moderateScale(8 * 2),
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
