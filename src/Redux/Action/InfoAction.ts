import Axios from "axios";
import { isArray } from "lodash";
import { URL_FOR_PARTNER } from "../../Constant/Url";
import * as ActionType from "../Constants/ActionType";
import { setLogStyle, useLogStyle } from "./LogConfig";
import { Alert } from "react-native";
import { encodeParams } from "src/Services/utils";
// import qs from "qs";

Axios.defaults.paramsSerializer = function (params) {
  return encodeParams(params);
};

export const getPartnerLevel = () => {
  return Axios.get(`${URL_FOR_PARTNER}/partner-level`, {})
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getPartnerLevel: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getPartnerLevel: err,
      });
      _checkError(err);
      return err;
    });
};

export const getTreatmentDetail = (params) => {
  // if (params) {
  //     params = {
  //         "condition": {
  //             // "serviceCode": {
  //             //     "equal": "LTBL"
  //             // }
  //         },
  //         "sort": {
  //             "created": -1
  //         },
  //         "limit": 100,
  //         "page": 1
  //     };
  // }
  return async (dispatch) => {
    Axios.get(`${URL_FOR_PARTNER}/partners/treatment-detail`, { params })
      .then((res) => {
        console.log(
          useLogStyle + "----FETCHING SUCCESS: ",
          setLogStyle("green"),
          { getTreatmentDetail: res }
        );
        dispatch({
          type: ActionType.SET_INFO_TREATMENT,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
          getTreatmentDetail: res,
        });
        _checkError(err);
      });
  };
};

export const getTreatmentDetailNotDispatch = (params = null) => {
  if (params !== null) {
    params = {
      condition: {
        // "serviceCode": {
        //     "equal": "LTBL"
        // }
      },
      sort: {
        created: -1,
      },
      limit: 100,
      page: 1,
    };
  }

  return Axios.get(`${URL_FOR_PARTNER}/partners/treatment-detail`, params)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getTreatmentDetailNotDispatch: res.data.data }
      );
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getTreatmentDetailNotDispatch: res,
      });
      _checkError(err);
    });
};

export const getMedicalPrescription = () => {
  return async (dispatch) => {
    Axios.get(`${URL_FOR_PARTNER}/partners/medical-prescription`)
      .then((res) => {
        console.log(
          useLogStyle + "----FETCHING SUCCESS: ",
          setLogStyle("green"),
          { getMedicalPrescription: res }
        );
        dispatch({
          type: ActionType.SET_INFO_MEDICAL_PRESCRIPTION,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
          getMedicalPrescription: err,
        });
        _checkError(err);
      });
  };
};

export const getMedicalPrescriptionCurrent = () => {
  return Axios.get(`${URL_FOR_PARTNER}/medical-prescription/current`)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getMedicalPrescriptionCurrent: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getMedicalPrescriptionCurrent: err,
      });
      _checkError(err);
      return err;
    });
};

export const getOrderService = (params = null) => {
  if (params !== null) {
    params = {
      condition: {
        // "serviceCode": {
        //     "equal": "LTBL"
        // }
      },
      sort: {
        created: -1,
      },
      limit: 100,
      page: 1,
    };
  }

  return Axios.get(`${URL_FOR_PARTNER}/partners/order-service`, { params })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getOrderService: res }
      );

      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getOrderService: err,
      });
      _checkError(err);
    });
};

export const getOrder = () => {
  return async (dispatch) => {
    Axios.get(`${URL_FOR_PARTNER}/partners/order`)
      .then((res) => {
        console.log(
          useLogStyle + "----FETCHING SUCCESS: ",
          setLogStyle("green"),
          { getOrder: res.data.data }
        );
        dispatch({
          type: ActionType.SET_INFO_ORDER,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
          getOrder: res,
        });
        _checkError(err);
      });
  };
};

export const getBookingDeposit = (bookingId) => {
  return Axios.get(`${URL_FOR_PARTNER}/booking/${bookingId}/deposits`)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getBookingDeposit: res }
      );
      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getBookingDeposit: err,
      });
      _checkError(err);
    });
};

