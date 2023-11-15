import React, { ReactNode } from "react";
import { useTimeout } from "@r0b0t3d/react-native-hooks";
import { useState } from "react";

export function AfterTimeoutFragment({
  timeout = 500,
  placeholder,
  children,
}: {
  timeout?: number;
  placeholder?: ReactNode;
  children: ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useTimeout(() => {
    setIsReady(true);
  }, timeout);

  if (!isReady) {
    return placeholder;
  }

  return <>{children}</>;
}
