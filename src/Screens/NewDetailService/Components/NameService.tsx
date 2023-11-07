import { StyleSheet, View } from "react-native";
import React from "react";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import CountStar2 from "../../../Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import { RED } from "@Constant/Color";
import Column from "@Components/Column";

const NameService = () => {
  return (
    <Column style={styles.infoService} gap={8}>
      <View style={styles.referenceSite}>
        <Text size={12} color={RED}>
          Reference site about
        </Text>
      </View>
      <Text size={16} weight="bold">
        Cắt Mí T2022 - Công nghệ cao
      </Text>

      <CountStar2 rating={4} />
    </Column>
  );
};

export default NameService;

const styles = StyleSheet.create({
  infoService: {
    paddingVertical: _moderateScale(8),
    width: _widthScale(360),
    // height: _moderateScale(8 * 20),
    alignSelf: "center",
    marginTop: _moderateScale(4),
    backgroundColor: "white",
    borderRadius: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 1.5),
  },
  referenceSite: {
    paddingHorizontal: _moderateScale(8 * 1),
    paddingVertical: _moderateScale(4),
    borderRadius: _moderateScale(8),
    backgroundColor: "#FAF0EF",
    alignSelf: "flex-start",
  },
});