export const getDeposit = (params = null) => {
  if (params == null) {
    params = {
      condition: {
        // "serviceCode": {
        //     "equal": "LTBL"
        // }
      },
      sort: {
        created: -1,
      },
      limit: 100,
      page: 1,
    };
  }
  return Axios.get(`${URL_FOR_PARTNER}/deposit`, { params })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getDeposit: res }
      );
      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getDeposit: err,
      });
      _checkError(err);
    });
};

export const getDepositRequest = (params = null) => {
  if (params == null) {
    params = {
      condition: {
        // "serviceCode": {
        //     "equal": "LTBL"
        // }
      },
      sort: {
        created: -1,
      },
      limit: 100,
      page: 1,
    };
  }
  return Axios.get(`${URL_FOR_PARTNER}/payment-request`, { params })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getDepositRequest: res }
      );
      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getDepositRequest: err,
      });
      _checkError(err);
    });
};

export const getOrderById = (orderId) => {
  return Axios.get(`${URL_FOR_PARTNER}/order/${orderId}`, {})
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getOrderById: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getOrderById: err,
      });
      _checkError(err);
      return err;
    });
};

export const getOrderPayment = (orderId) => {
  return Axios.get(`${URL_FOR_PARTNER}/order/${orderId}/payments`, {})
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getOrderPayment: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getOrderPayment: err,
      });
      _checkError(err);
      return err;
    });
};

export const getPayment = (params = null) => {
  if (params == null) {
    params = {
      condition: {
        // "serviceCode": {
        //     "equal": "LTBL"
        // }
      },
      sort: {
        created: -1,
      },
      limit: 100,
      page: 1,
    };
  }
  // const query = encodeParams(params);

  return Axios.get(`${URL_FOR_PARTNER}/payment`, { params })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getPayment: res }
      );
      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getPayment: err,
      });
      _checkError(err);
    });
};

export const getWallet = (params) => {
  return Axios.get(`${URL_FOR_PARTNER}/wallet`, { params })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getWallet: res }
      );
      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getWallet: err,
      });
      _checkError(err);
    });
};

export const getMineCommission = (params) => {
  return Axios.get(`${URL_FOR_PARTNER}/collaborator-revenue/mine-commission`, {
    params,
  })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getMineCommission: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getMineCommission: err,
      });
      _checkError(err);
    });
};

export const getOverviewCommission = (params) => {
  return Axios.get(`${URL_FOR_PARTNER}/collaborator-revenue/children`, {
    params,
  })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getOverviewCommission: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getOverviewCommission: err,
      });
      _checkError(err);
    });
};

export const getDirectCommission = (params) => {
  return Axios.get(`${URL_FOR_PARTNER}/collaborator-revenue/children-direct`, {
    params,
  })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getDirectCommission: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getDirectCommission: err,
      });
      _checkError(err);
    });
};

export const getInDirectCommission = (params) => {
  return Axios.get(
    `${URL_FOR_PARTNER}/collaborator-revenue/children-indirect`,
    { params }
  )
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getInDirectCommission: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getInDirectCommission: err,
      });
      _checkError(err);
    });
};

export const getTeammateParent = (params) => {
  return Axios.get(`${URL_FOR_PARTNER}/collaborator-relationship/parent`, {
    params,
  })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getTeammateParent: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getTeammateParent: err,
      });
      _checkError(err);
    });
};

export const getTeammateSuperior = (params) => {
  return Axios.get(`${URL_FOR_PARTNER}/collaborator-relationship/middle`, {
    params,
  })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getTeammateSuperior: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getTeammateSuperior: err,
      });
      _checkError(err);
    });
};

export const getTeammateLeader = (params) => {
  return Axios.get(`${URL_FOR_PARTNER}/collaborator-relationship/root`, {
    params,
  })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getTeammateLeader: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getTeammateLeader: err,
      });
      _checkError(err);
    });
};

