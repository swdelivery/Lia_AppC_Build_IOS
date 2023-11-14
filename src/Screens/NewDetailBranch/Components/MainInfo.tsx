import { StyleSheet, View } from "react-native";
import React from "react";
import { _moderateScale } from "../../../Constant/Scale";
import Text from "@Components/Text";
import { Branch } from "@typings/branch";

type Props = {
  branch: Branch;
};

const MainInfo = ({ branch }: Props) => {
  return (
    <View style={styles.container}>
      <Text color={"grey"} size={14}>
        {branch?.description}
      </Text>
    </View>
  );
};

export default MainInfo;

const styles = StyleSheet.create({
  container: { paddingHorizontal: _moderateScale(8 * 2) },
});
