import React from "react";
import { View } from "react-native";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";

export default function Placeholder() {
  return (
    <View>
      <ContentLoader>
        <Rect x="0" y="0" rx="4" ry="4" width="100%" height="200" />
        <Circle cx="90%" cy="200" r="30" />
        <Rect x="10" y="210" rx="4" ry="4" width="100" height="20" />
        <Rect x="10" y="250" rx="4" ry="4" width="200" height="20" />
        <Rect x="10" y="280" rx="4" ry="4" width="90%" height="40" />
        <Rect x="10" y="330" rx="4" ry="4" width="90%" height="20" />
        <Rect x="10" y="370" rx="4" ry="4" width="90%" height="100" />
        <Rect x="10" y="480" rx="4" ry="4" width="90%" height="100" />
      </ContentLoader>
    </View>
  );
}
