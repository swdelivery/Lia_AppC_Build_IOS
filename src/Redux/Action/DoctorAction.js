import Axios from 'axios';
import { isArray } from 'lodash';
import { URL_FOR_PARTNER } from '../../Constant/Url';
import * as ActionType from '../Constants/ActionType';
import { setLogStyle, useLogStyle } from './LogConfig';
import { Platform, Alert } from 'react-native';


export const getDetailPractitioner = (id) => {


    return Axios.get(`${URL_FOR_PARTNER}/practitioner/${id}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDetailPractitioner: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDetailPractitioner: err });
            _checkError(err)
            return err
        })
}

export const getAllPractitioner = (params) => {

    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(JSON.stringify(params[k])))
        .join('&');

    return Axios.get(`${URL_FOR_PARTNER}/practitioner?${query}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllPractitioner: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllPractitioner: err });
            _checkError(err)
            return err
        })
}

export const getAllDoctorv2 = (params) => {

    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(JSON.stringify(params[k])))
        .join('&');

    return Axios.get(`${URL_FOR_PARTNER}/treatment-doctor?${query}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllDoctorv2: res });
            return res
        })
        .catch(err => {
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllDoctorv2: err });
            _checkError(err)
            return err
        })
}

export const getAllDoctor = () => {
    return async dispatch => {
        Axios.get(`${URL_FOR_PARTNER}/treatment-doctor/`, {
            params: {
                sort: {
                    orderNumber: -1
                }
            }
        })
            .then(res => {
                console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getAllDoctor: res });

                dispatch({
                    type: ActionType.SET_LIST_DOCTOR,
                    payload: res.data.data
                })
            })
            .catch(err => {
                console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getAllDoctor: res.response });

                // dispatch({
                //     type: ActionType.LOADING_DONE,
                //     payload: null
                // })
                _checkError(err)
            })
    }
}


export const partnerConversationStartChat = (data) => {

    return Axios.post(`${URL_FOR_PARTNER}/partner-conversation/start-chat`, data)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { partnerConversationStartChat: res });
            return res
        })
        .catch(error => {
            _checkError(error)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { partnerConversationStartChat: error });
            return error
        })
}

export const getDoctorById = (id) => {

    return Axios.get(`${URL_FOR_PARTNER}/treatment-doctor/${id}`)
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDoctorById: res });
            return res.data.data
        })
        .catch(error => {
            // _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDoctorById: error.response });
            return error
        })
}


export const getDoctorReviewByCode = (id, more = null) => {
    var params = {
        "condition": {
            "doctorCode": {
                "equal": id
            }
        },
        "sort": {
            "created": -1
        },
        "limit": 20,
        "page": 1
    };
    if (more !== null) {
        params.condition.after = more
    }

    return Axios.get(`${URL_FOR_PARTNER}/review/`, { params })
        .then(res => {
            console.log(useLogStyle + '----FETCHING SUCCESS: ', setLogStyle('green'), { getDoctorReviewByCode: res });
            return res
        })
        .catch(error => {
            // _checkError(err)
            console.log(useLogStyle + '----FETCHING FAIL: ', setLogStyle('red'), { getDoctorReviewByCode: error.response });
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