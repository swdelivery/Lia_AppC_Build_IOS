import { DependencyList, useCallback } from "react";

export default function useRequestAnimationFrame<T extends Function>(
  callback: T,
  deps: DependencyList
) {
  return useCallback(() => {
    requestAnimationFrame(() => {
      callback();
    });
  }, deps);
}
