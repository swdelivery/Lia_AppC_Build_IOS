import { URL_FOR_PARTNER } from "@Constant/Url";
import createAxios from "../axios";
import { encodeParams } from "../utils";
import configs from "src/configs";
import {
  GetDiaryPayload,
  GetDoctorListPayload,
  GetPartnerConversationsPayload,
  GetPractitionerListPayload,
  GetReviewsPayload,
  GetServicesPayload,
  GetTreatmentDetailsPayload,
  StartChatPayload,
} from "./types";
import { Doctor } from "@typings/doctor";
import { Practitioner } from "@typings/practitioner";
import { ConfigFile } from "@typings/configFile";
import { ApiResponse } from "@typings/api";
import { Review } from "@typings/review";
import { Diary } from "@typings/diary";
import { Booking } from "@typings/booking";
import { Insurance } from "@typings/insurance";
import { ServiceTreatment } from "@typings/treatment";
import { PaymentRequest } from "@typings/payment";
import { Service } from "@typings/serviceGroup";
import { Material } from "@typings/material";

const axios = createAxios(URL_FOR_PARTNER);

const partnerLogout = (payload: any) => {
  return axios
    .post("partner-account/logout", payload)
    .then(({ data }) => data.data);
};

const getServiceGroup = (payload: any) => {
  return axios
    .get("service-group", { params: payload })
    .then(({ data }) => data.data);
};

