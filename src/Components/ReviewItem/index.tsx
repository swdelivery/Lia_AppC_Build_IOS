import Avatar from "@Components/Avatar";
import FastImage from "@Components/FastImage";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { Review } from "@typings/review";
import moment from "moment";
import React, { useMemo } from "react";
import { View, StyleSheet, Image } from "react-native";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  item: Review;
  type: "branch";
};

export default function ReviewItem({ item, type }: Props) {
  const reviewItem = useMemo(() => {
    if (type === "branch") {
      return item.branchReview;
    }
  }, [item, type]);

  return (
    <View style={styles.container}>
      <Row gap={8}>
        <Avatar avatar={item.partner.fileAvatar} size={40} circle />
        <View style={styleElement.flex}>
          <Text style={styles.name}>{item.partner.name}</Text>
          <Text size={12}>
            {moment(item?.created).format("DD/MM/YYYY")} -{" "}
            {moment(item?.created).format("LT")}
          </Text>
          <CountStar2 rating={reviewItem?.rating} size={10} />
        </View>
      </Row>
      <Row>
        <View style={styles.verticalLine} />
        <Text weight="bold">{item?.service?.name}</Text>
      </Row>
      {!!reviewItem?.comment && <Text>{reviewItem?.comment}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 8,
    paddingBottom: 8,
  },
  name: {
    fontSize: _moderateScale(14),
    fontWeight: "500",
  },
  start: {
    width: 8 * 1.75,
    height: 8 * 1.75,
    marginLeft: 1,
    resizeMode: "contain",
  },
  avatar: {
    width: _moderateScale(8 * 5),
    height: _moderateScale(8 * 5),
    borderRadius: _moderateScale((8 * 5) / 2),
  },
  verticalLine: {
    width: _moderateScale(2),
    height: _moderateScale(8 * 3),
    backgroundColor: "red",
    marginRight: _moderateScale(4),
  },
});
