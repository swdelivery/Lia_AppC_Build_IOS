import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { _heightScale, _width } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import Image from "@Components/Image";
import Text from "@Components/Text";
import Column from "@Components/Column";
import { RED } from "@Constant/Color";
import Row from "@Components/Row";
import { styleElement } from "@Constant/StyleElement";
import ContentLoader, { Rect } from "react-content-loader/native";

export default function MaterialItem(props) {
  const { item } = props;

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

export const PLACEHOLDER_HEIGHT = 200;

export function Placeholder() {
  return (
    <Row style={[styles.container, styles.placeholderRow]} gap={8}>
      <View style={styles.placeholderItem}>
        <ContentLoader>
          <Rect x="0" y="0" rx="4" ry="4" height="100" width="100%" />
          <Rect x="0" y="110" rx="3" ry="3" width="80%" height="12" />
          <Rect x="0" y="128" rx="3" ry="3" width="50%" height="12" />
          <Rect x="0" y="145" rx="3" ry="3" width="50%" height="12" />
        </ContentLoader>
      </View>
      <View style={styles.placeholderItem}>
        <ContentLoader>
          <Rect x="0" y="0" rx="4" ry="4" height="100" width="100%" />
          <Rect x="0" y="110" rx="3" ry="3" width="80%" height="12" />
          <Rect x="0" y="128" rx="3" ry="3" width="50%" height="12" />
          <Rect x="0" y="145" rx="3" ry="3" width="50%" height="12" />
        </ContentLoader>
      </View>
    </Row>
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
  placeholderRow: {
    height: PLACEHOLDER_HEIGHT,
    marginHorizontal: 16,
  },
  placeholderItem: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
});
