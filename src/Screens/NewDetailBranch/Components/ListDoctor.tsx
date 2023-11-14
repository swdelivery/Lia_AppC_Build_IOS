import React, { useEffect } from "react";
import { _moderateScale } from "../../../Constant/Scale";
import { Branch } from "@typings/branch";
import HorizontalDoctors from "@Components/HorizontalDoctors";
import useApiPaging from "src/Hooks/services/useApiPaging";
import PartnerService from "src/Services/PartnerService";

type Props = {
  branch: Branch;
};
const ListDoctor = ({ branch }: Props) => {
  const { data, getData } = useApiPaging(PartnerService.getDoctorList);

  useEffect(() => {
    if (!branch) {
      return;
    }
    getData({
      branchCode: {
        in: branch.code,
      },
    });
  }, [branch]);

  return (
    <HorizontalDoctors
      items={data}
      title="Đội ngũ Bác sĩ nhiều năm kinh nghiệm"
    />
  );
};

export default ListDoctor;
