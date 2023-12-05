import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { _width } from "../../Constant/Scale";
import { Service } from "@typings/serviceGroup";
import useServiceDetailsNavigation from "src/Hooks/navigation/useServiceDetailsNavigation";
import ServiceItem from "./components/ServiceItem";
import Text from "@Components/Text";
import Column from "@Components/Column";

type Props = {
  services: Service[];
  containerStyle?: StyleProp<ViewStyle>;
};

const ListBottomService = ({ services, containerStyle }: Props) => {
  const handlePress = useServiceDetailsNavigation();

  return (
    <Column style={containerStyle}>
      <Text weight="bold" bottom={8} left={16}>
        Dịch vụ đề xuất
      </Text>
      <View style={styles.container}>
        {services.map((item, index) => {
          return (
            <ServiceItem key={item._id} item={item} onPress={handlePress} />
          );
        })}
      </View>
    </Column>
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
