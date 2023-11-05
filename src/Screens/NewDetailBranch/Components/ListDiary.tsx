import React, { useEffect } from "react";
import { _moderateScale } from "../../../Constant/Scale";
import { useDispatch, useSelector } from "react-redux";
import { Branch } from "@typings/branch";
import { getBranchDiary } from "@Redux/branch/actions";
import { getBranchDiaryState } from "@Redux/branch/selectors";
import PartnerDiary from "@Components/PartnerDiary";

type Props = {
  branch: Branch;
};

const ListDiary = ({ branch }: Props) => {
  const dispatch = useDispatch();
  const { data } = useSelector(getBranchDiaryState);

  useEffect(() => {
    if (!branch) {
      return;
    }
    dispatch(
      getBranchDiary.request({
        branchCode: branch.code,
      })
    );
  }, [branch]);

  return <PartnerDiary items={data} />;
};

export default ListDiary;
