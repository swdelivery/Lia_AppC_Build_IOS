import React, { useEffect } from "react";
import ScreenKey from "@Navigation/ScreenKey";
import { Service } from "@typings/serviceGroup";
import { createContext, useContext, useMemo } from "react";
import useApi from "src/Hooks/services/useApi";
import { useNavigationParams } from "src/Hooks/useNavigation";
import PartnerService from "src/Services/PartnerService";

export type ServiceDetailsContextType = {
  service: Service;
};

export const ServiceDetailsContext = createContext<ServiceDetailsContextType>({
  service: null,
});

export function useServiceDetailsContext() {
  const ctx = useContext(ServiceDetailsContext);
  if (!ctx) {
    throw new Error(
      "useServiceDetailsContext must be used within a ServiceDetailsProvider"
    );
  }
  return ctx;
}

type ScreenK = typeof ScreenKey.DETAIL_SERVICE;

export function withServiceDetailsContext<T>(
  Component: React.ComponentType<T>
) {
  return (props: T) => {
    const { service } = useNavigationParams<ScreenK>();
    const { data, isLoading, performRequest } = useApi(
      PartnerService.getServiceDetails,
      service
    );

    useEffect(() => {
      if (!service) {
        return;
      }
      performRequest(service._id);
    }, [service]);

    const context = useMemo(() => {
      return {
        service: data,
      };
    }, [data]);

    return (
      <ServiceDetailsContext.Provider value={context}>
        <Component {...props} />
      </ServiceDetailsContext.Provider>
    );
  };
}
