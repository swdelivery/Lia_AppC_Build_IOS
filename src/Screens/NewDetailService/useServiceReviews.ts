import { ApiResponse } from "@typings/api";
import { Review } from "@typings/review";
import { Service } from "@typings/serviceGroup";
import { useEffect } from "react";
import useApi from "src/Hooks/useApi";
import PartnerService from "src/Services/PartnerService";

export default function useServiceReviews(service: Service) {
  const { data, isLoading, performRequest } = useApi<ApiResponse<Review[]>>(
    PartnerService.getReview,
    null
  );

  useEffect(() => {
    if (!service) {
      return;
    }
    performRequest({
      serviceCode: {
        equal: service.code,
      },
    });
  }, [service]);

  return { data, isLoading };
}
