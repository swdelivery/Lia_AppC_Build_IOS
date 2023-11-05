import React, { useEffect } from "react";
import { _moderateScale } from "../../../Constant/Scale";
import { useDispatch, useSelector } from "react-redux";
import { getBranchDoctors } from "@Redux/branch/actions";
import { Branch } from "@typings/branch";
import { getBranchDoctorsState } from "@Redux/branch/selectors";
import HorizontalDoctors from "@Components/HorizontalDoctors";

type Props = {
  branch: Branch;
};
const ListDoctor = ({ branch }: Props) => {
  const dispatch = useDispatch();
  const { data } = useSelector(getBranchDoctorsState);

  useEffect(() => {
    if (!branch) {
      return;
    }
    dispatch(
      getBranchDoctors.request({
        branchCode: branch.code,
      })
    );
  }, [branch]);

  return (
    <HorizontalDoctors
      items={data}
      title="Đội ngũ Bác sĩ nhiều năm kinh nghiệm"
    />
  );
};

export default ListDoctor;
