import { Branch } from "@typings/branch";
import { useEffect } from "react";
import useApi from "src/Hooks/services/useApi";
import PartnerService from "src/Services/PartnerService";

export default function useBranchDetails(branch: Branch) {
  const { data, performRequest, isLoading } = useApi(
    PartnerService.getBranchById,
    branch
  );

  useEffect(() => {
    if (branch) {
      performRequest(branch._id);
    }
  }, [branch]);

  return {
    data,
    isLoading,
  };
}
