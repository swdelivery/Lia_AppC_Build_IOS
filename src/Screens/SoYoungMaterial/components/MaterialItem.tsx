import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { _heightScale, _width } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import Image from "@Components/Image";
import Text from "@Components/Text";
import CountStar2 from "@Components/NewCountStar/CountStar";
import { Service } from "@typings/serviceGroup";
import Column from "@Components/Column";
import { GREY, RED } from "@Constant/Color";
import Row from "@Components/Row";
import { styleElement } from "@Constant/StyleElement";
import Icon from "@Components/Icon";


export default function MaterialItem(props) {

  const { item } = props

  const { navigate } = useNavigate();

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={navigate(ScreenKey.DETAIL_MATERIAL, { _id: item?._id })}
        style={styles.content}
      >
        <Image style={styles.image} avatar={item?.materialFileArr[0]} />
        <Column style={styles.info}>
          <Text size={12} weight="bold">
            {item?.name}
          </Text>

          <Row>
            <Text size={12} weight="bold" color={RED} style={styleElement.flex}>
              {`${formatMonney(item?.price, true)}`}
            </Text>
          </Row>
        </Column>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: _width / 2,
    height: _width / 2,
    alignItems: "center",
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
  content: {
    width: "90%",
    height: _heightScale(180),
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
  info: {
    padding: 4,
  },
});
