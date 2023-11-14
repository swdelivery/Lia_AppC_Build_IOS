import React, { useEffect, useMemo } from "react";
import { _moderateScale } from "../../../Constant/Scale";
import { Branch } from "@typings/branch";
import PartnerDiary from "@Components/PartnerDiary";
import PartnerService from "src/Services/PartnerService";
import useApiPaging from "src/Hooks/services/useApiPaging";

type Props = {
  branch: Branch;
};

const ListDiary = ({ branch }: Props) => {
  const { data, getData } = useApiPaging(PartnerService.getDiaryList);

  useEffect(() => {
    if (branch) {
      getData({
        branchCode: {
          equal: branch.code,
        },
      });
    }
  }, [branch]);

  return <PartnerDiary items={data} title="Nhật ký từ khách hàng" />;
};

export default ListDiary;
