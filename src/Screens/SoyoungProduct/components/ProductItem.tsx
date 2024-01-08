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
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import { Product } from "@typings/product";

type Props = {
  item: Product;
};

const IMAGE_WIDTH = _width / 2 - 8 - 8 / 2;
const IMAGE_HEIGHT = IMAGE_WIDTH * SERVICE_BANNER_RATIO;

export default function ProductItem({ item }: Props) {
  const { navigate } = useNavigate();

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={navigate(ScreenKey.DETAIL_SERVICE_PRODUCT, { item })}
        style={styles.content}
      >
        <Image style={styles.image} avatar={item?.representationFileArr[0]} />
        <Column style={styles.info}>
          <Text numberOfLines={1} size={12} weight="bold">
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
    width: _width / 2 - 4,
    marginBottom: 8,
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
  content: {
    height: IMAGE_HEIGHT + 62,
    marginLeft: 8,
    backgroundColor: "white",
    borderRadius: 8,
    ...styleElement.shadow,
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
