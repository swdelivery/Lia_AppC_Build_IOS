import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { StatusBar as RNStatusBar, StatusBarProps } from "react-native";

export function FocusAwareStatusBar(props: StatusBarProps) {
  const isFocused = useIsFocused();

  return isFocused ? <RNStatusBar {...props} /> : null;
}

export function StatusBar(props: StatusBarProps) {
  return <RNStatusBar translucent backgroundColor={"transparent"} {...props} />;
}
