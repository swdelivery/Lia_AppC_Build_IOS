import Avatar from "@Components/Avatar";
import Certificate from "@Components/Certificate/Certificate";
import HorizontalServices from "@Components/HorizontalServices";
import Icon from "@Components/Icon";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { RED } from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import ScreenKey from "@Navigation/ScreenKey";
import { Practitioner } from "@typings/practitioner";
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigate } from "src/Hooks/useNavigation";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";

type Props = {
  item: Practitioner;
};

export default function DoctorItem({ item }: Props) {
  const { navigation } = useNavigate();

  const handleItemPress = useCallback(() => {
    navigation.navigate(ScreenKey.DETAIL_PRACTITIONER, {
      practitioner: item,
    });
  }, [item]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleItemPress}
      style={[styles.card, styleElement.shadow]}
    >
      <Row alignItems="flex-start" gap={8}>
        <Avatar size={48} avatar={item.avatar} circle />
        <View style={styleElement.flex}>
          <Row justifyContent="space-between">
            <Text numberOfLines={1} weight="bold">
              {item?.name}
            </Text>

            <TouchableOpacity style={styles.consultButton}>
              <Text size={12} weight="bold" color={"white"}>
                Tư vấn
              </Text>
            </TouchableOpacity>
          </Row>

          <Row marginTop={2} gap={8}>
            <CountStar2 count={item?.reviewCount} rating={5} size={10} />
            <Text size={10}>|</Text>
            <Row gap={4} marginTop={2}>
              <Icon name="account-multiple" size={14} color="grey" />
              <Text size={10}>({item?.countPartner})</Text>
            </Row>
          </Row>

          <Row gap={4}>
            <Icon name="map-marker" color={RED} size={14} />
            <Text size={12} color={"grey"}>
              {item?.branch?.name}
            </Text>
          </Row>
          {item?.practitionerFileArr?.length > 0 && (
            <Row marginTop={4} flexWrap={"wrap"} gap={4} marginBottom={8}>
              {item?.practitionerFileArr.map((item, i) => (
                <Certificate
                  key={item._id}
                  item={item}
                  backgroundColor={i % 2 === 0 ? "#414378" : "#151617"}
                />
              ))}
            </Row>
          )}
        </View>
      </Row>
      {item?.practitionerServices?.length > 0 && (
        <HorizontalServices items={item.practitionerServices} />
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

const styles = StyleSheet.create({
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
    paddingHorizontal: 8 * 1,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  container: {
    // flex: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
  consultButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4BA888",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8 * 2,
  },
  placeholderItem: {
    height: PLACEHOLDER_HEIGHT,
    borderWidth: 0,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
});
