import { Service } from "@typings/serviceGroup";
import React from "react";
import useRecomendServices from "../useRecomendServices";
import ListBottomService from "@Components/ListBottomService/ListBottomService";

type Props = {
  service: Service;
};

export default function RecommendServices({ service }: Props) {
  const recomendServices = useRecomendServices(service);

  return <ListBottomService services={recomendServices} />;
}
