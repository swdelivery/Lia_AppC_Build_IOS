import Column from '@Components/Column'
import { IconLocation, IconOclock } from '@Components/Icon/Icon'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import {
  BASE_COLOR,
  BLACK,
  BORDER_COLOR,
  GREY,
  GREY_FOR_TITLE,
  WHITE,
} from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import ScreenKey from "@Navigation/ScreenKey";
import { openActionSheetBottom } from "@Redux/modal/actions";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import StatusBooking from "./StatusBooking";
import { Booking } from "@typings/booking";
import { OptionDotsIcon } from "src/SGV";
import moment from "moment";
import { fromUtc } from "src/utils/date";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  item: Booking;
};

const CardBooking = ({ item }: Props) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigate();

  const service = useMemo(() => {
    return item.servicesNeedCare[0];
  }, [item]);

  const appointmentDate = useMemo(() => {
    const aptDate = item.appointmentDateFinal;
    const from = moment(fromUtc(aptDate.from.dateTime));
    const to = moment(fromUtc(aptDate.to.dateTime));
    return `${from.format("HH:mm")} - ${to.format("HH:mm")} | ${from.format(
      "DD/MM/YYYY"
    )}`;
  }, [item]);

  const _handleActionSheetBottom = useCallback(() => {
    dispatch(
      openActionSheetBottom({
        flag: true,
        data: {},
      })
    );
  }, []);

  return (
    <TouchableOpacity
      onPress={navigate(ScreenKey.DETAIL_BOOKING, { booking: item })}
      activeOpacity={0.8}
      style={[styles.container, shadow]}
    >
      <Row gap={8 * 2} alignItems={"flex-start"} style={styles.avatar__title}>
        <Image
          style={styles.avatar}
          placeholderColors={[BASE_COLOR, "white"]}
          avatar={service?.representationFileArr[0]}
        />
        <Column flex={1} gap={4}>
          <Text
            numberOfLines={1}
            color={GREY_FOR_TITLE}
            size={14}
            weight="bold"
          >
            {service.name}
          </Text>
          <Text numberOfLines={1} color={BLACK} size={14} weight="regular">
            {item.branch.name}
          </Text>
          <StatusBooking status={item.status} />
        </Column>
        <TouchableOpacity
          hitSlop={styleElement.hitslopSm}
          onPress={_handleActionSheetBottom}
          style={styles.action}
        >
          <OptionDotsIcon />
        </TouchableOpacity>
      </Row>
      <View style={styles.horizonLine} />
      <Column gap={8} style={styles.infoBottom}>
        <Row gap={8}>
          <IconOclock width={8 * 2} height={8 * 2} />
          <Text>{appointmentDate}</Text>
        </Row>
        <Row gap={8}>
          <IconLocation width={8 * 2} height={8 * 2} />
          <Text>{item.branch.address}</Text>
        </Row>
      </Column>
    </TouchableOpacity>
  );
};

export default CardBooking;

const styles = StyleSheet.create({
  infoBottom: {
    padding: 8 * 2,
    paddingVertical: 8,
  },
  horizonLine: {
    width: "100%",
    height: 1,
    backgroundColor: BORDER_COLOR,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: GREY,
  },
  action: {},
  avatar__title: {
    padding: 8 * 2,
    paddingTop: 8,
  },
  avatar: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    borderRadius: 4,
  },
  container: {
    marginHorizontal: _moderateScale(8 * 2),
    // borderWidth: 1,
    borderRadius: 8,
    borderColor: BORDER_COLOR,
    backgroundColor: WHITE,
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1,

  elevation: 2,
};
