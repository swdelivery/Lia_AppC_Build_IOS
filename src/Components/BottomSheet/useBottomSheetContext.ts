import { createContext, useContext } from "react";

type BottomSheetHandles = {
  close: (callback?: () => void) => () => void;
};

export const BottomSheetContext = createContext<BottomSheetHandles>({
  close: () => () => null,
});

export function useBottomSheetContext() {
  const ctx = useContext(BottomSheetContext);
  if (!ctx) {
    throw new Error("Component should be rendered inside BottomSheet");
  }
  return ctx;
}
