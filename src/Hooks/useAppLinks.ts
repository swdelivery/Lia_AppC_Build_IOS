import { useCallback, useEffect } from "react";
import { Linking } from "react-native";
import { parseUrl } from "src/utils/common";
import { useNavigate } from "./useNavigation";
import ScreenKey from "@Navigation/ScreenKey";

export default function useAppLinks() {
  const { navigation } = useNavigate();

  const handleUrl = useCallback((url: string) => {
    console.log({ url });
    if (url.includes("/thien-nguyen")) {
      const components = parseUrl(url);
      console.log({ components });
      navigation.navigate(ScreenKey.CHARITY_FUND_DETAILS);
    }
  }, []);

  useEffect(() => {
    Linking.getInitialURL()
      .then(handleUrl)
      .catch(() => {});
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleUrl(url);
    });

    return () => subscription.remove();
  });
}
