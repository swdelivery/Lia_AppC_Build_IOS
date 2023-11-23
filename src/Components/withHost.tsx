import React from "react";
import { ComponentType } from "react";
import { Host } from "react-native-portalize";

export default function withHost<T>(Component: ComponentType<T>) {
  return (props: T) => (
    <Host>
      <Component {...props} />
    </Host>
  );
}
