import { ConfigDataCode } from "@typings/configData";
import PartnerService from "src/Services/PartnerService";
import useApi from "./services/useApi";
import { useFocused } from "./useNavigation";

export default function useConfigData(code: ConfigDataCode) {
  const { data, performRequest } = useApi(
    PartnerService.getConfigDataByCode,
    null
  );

  useFocused(() => {
    performRequest(code);
  });

  return data;
}
