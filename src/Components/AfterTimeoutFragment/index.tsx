import React from "react";
import { useTimeout } from "@r0b0t3d/react-native-hooks";
import { useState } from "react";

export function AfterTimeoutFragment({
  timeout = 500,
  children,
}: {
  timeout?: number;
  children: any;
}) {
  const [isReady, setIsReady] = useState(false);

  useTimeout(() => {
    setIsReady(true);
  }, timeout);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
