import Avatar from "@Components/Avatar";
import FastImage from "@Components/FastImage";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { Diary } from "@typings/diary";
import moment from "moment";
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  item: Diary;
};

export default function DiaryItem({ item }: Props) {
  const beforeImage = useMemo(() => {
    return getImageAvataUrl(item.imageBeforeTreatment[0]);
  }, [item]);

  const afterImage = useMemo(() => {
    return getImageAvataUrl(item.imageAfterTreatment[0]);
  }, [item]);

  return (
    <View style={[styles.box__diary]}>
      <Row gap={8}>
        <Avatar avatar={item.partner.fileAvatar} size={40} circle />
        <View style={styleElement.flex}>
          <Text numberOfLines={1} weight="bold">
            {item.partner.name}
          </Text>
          <Text numberOfLines={1} size={12}>
            Cập nhật <Text size={12}>{moment(item.updated).fromNow()}</Text>
          </Text>
        </View>
      </Row>

      <Row gap={8}>
        <View style={styles.verticalLine} />
        <Text style={styles.box__diary__nameService}>{item.serviceName}</Text>
      </Row>

      <View style={styles.imagesContainer}>
        <View style={styles.box__diary__image}>
          <View style={styles.absoluteText}>
            <Text size={12} weight="bold" color="white">
              Trước
            </Text>
          </View>
          <FastImage style={styles.box__diary__image} uri={beforeImage} />
        </View>
        <View style={styles.box__diary__image}>
          <View style={styles.absoluteText}>
            <Text size={12} weight="bold" color="white">
              Sau
            </Text>
          </View>
          <FastImage style={styles.box__diary__image} uri={afterImage} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box__diary__name: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: _moderateScale(8),
    marginBottom: _moderateScale(8),
  },
  box__diary__nameService: {
    fontSize: _moderateScale(14),
    fontWeight: "500",
  },
  verticalLine: {
    width: _moderateScale(2),
    height: _moderateScale(8 * 3),
    backgroundColor: "red",
    marginRight: _moderateScale(4),
  },
  absoluteText: {
    paddingHorizontal: _moderateScale(8),
    paddingVertical: _moderateScale(4),
    backgroundColor: "rgba(0,0,0,.5)",
    position: "absolute",
    left: 0,
    zIndex: 1,
    bottom: 0,
    borderTopRightRadius: _moderateScale(8),
  },
  box__diary__image: {
    width: _moderateScale(8 * 11.5),
    height: _moderateScale(8 * 11.5),
    borderRadius: _moderateScale(8),
    overflow: "hidden",
  },
  box__diary: {
    width: _moderateScale(8 * 26),
    marginRight: _moderateScale(8),
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.2)",
    paddingBottom: _moderateScale(8),
    gap: 4,
    padding: 8,
  },
  customer__updateTime: {
    fontSize: _moderateScale(12),
    flex: 1,
    marginLeft: _moderateScale(4),
    color: "grey",
  },
  customer__name: {
    fontSize: _moderateScale(14),
    flex: 1,
    marginLeft: _moderateScale(4),
    fontWeight: "500",
  },
  avatar__customer: {
    width: _moderateScale(8 * 4),
    height: _moderateScale(8 * 4),
    borderRadius: _moderateScale((8 * 4) / 2),
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
