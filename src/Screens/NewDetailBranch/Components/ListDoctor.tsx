import React, { useEffect } from "react";
import { _moderateScale } from "../../../Constant/Scale";
import { Branch } from "@typings/branch";
import HorizontalDoctors from "@Components/HorizontalDoctors";
import useApiPaging from "src/Hooks/services/useApiPaging";
import PartnerService from "src/Services/PartnerService";
import Fade from "@Components/Fade";

type Props = {
  branch: Branch;
};
const ListDoctor = ({ branch }: Props) => {
  const { data, getData } = useApiPaging(PartnerService.getDoctorList);

  useEffect(() => {
    if (!branch) {
      return;
    }
    requestAnimationFrame(() => {
      getData({
        branchCode: {
          equal: branch.code,
        },
      });
    });
  }, [branch.code]);

  return (
    <Fade visible={data.length > 0}>
      <HorizontalDoctors
        items={data}
        title="Đội ngũ Bác sĩ nhiều năm kinh nghiệm"
      />
    </Fade>
  );
};

export default ListDoctor;
