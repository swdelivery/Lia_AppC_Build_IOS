import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import Text from "@Components/Text";
import Icon from "@Components/Icon";
import Row from "@Components/Row";
import { navigation } from "rootNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import Avatar from "@Components/Avatar";
import { Service } from "@typings/serviceGroup";
import { Review } from "@typings/review";
import { ApiMeta, ApiResponse } from "@typings/api";

type Props = {
  service: Service;
  reviewsData?: ApiResponse<Review[]>;
};

const OverViewFeedBack = ({ service, reviewsData }: Props) => {
  const _handleViewAllFeedBack = useCallback(() => {
    navigation.navigate(ScreenKey.FEED_BACK_SERVICE, {
      currentService: service,
    });
  }, [service]);

  const _dataReviewSlice = useMemo(() => {
    return reviewsData?.data?.slice(0, 3) ?? [];
  }, [reviewsData]);

  return (
    <View style={styles.container}>
      <Row>
        <View style={styles.listAvatar}>
          {_dataReviewSlice.map((item, index) => {
            return (
              <Avatar
                key={item._id}
                circle
                style={styles.image}
                size={_moderateScale(24)}
                avatar={item?.partner?.fileAvatar}
              />
            );
          })}
        </View>

        <Text numberOfLines={1} style={styles.text} right={16}>
          {reviewsData?.data[0]?.serviceReview?.comment}
        </Text>
        <TouchableOpacity
          onPress={_handleViewAllFeedBack}
          style={styles.textFeedbackContainer}
        >
          <Text
            style={styles.textFeedback}
          >{`${reviewsData?.meta?.totalDocuments} đánh giá`}</Text>
          <Icon name="chevron-right" size={14} />
        </TouchableOpacity>
      </Row>
    </View>
  );
};

export default OverViewFeedBack;

const styles = StyleSheet.create({
  textFeedback: {
    fontSize: _moderateScale(12),
  },
  text: {
    fontSize: _moderateScale(12),
    marginLeft: _moderateScale(8),
    flex: 1,
  },
  image: {
    marginLeft: -8,
  },
  listAvatar: {
    flexDirection: "row",
    marginLeft: 16,
  },
  container: {
    width: _widthScale(360),
    alignSelf: "center",
    marginTop: _moderateScale(8),
    paddingVertical: _moderateScale(8),
    paddingHorizontal: _moderateScale(8),
    backgroundColor: "white",
    borderRadius: _moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
  },
  textFeedbackContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
});
