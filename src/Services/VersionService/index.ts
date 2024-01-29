import { URL_ORIGINAL } from "@Constant/Url";
import createAxios from "../axios";

const axios = createAxios(URL_ORIGINAL);

const getVersion = (): Promise<any> => {
  return axios.get("/api/version").then(({ data }) => data.data);
};

export default {
  getVersion,
};
