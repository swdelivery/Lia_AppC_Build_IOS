import React, { memo, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { _width } from "../../Constant/Scale";
import { navigation } from "../../../rootNavigation";
import ScreenKey from "../../Navigation/ScreenKey";
import { getAllDoctorv2, getAllPractitioner } from "../../Redux/Action/DoctorAction";
import { URL_ORIGINAL } from "../../Constant/Url";
import { ScrollView } from "react-native-gesture-handler";
import PractitionerItem from "./components/PractitionerItem";

const SoYoungPractitioner = memo(() => {
  const [listPractitioner, setListPractitioner] = useState([]);

  useEffect(() => {
    _getListDoctor();
  }, []);
  const _getListDoctor = async () => {
    let result = await getAllPractitioner({
      sort: {
        orderNumber: -1,
      },
      limit: 8,
      page: 1,
    });
    if (result?.isAxiosError) return;
    setListPractitioner(result?.data?.data);
  };


  return (
    <View style={styles.container}>
      {listPractitioner?.map((item, index) => {
        return <PractitionerItem key={item._id} item={item} />;
      })}
    </View>
  );
});

export default SoYoungPractitioner;

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
