import { URL_FOR_PARTNER } from "@Constant/Url";
import createAxios from "../axios";
import { encodeParams } from "../utils";
import configs from "src/configs";
import {
  GetDiaryPayload,
  GetDoctorListPayload,
  GetReviewsPayload,
} from "./types";

const axios = createAxios(URL_FOR_PARTNER);

const getServiceGroup = (payload: any) => {
  return axios
    .get("service-group", { params: payload })
    .then(({ data }) => data.data);
};

const getServices = (
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
  return axios.get(`service?${query}`).then(({ data }) => data.data);
};

const getServiceDetails = (serviceId: string): Promise<any> =>
  axios.post(`/service/${serviceId}`).then(({ data }) => data.data);

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

const getDoctorList = (
  payload: GetDoctorListPayload,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<any> => {
  const params = encodeParams({
    ...payload,
    limit: pageSize,
    page,
  });
  return axios.get(`/treatment-doctor?${params}`).then(({ data }) => data.data);
};

const getReview = (
  payload: GetReviewsPayload,
  page = 1,
  pageSize = configs.apiPageSize
) => {
  const params = encodeParams({
    ...payload,
    limit: pageSize,
    page,
  });
  return axios.get(`/review?${params}`).then(({ data }) => data.data);
};

const getDiary = (
  payload: GetDiaryPayload,
  page = 1,
  pageSize = configs.apiPageSize
) => {
  const params = encodeParams({
    ...payload,
    limit: pageSize,
    page,
  });
  return axios
    .get(`/partner-diary/shared?${params}`)
    .then(({ data }) => data.data);
};

export default {
  getServiceGroup,
  getServices,
  getServiceDetails,
  getBranchList,
  getBranchById,
  getDoctorList,
  getReview,
  getDiary,
};
