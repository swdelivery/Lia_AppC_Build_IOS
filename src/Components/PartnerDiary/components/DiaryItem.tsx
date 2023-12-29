import Avatar from "@Components/Avatar";
import Image from "@Components/Image";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { Diary } from "@typings/diary";
import { first } from "lodash";
import moment from "moment";
import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useCallbackItem from "src/Hooks/useCallbackItem";

type Props = {
  item: Diary;
  onPress: (item: Diary) => void;
};

export default function DiaryItem({ item, onPress }: Props) {
  const trigger = useCallbackItem(item);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={trigger(onPress)}
      style={styles.box__diary}
    >
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

      <Row gap={8} height={50} alignItems="flex-start">
        <View style={styles.verticalLine} />
        <Text
          weight="bold"
          style={styles.box__diary__nameService}
          numberOfLines={2}
        >
          {item.serviceName}
        </Text>
      </Row>

      <View style={styles.imagesContainer}>
        <View style={styles.box__diary__image}>
          <View style={styles.absoluteText}>
            <Text size={12} weight="bold" color="white">
              Trước
            </Text>
          </View>
          <Image
            style={styles.box__diary__image}
            avatar={first(item.imageBeforeTreatment)}
          />
        </View>
        <View style={styles.box__diary__image}>
          <View style={styles.absoluteText}>
            <Text size={12} weight="bold" color="white">
              Sau
            </Text>
          </View>
          <Image
            style={styles.box__diary__image}
            avatar={first(item.imageAfterTreatment)}
          />
        </View>
      </View>
    </TouchableOpacity>
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
    fontSize: 14,
  },
  verticalLine: {
    marginTop: 4,
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
