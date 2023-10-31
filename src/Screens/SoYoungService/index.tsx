import React, { memo, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { _width } from "../../Constant/Scale";
import { navigation } from "../../../rootNavigation";
import ScreenKey from "../../Navigation/ScreenKey";
import { getServicev2 } from "../../Redux/Action/Service";
import { URL_ORIGINAL } from "../../Constant/Url";
import { formatMonney } from "../../Constant/Utils";
import ServiceItem from "./components/ServiceItem";
import { RenderItemProps } from "typings/common";

const SoYoungService = memo((props) => {
  const [listService, setListService] = useState([]);

  useEffect(() => {
    _getListService();
    // _startAnimation()
  }, []);
  const _getListService = async () => {
    let result = await getServicev2({
      sort: {
        orderNumber: -1,
      },
      limit: 8,
      page: 1,
    });
    if (result?.isAxiosError) return;
    setListService(result?.data?.data);
  };

  function renderItem({ item }: RenderItemProps<any>) {
    return <ServiceItem item={item} />;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {listService?.map((item, index) => {
          return <ServiceItem item={item} key={item._id} />;
        })}
      </View>

      <View
        style={{
          height: 200,
        }}
      />
    </View>
  );
});

export default SoYoungService;

const styles = StyleSheet.create({
  start: {
    width: 8 * 1.25,
    height: 8 * 1.25,
    marginLeft: 1,
    resizeMode: "contain",
  },
  card: {
    width: _width / 2,
    height: _width / 2,
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
});
