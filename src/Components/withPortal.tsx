import React from "react";
import { ComponentType } from "react";
import { Portal } from "react-native-portalize";

export default function withPortal<T>(Component: ComponentType<T>) {
  return (props: T) => (
    <Portal>
      <Component {...props} />
    </Portal>
  );
}
