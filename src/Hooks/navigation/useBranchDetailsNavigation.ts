import ScreenKey from "@Navigation/ScreenKey";
import { useCallback } from "react";
import { useNavigate } from "../useNavigation";
import { Branch } from "@typings/branch";

export default function useBranchDetailsNavigation() {
  const { navigation } = useNavigate();

  return useCallback((item: Branch) => {
    requestAnimationFrame(() => {
      // @ts-ignore
      navigation.navigate({
        name: ScreenKey.DETAIL_BRAND,
        params: {
          branch: item,
        },
        key: Date.now() + "",
      });
    });
  }, []);
}
