import Column from "@Components/Column";
import Text from "@Components/Text";
import { GREY } from "@Constant/Color";
import { Service } from "@typings/serviceGroup";
import React from "react";
import { StyleSheet } from "react-native";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import AnimatedParameter from "./AnimatedParameter";

type Props = {
  service: Service;
};

const MainInfoService = ({ service }: Props) => {

  return (
    <Column style={styles.container} gap={8}>
      <Text weight="bold">Thông tin</Text>
      <Text color={GREY}>{service?.description}</Text>
      {
        service?.parameterDescription && <AnimatedParameter currentService={service} htmlData={service?.parameterDescription} />
      }
      {
        service?.advantageDescription && <AnimatedParameter currentService={service} htmlData={service?.advantageDescription} />
      }
      {
        service?.procedureDescription && <AnimatedParameter currentService={service} htmlData={service?.procedureDescription} />
      }
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
