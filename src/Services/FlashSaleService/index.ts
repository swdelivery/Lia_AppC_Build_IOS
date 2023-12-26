import { URL_FOR_PARTNER } from "@Constant/Url";
import createAxios from "../axios";

const axios = createAxios(URL_FOR_PARTNER);

const checkFlashSale = () => {
  return axios.get(`/promotion/check-flash-sale`).then(({ data }) => data.data);
};

const getFlashSaleCurrent = () =>
  axios.get("/promotion/flash-sale").then(({ data }) => data.data);

const getFlashSaleServices = (flashSaleId: string) => {
  const params = {
    sort: { orderNumber: 1 },
  };
  return axios
    .get("/promotion/" + flashSaleId + "/service-promotion", {
      params,
    })
    .then(({ data }) => data.data);
};

export default {
  checkFlashSale,
  getFlashSaleCurrent,
  getFlashSaleServices,
};
