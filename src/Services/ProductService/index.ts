import { URL_FOR_PARTNER } from "@Constant/Url";
import createAxios from "../axios";
import configs from "src/configs";

const axios = createAxios(URL_FOR_PARTNER);

const getProducts = ({}, page = 1): Promise<any> => {
  const params = {
    limit: configs.apiPageSize,
    page,
  };
  return axios
    .get("/product", {
      params,
    })
    .then(({ data }) => data);
};

export default {
  getProducts,
};
