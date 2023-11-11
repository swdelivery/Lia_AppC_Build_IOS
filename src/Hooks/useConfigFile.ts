import PartnerService from "src/Services/PartnerService";
import useApi from "./useApi";
import { ConfigFileCode } from "@typings/configFile";
import { useFocused } from "./useNavigation";

export default function useConfigFile(code: ConfigFileCode) {
  const { data, performRequest } = useApi(
    PartnerService.getConfigFileByCode,
    null
  );

  useFocused(() => {
    performRequest(code);
  });

  return data;
}
