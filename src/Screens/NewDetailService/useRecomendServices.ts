import { Service } from "@typings/serviceGroup";
import { useEffect } from "react";
import useApi from "src/Hooks/services/useApi";
import PartnerService from "src/Services/PartnerService";

export default function useRecomendServices(service: Service) {
  const { data, performRequest } = useApi(PartnerService.getServices, []);

  useEffect(() => {
    if (!service) {
      return;
    }
    performRequest({
      codeGroup: {
        in: service.codeGroup,
      },
    });
  }, [service]);

  return data;
}
