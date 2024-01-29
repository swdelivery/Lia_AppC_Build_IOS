import { URL_ORIGINAL } from "@Constant/Url";
import createAxios from "../axios";

const axios = createAxios(URL_ORIGINAL);

const getVersion = (params: any): Promise<any> => {
  console.log({ params });

  return axios
    .get("/api/version/latest-version", {
      params,
    })
    .then(({ data }) => data.data);
};

export default {
  getVersion,
};
