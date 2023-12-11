import { Service } from "@typings/serviceGroup";
import React from "react";
import { View, StyleSheet } from "react-native";
import useRecomendServices from "../useRecomendServices";

type Props = {
  service: Service;
};

export default function RecommendServices({ service }: Props) {
  const recomendServices = useRecomendServices(service);

  return (
    <View>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  //
});
