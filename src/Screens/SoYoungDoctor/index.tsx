import React, { memo, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { _width } from "../../Constant/Scale";
import { navigation } from "../../../rootNavigation";
import ScreenKey from "../../Navigation/ScreenKey";
import { getAllDoctorv2 } from "../../Redux/Action/DoctorAction";
import { URL_ORIGINAL } from "../../Constant/Url";
import { ScrollView } from "react-native-gesture-handler";
import DoctorItem from "./components/DoctorItem";

const SoYoungDoctor = memo(() => {
  const [listDoctor, setListDoctor] = useState([]);

  useEffect(() => {
    _getListDoctor();
    // _startAnimation()
  }, []);
  const _getListDoctor = async () => {
    let result = await getAllDoctorv2({
      sort: {
        orderNumber: -1,
      },
      limit: 8,
      page: 1,
    });
    if (result?.isAxiosError) return;
    setListDoctor(result?.data?.data);
  };

  const _renderItem = () => {
    return <View style={styles.card}></View>;
  };

  return (
    <View style={styles.container}>
      {listDoctor?.map((item, index) => {
        return <DoctorItem key={item._id} item={item} />;
      })}
    </View>
  );
});

export default SoYoungDoctor;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "500",
    width: 220,
  },
  start: {
    width: 8 * 1.75,
    height: 8 * 1.75,
    marginLeft: 1,
    resizeMode: "contain",
  },
  start2: {
    width: 8 * 1,
    height: 8 * 1,
    marginLeft: 1,
    resizeMode: "contain",
  },
  card: {
    width: _width - 8 * 2,
    paddingVertical: 8,
    paddingHorizontal: 8 * 1,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    paddingHorizontal: 8 * 1,
    backgroundColor: "#F5F9FA",
    paddingBottom: 30,
  },
});
