import { URL_FOR_PARTNER } from "@Constant/Url";
import createAxios from "../axios";

const axios = createAxios(URL_FOR_PARTNER);

const checkFlashSale = () => {
  return axios.get(`/promotion/check-flash-sale`).then(({ data }) => data.data);
};

const getFlashSaleCurrent = () =>
  axios.get("/promotion/flash-sale").then(({ data }) => data.data);

const getFlashSaleServices = (flashSaleId: string) =>
  axios
    .get("/promotion/" + flashSaleId + "/service-promotion")
    .then(({ data }) => data.data);

export default {
  checkFlashSale,
  getFlashSaleCurrent,
  getFlashSaleServices,
};
