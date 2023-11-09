import { StyleSheet, View, Image } from "react-native";
import React, { memo } from "react";
import { _width } from "../../../Constant/Scale";
import Text from "@Components/Text";
import CountStar2 from "@Components/NewCountStar/CountStar";
import { RED } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import Row from "@Components/Row";
import { styleElement } from "@Constant/StyleElement";
import Icon from "@Components/Icon";

const ListBottonService = () => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5]?.map((item, index) => {
        return (
          <View style={styles.card}>
            <View style={styles.itemContent}>
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://img2.soyoung.com/product/20230204/6/4c37c3bc52acc601968d58619dbb4336_400_300.jpg`,
                  }}
                />
              </View>
              <View style={styles.itemInfo}>
                <Text size={12} weight="bold">
                  Loại bỏ bọng mắt Pinhole
                </Text>
                <CountStar2 rating={4} size={10} />
                <Row>
                  <Text
                    weight="bold"
                    size={12}
                    color={RED}
                    style={styleElement.flex}
                  >
                    {formatMonney(12000000, true)}
                  </Text>

                  <Row>
                    <Icon name="account-multiple" size={14} color="grey" />
                    <Text size={10} left={4}>
                      (157)
                    </Text>
                  </Row>
                </Row>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ListBottonService;

const styles = StyleSheet.create({
  start: {
    width: 8 * 1.25,
    height: 8 * 1.25,
    marginLeft: 1,
    resizeMode: "contain",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: _width / 2,
    height: 190,
    alignItems: "center",
  },
  itemContent: {
    width: "90%",
    height: "95%",
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  itemInfo: {
    padding: 4,
  },
});
