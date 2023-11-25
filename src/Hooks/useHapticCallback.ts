import { DependencyList, useCallback } from "react";
import haptic from "src/utils/haptic";

export default function useHapticCallback<T extends Function>(
  callback: T,
  deps: DependencyList
): T {
  return useCallback<T>(() => {
    haptic.trigger();
    return callback();
  }, deps);
}