export const getTeammateDescendant = (params) => {
  return Axios.get(`${URL_FOR_PARTNER}/collaborator-relationship/descendants`, {
    params,
  })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getTeammateDescendant: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getTeammateDescendant: err,
      });
      _checkError(err);
    });
};

export const getCurrentCommission = (params) => {
  return Axios.get(`${URL_FOR_PARTNER}/partners/current-commission`, { params })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getCurrentCommission: res }
      );
      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getCurrentCommission: err,
      });
      _checkError(err);
    });
};

export const getCollabStatistic = (params) => {
  return async (dispatch) => {
    return Axios.get(`${URL_FOR_PARTNER}/order/collaborator-statistic`, {
      params,
    })
      .then((res) => {
        console.log(
          useLogStyle + "----FETCHING SUCCESS: ",
          setLogStyle("green"),
          { getCollabStatistic: res }
        );
        dispatch({
          type: ActionType.SET_INFO_COLLAB_STATISTIC,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
          getCollabStatistic: err,
        });
        _checkError(err);
      });
  };
};

export const getPartnerStatistics = () => {
  return Axios.get(`${URL_FOR_PARTNER}/partners/partner-statistics`)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getPartnerStatistics: res.data.data }
      );
      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getPartnerStatistics: err,
      });
      _checkError(err);
      return res.data.err;
    });
};

export const getPartnerStatisticsInMonth = () => {
  return Axios.get(`${URL_FOR_PARTNER}/partners/partner-statistics-in-month`)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getPartnerStatisticsInMonth: res.data.data }
      );
      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getPartnerStatisticsInMonth: err,
      });
      _checkError(err);
      return res.data.err;
    });
};

export const currentCommission = () => {
  return Axios.get(`${URL_FOR_PARTNER}/partners/current-commission`)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { currentCommission: res.data.data }
      );
      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        currentCommission: err,
      });
      _checkError(err);
      return res.data.err;
    });
};

export const orderCommission = () => {
  return Axios.get(`${URL_FOR_PARTNER}/partners/corder-commission`)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { orderCommission: res.data.data }
      );
      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        orderCommission: err,
      });
      _checkError(err);
      return res.data.err;
    });
};

export const depositCommission = () => {
  return Axios.get(`${URL_FOR_PARTNER}/partners/deposit-commission`)
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { depositCommission: res }
      );
      return res.data.data;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        depositCommission: err,
      });
      _checkError(err);
      return res.data.err;
    });
};

export const getQuestionAnswer = (params) => {
  console.log(params);
  return Axios.get(`${URL_FOR_PARTNER}/question-answer`, { params })
    .then((res) => {
      console.log(
        useLogStyle + "----FETCHING SUCCESS: ",
        setLogStyle("green"),
        { getQuestionAnswer: res }
      );
      return res;
    })
    .catch((err) => {
      console.log(useLogStyle + "----FETCHING FAIL: ", setLogStyle("red"), {
        getQuestionAnswer: err,
      });
      _checkError(err);
    });
};

const _checkError = (err) => {
  if (err?.message == "Network Error") {
    return Alert.alert("Lỗi", "Không có kết nối mạng", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }
  if (err?.response?.data?.message) {
    if (err?.response?.data?.data?.modules) {
      if (isArray(err?.response?.data?.data?.actions)) {
        return Alert.alert(
          "Lỗi",
          `${err?.response?.data?.message} {${
            err?.response?.data?.data?.modules
          }- ${err?.response?.data?.data?.actions?.map((item) => item)}}`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      }

      return Alert.alert(
        "Lỗi",
        `${err?.response?.data?.message} {${err?.response?.data?.data?.modules}- ${err?.response?.data?.data?.actions}}`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }

    return Alert.alert("Lỗi", `${err?.response?.data?.message}`, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }

  return Alert.alert("Lỗi", `${JSON.stringify(err?.response?.data?.error)}`, [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
};

const _checkSuccess = (succ) => {
  if (succ?.data?.message) {
    return Alert.alert("Thông báo", `${succ?.data?.message}`, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }
};
