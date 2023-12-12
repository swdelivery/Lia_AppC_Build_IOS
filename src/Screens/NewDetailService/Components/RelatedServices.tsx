import { Service } from "@typings/serviceGroup";
import React from "react";
import { View, StyleSheet } from "react-native";
import useRelatedServices from "../useRelatedServices";
import HorizontalServicesV2 from "@Components/HorizontalServicesV2";

type Props = {
  service: Service;
};

export default function RelatedServices({ service }: Props) {
  const services = useRelatedServices(service);

  return (
    <HorizontalServicesV2
      title="Có thể bạn sẽ quan tâm"
      items={services}
      containerStyle={styles.recomendService}
    />
  );
}

const styles = StyleSheet.create({
  recomendService: {
    marginHorizontal: 8,
    backgroundColor: "white",
    paddingHorizontal: 16,
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
