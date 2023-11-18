import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BG_GREY_OPACITY_5, BLACK, BORDER_COLOR, GREY, RED, WHITE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import moment from 'moment'
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Booking } from "@typings/booking";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingDeposits,
  getOrderDetails,
  getOrderPayments,
  getPaymentRequest,
} from "@Redux/user/actions";
import {
  getOrderDetailsState,
  getOrderPaymentState,
} from "@Redux/user/selectors";
import Services from "./Services";
import ItemService from "./ItemService";
import Voucher from "./Voucher";

const PAYMENT_FOR = {
  WALLET: "Ví",
  DEPOSIT: "Cọc",
  ORDER: "Thanh toán",
};

const PAYMENT_METHODS = {
  CASH: "Tiền mặt",
  CARDTRANSFER: "Chuyển khoản",
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

  console.log({ orderDetails });

  return (
    <View style={styles.container}>
      <Column gap={8 * 2} paddingTop={16} marginBottom={16}>
        <Row gap={8 * 2} paddingHorizontal={8 * 2}>
          <Card
            title={"Tổng"}
            price={formatMonney(orderDetails?.totalAmount) + " VNĐ"}
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
        return <ItemService key={item.service._id} item={item.service} />;
      })}

      <Column paddingHorizontal={16} paddingTop={16}>
        <Voucher booking={booking} />
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
                  <Text>{PAYMENT_METHODS[item.methodCode]}</Text>
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
