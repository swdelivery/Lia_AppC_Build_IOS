import { URL_FOR_PARTNER } from "@Constant/Url";
import createAxios from "./axios";

const axios = createAxios(URL_FOR_PARTNER);

const getServiceGroup = (payload: any) => {
  return axios
    .get("service-group", { params: payload })
    .then(({ data }) => data.data);
};

const getBranchById = (id: number) => {
  return axios.get(`/branch/${id}`).then(({ data }) => data.data);
};

export default {
  getServiceGroup,
  getBranchById,
};
