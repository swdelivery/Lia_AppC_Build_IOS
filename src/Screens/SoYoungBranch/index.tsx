import React, { memo, useEffect, useState } from "react";
import {
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
import { getListBranchV2 } from "../../Redux/Action/BranchAction";
import { URL_ORIGINAL } from "../../Constant/Url";
import { ScrollView } from "react-native-gesture-handler";
import { RenderItemProps } from "../../../typings/common";
import BranchItem from "./components/BranchItem";

const SoYoungBranch = memo(() => {
  const [listBranch, setListBranch] = useState([]);

  useEffect(() => {
    _getListBranch();
    // _startAnimation()
  }, []);
  const _getListBranch = async () => {
    let result = await getListBranchV2({
      sort: {
        orderNumber: -1,
      },
      limit: 8,
      page: 1,
    });
    if (result?.isAxiosError) return;
    setListBranch(result?.data?.data);
  };

  function renderItem({ item }: RenderItemProps<any>) {
    return <BranchItem item={item} />;
  }

  return (
    <FlatList scrollEnabled={false} data={listBranch} renderItem={renderItem} />
  );
});

export default SoYoungBranch;
