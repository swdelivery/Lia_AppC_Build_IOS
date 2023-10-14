import Axios from 'axios';
import isArray from 'lodash/isArray';
import { Alert } from 'react-native';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import { setLogStyle, useLogStyle } from './LogConfig';





export const createPaymentRequestForSocialProject = (data) => {
    return Axios.post(`${URL_FOR_PARTNER}/payment-request/social-project`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { createPaymentRequestForSocialProject: res });
            _checkSuccess(res)
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { createPaymentRequestForSocialProject: err });
            _checkError(err)
            return err
        })
}

export const getFileDataSocialAssistanceById = (id,query) => {
    return Axios.get(`${URL_FOR_PARTNER}/social-project/${id}/files`, {
        params:query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getFileDataSocialAssistanceById: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getFileDataSocialAssistanceById: err });
            _checkError(err)
            return err
        })
}

export const getExpenseDataById = (id,query) => {
    return Axios.get(`${URL_FOR_PARTNER}/social-project/${id}/expense`, {
        params:query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getExpenseDataById: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getExpenseDataById: err });
            _checkError(err)
            return err
        })
}

export const getTopPaymentSocialAssistanceById = (id,query) => {
    return Axios.get(`${URL_FOR_PARTNER}/social-project/${id}/top-payment`, {
        params:query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getTopPaymentSocialAssistanceById: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getTopPaymentSocialAssistanceById: err });
            _checkError(err)
            return err
        })
}

export const getPaymentSocialAssistanceById = (id,query) => {
    return Axios.get(`${URL_FOR_PARTNER}/social-project/${id}/payment`, {
        params:query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getPaymentSocialAssistanceById: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getPaymentSocialAssistanceById: err });
            _checkError(err)
            return err
        })
}

export const getSocialAssistancePostById = (id) => {
    return Axios.get(`${URL_FOR_PARTNER}/social-project/${id}`, {})
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getSocialAssistancePostById: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getSocialAssistancePostById: err });
            _checkError(err)
            return err
        })
}

export const getListSocialAssistancePost = (query) => {
    return Axios.get(`${URL_FOR_PARTNER}/social-project`, {
        params: query
    })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getListSocialAssistancePost: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getListSocialAssistancePost: err });
            _checkError(err)
            return err
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
    // console.log(succ);


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