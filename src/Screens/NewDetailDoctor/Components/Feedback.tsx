import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import { Doctor } from "@typings/doctor";
import PartnerFeedback from "@Components/PartnerFeedback";
import useApiPaging from "src/Hooks/services/useApiPaging";
import PartnerService from "src/Services/PartnerService";

type Props = {
  doctor: Doctor;
};

const Feedback = ({ doctor }: Props) => {
  const { data, getData } = useApiPaging(PartnerService.getReviewList);

  useEffect(() => {
    getData({
      doctorCode: {
        equal: doctor?.code,
      },
    });
  }, [doctor?.code]);

  return (
    <PartnerFeedback
      title="Đánh giá từ khách hàng"
      items={data}
      containerStyle={styles.container}
    />
  );
};

export default Feedback;

const styles = StyleSheet.create({
  box__diary__name: {
    flexDirection: "row",
    alignItems: "center",
    // paddingLeft: _moderateScale(8),
    marginBottom: _moderateScale(8),
  },
  box__diary__nameService: {
    fontSize: _moderateScale(12),
    fontWeight: "bold",
  },
  verticalLine: {
    width: _moderateScale(2),
    height: _moderateScale(8 * 3),
    backgroundColor: "red",
    marginRight: _moderateScale(4),
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
  feedBackText: {
    fontSize: _moderateScale(14),
    fontWeight: "bold",
  },
  container: {
    width: _width,
    backgroundColor: "white",
    marginTop: _moderateScale(8),
    paddingVertical: 16,
    minHeight: 200,
  },
});
