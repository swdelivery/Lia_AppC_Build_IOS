import { StyleSheet, View } from "react-native";
import React from "react";
import { _moderateScale } from "../../../Constant/Scale";
import Text from "@Components/Text";
import { getBranchDetailsState } from "@Redux/branch/selectors";
import { useSelector } from "react-redux";

const MainInfo = () => {
  const { data } = useSelector(getBranchDetailsState);
  return (
    <View style={styles.container}>
      <Text color={"grey"} size={14}>
        {data?.description}
      </Text>
    </View>
  );
};

export default MainInfo;

const styles = StyleSheet.create({
  container: { paddingHorizontal: _moderateScale(8 * 2) },
});
