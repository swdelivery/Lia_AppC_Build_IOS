/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from "react";

export default function useCallbackItem<T>(item: T) {
  const trigger = useCallback(
    (callback?: (item: T) => void) => () => {
      if (callback) {
        callback(item);
      }
    },
    [item]
  );

  return trigger;
}
