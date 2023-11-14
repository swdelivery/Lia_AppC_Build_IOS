import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import Text from "@Components/Text";
import Column from "@Components/Column";
import { useSelector } from "react-redux";
import { getServiceDetailsState } from "@Redux/service/selectors";
import { Service } from "@typings/serviceGroup";
import { GREY } from "@Constant/Color";

type Props = {
  service: Service;
};

const MainInfoService = ({ service }: Props) => {
  return (
    <Column style={styles.container} gap={8}>
      <Text weight="bold">Thông tin</Text>
      <Text color={GREY}>{service?.description}</Text>
    </Column>
  );
};

export default MainInfoService;

const styles = StyleSheet.create({
  tutorial: {
    fontSize: _moderateScale(14),
    fontWeight: "bold",
  },
  container: {
    width: _widthScale(360),
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: _moderateScale(8),
    padding: _moderateScale(8 * 2),
  },
});
