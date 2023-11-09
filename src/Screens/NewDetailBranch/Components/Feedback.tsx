import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import { useDispatch, useSelector } from "react-redux";
import { getBranchReviewsState } from "@Redux/branch/selectors";
import { Branch } from "@typings/branch";
import { getBranchReviews } from "@Redux/branch/actions";
import ReviewItem from "@Components/ReviewItem";
import { Review } from "@typings/review";
import Text from "@Components/Text";
import PartnerFeedback from "@Components/PartnerFeedback";

type Props = {
  branch: Branch;
};

const Feedback = ({ branch }: Props) => {
  const dispatch = useDispatch();
  const { data } = useSelector(getBranchReviewsState);

  useEffect(() => {
    if (!branch) {
      return;
    }
    dispatch(
      getBranchReviews.request({
        branchCode: branch.code,
      })
    );
  }, [branch]);

  return <PartnerFeedback title="Đánh giá của khách hàng" items={data} />;
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    width: _widthScale(360),
    borderRadius: _moderateScale(8),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
  },
});
