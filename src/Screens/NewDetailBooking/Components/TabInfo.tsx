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

type Props = {
  booking: Booking;
};

const TabInfo = ({ booking }: Props) => {
  const [listService, setListService] = useState([1, 2]);
  const [listStatus, setListStatus] = useState([
    {
      _id: "2",
      name: "CheckIn",
      status: "WAIT_CONSULTATION",
      time: moment(),
    },
    {
      _id: "3",
      name: "Bắt đầu tư vấn",
      status: "IS_CONSULTING",
      time: moment(),
    },
    {
      _id: "4",
      name: "Hoàn thành tư vấn",
      status: "WAS_CONSULTED",
      time: moment(),
    },
    {
      _id: "5",
      name: "Bắt đầu điều trị",
      status: "IN_PROGRESS",
    },
    {
      _id: "6",
      name: "Hoàn thành điều trị",
      status: "COMPLETE_PROGRESS",
    },
    {
      _id: "5",
      name: "CheckOut",
      status: "WAS_CHECK_OUT",
    },
    {
      _id: "6",
      name: "Huỷ",
      status: "CANCEL",
    },
  ]);

  const totalAmount = useMemo(() => {
    let total = 0;
    booking.servicesNeedCare?.map((item) => {
      total += item.price;
    });
    return total;
  }, [booking]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text weight="bold" color={BLACK}>
          Danh sách dịch vụ
        </Text>
      </View>
      {booking.servicesNeedCare &&
        booking.servicesNeedCare?.map((item, index) => {
          return <ItemService key={item._id} item={item} />;
        })}
      <Column gap={8 * 2} style={styles.mainBill}>
        <Row style={styles.bill}>
          <Text weight="bold">Ưu đãi:</Text>
          <Text color={RED} weight="bold">
            0 VNĐ
          </Text>
        </Row>
        <Row style={styles.bill}>
          <Text weight="bold">Tạm tính:</Text>
          <Text color={BLUE_FB} weight="bold">
            {`${formatMonney(totalAmount)} VNĐ`}
          </Text>
        </Row>
      </Column>

      <View style={styles.mainBill}>
        <Text weight="bold">Trạng thái đặt hẹn</Text>
        <Column marginTop={8 * 2} gap={8 * 2}>
          {listStatus?.map((item, index) => {
            if (item?.time) {
              return (
                <View>
                  <Row gap={8}>
                    <View
                      style={[
                        styles.dotNumber,
                        { backgroundColor: BASE_COLOR },
                      ]}
                    >
                      <Text weight="bold" color={WHITE}>
                        {index + 1}
                      </Text>
                    </View>
                    <Text
                      style={styleElement.flex}
                      weight="bold"
                      color={BASE_COLOR}
                    >
                      {item?.name}
                    </Text>

                    <Text style={styles.timeStatus} weight="regular">
                      {moment(item?.time).format("LT")}-
                      {moment(item?.time).format("DD/MM")}
                    </Text>
                  </Row>
                </View>
              );
            } else {
              return (
                <View>
                  <Row gap={8}>
                    <View style={styles.dotNumber}>
                      <Text weight="bold" color={WHITE}>
                        {index + 1}
                      </Text>
                    </View>
                    <Text weight="bold" color={GREY}>
                      {item?.name}
                    </Text>
                  </Row>
                </View>
              );
            }
          })}
        </Column>
      </View>

      <View style={{ height: 100 }} />
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
    backgroundColor: GREY,
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
  container: {},
});
