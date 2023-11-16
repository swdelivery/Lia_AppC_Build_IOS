import React, { ReactNode } from "react";
import { useTimeout } from "@r0b0t3d/react-native-hooks";
import { useState } from "react";
import Fade from "@Components/Fade";
import { styleElement } from "@Constant/StyleElement";

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

  return (
    <Fade visible initialScale={1} style={styleElement.flex}>
      {children}
    </Fade>
  );
}
