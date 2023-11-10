import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useMemo } from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import Text from "@Components/Text";
import Icon from "@Components/Icon";
import { useSelector } from "react-redux";
import { getServiceDetailsState, getServiceReviewsState } from "@Redux/service/selectors";
import { URL_ORIGINAL } from "@Constant/Url";
import Row from "@Components/Row";
import { navigation } from "rootNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import Image from "@Components/Image";
import Avatar from "@Components/Avatar";

const OverViewFeedBack = () => {

  const { data: dataReview, meta: metaReview } = useSelector(getServiceReviewsState);
  const { data: dataService } = useSelector(getServiceDetailsState);

  const _handleViewAllFeedBack = useCallback(()=>{
    navigation.navigate(ScreenKey.FEED_BACK_SERVICE, { currentService: dataService })
  },[dataService])

  const _dataReviewSlice = useMemo(() => {
    return dataReview?.slice(0, 3);
  }, [dataReview])

  return (
    <View style={styles.container}>
      <Row>

        <View style={styles.listAvatar}>
          {
            _dataReviewSlice.map((item, index) => {
              return (
                <Avatar
                  circle
                  style={styles.image}
                  size={_moderateScale(24)}
                  avatar={item?.partner?.fileAvatar}
                />
              )
            })
          }
        </View>

        <Text numberOfLines={1} style={styles.text}>{dataReview[0]?.serviceReview?.comment}</Text>
        <View style={{ width: 8 * 2 }} />

        <TouchableOpacity
          onPress={_handleViewAllFeedBack}
          style={styles.textFeedbackContainer}>
          <Text style={styles.textFeedback}>{`${metaReview?.totalDocuments} đánh giá`}</Text>
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
