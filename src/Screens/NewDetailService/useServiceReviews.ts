import { Service } from "@typings/serviceGroup";
import { useEffect } from "react";
import useApiPaging from "src/Hooks/services/useApiPaging";
import PartnerService from "src/Services/PartnerService";

export default function useServiceReviews(service: Service) {
  const { data, isLoading, getData, meta } = useApiPaging(
    PartnerService.getReviewList
  );

  useEffect(() => {
    if (!service) {
      return;
    }
    getData({
      serviceCode: {
        equal: service.code,
      },
    });
  }, [service]);

  return { data, meta, isLoading };
}
