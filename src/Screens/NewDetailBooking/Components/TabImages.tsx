import Column from '@Components/Column'
import Image from "@Components/Image";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BASE_COLOR, BLACK, BORDER_COLOR, GREY } from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { getTreatmentServices } from "@Redux/user/actions";
import { getTreatmentServicesState } from "@Redux/user/selectors";
import { Booking } from "@typings/booking";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  booking: Booking;
};

const TabImages = ({ booking }: Props) => {
  const dispatch = useDispatch();
  const { data } = useSelector(getTreatmentServicesState);

  useEffect(() => {
    dispatch(getTreatmentServices.request({ bookingId: booking._id }));
  }, []);

  return (
    <View style={styles.container}>
      {data.map((item) => {
        return (
          <Column gap={8 * 2} key={item._id}>
            <View style={styles.title}>
              <Text weight="bold" color={BASE_COLOR}>
                {item.serviceName}
              </Text>
            </View>

            <Row gap={8 * 2} paddingHorizontal={8 * 2}>
              <View style={[styleElement.flex, styleElement.centerChild]}>
                <Image
                  style={styles.avatarPartner}
                  avatar={item.imageBeforeTreatment[0]}
                />
                <Text fontStyle="italic" top={8}>
                  Ảnh trước điều trị
                </Text>
              </View>

              <View style={[styleElement.flex, styleElement.centerChild]}>
                <Image
                  style={styles.avatarPartner}
                  avatar={item.imageAfterTreatment[0]}
                />
                <Text fontStyle="italic" top={8}>
                  Ảnh sau điều trị
                </Text>
              </View>
            </Row>
          </Column>
        );
      })}
    </View>
  );
};

export default TabImages;

const styles = StyleSheet.create({
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
