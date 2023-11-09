import React, { memo, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import { navigation } from "../../../../rootNavigation";
import ScreenKey from "../../../Navigation/ScreenKey";
import { useSelector } from "react-redux";
import { URL_ORIGINAL } from "../../../Constant/Url";
import CountStar2 from "@Components/NewCountStar/CountStar";
import HorizontalDoctors from "@Components/HorizontalDoctors";

const ListDoctor = () => {
  const listDoctorRedux = useSelector(
    (state) => state?.bookingReducer?.listDoctor
  );

  const doctors = useMemo(() => {
    return listDoctorRedux?.slice(0, 5) || [];
  }, [listDoctorRedux]);

  return (
    <HorizontalDoctors items={doctors} containerStyle={styles.container} />
  );
};

export default ListDoctor;

const styles = StyleSheet.create({
  start: {
    width: 8 * 1.25,
    height: 8 * 1.25,
    marginLeft: 1,
    resizeMode: "contain",
  },
  btnFls: {
    paddingHorizontal: 8 * 1,
    paddingVertical: 4,
    borderRadius: 8 * 2,
    backgroundColor: "#EB4D49",
  },
  fls__title: {
    width: 100,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: _widthScale(350),
    // height: _widthScale(170),
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,1)",
    paddingVertical: 8,
    flexDirection: "row",
  },
});
