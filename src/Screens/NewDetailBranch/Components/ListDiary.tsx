import React, { useEffect, useMemo } from "react";
import { _moderateScale } from "../../../Constant/Scale";
import { Branch } from "@typings/branch";
import PartnerDiary from "@Components/PartnerDiary";
import PartnerService from "src/Services/PartnerService";
import useApiPaging from "src/Hooks/services/useApiPaging";
import Fade from "@Components/Fade";

type Props = {
  branch: Branch;
};

const ListDiary = ({ branch }: Props) => {
  const { data, getData } = useApiPaging(PartnerService.getDiaryList);

  useEffect(() => {
    if (branch) {
      requestAnimationFrame(() => {
        getData({
          branchCode: {
            equal: branch.code,
          },
        });
      });
    }
  }, [branch]);

  return (
    <Fade visible={data.length > 0}>
      <PartnerDiary items={data} title="Nhật ký từ khách hàng" />
    </Fade>
  );
};

export default ListDiary;
