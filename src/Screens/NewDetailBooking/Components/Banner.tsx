import Column from "@Components/Column";
import { IconLocation } from "@Components/Icon/Icon";
import Image from "@Components/Image";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { Booking } from "@typings/booking";
import { head } from "lodash";
import moment from "moment";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ClockIcon, ServiceIcon } from "src/SGV";
import { fromUtc } from "src/utils/date";

type Props = {
  booking: Booking;
};

const Banner = ({ booking }: Props) => {
  const service = useMemo(() => {
    return head(booking?.servicesNeedCare);
  }, [booking]);

  const appointmentDate = useMemo(() => {
    const aptDate = booking.appointmentDateFinal;
    if (!aptDate) {
      return "";
    }
    const from = moment(fromUtc(aptDate.from.dateTime));
    const to = moment(fromUtc(aptDate.to.dateTime));
    return `${from.format("HH:mm")} - ${to.format("HH:mm")} | ${from.format(
      "DD/MM/YYYY"
    )}`;
  }, [booking]);

  return (
    <View style={styles.container}>
      <Image style={styleElement.flex} avatar={service?.avatar} />
      <Column
        backgroundColor={"rgba(0,0,0,0.5)"}
        style={StyleSheet.absoluteFillObject}
        justifyContent="center"
      >
        <Column paddingHorizontal={16} gap={8}>
          <Row gap={8}>
            <Column width={30}>
              <ServiceIcon />
            </Column>
            <Text weight="bold" color={"white"} size={16}>
              {service?.name}
            </Text>
          </Row>
          <Row>
            <Column width={30} alignItems={"center"}>
              <ClockIcon color={"white"} width={20} height={20} />
            </Column>
            <Text weight="bold" color={"white"} size={16}>
              {appointmentDate}
            </Text>
          </Row>
          <Row alignItems="flex-start">
            <Column width={30} alignItems={"center"} top={3}>
              <IconLocation color={"white"} width={20} height={20} />
            </Column>
            <Text weight="bold" color={"white"} size={16}>
              {booking?.branch?.address}
            </Text>
          </Row>
        </Column>
      </Column>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    width: _width,
    height: (_width * 9) / 16,
    marginBottom: 8,
  },
});
