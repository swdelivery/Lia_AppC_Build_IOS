import PartnerService from "src/Services/PartnerService";
import useApi from "./services/useApi";
import { ConfigFileCode } from "@typings/configFile";
import { useEffect } from "react";

export default function useConfigFile(code: ConfigFileCode) {
  const { data, performRequest } = useApi(
    PartnerService.getConfigFileByCode,
    null
  );

  useEffect(() => {
    performRequest(code);
  }, []);

  return data;
}
