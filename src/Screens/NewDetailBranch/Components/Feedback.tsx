import React, { useEffect } from "react";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import { Branch } from "@typings/branch";
import PartnerFeedback from "@Components/PartnerFeedback";
import useApiPaging from "src/Hooks/services/useApiPaging";
import PartnerService from "src/Services/PartnerService";

type Props = {
  branch: Branch;
};

const Feedback = ({ branch }: Props) => {
  const { data, getData } = useApiPaging(PartnerService.getReviewList);

  useEffect(() => {
    if (!branch) {
      return;
    }
    getData({
      branchCode: {
        equal: branch.code,
      },
    });
  }, [branch]);

  return <PartnerFeedback title="Đánh giá của khách hàng" items={data} />;
};

export default Feedback;
