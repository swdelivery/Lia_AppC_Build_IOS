import { Service } from "@typings/serviceGroup";
import { useEffect } from "react";
import useApiPaging from "src/Hooks/services/useApiPaging";
import PartnerService from "src/Services/PartnerService";

export default function useRecomendServices(service: Service) {
  const { data, getData } = useApiPaging(PartnerService.getServices);

  useEffect(() => {
    if (!service) {
      return;
    }
    requestAnimationFrame(() => {
      getData({
        codeGroup: {
          notIn: service.codeGroup,
        },
      });
    });
  }, [...(service?.codeGroup || [])]);

  return data;
}
