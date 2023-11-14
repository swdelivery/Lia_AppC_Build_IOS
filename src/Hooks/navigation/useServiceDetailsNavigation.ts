import ScreenKey from "@Navigation/ScreenKey";
import { Service } from "@typings/serviceGroup";
import { useCallback } from "react";
import { useNavigate } from "../useNavigation";

export default function useServiceDetailsNavigation() {
  const { navigation } = useNavigate();

  return useCallback((item: Service) => {
    // @ts-ignore
    navigation.navigate({
      name: ScreenKey.DETAIL_SERVICE,
      params: {
        service: item,
      },
      key: Date.now() + "",
    });
  }, []);
}
