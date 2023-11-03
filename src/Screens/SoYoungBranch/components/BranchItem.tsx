import React, { useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { URL_ORIGINAL } from "../../../Constant/Url";
import { _width } from "@Constant/Scale";
import { useNavigation } from "@react-navigation/native";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import FastImage from "@Components/FastImage";
import Text from "@Components/Text";
import { styleElement } from "@Constant/StyleElement";
import Row from "@Components/Row";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Certificate from "@Components/Certificate/Certificate";
import { getImageAvataUrl } from "src/utils/avatar";
import Icon from "@Components/Icon";
import { RED } from "@Constant/Color";

type Props = {
  item: any;
};

export default function BranchItem({ item }: Props) {
  const { navigation } = useNavigate();

  const avatarSource = useMemo(() => {
    return getImageAvataUrl(
      item?.avatar,
      "https://cfw.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibGlhYmVhdXR5LnZuIiwidiI6OTczNjIwMDQ3LCJpIjoiZjgxYWIyZTctMGZlZi00YmU2LTZhNmItODI5MWI4YWExZTAwIn0/wp-content/uploads/2023/06/photo.png"
    );
  }, [item]);

  const handlePress = useCallback(() => {
    navigation.navigate(ScreenKey.DETAIL_BRAND, { idBranch: item._id });
  }, [item]);

  return (
    <View style={[styles.card, shadow]}>
      <Pressable onPress={handlePress} style={styles.upperView}>
        <FastImage style={styles.avatar} uri={avatarSource} />
        <View style={styleElement.flex}>
          <Row justifyContent="space-between">
            <Text numberOfLines={1} style={styles.title}>
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
            <Text size={12} color="grey">
              {item?.address}
            </Text>
          </Row>

          <Row top={8} flexWrap={"wrap"} gap={4}>
            <Certificate name="Phòng khám" backgroundColor={"#151617"} />
            <Certificate name="Giấy phép" backgroundColor={"#414378"} />
          </Row>
        </View>
      </Pressable>

      <View style={{ marginTop: 8 * 2 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5]?.map((item, index) => {
            return (
              <View key={index} style={styles.serviceContainer}>
                <View>
                  <FastImage
                    style={styles.serviceImage}
                    uri={`https://img2.soyoung.com/product/20230204/6/4c37c3bc52acc601968d58619dbb4336_400_300.jpg`}
                  />
                </View>
                <View style={styles.serviceContent}>
                  <Text numberOfLines={1} size={10} weight="bold">
                    Loại bỏ bọng mắt Pinhole
                  </Text>

                  <CountStar2 rating={320} size={8} />
                  <Text size={10} weight="bold" color="red">
                    đ12.000.000
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

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
  title: {
    fontSize: 14,
    fontWeight: "500",
    width: 220,
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
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.15,
  shadowRadius: 4,

  elevation: 2,
};
