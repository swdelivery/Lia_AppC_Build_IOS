import React, { useCallback, useEffect } from "react";
import ScreenKey from "@Navigation/ScreenKey";
import { Service } from "@typings/serviceGroup";
import { createContext, useContext, useMemo } from "react";
import useApi from "src/Hooks/services/useApi";
import { useFocused, useNavigationParams } from "src/Hooks/useNavigation";
import PartnerService from "src/Services/PartnerService";
import Screen from "@Components/Screen";
import { StatusBar } from "@Components/StatusBar";
import Header from "./Components/Header";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";
import Placeholder from "./Components/Placeholder";
import { StyleSheet } from "react-native";

export type ServiceDetailsContextType = {
  service: Service;
  refreshService: () => void;
};

export const ServiceDetailsContext = createContext<ServiceDetailsContextType>(
  // @ts-ignore
  {}
);

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
    const { data, performRequest } = useApi(
      PartnerService.getServiceDetails,
      service
    );

    const refreshService = useCallback(() => {
      if (!service) {
        return;
      }
      performRequest(service._id);
    }, [service]);

    useFocused(() => {
      refreshService();
    });

    const context = useMemo(() => {
      return {
        service: data,
        refreshService,
      };
    }, [data, refreshService]);

    return (
      <ServiceDetailsContext.Provider value={context}>
        <Screen safeBottom safeTop style={styles.container}>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor={"transparent"}
          />
          <Header />
          <AfterTimeoutFragment placeholder={<Placeholder />} timeout={1000}>
            {data && <Component {...props} />}
          </AfterTimeoutFragment>
        </Screen>
      </ServiceDetailsContext.Provider>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
