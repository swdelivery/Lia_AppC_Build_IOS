import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import { useSelector } from "react-redux";
import HorizontalDoctors from "@Components/HorizontalDoctors";

const ListDoctor = () => {
  const listDoctorRedux = useSelector(
    (state) => state?.bookingReducer?.listDoctor
  );

  return (
    <HorizontalDoctors
      title="Bác sĩ/Chuyên viên hàng đầu"
      items={listDoctorRedux}
      containerStyle={styles.container}
    />
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
    width: _width - _moderateScale(16) * 2,
    // height: _widthScale(170),
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,1)",
    paddingVertical: 8,
    paddingRight: 8 * 2,
    // flexDirection: "row",
  },
});