const getServices = (
  payload: GetServicesPayload,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<ApiResponse<Service[]>> => {
  const query = encodeParams({
    ...payload,
    sort: {
      orderNumber: -1,
    },
    limit: pageSize,
    page,
  });
  return axios.get(`/service?${query}`).then(({ data }) => data);
};

const getServicesFilter = (payload: any) => {
  const query = encodeParams({
    ...payload,
    sort: {
      orderNumber: -1,
    },
  });
  return axios
    .get(`/service/filter-booking?${query}`)
    .then(({ data }) => data.data);
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

// const getPractitioners = () =>
//   axios.get("practitioner").then(({ data }) => data.data);
const getPractitioners = (
  payload: GetPractitionerListPayload,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<ApiResponse<Practitioner[]>> => {
  const params = encodeParams({
    ...(payload ? { condition: payload } : {}),
    limit: pageSize,
    page,
  });
  return axios.get(`/practitioner?${params}`).then(({ data }) => data.data);
};

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

const getMaterial = (
  params,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<ApiResponse<Material[]>> =>
  axios
    .get("/material", {
      params: {
        ...params,
        limit: pageSize,
        page,
      },
    })
    .then(({ data }) => data);

const getMyCoupons = (
  payload: any,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<any> => {
  return axios
    .get("/partner-coupon", {
      params: {
        ...payload,
        limit: pageSize,
        page,
      },
    })
    .then(({ data }) => data);
};

const getVouchers = (
  payload: any,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<any> => {
  return axios
    .get("/coupon", {
      params: {
        ...payload,
        isShowExpired: false,
        limit: pageSize,
        page,
      },
    })
    .then(({ data }) => data);
};

const getPublicVouchers = (
  payload: any,
  page = 1,
  pageSize = configs.apiPageSize
): Promise<any> => {
  return axios
    .get("/coupon/public", {
      params: {
        ...payload,
        isShowExpired: false,
        limit: pageSize,
        page,
      },
    })
    .then(({ data }) => data);
};

const takeVoucher = (payload: any) => {
  return axios.post("/partner-coupon", payload).then(({ data }) => data.data);
};

const createPartnerBooking = (payload: any) => {
  return axios.post("/booking", payload).then(({ data }) => data);
};

const getInsuranceList = (): Promise<ApiResponse<Insurance[]>> =>
  axios
    .get("/insurance/all", {
      headers: {
        // FIXME: use this token to get data for now
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ5YTRmZTFlOTZhNDAwMWVhZTNiMzYiLCJlbXBsb3llZUNvZGUiOiJFTFVFMTE2QlhZTFEiLCJlbXBsb3llZUlkIjoiNjU0OWE0ZmYxZTk2YTQwMDFlYWUzYjM5IiwibmFtZSI6InJvb3Qgcm9vdCIsInVzZXJOYW1lIjoicm9vdCIsInVzZXJUeXBlIjoicm9vdCIsImJyYW5jaENvZGVBcnIiOlsiQjAxIiwiVEJDIl0sImFwcE5hbWUiOiJCSV9BUFAiLCJpYXQiOjE3MDAxMjM2NzksImV4cCI6MTcwMDcyODQ3OX0.BKjNpWbDB6sRM3W_obKldHqVwHyI8WolGJpQGHDwNPQ",
      },
    })
    .then(({ data }) => data);

const getInsuranceDetails = (id: string) =>
  axios.get("/insurance/" + id).then(({ data }) => data.data);

const getBookingList = (payload: any): Promise<ApiResponse<Booking[]>> =>
  axios.get("/booking", payload).then(({ data }) => data);

const getBookingDetails = (id: string): Promise<Booking> =>
  axios.get("/booking/" + id).then(({ data }) => data.data);

const getTreatmentDetails = (
  payload: GetTreatmentDetailsPayload
): Promise<ServiceTreatment[]> =>
  axios
    .get("/treatment-detail", {
      params: {
        condition: {
          ...payload,
        },
        limit: 1000,
      },
    })
    .then(({ data }) => data.data);

const getTreatmentDetailsById = (id: string): Promise<ServiceTreatment[]> =>
  axios.get("/treatment-detail/" + id).then(({ data }) => data.data);

const getPaymentRequest = (
  payload: GetTreatmentDetailsPayload
): Promise<PaymentRequest[]> =>
  axios
    .get("/payment-request", {
      params: {
        condition: {
          ...payload,
        },
        sort: {
          created: -1,
        },
        limit: 100,
        page: 1,
      },
    })
    .then(({ data }) => data.data);

const getBookingDeposits = (bookingId: string) =>
  axios.get(`/booking/${bookingId}/deposits`).then(({ data }) => data.data);

const getOrderDetails = (orderId: string) =>
  axios.get(`/order/${orderId}`).then(({ data }) => data.data);

const getOrderPayments = (orderId: string) =>
  axios.get(`/order/${orderId}/payments`).then(({ data }) => data.data);

const getPartnerConversations = (
  params: GetPartnerConversationsPayload,
  page = 1,
  pageSize = configs.apiPageSize
) => {
  return axios
    .get(
      "/partner-conversation" +
      "?" +
      encodeParams({ ...params, limit: pageSize, page })
    )
    .then(({ data }) => data.data);
};

const getConversationDetails = (id: string) => {
  return axios.get(`/partner-conversation/` + id).then(({ data }) => data.data);
};

const getConversationMessages = (payload: any) =>
  axios
    .get("/partner-message", {
      params: {
        condition: payload,
        limit: configs.apiPageSize,
      },
    })
    .then(({ data }) => data.data);

const startChat = (payload: StartChatPayload) =>
  axios
    .post("/partner-conversation/start-chat", payload)
    .then(({ data }) => data.data);

const createPartnerRelative = (payload: any) => {
  return axios.post("/partner-relative", payload).then(({ data }) => data);
};

const updatePartnerRelative = (payload: any) => {
  return axios
    .put(`/partner-relative/${payload?._id}`, payload?.data)
    .then(({ data }) => data);
};

const deletePartnerRelative = (payload: any) => {
  return axios
    .delete(`/partner-relative/${payload?._id}`, {})
    .then(({ data }) => data);
};

const getListPartnerRelative = (payload: any) => {
  const query = encodeParams({
    ...payload,
  });
  return axios
    .get(`/partner-relative/list?${query}`, payload)
    .then(({ data }) => data);
};

const createAIMessage = (payload: any) => {
  return axios
    .post(`/partner-chatgpt-messages/send-message`, payload)
    .then(({ data }) => data);
};

const getListAIMessages = (payload: any) => {
  const query = encodeParams({
    ...payload,
  });
  return axios
    .get(`/partner-chatgpt-messages?${query}`, {})
    .then(({ data }) => data);
};

const getListPosts = (payload: any) => {
  const query = encodeParams({
    ...payload,
  });
  return axios.get(`/partner-post?${query}`, {}).then(({ data }) => data);
};

const getMorePosts = (payload: any) => {
  const query = encodeParams({
    ...payload,
  });
  return axios.get(`/partner-post?${query}`, {}).then(({ data }) => data);
};

const getPartnerDiary = (payload: any) => {
  return axios.get(`/partner-diary/${payload}`, {}).then(({ data }) => data);
};

const getCommentsPost = (payload: any) => {
  return axios
    .get(`/partner-post-comment/post/${payload?._idPost}`, {
      params: payload?.params,
    })
    .then(({ data }) => data);
};

const getMoreCommentsPost = (payload: any) => {
  return axios
    .get(`/partner-post-comment/post/${payload?._idPost}`, {
      params: payload?.params,
    })
    .then(({ data }) => data);
};

const getChildCommentsPost = (payload: any) => {
  return axios
    .get(`/partner-post-comment/post/${payload?._idPost}`, {
      params: payload?.params,
    })
    .then(({ data }) => data);
};

const createCommentPost = (payload: any) => {
  return axios.post(`/partner-post-comment`, payload).then(({ data }) => data);
};

const createReactionPost = (payload: any) => {
  return axios.post(`/partner-post-reaction`, payload).then(({ data }) => data);
};

const getWallet = (payload: any) => {
  return axios.get(`/wallet`, {}).then(({ data }) => data);
};

const getEyeLabel = (payload: any) => {
  return axios.get(`/eye-label`, {}).then(({ data }) => data);
};

// Takecare
const getListPartnerTreatment = (payload: any) => {
  return axios.get(`/partners/treatment-detail`, {}).then(({ data }) => data);
};
const getListPostoperative = (payload: any) => {
  return axios.get(`/daily-diary/${payload?.idPartnerTreatment}/postoperative`, {}).then(({ data }) => data);
};
const updateDailyDiary = (payload: any) => {
  return axios.put(`/daily-diary/${payload?.id}`, payload?.data).then(({ data }) => data);
};

export default {
  partnerLogout,

  getServiceGroup,
  getServices,
  getServiceDetails,
  getServicesFilter,
  getBranchList,
  getBranchById,

  getDoctorList,
  getDoctorDetails,

  getPractitioners,
  getPractitionerDetails,

  getReviewList,
  getDiaryList,

  getConfigFileByCode,

  // Material
  getMaterial,

  // Coupon
  getMyCoupons,
  getVouchers,
  getPublicVouchers,
  takeVoucher,

  // Insurance
  getInsuranceList,
  getInsuranceDetails,
  // Booking
  createPartnerBooking,
  getBookingList,

  getBookingDetails,
  getTreatmentDetails,
  getTreatmentDetailsById,
  getPaymentRequest,
  getBookingDeposits,
  getOrderDetails,
  getOrderPayments,

  // Conversations
  getPartnerConversations,
  getConversationDetails,
  getConversationMessages,
  startChat,

  // Relative
  createPartnerRelative,
  updatePartnerRelative,
  deletePartnerRelative,
  getListPartnerRelative,

  // AI chatting
  createAIMessage,
  getListAIMessages,

  // NewFeeds
  getListPosts,
  getMorePosts,
  getPartnerDiary,
  getCommentsPost,
  getMoreCommentsPost,
  getChildCommentsPost,
  createCommentPost,
  createReactionPost,

  // Wallet
  getWallet,

  // EyeLabel
  getEyeLabel,

  // Takecare
  getListPartnerTreatment,
  getListPostoperative,
  updateDailyDiary
};
