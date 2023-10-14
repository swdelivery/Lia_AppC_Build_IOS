import Axios from 'axios';
import { isArray } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Alert } from 'react-native';

export const getWallet = () => {
    return async dispatch => {
        // dispatch({
        //     type: ActionType.LOADING_BEGIN,
        //     payload: {
        //         content: 'Đang tải...'
        //     }
        // })

        Axios.get(`${URL_FOR_PARTNER}/partner/`)
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getWallet: res});

                dispatch({
                    type: ActionType.SET_SERVICE,
                    payload: res.data.data
                })
                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                // _checkSuccess(res)
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getWallet: res });

                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                _checkError(err)
            })
    }
}



export const getCommissionAmountByMonth = (params) => {

    return Axios.get(`${URL_FOR_PARTNER}/partners/commission-amount`, {
        params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getCommissionAmountByMonth: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getCommissionAmountByMonth: error });
            _checkError(error)
            return error
        })
}

export const getBookingReferral = (params) => {

    return Axios.get(`${URL_FOR_PARTNER}/booking/referral`, {
        params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getBookingReferral: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getBookingReferral: error });
            _checkError(error)
            return error
        })
}

export const depositCommissionForPartner = (params) => {

    return Axios.get(`${URL_FOR_PARTNER}/deposit-commission`, {
        params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { depositCommissionForPartner: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { depositCommissionForPartner: error });
            _checkError(error)
            return error
        })
}

export const getListOrderCommission = (params) => {

    return Axios.get(`${URL_FOR_PARTNER}/order-commission`, {
        params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListOrderCommission: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListOrderCommission: error });
            _checkError(error)
            return error
        })
}

export const getListOrderReferral = (params) => {

    return Axios.get(`${URL_FOR_PARTNER}/order/referral`, {
        params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListOrderReferral: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListOrderReferral: error });
            _checkError(error)
            return error
        })
}

export const getTopCollaboratorRevenueInMonth = (params) => {

    return Axios.get(`${URL_FOR_PARTNER}/collaborator-revenue/top-in-month`, {
        params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getTopCollaboratorRevenueInMonth: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getTopCollaboratorRevenueInMonth: error });
            _checkError(error)
            return error
        })
}

export const getCurrentCollaborator = (data) => {

    return Axios.get(`${URL_FOR_PARTNER}/collaborator-request/current`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getCurrentCollaborator: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getCurrentCollaborator: error });
            _checkError(error)
            return error
        })
}

export const createCollaboratorRequest = (data) => {

    return Axios.post(`${URL_FOR_PARTNER}/collaborator-request`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createCollaboratorRequest: res });
            _checkSuccess(res)
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createCollaboratorRequest: error });
            _checkError(error)
            return error
        })
}

export const getPaymentForPartner = (params) => {

    return Axios.get(`${URL_FOR_PARTNER}/payment`, {
        params:params
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPaymentForPartner: res });
            return res
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPaymentForPartner: error });
            _checkError(error)
            return error
        })
}

export const createPaymentRequestForWalletCommission = (data) => {

    return Axios.post(`${URL_FOR_PARTNER}/payment-request/wallet-commission`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPaymentRequestForWalletCommission: res });
            _checkSuccess(res)
            return res.data.data
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPaymentRequestForWalletCommission: error });
            _checkError(error)
            return error
        })
}


export const getListBank = () => {

    return Axios.get(`https://api.vietqr.io/v1/banks`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListBank: res });
            return res.data
        })
        .catch(error => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListBank: error });
            // return error
        })
}

export const getServiceById = (id) => {

    return Axios.get(`${URL_FOR_PARTNER}/service/${id}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getServiceById: res});
            return res.data.data
        })
        .catch(error => {
            // _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getServiceById: error});
            return error
        })
}

export const getGuideCollaborator = (id) => {

    return Axios.get(`${URL_FOR_PARTNER}/partners/guide-collaborator`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getGuideCollaborator: res});
            return res.data.data
        })
        .catch(error => {
            // _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getGuideCollaborator: error});
            return error
        })
}

const _checkError = (err) => {


    if (err?.message == 'Network Error') {
        return Alert.alert(
            "Lỗi",
            "Không có kết nối mạng",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }
    if (err?.response?.data?.message) {
        if (err?.response?.data?.data?.modules) {
            if (isArray(err?.response?.data?.data?.actions)) {
                return Alert.alert(
                    "Lỗi",
                    `${err?.response?.data?.message} {${err?.response?.data?.data?.modules}- ${err?.response?.data?.data?.actions?.map(item => item)}}`,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }

            return Alert.alert(
                "Lỗi",
                `${err?.response?.data?.message} {${err?.response?.data?.data?.modules}- ${err?.response?.data?.data?.actions}}`,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }

        return Alert.alert(
            "Lỗi",
            `${err?.response?.data?.message}`,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    return Alert.alert(
        "Lỗi",
        `${JSON.stringify(err?.response?.data?.error)}`,
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );
}

const _checkSuccess = (succ) => {
    if (succ?.data?.message) {
        return Alert.alert(
            "Thông báo",
            `${succ?.data?.message}`,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

}