import { StyleSheet, View } from "react-native";
import React from "react";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../../Constant/Scale";
import Text from "@Components/Text";
import Column from "@Components/Column";
import Row from "@Components/Row";

const Material = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text weight="bold">Vật liệu</Text>
      </View>

      <Column gap={8}>
        <View style={styles.box__header}>
          <Text color={"#4DA887"} weight="bold">
            Chỉ phẩu thuật
          </Text>

          <Text color={"#4DA887"} weight="bold">
            3 Loại
          </Text>
        </View>

        <Column left={8} right={8}>
          <Row>
            <Text style={styles.box__textLeft}>Chỉ Polypropylene</Text>
            <Text style={styles.box__textRight}>1.5 mm</Text>
          </Row>
          <Row>
            <Text style={styles.box__textLeft}>Chỉ lụa Silk</Text>
            <Text style={styles.box__textRight}>3.5 mm</Text>
          </Row>
          <Row>
            <Text style={styles.box__textLeft}>Chỉ Ethibond</Text>
            <Text style={styles.box__textRight}>
              3.25 mm, Lorem ipsum asmet
            </Text>
          </Row>
        </Column>
      </Column>
    </View>
  );
};

export default Material;

const styles = StyleSheet.create({
  box__textRight: {
    flex: 1,
    textAlign: "right",
  },
  box__textLeft: {
    fontSize: _moderateScale(14),
    color: "grey",
    fontWeight: "500",
  },
  box__header: {
    width: "100%",
    height: _moderateScale(8 * 4),
    backgroundColor: "#F7F8FA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: _moderateScale(8),
    justifyContent: "space-between",
  },
  box: {
    width: "100%",
    // height: _moderateScale(100),
    paddingBottom: _moderateScale(8),
    borderWidth: 0.5,
    marginTop: _moderateScale(8 * 2),
    borderRadius: _moderateScale(8),
    overflow: "hidden",
    borderColor: "grey",
  },
  container: {
    width: _widthScale(360),
    minHeight: _heightScale(100),
    alignSelf: "center",
    backgroundColor: "white",
    marginTop: _moderateScale(8),
    borderRadius: _moderateScale(8),
    paddingVertical: _moderateScale(8 * 2),
    paddingHorizontal: _moderateScale(8 * 2),
  },
});
