import React from "react";
import { StyleSheet } from "react-native";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import PartnerFeedback from "@Components/PartnerFeedback";
import { Review } from "@typings/review";

type Props = {
  reviews: Review[];
};

const Feedback = ({ reviews }: Props) => {
  console.log({ reviews });
  
  return (
    <PartnerFeedback
      containerStyle={styles.container}
      items={reviews}
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
