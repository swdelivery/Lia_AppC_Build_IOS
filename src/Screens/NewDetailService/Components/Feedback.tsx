import React from "react";
import { StyleSheet } from "react-native";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import PartnerFeedback from "@Components/PartnerFeedback";
import { useSelector } from "react-redux";
import { getServiceReviewsState } from "@Redux/service/selectors";

const Feedback = () => {

  const { data: dataReview, meta: metaReview } = useSelector(getServiceReviewsState);

  return (
    <PartnerFeedback
      containerStyle={styles.container}
      items={dataReview}
      title="Đánh giá của khách hàng"
    />
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    width: _widthScale(360),
    minHeight: 200,
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: _moderateScale(8),
    padding: _moderateScale(8 * 2),
  },
});
