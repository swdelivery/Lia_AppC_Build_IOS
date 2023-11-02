import { URL_FOR_PARTNER } from "@Constant/Url";
import createAxios from "./axios";
import { encodeParams } from "./utils";
import configs from "src/configs";

const axios = createAxios(URL_FOR_PARTNER);

const getServiceGroup = (payload: any) => {
  return axios
    .get("service-group", { params: payload })
    .then(({ data }) => data.data);
};

const getBranchList = (
  payload: any,
  page = 1,
  pageSize = configs.apiPageSize
) => {
  const query = encodeParams({
    ...payload,
    sort: {
      orderNumber: -1,
    },
    limit: pageSize,
    page,
  });
  return axios.get(`/branch?${query}`).then(({ data }) => data.data);
};

const getBranchById = (id: number) => {
  return axios.get(`/branch/${id}`).then(({ data }) => data.data);
};

export default {
  getServiceGroup,
  getBranchList,
  getBranchById,
};
