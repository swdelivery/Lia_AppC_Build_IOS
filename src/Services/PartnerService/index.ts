import { URL_FOR_PARTNER } from "@Constant/Url";
import createAxios from "../axios";
import { encodeParams } from "../utils";
import configs from "src/configs";
import {
  GetDiaryPayload,
  GetDoctorListPayload,
  GetReviewsPayload,
  GetServicesPayload,
} from "./types";
import { Doctor } from "@typings/doctor";
import { Practitioner } from "@typings/practitioner";
import { ConfigFile } from "@typings/configFile";
import { ApiResponse } from "@typings/api";
import { Review } from "@typings/review";
import { Diary } from "@typings/diary";
import { Booking } from "@typings/booking";

const axios = createAxios(URL_FOR_PARTNER);

const getServiceGroup = (payload: any) => {
  return axios
    .get("service-group", { params: payload })
    .then(({ data }) => data.data);
};

const getServices = (
  payload: GetServicesPayload,
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

const getBranchById = (id: string) => {
  return axios.get(`/branch/${id}`).then(({ data }) => data.data);
};

const getDoctorList = (
  payload: GetDoctorListPayload,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<ApiResponse<Doctor[]>> => {
  const params = encodeParams({
    ...(payload ? { condition: payload } : {}),
    limit: pageSize,
    page,
  });
  return axios.get(`/treatment-doctor?${params}`).then(({ data }) => data);
};

const getDoctorDetails = (doctorId: string): Promise<Doctor> =>
  axios.get(`treatment-doctor/${doctorId}`).then(({ data }) => data.data);

const getPractitioners = () =>
  axios.get("practitioner").then(({ data }) => data.data);

const getPractitionerDetails = (
  practitionerId: string
): Promise<Practitioner> =>
  axios.get(`practitioner/${practitionerId}`).then(({ data }) => data.data);

const getReviewList = (
  payload: GetReviewsPayload,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<ApiResponse<Review[]>> => {
  const params = encodeParams({
    ...(payload ? { condition: payload } : {}),
    limit: pageSize,
    page,
  });
  return axios.get(`/review?${params}`).then(({ data }) => data);
};

const getDiaryList = (
  payload: GetDiaryPayload,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<ApiResponse<Diary[]>> => {
  const params = encodeParams({
    ...(payload ? { condition: payload } : {}),
    limit: pageSize,
    page,
  });
  return axios.get(`/partner-diary/shared?${params}`).then(({ data }) => data);
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
    isShowExpired: false,
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
    isShowExpired: false,
    limit: pageSize,
    page,
  });
  return axios.get("/coupon/public?" + params).then(({ data }) => data);
};

const takeVoucher = (payload: any) => {
  return axios.post("/partner-coupon", payload).then(({ data }) => data.data);
};

const getInsuranceList = (payload: any): Promise<any> =>
  axios.get("/insurance/all", payload).then(({ data }) => data.data);

const getInsuranceDetails = (id: string) =>
  axios.get("/insurance/" + id).then(({ data }) => data.data);

const getBookingList = (payload: any): Promise<ApiResponse<Booking[]>> =>
  axios.get("/booking", payload).then(({ data }) => data);

export default {
  getServiceGroup,
  getServices,
  getServiceDetails,
  getBranchList,
  getBranchById,
  getDoctorList,
  getDoctorDetails,
  getPractitioners,
  getPractitionerDetails,
  getReviewList,
  getDiaryList,
  getConfigFileByCode,
  getMyCoupons,
  getVouchers,
  getPublicVouchers,
  takeVoucher,

  getInsuranceList,
  getInsuranceDetails,

  getBookingList,
};
