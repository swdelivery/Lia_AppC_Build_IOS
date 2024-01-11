import { URL_FOR_PARTNER } from "@Constant/Url";
import createAxios from "../axios";
import configs from "src/configs";
import { Product } from "@typings/product";

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

const getProductDetails = (productId: string): Promise<Product> =>
  axios.get(`/product/${productId}`).then(({ data }) => data.data);

export default {
  getProducts,
  getProductDetails,
};
