import { useCallback, useRef } from "react";
import { useSharedValue } from "react-native-reanimated";
import { delay } from "src/utils/common";

export default function useAnimatedVisible<T = any>() {
  const visible = useSharedValue(false);
  const selectedItem = useRef<T>();

  const show = useCallback(async (item?: T) => {
    selectedItem.current = item;
    if (visible.value) {
      visible.value = false;
      await delay(100);
    }
    visible.value = true;
  }, []);

  const hide = useCallback(() => {
    visible.value = false;
  }, []);

  return { visible, show, hide, selectedItem };
}
