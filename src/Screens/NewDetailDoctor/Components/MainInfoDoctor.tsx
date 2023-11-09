import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import { useSelector } from "react-redux";
import { getDoctorDetailsState } from "@Redux/doctor/selectors";
import Text from "@Components/Text";

const MainInfoDoctor = (props) => {
  const { data } = useSelector(getDoctorDetailsState);

  return (
    <View style={styles.container}>
      <Text weight="bold" bottom={8}>
        Thông tin Bác sĩ
      </Text>
      <Text color={"grey"}>{data?.description}</Text>
    </View>
  );
};

export default MainInfoDoctor;

const styles = StyleSheet.create({
  iconChat: {
    width: _moderateScale(8 * 2),
    height: _moderateScale(8 * 2),
  },
  avatarDoctor: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale((8 * 5) / 2),
  },
  doctorCard: {
    minWidth: _widthScale(200),
    borderRadius: _moderateScale(8),
    marginRight: _moderateScale(8),
    backgroundColor: "#F7F8FA",
    flexDirection: "row",
    paddingVertical: _moderateScale(8),
    paddingHorizontal: _moderateScale(8),
  },
  name: {
    fontSize: _moderateScale(14),
    fontWeight: "bold",
  },
  avatarBranch: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale((8 * 5) / 2),
    resizeMode: "contain",
  },
  container: {
    width: _width,
    paddingVertical: _moderateScale(8 * 2),
    paddingHorizontal: _moderateScale(8 * 2),
    alignSelf: "center",
    backgroundColor: "white",
    marginTop: _moderateScale(8 * 1),
  },
});
