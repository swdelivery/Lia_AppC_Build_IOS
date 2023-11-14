import { Service } from "@typings/serviceGroup";
import { useEffect } from "react";
import useApi from "src/Hooks/useApi";
import PartnerService from "src/Services/PartnerService";

export default function useRecomendServices(service: Service) {
  const { data, performRequest } = useApi(
    PartnerService.getServicesByGroups,
    []
  );

  useEffect(() => {
    if (!service) {
      return;
    }
    performRequest({
      codeGroup: {
        in: service.code,
      },
    });
  }, [service]);

  return data;
}
