import { StyleSheet, View } from "react-native";
import React from "react";
import { _width } from "../../Constant/Scale";
import { Service } from "@typings/serviceGroup";
import useServiceDetailsNavigation from "src/Hooks/navigation/useServiceDetailsNavigation";
import ServiceItem from "./components/ServiceItem";

type Props = {
  services: Service[];
};

const ListBottomService = ({ services }: Props) => {
  const handlePress = useServiceDetailsNavigation();

  return (
    <View style={styles.container}>
      {services.map((item, index) => {
        return <ServiceItem key={item._id} item={item} onPress={handlePress} />;
      })}
    </View>
  );
};

export default ListBottomService;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 8,
  },
});
