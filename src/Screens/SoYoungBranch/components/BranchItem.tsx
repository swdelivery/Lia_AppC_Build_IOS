import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { _width } from "@Constant/Scale";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import Text from "@Components/Text";
import { styleElement } from "@Constant/StyleElement";
import Row from "@Components/Row";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Certificate from "@Components/Certificate/Certificate";
import Icon from "@Components/Icon";
import { RED } from "@Constant/Color";
import HorizontalServices from "@Components/HorizontalServices";
import { Branch } from "@typings/branch";
import { useDispatch } from "react-redux";
import { selectBranch } from "@Redux/branch/actions";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "@Components/Avatar";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";

type Props = {
  item: Branch;
};

export default function BranchItem({ item }: Props) {
  const dispatch = useDispatch();
  const { navigation } = useNavigate();

  const handlePress = useCallback(() => {
    dispatch(selectBranch(item));
    navigation.navigate(ScreenKey.DETAIL_BRAND, { idBranch: item._id });
  }, [item]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={[styles.card, styleElement.shadow]}
    >
      <View style={styles.upperView}>
        <Avatar size={48} avatar={item.avatar} circle />
        <View style={styleElement.flex}>
          <Row justifyContent="space-between">
            <Text numberOfLines={1} weight="bold">
              {item?.name}
            </Text>

            <TouchableOpacity style={styles.adviseBtn}>
              <Text size={12} color="white" weight="bold">
                Tư vấn
              </Text>
            </TouchableOpacity>
          </Row>
          <CountStar2 rating={item.averageRating} count={item.reviewCount} />

          <Row gap={4}>
            <Icon name="map-marker" color={RED} size={14} />
            <Text size={12} color="grey" right={8} style={styleElement.flex}>
              {item?.address}
            </Text>
          </Row>

          <Row top={8} flexWrap={"wrap"} gap={4} bottom={8}>
            {item?.branchFileArr.length > 0 &&
              item.branchFileArr.map((item, index) => (
                <Certificate
                  key={item._id}
                  item={item}
                  backgroundColor={index % 2 === 0 ? "#414378" : "#151617"}
                />
              ))}
          </Row>
        </View>
      </View>
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
  upperView: { flexDirection: "row", gap: 8 },
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
