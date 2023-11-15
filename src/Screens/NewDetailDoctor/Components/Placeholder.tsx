import React from "react";
import { View } from "react-native";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";

export default function Placeholder() {
  return (
    <View>
      <ContentLoader>
        <Rect x="10" y="90" rx="20" ry="20" width="94%" height="200" />
        <Circle cx="50%" cy="90" r="40" />
        <Rect x="37%" y="140" rx="4" ry="4" width="100" height="20" />
        <Rect x="25%" y="170" rx="4" ry="4" width="200" height="40" />
        <Rect x="10%" y="230" rx="4" ry="4" width="30%" height="40" />
        <Rect x="60%" y="230" rx="4" ry="4" width="30%" height="40" />
        <Rect x="10" y="310" rx="4" ry="4" width="96%" height="100" />
        <Rect x="10" y="420" rx="4" ry="4" width="96%" height="100" />
      </ContentLoader>
    </View>
  );
}
