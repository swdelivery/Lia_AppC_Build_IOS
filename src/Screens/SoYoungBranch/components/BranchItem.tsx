import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { _width } from "@Constant/Scale";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import Text from "@Components/Text";
import { styleElement } from "@Constant/StyleElement";
import Row from "@Components/Row";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Certificate, { Certificates } from "@Components/Certificate/Certificate";
import Icon from "@Components/Icon";
import { RED } from "@Constant/Color";
import HorizontalServices from "@Components/HorizontalServices";
import { Branch } from "@typings/branch";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "@Components/Avatar";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import Column from "@Components/Column";

type Props = {
  item: Branch;
};

export default function BranchItem({ item }: Props) {
  const { navigation } = useNavigate();

  const handlePress = useCallback(() => {
    navigation.navigate(ScreenKey.DETAIL_BRAND, { branch: item });
  }, [item]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={[styles.card, styleElement.shadow]}
    >
      <Row paddingBottom={12} alignItems="flex-start" gap={8}>
        <Avatar size={48} avatar={item.avatar} circle />
        <View style={styleElement.flex}>
          <Row justifyContent="space-between" gap={4}>
            <Text numberOfLines={2} weight="bold" flex={1}>
              {item?.name}
            </Text>

            <TouchableOpacity style={styles.adviseBtn}>
              <Text size={12} color="white" weight="bold">
                Tư vấn
              </Text>
            </TouchableOpacity>
          </Row>
          <CountStar2 rating={item.averageRating} count={item.reviewCount} />

          <Row gap={4} marginTop={2}>
            <Icon name="map-marker" color={RED} size={14} />
            <Text size={12} color="grey" right={8} style={styleElement.flex}>
              {item?.address}
            </Text>
          </Row>

          <Certificates scrollEnabled data={item.branchFileArr} />
        </View>
      </Row>
      {item.branchServices.length > 0 && (
        <HorizontalServices items={item.branchServices} />
      )}
    </TouchableOpacity>
  );
}

export const PLACEHOLDER_HEIGHT = 200;

export function Placeholder() {
  return (
    <View style={[styles.container, styles.placeholderItem]}>
      <ContentLoader>
        <Circle x="20" y="20" r="20" />
        <Rect x="60" y="0" rx="4" ry="4" width="80" height="13" />
        <Rect x="60" y="20" rx="3" ry="3" width="100%" height="15" />
        <Rect x="60" y="40" rx="3" ry="3" width="100" height="12" />
        <Rect x="0" y="60" rx="3" ry="3" width="100%" height="120" />
      </ContentLoader>
    </View>
  );
}

BranchItem.Placeholder = Placeholder;

const styles = StyleSheet.create({
  avatar: {
    width: 8 * 6,
    height: 8 * 6,
    borderRadius: (8 * 6) / 2,
    borderWidth: 0.5,
  },
  adviseBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4BA888",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8 * 2,
  },
  locationIcon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },
  serviceContainer: {
    width: 100,
    // height: 180,
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 8 * 1,
  },
  serviceImage: {
    width: 100,
    height: 75,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  serviceContent: {
    padding: 4,
  },
  start: {
    width: 8 * 1.75,
    height: 8 * 1.75,
    marginLeft: 1,
    resizeMode: "contain",
  },
  start2: {
    width: 8 * 1,
    height: 8 * 1,
    marginLeft: 1,
    resizeMode: "contain",
  },
  card: {
    width: _width - 8 * 2,
    paddingVertical: 8,
    marginHorizontal: 8 * 1,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
  placeholderItem: {
    height: PLACEHOLDER_HEIGHT,
    borderWidth: 0,
    backgroundColor: "white",
    marginHorizontal: 16,
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
});
