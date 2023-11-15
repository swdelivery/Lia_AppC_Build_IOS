import React from "react";
import { View } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

export default function Placeholder() {
  return (
    <View>
      <ContentLoader>
        <Rect x="0" y="0" rx="4" ry="4" width="100%" height="200" />
        <Rect x="10" y="210" rx="4" ry="4" width="95%" height="40" />
        <Rect x="10" y="260" rx="4" ry="4" width="95%" height="40" />
        <Rect x="10" y="310" rx="4" ry="4" width="100" height="20" />
        <Rect x="10" y="340" rx="4" ry="4" width="200" height="20" />
        <Rect x="10" y="370" rx="4" ry="4" width="60%" height="40" />
        <Rect x="65%" y="370" rx="4" ry="4" width="30%" height="40" />
      </ContentLoader>
    </View>
  );
}
