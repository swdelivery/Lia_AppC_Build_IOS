import { URL_FOR_PARTNER } from "@Constant/Url";
import createAxios from "../axios";
import { encodeParams } from "../utils";
import configs from "src/configs";
import {
  GetDiaryPayload,
  GetDoctorListPayload,
  GetReviewsPayload,
  GetServiceByGroupsPayload,
} from "./types";
import { Doctor } from "@typings/doctor";
import { Practitioner } from "@typings/practitioner";
import { ConfigFile } from "@typings/configFile";

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

const getServicesByGroups = (
  payload: GetServiceByGroupsPayload,
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
  return axios.get(`/service?${query}`).then(({ data }) => data.data);
};

const getServiceDetails = (serviceId: string): Promise<any> =>
  axios.get(`/service/${serviceId}`).then(({ data }) => data.data);

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

const getDoctorDetails = (doctorId: string): Promise<Doctor> =>
  axios.get(`treatment-doctor/${doctorId}`).then(({ data }) => data.data);

const getPractitioners = () =>
  axios.get("practitioner").then(({ data }) => data.data);

const getPractitionerDetails = (
  practitionerId: string
): Promise<Practitioner> =>
  axios.get(`practitioner/${practitionerId}`).then(({ data }) => data.data);

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
  return axios.get(`/review?${params}`).then(({ data }) => data);
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

const getConfigFileByCode = (code: string): Promise<ConfigFile> =>
  axios
    .get("/config-file/get-by-code?code=" + code)
    .then(({ data }) => data.data);

const getMyCoupons = (
  payload: any,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<any> => {
  const params = encodeParams({
    ...payload,
    limit: pageSize,
    page,
  });
  return axios.get("/partner-coupon?" + params).then(({ data }) => data);
};

const getVouchers = (
  payload: any,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<any> => {
  const params = encodeParams({
    ...payload,
    limit: pageSize,
    page,
  });
  return axios.get("/coupon?" + params).then(({ data }) => data);
};

const getPublicVouchers = (
  payload: any,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<any> => {
  const params = encodeParams({
    ...payload,
    limit: pageSize,
    page,
  });
  return axios.get("/coupon/public?" + params).then(({ data }) => data);
};

const takeVoucher = (payload: any) => {
  return axios.post("/partner-coupon", payload).then(({ data }) => data.data);
};

export default {
  getServiceGroup,
  getServices,
  getServicesByGroups,
  getServiceDetails,
  getBranchList,
  getBranchById,
  getDoctorList,
  getDoctorDetails,
  getPractitioners,
  getPractitionerDetails,
  getReview,
  getDiary,
  getConfigFileByCode,
  getMyCoupons,
  getVouchers,
  getPublicVouchers,
  takeVoucher,
};
